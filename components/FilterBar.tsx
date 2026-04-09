'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'

interface FilterOption {
  value: string
  label: string
}

interface FilterBarProps {
  filters: {
    key: string
    label: string
    options: FilterOption[]
  }[]
}

export default function FilterBar({ filters }: FilterBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleChange = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete('page')  // reset pagination
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams]
  )

  const clearAll = useCallback(() => {
    router.push(pathname)
  }, [router, pathname])

  const hasFilters = filters.some((f) => searchParams.has(f.key))

  return (
    <div className="flex flex-wrap items-center gap-3">
      {filters.map((filter) => (
        <div key={filter.key} className="relative">
          <select
            value={searchParams.get(filter.key) ?? ''}
            onChange={(e) => handleChange(filter.key, e.target.value)}
            className="appearance-none bg-ff-mid border border-ff-mid/60 text-ff-white/80 text-sm px-4 py-2 pr-8 rounded-sm focus:outline-none focus:border-ff-accent transition-colors cursor-pointer"
          >
            <option value="">{filter.label}</option>
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-ff-light/40 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
          </svg>
        </div>
      ))}

      {hasFilters && (
        <button
          onClick={clearAll}
          className="text-xs text-ff-light/50 hover:text-ff-light transition-colors underline underline-offset-2"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  )
}
