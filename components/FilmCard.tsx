import Link from 'next/link'
import Image from 'next/image'
import type { IFilm } from '@/lib/types'
import { formatRuntime } from '@/lib/utils'

interface FilmCardProps {
  film: IFilm
  variant?: 'default' | 'compact' | 'featured'
}

export default function FilmCard({ film, variant = 'default' }: FilmCardProps) {
  const href = `/films/${film._id}`

  if (variant === 'featured') {
    return (
      <Link href={href} className="group block relative overflow-hidden rounded-sm aspect-[2/3] bg-ff-mid">
        {film.posterImage ? (
          <Image
            src={film.posterImage}
            alt={film.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width:768px) 50vw, (max-width:1200px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-ff-mid to-ff-gray flex items-center justify-center">
            <span className="text-ff-accent text-4xl font-display">F</span>
          </div>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ff-black via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-ff-accent text-xs uppercase tracking-widest mb-1">
            {film.genres[0]}
          </p>
          <h3 className="text-ff-white font-display font-bold text-lg leading-tight">
            {film.title}
          </h3>
          <p className="text-ff-light/60 text-xs mt-1">
            {film.year} · {film.director}
          </p>
        </div>
        {film.status === 'upcoming' && (
          <div className="absolute top-3 right-3 bg-ff-accent text-ff-black text-xs font-bold px-2 py-0.5 uppercase tracking-wide">
            Próximamente
          </div>
        )}
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link href={href} className="group flex gap-4 items-start p-3 hover:bg-ff-mid/30 rounded transition-colors">
        <div className="relative w-14 h-20 flex-shrink-0 bg-ff-mid overflow-hidden rounded-sm">
          {film.posterImage && (
            <Image src={film.posterImage} alt={film.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="56px" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-ff-white text-sm font-medium truncate group-hover:text-ff-accent transition-colors">
            {film.title}
          </h4>
          <p className="text-ff-light/50 text-xs">{film.year} · {film.director}</p>
          {film.runtime > 0 && (
            <p className="text-ff-light/40 text-xs mt-1">{formatRuntime(film.runtime)}</p>
          )}
        </div>
      </Link>
    )
  }

  // Default card
  return (
    <Link href={href} className="group block relative overflow-hidden rounded-sm bg-ff-mid hover:bg-ff-gray transition-colors">
      <div className="relative aspect-[2/3] overflow-hidden bg-ff-gray">
        {film.posterImage ? (
          <Image
            src={film.posterImage}
            alt={film.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-ff-accent/30 text-6xl font-display font-bold">F</span>
          </div>
        )}
        <div className="absolute inset-0 bg-hero-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Hover CTA */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-ff-accent text-ff-black text-xs font-bold px-4 py-2 uppercase tracking-widest">
            Ver ficha
          </span>
        </div>
      </div>
      <div className="p-4">
        {film.genres.length > 0 && (
          <p className="text-ff-accent text-xs uppercase tracking-widest mb-1">
            {film.genres.slice(0, 2).join(' · ')}
          </p>
        )}
        <h3 className="text-ff-white font-display font-semibold text-base leading-snug group-hover:text-ff-accent transition-colors">
          {film.title}
        </h3>
        <p className="text-ff-light/50 text-xs mt-1">
          {film.year} · {film.director}
          {film.runtime > 0 && ` · ${formatRuntime(film.runtime)}`}
        </p>
      </div>
    </Link>
  )
}
