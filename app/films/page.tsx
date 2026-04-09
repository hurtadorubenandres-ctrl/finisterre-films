/**
 * Films Page — A24-style grid catalog
 *
 * Layout:
 *   - Page header: "Películas" large title + film count
 *   - Sticky filter tabs (Todo / Estrenadas / Próximamente / Archivo)
 *   - Responsive grid: 2 → 3 → 4 → 5 columns
 *   - Film card: portrait poster + year + title + director
 *   - Hover: poster scale-up + title opacity dim
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import type { IFilm } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Películas',
  description: 'Catálogo completo de películas producidas por Finisterrae Films.',
}

// ─── SAMPLE DATA — replace with MongoDB fetch ────────────────
const FILMS: IFilm[] = [
  {
    _id: '1', title: 'O faro do fin do mundo', year: 2024,
    director: 'Mauro Herce',
    synopsis: 'A story about the boundary between sea and land.',
    genres: ['Drama', 'Documental'], runtime: 98,
    posterImage: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=600&h=900&q=80',
    trailerUrl: '', cast: [],
    awards: ['Mejor Fotografía – FICX'],
    releaseDate: new Date('2024-09-15'),
    status: 'released', featured: true, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    _id: '2', title: 'Sal de la tierra', year: 2025,
    director: 'Ana Jofre',
    synopsis: 'Three generations of women in a Galician coastal village.',
    genres: ['Drama'], runtime: 112,
    posterImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&h=900&q=80',
    trailerUrl: '', cast: [], awards: [],
    releaseDate: new Date('2025-03-01'),
    status: 'upcoming', featured: true, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    _id: '3', title: 'Marea', year: 2025,
    director: 'Carlos Iglesias',
    synopsis: 'The sea as protagonist in a story of love and loss.',
    genres: ['Romance', 'Drama'], runtime: 89,
    posterImage: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=600&h=900&q=80',
    trailerUrl: '', cast: [], awards: [],
    releaseDate: new Date('2025-06-10'),
    status: 'upcoming', featured: false, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    _id: '4', title: 'Atlántico', year: 2024,
    director: 'Lois Patiño',
    synopsis: 'Fragments of the Galician Atlantic.',
    genres: ['Experimental'], runtime: 75,
    posterImage: 'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?auto=format&fit=crop&w=600&h=900&q=80',
    trailerUrl: '', cast: [], awards: ['Mejor Fotografía – FICX'],
    releaseDate: new Date('2024-11-20'),
    status: 'released', featured: false, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    _id: '5', title: 'O camiño de volta', year: 2025,
    director: 'Sara Fonseca',
    synopsis: 'A journey back through memory and landscape.',
    genres: ['Drama'], runtime: 103,
    posterImage: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?auto=format&fit=crop&w=600&h=900&q=80',
    trailerUrl: '', cast: [], awards: [],
    releaseDate: new Date('2025-09-20'),
    status: 'upcoming', featured: false, createdAt: new Date(), updatedAt: new Date(),
  },
  {
    _id: '6', title: 'Brétema', year: 2024,
    director: 'Xoán Díaz',
    synopsis: 'Fog, memory, and the stories we inherit.',
    genres: ['Drama', 'Misterio'], runtime: 91,
    posterImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&h=900&q=80',
    trailerUrl: '', cast: [], awards: [],
    releaseDate: new Date('2024-05-10'),
    status: 'released', featured: false, createdAt: new Date(), updatedAt: new Date(),
  },
]
// ─────────────────────────────────────────────────────────────

export default function FilmsPage() {
  return (
    <div className="bg-white text-black min-h-screen">

      {/* ── Page header ── */}
      <div className="pt-20 pb-8 px-5 sm:px-8 border-b border-a24-section-light">
        <div className="max-w-screen-2xl mx-auto flex items-end justify-between gap-6">
          <div>
            <p className="label-tag mb-3">Catálogo</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
              Películas
            </h1>
          </div>
          <p className="hidden sm:block text-sm text-a24-gray-mid tabular-nums pb-1.5">
            {FILMS.length} títulos
          </p>
        </div>
      </div>

      {/* ── Sticky filter tabs ── */}
      <div className="border-b border-a24-section-light sticky top-12 bg-white z-10">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8">
          <div className="flex gap-0 overflow-x-auto no-scrollbar">
            {[
              { label: 'Todo',           count: FILMS.length },
              { label: 'Estrenadas',     count: FILMS.filter((f) => f.status === 'released').length },
              { label: 'Próximamente',   count: FILMS.filter((f) => f.status === 'upcoming').length },
              { label: 'Archivo',        count: FILMS.filter((f) => f.status === 'archive').length },
            ].map((tab, i) => (
              <button
                key={tab.label}
                className={`shrink-0 px-5 py-4 text-xs uppercase tracking-widest font-medium border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  i === 0
                    ? 'border-black text-black'
                    : 'border-transparent text-a24-gray-mid hover:text-black hover:border-a24-gray-light'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-1.5 text-a24-gray-mid font-normal">({tab.count})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Film grid ── */}
      <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-10 sm:gap-x-6 sm:gap-y-12">
          {FILMS.map((film) => (
            <Link
              key={String(film._id)}
              href={`/films/${film._id}`}
              className="group block"
            >
              {/* Poster */}
              <div className="relative aspect-poster overflow-hidden bg-a24-section-light mb-3">
                {film.posterImage ? (
                  <Image
                    src={film.posterImage}
                    alt={`${film.title} — póster`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                ) : (
                  // Placeholder — replace posterImage in data above
                  <div className="absolute inset-0 bg-gradient-to-b from-neutral-200 to-neutral-300 flex flex-col items-center justify-center gap-2">
                    <span className="text-neutral-400 text-[9px] uppercase tracking-wider">Póster</span>
                  </div>
                )}

                {/* Status badge */}
                {film.status === 'upcoming' && (
                  <div className="absolute top-2 left-2 bg-black text-white text-[9px] uppercase tracking-widest px-2 py-1 font-medium">
                    Próximamente
                  </div>
                )}
              </div>

              {/* Metadata */}
              <p className="text-[11px] text-a24-gray-mid tabular-nums mb-1">{film.year}</p>
              <h2 className="text-sm font-semibold text-black leading-snug line-clamp-2 mb-0.5 group-hover:opacity-50 transition-opacity duration-300">
                {film.title}
              </h2>
              <p className="text-[11px] text-a24-gray-mid">{film.director}</p>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
