# GUÍA PARA CLAUDE CODE - FINISTERRE FILMS

## Contexto del Proyecto

**Finisterre Films** es una productora audiovisual gallega que necesita un sitio web profesional similar a A24 Films. Debe incluir:

- Catálogo de películas con fichas detalladas
- Blog/noticias de la productora
- Tienda online (merchandise y películas)
- Suscripción a podcast
- Sistema de membresía
- Carrito de compras funcional
- Autenticación de usuarios
- Panel de administración

---

## Stack Tecnológico Recomendado

```
Frontend: Next.js 14 + React 18 + TypeScript
Styling: Tailwind CSS + CSS Modules
Backend: Next.js API Routes
Database: MongoDB Atlas (gratis)
Authentication: JWT + NextAuth.js
Payments: Stripe
Storage: Cloudinary (imágenes) o AWS S3
Email: Nodemailer o SendGrid
Hosting: Vercel (gratis para Next.js)
```

---

## Fase 1: Configuración Base (1-2 horas)

### 1.1 Crear el proyecto
```bash
npx create-next-app@latest finisterre-films --typescript --tailwind
cd finisterre-films
npm install axios mongodb mongoose next-auth stripe
```

### 1.2 Estructurar carpetas
Seguir el árbol en `PROJECT_STRUCTURE.md`

### 1.3 Variables de entorno
Configurar `.env.local` con:
- MongoDB connection string (crear cuenta gratis en MongoDB Atlas)
- Stripe keys (crear account en Stripe - test keys gratis)
- JWT secret (generar string aleatorio seguro)

### 1.4 Componentes base
- Header con navegación sticky
- Footer con enlaces
- Layout principal que envuelva todo

---

## Fase 2: Página de Inicio (2-3 horas)

### 2.1 Hero Section
- Video/imagen de fondo
- Headline: "Historias que transforman"
- Newsletter subscription

### 2.2 Featured Films
- Grid de 4-6 películas destacadas
- Efecto hover (escala + sombra)
- Enlaces a detalles de película

### 2.3 Latest Blog Posts
- Grid de 3 posts más recientes
- Preview de contenido
- Enlace "Ver todos"

### 2.4 Call-to-action
- "¿Trabajamos juntos?" con botón contacto

---

## Fase 3: Películas (3-4 horas)

### 3.1 Página de Catálogo (/films)
- Grid con todas las películas
- Filtros: año, género, director
- Búsqueda por título
- Paginación

### 3.2 Detalle de Película (/films/[id])
- Poster/imagen principal
- Reproductor de trailer (YouTube embed)
- Información: director, elenco, sinopsis, duración
- Año, géneros, awards
- Películas relacionadas (similar director/genre)
- CTA: "Ver más" o enlace a plataforma de streaming

### 3.3 API /api/films
```
GET /api/films - Listar todas con filtros
GET /api/films/[id] - Detalle específica
POST /api/films - Crear (admin only)
PUT /api/films/[id] - Editar (admin)
DELETE /api/films/[id] - Eliminar (admin)
```

---

## Fase 4: Blog/Noticias (2-3 horas)

### 4.1 Página de Blog (/blog)
- Lista con preview de posts
- Filtro por categoría/tags
- Búsqueda
- Orden: más recientes primero

### 4.2 Artículo Individual (/blog/[slug])
- Contenido completo (markdown renderizado)
- Autor y fecha
- Imagen destacada
- Tags/categorías
- Artículos relacionados
- Sección comentarios (opcional: Disqus o custom)

### 4.3 API /api/blog
```
GET /api/blog - Listar posts
GET /api/blog/[id] - Detalle
POST /api/blog - Crear (editor+)
PUT /api/blog/[id] - Editar
DELETE /api/blog/[id] - Eliminar
```

---

## Fase 5: Tienda Online (4-5 horas)

### 5.1 Página de Shop (/shop)
- Grid de productos
- Filtros: categoría, precio, stock
- Búsqueda
- Carrito flotante (lado derecho)

### 5.2 Detalle de Producto (/shop/[id])
- Galería de imágenes (zoom)
- Nombre, descripción, precio
- Stock disponible
- Botón "Añadir al carrito"
- Productos relacionados
- Reviews/valoraciones (opcional)

### 5.3 Carrito (/shop/cart)
- Lista de items con quantities
- Subtotal, impuestos, envío
- Resumen de precios
- Botón "Proceder a pago"

### 5.4 Checkout (Stripe)
- Integración con Stripe Checkout
- Redirigir a Stripe hosted page
- Confirmar pago y crear Order en BD

### 5.5 API /api/products
```
GET /api/products - Listar con filtros
GET /api/products/[id] - Detalle
POST /api/products - Crear (admin)
PUT /api/products/[id] - Editar
DELETE /api/products/[id] - Eliminar
```

### 5.6 API /api/orders
```
POST /api/orders - Crear orden
GET /api/orders/[id] - Detalle orden
GET /api/orders - Mis órdenes (user logged)
```

---

## Fase 6: Podcasts (2 horas)

### 6.1 Página de Podcasts (/podcasts)
- Grid de episodios
- Reproductor integrado
- Filtro por temporada
- Enlaces a Spotify/Apple Podcasts

### 6.2 Detalle Episodio (/podcasts/[id])
- Reproductor de audio
- Descripción completa
- Transcripción (si existe)
- Invitados
- Enlaces a plataformas

