import mongoose, { Schema, Document, Model } from 'mongoose'
import type { IMembership } from '@/lib/types'

export interface IMembershipDocument extends Omit<IMembership, '_id'>, Document {}

const MembershipSchema = new Schema<IMembershipDocument>(
  {
    name:          {
      type: String,
      enum: ['Basic', 'Premium', 'VIP'],
      required: true,
      unique: true,
    },
    price:         { type: Number, required: true, min: 0 },
    features:      { type: [String], default: [] },
    stripePriceId: { type: String, required: true },
    description:   { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Seed inicial de los 3 planes cuando se inicia la app
MembershipSchema.statics.seed = async function () {
  const count = await this.countDocuments()
  if (count > 0) return

  await this.insertMany([
    {
      name: 'Basic',
      price: 0,
      description: 'Acceso gratuito al catálogo público',
      stripePriceId: 'price_free',
      features: [
        'Acceso al catálogo de películas',
        'Newsletter mensual',
        'Podcast público',
      ],
    },
    {
      name: 'Premium',
      price: 7.99,
      description: 'Acceso completo a todo el contenido',
      stripePriceId: process.env.STRIPE_PRICE_PREMIUM || 'price_premium_placeholder',
      features: [
        'Todo lo de Basic',
        'Películas exclusivas en streaming',
        'Descuento 15% en tienda',
        'Acceso anticipado a estrenos',
        'Newsletter semanal exclusiva',
      ],
    },
    {
      name: 'VIP',
      price: 19.99,
      description: 'La experiencia completa Finisterre Films',
      stripePriceId: process.env.STRIPE_PRICE_VIP || 'price_vip_placeholder',
      features: [
        'Todo lo de Premium',
        'Invitaciones a preestrenos',
        'Acceso al making-of exclusivo',
        'Descuento 30% en tienda',
        'Videollamada trimestral con el equipo',
        'Merchandise exclusivo para VIP',
      ],
    },
  ])
}

const Membership: Model<IMembershipDocument> =
  mongoose.models.Membership ||
  mongoose.model<IMembershipDocument>('Membership', MembershipSchema)

export default Membership
