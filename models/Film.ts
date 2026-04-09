import mongoose, { Schema, Document, Model } from 'mongoose'
import type { IFilm } from '@/lib/types'

export interface IFilmDocument extends Omit<IFilm, '_id'>, Document {}

const FilmSchema = new Schema<IFilmDocument>(
  {
    title:        { type: String, required: true, trim: true },
    year:         { type: Number, required: true, min: 1888 },
    director:     { type: String, required: true, trim: true },
    synopsis:     { type: String, required: true },
    genres:       { type: [String], default: [] },
    runtime:      { type: Number, required: true, min: 1 },
    posterImage:  { type: String, default: '' },
    trailerUrl:   { type: String, default: '' },
    cast:         { type: [String], default: [] },
    awards:       { type: [String], default: [] },
    releaseDate:  { type: Date, required: true },
    status:       {
      type: String,
      enum: ['upcoming', 'released', 'archive'],
      default: 'upcoming',
    },
    featured:     { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Índices para búsquedas frecuentes
FilmSchema.index({ title: 'text', synopsis: 'text', director: 'text' })
FilmSchema.index({ year: -1 })
FilmSchema.index({ featured: 1 })
FilmSchema.index({ status: 1 })

const Film: Model<IFilmDocument> =
  mongoose.models.Film || mongoose.model<IFilmDocument>('Film', FilmSchema)

export default Film
