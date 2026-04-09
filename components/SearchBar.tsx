'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import { useDebounce } from 'use-debounce' // fallback manual below

interface SearchResult {
  id: string
  type: 'film' | 'blog' | 'product'
  title: string
  subtitle?: string
  href: string
  image?: string
}

function useDebounceValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

export default function SearchBar({ onClose }: { onClose?: () => void }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const debouncedQuery = useDebounceValue(query, 300)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!debouncedQuery.trim() || debouncedQuery.length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)
    axios
      .get<{ data: SearchResult[] }>(`/api/search?q=${encodeURIComponent(debouncedQuery)}`)
      .then(({ data }) => setResults(data.data ?? []))
      .catch(() => setResults([]))
      .finally(() => setIsLoading(false))
  }, [debouncedQuery])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`)
        onClose?.()
      }
    },
    [query, router, onClose]
  )

  const typeLabel: Record<SearchResult['type'], string> = {
    film: 'Película',
    blog: 'Blog',
    product: 'Tienda',
  }

  return (
    <div className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ff-light/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar películas, noticias, productos..."
            className="w-full bg-ff-mid border border-ff-mid/60 text-ff-white placeholder-ff-light/30 pl-12 pr-4 py-4 text-sm rounded-sm focus:outline-none focus:border-ff-accent transition-colors"
          />
          {isLoading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-ff-accent/40 border-t-ff-accent rounded-full animate-spin" />
          )}
        </div>
      </form>

      {/* Results dropdown */}
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-ff-dark border border-ff-mid/60 rounded-sm shadow-2xl z-50 max-h-80 overflow-y-auto">
          {results.map((result) => (
            <Link
              key={`${result.type}-${result.id}`}
              href={result.href}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 hover:bg-ff-mid/60 transition-colors"
            >
              <span className={`text-xs px-1.5 py-0.5 rounded-sm font-medium ${
                result.type === 'film' ? 'bg-ff-blue/40 text-blue-300' :
                result.type === 'blog' ? 'bg-ff-mid text-ff-light/60' :
                'bg-ff-accent/20 text-ff-accent'
              }`}>
                {typeLabel[result.type]}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-ff-white text-sm truncate">{result.title}</p>
                {result.subtitle && (
                  <p className="text-ff-light/40 text-xs truncate">{result.subtitle}</p>
                )}
              </div>
            </Link>
          ))}
          <div className="border-t border-ff-mid/40 px-4 py-2">
            <button
              onClick={handleSubmit as unknown as React.MouseEventHandler}
              className="text-ff-accent text-xs hover:text-ff-accent-dark transition-colors"
            >
              Ver todos los resultados para &ldquo;{query}&rdquo; →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
