import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Docs',
  description: 'Documentary films by Finisterre Films.',
}

const DOCS = [
  { id: 'd1', title: 'Atlántico', year: 2024, director: 'Lois Patiño', runtime: 75, status: 'released' },
  { id: 'd2', title: 'O mar interior', year: 2023, director: 'Mauro Herce', runtime: 82, status: 'released' },
  { id: 'd3', title: 'Galegas', year: 2025, director: 'Sara Fonseca', runtime: 67, status: 'upcoming' },
  { id: 'd4', title: 'Pedra e auga', year: 2024, director: 'Xoán Díaz', runtime: 90, status: 'released' },
]

export default function DocsPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 mb-10">
          <h1 className="text-xs uppercase tracking-widest font-semibold text-black mb-1">Docs</h1>
          <p className="text-sm text-gray-500">Documentary films produced and distributed by Finisterre Films.</p>
        </div>

        {/* List layout (A24 docs style) */}
        <div className="space-y-0">
          {DOCS.map((doc, i) => (
            <div key={doc.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 py-8 ${i < DOCS.length - 1 ? 'border-b border-gray-200' : ''}`}>
              <div className="bg-gray-100 aspect-video relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-gray-400 text-xs uppercase tracking-wider">Documentary Still</span>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                  {doc.year} · {doc.runtime} min
                </p>
                <h3 className="text-xl font-bold text-black mb-2">{doc.title}</h3>
                <p className="text-sm text-gray-500 mb-4">Directed by {doc.director}</p>
                <div>
                  {doc.status === 'upcoming' ? (
                    <span className="text-xs uppercase tracking-widest text-gray-400 border border-gray-300 px-4 py-2">
                      Coming Soon
                    </span>
                  ) : (
                    <Link href={`/films/${doc.id}`} className="btn-primary inline-block">
                      Watch Now
                    </Link>
                  )}
                </div>
              </div>
            </div>
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
