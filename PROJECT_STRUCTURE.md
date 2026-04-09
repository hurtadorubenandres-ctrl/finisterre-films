## ESTRUCTURA DEL PROYECTO FINISTERRE FILMS

```
finisterre-films/
├── app/
│   ├── layout.tsx                 # Layout principal
│   ├── page.tsx                   # Página de inicio (Hero + películas destacadas)
│   ├── films/
│   │   ├── page.tsx               # Catálogo completo de películas
│   │   └── [id]/
│   │       └── page.tsx           # Detalle de película individual
│   ├── blog/
│   │   ├── page.tsx               # Lista de blogs/noticias
│   │   └── [slug]/
│   │       └── page.tsx           # Artículo individual
│   ├── shop/
│   │   ├── page.tsx               # Tienda (merchandise, películas en venta)
│   │   ├── [id]/
│   │   │   └── page.tsx           # Producto individual
│   │   └── cart/
│   │       └── page.tsx           # Carrito de compras
│   ├── membership/
│   │   └── page.tsx               # Página de membresía/suscripción
│   ├── podcasts/
│   │   ├── page.tsx               # Lista de podcasts
│   │   └── [id]/
│   │       └── page.tsx           # Podcast individual
│   ├── contact/
│   │   └── page.tsx               # Página de contacto
│   └── api/
│       ├── films/
│       │   ├── route.ts           # GET/POST películas
│       │   └── [id]/route.ts      # GET/PUT/DELETE película específica
│       ├── blog/
│       │   ├── route.ts           # GET/POST posts
│       │   └── [id]/route.ts      # GET/PUT/DELETE post específico
│       ├── products/
│       │   ├── route.ts           # GET/POST productos tienda
│       │   └── [id]/route.ts      # GET/PUT/DELETE producto
│       ├── orders/
│       │   ├── route.ts           # POST crear orden (Stripe)
│       │   └── [id]/route.ts      # GET orden específica
│       ├── podcasts/
│       │   ├── route.ts           # GET/POST podcasts
│       │   └── [id]/route.ts      # GET/PUT/DELETE podcast
│       ├── auth/
│       │   ├── login/route.ts     # Login
│       │   ├── register/route.ts  # Registro
│       │   └── logout/route.ts    # Logout
│       ├── contact/
│       │   └── route.ts           # POST enviar mensaje contacto
│       └── stripe/
│           ├── webhook/route.ts   # Webhook de Stripe
│           └── create-checkout/route.ts  # Crear sesión checkout
│
├── components/
│   ├── Header.tsx                 # Navegación principal
│   ├── Footer.tsx                 # Pie de página
│   ├── HeroSection.tsx            # Sección hero
│   ├── FilmCard.tsx               # Tarjeta de película
│   ├── BlogCard.tsx               # Tarjeta de blog
│   ├── ProductCard.tsx            # Tarjeta de producto
│   ├── Newsletter.tsx             # Suscripción newsletter
│   ├── VideoPlayer.tsx            # Reproductor de videos/trailers
│   ├── FilterBar.tsx              # Filtros (año, género, etc)
│   ├── ShoppingCart.tsx           # Carrito (contexto/state)
│   └── SearchBar.tsx              # Búsqueda global
│
├── lib/
│   ├── mongodb.ts                 # Conexión a MongoDB
│   ├── stripe.ts                  # Configuración Stripe
│   ├── auth.ts                    # Lógica de autenticación (JWT)
│   ├── email.ts                   # Envío de emails
│   ├── types.ts                   # TypeScript interfaces/types
│   └── utils.ts                   # Funciones auxiliares
│
├── models/
│   ├── Film.ts                    # Schema de película
│   ├── BlogPost.ts                # Schema de blog
│   ├── Product.ts                 # Schema de producto tienda
│   ├── Order.ts                   # Schema de orden/carrito
│   ├── Podcast.ts                 # Schema de podcast
│   ├── User.ts                    # Schema de usuario
│   └── Membership.ts              # Schema de membresía
│
├── context/
│   ├── CartContext.tsx            # Context API para carrito
│   ├── AuthContext.tsx            # Context API para autenticación
│   └── ThemeContext.tsx           # Context API para tema (dark/light)
│
├── hooks/
│   ├── useCart.ts                 # Hook para carrito
│   ├── useAuth.ts                 # Hook para autenticación
│   └── useFetch.ts                # Hook para fetching data
│
├── public/
│   ├── images/
│   ├── icons/
│   └── videos/
│
├── styles/
│   ├── globals.css                # Estilos globales
│   └── variables.css              # Variables CSS
│
├── .env.local                      # Variables de entorno
├── .gitignore
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## MODELOS DE DATOS (MongoDB/TypeScript)

### Film
- _id: ObjectId
- title: string
- year: number
- director: string
- synopsis: string
- genreS: string[]
- runtime: number (minutos)
- posterImage: string (URL)
- trailerUrl: string (YouTube/Vimeo)
- cast: string[]
- awards: string[]
- releaseDate: Date
- status: 'upcoming' | 'released' | 'archive'
- featured: boolean
- createdAt: Date
- updatedAt: Date

### BlogPost
- _id: ObjectId
- title: string
- slug: string (para URL amigable)
- excerpt: string
- content: string (Markdown o HTML)
- author: string
- featuredImage: string (URL)
- category: string
- tags: string[]
- publishedAt: Date
- updatedAt: Date
- featured: boolean
- views: number

### Product (Shop)
- _id: ObjectId
- name: string
- description: string
- price: number
- discountPrice: number
- images: string[] (múltiples fotos)
- category: 'merchandise' | 'physical-films' | 'digital-films' | 'special-edition'
- stock: number
- sku: string
- stripeProductId: string
- featured: boolean
- createdAt: Date
- updatedAt: Date

### Order
- _id: ObjectId
- userId: ObjectId (referencia a User)
- items: [{ productId, quantity, price }]
- totalPrice: number
- status: 'pending' | 'completed' | 'shipped' | 'delivered' | 'cancelled'
- shippingAddress: { ... }
- stripePaymentId: string
- createdAt: Date
- updatedAt: Date

### Podcast
- _id: ObjectId
- title: string
- slug: string
- description: string
- episodeNumber: number
- season: number
- guests: string[]
- audioUrl: string
- duration: number (segundos)
- transcript: string
- publishedAt: Date
- featured: boolean
- spotifyUrl: string
- appleUrl: string

### User
- _id: ObjectId
- email: string
- password: string (hashed)
- name: string
- role: 'user' | 'admin' | 'editor'
- membershipStatus: 'free' | 'premium' | 'vip'
- createdAt: Date
- updatedAt: Date

### Membership
- _id: ObjectId
- name: string ('Basic', 'Premium', 'VIP')
- price: number (mensual)
- features: string[]
- stripePriceId: string
- description: string
