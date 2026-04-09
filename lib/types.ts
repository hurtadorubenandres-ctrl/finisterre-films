// ============================================================
// FINISTERRE FILMS – TypeScript Interfaces & Types
// ============================================================

import { Types } from 'mongoose'

// ──────────────────────────────────────────────────────────
// FILM
// ──────────────────────────────────────────────────────────
export interface IFilm {
  _id: Types.ObjectId | string
  title: string
  year: number
  director: string
  synopsis: string
  genres: string[]
  runtime: number          // minutos
  posterImage: string      // URL
  trailerUrl: string       // YouTube / Vimeo
  cast: string[]
  awards: string[]
  releaseDate: Date
  status: 'upcoming' | 'released' | 'archive'
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

// ──────────────────────────────────────────────────────────
// BLOG POST
// ──────────────────────────────────────────────────────────
export interface IBlogPost {
  _id: Types.ObjectId | string
  title: string
  slug: string
  excerpt: string
  content: string          // Markdown o HTML
  author: string
  featuredImage: string    // URL
  category: string
  tags: string[]
  publishedAt: Date
  updatedAt: Date
  featured: boolean
  views: number
}

// ──────────────────────────────────────────────────────────
// PRODUCT (Shop)
// ──────────────────────────────────────────────────────────
export type ProductCategory =
  | 'merchandise'
  | 'physical-films'
  | 'digital-films'
  | 'special-edition'

export interface IProduct {
  _id: Types.ObjectId | string
  name: string
  description: string
  price: number
  discountPrice?: number
  images: string[]
  category: ProductCategory
  stock: number
  sku: string
  stripeProductId?: string
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

// ──────────────────────────────────────────────────────────
// ORDER
// ──────────────────────────────────────────────────────────
export interface IOrderItem {
  productId: Types.ObjectId | string
  quantity: number
  price: number
  name: string
  image: string
}

export interface IShippingAddress {
  fullName: string
  address: string
  city: string
  postalCode: string
  country: string
  phone?: string
}

export type OrderStatus =
  | 'pending'
  | 'completed'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export interface IOrder {
  _id: Types.ObjectId | string
  userId: Types.ObjectId | string
  items: IOrderItem[]
  totalPrice: number
  status: OrderStatus
  shippingAddress: IShippingAddress
  stripePaymentId?: string
  createdAt: Date
  updatedAt: Date
}

// ──────────────────────────────────────────────────────────
// PODCAST
// ──────────────────────────────────────────────────────────
export interface IPodcast {
  _id: Types.ObjectId | string
  title: string
  slug: string
  description: string
  episodeNumber: number
  season: number
  guests: string[]
  audioUrl: string
  duration: number         // segundos
  transcript?: string
  publishedAt: Date
  featured: boolean
  spotifyUrl?: string
  appleUrl?: string
}

// ──────────────────────────────────────────────────────────
// USER
// ──────────────────────────────────────────────────────────
export type UserRole = 'user' | 'admin' | 'editor'
export type MembershipStatus = 'free' | 'premium' | 'vip'

export interface IUser {
  _id: Types.ObjectId | string
  email: string
  password: string         // hashed con bcrypt
  name: string
  role: UserRole
  membershipStatus: MembershipStatus
  createdAt: Date
  updatedAt: Date
}

// Safe version (sin password) para enviar al cliente
export type IUserSafe = Omit<IUser, 'password'>

// ──────────────────────────────────────────────────────────
// MEMBERSHIP
// ──────────────────────────────────────────────────────────
export type MembershipTier = 'Basic' | 'Premium' | 'VIP'

export interface IMembership {
  _id: Types.ObjectId | string
  name: MembershipTier
  price: number            // mensual en EUR
  features: string[]
  stripePriceId: string
  description: string
}

// ──────────────────────────────────────────────────────────
// CART (client-side state, no persisted in DB)
// ──────────────────────────────────────────────────────────
export interface ICartItem {
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  stock: number
}

// ──────────────────────────────────────────────────────────
// API Response helpers
// ──────────────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// ──────────────────────────────────────────────────────────
// AUTH
// ──────────────────────────────────────────────────────────
export interface JwtPayload {
  userId: string
  email: string
  role: UserRole
  membershipStatus: MembershipStatus
  iat?: number
  exp?: number
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}
