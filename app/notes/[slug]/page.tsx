import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Note',
}

export default function NoteDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="bg-white text-black min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <Link href="/notes" className="text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors">
            ← Notes
          </Link>
        </div>

        {/* Article placeholder */}
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Category · Date</p>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-black mb-4">
          Article title for <span className="font-mono">{params.slug}</span>
        </h1>
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-8">By Author Name</p>

        <div className="bg-gray-100 aspect-video mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-gray-400 text-xs uppercase tracking-wider">Featured Image</span>
          </div>
        </div>

        <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
          <p>
            This article content will be loaded from the database. Connect your MongoDB instance and
            populate the BlogPost collection to display real content here.
          </p>
        </div>
      </div>
    </div>
  )
}
