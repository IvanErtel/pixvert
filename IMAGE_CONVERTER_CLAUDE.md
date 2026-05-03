# CLAUDE.md — Image Converter Web App

## Visión General del Proyecto

Web app de conversión de imágenes entre formatos (PNG, JPG, WebP, AVIF, BMP, TIFF, GIF, ICO, SVG). Todo el procesamiento se hace 100% en el navegador del usuario usando Canvas API y WebAssembly — NO se sube nada a ningún servidor. Esto es nuestro diferenciador principal: privacidad total y velocidad instantánea.

**Nombre del proyecto:** (POR DEFINIR)
**Tipo:** Web app (SPA)
**Stack:** Next.js 14+ (App Router) + TypeScript + Tailwind CSS
**Procesamiento:** 100% client-side (Canvas API + Web Workers para no bloquear UI)
**Hosting:** Vercel (free tier para empezar, escala automáticamente)
**Pagos:** Stripe Checkout + Stripe Customer Portal
**Auth:** Stripe Customer Portal (sin login tradicional — el email de pago ES el identificador)
**Idiomas:** Multi-idioma desde el inicio (EN, ES, FR, DE, PT, IT, JA, KO, ZH) — es poco texto
**Dominio:** Comprar un .com corto y descriptivo

---

## Modelo de Negocio y Límites

### Tier Gratuito (sin registro):
- 10 conversiones por día (tracking por localStorage + fingerprint del navegador)
- Tamaño máximo por archivo: 5 MB
- Máximo 3 archivos simultáneos por lote
- Marca de agua NO (la conversión es local, no tiene sentido)
- Ads: banner discreto de AdSense en la parte inferior + un interstitial nativo (no invasivo) cada 5 conversiones
- Calidad de conversión: igual que premium (no degradar calidad — el procesamiento es local, no tiene coste)

### Plan Pro — $4.99/mes (o $39.99/año — ahorro del 33%):
- Conversiones ilimitadas
- Tamaño máximo por archivo: 50 MB
- Archivos simultáneos ilimitados por lote
- Sin publicidad
- Soporte de formatos adicionales: AVIF, TIFF, ICO, SVG
- Control avanzado de calidad (slider de compresión 1-100%)
- Redimensionar al convertir (ancho/alto personalizado, mantener ratio)
- Renombrado automático en lote (prefijo, sufijo, numeración)
- Badge "Pro" en la interfaz

### Plan Business — $9.99/mes (o $79.99/año):
- Todo lo de Pro
- API key para integración programática (REST API simple)
- 10,000 conversiones/mes via API
- Soporte prioritario por email
- Sin branding en archivos descargados (para agencias)

### Notas sobre los límites:
- Los límites del tier gratuito se aplican por combinación de localStorage + browser fingerprint (canvas fingerprint + user agent + timezone + screen resolution). No es infalible pero cubre el 95% de los casos. Si alguien borra localStorage, resetea su contador — aceptable.
- Los planes de pago se verifican con un token de Stripe guardado en localStorage después del checkout. Al cargar la app, se valida contra Stripe API (server-side en una API route de Next.js) si la suscripción sigue activa.
- Para el owner (nosotros): un email hardcodeado en el backend que siempre retorna "unlimited" sin pasar por Stripe.

---

## Arquitectura Técnica

```
proyecto/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing + converter principal
│   ├── pricing/page.tsx          # Página de precios
│   ├── api/
│   │   ├── checkout/route.ts     # Crear sesión de Stripe Checkout
│   │   ├── webhook/route.ts      # Webhook de Stripe (confirmación de pago)
│   │   ├── verify/route.ts       # Verificar suscripción activa por email
│   │   └── portal/route.ts       # Generar URL de Stripe Customer Portal
│   ├── success/page.tsx          # Página post-checkout exitoso
│   └── layout.tsx                # Layout con header, footer, i18n provider
├── components/
│   ├── Converter.tsx             # Componente principal del convertidor
│   ├── DropZone.tsx              # Drag & drop + file picker
│   ├── FileList.tsx              # Lista de archivos subidos con preview
│   ├── FormatSelector.tsx        # Selector de formato de salida
│   ├── QualitySlider.tsx         # Slider de calidad (Pro)
│   ├── ResizeOptions.tsx         # Opciones de redimensionado (Pro)
│   ├── ConversionProgress.tsx    # Barra de progreso por archivo
│   ├── DownloadButton.tsx        # Botón de descarga (individual o ZIP)
│   ├── PricingCards.tsx          # Cards de precios
│   ├── Header.tsx                # Navigation + lang selector
│   ├── Footer.tsx                # Links legales + copyright
│   ├── AdBanner.tsx              # Google AdSense banner (solo free tier)
│   └── ProBadge.tsx              # Badge visual para usuarios Pro
├── lib/
│   ├── converter.ts              # Lógica de conversión (Canvas API)
│   ├── worker.ts                 # Web Worker para conversión en background
│   ├── formats.ts                # Formatos soportados y sus MIME types
│   ├── limits.ts                 # Lógica de límites (free vs pro)
│   ├── fingerprint.ts            # Browser fingerprint para tracking de uso
│   ├── stripe.ts                 # Stripe SDK server-side helpers
│   ├── i18n.ts                   # Sistema de internacionalización
│   └── analytics.ts              # Tracking básico (page views, conversions)
├── locales/
│   ├── en.json                   # Inglés (default)
│   ├── es.json                   # Español
│   ├── fr.json                   # Francés
│   ├── de.json                   # Alemán
│   ├── pt.json                   # Portugués
│   ├── it.json                   # Italiano
│   ├── ja.json                   # Japonés
│   ├── ko.json                   # Coreano
│   └── zh.json                   # Chino simplificado
├── public/
│   ├── og-image.png              # Open Graph image para compartir
│   └── favicon.ico
├── .env.local                    # Variables de entorno (Stripe keys)
└── next.config.js
```

