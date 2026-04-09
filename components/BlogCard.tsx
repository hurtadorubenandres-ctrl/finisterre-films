import Link from 'next/link'
import Image from 'next/image'
import type { IBlogPost } from '@/lib/types'
import { formatDate, truncate } from '@/lib/utils'

interface BlogCardProps {
  post: IBlogPost
  variant?: 'default' | 'compact' | 'featured'
}

export default function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  const href = `/blog/${post.slug}`

  if (variant === 'featured') {
    return (
      <Link href={href} className="group block relative overflow-hidden rounded-sm aspect-video bg-ff-mid">
        {post.featuredImage && (
          <Image src={post.featuredImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width:768px) 100vw, 50vw" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ff-black via-ff-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="text-ff-accent text-xs uppercase tracking-widest">{post.category}</span>
          <h2 className="text-ff-white font-display text-2xl font-bold mt-2 leading-tight">
            {post.title}
          </h2>
          <p className="text-ff-light/70 text-sm mt-2 line-clamp-2">{post.excerpt}</p>
          <p className="text-ff-light/40 text-xs mt-3">{post.author} · {formatDate(post.publishedAt)}</p>
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link href={href} className="group flex gap-4 items-start p-3 hover:bg-ff-mid/30 rounded transition-colors">
        {post.featuredImage && (
          <div className="relative w-16 h-16 flex-shrink-0 bg-ff-mid overflow-hidden rounded-sm">
            <Image src={post.featuredImage} alt={post.title} fill className="object-cover" sizes="64px" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <span className="text-ff-accent text-xs uppercase tracking-wider">{post.category}</span>
          <h4 className="text-ff-white text-sm font-medium leading-snug group-hover:text-ff-accent transition-colors line-clamp-2">
            {post.title}
          </h4>
          <p className="text-ff-light/40 text-xs mt-1">{formatDate(post.publishedAt)}</p>
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className="group block bg-ff-dark hover:bg-ff-mid/40 rounded-sm overflow-hidden transition-colors">
      {post.featuredImage && (
        <div className="relative aspect-video overflow-hidden bg-ff-mid">
          <Image src={post.featuredImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-ff-accent text-xs uppercase tracking-widest">{post.category}</span>
          {post.tags?.slice(0, 1).map((tag) => (
            <span key={tag} className="text-ff-light/40 text-xs border border-ff-mid/60 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-ff-white font-display font-semibold text-base leading-snug group-hover:text-ff-accent transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-ff-light/60 text-sm mt-2 line-clamp-2">
          {truncate(post.excerpt, 120)}
        </p>
        <div className="flex items-center justify-between mt-4 text-xs text-ff-light/40">
          <span>{post.author}</span>
          <span>{formatDate(post.publishedAt)}</span>
        </div>
      </div>
    </Link>
  )
}
