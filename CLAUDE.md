@AGENTS.md

# Pixvert — Guía del proyecto

## Qué es
Suite de herramientas online gratuitas, todas client-side. Incluye conversión de imágenes con modelo freemium (Stripe). Sin backend de procesamiento, sin subida de archivos a servidor.

## Stack
- **Next.js 16** (App Router, TypeScript strict)
- **Tailwind CSS v4** — colores en `app/globals.css` vía `@theme inline`, NO hay `tailwind.config.js`
- **Stripe** — suscripciones mensuales, Checkout + Customer Portal + Webhooks
- **Vercel** — deploy en `https://pixvert-one.vercel.app`

## Dependencias clave (además de Next/React)
| Paquete | Uso |
|---------|-----|
| `gif-encoder-2` | Encoder GIF client-side |
| `heic2any` | Conversión HEIC → otros formatos |
| `jszip` | (disponible, no en uso activo) |
| `stripe` | SDK server-side para API routes |
| `qrcode` + `@types/qrcode` | Generador QR Code |
| `marked` | Markdown → HTML |
| `xlsx` | Excel → CSV (SheetJS) |
| `pdf-lib` | PDF Merger client-side |

## Planes
| Plan | Precio | Límites |
|------|--------|---------|
| Free | $0 | 10 conversiones/día, 5MB/archivo, PNG/JPG/WebP |
| Pro | $3.99/mes | Ilimitado, 50MB/archivo, todos los formatos (AVIF incluido) |

## Visión del producto — Estado actual
Pixvert es una suite de herramientas online gratuitas, todas client-side. Todas las fases están implementadas:
- **Fase 1** ✅ Image Tools (converter, resize, compress, rotate, base64, watermark, crop, remove-bg)
- **Fase 2** ✅ Text Tools (word counter, case converter, lorem ipsum, diff, URL encoder, base64 text, slug, accents, frequency, blank lines)
- **Fase 3** ✅ Color Tools (picker, converter, palette, gradient, contrast checker)
- **Fase 4** ✅ Developer Tools (JSON formatter, JSON↔CSV, CSS/JS minifier, HTML formatter, meta tags, .htaccess)
- **Fase 5** ✅ Calculators (mortgage, VAT Spain, salary Spain, %, BMI, age, date diff, units, tip)
- **Fase 6** ✅ Generators (QR, password, UUID, random, email signature, privacy policy, robots.txt)
- **Fase 7** ✅ File Tools (PDF merge, markdown→HTML, Excel→CSV)

