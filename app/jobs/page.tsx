import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Jobs',
  description: 'Open positions at Finisterre Films.',
}

const JOBS = [
  { id: 'j1', title: 'Production Coordinator', department: 'Production', location: 'Santiago de Compostela', type: 'Full-time' },
  { id: 'j2', title: 'Social Media & Content Manager', department: 'Marketing', location: 'Remote', type: 'Full-time' },
  { id: 'j3', title: 'Film Editor (Freelance)', department: 'Post-Production', location: 'Remote / Galicia', type: 'Freelance' },
]

export default function JobsPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="border-b border-gray-200 pb-6 mb-10">
          <h1 className="text-xs uppercase tracking-widest font-semibold text-black mb-1">Jobs</h1>
          <p className="text-sm text-gray-500">Open positions at Finisterre Films.</p>
        </div>

        {JOBS.length > 0 ? (
          <div className="space-y-0">
            {JOBS.map((job, i) => (
              <div
                key={job.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between py-6 gap-4 ${
                  i < JOBS.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                    {job.department} · {job.type}
                  </p>
                  <h3 className="text-sm font-semibold text-black">{job.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{job.location}</p>
                </div>
                <Link
                  href={`/contact?role=${job.id}`}
                  className="shrink-0 text-xs uppercase tracking-widest border border-black px-6 py-2 text-black hover:bg-black hover:text-white transition-colors"
                >
                  Apply
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No open positions at the moment. Check back soon.</p>
        )}

        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link href="/" className="text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
