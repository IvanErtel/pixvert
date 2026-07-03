import type { Metadata } from 'next';
import PasswordGeneratorTool from './PasswordGeneratorTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Password Generator Free Online — Strong & Secure | Pixvert',
  description:
    'Generate strong, secure passwords with custom length and character sets. Uses cryptographic randomness. Bulk generation, strength indicator.',
  openGraph: { title: 'Password Generator — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/password-generator',
  },
};

const seo: ToolSEOData = {
  toolName: 'Password Generator',
  whatIsHeading: 'What is a password generator?',
  whatIsParagraphs: [
    "A password generator creates random, unpredictable passwords that are far harder to guess or crack than anything a human would come up with — including passwords built from real words, birthdates, or predictable substitutions like \"P@ssw0rd\". Pixvert's password generator uses the Web Crypto API, the same cryptographically secure randomness browsers rely on for encryption, instead of a weaker pseudo-random function.",
    'You control the length and which character sets are included — lowercase, uppercase, numbers, and symbols — so you can match the requirements of any login form, from a simple 8-character minimum to a 64-character passphrase for a password manager. A live strength indicator shows how resistant the result is to brute-force attacks.',
    'Reusing or reusing variations of the same password across sites is one of the most common causes of account breaches: once one service leaks a password, attackers try it everywhere else. Generating a unique, random password per account — ideally stored in a password manager — removes that risk entirely.',
  ],
  howToHeading: 'How to generate a strong password',
  howToSteps: [
    { title: 'Set the length', description: 'longer passwords are exponentially harder to crack — 16+ characters is a solid default' },
    { title: 'Choose character sets', description: 'toggle lowercase, uppercase, numbers, and symbols depending on what the target login accepts' },
    { title: 'Check the strength indicator', description: 'confirm the result falls in the strong or very strong range' },
    { title: 'Generate in bulk if needed', description: 'create multiple passwords at once when setting up several accounts' },
    { title: 'Copy and store it', description: 'copy the password with one click and save it in a password manager rather than memorizing it' },
  ],
  useCasesHeading: 'When to use a password generator',
  useCases: [
    { title: 'New account signups', description: 'Generate a unique password every time you create an account instead of reusing an old one.' },
    { title: 'Password manager master password', description: 'Create a long, high-entropy passphrase for the one password you do need to remember.' },
    { title: 'Shared team credentials', description: 'Generate strong temporary passwords for shared logins, Wi-Fi networks, or admin accounts.' },
    { title: 'Post-breach password resets', description: 'Quickly generate new passwords for every account affected after a service reports a data breach.' },
    { title: 'API keys and secrets', description: 'Use as a quick source of random characters for tokens, secrets, or temporary access codes.' },
  ],
  whyHeading: 'Why use Pixvert to generate passwords?',
  whyReasons: [
    { title: 'Cryptographically secure randomness', description: 'built on the Web Crypto API, not a predictable pseudo-random generator' },
    { title: '100% local, nothing transmitted', description: 'passwords are generated and shown only in your browser — never sent to a server or logged' },
    { title: 'Full customization', description: 'control length and character sets to match any password policy' },
    { title: 'Bulk generation', description: 'create several passwords at once for multiple accounts' },
  ],
  faqs: [
    { question: 'Are these passwords actually random and secure?', answer: 'Yes. The generator uses the Web Crypto API\'s cryptographically secure random number generator, the same source browsers use for encryption — not a predictable Math.random() function.' },
    { question: 'Is my generated password sent anywhere or logged?', answer: 'No. Everything happens locally in your browser. Pixvert never sees, stores, or transmits the passwords you generate.' },
    { question: 'What password length should I use?', answer: 'For most accounts, 16 characters or more with mixed character sets is recommended. For a password manager master password, consider 20+ characters.' },
    { question: 'Should I include symbols in every password?', answer: 'Include them when the login form allows it — symbols increase entropy. Some legacy systems restrict special characters, in which case rely on length instead.' },
    { question: 'How is password strength calculated?', answer: 'The indicator estimates entropy based on length and the variety of character sets used, giving a rough measure of how many attempts a brute-force attack would need.' },
    { question: 'Can I generate multiple passwords at once?', answer: 'Yes, use the bulk generation option to create several passwords in one go, useful when setting up multiple accounts at the same time.' },
    { question: 'Should I still use a password manager?', answer: 'Yes. Generating strong unique passwords is only half the solution — a password manager lets you store and autofill them without needing to memorize any of them.' },
  ],
  relatedTools: [
    { href: '/tools/uuid-generator', label: 'UUID Generator', description: 'Generate unique identifiers (UUID v4) using crypto.randomUUID' },
    { href: '/tools/random-numbers', label: 'Random Number Generator', description: 'Generate random integers or floats, bulk or unique' },
    { href: '/tools/qr-generator', label: 'QR Code Generator', description: 'Create a QR code for a login link or Wi-Fi credentials' },
    { href: '/tools/base64-text', label: 'Base64 Text', description: 'Encode or decode text as Base64' },
  ],
};

export default function PasswordGeneratorPage() {
  return (
    <>
      <PasswordGeneratorTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/password-generator"
        description={metadata.description as string}
        features={['Cryptographically secure randomness', 'Custom length', 'Custom character sets', 'Bulk generation', 'Strength indicator']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