## Herramientas — rutas completas
```
/                           — Conversor principal (Home)
/tools                      — Hub de todas las herramientas

Image Tools
  /tools/resize             — Redimensionar imágenes
  /tools/rotate             — Rotar/voltear (Canvas API)
  /tools/image-to-base64    — Imagen ↔ Base64 data URI
  /tools/watermark          — Marca de agua de texto
  /tools/crop               — Recortar (ComingSoon)
  /tools/remove-background  — Quitar fondo (ComingSoon)
  /compress/image           — Compresor de imágenes

Text Tools
  /tools/word-counter       — Contadores en tiempo real
  /tools/case-converter     — UPPER/lower/Title/camel/snake
  /tools/lorem-ipsum        — Generador de texto de relleno
  /tools/text-diff          — Comparar dos textos
  /tools/url-encoder        — Encode/decode URL
  /tools/base64-text        — Texto ↔ Base64
  /tools/text-to-slug       — Texto → slug URL
  /tools/remove-accents     — Eliminar acentos/diacríticos
  /tools/word-frequency     — Frecuencia de palabras
  /tools/remove-blank-lines — Eliminar líneas vacías

Color Tools
  /tools/color-picker       — Selector HEX/RGB/HSL + WCAG
  /tools/color-converter    — HEX ↔ RGB ↔ HSL
  /tools/color-palette      — Paletas armónicas
  /tools/gradient-generator — Gradientes CSS
  /tools/contrast-checker   — Ratio WCAG AA/AAA

Developer Tools
  /tools/json-formatter     — Formatear/minificar/validar JSON
  /tools/json-csv           — JSON ↔ CSV
  /tools/css-minifier       — Minificar CSS
  /tools/js-minifier        — Minificar JavaScript
  /tools/html-formatter     — Formatear HTML
  /tools/meta-tags          — Generar meta tags SEO/OG/Twitter
  /tools/htaccess-generator — Generar .htaccess Apache

Calculators
  /tools/mortgage-calculator   — Hipoteca mensual
  /tools/vat-calculator        — IVA España (21/10/4%)
  /tools/salary-calculator     — Bruto → neto IRPF España
  /tools/percentage-calculator — Calculadora de porcentajes
  /tools/bmi-calculator        — Índice de masa corporal
  /tools/age-calculator        — Edad exacta + countdown cumpleaños
  /tools/date-difference       — Días entre fechas
  /tools/unit-converter        — Peso, longitud, temperatura, volumen
  /tools/tip-calculator        — Propinas + dividir cuenta

Generators
  /tools/qr-generator       — QR Code (qrcode, canvas, colores custom)
  /tools/password-generator — Contraseñas (Web Crypto API)
  /tools/uuid-generator     — UUID v4 (crypto.randomUUID)
  /tools/random-numbers     — Números aleatorios (int/float, bulk, únicos)
  /tools/email-signature    — Firma HTML para email (3 templates)
  /tools/privacy-policy     — Política de privacidad (GDPR, cookies...)
  /tools/robots-txt         — robots.txt (presets, bloqueo AI bots)

File Tools
  /tools/pdf-merge          — Unir PDFs (pdf-lib, reordenar, 100% local)
  /tools/markdown-to-html   — Markdown → HTML (marked, live preview)
  /tools/excel-to-csv       — Excel → CSV (xlsx/SheetJS, multi-sheet)

SEO pages
  /convert/[slug]           — 89 rutas de conversión entre formatos
  /compress/[format]        — 9 rutas de compresión por formato
```

## Archivos clave
```
app/
  page.tsx              — Home: HeroSection + Converter + ProSection
  pricing/page.tsx      — Planes Free vs Pro
  activate/page.tsx     — Activar Pro con email (+ PIN para owner)
  success/              — Página post-pago (activa Pro automáticamente)
  convert/[slug]/       — Páginas SEO estáticas de conversión
  compress/[format]/    — Páginas SEO de compresión por formato
  sitemap.ts            — Sitemap completo (135 rutas estáticas)
  tools/
    page.tsx            — Hub de todas las herramientas por categoría
    [nombre]/
      page.tsx          — Metadata SEO + import del Tool component
      [Nombre]Tool.tsx  — Componente client-side ('use client')
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

## Patrón para herramientas (todas las fases)
Cada herramienta sigue el mismo patrón en `app/tools/[nombre]/`:
- `page.tsx` — Server component con `export const metadata` (SEO) + import del Tool
- `[Nombre]Tool.tsx` — Client component (`'use client'`) con toda la lógica UI
- Las herramientas usan dynamic import para librerías pesadas (pdf-lib, xlsx, marked, qrcode) para no penalizar el bundle inicial
- No tienen límites de plan (solo el conversor principal los tiene)

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
- 89 rutas en `/convert/[slug]` generadas con `generateStaticParams` (definidas en `lib/seo-conversions.ts`)
- 9 rutas en `/compress/[format]` (también en `lib/seo-conversions.ts`)
- 47 rutas `/tools/[nombre]` — cada una con `export const metadata` propio
- Sitemap completo en `app/sitemap.ts` — 135 páginas estáticas totales
- Para agregar nuevas rutas de conversión: añadir entrada en `SEO_CONVERSIONS` en `lib/seo-conversions.ts`

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
