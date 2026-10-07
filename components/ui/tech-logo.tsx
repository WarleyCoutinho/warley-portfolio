"use client";

import Image from "next/image";
import type { ReactElement } from "react";
import { BRAND, DARK_LOGOS, isConcept, type ConceptName } from "@/lib/tech-icons";

/** Ícones de linha (24x24, traço 1.5) para tecnologias sem logo de marca. */
const CONCEPT_PATHS: Record<ConceptName, ReactElement> = {
  "21st.dev": (
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" />
  ),
  Sonner: (
    <>
      <rect x="3" y="8" width="18" height="8" rx="4" />
      <path d="M8.5 12l2 2 4-4" />
    </>
  ),
  Orval: (
    <>
      <path d="M8 8l-4 4 4 4M16 8l4 4-4 4" />
      <path d="M13.5 6l-3 12" />
    </>
  ),
  Baileys: (
    <>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-4 4v-4H5.5A1.5 1.5 0 0 1 4 14.5z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
  "REST APIs": (
    <>
      <path d="M4 8h14M14.5 4.5L18 8l-3.5 3.5" />
      <path d="M20 16H6M9.5 12.5L6 16l3.5 3.5" />
    </>
  ),
  Microservices: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" />
    </>
  ),
  "Responsive Design": (
    <>
      <rect x="2.5" y="4" width="14" height="11" rx="1.5" />
      <path d="M6.5 18.5h6M9.5 15v3.5" />
      <rect x="15" y="9" width="6.5" height="11" rx="1.5" />
    </>
  ),
  OEE: (
    <>
      <path d="M4 17a8 8 0 1 1 16 0" />
      <path d="M12 17l4-5" />
      <circle cx="12" cy="17" r="1" />
    </>
  ),
  "Mobile First": (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M10.5 18.5h3M12 14.5v-5M9.8 11.7L12 9.5l2.2 2.2" />
    </>
  ),
};

type Props = { name: string; size?: number; className?: string };

/**
 * Logo de uma tecnologia. Decorativo (`alt=""`): o nome sempre aparece em
 * texto ao lado.
 */
export function TechLogo({ name, size = 20, className }: Props) {
  const slug = BRAND[name];
  if (slug) {
    return (
      <Image
        src={`/logos/${slug}.svg`}
        alt=""
        width={size}
        height={size}
        unoptimized
        onError={(e) => {
          e.currentTarget.style.display = "none"; // logo ainda não exportado: o chip fica só com o texto
        }}
        className={[className, DARK_LOGOS.has(slug) ? "logo-ink" : ""].filter(Boolean).join(" ") || undefined}
        style={{ width: size, height: size }}
      />
    );
  }
  if (isConcept(name)) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth={size > 40 ? 0.6 : 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={className}
      >
        {CONCEPT_PATHS[name]}
      </svg>
    );
  }
  return null;
}
