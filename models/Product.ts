import mongoose, { Schema, Document, Model } from 'mongoose'
import type { IProduct } from '@/lib/types'

export interface IProductDocument extends Omit<IProduct, '_id'>, Document {}

const ProductSchema = new Schema<IProductDocument>(
  {
    name:            { type: String, required: true, trim: true },
    description:     { type: String, required: true },
    price:           { type: Number, required: true, min: 0 },
    discountPrice:   { type: Number, min: 0 },
    images:          { type: [String], default: [] },
    category:        {
      type: String,
      enum: ['merchandise', 'physical-films', 'digital-films', 'special-edition'],
      required: true,
    },
    stock:           { type: Number, required: true, min: 0, default: 0 },
    sku:             { type: String, required: true, unique: true, trim: true },
    stripeProductId: { type: String },
    featured:        { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

ProductSchema.index({ name: 'text', description: 'text' })
ProductSchema.index({ category: 1 })
ProductSchema.index({ price: 1 })
ProductSchema.index({ featured: 1 })
ProductSchema.index({ sku: 1 }, { unique: true })

const Product: Model<IProductDocument> =
  mongoose.models.Product ||
  mongoose.model<IProductDocument>('Product', ProductSchema)

export default Product
