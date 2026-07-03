import type { Metadata } from 'next';
import QrGeneratorTool from './QrGeneratorTool';
import { type ToolSEOData } from '@/components/ToolSEOContent';
import LocalizedToolSEO from '@/components/LocalizedToolSEO';
import SchemaMarkup from '@/components/SchemaMarkup';
import { Locale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'QR Code Generator Free Online — Pixvert',
  description:
    'Generate QR codes for any URL, text, email, or phone number. Custom colors, sizes, and error correction. Download as PNG instantly.',
  openGraph: { title: 'QR Code Generator — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/qr-generator',
  },
};

const seoEn: ToolSEOData = {
  toolName: 'QR Code Generator',
  whatIsHeading: 'What is a QR code generator?',
  whatIsParagraphs: [
    "A QR code generator turns a piece of text — a URL, a Wi-Fi password, an email address, a phone number — into a scannable square barcode that any smartphone camera can read instantly. Pixvert's QR code generator creates these codes directly in your browser, with no data sent to a server and no account needed.",
    'Beyond the basic black-and-white square, this QR code generator lets you customize the foreground and background colors, adjust the size in pixels, and choose the error correction level, which determines how much of the code can be damaged or obscured while still scanning correctly. Higher error correction is useful if you plan to print the QR code small or add a logo on top.',
    'QR codes are used everywhere today: restaurant menus, product packaging, business cards, event tickets, and payment links. Generating one online for free means you can create as many as you need — for personal or commercial use — without paying for a subscription or dealing with usage limits.',
  ],
  howToHeading: 'How to generate a QR code',
  howToSteps: [
    { title: 'Enter your content', description: 'type or paste the URL, text, email, or phone number you want the QR code to link to' },
    { title: 'Customize the appearance', description: 'pick the foreground and background colors and set the size in pixels' },
    { title: 'Set the error correction level', description: 'choose higher correction if the code will be printed small or combined with a logo' },
    { title: 'Preview and download', description: 'the QR code updates live — download it as a PNG when it looks right' },
  ],
  useCasesHeading: 'When to use a QR code',
  useCases: [
    { title: 'Restaurant menus', description: 'Link a table tent or sticker to your digital menu instead of printing new paper menus every time prices change.' },
    { title: 'Business cards and flyers', description: 'Let people scan straight to your website, portfolio, or contact details instead of typing a URL.' },
    { title: 'Wi-Fi sharing', description: 'Generate a code guests can scan to join your Wi-Fi network without typing a password.' },
    { title: 'Event tickets and check-ins', description: 'Encode a unique link or ID for fast scanning at entrances.' },
    { title: 'Product packaging', description: 'Point customers to instructions, warranty registration, or your online store.' },
  ],
  whyHeading: 'Why use Pixvert to create QR codes?',
  whyReasons: [
    { title: '100% local generation', description: 'your content is encoded directly in your browser — nothing is sent to a server or logged' },
    { title: 'Custom colors and sizes', description: 'match your brand instead of using a generic black-and-white square' },
    { title: 'No signup, no limits', description: 'generate as many QR codes as you need, for free, without an account' },
    { title: 'Instant PNG download', description: 'get a ready-to-use image file for print or digital use in seconds' },
  ],
  faqs: [
    { question: 'Do these QR codes expire?', answer: 'No. Since the content is encoded directly into the code itself (not a redirect link Pixvert hosts), the QR code works for as long as the underlying content — like the URL — remains valid.' },
    { question: 'Can I use these QR codes commercially?', answer: 'Yes, there are no restrictions. You can use the generated QR codes on products, marketing materials, or any commercial project.' },
    { question: 'What is error correction level and which should I choose?', answer: 'Error correction lets a QR code still scan even if part of it is damaged or covered. Use a higher level if you plan to print small or add a logo on top; use a lower level for maximum data capacity.' },
    { question: 'Is my data safe when generating a QR code here?', answer: 'Yes. The QR code is generated entirely in your browser — the text or URL you enter is never sent to or stored on any server.' },
    { question: 'What can I encode in a QR code?', answer: 'URLs, plain text, email addresses, phone numbers, Wi-Fi credentials, and more — anything that fits within the QR code data capacity limits.' },
    { question: 'Why won\'t my QR code scan?', answer: 'This is usually caused by too little contrast between the foreground and background colors, or a size too small for the amount of data encoded. Try increasing the size or using higher-contrast colors.' },
  ],
  relatedTools: [
    { href: '/tools/password-generator', label: 'Password Generator', description: 'Generate strong, random passwords with Web Crypto API' },
    { href: '/tools/uuid-generator', label: 'UUID Generator', description: 'Generate unique identifiers (UUID v4)' },
    { href: '/tools/url-encoder', label: 'URL Encoder', description: 'Encode or decode URLs before putting them in a QR code' },
    { href: '/tools/image-to-base64', label: 'Image to Base64', description: 'Encode an image as a data URI' },
  ],
};

