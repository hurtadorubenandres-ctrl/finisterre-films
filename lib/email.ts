// ============================================================
// FINISTERRE FILMS – Email helpers (Nodemailer)
// ============================================================

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,            // true para 465, false para otros puertos
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const FROM_ADDRESS = `"Finisterre Films" <${process.env.SMTP_USER}>`
const COMPANY_EMAIL = process.env.COMPANY_EMAIL || 'info@finisterrefilms.com'

// ──────────────────────────────────────────────────────────
// Generic send
// ──────────────────────────────────────────────────────────
interface SendEmailParams {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail(params: SendEmailParams): Promise<void> {
  await transporter.sendMail({
    from: FROM_ADDRESS,
    ...params,
  })
}

// ──────────────────────────────────────────────────────────
// Contact form
// ──────────────────────────────────────────────────────────
export async function sendContactFormEmail(data: {
  name: string
  email: string
  subject: string
  message: string
}): Promise<void> {
  const { name, email, subject, message } = data

  // Notificación al equipo de Finisterre Films
  await sendEmail({
    to: COMPANY_EMAIL,
    subject: `[Contacto Web] ${subject}`,
    html: `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Asunto:</strong> ${subject}</p>
      <hr />
      <p>${message.replace(/\n/g, '<br />')}</p>
    `,
    text: `Nuevo mensaje de ${name} (${email}):\n\n${message}`,
  })

  // Confirmación automática al usuario
  await sendEmail({
    to: email,
    subject: 'Hemos recibido tu mensaje – Finisterre Films',
    html: `
      <h2>Gracias por contactar con Finisterre Films</h2>
      <p>Hola ${name},</p>
      <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo en las próximas 24-48 horas.</p>
      <br/>
      <p>Un saludo,<br/><strong>El equipo de Finisterre Films</strong></p>
    `,
    text: `Gracias ${name}, hemos recibido tu mensaje y te responderemos pronto.`,
  })
}

// ──────────────────────────────────────────────────────────
// Order confirmation
// ──────────────────────────────────────────────────────────
export async function sendOrderConfirmationEmail(data: {
  to: string
  customerName: string
  orderId: string
  items: Array<{ name: string; quantity: number; price: number }>
  totalPrice: number
}): Promise<void> {
  const { to, customerName, orderId, items, totalPrice } = data

  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px">${item.name}</td>
        <td style="padding:8px;text-align:center">${item.quantity}</td>
        <td style="padding:8px;text-align:right">${item.price.toFixed(2)} €</td>
      </tr>
    `
    )
    .join('')

  await sendEmail({
    to,
    subject: `Confirmación de pedido #${orderId} – Finisterre Films`,
    html: `
      <h2>¡Pedido confirmado! 🎬</h2>
      <p>Hola ${customerName},</p>
      <p>Tu pedido <strong>#${orderId}</strong> ha sido recibido y está siendo procesado.</p>
      <table border="1" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="background:#111">
            <th style="padding:8px;color:#fff;text-align:left">Producto</th>
            <th style="padding:8px;color:#fff">Cantidad</th>
            <th style="padding:8px;color:#fff;text-align:right">Precio</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding:8px;font-weight:bold;text-align:right">Total:</td>
            <td style="padding:8px;font-weight:bold;text-align:right">${totalPrice.toFixed(2)} €</td>
          </tr>
        </tfoot>
      </table>
      <br/>
      <p>Un saludo,<br/><strong>El equipo de Finisterre Films</strong></p>
    `,
  })
}

// ──────────────────────────────────────────────────────────
// Newsletter welcome
// ──────────────────────────────────────────────────────────
export async function sendNewsletterWelcomeEmail(params: {
  to: string
  name?: string
}): Promise<void> {
  const { to, name } = params
  await sendEmail({
    to,
    subject: 'Bienvenido/a a la newsletter de Finisterre Films',
    html: `
      <h2>¡Bienvenido/a a Finisterre Films! 🎬</h2>
      <p>${name ? `Hola ${name},` : 'Hola,'}</p>
      <p>Ya eres parte de nuestra comunidad. Recibirás noticias sobre nuestras películas,
      estrenos, eventos y contenido exclusivo.</p>
      <br/>
      <p>Un saludo,<br/><strong>El equipo de Finisterre Films</strong></p>
    `,
    text: `Bienvenido/a a Finisterre Films. Ya recibirás nuestras novedades.`,
  })
}
