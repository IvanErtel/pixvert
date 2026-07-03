import type { Metadata } from 'next';
import ColorPickerTool from './ColorPickerTool';
import { type ToolSEOData } from '@/components/ToolSEOContent';
import LocalizedToolSEO from '@/components/LocalizedToolSEO';
import SchemaMarkup from '@/components/SchemaMarkup';
import { Locale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Color Picker Online Free — HEX, RGB, HSL | Pixvert',
  description:
    'Pick any color and instantly get its HEX, RGB, and HSL values. Copy each format with one click. Free and private.',
  openGraph: { title: 'Color Picker — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/color-picker',
  },
};

const seoEn: ToolSEOData = {
  toolName: 'Color Picker',
  whatIsHeading: 'What is an online color picker?',
  whatIsParagraphs: [
    'An online color picker lets you select any color and instantly get its value in the formats used across web development and design — HEX, RGB, and HSL. Pixvert\'s color picker also shows the WCAG contrast ratio against white and black, so you can check accessibility at the same time you choose a color.',
    'Instead of switching between a design tool and a code editor to convert color formats, this color picker gives you every value at once: the HEX code for CSS, the RGB values for JavaScript or canvas work, and HSL for when you need to adjust hue, saturation, or lightness independently. Each value has a one-click copy button.',
    'Choosing the right color is only half the job in web design — making sure it has enough contrast against its background is what makes text actually readable. Pixvert\'s color picker checks this automatically, flagging whether a color passes WCAG AA or AAA contrast standards.',
  ],
  howToHeading: 'How to pick and convert a color',
  howToSteps: [
    { title: 'Choose a color', description: 'use the visual picker, drag the sliders, or type a HEX code directly' },
    { title: 'View the converted values', description: 'HEX, RGB, and HSL update instantly and side by side' },
    { title: 'Check contrast', description: 'see the WCAG contrast ratio against white and black text' },
    { title: 'Copy the format you need', description: 'click any value to copy it to your clipboard' },
  ],
  useCasesHeading: 'When to use a color picker',
  useCases: [
    { title: 'Matching a brand color', description: 'Pick a color from a screenshot or logo and get its exact HEX code to use in CSS.' },
    { title: 'Checking text accessibility', description: 'Verify a color combination meets WCAG contrast requirements before shipping a design.' },
    { title: 'Converting between formats', description: 'Get the RGB or HSL equivalent of a HEX code found in a design file or style guide.' },
    { title: 'Building a color palette', description: 'Fine-tune a color\'s hue, saturation, and lightness using HSL sliders while designing a UI.' },
  ],
  whyHeading: 'Why use Pixvert\'s color picker?',
  whyReasons: [
    { title: 'All formats at once', description: 'HEX, RGB, and HSL shown together, no need for separate converters' },
    { title: 'Built-in accessibility check', description: 'WCAG AA/AAA contrast ratio calculated automatically' },
    { title: '100% local and private', description: 'nothing you pick or type is sent to a server' },
    { title: 'Free, no signup', description: 'use it as often as you need without an account' },
  ],
  faqs: [
    { question: 'What color formats does the tool support?', answer: 'HEX, RGB, and HSL are all shown at the same time for any color you select, each with a one-click copy button.' },
    { question: 'How is the contrast ratio calculated?', answer: 'The tool uses the WCAG 2.1 relative luminance formula to compute contrast ratio against white and black, then checks it against the AA (4.5:1) and AAA (7:1) thresholds for normal text.' },
    { question: 'Can I input a color instead of using the visual picker?', answer: 'Yes, you can type a HEX code directly or use the RGB/HSL sliders to set an exact value.' },
    { question: 'Is this color picker free to use?', answer: 'Yes, completely free with no usage limits or signup required.' },
    { question: 'Does the tool store the colors I pick?', answer: 'No, nothing is saved. All color selection and conversion happens locally in your browser session.' },
    { question: 'What is a good contrast ratio for body text?', answer: 'WCAG recommends at least 4.5:1 for normal text (AA) and 7:1 for enhanced accessibility (AAA). Larger text has a lower minimum of 3:1.' },
  ],
  relatedTools: [
    { href: '/tools/color-converter', label: 'Color Converter', description: 'Convert directly between HEX, RGB, and HSL values' },
    { href: '/tools/contrast-checker', label: 'Contrast Checker', description: 'Check WCAG contrast ratio between two custom colors' },
    { href: '/tools/color-palette', label: 'Color Palette Generator', description: 'Generate harmonic color palettes from a base color' },
    { href: '/tools/gradient-generator', label: 'Gradient Generator', description: 'Create CSS gradients from two or more colors' },
  ],
};

