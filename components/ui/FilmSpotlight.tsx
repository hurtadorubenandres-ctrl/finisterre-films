/**
 * FilmSpotlight — A24-style full-bleed featured film section
 *
 * Renders a full-width image with a gradient overlay and title/CTA
 * positioned at the bottom-left, matching A24's "WATCH NOW" sections.
 *
 * Props:
 *   label    — Uppercase label above the title (e.g. "VER AHORA")
 *   title    — Film title (large)
 *   image    — Hero image URL (optional — placeholder if omitted)
 *   href     — Link destination (film detail page)
 *   cta      — CTA text (default: "VER AHORA")
 */

import Link from 'next/link'
import Image from 'next/image'

export interface FilmSpotlightProps {
  label?: string
  title: string
  image?: string
  href: string
  cta?: string
}

export default function FilmSpotlight({
  label = 'VER AHORA',
  title,
  image,
  href,
  cta = 'VER AHORA',
}: FilmSpotlightProps) {
  return (
    <section
      className="relative w-full overflow-hidden bg-black group"
      style={{ minHeight: '60vh' }}
    >
      {/* ── Background image ── */}
      {image ? (
        <Image
          src={image}
          alt={title}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.015]"
        />
      ) : (
        // ── Placeholder: replace with <Image src="..." />
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-900" />
      )}

      {/* ── Bottom-to-top gradient overlay (text legibility) ── */}
      <div className="absolute inset-0 bg-spotlight-overlay" />

      {/* ── Wide veil to ensure text stays legible ── */}
      <div className="absolute inset-0 bg-black/25" />

      {/* ── Content — bottom left ── */}
      <Link
        href={href}
        className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 lg:p-16"
        aria-label={`${cta}: ${title}`}
      >
        {/* Label */}
        <p className="text-xs uppercase tracking-[0.18em] font-medium text-white/70 mb-3">
          {label}
        </p>

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.0] tracking-tight mb-5 max-w-3xl text-balance">
          {title}
        </h2>

        {/* CTA arrow */}
        <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.14em] font-medium text-white/75 group-hover:text-white transition-colors w-fit">
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          {cta}
        </span>
      </Link>
    </section>
  )
}
