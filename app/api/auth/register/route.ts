import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import { hashPassword, generateToken, validatePassword } from '@/lib/auth'
import { isValidEmail } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    // Validaciones
    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json({ success: false, error: 'Todos los campos son obligatorios' }, { status: 400 })
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ success: false, error: 'Email inválido' }, { status: 400 })
    }
    const pwValidation = validatePassword(password)
    if (!pwValidation.valid) {
      return NextResponse.json({ success: false, error: pwValidation.errors.join('. ') }, { status: 400 })
    }

    await dbConnect()

    // Email único
    const exists = await User.findOne({ email: email.toLowerCase() })
    if (exists) {
      return NextResponse.json({ success: false, error: 'Este email ya está registrado' }, { status: 409 })
    }

    const hashedPassword = await hashPassword(password)
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
    })

    const token = generateToken({
      userId: String(user._id),
      email: user.email,
      role: user.role,
      membershipStatus: user.membershipStatus,
    })

    // Cookie HttpOnly
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,  // 7 días
      path: '/',
    })

    return NextResponse.json({
      success: true,
      data: { _id: user._id, name: user.name, email: user.email, role: user.role, membershipStatus: user.membershipStatus },
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