const seoEs: ToolSEOData = {
  toolName: 'Selector de Color',
  whatIsHeading: '¿Qué es un selector de color online?',
  whatIsParagraphs: [
    'Un selector de color online te permite elegir cualquier color y obtener al instante su valor en los formatos usados en desarrollo y diseño web — HEX, RGB y HSL. El selector de Pixvert también muestra el ratio de contraste WCAG contra blanco y negro, así puedes comprobar la accesibilidad al mismo tiempo que eliges un color.',
    'En vez de cambiar entre una herramienta de diseño y un editor de código para convertir formatos de color, este selector te da todos los valores a la vez: el código HEX para CSS, los valores RGB para JavaScript o trabajo con canvas, y HSL para cuando necesitas ajustar tono, saturación o luminosidad de forma independiente. Cada valor tiene un botón de copiar con un clic.',
    'Elegir el color correcto es solo la mitad del trabajo en diseño web — asegurarte de que tiene suficiente contraste contra su fondo es lo que hace que el texto sea realmente legible. El selector de Pixvert comprueba esto automáticamente, indicando si un color cumple los estándares de contraste WCAG AA o AAA.',
  ],
  howToHeading: 'Cómo elegir y convertir un color',
  howToSteps: [
    { title: 'Elige un color', description: 'usa el selector visual, arrastra los deslizadores o escribe un código HEX directamente' },
    { title: 'Ve los valores convertidos', description: 'HEX, RGB y HSL se actualizan al instante uno junto al otro' },
    { title: 'Comprueba el contraste', description: 've el ratio de contraste WCAG contra texto blanco y negro' },
    { title: 'Copia el formato que necesites', description: 'haz clic en cualquier valor para copiarlo a tu portapapeles' },
  ],
  useCasesHeading: 'Cuándo usar un selector de color',
  useCases: [
    { title: 'Igualar un color de marca', description: 'Elige un color de una captura de pantalla o logo y obtén su código HEX exacto para usar en CSS.' },
    { title: 'Comprobar accesibilidad de texto', description: 'Verifica que una combinación de colores cumple los requisitos de contraste WCAG antes de publicar un diseño.' },
    { title: 'Convertir entre formatos', description: 'Obtén el equivalente en RGB o HSL de un código HEX encontrado en un archivo de diseño o guía de estilo.' },
    { title: 'Construir una paleta de colores', description: 'Ajusta el tono, saturación y luminosidad de un color usando los deslizadores HSL al diseñar una interfaz.' },
  ],
  whyHeading: '¿Por qué usar el selector de color de Pixvert?',
  whyReasons: [
    { title: 'Todos los formatos a la vez', description: 'HEX, RGB y HSL mostrados juntos, sin necesidad de conversores separados' },
    { title: 'Comprobación de accesibilidad integrada', description: 'ratio de contraste WCAG AA/AAA calculado automáticamente' },
    { title: '100% local y privado', description: 'nada de lo que elijas o escribas se envía a un servidor' },
    { title: 'Gratis, sin registro', description: 'úsalo tan a menudo como necesites sin cuenta' },
  ],
  faqs: [
    { question: '¿Qué formatos de color admite la herramienta?', answer: 'HEX, RGB y HSL se muestran todos a la vez para cualquier color que elijas, cada uno con un botón de copiar con un clic.' },
    { question: '¿Cómo se calcula el ratio de contraste?', answer: 'La herramienta usa la fórmula de luminancia relativa de WCAG 2.1 para calcular el ratio de contraste contra blanco y negro, y luego lo compara con los umbrales AA (4.5:1) y AAA (7:1) para texto normal.' },
    { question: '¿Puedo introducir un color en vez de usar el selector visual?', answer: 'Sí, puedes escribir un código HEX directamente o usar los deslizadores RGB/HSL para definir un valor exacto.' },
    { question: '¿Este selector de color es gratis?', answer: 'Sí, completamente gratis sin límites de uso ni necesidad de registro.' },
    { question: '¿La herramienta guarda los colores que elijo?', answer: 'No, nada se guarda. Toda la selección y conversión de color ocurre localmente en tu sesión de navegador.' },
    { question: '¿Cuál es un buen ratio de contraste para el texto del cuerpo?', answer: 'WCAG recomienda al menos 4.5:1 para texto normal (AA) y 7:1 para accesibilidad mejorada (AAA). El texto más grande tiene un mínimo menor de 3:1.' },
  ],
  relatedTools: [
    { href: '/tools/color-converter', label: 'Conversor de Color', description: 'Convierte directamente entre valores HEX, RGB y HSL' },
    { href: '/tools/contrast-checker', label: 'Verificador de Contraste', description: 'Comprueba el ratio de contraste WCAG entre dos colores personalizados' },
    { href: '/tools/color-palette', label: 'Generador de Paletas de Color', description: 'Genera paletas de color armónicas a partir de un color base' },
    { href: '/tools/gradient-generator', label: 'Generador de Gradientes', description: 'Crea gradientes CSS a partir de dos o más colores' },
  ],
};

const seoByLocale: Partial<Record<Locale, ToolSEOData>> = { en: seoEn, es: seoEs };

export default function ColorPickerPage() {
  return (
    <>
      <ColorPickerTool />
      <LocalizedToolSEO content={seoByLocale} />
      <SchemaMarkup
        name={seoEn.toolName}
        url="https://pixvert-one.vercel.app/tools/color-picker"
        description={metadata.description as string}
        features={['HEX, RGB, HSL conversion', 'WCAG contrast checker', 'One-click copy', 'Local processing']}
        howToName={seoEn.howToHeading}
        howToSteps={seoEn.howToSteps}
        faqs={seoEn.faqs}
      />
    </>
  );
}