const seoEs: ToolSEOData = {
  toolName: 'Generador de Códigos QR',
  whatIsHeading: '¿Qué es un generador de códigos QR?',
  whatIsParagraphs: [
    'Un generador de códigos QR convierte un fragmento de texto — una URL, una contraseña de Wi-Fi, un email, un número de teléfono — en un código de barras cuadrado escaneable que cualquier cámara de móvil puede leer al instante. El generador de Pixvert crea estos códigos directamente en tu navegador, sin enviar datos a ningún servidor ni necesitar cuenta.',
    'Más allá del cuadrado blanco y negro básico, este generador te permite personalizar los colores de primer plano y fondo, ajustar el tamaño en píxeles y elegir el nivel de corrección de errores, que determina cuánto del código puede estar dañado u oculto y aun así escanearse correctamente. Una corrección más alta es útil si vas a imprimir el código pequeño o añadir un logo encima.',
    'Los códigos QR se usan por todas partes hoy: menús de restaurante, envases de productos, tarjetas de visita, entradas de eventos y enlaces de pago. Generar uno gratis online significa que puedes crear tantos como necesites — para uso personal o comercial — sin pagar una suscripción ni lidiar con límites de uso.',
  ],
  howToHeading: 'Cómo generar un código QR',
  howToSteps: [
    { title: 'Introduce tu contenido', description: 'escribe o pega la URL, texto, email o teléfono al que quieres que apunte el código QR' },
    { title: 'Personaliza la apariencia', description: 'elige los colores de primer plano y fondo y define el tamaño en píxeles' },
    { title: 'Define el nivel de corrección de errores', description: 'elige una corrección más alta si el código se imprimirá pequeño o se combinará con un logo' },
    { title: 'Previsualiza y descarga', description: 'el código QR se actualiza en vivo — descárgalo como PNG cuando se vea bien' },
  ],
  useCasesHeading: 'Cuándo usar un código QR',
  useCases: [
    { title: 'Menús de restaurante', description: 'Enlaza un atril de mesa o pegatina a tu menú digital en vez de imprimir nuevos menús cada vez que cambien los precios.' },
    { title: 'Tarjetas de visita y flyers', description: 'Deja que la gente escanee directo a tu web, portafolio o datos de contacto en vez de escribir una URL.' },
    { title: 'Compartir Wi-Fi', description: 'Genera un código que los invitados puedan escanear para unirse a tu red Wi-Fi sin escribir la contraseña.' },
    { title: 'Entradas y check-ins de eventos', description: 'Codifica un enlace o ID único para escaneo rápido en la entrada.' },
    { title: 'Envases de producto', description: 'Dirige a los clientes a instrucciones, registro de garantía o tu tienda online.' },
  ],
  whyHeading: '¿Por qué usar Pixvert para crear códigos QR?',
  whyReasons: [
    { title: 'Generación 100% local', description: 'tu contenido se codifica directamente en tu navegador — nada se envía a un servidor ni se registra' },
    { title: 'Colores y tamaños personalizados', description: 'combina con tu marca en vez de usar un cuadrado genérico en blanco y negro' },
    { title: 'Sin registro, sin límites', description: 'genera tantos códigos QR como necesites, gratis, sin cuenta' },
    { title: 'Descarga PNG instantánea', description: 'obtén un archivo de imagen listo para usar en impresión o digital en segundos' },
  ],
  faqs: [
    { question: '¿Estos códigos QR caducan?', answer: 'No. Como el contenido se codifica directamente en el propio código (no es un enlace de redirección alojado por Pixvert), el código QR funciona mientras el contenido subyacente — como la URL — siga siendo válido.' },
    { question: '¿Puedo usar estos códigos QR comercialmente?', answer: 'Sí, no hay restricciones. Puedes usar los códigos QR generados en productos, materiales de marketing o cualquier proyecto comercial.' },
    { question: '¿Qué es el nivel de corrección de errores y cuál debo elegir?', answer: 'La corrección de errores permite que un código QR siga escaneándose aunque parte de él esté dañado u oculto. Usa un nivel más alto si vas a imprimir pequeño o añadir un logo encima; usa uno más bajo para máxima capacidad de datos.' },
    { question: '¿Mis datos están seguros al generar un código QR aquí?', answer: 'Sí. El código QR se genera enteramente en tu navegador — el texto o URL que introduces nunca se envía ni se guarda en ningún servidor.' },
    { question: '¿Qué puedo codificar en un código QR?', answer: 'URLs, texto plano, direcciones de email, números de teléfono, credenciales Wi-Fi y más — cualquier cosa que quepa dentro de los límites de capacidad de datos del código QR.' },
    { question: '¿Por qué no escanea mi código QR?', answer: 'Esto suele deberse a poco contraste entre los colores de primer plano y fondo, o a un tamaño demasiado pequeño para la cantidad de datos codificados. Prueba a aumentar el tamaño o usar colores con más contraste.' },
  ],
  relatedTools: [
    { href: '/tools/password-generator', label: 'Generador de Contraseñas', description: 'Genera contraseñas fuertes y aleatorias con Web Crypto API' },
    { href: '/tools/uuid-generator', label: 'Generador de UUID', description: 'Genera identificadores únicos (UUID v4)' },
    { href: '/tools/url-encoder', label: 'Codificador de URL', description: 'Codifica o decodifica URLs antes de ponerlas en un código QR' },
    { href: '/tools/image-to-base64', label: 'Imagen a Base64', description: 'Codifica una imagen como data URI' },
  ],
};

const seoByLocale: Partial<Record<Locale, ToolSEOData>> = { en: seoEn, es: seoEs };

export default function QrGeneratorPage() {
  return (
    <>
      <QrGeneratorTool />
      <LocalizedToolSEO content={seoByLocale} />
      <SchemaMarkup
        name={seoEn.toolName}
        url="https://pixvert-one.vercel.app/tools/qr-generator"
        description={metadata.description as string}
        features={['Custom colors', 'Custom size', 'Error correction levels', 'Local generation', 'PNG download']}
        howToName={seoEn.howToHeading}
        howToSteps={seoEn.howToSteps}
        faqs={seoEn.faqs}
      />
    </>
  );
}
