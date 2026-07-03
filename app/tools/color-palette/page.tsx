import type { Metadata } from 'next';
import ColorPaletteTool from './ColorPaletteTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Color Palette Generator Online Free — Pixvert',
  description:
    'Generate harmonious color palettes from any base color. Complementary, triadic, analogous, split-complementary, and shades. Free and instant.',
  openGraph: { title: 'Color Palette Generator — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/color-palette',
  },
};

const seo: ToolSEOData = {
  toolName: 'Color Palette Generator',
  whatIsHeading: 'What is a color palette generator?',
  whatIsParagraphs: [
    'A color palette generator takes a single base color and produces a set of complementary colors that work well together, based on established color theory relationships. Pixvert\'s color palette generator supports complementary, triadic, analogous, split-complementary schemes, plus a set of lighter and darker shades of your base color.',
    'Picking colors that look good together by trial and error is slow and often inconsistent. Color theory gives predictable relationships — colors opposite each other on the wheel (complementary), evenly spaced colors (triadic), or neighboring colors (analogous) — and this tool computes those relationships instantly from any starting HEX color.',
    'Each generated palette includes ready-to-copy HEX codes, making it straightforward to move directly from choosing a palette to using it in a design tool, CSS file, or brand style guide.',
  ],
  howToHeading: 'How to generate a color palette',
  howToSteps: [
    { title: 'Pick a base color', description: 'choose or type the HEX code of your starting color' },
    { title: 'Select a harmony type', description: 'choose complementary, triadic, analogous, split-complementary, or shades' },
    { title: 'View the generated palette', description: 'see the resulting colors laid out with their HEX codes' },
    { title: 'Copy the colors you need', description: 'click any swatch to copy its HEX code' },
  ],
  useCasesHeading: 'When to use a color palette generator',
  useCases: [
    { title: 'Building a brand color scheme', description: 'Start from a primary brand color and generate a complementary set for accents and backgrounds.' },
    { title: 'Designing a UI', description: 'Generate a consistent set of colors for buttons, alerts, and highlights that all relate to your base color.' },
    { title: 'Creating chart color sets', description: 'Use an analogous or triadic scheme to pick distinguishable colors for a data visualization.' },
    { title: 'Exploring design directions', description: 'Try different harmony types on the same base color to compare visual moods before committing.' },
  ],
  whyHeading: 'Why use Pixvert\'s color palette generator?',
  whyReasons: [
    { title: 'Multiple harmony types', description: 'complementary, triadic, analogous, split-complementary, and shades in one tool' },
    { title: 'Instant HEX codes', description: 'every generated color comes with a ready-to-copy HEX value' },
    { title: '100% private', description: 'palettes are generated locally in your browser' },
    { title: 'Free, no signup', description: 'generate as many palettes as you need' },
  ],
  faqs: [
    { question: 'What is a complementary color scheme?', answer: 'Complementary colors sit directly opposite each other on the color wheel, creating high contrast — commonly used for calls to action that need to stand out.' },
    { question: 'What is the difference between analogous and triadic schemes?', answer: 'Analogous colors sit next to each other on the wheel, producing a harmonious, low-contrast look. Triadic colors are evenly spaced (120° apart), giving a vibrant but balanced palette.' },
    { question: 'Is my color data sent to a server?', answer: 'No, the palette is computed entirely in your browser from the base color you choose. Nothing is transmitted.' },
    { question: 'Can I generate lighter or darker versions of a color?', answer: 'Yes, the shades option generates a range of lighter and darker variations of your base color, useful for hover states and backgrounds.' },
    { question: 'How accurate are these color relationships?', answer: 'The tool uses standard HSL color wheel math to calculate hue relationships, matching the color theory used in design tools and textbooks.' },
    { question: 'Can I check contrast between the generated colors?', answer: 'Not directly on this page — use Pixvert\'s Contrast Checker to verify WCAG contrast between any two colors from your palette.' },
  ],
  relatedTools: [
    { href: '/tools/color-picker', label: 'Color Picker', description: 'Pick a color and get its HEX, RGB, and HSL values' },
    { href: '/tools/contrast-checker', label: 'Contrast Checker', description: 'Check WCAG contrast ratio between two colors' },
    { href: '/tools/gradient-generator', label: 'Gradient Generator', description: 'Create CSS gradients from your palette colors' },
    { href: '/tools/color-converter', label: 'Color Converter', description: 'Convert between HEX, RGB, and HSL' },
  ],
};

export default function ColorPalettePage() {
  return (
    <>
      <ColorPaletteTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/color-palette"
        description={metadata.description as string}
        features={['Complementary, triadic, analogous schemes', 'Split-complementary', 'Shades generation', 'Local processing']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
