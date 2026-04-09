/**
 * Film Detail Page — A24-style
 *
 * Layout:
 *   - Full-bleed hero image (70vh) with bottom-to-white gradient
 *   - Genre tags + Large title + Director / Year / Runtime
 *   - Two-column: synopsis (left, 2/3) + metadata sidebar (right, 1/3)
 *   - CTAs: trailer + shop
 *   - Back link footer strip
 *
 * TODO: Replace static FILM_DATA with a server-side fetch from MongoDB
 *       using params.slug to look up the film.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

// ─── SAMPLE DATA — replace with DB fetch ──────────────
const FILM_DATA = {
  slug:      'o-faro-do-fin-do-mundo',
  title:     'O faro do fin do mundo',
  year:      2024,
  director:  'Mauro Herce',
  synopsis:  'Una historia sobre el límite entre el mar y la tierra, rodada a lo largo de tres años en los faros del Atlántico. Una meditación sobre el tiempo, el aislamiento y la necesidad humana de proyectar luz en la oscuridad.',
  longSynopsis: 'O faro do fin do mundo es el primer largometraje de Mauro Herce, director de fotografía reconocido internacionalmente. Durante tres años, Herce convivió con los fareros que habitan los últimos faros habitados de la costa gallega, documentando su soledad y su extraña relación con el océano. La película combina el documental observacional con una sensibilidad casi poética, creando un retrato único de un mundo que desaparece.',
  genres:    ['Drama', 'Documental'],
  runtime:   98,
  cast:      ['Manuel Regueiro', 'Xiana Iglesias', 'Pedro Alves'],
  awards:    ['Mejor Fotografía – FICX 2024', 'Selección oficial – San Sebastián 2024', 'Mejor Documental – Atlántico Film Festival'],
  status:    'released' as const,
  posterImage: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=1600&h=900&q=85',
  trailerUrl:  '',      // Replace: 'https://youtube.com/watch?v=...'
  releaseDate: '15 de septiembre de 2024',
}
// ──────────────────────────────────────────────────────

interface FilmPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: FilmPageProps): Promise<Metadata> {
  // TODO: fetch title from DB by params.slug
  return {
    title: FILM_DATA.title,
    description: FILM_DATA.synopsis,
  }
}

export default function FilmDetailPage({ params }: FilmPageProps) {
  const film = FILM_DATA  // TODO: fetch from DB by params.slug

  return (
    <div className="bg-white text-black">

      {/* ── Hero image ── */}
      <div className="relative w-full bg-black" style={{ height: '70vh', minHeight: '400px' }}>
        {film.posterImage ? (
          <Image
            src={film.posterImage}
            alt={film.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-top opacity-85"
          />
        ) : (
          // Placeholder — replace posterImage above
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-800" />
        )}
        {/* Gradient: image fades into white page below */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* ── Film content ── */}
      <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 -mt-20 relative z-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* ── Main column (left 2/3) ── */}
          <div className="lg:col-span-2">

            {/* Genre tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {film.genres.map((g) => (
                <span
                  key={g}
                  className="text-[10px] uppercase tracking-widest border border-black px-2.5 py-1 font-medium"
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.0] mb-4 text-balance">
              {film.title}
            </h1>

            {/* Meta line */}
            <p className="text-sm text-a24-gray-mid mb-8 font-medium">
              Dir. {film.director}
              <span className="mx-2 text-a24-gray-light">·</span>
              {film.year}
              <span className="mx-2 text-a24-gray-light">·</span>
              {film.runtime} min.
            </p>

            {/* Synopsis */}
            <p className="text-base text-a24-gray-dark leading-relaxed max-w-2xl mb-6">
              {film.synopsis}
            </p>
            {film.longSynopsis && (
              <p className="text-sm text-a24-gray-mid leading-relaxed max-w-2xl mb-10">
                {film.longSynopsis}
              </p>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-8 pt-2">
              {film.trailerUrl && (
                <a
                  href={film.trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.14em] font-medium text-black group"
                >
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                  <span className="group-hover:opacity-50 transition-opacity">Ver tráiler</span>
                </a>
              )}
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.14em] font-medium text-black group"
              >
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                <span className="group-hover:opacity-50 transition-opacity">Comprar en tienda</span>
              </Link>
              <Link
                href="/membership"
                className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.14em] font-medium text-a24-gray-mid hover:text-black group transition-colors"
              >
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                <span>Membership</span>
              </Link>
            </div>
          </div>

          {/* ── Sidebar metadata (right 1/3) ── */}
          <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-a24-section-light pt-8 lg:pt-0 lg:pl-10">
            <dl className="space-y-7">

              {/* Director */}
              <div>
                <dt className="label-tag mb-1.5">Director</dt>
                <dd className="text-sm font-medium text-black">{film.director}</dd>
              </div>

              {/* Year */}
              <div>
                <dt className="label-tag mb-1.5">Año</dt>
                <dd className="text-sm font-medium text-black">{film.year}</dd>
              </div>

              {/* Runtime */}
              <div>
                <dt className="label-tag mb-1.5">Duración</dt>
                <dd className="text-sm font-medium text-black">{film.runtime} min.</dd>
              </div>

              {/* Genres */}
              <div>
                <dt className="label-tag mb-1.5">Género</dt>
                <dd className="text-sm text-black">{film.genres.join(', ')}</dd>
              </div>

              {/* Cast */}
              {film.cast.length > 0 && (
                <div>
                  <dt className="label-tag mb-1.5">Reparto</dt>
                  <dd className="text-sm text-black leading-relaxed">{film.cast.join(', ')}</dd>
                </div>
              )}

              {/* Release date */}
              <div>
                <dt className="label-tag mb-1.5">Estreno</dt>
                <dd className="text-sm text-black">{film.releaseDate}</dd>
              </div>

              {/* Awards */}
              {film.awards.length > 0 && (
                <div>
                  <dt className="label-tag mb-2">Premios</dt>
                  <dd>
                    <ul className="space-y-2">
                      {film.awards.map((a) => (
                        <li key={a} className="text-xs text-a24-gray-dark leading-snug">
                          — {a}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}

            </dl>
          </div>
        </div>
      </div>

      {/* ── Back navigation ── */}
      <div className="border-t border-a24-section-light">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 py-5">
          <Link
            href="/films"
            className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.14em] font-medium text-a24-gray-mid hover:text-black transition-colors duration-200"
          >
            ← Todas las películas
          </Link>
        </div>
      </div>

    </div>
  )
}
