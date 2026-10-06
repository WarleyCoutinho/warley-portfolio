#!/usr/bin/env python3
"""Build the looping hero clip for the talking-video portfolio.

Usage:
  python3 scripts/build-hero-assets.py --src _inputs/intro.mp4 --out public/hero \
      --start 1.20 --end 9.45 [--crop-x 345] [--fade-bottom 0.16]

Steps (requires ffmpeg + numpy; Pillow only for the optional stills):
  1. Decode [start, end] at a constant 30 fps, crop around the person, scale to 576x720 (4:5).
  2. Whiten the backdrop. A static flat-field model of the backdrop is fitted once (so there is
     no flicker); pixels close to it are pushed to pure white, the person is left untouched.
  3. Fade the bottom edge to white (the source is framed from the knees up).
  4. Seamless loop: cross-fade the last X seconds of picture into the first X seconds
     (and the audio, sample-accurately in numpy, equal-power). Nothing is stretched or retimed,
     so lips stay in sync.
  5. Normalise the voice in float (the source clip can arrive hugely over-driven) and encode
     hero.mp4 (H.264 + AAC) and hero.webm (VP9 + Opus).
"""
from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path

import numpy as np

W_OUT, H_OUT, FPS, SR = 576, 720, 30, 48000


def run(cmd: list[str], **kw) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, check=True, **kw)


def probe_size(src: str) -> tuple[int, int]:
    out = subprocess.check_output(
        ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
         "stream=width,height", "-of", "csv=p=0:s=x", src], text=True).strip()
    w, h = out.split("x")
    return int(w), int(h)


def detect_crop_x(src: str, t: float, crop_w: int, height: int, width: int, trim: int, trim_top: int) -> int:
    """Centre a crop_w-wide window on the person (dark hair/trousers/skin vs light backdrop)."""
    raw = subprocess.check_output(
        ["ffmpeg", "-v", "error", "-ss", str(t), "-i", src, "-frames:v", "1",
         "-f", "rawvideo", "-pix_fmt", "gray", "-"])
    g = np.frombuffer(raw, np.uint8).reshape(height, width).astype(np.float32)
    g = g[trim_top:height - trim, trim:width - trim]          # ignore editor outline / handle artefacts
    dark = (g < 165).sum(axis=0) > 8
    xs = np.where(dark)[0] + trim
    centre = (xs.min() + xs.max()) / 2
    return int(np.clip(round(centre - crop_w / 2), 0, width - crop_w))


def decode_frames(src, start, end, crop_x, crop_y, crop_w, crop_h) -> np.ndarray:
    vf = f"fps={FPS},crop={crop_w}:{crop_h}:{crop_x}:{crop_y},scale={W_OUT}:{H_OUT}:flags=lanczos"
    raw = subprocess.check_output(
        ["ffmpeg", "-v", "error", "-ss", str(start), "-to", str(end), "-i", src,
         "-an", "-vf", vf, "-pix_fmt", "rgb24", "-f", "rawvideo", "-"])
    return np.frombuffer(raw, np.uint8).reshape(-1, H_OUT, W_OUT, 3)


