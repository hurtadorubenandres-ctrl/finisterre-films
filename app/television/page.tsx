import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Television',
  description: 'Finisterre Films television productions and series.',
}

const TV_SHOWS = [
  { id: 'tv1', title: 'Costa da Morte', year: 2024, episodes: 6, status: 'available', director: 'Mauro Herce', genre: 'Drama' },
  { id: 'tv2', title: 'Xente de aquí', year: 2025, episodes: 8, status: 'upcoming', director: 'Ana Jofre', genre: 'Documentary Series' },
  { id: 'tv3', title: 'O río', year: 2023, episodes: 4, status: 'available', director: 'Lois Patiño', genre: 'Drama' },
]

export default function TelevisionPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 mb-10">
          <h1 className="text-xs uppercase tracking-widest font-semibold text-black mb-1">Television</h1>
          <p className="text-sm text-gray-500">Series, miniseries and television productions by Finisterre Films.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TV_SHOWS.map((show) => (
            <div key={show.id} className="group cursor-pointer">
              <div className="bg-gray-100 aspect-video mb-3 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center group-hover:from-gray-250 group-hover:to-gray-350 transition-colors">
                  <span className="text-gray-400 text-xs uppercase tracking-wider">Series Still</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{show.genre} · {show.episodes} episodes</p>
              <h3 className="text-sm font-semibold text-black group-hover:text-gray-500 transition-colors">
                {show.title}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {show.year} · Dir. {show.director} ·{' '}
                <span className={show.status === 'upcoming' ? 'text-gray-400' : 'text-black'}>
                  {show.status === 'upcoming' ? 'Coming Soon' : 'Watch Now'}
                </span>
              </p>
            </div>
          ))}
        </div>

        {/* Back */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link href="/" className="text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
