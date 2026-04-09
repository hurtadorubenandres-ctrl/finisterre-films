'use client'

import { useState } from 'react'
import axios from 'axios'
import { isValidEmail } from '@/lib/utils'

interface NewsletterProps {
  variant?: 'hero' | 'footer' | 'section'
}

export default function Newsletter({ variant = 'section' }: NewsletterProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setStatus('error')
      setMessage('Por favor introduce un email válido')
      return
    }
    setStatus('loading')
    try {
      await axios.post('/api/contact', { email, type: 'newsletter' })
      setStatus('success')
      setMessage('¡Gracias! Te has suscrito correctamente.')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Algo salió mal. Inténtalo de nuevo.')
    }
  }

  if (variant === 'hero') {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/50 px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-ff-accent transition-colors backdrop-blur-sm"
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-ff-accent text-ff-black font-semibold px-6 py-3 text-sm uppercase tracking-widest hover:bg-ff-accent-dark transition-colors rounded-sm disabled:opacity-50"
        >
          {status === 'loading' ? '...' : 'Suscribirme'}
        </button>
      </form>
    )
  }

  return (
    <section className="bg-ff-dark border border-ff-mid/40 rounded-sm p-8 lg:p-12 text-center">
      <p className="text-ff-accent text-xs uppercase tracking-widest mb-3">Newsletter</p>
      <h2 className="text-ff-white font-display text-2xl lg:text-3xl font-bold mb-3">
        Historias que transforman, directo a tu bandeja
      </h2>
      <p className="text-ff-light/60 text-sm mb-6 max-w-md mx-auto">
        Recibe noticias de nuestras películas, making-of exclusivos y acceso anticipado a estrenos.
      </p>

      {status === 'success' ? (
        <p className="text-ff-accent font-medium">{message}</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="flex-1 bg-ff-mid border border-ff-mid/60 text-ff-white placeholder-ff-light/30 px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-ff-accent transition-colors"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-ff-accent text-ff-black font-semibold px-6 py-3 text-sm uppercase tracking-widest hover:bg-ff-accent-dark transition-colors rounded-sm disabled:opacity-50"
            >
              {status === 'loading' ? '...' : 'Suscribirme'}
            </button>
          </form>
          {status === 'error' && (
            <p className="text-red-400 text-xs mt-2">{message}</p>
          )}
        </>
      )}
    </section>
  )
}
