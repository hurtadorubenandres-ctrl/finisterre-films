# 🎬 Finisterre Films - Sitio Web Profesional

Website moderna y funcional para productora audiovisual gallega, similar a A24 Films.

## ✨ Características

- 🎥 Catálogo completo de películas con fichas detalladas
- 📰 Blog/noticias de la productora
- 🛒 Tienda online (merchandise y películas)
- 🎙️ Sección de podcasts
- 💳 Sistema de membresía con pagos Stripe
- 🛒 Carrito de compras funcional
- 👤 Autenticación de usuarios
- 🎛️ Panel de administración
- 📱 Responsive design (mobile-first)
- 🌙 Dark mode
- ⚡ SEO optimizado

## 🚀 Stack Tecnológico

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: JWT + NextAuth.js
- **Payments**: Stripe
- **Hosting**: Vercel (recomendado)

## 📋 Requisitos Previos

- Node.js 18+ instalado
- npm o yarn
- Cuenta MongoDB Atlas (gratis)
- Cuenta Stripe (test keys gratis)
- Editor de código (VS Code recomendado)

## 🔧 Instalación Rápida

### 1. Clonar/Crear proyecto
```bash
git clone <repo-url> finisterre-films
cd finisterre-films
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Copia `.env.local` y rellena:
```
MONGODB_URI=tu_connection_string_de_mongodb
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
JWT_SECRET=algo_super_secreto_aleatorio
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Correr en desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
finisterre-films/
├── app/                 # Next.js app directory
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Home page
│   ├── films/           # Películas
│   ├── blog/            # Blog/noticias
│   ├── shop/            # Tienda online
│   ├── podcasts/        # Podcasts
│   ├── membership/      # Membresía
│   ├── contact/         # Contacto
│   └── api/             # API routes
├── components/          # Componentes reutilizables
├── lib/                 # Utilidades y configuración
├── models/              # Esquemas MongoDB
├── context/             # React Context
├── hooks/               # Custom hooks
└── public/              # Archivos estáticos
```

## 📖 Documentación

Ver `CLAUDE_CODE_GUIDE.md` para guía de implementación completa por fases.

Ver `PROJECT_STRUCTURE.md` para estructura detallada y modelos de datos.

## 🔐 Seguridad

- Passwords hasheados con bcrypt
- JWT para autenticación
- CORS configurado
- Variables sensibles en .env.local
- SQL injection prevention (MongoDB)
- XSS protection

## 💳 Integración Stripe

### Test Cards (desarrollo)
- **Visa éxito**: 4242 4242 4242 4242
- **Visa falla**: 4000 0000 0000 0002
- Fecha: cualquier fecha futura
- CVC: cualquier 3 dígitos

### Webhook (test)
Usar Stripe CLI para testing de webhooks:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## 🚀 Deploy a Producción

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Pasos:
1. Conecta tu repo de GitHub
2. Añade variables de entorno en Vercel dashboard
3. Deploy automático en cada push

## 📊 Monitoreo

- Google Analytics integrado
- Stripe dashboard para órdenes
- MongoDB Atlas para BD
- Vercel Analytics para performance

## 🤝 Contribuir

1. Crea un branch: `git checkout -b feature/mi-feature`
2. Commit: `git commit -m 'Añade mi feature'`
3. Push: `git push origin feature/mi-feature`
4. Pull Request

## 📝 Licencia

Propietario © 2024 Finisterre Films

## 📞 Soporte

Para preguntas o problemas, contacta a: info@finisterrefilms.com

---

**Desarrollado con ❤️ por Claude + Next.js**
