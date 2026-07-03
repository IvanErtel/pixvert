import type { Metadata } from 'next';
import WordCounterTool from './WordCounterTool';
import { type ToolSEOData } from '@/components/ToolSEOContent';
import LocalizedToolSEO from '@/components/LocalizedToolSEO';
import SchemaMarkup from '@/components/SchemaMarkup';
import { Locale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Word Counter Online Free — Pixvert',
  description:
    'Count words, characters, sentences, paragraphs, and reading time in real time. Free, private, no upload.',
  openGraph: { title: 'Word Counter — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/word-counter',
  },
};

const seoEn: ToolSEOData = {
  toolName: 'Word Counter',
  whatIsHeading: 'What is a word counter?',
  whatIsParagraphs: [
    'A word counter is a tool that instantly tells you how many words, characters, sentences, and paragraphs are in a piece of text, along with an estimated reading time. Pixvert\'s word counter updates all of these numbers live as you type or paste text, so you always know exactly where you stand against a length requirement.',
    'This word counter is built for writers, students, and anyone working under a strict word or character limit — an essay with a maximum word count, a tweet or meta description with a character cap, or a cover letter that needs to fit on one page. Instead of manually counting or guessing, you get precise numbers updated in real time.',
    'Beyond the basic word count, the tool also breaks down character count with and without spaces, sentence count, paragraph count, and average reading time based on typical reading speed — useful context when writing blog posts, scripts, or speeches with a target duration.',
  ],
  howToHeading: 'How to count words in your text',
  howToSteps: [
    { title: 'Paste or type your text', description: 'drop your content directly into the text area' },
    { title: 'Read the live counts', description: 'word, character, sentence, and paragraph counts update automatically as you type' },
    { title: 'Check the estimated reading time', description: 'see roughly how long the text takes to read at an average pace' },
    { title: 'Edit until you hit your target', description: 'trim or expand your text while watching the counts update in real time' },
  ],
  useCasesHeading: 'When to use a word counter',
  useCases: [
    { title: 'Academic essays and assignments', description: 'Stay within a required word count range for school or university submissions.' },
    { title: 'SEO meta descriptions and titles', description: 'Keep page titles and descriptions within the character limits search engines display.' },
    { title: 'Social media posts', description: 'Check that a post fits within a platform\'s character limit before publishing.' },
    { title: 'Cover letters and resumes', description: 'Keep application documents concise and within recommended length guidelines.' },
    { title: 'Scripts and speeches', description: 'Estimate speaking time using the reading time estimate before rehearsing or recording.' },
  ],
  whyHeading: 'Why use Pixvert\'s word counter?',
  whyReasons: [
    { title: 'Real-time results', description: 'every count updates instantly as you type, no button to click' },
    { title: '100% private', description: 'your text is processed locally in your browser and never sent to a server' },
    { title: 'No signup or limits', description: 'count as much text as you want, for free' },
    { title: 'Multiple metrics at once', description: 'words, characters, sentences, paragraphs, and reading time in one place' },
  ],
  faqs: [
    { question: 'Is my text uploaded or stored anywhere?', answer: 'No. All counting happens locally in your browser as you type. Your text is never sent to a server or saved.' },
    { question: 'How is reading time calculated?', answer: 'Reading time is estimated using an average adult reading speed (around 200-250 words per minute) applied to your total word count.' },
    { question: 'Does the counter include spaces in character count?', answer: 'The tool shows both character count with spaces and without spaces, so you can check against either requirement.' },
    { question: 'What counts as a "word"?', answer: 'A word is any sequence of characters separated by whitespace. Punctuation attached to a word (like "don\'t" or "well-known") counts as one word.' },
    { question: 'Is there a text length limit?', answer: 'No hard limit is enforced, though extremely long text (hundreds of thousands of words) may slow down your browser depending on your device.' },
    { question: 'Can I use this for languages other than English?', answer: 'Yes, the counter works with any language using whitespace-separated words, though reading time estimates are calibrated for English reading speeds.' },
  ],
  relatedTools: [
    { href: '/tools/case-converter', label: 'Case Converter', description: 'Convert text between UPPER, lower, Title, and camelCase' },
    { href: '/tools/text-diff', label: 'Text Diff', description: 'Compare two texts and highlight the differences' },
    { href: '/tools/word-frequency', label: 'Word Frequency', description: 'See which words appear most often in your text' },
    { href: '/tools/lorem-ipsum', label: 'Lorem Ipsum Generator', description: 'Generate placeholder text for design mockups' },
  ],
};

