import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { sendContactFormEmail, sendNewsletterWelcomeEmail } from '@/lib/email'
import { isValidEmail } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, email, name, subject, message } = body

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ success: false, error: 'Email inválido' }, { status: 400 })
    }

    if (type === 'newsletter') {
      // Guardar en BD (simplificado) + email bienvenida
      await sendNewsletterWelcomeEmail({ to: email, name })
      return NextResponse.json({ success: true, message: 'Suscripción completada' })
    }

    // Contact form
    if (!name || !subject || !message) {
      return NextResponse.json({ success: false, error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    await sendContactFormEmail({ name, email, subject, message })
    return NextResponse.json({ success: true, message: 'Mensaje enviado correctamente' })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ success: false, error: 'Error al procesar la solicitud' }, { status: 500 })
  }
}
