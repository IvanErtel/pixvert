import { type ToolSEOData } from '@/components/ToolSEOContent';

export interface ToolMeta {
  title: string;
  description: string;
}

export const metaEn: ToolMeta = {
  title: 'Salary Calculator Spain Free — Net Salary IRPF 2024 | Pixvert',
  description:
    'Calculate your net salary in Spain after IRPF and Social Security deductions. Free gross-to-net salary calculator for 2024. 12 or 14 pagas.',
};

export const metaEs: ToolMeta = {
  title: 'Calculadora de Salario España Gratis — Neto IRPF 2024 | Pixvert',
  description:
    'Calcula tu salario neto en España tras las deducciones de IRPF y Seguridad Social. Calculadora gratuita de bruto a neto para 2024. 12 o 14 pagas.',
};

export const seoEn: ToolSEOData = {
  toolName: 'Salary Calculator Spain',
  whatIsHeading: 'What is a gross-to-net salary calculator for Spain?',
  whatIsParagraphs: [
    'A salary calculator for Spain converts your gross annual or monthly salary ("salario bruto") into the actual amount you take home ("salario neto") after IRPF income tax withholding and Social Security contributions are deducted. Pixvert\'s salary calculator applies the progressive IRPF brackets and standard Social Security employee contribution rate used in Spain.',
    'Job offers in Spain are almost always quoted in gross terms, which can make it hard to know what actually lands in your bank account each month. This calculator handles both the 12-payment and 14-payment ("14 pagas") salary structures common in Spanish employment contracts, and shows the monthly net figure for each.',
    'IRPF withholding in Spain depends on your income level, personal circumstances, and region, so this calculator provides a close estimate based on the standard national brackets rather than an exact payslip figure — useful for comparing job offers or planning a budget before your first payslip arrives.',
  ],
  howToHeading: 'How to calculate your net salary',
  howToSteps: [
    { title: 'Enter your gross annual salary', description: 'the "salario bruto anual" stated in your contract or job offer' },
    { title: 'Choose 12 or 14 payments', description: 'select whether your salary is paid in 12 monthly installments or split with two extra "pagas extra"' },
    { title: 'Review your net salary', description: 'see the estimated annual and monthly net amount after IRPF and Social Security deductions' },
    { title: 'Compare scenarios', description: 'adjust the gross salary to compare different job offers side by side' },
  ],
  useCasesHeading: 'When to use a salary calculator',
  useCases: [
    { title: 'Comparing job offers', description: 'Convert two gross salary offers to net terms to see which one actually pays more per month.' },
    { title: 'Negotiating a raise', description: 'Understand how much a gross salary increase actually translates into extra take-home pay.' },
    { title: 'Budgeting before a new job starts', description: 'Estimate your monthly net income before your first payslip so you can plan expenses accurately.' },
    { title: 'Understanding a payslip', description: 'Sanity-check the IRPF and Social Security deductions shown on your nómina against an independent estimate.' },
    { title: 'Freelancers moving to payroll', description: 'Compare autónomo income against what an equivalent gross salary as an employee would net.' },
  ],
  whyHeading: 'Why use Pixvert\'s salary calculator?',
  whyReasons: [
    { title: 'Spain-specific calculation', description: 'uses IRPF brackets and Social Security rates applicable in Spain, not a generic international formula' },
    { title: '12 or 14 payment support', description: 'matches how Spanish salaries are actually structured and paid' },
    { title: '100% private', description: 'your salary figures are calculated locally in your browser and never transmitted' },
    { title: 'Free, instant, no signup', description: 'get results immediately without creating an account' },
  ],
  faqs: [
    { question: 'Is my salary information sent to a server?', answer: 'No. The entire calculation runs locally in your browser using JavaScript. Your salary figures are never transmitted or stored anywhere.' },
    { question: 'What is the difference between 12 and 14 payments?', answer: 'Many Spanish contracts pay the annual salary in 12 monthly installments, while others split it into 14 payments by adding two "pagas extra" (usually in summer and December), which changes the monthly net amount.' },
    { question: 'Does this calculator match my exact payslip?', answer: 'It provides a close estimate based on standard national IRPF brackets and Social Security rates. Your actual nómina may differ slightly due to personal circumstances, regional variations, or specific deductions.' },
    { question: 'Does the calculator account for children or personal deductions?', answer: 'This version uses standard brackets without personal or family deductions, so individual circumstances like dependents may lower your actual IRPF withholding compared to the estimate shown.' },
    { question: 'Is this calculator updated for the current tax year?', answer: 'Yes, it uses the IRPF brackets and Social Security contribution rates in effect for the current year.' },
    { question: 'Can I use this if I\'m an autónomo (freelancer)?', answer: 'This calculator is designed for salaried employees under a standard contract. Autónomo taxation follows a different structure with quarterly self-assessments and separate Social Security contributions.' },
  ],
  relatedTools: [
    { href: '/tools/mortgage-calculator', label: 'Mortgage Calculator', description: 'Estimate your monthly mortgage payment' },
    { href: '/tools/vat-calculator', label: 'VAT Calculator', description: 'Calculate Spanish IVA at 21%, 10%, or 4%' },
    { href: '/tools/percentage-calculator', label: 'Percentage Calculator', description: 'Calculate percentages, increases, and discounts' },
    { href: '/tools/tip-calculator', label: 'Tip Calculator', description: 'Split a bill and calculate tips' },
  ],
};

