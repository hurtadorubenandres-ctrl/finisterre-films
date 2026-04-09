import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Articles, interviews, and behind-the-scenes notes from Finisterre Films.',
}

const NOTES = [
  {
    slug: 'finisterre-films-festival-malaga-2025',
    title: 'Finisterre Films at the Málaga Festival 2025',
    category: 'Festivals',
    author: 'Finisterre Team',
    date: 'March 20, 2025',
    excerpt: 'We presented three titles in the official section of Spain\'s most important film festival.',
  },
  {
    slug: 'creative-process-o-faro',
    title: 'The Creative Process Behind "O faro"',
    category: 'Making Of',
    author: 'Mauro Herce',
    date: 'February 10, 2025',
    excerpt: 'Mauro Herce talks about three years of filming in Atlantic lighthouses.',
  },
  {
    slug: 'new-season-podcast',
    title: 'New Season of the Fin del Mundo Podcast',
    category: 'Podcast',
    author: 'Finisterre Team',
    date: 'January 15, 2025',
    excerpt: 'Our podcast returns with 10 new episodes about European independent cinema.',
  },
  {
    slug: 'galician-cinema-2024-retrospective',
    title: 'Galician Cinema in 2024: A Retrospective',
    category: 'Essays',
    author: 'Ana Jofre',
    date: 'December 30, 2024',
    excerpt: 'A look back at the films and filmmakers who defined Galician cinema this year.',
  },
  {
    slug: 'interview-lois-patino',
    title: 'Interview: Lois Patiño on "Atlántico"',
    category: 'Interviews',
    author: 'Finisterre Team',
    date: 'November 5, 2024',
    excerpt: 'The director of Atlántico discusses light, landscape, and the Atlantic imagination.',
  },
  {
    slug: 'on-independent-film-distribution',
    title: 'On Independent Film Distribution in Spain',
    category: 'Industry',
    author: 'Finisterre Team',
    date: 'October 12, 2024',
    excerpt: 'How smaller distributors are carving space for non-mainstream cinema.',
  },
]

const CATEGORIES = ['All', 'Festivals', 'Making Of', 'Podcast', 'Essays', 'Interviews', 'Industry']

export default function NotesPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 mb-8">
          <h1 className="text-xs uppercase tracking-widest font-semibold text-black mb-1">Notes</h1>
          <p className="text-sm text-gray-500">Articles, interviews, and behind-the-scenes notes.</p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-4 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`text-xs uppercase tracking-widest font-medium pb-1 border-b transition-colors ${
                cat === 'All'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-400 hover:text-black hover:border-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {NOTES.map((note) => (
            <Link key={note.slug} href={`/notes/${note.slug}`} className="group">
              <div className="bg-gray-100 aspect-video mb-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center group-hover:from-gray-250 group-hover:to-gray-350 transition-colors">
                  <span className="text-gray-400 text-xs uppercase tracking-wider">Image</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{note.category}</p>
              <h3 className="text-sm font-semibold text-black leading-snug group-hover:text-gray-500 transition-colors line-clamp-2 mb-1">
                {note.title}
              </h3>
              <p className="text-xs text-gray-400">{note.author} · {note.date}</p>
            </Link>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link href="/" className="text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
