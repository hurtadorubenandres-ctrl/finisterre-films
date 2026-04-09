/**
 * ContentBlock — A24-style two-column section
 *
 * Used across the home page in alternating left/right image layout.
 * Matches A24's "SHOP / PODCAST" sections.
 *
 * Props:
 *   label      — Category label (e.g. "SHOP", "PODCAST")
 *   title      — Large bold heading
 *   cta        — CTA text (e.g. "COMPRAR AHORA")
 *   ctaHref    — CTA link destination
 *   image      — Image URL (optional — shows placeholder if omitted)
 *   imageAlt   — Alt text for the image
 *   imageLeft  — If true, image appears on the LEFT column (default: right)
 *   bgLight    — If true, section uses #eeeeee bg (default: white)
 *   description — Optional short description paragraph
 */

import Link from 'next/link'
import Image from 'next/image'

export interface ContentBlockProps {
  label: string
  title: string
  cta: string
  ctaHref: string
  image?: string
  imageAlt?: string
  imageLeft?: boolean
  bgLight?: boolean
  description?: string
}

export default function ContentBlock({
  label,
  title,
  cta,
  ctaHref,
  image,
  imageAlt = '',
  imageLeft = false,
  bgLight = false,
  description,
}: ContentBlockProps) {
  return (
    <section className={bgLight ? 'bg-a24-section-light' : 'bg-white'}>
      <div className="grid grid-cols-1 md:grid-cols-2">

        {/* ── Image column ── */}
        <div
          className={`relative overflow-hidden bg-a24-section-light ${
            imageLeft ? 'md:order-1' : 'md:order-2'
          }`}
          style={{ minHeight: '480px' }}
        >
          {image ? (
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.025]"
            />
          ) : (
            // ── Placeholder: replace with <Image src="..." />
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 via-neutral-250 to-neutral-300 flex items-center justify-center">
              <p className="text-neutral-400 text-xs uppercase tracking-widest text-center px-4">
                {label}<br />
                <span className="normal-case tracking-normal text-neutral-300">
                  — replace with your image —
                </span>
              </p>
            </div>
          )}
        </div>

        {/* ── Text column ── */}
        <div
          className={`flex flex-col justify-center px-8 py-16 sm:px-12 lg:px-16 xl:px-20 lg:py-20 ${
            imageLeft ? 'md:order-2' : 'md:order-1'
          }`}
        >
          {/* Category label */}
          <p className="label-tag mb-5">{label}</p>

          {/* Big title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.0] tracking-tight text-black mb-6 text-balance">
            {title}
          </h2>

          {/* Optional description */}
          {description && (
            <p className="text-sm text-a24-gray-dark leading-relaxed mb-8 max-w-sm">
              {description}
            </p>
          )}

          {/* CTA arrow link */}
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.14em] font-medium text-black group w-fit"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            <span className="group-hover:opacity-60 transition-opacity">{cta}</span>
          </Link>
        </div>

      </div>
    </section>
  )
}
