"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

import { usePrefersReducedMotion } from "@/lib/hooks";

export function HeroVideo({ transcriptId }: { transcriptId: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const visibleRef = useRef(true);
  const reduceMotion = usePrefersReducedMotion();
  const [soundOn, setSoundOn] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) return;
    video.muted = false;
    video
      .play()
      .then(() => setSoundOn(true))
      .catch(() => {
        video.muted = true;
        video.play().catch(() => undefined);
        setBlocked(true);
      });
  }, [reduceMotion]);

  useEffect(() => {
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !wrapper) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const visible = entry.intersectionRatio >= 0.35;
        visibleRef.current = visible;
        if (!visible) video.pause();
        else if (!reduceMotion && video.paused) {
          video.play().catch(() => undefined);
        }
      },
      { threshold: [0, 0.35, 0.6, 1] },
    );
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    if (!blocked) return;
    const unlock = (event: Event) => {
      if (buttonRef.current?.contains(event.target as Node)) return;
      const video = videoRef.current;
      if (!video) return;
      video.muted = false;
      video
        .play()
        .then(() => {
          setSoundOn(true);
          setBlocked(false);
        })
        .catch(() => {
          video.muted = true;
        });
    };
    const events = ["pointerdown", "keydown", "touchend"] as const;
    events.forEach((name) =>
      window.addEventListener(name, unlock, { once: true, passive: true }),
    );
    return () =>
      events.forEach((name) => window.removeEventListener(name, unlock));
  }, [blocked]);

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    if (soundOn) {
      video.muted = true;
      setSoundOn(false);
      return;
    }
    video.muted = false;
    video
      .play()
      .then(() => {
        setSoundOn(true);
        setBlocked(false);
      })
      .catch(() => {
        video.muted = true;
      });
  }

  return (
    <div
      ref={wrapperRef}
      className="relative mx-auto shrink-0 aspect-768/960 h-[62svh] max-h-260 sm:h-[min(96svh,1040px)]"
    >
      <video
        ref={videoRef}
        className="hero-video absolute inset-0 size-full object-cover"
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero/poster.webp"
        aria-describedby={transcriptId}
        aria-label="Vídeo de apresentação de Warley Coutinho"
      >
        <source src="/hero/hero.webm" type="video/webm" />
        <source src="/hero/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute bottom-[9%] left-1/2 -translate-x-1/2">
        {blocked && !soundOn && (
          <span
            aria-hidden="true"
            className="animate-ping-ring absolute inset-0 rounded-full bg-ink"
          />
        )}
        <button
          ref={buttonRef}
          type="button"
          onClick={toggleSound}
          aria-label={
            soundOn
              ? "Pausar som da apresentação"
              : "Ativar som da apresentação"
          }
          aria-pressed={soundOn}
          className="relative grid size-11.5 place-items-center rounded-full bg-ink text-paper shadow-[0_10px_30px_-10px_rgba(13,13,13,0.5)] transition-transform duration-300 ease-(--ease) hover:scale-105 active:scale-95"
        >
          {soundOn ? (
            <Pause className="size-4 fill-current" />
          ) : (
            <Play className="size-4 translate-x-px fill-current" />
          )}
        </button>
      </div>
    </div>
  );
}
