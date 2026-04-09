'use client'

import { useState } from 'react'
import { extractYouTubeId, getYouTubeThumbnail } from '@/lib/utils'

interface VideoPlayerProps {
  url: string
  title?: string
  autoPlay?: boolean
}

export default function VideoPlayer({ url, title, autoPlay = false }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const youtubeId = extractYouTubeId(url)

  if (!youtubeId) {
    return (
      <div className="aspect-video bg-ff-mid flex items-center justify-center rounded-sm">
        <p className="text-ff-light/40 text-sm">Vídeo no disponible</p>
      </div>
    )
  }

  const thumbnailUrl = getYouTubeThumbnail(youtubeId, 'maxresdefault')
  const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`

  if (!isPlaying) {
    return (
      <div
        className="relative aspect-video bg-ff-black cursor-pointer group rounded-sm overflow-hidden"
        onClick={() => setIsPlaying(true)}
        role="button"
        aria-label={`Reproducir ${title ?? 'vídeo'}`}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsPlaying(true)}
      >
        <img
          src={thumbnailUrl}
          alt={title ?? 'Vídeo'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Fallback a calidad más baja si maxresdefault no existe
            ;(e.target as HTMLImageElement).src = getYouTubeThumbnail(youtubeId, 'hqdefault')
          }}
        />
        <div className="absolute inset-0 bg-ff-black/40 group-hover:bg-ff-black/20 transition-colors" />
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-ff-accent/90 group-hover:bg-ff-accent rounded-full flex items-center justify-center transition-colors shadow-2xl">
            <svg
              className="w-7 h-7 text-ff-black ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {title && (
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-ff-white font-medium text-sm drop-shadow-lg">{title}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="aspect-video rounded-sm overflow-hidden">
      <iframe
        src={embedUrl}
        title={title ?? 'Vídeo'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  )
}