---

## Lógica de Conversión (Client-Side)

La conversión usa Canvas API del navegador. El flujo es:

```typescript
// Pseudocódigo simplificado
async function convertImage(file: File, targetFormat: string, quality: number): Promise<Blob> {
  // 1. Crear Image element y cargar el archivo
  const img = new Image();
  img.src = URL.createObjectURL(file);
  await img.decode();

  // 2. Crear Canvas con las dimensiones de la imagen (o redimensionadas)
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth || img.naturalWidth;
  canvas.height = targetHeight || img.naturalHeight;

  // 3. Dibujar imagen en el canvas
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // 4. Exportar al formato deseado
  const mimeType = getMimeType(targetFormat); // 'image/webp', 'image/png', 'image/jpeg', etc.
  const blob = await new Promise<Blob>((resolve) => {
    canvas.toBlob(resolve, mimeType, quality / 100);
  });

  // 5. Limpiar
  URL.revokeObjectURL(img.src);

  return blob;
}
```

### Formatos soportados por Canvas API nativo:
- **Input (lectura):** PNG, JPG/JPEG, GIF, BMP, WebP, AVIF (en navegadores modernos), SVG, ICO
- **Output (exportación):** PNG, JPG/JPEG, WebP (Chrome/Edge/Firefox), AVIF (Chrome 94+)

### Formatos que necesitan librería extra:
- **TIFF:** Usar librería `utif.js` (client-side, MIT license)
- **ICO output:** Usar librería `ico-endec` o construir manualmente el formato ICO
- **SVG output:** No es conversión raster→vector (aclarar en UI que SVG solo funciona como input)

### Web Workers:
Para lotes grandes, la conversión debe hacerse en un Web Worker para no congelar la UI:

```typescript
// worker.ts
self.onmessage = async (e) => {
  const { fileData, targetFormat, quality, index } = e.data;
  // ... conversión ...
  self.postMessage({ blob, index, originalName });
};
```

El componente principal crea un Worker pool (2-4 workers según navigator.hardwareConcurrency) y distribuye los archivos entre ellos.

---

## Stripe Integration

### Checkout Flow:
1. Usuario click "Upgrade to Pro" → llama a `/api/checkout`
2. `/api/checkout` crea una Stripe Checkout Session con el price_id correspondiente
3. Usuario completa pago en Stripe hosted page
4. Stripe redirige a `/success?session_id=xxx`
5. `/success` page valida la session y guarda el email + subscription status en localStorage
6. Stripe envía webhook a `/api/webhook` para confirmaciones asíncronas

### Verificación de suscripción:
1. Al cargar la app, si hay email en localStorage, llama a `/api/verify` con ese email
2. `/api/verify` busca el customer en Stripe por email y verifica subscription status
3. Si está activa → responde con { pro: true, plan: 'pro' | 'business' }
4. Si no → responde con { pro: false } y limpia localStorage

### Variables de entorno necesarias:
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_MONTHLY_PRICE_ID=price_...
STRIPE_PRO_YEARLY_PRICE_ID=price_...
STRIPE_BUSINESS_MONTHLY_PRICE_ID=price_...
STRIPE_BUSINESS_YEARLY_PRICE_ID=price_...
OWNER_EMAIL=tu@email.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### Stripe Products a crear en Dashboard:
1. **Pro Monthly** — $4.99/mes, recurring
2. **Pro Yearly** — $39.99/año, recurring
3. **Business Monthly** — $9.99/mes, recurring
4. **Business Yearly** — $79.99/año, recurring

---

## Diseño UI/UX

