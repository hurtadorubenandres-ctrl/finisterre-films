import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ShoppingCart from '@/components/ShoppingCart'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/context/ThemeContext'

// ── Fonts (A24 uses "NB International Web" — Inter is the closest free match)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: {
    default: 'Finisterrae Films – Historias que transforman',
    template: '%s | Finisterrae Films',
  },
  description:
    'Productora audiovisual gallega comprometida con historias que transforman. Cine, podcast, blog y tienda oficial.',
  keywords: ['cine', 'productora', 'galicia', 'películas', 'finisterre', 'audiovisual'],
  authors: [{ name: 'Finisterrae Films' }],
  creator: 'Finisterrae Films',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: process.env.NEXT_PUBLIC_APP_URL ?? 'https://finisterrefilms.com',
    siteName: 'Finisterrae Films',
    title: 'Finisterrae Films – Historias que transforman',
    description: 'Productora audiovisual gallega comprometida con historias que transforman.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finisterrae Films',
    description: 'Productora audiovisual gallega. Cine que mueve el mundo.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-black font-sans">
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              {/* A24-style: header is fixed + transparent over hero pages */}
              <Header />
              {/*
                NOTE: Hero pages (home) use full-bleed layout — no top padding here.
                Non-hero pages add .page-top or pt-12 to their first section.
              */}
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <ShoppingCart />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
