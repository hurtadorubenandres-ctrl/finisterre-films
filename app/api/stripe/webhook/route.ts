import { NextRequest, NextResponse } from 'next/server'
import { constructWebhookEvent } from '@/lib/stripe'
import dbConnect from '@/lib/mongodb'
import Order from '@/models/Order'

export async function POST(req: NextRequest) {
  const payload = await req.text()
  const sig = req.headers.get('stripe-signature') ?? ''
  const secret = process.env.STRIPE_WEBHOOK_SECRET ?? ''

  try {
    const event = constructWebhookEvent(payload, sig, secret)

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as { metadata?: Record<string, string>; payment_intent?: string }
        const { orderId } = session.metadata ?? {}
        const paymentIntentId = typeof session.payment_intent === 'string'
          ? session.payment_intent
          : ''

        if (orderId && orderId !== 'new') {
          await dbConnect()
          await Order.findByIdAndUpdate(orderId, {
            status: 'completed',
            stripePaymentId: paymentIntentId,
          })
        }
        break
      }

      case 'payment_intent.payment_failed':
        console.log('Pago fallido:', event.data.object)
        break

      default:
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Stripe webhook error:', error)
    return NextResponse.json({ error: `Webhook Error: ${String(error)}` }, { status: 400 })
  }
}

// Necesario para que Stripe reciba el body sin parsear
export const config = { api: { bodyParser: false } }
