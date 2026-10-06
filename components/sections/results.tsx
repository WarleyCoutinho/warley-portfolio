"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  animate,
  m,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

import { SectionHeading } from "@/components/ui/section-heading";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/hooks";
import { RESULTS, type ResultItem } from "@/lib/data";
import { cn } from "@/lib/utils";

const EASE_OUT_QUART = [0.165, 0.84, 0.44, 1] as const;

function CountUp({ item, instant }: { item: ResultItem; instant: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px 0px 0px" });
  const [value, setValue] = useState(instant ? item.to : item.from);

  useEffect(() => {
    if (!seen || instant) return;
    const controls = animate(item.from, item.to, {
      duration: 1.4,
      ease: EASE_OUT_QUART,
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [seen, instant, item.from, item.to]);

  const shown = instant ? item.to : value;
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="font-bold tracking-[-0.06em] tabular-nums"
    >
      {item.prefix && (
        <span className="mr-1 font-mono text-[0.26em] font-medium tracking-normal align-baseline">
          {item.prefix}
        </span>
      )}
      {shown}
      <span className="text-[0.55em] tracking-tight">{item.suffix}</span>
    </span>
  );
}

const Card = ({
  item,
  index,
  total,
  active,
  instant,
  cardRef,
}: {
  item: ResultItem;
  index: number;
  total: number;
  active: boolean;
  instant: boolean;
  cardRef: (node: HTMLLIElement | null) => void;
}) => (
  <li
    ref={cardRef}
    data-active={active}
    aria-label={`${item.prefix ?? ""}${item.to}${item.suffix} ${item.label}: ${item.caption}`}
    className={cn(
      "relative flex h-[clamp(260px,36vh,310px)] w-[clamp(340px,40vw,540px)] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-[28px] bg-card p-6 transition-[transform,box-shadow] duration-700 ease-(--ease)",
      active
        ? "-translate-y-3 shadow-[inset_0_0_0_1px_var(--color-line),0_40px_70px_-30px_rgba(13,13,13,0.38)]"
        : "shadow-[inset_0_0_0_1px_var(--color-line),0_14px_30px_-22px_rgba(13,13,13,0.2)]",
    )}
  >
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -right-16 -bottom-20 size-64 rounded-full bg-[radial-gradient(circle,rgba(13,13,13,0.1),transparent_70%)] transition-opacity duration-700",
        active ? "opacity-100" : "opacity-30",
      )}
    />
    <div className="flex items-start justify-between">
      <span
        aria-hidden="true"
        className="grid size-18 place-items-center rounded-[20px] bg-soft font-mono text-[17px] font-semibold tracking-wide"
      >
        {item.context}
      </span>
      <span
        aria-hidden="true"
        className="font-mono text-[12px] tracking-widest text-dim"
      >
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
    <div className="relative flex items-end justify-between gap-3">
      <div className="min-w-0 max-w-[52%]">
        <p className="text-[15px] leading-snug font-semibold">{item.label}</p>
        <p className="mt-1 text-[13px] leading-snug text-dim">{item.caption}</p>
        <p className="mt-2 font-mono text-[10.5px] tracking-widest text-faint uppercase">
          {item.detail}
        </p>
      </div>
      <p className="text-[clamp(3rem,5.2vw,4.6rem)] leading-[0.85]">
        <CountUp item={item} instant={instant} />
      </p>
    </div>
  </li>
);

export function Results() {
  const wide = useMediaQuery("(min-width: 768px)");
  const reduceMotion = usePrefersReducedMotion();
  const pinned = wide && !reduceMotion;

  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [travel, setTravel] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setTravel(Math.max(0, track.scrollWidth - window.innerWidth));
  }, []);

  useLayoutEffect(() => {
    if (!pinned) return;
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned, measure]);

  const updateActive = useCallback(() => {
    const center = window.innerWidth / 2;
    let best = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    cardRefs.current.forEach((node, i) => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - center);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    });
    setActiveIndex(best);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", () => {
    if (pinned) updateActive();
  });

  const setCardRef = (i: number) => (node: HTMLLIElement | null) => {
    cardRefs.current[i] = node;
  };

  const heading = (
    <div className="container-x">
      <SectionHeading
        index="06"
        label="Resultados"
        accent="contam."
        id="resultados-title"
      >
        Números que
      </SectionHeading>
      {pinned && (
        <div aria-hidden="true" className="mt-8 h-px w-full bg-line">
          <m.div
            className="h-full origin-left bg-ink"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      )}
    </div>
  );

  const cards = RESULTS.map((item, i) => (
    <Card
      key={item.id}
      item={item}
      index={i}
      total={RESULTS.length}
      active={pinned ? activeIndex === i : false}
      instant={reduceMotion}
      cardRef={setCardRef(i)}
    />
  ));

  const outro = (
    <li
      aria-hidden="true"
      className="flex h-[clamp(260px,36vh,310px)] shrink-0 snap-center items-center pr-[12vw] pl-6"
    >
      <span className="h-display text-[clamp(2rem,4vw,3.4rem)] whitespace-nowrap">
        e <span className="accent">continuo →</span>
      </span>
    </li>
  );

  if (!pinned) {
    return (
      <section
        id="resultados"
        aria-labelledby="resultados-title"
        className="section-y"
      >
        {heading}
        <ol
          tabIndex={0}
          aria-label="Resultados, role para o lado"
          className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-(--gutter) pt-4 pb-10 scrollbar-thin"
        >
          {cards}
          {outro}
        </ol>
      </section>
    );
  }

  return (
    <section id="resultados" aria-labelledby="resultados-title">
      <div
        ref={outerRef}
        style={{ height: `calc(100svh + ${travel}px)` }}
        className="relative"
      >
        <div className="sticky top-0 flex h-svh flex-col justify-center gap-12 overflow-hidden">
          {heading}
          <m.ol
            ref={trackRef}
            style={{ x }}
            className="flex w-max gap-6 px-(--gutter) pt-4 will-change-transform"
          >
            {cards}
            {outro}
          </m.ol>
        </div>
      </div>
    </section>
  );
}
