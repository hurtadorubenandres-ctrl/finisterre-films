import mongoose, { Schema, Document, Model } from 'mongoose'
import type { IBlogPost } from '@/lib/types'

export interface IBlogPostDocument extends Omit<IBlogPost, '_id'>, Document {}

const BlogPostSchema = new Schema<IBlogPostDocument>(
  {
    title:         { type: String, required: true, trim: true },
    slug:          { type: String, required: true, unique: true, lowercase: true },
    excerpt:       { type: String, required: true },
    content:       { type: String, required: true },
    author:        { type: String, required: true, trim: true },
    featuredImage: { type: String, default: '' },
    category:      { type: String, required: true, trim: true },
    tags:          { type: [String], default: [] },
    publishedAt:   { type: Date, default: Date.now },
    featured:      { type: Boolean, default: false },
    views:         { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

BlogPostSchema.index({ slug: 1 }, { unique: true })
BlogPostSchema.index({ title: 'text', excerpt: 'text', content: 'text' })
BlogPostSchema.index({ publishedAt: -1 })
BlogPostSchema.index({ category: 1 })
BlogPostSchema.index({ featured: 1 })

const BlogPost: Model<IBlogPostDocument> =
  mongoose.models.BlogPost ||
  mongoose.model<IBlogPostDocument>('BlogPost', BlogPostSchema)

export default BlogPost
