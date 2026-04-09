import mongoose, { Schema, Document, Model } from 'mongoose'
import type { IUser } from '@/lib/types'

export interface IUserDocument extends Omit<IUser, '_id'>, Document {}

const UserSchema = new Schema<IUserDocument>(
  {
    email:            {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password:         { type: String, required: true },
    name:             { type: String, required: true, trim: true },
    role:             {
      type: String,
      enum: ['user', 'admin', 'editor'],
      default: 'user',
    },
    membershipStatus: {
      type: String,
      enum: ['free', 'premium', 'vip'],
      default: 'free',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: Record<string, unknown>) => {
        delete ret.password   // nunca exponer el hash
        return ret
      },
    },
    toObject: { virtuals: true },
  }
)

UserSchema.index({ email: 1 }, { unique: true })
UserSchema.index({ role: 1 })

const User: Model<IUserDocument> =
  mongoose.models.User ||
  mongoose.model<IUserDocument>('User', UserSchema)

export default User
