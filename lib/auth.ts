// ============================================================
// FINISTERRE FILMS – Auth helpers (JWT + bcrypt)
// ============================================================

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import type { JwtPayload, UserRole, MembershipStatus } from './types'

const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_EXPIRES_IN = '7d'

if (!JWT_SECRET) {
  throw new Error('Por favor define JWT_SECRET en .env.local')
}

// ──────────────────────────────────────────────────────────
// Password helpers
// ──────────────────────────────────────────────────────────

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

export async function comparePassword(
  plain: string,
  hashed: string
): Promise<boolean> {
  return bcrypt.compare(plain, hashed)
}

// ──────────────────────────────────────────────────────────
// JWT helpers
// ──────────────────────────────────────────────────────────

export function generateToken(payload: {
  userId: string
  email: string
  role: UserRole
  membershipStatus: MembershipStatus
}): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload
}

// ──────────────────────────────────────────────────────────
// Request auth extraction
// ──────────────────────────────────────────────────────────

export function getTokenFromRequest(req: NextRequest): string | null {
  // 1. Authorization header
  const authHeader = req.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }

  // 2. Cookie
  const cookieToken = req.cookies.get('token')?.value
  if (cookieToken) return cookieToken

  return null
}

export function getCurrentUser(req: NextRequest): JwtPayload | null {
  try {
    const token = getTokenFromRequest(req)
    if (!token) return null
    return verifyToken(token)
  } catch {
    return null
  }
}

export function requireAuth(req: NextRequest): JwtPayload {
  const user = getCurrentUser(req)
  if (!user) {
    throw new Error('No autenticado')
  }
  return user
}

export function requireAdmin(req: NextRequest): JwtPayload {
  const user = requireAuth(req)
  if (user.role !== 'admin') {
    throw new Error('Acceso denegado: se requiere rol admin')
  }
  return user
}

export function requireEditorOrAdmin(req: NextRequest): JwtPayload {
  const user = requireAuth(req)
  if (user.role !== 'admin' && user.role !== 'editor') {
    throw new Error('Acceso denegado: se requiere rol editor o admin')
  }
  return user
}

// ──────────────────────────────────────────────────────────
// Password validation
// ──────────────────────────────────────────────────────────

export function validatePassword(password: string): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Mínimo 8 caracteres')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Al menos una mayúscula')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Al menos un número')
  }

  return { valid: errors.length === 0, errors }
}