### 6.3 API /api/podcasts
```
GET /api/podcasts - Listar
GET /api/podcasts/[id] - Detalle
POST/PUT/DELETE - Admin only
```

---

## Fase 7: Autenticación y Membresía (3-4 horas)

### 7.1 Registro (/auth/register)
- Formulario: email, password, nombre
- Validaciones (email único, password fuerte)
- Guardar en MongoDB (password hashed con bcrypt)
- JWT token
- Redirect a home

### 7.2 Login (/auth/login)
- Email y password
- Validar contra BD
- Generar JWT y guardar en cookies/localStorage
- Redirect a home o página anterior

### 7.3 Membresía (/membership)
- Planes: Free, Premium, VIP
- Descripción de beneficios
- Botón "Suscribirse" → Stripe Subscription
- Mi membresía (si logueado)

### 7.4 Context API
- AuthContext para estado global de usuario
- CartContext para carrito global
- useAuth hook
- useCart hook

---

## Fase 8: Admin Panel (3-4 horas)

### 8.1 Dashboard (/admin)
- Estadísticas: películas, posts, ordenes, usuarios
- Gráficos de actividad

### 8.2 Gestión de Películas (/admin/films)
- Tabla con todas las películas
- Botones editar/eliminar
- Formulario crear película

### 8.3 Gestión de Blog (/admin/blog)
- Editor WYSIWYG o markdown
- Subida de imágenes
- Preview en vivo

### 8.4 Gestión de Productos (/admin/products)
- CRUD completo
- Gestión de stock
- Galería de imágenes

### 8.5 Órdenes (/admin/orders)
- Tabla de todas las órdenes
- Cambiar estado (pending → shipped → delivered)
- Descargar invoice

---

## Fase 9: Funcionalidades Avanzadas (2-3 horas)

### 9.1 Búsqueda global
- Input en header
- Busca en películas, blog, productos
- Resultados con preview

### 9.2 Newsletter
- Formulario de suscripción en hero y footer
- Guardar emails en BD
- API para envío de newsletters (cron job)

### 9.3 Formulario de contacto
- Nombre, email, asunto, mensaje
- Validaciones
- Envío de email a info@finisterrefilms.com
- Respuesta automática al usuario

### 9.4 SEO
- Meta tags dinámicos
- OpenGraph para películas/posts
- Sitemap.xml
- robots.txt

### 9.5 Analytics
- Google Analytics integrado
- Tracking de eventos (clicks en películas, compras, etc.)

---

## Instrucciones para Claude Code

### Paso 1: Crear estructura base
```
Primero, configura el proyecto Next.js con todos los archivos de configuración 
y la estructura de carpetas detallada en PROJECT_STRUCTURE.md
```

### Paso 2: Implementar componentes reutilizables
```
Crea Header, Footer, FilmCard, BlogCard, ProductCard, NewsLetter, etc.
con estilos profesionales usando Tailwind CSS
```

### Paso 3: Conectar a MongoDB
```
Configura la conexión a MongoDB Atlas (gratis).
Crea los models (Film, BlogPost, Product, Order, Podcast, User, Membership)
```

### Paso 4: Implementar por fases
```
Sigue el orden: Inicio → Películas → Blog → Shop → Podcasts → Auth → Admin

En cada fase, primero crea los componentes, luego las rutas API, 
luego las páginas.
```

### Paso 5: Integrar Stripe
```
Para shop y membresía, integra Stripe:
- Webhooks para confirmar pagos
- Actualizar status de órdenes automáticamente
```

### Paso 6: Testing y Deploy
```
Antes de publicar:
- Prueba todas las rutas (desktop y mobile)
- Verifica pagos con Stripe test keys
- Deploy a Vercel (gratis y automático)
```

---

## Comandos útiles durante el desarrollo

```bash
# Instalar dependencias
npm install

# Correr en desarrollo
npm run dev

# Build para producción
npm run build
npm run start

# Linting
npm run lint
```

---

## Variables de Entorno que necesitarás

```
# MongoDB
MONGODB_URI=tu_mongodb_atlas_connection_string

# Stripe (obtén en https://stripe.com)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# JWT
JWT_SECRET=generar_algo_seguro_y_aleatorio

# Email (Nodemailer/SendGrid)
SMTP_HOST=smtp.gmail.com
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_password_app

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000 (desarrollo)
                    https://tudominio.com (producción)
```

---

## Sugerencias de Diseño

- **Colores**: Blanco/gris oscuro + accento (azul o naranja)
- **Tipografía**: Sans-serif moderno (Inter, Poppins)
- **Espaciado**: Generoso (2rem entre secciones)
- **Animaciones**: Suaves (hover, scroll) sin exagerar
- **Dark mode**: Implementar con Tailwind

---

## Próximos pasos para ti (Kyara)

1. ✅ Tienes Node.js instalado
2. ✅ Tienes UI/UX Pro Max
3. ✅ Tienes Claude Code
4. 📋 **AHORA**: Abre Claude Code y pégale este documento
5. **Claude Code** seguirá todo lo que le pidas automáticamente

Simplemente dile a Claude Code:

```
"Implementa la Fase 1 (Configuración Base) del proyecto Finisterre Films
usando esta guía. Crea la estructura de carpetas, configura Next.js,
MongoDB y Stripe en modo test."
```

¡Y Claude Code se encargará! 🚀
