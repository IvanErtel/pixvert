import type { Metadata } from 'next';
import GradientGeneratorTool from './GradientGeneratorTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'CSS Gradient Generator Online Free — Pixvert',
  description:
    'Create CSS gradients visually. Linear, radial, and conic gradients. Copy the ready-to-use CSS code. Free and private.',
  openGraph: { title: 'CSS Gradient Generator — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/gradient-generator',
  },
};

const seo: ToolSEOData = {
  toolName: 'CSS Gradient Generator',
  whatIsHeading: 'What is a CSS gradient generator?',
  whatIsParagraphs: [
    'A CSS gradient generator lets you build a smooth color transition visually and get the exact CSS code needed to reproduce it, without hand-writing gradient syntax or guessing at angle and color-stop values. Pixvert\'s gradient generator supports linear, radial, and conic gradients, each with unlimited color stops.',
    'Writing CSS gradients by hand means juggling angle degrees, percentage-based color stop positions, and multiple color values in the right order — small mistakes are easy to make and hard to spot just by reading the code. This tool shows a live preview as you adjust colors, stops, and angle, so what you see is exactly what you\'ll get.',
    'Once the gradient looks right, the generator outputs ready-to-paste CSS using the standard `linear-gradient()`, `radial-gradient()`, or `conic-gradient()` functions, compatible with all modern browsers.',
  ],
  howToHeading: 'How to create a CSS gradient',
  howToSteps: [
    { title: 'Choose a gradient type', description: 'select linear, radial, or conic' },
    { title: 'Add and adjust color stops', description: 'pick colors and set their position along the gradient' },
    { title: 'Set the angle or shape', description: 'adjust the direction for linear gradients, or the shape and position for radial and conic' },
    { title: 'Preview live', description: 'see the gradient update in real time as you adjust it' },
    { title: 'Copy the CSS code', description: 'copy the ready-to-use CSS declaration with one click' },
  ],
  useCasesHeading: 'When to use a CSS gradient generator',
  useCases: [
    { title: 'Website backgrounds', description: 'Create a smooth, modern background gradient for a hero section or full page.' },
    { title: 'Buttons and UI accents', description: 'Add depth to buttons, cards, or badges with a subtle two-color gradient.' },
    { title: 'Overlays on images', description: 'Build a gradient overlay to improve text readability on top of a photo.' },
    { title: 'Charts and data visualization', description: 'Use a conic gradient to build a custom progress ring or pie-style indicator.' },
    { title: 'Prototyping design directions', description: 'Quickly try different color combinations and angles before finalizing a brand look.' },
  ],
  whyHeading: 'Why use Pixvert\'s gradient generator?',
  whyReasons: [
    { title: 'Three gradient types', description: 'linear, radial, and conic gradients all in one tool' },
    { title: 'Live visual preview', description: 'see exactly what the gradient looks like before copying any code' },
    { title: 'Ready-to-use CSS output', description: 'get valid, browser-compatible CSS you can paste directly' },
    { title: '100% private, free, no signup', description: 'build as many gradients as you want at no cost' },
  ],
  faqs: [
    { question: 'What\'s the difference between linear, radial, and conic gradients?', answer: 'Linear gradients transition along a straight line at a set angle. Radial gradients radiate outward from a center point. Conic gradients rotate colors around a center point like a color wheel.' },
    { question: 'Will the generated CSS work in all browsers?', answer: 'Linear and radial gradients are supported in all modern browsers. Conic gradients are supported in all current major browsers but may need a fallback for very old browser versions.' },
    { question: 'Can I use more than two colors in a gradient?', answer: 'Yes, add as many color stops as you need — the generator supports unlimited stops with custom positions for each.' },
    { question: 'Is my gradient data sent anywhere?', answer: 'No, the gradient is built and rendered entirely in your browser. Nothing is transmitted or stored.' },
    { question: 'Can I control the exact angle of a linear gradient?', answer: 'Yes, set a precise angle in degrees to control the direction of the color transition.' },
    { question: 'Does the tool support transparency in gradients?', answer: 'Yes, colors with alpha transparency (RGBA) can be used as color stops to create fade-to-transparent effects.' },
  ],
  relatedTools: [
    { href: '/tools/color-palette', label: 'Color Palette Generator', description: 'Generate harmonious colors to use in your gradient' },
    { href: '/tools/color-picker', label: 'Color Picker', description: 'Pick exact colors and get their HEX, RGB, HSL values' },
    { href: '/tools/css-minifier', label: 'CSS Minifier', description: 'Minify your CSS before deploying' },
    { href: '/tools/contrast-checker', label: 'Contrast Checker', description: 'Check text contrast against a gradient background color' },
  ],
};

export default function GradientGeneratorPage() {
  return (
    <>
      <GradientGeneratorTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/gradient-generator"
        description={metadata.description as string}
        features={['Linear, radial, conic gradients', 'Unlimited color stops', 'Live preview', 'Ready-to-use CSS output']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
