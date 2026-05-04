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

## Archivos clave
```
app/
  page.tsx              — Home: HeroSection + Converter + ProSection
  pricing/page.tsx      — Planes Free vs Pro
  activate/page.tsx     — Activar Pro con email (+ PIN para owner)
  success/              — Página post-pago (activa Pro automáticamente)
  convert/[slug]/       — 18 páginas SEO estáticas
  api/
    checkout/route.ts   — Crea sesión Stripe Checkout
    verify/route.ts     — Verifica suscripción activa en Stripe
    activate/route.ts   — Activa Pro por email (con PIN para owner)
    portal/route.ts     — Crea sesión Customer Portal de Stripe
    webhook/route.ts    — Recibe eventos de Stripe

components/
  Converter.tsx         — Lógica principal de conversión
  DropZone.tsx          — Zona de arrastre (5MB free / 50MB Pro)
  Header.tsx            — Nav con badge Pro / link "¿Ya eres Pro?"
  ProSection.tsx        — Sección promocional en home (solo usuarios free)
  SubscriptionProvider.tsx — Context: lee email de localStorage, llama /api/verify

lib/
  formats.ts            — Tipos de formato, AVIF detection
  converter.ts          — Worker pool + fallback main thread
  limits.ts             — Control límite diario (localStorage)
  subscription.ts       — Context y hook useSubscription()
  i18n.ts               — 9 idiomas: en, es, fr, de, pt, it, ja, ko, zh
  stripe.ts             — Cliente Stripe singleton

public/
  converter.worker.js   — Web Worker con OffscreenCanvas
```

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
- 18 rutas estáticas en `/convert/[slug]` generadas con `generateStaticParams`
- Slugs: `png-to-webp`, `jpg-to-avif`, etc. — definidos en `lib/seo-conversions.ts`

## Conversión de imágenes
- Web Worker (`public/converter.worker.js`) con `OffscreenCanvas` — fallback a main thread si no hay soporte
- Formatos: PNG, JPG, WebP, AVIF
- AVIF: detectado en runtime con `isAvifSupported()` en `lib/formats.ts`

## Límites free tier
- 10 conversiones/día en localStorage (`img_converter_daily: { count, date }`)
- Se resetea automáticamente al cambiar de día
- Los usuarios Pro no tienen límite (bypass completo)
