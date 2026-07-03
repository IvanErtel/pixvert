import type { Metadata } from 'next';
import ColorPickerTool from './ColorPickerTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Color Picker Online Free — HEX, RGB, HSL | Pixvert',
  description:
    'Pick any color and instantly get its HEX, RGB, and HSL values. Copy each format with one click. Free and private.',
  openGraph: { title: 'Color Picker — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/color-picker',
  },
};

const seo: ToolSEOData = {
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

export default function ColorPickerPage() {
  return (
    <>
      <ColorPickerTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/color-picker"
        description={metadata.description as string}
        features={['HEX, RGB, HSL conversion', 'WCAG contrast checker', 'One-click copy', 'Local processing']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
