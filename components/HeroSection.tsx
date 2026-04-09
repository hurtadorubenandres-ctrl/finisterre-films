'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────
export interface HeroFilm {
  id: string
  title: string
  year: number | string
  /** URL slug for /films/[slug] */
  slug?: string
  /** Full URL or path to the hero/poster image */
  posterImage?: string
  status?: 'upcoming' | 'released' | 'archive'
}

interface HeroSectionProps {
  films: HeroFilm[]
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function HeroSection({ films }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-cycle through films every 4s (pauses on hover)
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % films.length)
    }, 4000)
    return () => clearInterval(id)
  }, [films.length])

  const active = films[activeIndex]

  return (
    <section className="relative w-full overflow-hidden bg-black" style={{ height: '100dvh', minHeight: '600px' }}>

      {/* ── Background image (swaps with active film) ── */}
      {active?.posterImage ? (
        <Image
          key={active.id}
          src={active.posterImage}
          alt={active.title}
          fill
          priority
          sizes="100vw"
          className="object-cover animate-fade-in"
        />
      ) : (
        // Placeholder gradient — swap with your own images
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-800" />
      )}

      {/* ── Overlay: left-heavy gradient for legibility ── */}
      <div className="absolute inset-0 bg-hero-overlay" />
      {/* Subtle dark veil */}
      <div className="absolute inset-0 bg-black/35" />

      {/* ── Film title list (A24-style: stacked, left-aligned) ── */}
      <div className="absolute inset-0 flex flex-col justify-end pb-12 sm:pb-16 px-5 sm:px-10 lg:px-14">
        <ul
          className="flex flex-col gap-0.5 max-w-3xl"
          onMouseLeave={() => {}} // keep active on mouse leave
        >
          {films.map((film, i) => {
            const isActive = i === activeIndex
            const href = `/films/${film.slug ?? film.id}`
            return (
              <li key={film.id}>
                <Link
                  href={href}
                  onMouseEnter={() => setActiveIndex(i)}
                  onFocus={() => setActiveIndex(i)}
                  className={`group inline-flex items-baseline gap-3 sm:gap-4 transition-all duration-400 ${
                    isActive ? 'opacity-100' : 'opacity-35 hover:opacity-65'
                  }`}
                >
                  {/* Title */}
                  <span
                    className={`font-bold text-white leading-[1.0] tracking-tight transition-all duration-400 ${
                      isActive
                        ? 'text-[clamp(2rem,6vw,5.5rem)]'
                        : 'text-[clamp(1.5rem,4.5vw,4rem)]'
                    }`}
                  >
                    {film.title}
                  </span>
                  {/* Year */}
                  <span
                    className={`font-normal text-a24-gray-light tabular-nums transition-all duration-400 ${
                      isActive ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                    }`}
                  >
                    {film.year}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* ── Film counter — top right ── */}
      <div className="absolute top-16 right-6 sm:right-10 font-mono text-white/40 text-[11px] tracking-widest select-none">
        {String(activeIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(films.length).padStart(2, '0')}
      </div>

      {/* ── Scroll indicator — bottom right ── */}
      <div className="absolute bottom-8 right-6 sm:right-10 flex flex-col items-center gap-2 select-none pointer-events-none">
        <span
          className="text-white/40 text-[10px] uppercase tracking-[0.2em]"
          style={{ writingMode: 'vertical-rl' }}
        >
          SCROLL
        </span>
        <span className="text-white/50 text-xl mt-1 animate-bounce">↓</span>
      </div>

    </section>
  )
}
