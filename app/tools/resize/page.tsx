import type { Metadata } from 'next';
import Converter from '@/components/Converter';
import { type ToolSEOData } from '@/components/ToolSEOContent';
import LocalizedToolSEO from '@/components/LocalizedToolSEO';
import LocalizedHero, { type HeroContent } from '@/components/LocalizedHero';
import LocalizedFeatureGrid, { type FeatureCard } from '@/components/LocalizedFeatureGrid';
import SchemaMarkup from '@/components/SchemaMarkup';
import { Locale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Resize Image Online Free — Pixvert',
  description:
    'Resize images online for free. Set exact pixel dimensions, maintain aspect ratio, batch resize multiple files at once. 100% local — your files never leave your browser.',
  openGraph: {
    title: 'Resize Image Online Free — Pixvert',
    description:
      'Resize images to exact pixel dimensions. Batch process, maintain aspect ratio. Free and private — no upload required.',
    type: 'website',
  },
  alternates: {
    canonical: '/tools/resize',
  },
};

const heroByLocale: Partial<Record<Locale, HeroContent>> = {
  en: {
    title: 'Resize Images Online — Free',
    subtitle:
      'Set exact pixel dimensions, lock the aspect ratio, and batch resize multiple images at once. 100% local processing — your files never leave your device.',
    tags: ['Batch resize', 'Lock aspect ratio', 'Any format', 'No upload'],
  },
  es: {
    title: 'Redimensionar Imágenes Online — Gratis',
    subtitle:
      'Define dimensiones exactas en píxeles, bloquea la proporción y redimensiona varias imágenes a la vez. Procesamiento 100% local — tus archivos nunca salen de tu dispositivo.',
    tags: ['Redimensión por lotes', 'Bloquear proporción', 'Cualquier formato', 'Sin subida'],
  },
};

const featuresByLocale: Partial<Record<Locale, FeatureCard[]>> = {
  en: [
    { icon: '📐', title: 'Exact dimensions', description: 'Enter width and height in pixels. The converter scales precisely to your target size.' },
    { icon: '🔒', title: 'Aspect ratio lock', description: 'Enter one dimension and the other adjusts automatically to keep your image proportional.' },
    { icon: '⚡', title: 'Batch processing', description: 'Drop multiple images at once and resize them all together. Download as a ZIP file.' },
  ],
  es: [
    { icon: '📐', title: 'Dimensiones exactas', description: 'Introduce ancho y alto en píxeles. El conversor escala con precisión al tamaño que definas.' },
    { icon: '🔒', title: 'Bloqueo de proporción', description: 'Introduce una dimensión y la otra se ajusta automáticamente para mantener la proporción de tu imagen.' },
    { icon: '⚡', title: 'Procesamiento por lotes', description: 'Arrastra varias imágenes a la vez y redimensiónalas todas juntas. Descárgalas como archivo ZIP.' },
  ],
};