def fit_backdrop(frames: np.ndarray) -> np.ndarray:
    """Per-row quadratic fit of the backdrop from the left/right edge strips of the temporal median."""
    med = np.median(frames[:: max(1, len(frames) // 24)], axis=0).astype(np.float32)
    strip = int(W_OUT * 0.10)
    xs = np.r_[np.arange(0, strip), np.arange(W_OUT - strip, W_OUT)].astype(np.float32)
    xn = (xs - W_OUT / 2) / (W_OUT / 2)
    A = np.stack([np.ones_like(xn), xn, xn ** 2], axis=1)
    full_x = (np.arange(W_OUT, dtype=np.float32) - W_OUT / 2) / (W_OUT / 2)
    F = np.stack([np.ones_like(full_x), full_x, full_x ** 2], axis=1)
    bg = np.empty((H_OUT, W_OUT, 3), np.float32)
    for c in range(3):
        Y = med[:, np.r_[0:strip, W_OUT - strip:W_OUT], c].T  # (n, H)
        coef, *_ = np.linalg.lstsq(A, Y, rcond=None)           # (3, H)
        bg[:, :, c] = (F @ coef).T
    # smooth vertically to kill row noise
    k = np.exp(-0.5 * (np.arange(-24, 25) / 8.0) ** 2); k /= k.sum()
    pad = np.pad(bg, ((24, 24), (0, 0), (0, 0)), mode="edge")
    return sum(k[i] * pad[i:i + H_OUT] for i in range(len(k)))


def smoothstep(e0: float, e1: float, x: np.ndarray) -> np.ndarray:
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


def blur_w(w: np.ndarray, sigma: float = 1.1) -> np.ndarray:
    """Tiny separable gaussian on the backdrop weight to remove dithering speckles."""
    r = int(sigma * 3)
    k = np.exp(-0.5 * (np.arange(-r, r + 1) / sigma) ** 2); k /= k.sum()
    p = np.pad(w[..., 0], r, mode="edge")
    p = sum(k[i] * p[:, i:i + w.shape[1]] for i in range(len(k)))
    p = sum(k[i] * p[i:i + w.shape[0], :] for i in range(len(k)))
    return p[..., None]


def whiten(frames: np.ndarray, bg: np.ndarray, fade_bottom: float) -> np.ndarray:
    out = np.empty(frames.shape, np.uint8)
    y = np.linspace(0, 1, H_OUT, dtype=np.float32)[:, None, None]
    g = smoothstep(1 - fade_bottom, 1.0, y) if fade_bottom > 0 else np.zeros_like(y)
    for i, f in enumerate(frames):
        f = f.astype(np.float32)
        diff = (f - bg).mean(axis=2, keepdims=True)           # signed: + = brighter than the backdrop
        d = np.abs(f - bg).max(axis=2, keepdims=True)
        # darker-than-backdrop pixels use a wide tolerance; brighter ones (white shirt) a narrow one
        w = 1 - np.where(diff > 0, smoothstep(5, 11, d), smoothstep(7, 22, d))   # 1 on the backdrop, 0 on the person
        w = blur_w(w)
        f = f * (1 - w) + 255 * w
        f = f * (1 - g) + 255 * g
        out[i] = np.clip(f + 0.5, 0, 255).astype(np.uint8)
    return out


def loop_frames(frames: np.ndarray, x: int) -> np.ndarray:
    n = len(frames)
    head = frames[:x].astype(np.float32)
    tail = frames[n - x:].astype(np.float32)
    w = ((np.arange(x, dtype=np.float32) + 1) / (x + 1))[:, None, None, None]
    blend = np.clip(tail * (1 - w) + head * w + 0.5, 0, 255).astype(np.uint8)
    return np.concatenate([frames[x:n - x], blend])


def decode_audio(src, start, end) -> np.ndarray:
    raw = subprocess.check_output(
        ["ffmpeg", "-v", "error", "-ss", str(start), "-to", str(end), "-i", src, "-vn",
         "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"])
    return np.frombuffer(raw, np.float32).copy()


def normalise_voice(a: np.ndarray) -> np.ndarray:
    """Float-domain gain (undoes the over-driven source), then a gentle tanh limiter."""
    gate = np.abs(a) > np.percentile(np.abs(a), 60)
    rms = np.sqrt(np.mean(a[gate] ** 2)) + 1e-9
    a = a * (10 ** (-17 / 20) / rms)          # speech at about -17 dBFS RMS
    ceiling = 0.89                              # -1 dBFS
    return (ceiling * np.tanh(a / ceiling)).astype(np.float32)


def loop_audio(a: np.ndarray, x_s: float) -> np.ndarray:
    x = int(round(x_s * SR))
    t = np.linspace(0, 1, x, dtype=np.float32)
    head, tail = a[:x], a[len(a) - x:]
    blend = tail * np.cos(t * np.pi / 2) + head * np.sin(t * np.pi / 2)  # equal-power
    return np.concatenate([a[x:len(a) - x], blend]).astype(np.float32)


def write_wav(path: Path, a: np.ndarray) -> None:
    pcm = (np.clip(a, -1, 1) * 32767).astype("<i2")
    run(["ffmpeg", "-v", "error", "-y", "-f", "s16le", "-ar", str(SR), "-ac", "1", "-i", "-", str(path)],
        input=pcm.tobytes())


def encode(frames: np.ndarray, wav: Path, mp4: Path, webm: Path) -> None:
    base = ["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24",
            "-s", f"{W_OUT}x{H_OUT}", "-r", str(FPS), "-i", "-", "-i", str(wav)]
    data = frames.tobytes()
    run(base + ["-c:v", "libx264", "-preset", "slow", "-crf", "24", "-pix_fmt", "yuv420p",
                "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", "-shortest", str(mp4)], input=data)
    run(base + ["-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "36", "-pix_fmt", "yuv420p",
                "-c:a", "libopus", "-b:a", "80k", "-shortest", str(webm)], input=data)


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--src", required=True)
    p.add_argument("--out", default="public/hero")
    p.add_argument("--start", type=float, required=True, help="first second to use (before the first word)")
    p.add_argument("--end", type=float, required=True, help="last second to use (after the last word)")
    p.add_argument("--xfade", type=float, default=0.5)
    p.add_argument("--crop-x", type=int, default=None)
    p.add_argument("--fade-bottom", type=float, default=0.16)
    p.add_argument("--trim", type=int, default=4, help="px cut from left/right/bottom (editor outline)")
    p.add_argument("--trim-top", type=int, default=16, help="px cut from the top (outline + handle dot)")
    a = p.parse_args()

    out = Path(a.out); out.mkdir(parents=True, exist_ok=True)
    sw, sh = probe_size(a.src)
    crop_y = a.trim_top
    crop_h = sh - a.trim_top - a.trim
    crop_w = int(round(crop_h * W_OUT / H_OUT)) // 2 * 2
    crop_x = a.crop_x if a.crop_x is not None else detect_crop_x(
        a.src, (a.start + a.end) / 2, crop_w, sh, sw, a.trim, a.trim_top)
    print(f"source {sw}x{sh}, crop {crop_w}x{crop_h} at x={crop_x}, y={crop_y}")

    frames = decode_frames(a.src, a.start, a.end, crop_x, crop_y, crop_w, crop_h)
    print(f"{len(frames)} frames @ {FPS} fps")
    frames = whiten(frames, fit_backdrop(frames), a.fade_bottom)
    x = int(round(a.xfade * FPS))
    frames = loop_frames(frames, x)

    audio = loop_audio(normalise_voice(decode_audio(a.src, a.start, a.end)), a.xfade)
    # keep audio and picture exactly the same length
    n = int(round(len(frames) / FPS * SR))
    audio = np.pad(audio, (0, max(0, n - len(audio))))[:n]
    wav = out / "_voice.wav"
    write_wav(wav, audio)
    encode(frames, wav, out / "hero.mp4", out / "hero.webm")
    wav.unlink()

    # stills (optional)
    try:
        from PIL import Image
        Image.fromarray(frames[len(frames) // 3]).save(out / "_poster.png")
    except ImportError:
        pass
    print(f"loop length {len(frames) / FPS:.2f}s -> {out}/hero.mp4, hero.webm")
    return 0


if __name__ == "__main__":
    sys.exit(main())
