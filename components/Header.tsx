'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'

const NAV_LINKS = [
  { href: '/films',      label: 'Películas' },
  { href: '/television', label: 'Televisión' },
  { href: '/docs',       label: 'Docs' },
  { href: '/shop',       label: 'Tienda' },
  { href: '/membership', label: 'Membership' },
  { href: '/notes',      label: 'Notes' },
  { href: '/app',        label: 'App' },
]

export default function Header() {
  const { totalItems, toggleCart }           = useCart()
  const { user, isAuthenticated, logout }    = useAuth()
  const [mobileOpen, setMobileOpen]          = useState(false)
  const [scrolled, setScrolled]              = useState(false)

  // Switch from transparent → solid on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isDark = !scrolled && !mobileOpen   // transparent mode = dark text reversed
  const textCls = isDark
    ? 'text-white hover:opacity-60'
    : 'text-black hover:opacity-60'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? 'bg-white border-b border-a24-section-light'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8">
          <div className="relative flex items-center justify-between h-12">

            {/* ── LEFT: Hamburger + MENÚ ── */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
              className={`flex items-center gap-2.5 transition-all duration-200 ${textCls}`}
            >
              {/* Hamburger icon — animates to X */}
              <span className="flex flex-col gap-[5px] w-[18px] h-[13px]" aria-hidden>
                <span
                  className={`block h-px origin-center transition-all duration-300 ${
                    isDark ? 'bg-white' : 'bg-black'
                  } ${mobileOpen ? 'rotate-45 translate-y-[9px]' : ''}`}
                />
                <span
                  className={`block h-px transition-all duration-300 ${
                    isDark ? 'bg-white' : 'bg-black'
                  } ${mobileOpen ? 'opacity-0 w-0' : 'w-full'}`}
                />
                <span
                  className={`block h-px origin-center transition-all duration-300 ${
                    isDark ? 'bg-white' : 'bg-black'
                  } ${mobileOpen ? '-rotate-45 -translate-y-[4px]' : ''}`}
                />
              </span>
              <span
                className={`text-xs font-medium uppercase tracking-[0.18em] hidden sm:inline transition-opacity duration-200 ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                {mobileOpen ? 'CERRAR' : 'MENÚ'}
              </span>
            </button>

            {/* ── CENTER: Logo ── */}
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={`absolute left-1/2 -translate-x-1/2 font-bold text-sm tracking-[0.22em] uppercase whitespace-nowrap transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-black'
              } hover:opacity-70`}
            >
              FINISTERRAE FILMS
            </Link>

            {/* ── RIGHT: Search + Cart ── */}
            <div className="flex items-center gap-5">
              {/* Search icon */}
              <button
                aria-label="Buscar"
                className={`transition-all duration-200 ${textCls}`}
              >
                <svg className="w-[17px] h-[17px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>

              {/* Cart */}
              <button
                onClick={toggleCart}
                aria-label={`Carrito (${totalItems})`}
                className={`flex items-center gap-1.5 transition-all duration-200 ${textCls}`}
              >
                <svg className="w-[17px] h-[17px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9Z" />
                </svg>
                {totalItems > 0 && (
                  <span className="text-xs font-medium tabular-nums">({totalItems})</span>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── FULL-SCREEN MOBILE MENU ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-12 overflow-y-auto animate-slide-down">
          <nav className="max-w-screen-2xl mx-auto px-5 sm:px-8 py-10">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href} className="border-b border-a24-section-light">
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-5 text-3xl sm:text-4xl font-bold text-black hover:opacity-50 transition-opacity"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Auth row */}
            <div className="mt-8 pt-8 border-t border-a24-section-light flex gap-6">
              {isAuthenticated ? (
                <>
                  {user?.role === 'admin' && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs uppercase tracking-widest text-black hover:opacity-50 transition-opacity"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => { logout(); setMobileOpen(false) }}
                    className="text-xs uppercase tracking-widest text-a24-gray-mid hover:text-black transition-colors"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-xs uppercase tracking-widest text-black hover:opacity-50 transition-opacity"
                >
                  Iniciar sesión
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
