/**
 * About Page — A24-style
 *
 * Layout:
 *   1. Large typographic title header (white bg)
 *   2. Mission statement block (black bg, large quote)
 *   3. Two-column: story text (left) + image (right)
 *   4. Values grid (light bg, 4 columns)
 *   5. CTA strip: "¿Quieres trabajar con nosotros?"
 */

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sobre nosotros',
  description: 'Finisterrae Films — Productora audiovisual gallega comprometida con historias que transforman.',
}

const VALUES = [
  {
    title: 'Autenticidad',
    desc: 'Cada historia que contamos es real. Sin artificios, sin concesiones al mercado.',
  },
  {
    title: 'Territorio',
    desc: 'Galicia como punto de partida. El mundo como horizonte.',
  },
  {
    title: 'Comunidad',
    desc: 'El cine se hace en comunidad. Nuestros proyectos nacen de la colaboración.',
  },
  {
    title: 'Riesgo',
    desc: 'Solo apostamos por proyectos que nos dan miedo. El miedo es buena señal.',
  },
]

export default function AboutPage() {
  return (
    <div className="bg-white text-black">

      {/* ── Header spacer (fixed nav is 48px) ── */}
      <div className="pt-12" aria-hidden />

      {/* ── 1. Big typographic title ── */}
      <section className="px-5 sm:px-8 pt-16 pb-20 border-b border-a24-section-light">
        <div className="max-w-screen-2xl mx-auto">
          <p className="label-tag mb-8">Quiénes somos</p>
          <h1 className="font-bold tracking-tight leading-[0.88]"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 10rem)' }}
          >
            FINISTERRE<br />
            <span className="text-a24-gray-light">FILMS</span>
          </h1>
        </div>
      </section>

      {/* ── 2. Mission statement (black bg) ── */}
      <section className="bg-black text-white px-5 sm:px-8 py-20 lg:py-28">
        <div className="max-w-screen-2xl mx-auto">
          <blockquote className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium leading-relaxed max-w-4xl text-a24-off-white">
            "Somos una productora audiovisual gallega comprometida con
            historias que transforman. Cine, podcast y editorial al servicio
            de lo que merece ser contado."
          </blockquote>
          <div className="mt-12 flex flex-wrap gap-8">
            <Link
              href="/films"
              className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.14em] font-medium text-white group"
            >
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              <span className="group-hover:opacity-50 transition-opacity">Ver películas</span>
            </Link>
            <Link
              href="/notes"
              className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.14em] font-medium text-white/60 hover:text-white group transition-colors"
            >
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              <span>Leer notes</span>
            </Link>
            <Link
              href="/membership"
              className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.14em] font-medium text-white/60 hover:text-white group transition-colors"
            >
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              <span>Membership</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. Story: text + image ── */}
      <section className="px-5 sm:px-8 py-20">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Text */}
          <div>
            <p className="label-tag mb-8">Historia</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 leading-tight tracking-tight">
              Desde el fin del mundo
            </h2>
            <div className="space-y-5 text-sm text-a24-gray-dark leading-relaxed">
              <p>
                Finisterrae Films nació en Galicia, en el lugar donde Europa termina
                y el océano Atlántico comienza. Desde ese punto de partida, hacemos
                cine que mira hacia dentro y hacia afuera al mismo tiempo.
              </p>
              <p>
                Nuestra filosofía es simple: historias que importan, contadas con
                honestidad. Trabajamos con directores que arriesgan, con actores que
                se entregan, y con equipos que creen en lo que hacen.
              </p>
              <p>
                Cada película que producimos es una apuesta por el cine como arte y
                como acto político. Creemos en el poder del audiovisual para cambiar
                mentes y mover corazones.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative overflow-hidden bg-a24-section-light" style={{ aspectRatio: '4/3' }}>
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&h=675&q=80"
              alt="Equipo Finisterrae Films"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </section>

      {/* ── 4. Values grid ── */}
      <section className="bg-a24-section-light px-5 sm:px-8 py-20">
        <div className="max-w-screen-2xl mx-auto">
          <p className="label-tag mb-12">Valores</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {VALUES.map(({ title, desc }) => (
              <div key={title} className="border-t border-a24-gray-light pt-6">
                <h3 className="text-base font-bold mb-3 tracking-tight">{title}</h3>
                <p className="text-sm text-a24-gray-dark leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Contact / Jobs CTA ── */}
      <section className="px-5 sm:px-8 py-16 border-t border-a24-section-light">
        <div className="max-w-screen-2xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              ¿Quieres trabajar con nosotros?
            </h2>
            <p className="text-sm text-a24-gray-dark">
              Siempre estamos buscando nuevos proyectos y talentos.
            </p>
          </div>
          <Link
            href="/jobs"
            className="shrink-0 inline-flex items-center gap-3 text-xs uppercase tracking-[0.14em] font-medium text-black border border-black px-8 py-4 hover:bg-black hover:text-white transition-colors duration-200"
          >
            Ver ofertas →
          </Link>
        </div>
      </section>

    </div>
  )
}
