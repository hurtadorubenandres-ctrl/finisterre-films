'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import axios, { type AxiosRequestConfig } from 'axios'

interface UseFetchState<T> {
  data: T | null
  isLoading: boolean
  error: string | null
}

interface UseFetchReturn<T> extends UseFetchState<T> {
  refetch: () => void
}

/**
 * Hook genérico para fetching de datos con Axios
 *
 * @example
 * const { data, isLoading, error } = useFetch<IFilm[]>('/api/films')
 */
export function useFetch<T>(
  url: string | null,
  options?: AxiosRequestConfig
): UseFetchReturn<T> {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    isLoading: false,
    error: null,
  })

  // Usar ref para opciones para no re-lanzar el efecto en cada render
  const optionsRef = useRef(options)
  optionsRef.current = options

  const [trigger, setTrigger] = useState(0)

  const refetch = useCallback(() => setTrigger((t) => t + 1), [])

  useEffect(() => {
    if (!url) return

    let cancelled = false
    const controller = new AbortController()

    setState((s) => ({ ...s, isLoading: true, error: null }))

    axios
      .get<{ success: boolean; data: T }>(url, {
        ...optionsRef.current,
        signal: controller.signal,
      })
      .then(({ data }) => {
        if (!cancelled) {
          setState({ data: data.data ?? (data as unknown as T), isLoading: false, error: null })
        }
      })
      .catch((err) => {
        if (!cancelled && !axios.isCancel(err)) {
          const message =
            err.response?.data?.error ??
            err.message ??
            'Error desconocido'
          setState({ data: null, isLoading: false, error: message })
        }
      })

    return () => {
      cancelled = true
      controller.abort()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, trigger])

  return { ...state, refetch }
}

export default useFetch