const seoEn: ToolSEOData = {
  toolName: 'Image Resizer',
  whatIsHeading: 'What is an image resizer?',
  whatIsParagraphs: [
    "An image resizer changes the pixel dimensions of a photo or graphic — making it wider, narrower, taller, or shorter — without cropping content out of the frame. Pixvert's image resizer lets you type an exact width and height in pixels, or lock the aspect ratio so one dimension scales automatically when you change the other.",
    'This tool is useful whenever an image needs to fit a specific size requirement: a product photo for an online store, a profile picture with fixed dimensions, or a banner that has to match a website layout exactly. Instead of guessing dimensions in a design program, you set the numbers directly and get a pixel-accurate result.',
    'The resizer works entirely with the Canvas API in your browser, which means it can scale one image or an entire batch at once. There is no server processing step, so resizing is nearly instant even for larger files, and the images never leave your device.',
  ],
  howToHeading: 'How to resize an image online',
  howToSteps: [
    { title: 'Upload your image or images', description: 'drag and drop files into the drop zone, or click to browse — batch resizing is supported' },
    { title: 'Enter the target width and height', description: 'type exact pixel values, or lock the aspect ratio so height adjusts automatically as you change width' },
    { title: 'Preview the result', description: 'check the resized dimensions before downloading' },
    { title: 'Download', description: 'save a single image directly, or download the whole batch as a ZIP file' },
  ],
  useCasesHeading: 'When to use an image resizer',
  useCases: [
    { title: 'E-commerce product photos', description: 'Marketplaces like Amazon, Etsy, or Shopify often require specific pixel dimensions for product images — resize a batch to match the requirement before uploading.' },
    { title: 'Social media and profile pictures', description: 'Avatars and cover photos on most platforms need exact square or rectangular dimensions to avoid awkward cropping.' },
    { title: 'Website performance', description: 'Serving an image at its display size instead of its original resolution reduces page weight and speeds up load times.' },
    { title: 'Email attachments', description: 'Shrink large photos to a reasonable size before attaching them to an email to avoid hitting attachment limits.' },
    { title: 'Print and design templates', description: 'Fit a photo into a template with predefined pixel dimensions, like a flyer, thumbnail, or banner ad.' },
  ],
  whyHeading: 'Why use Pixvert to resize images?',
  whyReasons: [
    { title: '100% local processing', description: 'resizing happens in your browser with the Canvas API — files are never uploaded to a server' },
    { title: 'Batch support', description: 'resize multiple images in one pass and download them together as a ZIP' },
    { title: 'No signup required', description: 'use the tool immediately, no account or email needed' },
    { title: 'Works with any common format', description: 'PNG, JPG, WebP, and more are all supported as input and output' },
  ],
  faqs: [
    { question: 'Does resizing reduce image quality?', answer: 'Making an image smaller rarely causes visible quality loss. Making it significantly larger than its original resolution can introduce blur, since the tool has to interpolate new pixels that were not in the source image.' },
    { question: 'Can I resize multiple images at once?', answer: 'Yes. Drop several files into the tool and set the target dimensions once — every image in the batch is resized the same way and can be downloaded together as a ZIP.' },
    { question: 'Will resizing change the aspect ratio and distort my image?', answer: 'Only if you set width and height independently without locking the ratio. Enable the aspect ratio lock to keep proportions correct and avoid stretching.' },
    { question: 'What is the maximum file size I can resize?', answer: 'There is no hard limit enforced by Pixvert, but very large files (above 20-30 MB) may be slow depending on your device, since processing happens locally in your browser.' },
    { question: 'Is my image uploaded anywhere?', answer: 'No. All resizing happens locally using the Canvas API. Your images are never sent to a server.' },
    { question: 'Can I use the resized images commercially?', answer: 'Yes, there are no restrictions on how you use the output. Pixvert only processes the pixels — it does not claim any rights over your images.' },
  ],
  relatedTools: [
    { href: '/compress/image', label: 'Image Compressor', description: 'Reduce file size after resizing your image' },
    { href: '/tools/rotate', label: 'Rotate Image', description: 'Rotate or flip images with the Canvas API' },
    { href: '/tools/watermark', label: 'Watermark Tool', description: 'Add a text watermark to your resized images' },
    { href: '/tools/crop', label: 'Crop Image', description: 'Cut out a specific area of your photo' },
    { href: '/convert/png-to-webp', label: 'PNG to WebP', description: 'Convert format after resizing for smaller files' },
    { href: '/tools/image-to-base64', label: 'Image to Base64', description: 'Encode your resized image as a data URI' },
  ],
};