### Principios:
- Ultra-minimalista. Fondo blanco/claro con acentos de color.
- La zona de drop es el protagonista absoluto de la página.
- Máximo 2 clicks para convertir: drop file → click "Convert"
- Mobile-first pero optimizada para desktop (donde más se usa)
- Dark mode toggle

### Layout de la página principal:

```
┌─────────────────────────────────────────────┐
│  Logo    [Pricing]  [Lang 🌐]  [Pro Badge]  │  ← Header minimal
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │                                     │    │
│  │     📁 Drop images here             │    │  ← DropZone grande,
│  │     or click to browse              │    │     borde dashed,
│  │                                     │    │     acepta múltiples
│  │     PNG, JPG, WebP, GIF, BMP...     │    │
│  │                                     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  Convert to: [PNG ▼] [JPG ▼] [WebP ▼]...   │  ← Format selector
│                                             │
│  Quality: ████████░░ 80%  (Pro)             │  ← Slider (Pro only)
│  Resize: [ ] Maintain ratio  W:[  ] H:[  ]  │  ← Resize (Pro only)
│                                             │
│  ┌──────────────────────────────────────┐   │
│  │ photo1.png  →  photo1.webp   ✅ 340KB │   │  ← File list con
│  │ photo2.jpg  →  photo2.webp   ⏳ ...   │   │     progreso y tamaño
│  │ photo3.bmp  →  photo3.webp   ⏳ ...   │   │
│  └──────────────────────────────────────┘   │
│                                             │
│       [ ⬇ Download All (ZIP) ]              │  ← Botón principal
│                                             │
│  Free: 7/10 conversions today               │  ← Contador (free)
│  [🚀 Upgrade to Pro — Unlimited]            │  ← CTA upgrade
│                                             │
├─────────────────────────────────────────────┤
│  [Ad Banner — solo free tier]               │
├─────────────────────────────────────────────┤
│  Footer: Privacy · Terms · Contact          │
└─────────────────────────────────────────────┘
```

### Colores:
- Primario: #6366F1 (indigo vibrante)
- Secundario: #8B5CF6 (violeta)
- Success: #10B981 (verde esmeralda)
- Background: #FAFAFA (light) / #0F172A (dark)
- DropZone border: dashed #CBD5E1 (light) / #334155 (dark)
- DropZone hover: background #EEF2FF con border #6366F1

### Animaciones:
- DropZone: scale sutil al hover, cambio de color de borde, icono de archivo se anima
- Conversión: progress bar animada por archivo, checkmark bounce al completar
- Download: botón con pulse sutil cuando todo está listo
- Drag over: la dropzone se ilumina con un glow del color primario

---

## Internacionalización (i18n)

Usar un sistema simple basado en JSON + React Context. El idioma se detecta automáticamente del navegador (navigator.language) y se puede cambiar manualmente con un selector en el header. Se guarda la preferencia en localStorage.

Estructura de cada locale:
```json
{
  "hero_title": "Convert Images Instantly",
  "hero_subtitle": "Free, fast, and private. Your files never leave your device.",
  "drop_text": "Drop images here or click to browse",
  "drop_formats": "PNG, JPG, WebP, AVIF, GIF, BMP, TIFF, ICO",
  "convert_to": "Convert to",
  "quality": "Quality",
  "resize": "Resize",
  "maintain_ratio": "Maintain aspect ratio",
  "width": "Width",
  "height": "Height",
  "download_all": "Download All (ZIP)",
  "download": "Download",
  "converting": "Converting...",
  "completed": "Completed",
  "free_counter": "{remaining} of {total} free conversions today",
  "upgrade_cta": "Upgrade to Pro — Unlimited conversions",
  "pricing_title": "Simple, transparent pricing",
  "pricing_subtitle": "No hidden fees. Cancel anytime.",
  "free_plan": "Free",
  "pro_plan": "Pro",
  "business_plan": "Business",
  "per_month": "/month",
  "per_year": "/year",
  "save_percent": "Save {percent}%",
  "subscribe": "Subscribe",
  "current_plan": "Current Plan",
  "manage_subscription": "Manage Subscription",
  "privacy_note": "Your files are processed locally in your browser. Nothing is uploaded to any server.",
  "footer_privacy": "Privacy Policy",
  "footer_terms": "Terms of Service",
  "footer_contact": "Contact"
}
```

El público principal es global y en inglés, pero como es tan poco texto, traducir a 8-9 idiomas es trivial y captura tráfico SEO en cada idioma.

---

## SEO

Cada idioma debe tener su propia URL para indexación:
- `/` → Inglés (default)
- `/es` → Español
- `/fr` → Francés
- etc.

Usar `<link rel="alternate" hreflang="x">` para indicar a Google las versiones en otros idiomas.

