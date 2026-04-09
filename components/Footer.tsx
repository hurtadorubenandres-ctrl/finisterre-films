'use client'

/**
 * Footer — A24-style dark footer
 *
 * Structure:
 *   Row 1: Legal links (left) | Social links (right)
 *   <hr> divider
 *   Row 2: Newsletter heading + description + email signup
 *   Row 3: Disclaimer / copyright
 */

import Link from 'next/link'

const LEGAL_LINKS = [
  { href: '/terms',    label: 'TÉRMINOS DE USO' },
  { href: '/privacy',  label: 'POLÍTICA DE PRIVACIDAD' },
  { href: '/jobs',     label: 'TRABAJA CON NOSOTROS' },
]

const SOCIAL_LINKS = [
  { href: 'https://www.facebook.com',  label: 'FACEBOOK' },
  { href: 'https://twitter.com',       label: 'TWITTER' },
  { href: 'https://www.instagram.com', label: 'INSTAGRAM' },
  { href: 'https://www.youtube.com',   label: 'YOUTUBE' },
]

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 pt-12 pb-10">

        {/* ── Row 1: Legal + Social ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 sm:gap-10 mb-10">
          {/* Legal */}
          <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Legal">
            {LEGAL_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[11px] uppercase tracking-[0.13em] text-a24-gray-mid hover:text-white transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <nav className="flex flex-wrap gap-x-6 gap-y-3 sm:text-right" aria-label="Redes sociales">
            {SOCIAL_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] uppercase tracking-[0.13em] text-a24-gray-mid hover:text-white transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        {/* ── Divider ── */}
        <hr className="border-a24-section-dark mb-10" />

        {/* ── Row 2: Newsletter ── */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.16em] font-medium text-white mb-3">
            ¿MÁS FINISTERRE FILMS?
          </p>
          <p className="text-sm text-a24-gray-mid leading-relaxed mb-6 max-w-md">
            Recibe nuestros emails. Cartas de nuestros directores, nuevos
            tráilers, podcasts, y más. No demasiado — justo lo necesario.
          </p>

          <form
            className="flex max-w-lg"
            onSubmit={(e) => e.preventDefault()}
            noValidate
          >
            <label htmlFor="footer-email" className="sr-only">Correo electrónico</label>
            <input
              id="footer-email"
              type="email"
              placeholder="EMAIL"
              autoComplete="email"
              className="flex-1 bg-black border border-a24-section-dark text-white text-xs uppercase tracking-widest placeholder-a24-gray-dark px-4 py-3 focus:outline-none focus:border-white transition-colors duration-200 min-w-0"
            />
            <button
              type="submit"
              className="shrink-0 bg-white text-black text-xs uppercase tracking-[0.14em] font-medium px-6 py-3 hover:bg-a24-gray-light transition-colors duration-200"
            >
              SUSCRIBIRSE
            </button>
          </form>
        </div>

        {/* ── Row 3: Copyright / Disclaimer ── */}
        <p className="text-[10px] text-a24-gray-dark leading-relaxed max-w-2xl">
          © {new Date().getFullYear()} Finisterrae Films. Todos los derechos reservados.
          Productora audiovisual gallega. Las imágenes, textos y contenidos de este sitio son
          propiedad de Finisterrae Films y no pueden ser reproducidos sin autorización expresa.
        </p>

      </div>
    </footer>
  )
}