const seoEs: ToolSEOData = {
  toolName: 'Contador de Palabras',
  whatIsHeading: '¿Qué es un contador de palabras?',
  whatIsParagraphs: [
    'Un contador de palabras es una herramienta que te dice al instante cuántas palabras, caracteres, frases y párrafos tiene un texto, junto con un tiempo de lectura estimado. El contador de Pixvert actualiza todos estos números en vivo mientras escribes o pegas texto, así que siempre sabes exactamente dónde estás respecto a un requisito de longitud.',
    'Este contador está pensado para escritores, estudiantes y cualquiera que trabaje bajo un límite estricto de palabras o caracteres — un ensayo con un máximo de palabras, un tweet o meta descripción con un límite de caracteres, o una carta de presentación que debe caber en una página. En vez de contar manualmente o adivinar, obtienes números precisos actualizados en tiempo real.',
    'Además del conteo básico de palabras, la herramienta también desglosa el conteo de caracteres con y sin espacios, el número de frases, párrafos y el tiempo de lectura medio según una velocidad de lectura típica — un contexto útil al escribir entradas de blog, guiones o discursos con una duración objetivo.',
  ],
  howToHeading: 'Cómo contar palabras en tu texto',
  howToSteps: [
    { title: 'Pega o escribe tu texto', description: 'coloca tu contenido directamente en el área de texto' },
    { title: 'Lee los conteos en vivo', description: 'el conteo de palabras, caracteres, frases y párrafos se actualiza automáticamente mientras escribes' },
    { title: 'Revisa el tiempo de lectura estimado', description: 've aproximadamente cuánto tarda en leerse el texto a un ritmo medio' },
    { title: 'Edita hasta llegar a tu objetivo', description: 'recorta o amplía tu texto mientras observas los conteos actualizarse en tiempo real' },
  ],
  useCasesHeading: 'Cuándo usar un contador de palabras',
  useCases: [
    { title: 'Ensayos y trabajos académicos', description: 'Mantente dentro del rango de palabras requerido para entregas escolares o universitarias.' },
    { title: 'Meta descripciones y títulos SEO', description: 'Mantén títulos y descripciones de página dentro de los límites de caracteres que muestran los buscadores.' },
    { title: 'Publicaciones en redes sociales', description: 'Comprueba que una publicación cabe dentro del límite de caracteres de una plataforma antes de publicar.' },
    { title: 'Cartas de presentación y currículums', description: 'Mantén los documentos de solicitud concisos y dentro de las pautas de longitud recomendadas.' },
    { title: 'Guiones y discursos', description: 'Estima el tiempo de habla usando la estimación de tiempo de lectura antes de ensayar o grabar.' },
  ],
  whyHeading: '¿Por qué usar el contador de palabras de Pixvert?',
  whyReasons: [
    { title: 'Resultados en tiempo real', description: 'cada conteo se actualiza al instante mientras escribes, sin botones que pulsar' },
    { title: '100% privado', description: 'tu texto se procesa localmente en tu navegador y nunca se envía a un servidor' },
    { title: 'Sin registro ni límites', description: 'cuenta todo el texto que quieras, gratis' },
    { title: 'Varias métricas a la vez', description: 'palabras, caracteres, frases, párrafos y tiempo de lectura en un solo lugar' },
  ],
  faqs: [
    { question: '¿Mi texto se sube o guarda en algún sitio?', answer: 'No. Todo el conteo ocurre localmente en tu navegador mientras escribes. Tu texto nunca se envía a un servidor ni se guarda.' },
    { question: '¿Cómo se calcula el tiempo de lectura?', answer: 'El tiempo de lectura se estima usando una velocidad de lectura media de un adulto (entre 200 y 250 palabras por minuto) aplicada al total de palabras de tu texto.' },
    { question: '¿El contador incluye los espacios en el conteo de caracteres?', answer: 'La herramienta muestra el conteo de caracteres con y sin espacios, así puedes comprobar cualquiera de los dos requisitos.' },
    { question: '¿Qué cuenta como "palabra"?', answer: 'Una palabra es cualquier secuencia de caracteres separada por espacios en blanco. La puntuación pegada a una palabra (como "no es" o "bien conocido") cuenta como una sola palabra.' },
    { question: '¿Hay un límite de longitud de texto?', answer: 'No se impone ningún límite estricto, aunque un texto extremadamente largo (cientos de miles de palabras) puede ralentizar tu navegador según tu dispositivo.' },
    { question: '¿Puedo usar esto para idiomas distintos del inglés?', answer: 'Sí, el contador funciona con cualquier idioma que use palabras separadas por espacios, aunque las estimaciones de tiempo de lectura están calibradas para velocidades de lectura en inglés.' },
  ],
  relatedTools: [
    { href: '/tools/case-converter', label: 'Conversor de Mayúsculas', description: 'Convierte texto entre MAYÚSCULAS, minúsculas, Título y camelCase' },
    { href: '/tools/text-diff', label: 'Comparador de Textos', description: 'Compara dos textos y resalta las diferencias' },
    { href: '/tools/word-frequency', label: 'Frecuencia de Palabras', description: 'Ve qué palabras aparecen más a menudo en tu texto' },
    { href: '/tools/lorem-ipsum', label: 'Generador de Lorem Ipsum', description: 'Genera texto de relleno para maquetas de diseño' },
  ],
};

const seoByLocale: Partial<Record<Locale, ToolSEOData>> = { en: seoEn, es: seoEs };

export default function WordCounterPage() {
  return (
    <>
      <WordCounterTool />
      <LocalizedToolSEO content={seoByLocale} />
      <SchemaMarkup
        name={seoEn.toolName}
        url="https://pixvert-one.vercel.app/tools/word-counter"
        description={metadata.description as string}
        features={['Real-time word count', 'Character count', 'Sentence and paragraph count', 'Reading time estimate', 'Local processing']}
        howToName={seoEn.howToHeading}
        howToSteps={seoEn.howToSteps}
        faqs={seoEn.faqs}
      />
    </>
  );
}