Meta tags específicos por formato para capturar búsquedas long-tail:
- "Convert PNG to WebP free online"
- "Convertir imagen PNG a JPG gratis"
- "PNG in WebP umwandeln kostenlos"

Crear páginas estáticas adicionales para SEO:
- `/convert/png-to-webp` — landing específica
- `/convert/jpg-to-png` — landing específica
- `/convert/heic-to-jpg` — landing específica
- etc.

Cada landing tiene el converter pre-configurado con el formato de entrada y salida de la URL.

---

## Hosting y Deployment

**Vercel** es la opción ideal:
- Free tier generoso (100GB bandwidth/mes, serverless functions incluidas)
- Deploy automático desde GitHub
- Edge network global (rápido desde cualquier país)
- Soporte nativo de Next.js
- SSL incluido
- Custom domain fácil

Las API routes de Next.js (/api/checkout, /api/webhook, /api/verify) corren como serverless functions en Vercel. Son ligeras — solo hacen llamadas a Stripe API, no procesan archivos.

El procesamiento de imágenes es 100% client-side, así que Vercel no tiene carga — solo sirve HTML/JS estático + las 3-4 API routes para Stripe.

---

## Seguridad

- **Archivos:** Nunca salen del navegador del usuario. Cero responsabilidad de datos.
- **Stripe:** Toda la info de pago la maneja Stripe. No almacenamos tarjetas ni datos financieros.
- **Webhook:** Verificar firma del webhook de Stripe para evitar spoofing.
- **API route /verify:** Rate limiting (max 10 requests/minuto por IP) para evitar abuso.
- **CORS:** Las API routes solo aceptan requests del dominio propio.
- **Content Security Policy:** Headers estrictos para prevenir XSS.
- **No hay base de datos:** No almacenamos nada más allá de lo que Stripe guarda (email, suscripción). Esto simplifica enormemente la seguridad y el GDPR.

---

## Roadmap

### Fase 1 — MVP (1-2 semanas)
- [ ] Setup Next.js + Tailwind + TypeScript
- [ ] DropZone con drag & drop + file picker
- [ ] Conversión básica: PNG ↔ JPG ↔ WebP (Canvas API)
- [ ] Lista de archivos con progreso y preview
- [ ] Descarga individual + descarga ZIP (usar JSZip)
- [ ] Selector de formato de salida
- [ ] Límite de 10 conversiones/día (localStorage)
- [ ] Diseño responsive mobile-first
- [ ] Deploy en Vercel
- [ ] Dominio personalizado

### Fase 2 — Monetización (semana 2-3)
- [ ] Integrar Stripe Checkout (Pro monthly/yearly)
- [ ] API route para crear checkout session
- [ ] Webhook de Stripe para confirmar pago
- [ ] Verificación de suscripción al cargar la app
- [ ] Stripe Customer Portal para gestionar suscripción
- [ ] Página de pricing con cards
- [ ] Desbloquear features Pro: slider de calidad, resize, formatos extra
- [ ] Bypass de límites para owner (email hardcodeado)
- [ ] Google AdSense en free tier

### Fase 3 — Expansión (semana 3-4)
- [ ] Internacionalización (EN + ES + FR + DE + PT)
- [ ] Páginas SEO por conversión (/convert/png-to-webp, etc.)
- [ ] Web Workers para conversión en background
- [ ] Soporte AVIF, TIFF, ICO
- [ ] Dark mode
- [ ] Más idiomas (IT, JA, KO, ZH)

### Fase 4 — Growth (mes 2)
- [ ] Plan Business con API key
- [ ] Endpoint REST API simple para conversión programática
- [ ] Analytics (Plausible o Umami — privacy-friendly)
- [ ] Blog con artículos SEO ("How to convert PNG to WebP", etc.)
- [ ] Browser fingerprint para tracking más robusto del free tier
- [ ] PWA (installable, offline capable)

---

## Reglas de Desarrollo para Claude

1. **Next.js App Router** — usar app/ directory, no pages/
2. **TypeScript estricto** — no usar `any`, definir tipos para todo
3. **Tailwind CSS** — no CSS custom salvo casos excepcionales
4. **Componentes pequeños** — cada componente hace una cosa
5. **Client components** — marcar con 'use client' solo los que necesiten interactividad
6. **Server components** — las API routes y layouts deben ser server components
7. **No base de datos** — toda persistencia es localStorage (client) o Stripe (payments)
8. **No subir archivos a servidor** — toda conversión es client-side, SIEMPRE
9. **Performance** — lazy load componentes pesados, optimizar images, minimizar JS
10. **Accesibilidad** — labels, aria attributes, keyboard navigation, contrast ratios
11. **Mobile-first** — diseñar para 375px primero, escalar a desktop después