const seoEs: ToolSEOData = {
  toolName: 'Redimensionador de Imágenes',
  whatIsHeading: '¿Qué es un redimensionador de imágenes?',
  whatIsParagraphs: [
    'Un redimensionador de imágenes cambia las dimensiones en píxeles de una foto o gráfico — haciéndola más ancha, más estrecha, más alta o más baja — sin recortar contenido del encuadre. El redimensionador de Pixvert te permite escribir un ancho y alto exactos en píxeles, o bloquear la proporción para que una dimensión se ajuste automáticamente cuando cambies la otra.',
    'Esta herramienta es útil siempre que una imagen necesite cumplir un requisito de tamaño específico: una foto de producto para una tienda online, una foto de perfil con dimensiones fijas, o un banner que debe encajar exactamente en el diseño de una web. En vez de adivinar dimensiones en un programa de diseño, defines los números directamente y obtienes un resultado exacto en píxeles.',
    'El redimensionador funciona enteramente con la Canvas API de tu navegador, lo que significa que puede escalar una imagen o un lote entero a la vez. No hay ningún paso de procesamiento en servidor, así que redimensionar es casi instantáneo incluso para archivos grandes, y las imágenes nunca salen de tu dispositivo.',
  ],
  howToHeading: 'Cómo redimensionar una imagen online',
  howToSteps: [
    { title: 'Sube tu imagen o imágenes', description: 'arrastra archivos a la zona de carga, o haz clic para explorar — se admite redimensión por lotes' },
    { title: 'Introduce el ancho y alto deseados', description: 'escribe valores exactos en píxeles, o bloquea la proporción para que el alto se ajuste automáticamente al cambiar el ancho' },
    { title: 'Previsualiza el resultado', description: 'comprueba las nuevas dimensiones antes de descargar' },
    { title: 'Descarga', description: 'guarda una sola imagen directamente, o descarga todo el lote como archivo ZIP' },
  ],
  useCasesHeading: 'Cuándo usar un redimensionador de imágenes',
  useCases: [
    { title: 'Fotos de producto para e-commerce', description: 'Marketplaces como Amazon, Etsy o Shopify suelen exigir dimensiones específicas en píxeles para las fotos de producto — redimensiona un lote entero antes de subirlas.' },
    { title: 'Redes sociales y fotos de perfil', description: 'Los avatares y fotos de portada en la mayoría de plataformas necesitan dimensiones cuadradas o rectangulares exactas para evitar recortes incómodos.' },
    { title: 'Rendimiento web', description: 'Servir una imagen en su tamaño de visualización en vez de su resolución original reduce el peso de la página y acelera la carga.' },
    { title: 'Archivos adjuntos de email', description: 'Reduce fotos grandes a un tamaño razonable antes de adjuntarlas a un email para evitar superar los límites de tamaño.' },
    { title: 'Plantillas de impresión y diseño', description: 'Encaja una foto en una plantilla con dimensiones predefinidas en píxeles, como un flyer, miniatura o banner publicitario.' },
  ],
  whyHeading: '¿Por qué usar Pixvert para redimensionar imágenes?',
  whyReasons: [
    { title: 'Procesamiento 100% local', description: 'el redimensionado ocurre en tu navegador con la Canvas API — los archivos nunca se suben a un servidor' },
    { title: 'Soporte por lotes', description: 'redimensiona varias imágenes de una vez y descárgalas juntas como ZIP' },
    { title: 'Sin necesidad de registro', description: 'usa la herramienta al instante, sin cuenta ni email' },
    { title: 'Compatible con cualquier formato común', description: 'PNG, JPG, WebP y más son compatibles tanto de entrada como de salida' },
  ],
  faqs: [
    { question: '¿Redimensionar reduce la calidad de la imagen?', answer: 'Hacer una imagen más pequeña rara vez causa pérdida de calidad visible. Hacerla mucho más grande que su resolución original puede introducir desenfoque, ya que la herramienta tiene que interpolar píxeles nuevos que no estaban en la imagen original.' },
    { question: '¿Puedo redimensionar varias imágenes a la vez?', answer: 'Sí. Suelta varios archivos en la herramienta y define las dimensiones objetivo una sola vez — todas las imágenes del lote se redimensionan igual y pueden descargarse juntas como ZIP.' },
    { question: '¿Redimensionar cambiará la proporción y distorsionará mi imagen?', answer: 'Solo si defines ancho y alto de forma independiente sin bloquear la proporción. Activa el bloqueo de proporción para mantener las proporciones correctas y evitar estiramientos.' },
    { question: '¿Cuál es el tamaño máximo de archivo que puedo redimensionar?', answer: 'Pixvert no impone un límite estricto, pero archivos muy grandes (más de 20-30 MB) pueden ir lentos según tu dispositivo, ya que el procesamiento ocurre localmente en tu navegador.' },
    { question: '¿Se sube mi imagen a algún lado?', answer: 'No. Todo el redimensionado ocurre localmente usando la Canvas API. Tus imágenes nunca se envían a un servidor.' },
    { question: '¿Puedo usar las imágenes redimensionadas comercialmente?', answer: 'Sí, no hay restricciones sobre cómo uses el resultado. Pixvert solo procesa los píxeles — no reclama ningún derecho sobre tus imágenes.' },
  ],
  relatedTools: [
    { href: '/compress/image', label: 'Compresor de Imágenes', description: 'Reduce el tamaño de archivo después de redimensionar tu imagen' },
    { href: '/tools/rotate', label: 'Rotar Imagen', description: 'Rota o voltea imágenes con la Canvas API' },
    { href: '/tools/watermark', label: 'Marca de Agua', description: 'Añade una marca de agua de texto a tus imágenes redimensionadas' },
    { href: '/tools/crop', label: 'Recortar Imagen', description: 'Recorta un área específica de tu foto' },
    { href: '/convert/png-to-webp', label: 'PNG a WebP', description: 'Convierte el formato tras redimensionar para archivos más ligeros' },
    { href: '/tools/image-to-base64', label: 'Imagen a Base64', description: 'Codifica tu imagen redimensionada como data URI' },
  ],
};

const seoByLocale: Partial<Record<Locale, ToolSEOData>> = { en: seoEn, es: seoEs };

export default function ResizePage() {
  return (
    <>
      <div className="max-w-3xl mx-auto w-full px-4 py-10">
        <LocalizedHero content={heroByLocale} />

        <Converter />

        <LocalizedFeatureGrid content={featuresByLocale} />
      </div>
      <LocalizedToolSEO content={seoByLocale} />
      <SchemaMarkup
        name={seoEn.toolName}
        url="https://pixvert-one.vercel.app/tools/resize"
        description={metadata.description as string}
        features={['Exact pixel resizing', 'Aspect ratio lock', 'Batch processing', 'Local browser processing', 'No signup required']}
        howToName={seoEn.howToHeading}
        howToSteps={seoEn.howToSteps}
        faqs={seoEn.faqs}
      />
    </>
  );
}