export const seoEs: ToolSEOData = {
  toolName: 'Calculadora de Salario España',
  whatIsHeading: '¿Qué es una calculadora de salario bruto a neto para España?',
  whatIsParagraphs: [
    'Una calculadora de salario para España convierte tu salario anual o mensual bruto en la cantidad real que recibes como neto, tras descontar la retención de IRPF y las cotizaciones a la Seguridad Social. La calculadora de Pixvert aplica los tramos progresivos de IRPF y el tipo estándar de cotización del trabajador a la Seguridad Social usado en España.',
    'Las ofertas de trabajo en España casi siempre se expresan en términos brutos, lo que puede dificultar saber qué llega realmente a tu cuenta cada mes. Esta calculadora maneja tanto la estructura de 12 pagas como la de 14 pagas, comunes en los contratos laborales españoles, y muestra la cifra neta mensual para cada una.',
    'La retención de IRPF en España depende de tu nivel de ingresos, circunstancias personales y comunidad autónoma, así que esta calculadora ofrece una estimación aproximada basada en los tramos nacionales estándar en vez de una cifra exacta de nómina — útil para comparar ofertas de trabajo o planificar un presupuesto antes de recibir tu primera nómina.',
  ],
  howToHeading: 'Cómo calcular tu salario neto',
  howToSteps: [
    { title: 'Introduce tu salario bruto anual', description: 'el "salario bruto anual" indicado en tu contrato u oferta de trabajo' },
    { title: 'Elige 12 o 14 pagas', description: 'selecciona si tu salario se paga en 12 mensualidades o se divide con dos "pagas extra"' },
    { title: 'Revisa tu salario neto', description: 've la cifra anual y mensual neta estimada tras las deducciones de IRPF y Seguridad Social' },
    { title: 'Compara escenarios', description: 'ajusta el salario bruto para comparar distintas ofertas de trabajo lado a lado' },
  ],
  useCasesHeading: 'Cuándo usar una calculadora de salario',
  useCases: [
    { title: 'Comparar ofertas de trabajo', description: 'Convierte dos ofertas de salario bruto a términos netos para ver cuál paga realmente más al mes.' },
    { title: 'Negociar una subida', description: 'Entiende cuánto se traduce realmente un aumento de salario bruto en más dinero neto en mano.' },
    { title: 'Presupuestar antes de empezar un nuevo trabajo', description: 'Estima tus ingresos netos mensuales antes de tu primera nómina para poder planificar gastos con precisión.' },
    { title: 'Entender una nómina', description: 'Comprueba las deducciones de IRPF y Seguridad Social de tu nómina contra una estimación independiente.' },
    { title: 'Autónomos pasando a nómina', description: 'Compara los ingresos como autónomo con lo que netearía un salario bruto equivalente como empleado.' },
  ],
  whyHeading: '¿Por qué usar la calculadora de salario de Pixvert?',
  whyReasons: [
    { title: 'Cálculo específico para España', description: 'usa los tramos de IRPF y tipos de Seguridad Social aplicables en España, no una fórmula internacional genérica' },
    { title: 'Soporte para 12 o 14 pagas', description: 'coincide con cómo se estructuran y pagan realmente los salarios en España' },
    { title: '100% privado', description: 'tus cifras salariales se calculan localmente en tu navegador y nunca se transmiten' },
    { title: 'Gratis, instantáneo, sin registro', description: 'obtén resultados de inmediato sin crear una cuenta' },
  ],
  faqs: [
    { question: '¿Mi información salarial se envía a un servidor?', answer: 'No. Todo el cálculo se ejecuta localmente en tu navegador usando JavaScript. Tus cifras salariales nunca se transmiten ni se guardan en ningún sitio.' },
    { question: '¿Cuál es la diferencia entre 12 y 14 pagas?', answer: 'Muchos contratos españoles pagan el salario anual en 12 mensualidades, mientras que otros lo dividen en 14 pagas añadiendo dos "pagas extra" (normalmente en verano y diciembre), lo que cambia la cifra neta mensual.' },
    { question: '¿Esta calculadora coincide exactamente con mi nómina?', answer: 'Ofrece una estimación aproximada basada en los tramos nacionales estándar de IRPF y tipos de Seguridad Social. Tu nómina real puede variar ligeramente por circunstancias personales, variaciones autonómicas o deducciones específicas.' },
    { question: '¿La calculadora tiene en cuenta hijos o deducciones personales?', answer: 'Esta versión usa tramos estándar sin deducciones personales o familiares, así que circunstancias individuales como tener hijos a cargo pueden reducir tu retención real de IRPF respecto a la estimación mostrada.' },
    { question: '¿Esta calculadora está actualizada para el ejercicio fiscal actual?', answer: 'Sí, usa los tramos de IRPF y los tipos de cotización a la Seguridad Social vigentes para el año en curso.' },
    { question: '¿Puedo usar esto si soy autónomo?', answer: 'Esta calculadora está diseñada para empleados asalariados con un contrato estándar. La tributación de autónomos sigue una estructura distinta con autoliquidaciones trimestrales y cotizaciones a la Seguridad Social separadas.' },
  ],
  relatedTools: [
    { href: '/tools/mortgage-calculator', label: 'Calculadora de Hipoteca', description: 'Estima tu cuota mensual de hipoteca' },
    { href: '/tools/vat-calculator', label: 'Calculadora de IVA', description: 'Calcula el IVA español al 21%, 10% o 4%' },
    { href: '/tools/percentage-calculator', label: 'Calculadora de Porcentajes', description: 'Calcula porcentajes, aumentos y descuentos' },
    { href: '/tools/tip-calculator', label: 'Calculadora de Propinas', description: 'Divide una cuenta y calcula propinas' },
  ],
};
