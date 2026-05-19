@AGENTS.md

# Pixvert — Guía del proyecto

## Qué es
Convertidor de imágenes SaaS con procesamiento 100% client-side. Sin backend de procesamiento, sin subida de archivos a servidor. Modelo freemium con Stripe.

## Stack
- **Next.js 16** (App Router, TypeScript strict)
- **Tailwind CSS v4** — colores en `app/globals.css` vía `@theme inline`, NO hay `tailwind.config.js`
- **Stripe** — suscripciones mensuales, Checkout + Customer Portal + Webhooks
- **Vercel** — deploy en `https://pixvert-one.vercel.app`

## Planes
| Plan | Precio | Límites |
|------|--------|---------|
| Free | $0 | 10 conversiones/día, 5MB/archivo, PNG/JPG/WebP |
| Pro | $3.99/mes | Ilimitado, 50MB/archivo, todos los formatos (AVIF incluido) |

## Visión del producto
Pixvert es una suite de herramientas online gratuitas, todas client-side. Se expande por fases:
- **Fase 1** ✅ Image Tools (converter, resize, compress, rotate, base64, watermark, crop, remove-bg)
- **Fase 2** Text Tools (word counter, case converter, lorem ipsum, diff, URL encoder, base64 text, slug, accents, frequency, blank lines)
- **Fase 3** Color Tools (picker, converter, palette, gradient, contrast checker)
- **Fase 4** Developer Tools (JSON formatter, JSON↔CSV, CSS/JS minifier, HTML formatter, meta tags, .htaccess)
- **Fase 5** Calculators (mortgage, VAT Spain, salary Spain, %, BMI, age, date diff, timezone, units, tip)
- **Fase 6** Generators (QR, password, UUID, random, email signature, privacy policy, robots.txt)
- **Fase 7** File Tools (PDF merge, PDF compress, markdown→HTML, Excel→CSV)

## Archivos clave
```
app/
  page.tsx              — Home: HeroSection + Converter + ProSection
  pricing/page.tsx      — Planes Free vs Pro
  activate/page.tsx     — Activar Pro con email (+ PIN para owner)
  success/              — Página post-pago (activa Pro automáticamente)
  convert/[slug]/       — 80+ páginas SEO estáticas de conversión
  compress/[format]/    — 9 páginas SEO de compresión por formato
  tools/
    page.tsx            — Hub de todas las herramientas por categoría
    resize/page.tsx     — Redimensionar imágenes (usa Converter)
    rotate/page.tsx     — Rotar/voltear imágenes (Canvas API)
    image-to-base64/page.tsx — Imagen a Base64 / Base64 a imagen
    watermark/page.tsx  — Marca de agua de texto (Canvas API)
    crop/page.tsx       — Recortar imágenes (ComingSoon)
    remove-background/page.tsx — Quitar fondo (ComingSoon)
  api/
    checkout/route.ts   — Crea sesión Stripe Checkout
    verify/route.ts     — Verifica suscripción activa en Stripe
    activate/route.ts   — Activa Pro por email (con PIN para owner)
    portal/route.ts     — Crea sesión Customer Portal de Stripe
    webhook/route.ts    — Recibe eventos de Stripe

components/
  Converter.tsx         — Lógica principal de conversión (convert + optimize + resize)
  DropZone.tsx          — Zona de arrastre (5MB free / 50MB Pro)
  Header.tsx            — Nav: Tools / Pricing / Pro badge / idioma / tema
  ComingSoonTool.tsx    — Placeholder con formulario de notificación por email
  ProSection.tsx        — Sección promocional en home (solo usuarios free)
  SubscriptionProvider.tsx — Context: lee email de localStorage, llama /api/verify

lib/
  formats.ts            — Tipos de formato, AVIF detection
  converter.ts          — Worker pool + fallback main thread
  limits.ts             — Control límite diario (localStorage)
  subscription.ts       — Context y hook useSubscription()
  i18n.ts               — 9 idiomas: en, es, fr, de, pt, it, ja, ko, zh
  stripe.ts             — Cliente Stripe singleton
  seo-conversions.ts    — Rutas SEO para /convert/[slug] y /compress/[format]

public/
  converter.worker.js   — Web Worker con OffscreenCanvas
```

