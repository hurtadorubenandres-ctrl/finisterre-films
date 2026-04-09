// ============================================================
// FINISTERRE FILMS – Stripe configuration (test mode)
// ============================================================

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'placeholder_key', {
  apiVersion: '2023-10-16',
  typescript: true,
})

export default stripe

// ──────────────────────────────────────────────────────────
// Helpers de Stripe
// ──────────────────────────────────────────────────────────

/**
 * Crea una sesión de checkout de Stripe para una compra de productos
 */
export async function createCheckoutSession(params: {
  items: Array<{
    name: string
    price: number
    quantity: number
    image?: string
  }>
  successUrl: string
  cancelUrl: string
  customerEmail?: string
  metadata?: Record<string, string>
}) {
  const { items, successUrl, cancelUrl, customerEmail, metadata } = params

  const lineItems = items.map((item) => ({
    price_data: {
      currency: 'eur',
      product_data: {
        name: item.name,
        ...(item.image && { images: [item.image] }),
      },
      unit_amount: Math.round(item.price * 100), // centavos
    },
    quantity: item.quantity,
  }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    ...(customerEmail && { customer_email: customerEmail }),
    ...(metadata && { metadata }),
    shipping_address_collection: {
      allowed_countries: ['ES', 'PT', 'FR', 'DE', 'IT', 'GB'],
    },
  })

  return session
}

/**
 * Crea una suscripción de membresía (subscription mode)
 */
export async function createSubscriptionSession(params: {
  priceId: string
  successUrl: string
  cancelUrl: string
  customerEmail?: string
  userId: string
}) {
  const { priceId, successUrl, cancelUrl, customerEmail, userId } = params

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    ...(customerEmail && { customer_email: customerEmail }),
    metadata: { userId },
  })

  return session
}

/**
 * Verifica la firma de un webhook de Stripe
 */
export function constructWebhookEvent(
  payload: string | Buffer,
  sig: string,
  secret: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(payload, sig, secret)
}
