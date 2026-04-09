/**
 * ─────────────────────────────────────────────────────────
 *  Cloudinary helper — Finisterrae Films
 * ─────────────────────────────────────────────────────────
 *
 *  USO:
 *    1. Sube tu foto a Cloudinary y anota su "Public ID"
 *       Ejemplo: si subes "o-faro-poster.jpg" el ID es "o-faro-poster"
 *
 *    2. Usa el helper según el tipo de imagen:
 *       cldPoster('o-faro-poster')        → cartel de película (2:3)
 *       cldHero('o-faro-hero')            → fondo hero (pantalla completa)
 *       cldBlock('guion-o-faro')          → foto sección contenido (4:5)
 *       cldSpotlight('o-faro-spotlight')  → sección spotlight (cinemático)
 *       cldTeam('equipo-finisterre')      → foto equipo About (4:3)
 *
 *    3. Pega el resultado en el campo posterImage / image de los datos
 *
 *  CONFIGURACIÓN:
 *    En el archivo .env.local escribe:
 *    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu-nombre-de-cloud
 *    (Lo encuentras en el Dashboard de Cloudinary)
 * ─────────────────────────────────────────────────────────
 */

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? 'demo'

// ── Constructor base ──────────────────────────────────────
function buildUrl(
  publicId: string,
  transforms: string,
): string {
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${transforms}/${publicId}`
}

// ── Formatos preconfigurados ──────────────────────────────

/** Cartel de película — ratio 2:3, portrait */
export function cldPoster(publicId: string): string {
  return buildUrl(publicId, 'w_600,h_900,c_fill,g_auto,q_auto,f_auto')
}

/** Fondo del hero — pantalla completa, muy ancho */
export function cldHero(publicId: string): string {
  return buildUrl(publicId, 'w_1600,h_900,c_fill,g_auto,q_auto,f_auto')
}

/** Foto de sección ContentBlock — ratio 4:5 */
export function cldBlock(publicId: string): string {
  return buildUrl(publicId, 'w_800,h_1000,c_fill,g_auto,q_auto,f_auto')
}

/** Sección Spotlight — cinemático 2.39:1 */
export function cldSpotlight(publicId: string): string {
  return buildUrl(publicId, 'w_1600,h_670,c_fill,g_auto,q_auto,f_auto')
}

/** Foto equipo About — ratio 4:3 */
export function cldTeam(publicId: string): string {
  return buildUrl(publicId, 'w_900,h_675,c_fill,g_auto,q_auto,f_auto')
}

/** Uso libre — especifica tú el ancho y alto */
export function cldCustom(publicId: string, w: number, h: number): string {
  return buildUrl(publicId, `w_${w},h_${h},c_fill,g_auto,q_auto,f_auto`)
}