## Patrón para nuevas herramientas de imagen
Las herramientas de imagen en `/tools/[name]/page.tsx` son client components (`'use client'`) que:
1. Usan drag-and-drop + file input para cargar la imagen
2. Procesan con Canvas API en el main thread (sin worker, son operaciones sencillas)
3. Muestran preview en `<canvas>` con CSS `max-w-full h-auto`
4. Ofrecen descarga en PNG/JPEG/WebP
5. No tienen límites de plan (herramientas auxiliares, no conversiones)

## Sistema de suscripción
- El email del usuario se guarda en `localStorage` con clave `pixvert_email`
- En cada carga, `SubscriptionProvider` llama a `/api/verify` con ese email
- `/api/verify` consulta Stripe y devuelve `{ pro: true/false }`
- Para activar en un nuevo dispositivo: ir a `/activate`, escribir el email usado al pagar

## Owner bypass
- Email: `ivanertelesp@gmail.com` — siempre devuelve Pro sin consultar Stripe
- Para activar: ir a `/activate`, escribir el email, pedir PIN, introducir PIN
- El PIN está en la variable de entorno `OWNER_PIN`

## Variables de entorno (Vercel)
| Variable | Descripción |
|----------|-------------|
| `STRIPE_SECRET_KEY` | Clave secreta Live de Stripe (`sk_live_...`) |
| `STRIPE_WEBHOOK_SECRET` | Secreto del webhook Live (`whsec_...`) |
| `STRIPE_PRO_MONTHLY_PRICE_ID` | Price ID Live del plan Pro |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clave pública Live (`pk_live_...`) |
| `NEXT_PUBLIC_STRIPE_PRO_PRICE_ID` | Price ID Live (mismo que el anterior) |
| `NEXT_PUBLIC_URL` | `https://pixvert-one.vercel.app` |
| `OWNER_EMAIL` | `ivanertelesp@gmail.com` |
| `OWNER_PIN` | PIN secreto para activar Pro como owner |

## Stripe (Live)
- Cuenta: cuenta principal (no el entorno de prueba "Pixvert Test")
- Producto: **Pixvert Pro** — `price_1TTSGuEAJyAiMT8jX3nrESgW`
- Webhook endpoint: `https://pixvert-one.vercel.app/api/webhook`
- Eventos escuchados: `checkout.session.completed`, `customer.subscription.deleted`, `customer.subscription.updated`

## Stripe (Test) — para desarrollo local
- Entorno: "Pixvert Test" dentro del dashboard de Stripe
- Price ID test: `price_1TSzdNEId0xsqxYXLbwfCpXd`
- Tarjeta de prueba: `4242 4242 4242 4242`, cualquier fecha futura, cualquier CVC
- En `.env.local` usar las claves `sk_test_...` / `pk_test_...`

## i18n
- 9 idiomas detectados automáticamente por `navigator.language` o localStorage
- Traducciones en `locales/` (en, es, fr, de, pt, it, ja, ko, zh)
- Para agregar texto nuevo: añadir la clave en todos los archivos de `locales/`

## SEO
- 33 rutas estáticas en `/convert/[slug]` generadas con `generateStaticParams`
- Slugs definidos en `lib/seo-conversions.ts`
- Cubre: PNG, JPG, WebP, AVIF, BMP, GIF, TIFF, ICO como destinos
- Para agregar nuevas rutas: añadir entrada en `SEO_CONVERSIONS` y benefit en `ConversionBenefits`

## Conversión de imágenes
- Web Worker (`public/converter.worker.js`) con `OffscreenCanvas` — fallback a main thread si no hay soporte
- **Formatos nativos** (vía canvas.toBlob): PNG, JPG, WebP, AVIF → usan worker pool
- **Formatos custom** (encoders propios en `lib/converter.ts`): BMP, GIF, TIFF, ICO → siempre en main thread
  - **BMP**: encoder puro JS (sin librería), 24bpp, alpha compuesto sobre blanco
  - **GIF**: usa `gif-encoder-2` (dynamic import), reduce a paleta de 256 colores
  - **TIFF**: encoder puro JS, TIFF sin compresión, RGB 8bpp
  - **ICO**: encoder puro JS, genera 16×16 + 32×32 + 48×48 px con PNG embebido
- AVIF: detectado en runtime con `isAvifSupported()` en `lib/formats.ts`
- Tipos para `gif-encoder-2` en `types/gif-encoder-2.d.ts`

## Límites free tier
- 10 conversiones/día en localStorage (`img_converter_daily: { count, date }`)
- Se resetea automáticamente al cambiar de día
- Los usuarios Pro no tienen límite (bypass completo)
