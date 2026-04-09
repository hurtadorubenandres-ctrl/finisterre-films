/**
 * Home Page — A24-style layout
 *
 * Section sequence:
 *   1. HeroSection     — Full-screen film title list
 *   2. ContentBlock    — TIENDA (image right, white bg)
 *   3. ContentBlock    — PODCAST (image left, light bg)
 *   4. FilmSpotlight   — Featured film full-bleed
 *   5. ContentBlock    — TIENDA merchandise (image right, white bg)
 *   6. ContentBlock    — MEMBERSHIP (image left, light bg)
 *   7. FilmSpotlight   — Second film full-bleed
 *   8. ContentBlock    — PODCAST episode (image right, white bg)
 *   9. ContentBlock    — TIENDA blu-ray (image left, light bg)
 */

import HeroSection, { type HeroFilm } from '@/components/HeroSection'
import ContentBlock   from '@/components/ui/ContentBlock'
import FilmSpotlight  from '@/components/ui/FilmSpotlight'

// ─── SAMPLE DATA — replace with your real content ───────────────
// TODO: Fetch these from your MongoDB database via server component

const HERO_FILMS: HeroFilm[] = [
  {
    id: '1', title: 'O faro do fin do mundo', year: 2024, slug: 'o-faro-do-fin-do-mundo',
    posterImage: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=1400&h=900&q=80',
  },
  {
    id: '2', title: 'Sal de la tierra', year: 2025, slug: 'sal-de-la-tierra', status: 'upcoming',
    posterImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&h=900&q=80',
  },
  {
    id: '3', title: 'Marea', year: 2025, slug: 'marea', status: 'upcoming',
    posterImage: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1400&h=900&q=80',
  },
  {
    id: '4', title: 'Atlántico', year: 2024, slug: 'atlantico',
    posterImage: 'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?auto=format&fit=crop&w=1400&h=900&q=80',
  },
  {
    id: '5', title: 'O camiño de volta', year: 2025, slug: 'o-camino-de-volta', status: 'upcoming',
    posterImage: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?auto=format&fit=crop&w=1400&h=900&q=80',
  },
  {
    id: '6', title: 'Brétema', year: 2024, slug: 'bretema',
    posterImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&h=900&q=80',
  },
]
// ────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="bg-white text-black">

      {/* ①  HERO — full-screen film title list */}
      <HeroSection films={HERO_FILMS} />

      {/* ② TIENDA — image right */}
      <ContentBlock
        label="Tienda"
        title="O faro — Guión original"
        description="El guión de la película en edición especial de coleccionista, con notas manuscritas del director."
        cta="Comprar ahora"
        ctaHref="/shop"
        imageLeft={false}
        bgLight={false}
        image="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&h=1000&q=80"
        imageAlt="O faro — Guión original"
      />

      {/* ③ PODCAST — image left, light bg */}
      <ContentBlock
        label="Podcast"
        title="Fin del Mundo con Mauro Herce"
        description="Conversaciones sobre cine independiente, el proceso creativo y las historias que merecen ser contadas. En Spotify y Apple Podcasts."
        cta="Escuchar ahora"
        ctaHref="/notes"
        imageLeft={true}
        bgLight={true}
        image="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&h=1000&q=80"
        imageAlt="Fin del Mundo Podcast"
      />

      {/* ④ FILM SPOTLIGHT — featured film */}
      <FilmSpotlight
        label="Ver ahora"
        title="O faro do fin do mundo"
        href="/films/o-faro-do-fin-do-mundo"
        cta="VER AHORA"
        image="https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=1600&h=700&q=80"
      />

      {/* ⑤ TIENDA — merchandise, image right */}
      <ContentBlock
        label="Tienda"
        title="Camiseta Logo Finisterrae Films"
        description="Edición limitada. 100% algodón orgánico. Disponible en tallas XS–XXL."
        cta="Comprar ahora"
        ctaHref="/shop"
        imageLeft={false}
        bgLight={false}
        image="https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=800&h=1000&q=80"
        imageAlt="Camiseta Logo Finisterrae Films"
      />

      {/* ⑥ MEMBERSHIP — image left, light bg */}
      <ContentBlock
        label="Membership"
        title="Hazte miembro de Finisterrae Films"
        description="Acceso anticipado a estrenos, contenidos exclusivos, pases para proyecciones y merchandising para miembros."
        cta="Únete ahora"
        ctaHref="/membership"
        imageLeft={true}
        bgLight={true}
        image="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&h=1000&q=80"
        imageAlt="Finisterrae Films Membership"
      />

      {/* ⑦ FILM SPOTLIGHT 2 */}
      <FilmSpotlight
        label="Ver ahora"
        title="Atlántico"
        href="/films/atlantico"
        cta="VER AHORA"
        image="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1600&h=700&q=80"
      />

      {/* ⑧ PODCAST 2 — image right, white bg */}
      <ContentBlock
        label="Podcast"
        title="El proceso creativo detrás de Marea"
        description="Carlos Iglesias habla sobre el rodaje, la dirección de fotografía y por qué el mar es siempre protagonista."
        cta="Escuchar ahora"
        ctaHref="/notes"
        imageLeft={false}
        bgLight={false}
        image="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&h=1000&q=80"
        imageAlt="Podcast — El proceso creativo de Marea"
      />

      {/* ⑨ TIENDA — blu-ray, image left, light bg */}
      <ContentBlock
        label="Tienda"
        title="Atlántico — Blu-ray"
        description="Edición de coleccionista con cortometrajes inéditos, comentario del director y libreto fotográfico de 48 páginas."
        cta="Comprar ahora"
        ctaHref="/shop"
        imageLeft={true}
        bgLight={true}
        image="https://images.unsplash.com/photo-1526434426615-1abe81efcb0b?auto=format&fit=crop&w=800&h=1000&q=80"
        imageAlt="Atlántico Blu-ray"
      />

    </div>
  )
}
