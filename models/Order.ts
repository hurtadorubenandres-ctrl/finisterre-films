import mongoose, { Schema, Document, Model } from 'mongoose'
import type { IOrder } from '@/lib/types'

export interface IOrderDocument extends Omit<IOrder, '_id'>, Document {}

const OrderItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity:  { type: Number, required: true, min: 1 },
    price:     { type: Number, required: true, min: 0 },
    name:      { type: String, required: true },
    image:     { type: String, default: '' },
  },
  { _id: false }
)

const ShippingAddressSchema = new Schema(
  {
    fullName:   { type: String, required: true },
    address:    { type: String, required: true },
    city:       { type: String, required: true },
    postalCode: { type: String, required: true },
    country:    { type: String, required: true },
    phone:      { type: String },
  },
  { _id: false }
)

const OrderSchema = new Schema<IOrderDocument>(
  {
    userId:          { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items:           { type: [OrderItemSchema], required: true },
    totalPrice:      { type: Number, required: true, min: 0 },
    status:          {
      type: String,
      enum: ['pending', 'completed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    shippingAddress: { type: ShippingAddressSchema, required: true },
    stripePaymentId: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

OrderSchema.index({ userId: 1, createdAt: -1 })
OrderSchema.index({ status: 1 })
OrderSchema.index({ stripePaymentId: 1 })

const Order: Model<IOrderDocument> =
  mongoose.models.Order ||
  mongoose.model<IOrderDocument>('Order', OrderSchema)

export default Order
