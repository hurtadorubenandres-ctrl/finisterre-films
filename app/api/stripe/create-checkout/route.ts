import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'
import { getCurrentUser } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const user = getCurrentUser(req)
    const { items, orderId } = await req.json()

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, error: 'No hay productos en el carrito' }, { status: 400 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

    const session = await createCheckoutSession({
      items,
      successUrl: `${appUrl}/shop/cart?success=1&orderId=${orderId ?? 'new'}`,
      cancelUrl: `${appUrl}/shop/cart?cancelled=1`,
      customerEmail: user?.email,
      metadata: { userId: user?.userId ?? 'guest', orderId: orderId ?? '' },
    })

    return NextResponse.json({ success: true, data: { url: session.url, sessionId: session.id } })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
