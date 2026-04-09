import mongoose, { Schema, Document, Model } from 'mongoose'
import type { IPodcast } from '@/lib/types'

export interface IPodcastDocument extends Omit<IPodcast, '_id'>, Document {}

const PodcastSchema = new Schema<IPodcastDocument>(
  {
    title:          { type: String, required: true, trim: true },
    slug:           { type: String, required: true, unique: true, lowercase: true },
    description:    { type: String, required: true },
    episodeNumber:  { type: Number, required: true, min: 1 },
    season:         { type: Number, required: true, min: 1, default: 1 },
    guests:         { type: [String], default: [] },
    audioUrl:       { type: String, required: true },
    duration:       { type: Number, required: true, min: 0 },  // segundos
    transcript:     { type: String },
    publishedAt:    { type: Date, default: Date.now },
    featured:       { type: Boolean, default: false },
    spotifyUrl:     { type: String },
    appleUrl:       { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

PodcastSchema.index({ slug: 1 }, { unique: true })
PodcastSchema.index({ season: 1, episodeNumber: 1 })
PodcastSchema.index({ publishedAt: -1 })

const Podcast: Model<IPodcastDocument> =
  mongoose.models.Podcast ||
  mongoose.model<IPodcastDocument>('Podcast', PodcastSchema)

export default Podcast
