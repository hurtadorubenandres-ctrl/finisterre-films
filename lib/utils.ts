// ============================================================
// FINISTERRE FILMS – Utility functions
// ============================================================

/**
 * Genera un slug URL-friendly a partir de un texto
 * Ej: "El nombre de la rosa" → "el-nombre-de-la-rosa"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')                    // separar caracteres con tildes
    .replace(/[\u0300-\u036f]/g, '')     // eliminar marcas diacríticas
    .replace(/\s+/g, '-')               // espacios → guion
    .replace(/[^\w-]+/g, '')            // eliminar no-word chars
    .replace(/--+/g, '-')               // guiones múltiples → uno
    .replace(/^-+/, '')                 // trim inicio
    .replace(/-+$/, '')                 // trim final
}

/**
 * Formatea un precio en EUR
 * Ej: 1250 → "12,50 €"
 */
export function formatPrice(
  amount: number,
  locale: string = 'es-ES',
  currency: string = 'EUR'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

/**
 * Formatea una fecha en español
 * Ej: 2024-01-15 → "15 de enero de 2024"
 */
export function formatDate(
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('es-ES', options ?? {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Formatea duración en segundos a "HH:MM:SS" o "MM:SS"
 */
export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  if (h > 0) {
    return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':')
  }
  return [m, s].map((n) => String(n).padStart(2, '0')).join(':')
}

/**
 * Formatea minutos de película a "Xh Ym"
 */
export function formatRuntime(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m} min`
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

/**
 * Trunca texto a N caracteres añadiendo "…"
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 1) + '…'
}

/**
 * Genera un ID único de pedido tipo "FF-20240115-ABCD"
 */
export function generateOrderId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const random = Math.random().toString(36).toUpperCase().slice(2, 6)
  return `FF-${date}-${random}`
}

/**
 * Calcula el precio con descuento
 */
export function calculateDiscount(price: number, discountPrice?: number): number {
  if (!discountPrice || discountPrice >= price) return 0
  return Math.round(((price - discountPrice) / price) * 100)
}

/**
 * Extrae el ID de un vídeo de YouTube desde distintos formatos de URL
 */
export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
    /youtube\.com\/shorts\/([^?&]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

/**
 * Genera la URL del thumbnail de YouTube a partir de un ID
 */
export function getYouTubeThumbnail(
  videoId: string,
  quality: 'default' | 'hqdefault' | 'maxresdefault' = 'hqdefault'
): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`
}

/**
 * Capitaliza la primera letra de un string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Comprueba si un valor es un email válido
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Retardo asíncrono (útil para testing)
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
