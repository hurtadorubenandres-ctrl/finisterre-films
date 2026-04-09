import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'App',
  description: 'Download the Finisterre Films app.',
}

export default function AppPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 mb-16">
          <h1 className="text-xs uppercase tracking-widest font-semibold text-black mb-1">App</h1>
          <p className="text-sm text-gray-500">Watch, discover, and connect — anywhere.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-black mb-6">
              Finisterre Films
            </h2>
            <p className="text-base text-gray-600 leading-relaxed mb-4">
              Stream films, watch trailers, listen to the podcast, read notes, and access your membership — all in one place.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed mb-10">
              Available on iPhone, iPad, Apple TV, Android, and Android TV.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="flex items-center gap-3 border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors group"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <p className="text-xs text-gray-500 group-hover:text-gray-300 uppercase tracking-wider">Download on the</p>
                  <p className="text-sm font-semibold leading-tight">App Store</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors group"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.18 23.76c.3.17.64.24.99.2l12.49-12.5L13.16 8l-9.98 15.76zM20.76 10.5l-2.79-1.61-3.16 3.16 3.16 3.16 2.8-1.62c.8-.46.8-1.63-.01-2.09zM2.2.33C1.9.56 1.71.95 1.71 1.46v21.09c0 .51.19.9.49 1.13l.06.05 11.82-11.82v-.28L2.26.28 2.2.33zm9.67 12.34L3.18.24c.35-.04.71.03 1.01.2l10.03 15.8-2.35-3.57z"/>
                </svg>
                <div>
                  <p className="text-xs text-gray-500 group-hover:text-gray-300 uppercase tracking-wider">Get it on</p>
                  <p className="text-sm font-semibold leading-tight">Google Play</p>
                </div>
              </a>
            </div>
          </div>

          {/* Phone mockup placeholder */}
          <div className="flex justify-center">
            <div className="w-64 h-[500px] bg-black rounded-[32px] flex items-center justify-center border-4 border-gray-800">
              <div className="text-center text-gray-600">
                <p className="text-xs uppercase tracking-widest">App Preview</p>
              </div>
            </div>
          </div>
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
