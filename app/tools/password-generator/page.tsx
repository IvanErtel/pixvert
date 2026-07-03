import type { Metadata } from 'next';
import PasswordGeneratorTool from './PasswordGeneratorTool';
import { type ToolSEOData } from '@/components/ToolSEOContent';
import LocalizedToolSEO from '@/components/LocalizedToolSEO';
import SchemaMarkup from '@/components/SchemaMarkup';
import { Locale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Password Generator Free Online — Strong & Secure | Pixvert',
  description:
    'Generate strong, secure passwords with custom length and character sets. Uses cryptographic randomness. Bulk generation, strength indicator.',
  openGraph: { title: 'Password Generator — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/password-generator',
  },
};

const seoEn: ToolSEOData = {
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

const seoEs: ToolSEOData = {
  toolName: 'Generador de Contraseñas',
  whatIsHeading: '¿Qué es un generador de contraseñas?',
  whatIsParagraphs: [
    'Un generador de contraseñas crea contraseñas aleatorias e impredecibles, mucho más difíciles de adivinar o descifrar que cualquier cosa que se le ocurriría a una persona — incluidas contraseñas formadas por palabras reales, fechas de nacimiento o sustituciones predecibles como "P@ssw0rd". El generador de Pixvert usa la Web Crypto API, la misma aleatoriedad criptográficamente segura de la que dependen los navegadores para el cifrado, en vez de una función pseudoaleatoria más débil.',
    'Tú controlas la longitud y qué conjuntos de caracteres se incluyen — minúsculas, mayúsculas, números y símbolos — para poder cumplir los requisitos de cualquier formulario de acceso, desde un mínimo simple de 8 caracteres hasta una frase de 64 caracteres para un gestor de contraseñas. Un indicador de fortaleza en vivo muestra cuán resistente es el resultado a ataques de fuerza bruta.',
    'Reutilizar la misma contraseña (o variaciones de ella) en varios sitios es una de las causas más comunes de brechas de cuentas: en cuanto un servicio filtra una contraseña, los atacantes la prueban en todos lados. Generar una contraseña única y aleatoria por cuenta — idealmente guardada en un gestor de contraseñas — elimina ese riesgo por completo.',
  ],
  howToHeading: 'Cómo generar una contraseña fuerte',
  howToSteps: [
    { title: 'Define la longitud', description: 'las contraseñas más largas son exponencialmente más difíciles de descifrar — 16+ caracteres es un buen valor por defecto' },
    { title: 'Elige los conjuntos de caracteres', description: 'activa minúsculas, mayúsculas, números y símbolos según lo que acepte el formulario de acceso' },
    { title: 'Revisa el indicador de fortaleza', description: 'confirma que el resultado esté en el rango fuerte o muy fuerte' },
    { title: 'Genera en lote si lo necesitas', description: 'crea varias contraseñas a la vez al configurar varias cuentas' },
    { title: 'Cópiala y guárdala', description: 'copia la contraseña con un clic y guárdala en un gestor de contraseñas en vez de memorizarla' },
  ],
  useCasesHeading: 'Cuándo usar un generador de contraseñas',
  useCases: [
    { title: 'Registro de cuentas nuevas', description: 'Genera una contraseña única cada vez que crees una cuenta en vez de reutilizar una antigua.' },
    { title: 'Contraseña maestra de un gestor', description: 'Crea una frase larga de alta entropía para esa única contraseña que sí necesitas recordar.' },
    { title: 'Credenciales compartidas en equipo', description: 'Genera contraseñas temporales fuertes para accesos compartidos, redes Wi-Fi o cuentas de administrador.' },
    { title: 'Restablecer contraseñas tras una filtración', description: 'Genera rápidamente nuevas contraseñas para cada cuenta afectada tras una filtración de datos.' },
    { title: 'Claves de API y secretos', description: 'Úsalo como fuente rápida de caracteres aleatorios para tokens, secretos o códigos de acceso temporal.' },
  ],
  whyHeading: '¿Por qué usar Pixvert para generar contraseñas?',
  whyReasons: [
    { title: 'Aleatoriedad criptográficamente segura', description: 'basado en la Web Crypto API, no en un generador pseudoaleatorio predecible' },
    { title: '100% local, nada se transmite', description: 'las contraseñas se generan y muestran solo en tu navegador — nunca se envían a un servidor ni se registran' },
    { title: 'Personalización total', description: 'controla longitud y conjuntos de caracteres para cumplir cualquier política de contraseñas' },
    { title: 'Generación en lote', description: 'crea varias contraseñas a la vez para múltiples cuentas' },
  ],
  faqs: [
    { question: '¿Estas contraseñas son realmente aleatorias y seguras?', answer: 'Sí. El generador usa el generador de números aleatorios criptográficamente seguro de la Web Crypto API, la misma fuente que usan los navegadores para el cifrado — no una función Math.random() predecible.' },
    { question: '¿Mi contraseña generada se envía o registra en algún sitio?', answer: 'No. Todo ocurre localmente en tu navegador. Pixvert nunca ve, guarda ni transmite las contraseñas que generas.' },
    { question: '¿Qué longitud de contraseña debería usar?', answer: 'Para la mayoría de cuentas se recomiendan 16 caracteres o más con conjuntos de caracteres mixtos. Para la contraseña maestra de un gestor, considera 20+ caracteres.' },
    { question: '¿Debería incluir símbolos en todas las contraseñas?', answer: 'Inclúyelos cuando el formulario lo permita — los símbolos aumentan la entropía. Algunos sistemas antiguos restringen caracteres especiales, en cuyo caso apóyate en la longitud.' },
    { question: '¿Cómo se calcula la fortaleza de la contraseña?', answer: 'El indicador estima la entropía en base a la longitud y la variedad de conjuntos de caracteres usados, dando una medida aproximada de cuántos intentos necesitaría un ataque de fuerza bruta.' },
    { question: '¿Puedo generar varias contraseñas a la vez?', answer: 'Sí, usa la opción de generación en lote para crear varias contraseñas de una vez, útil al configurar varias cuentas a la vez.' },
    { question: '¿Debería seguir usando un gestor de contraseñas?', answer: 'Sí. Generar contraseñas fuertes y únicas es solo la mitad de la solución — un gestor de contraseñas te permite guardarlas y autocompletarlas sin necesidad de memorizar ninguna.' },
  ],
  relatedTools: [
    { href: '/tools/uuid-generator', label: 'Generador de UUID', description: 'Genera identificadores únicos (UUID v4) con crypto.randomUUID' },
    { href: '/tools/random-numbers', label: 'Generador de Números Aleatorios', description: 'Genera enteros o decimales aleatorios, en lote o únicos' },
    { href: '/tools/qr-generator', label: 'Generador de Códigos QR', description: 'Crea un código QR para un enlace de acceso o credenciales Wi-Fi' },
    { href: '/tools/base64-text', label: 'Base64 de Texto', description: 'Codifica o decodifica texto como Base64' },
  ],
};

const seoByLocale: Partial<Record<Locale, ToolSEOData>> = { en: seoEn, es: seoEs };

export default function PasswordGeneratorPage() {
  return (
    <>
      <PasswordGeneratorTool />
      <LocalizedToolSEO content={seoByLocale} />
      <SchemaMarkup
        name={seoEn.toolName}
        url="https://pixvert-one.vercel.app/tools/password-generator"
        description={metadata.description as string}
        features={['Cryptographically secure randomness', 'Custom length', 'Custom character sets', 'Bulk generation', 'Strength indicator']}
        howToName={seoEn.howToHeading}
        howToSteps={seoEn.howToSteps}
        faqs={seoEn.faqs}
      />
    </>
  );
}
