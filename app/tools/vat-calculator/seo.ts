import { type ToolSEOData } from '@/components/ToolSEOContent';

export interface ToolMeta {
  title: string;
  description: string;
}

export const metaEn: ToolMeta = {
  title: 'VAT Calculator Spain Free — IVA 21% 10% 4% | Pixvert',
  description:
    'Add or extract Spanish VAT (IVA) at 21%, 10%, or 4%. Free online VAT calculator — results update instantly, no signup needed.',
};

export const metaEs: ToolMeta = {
  title: 'Calculadora de IVA España Gratis — 21%, 10%, 4% | Pixvert',
  description:
    'Suma o resta el IVA español al 21%, 10% o 4% de un precio. Calculadora de IVA gratuita online — resultados al instante, sin registro.',
};

export const seoEn: ToolSEOData = {
  toolName: 'VAT Calculator Spain',
  whatIsHeading: 'What is a VAT (IVA) calculator for Spain?',
  whatIsParagraphs: [
    'A VAT calculator adds or removes Spanish value-added tax (IVA — Impuesto sobre el Valor Añadido) from a price. Pixvert\'s VAT calculator supports all three Spanish IVA rates: the general 21% rate applied to most goods and services, the reduced 10% rate for items like hospitality and transport, and the super-reduced 4% rate for basic necessities like bread, milk, and books.',
    'The tool works in both directions: enter a price without VAT to see the total with tax added, or enter a price that already includes VAT to extract the tax amount and the pre-tax base. This second calculation — going from a VAT-inclusive price back to the base — is something people frequently need but is easy to get wrong by hand, since you can\'t simply subtract the percentage from the total.',
    'Freelancers (autónomos), small business owners, and anyone issuing or checking invoices in Spain rely on quick, accurate IVA calculations regularly. This calculator gives instant results without needing to remember the formulas or open a spreadsheet.',
  ],
  howToHeading: 'How to calculate VAT (IVA)',
  howToSteps: [
    { title: 'Enter your price', description: 'type the base price (without VAT) or the total price (with VAT already included)' },
    { title: 'Select the IVA rate', description: 'choose 21% (general), 10% (reduced), or 4% (super-reduced) depending on the product or service' },
    { title: 'Choose the direction', description: 'add VAT to a base price, or extract VAT from a total price' },
    { title: 'Read the breakdown', description: 'see the base amount, the VAT amount, and the total, all calculated instantly' },
  ],
  useCasesHeading: 'When to use a VAT calculator',
  useCases: [
    { title: 'Issuing invoices as an autónomo', description: 'Quickly calculate the IVA to add to a service price before sending an invoice.' },
    { title: 'Checking a receipt or invoice', description: 'Verify that the VAT charged on a purchase matches the correct rate for that product category.' },
    { title: 'Pricing products for sale', description: 'Work out what price to charge including IVA to hit a target pre-tax revenue.' },
    { title: 'Budgeting business expenses', description: 'Extract the VAT-deductible portion from a business expense for accounting purposes.' },
    { title: 'Comparing prices across regions', description: 'Understand how different reduced VAT rates affect the final price of specific goods.' },
  ],
  whyHeading: 'Why use Pixvert\'s VAT calculator?',
  whyReasons: [
    { title: 'All three Spanish IVA rates', description: '21%, 10%, and 4% covered in one tool' },
    { title: 'Works both ways', description: 'add VAT to a base price or extract it from a total price' },
    { title: '100% private and local', description: 'calculations happen in your browser, nothing is sent to a server' },
    { title: 'Free and instant', description: 'no signup, no limits, results update as you type' },
  ],
  faqs: [
    { question: 'What are the current IVA rates in Spain?', answer: 'Spain applies three VAT rates: 21% (general rate, most goods and services), 10% (reduced rate, e.g. hospitality and passenger transport), and 4% (super-reduced rate, e.g. basic food items, books, and medicines).' },
    { question: 'How do I remove VAT from a total price?', answer: 'Divide the total price by 1 plus the VAT rate as a decimal (for example, divide by 1.21 for 21% VAT) to get the base price, then subtract the base from the total to get the VAT amount. This calculator does that automatically.' },
    { question: 'Why can\'t I just subtract 21% from the total to get the base price?', answer: 'Because the 21% was calculated on the base price, not the total. Subtracting 21% of the total overcorrects — you need to divide by 1.21 instead, which is what this calculator does correctly.' },
    { question: 'Is this calculator only for Spain?', answer: 'It\'s built around the specific IVA rates used in Spain (21%, 10%, 4%). For other countries\' VAT or GST rates, you would need a calculator using that country\'s specific percentages.' },
    { question: 'Is my price data sent anywhere?', answer: 'No, all calculations happen locally in your browser. Nothing you enter is transmitted to a server or stored.' },
    { question: 'Which IVA rate applies to my product or service?', answer: 'It depends on the category defined by Spanish tax law — most goods and services fall under the general 21% rate, with reduced rates applying to specific categories. Check the official AEAT guidance if you\'re unsure which rate applies to your case.' },
  ],
  relatedTools: [
    { href: '/tools/salary-calculator', label: 'Salary Calculator', description: 'Calculate net salary in Spain after IRPF and Social Security' },
    { href: '/tools/mortgage-calculator', label: 'Mortgage Calculator', description: 'Estimate your monthly mortgage payment' },
    { href: '/tools/percentage-calculator', label: 'Percentage Calculator', description: 'Calculate percentages, increases, and discounts' },
    { href: '/tools/tip-calculator', label: 'Tip Calculator', description: 'Split a bill and calculate tips' },
  ],
};

export const seoEs: ToolSEOData = {
  toolName: 'Calculadora de IVA España',
  whatIsHeading: '¿Qué es una calculadora de IVA para España?',
  whatIsParagraphs: [
    'Una calculadora de IVA suma o resta el Impuesto sobre el Valor Añadido español de un precio. La calculadora de Pixvert admite los tres tipos de IVA español: el tipo general del 21% aplicado a la mayoría de bienes y servicios, el tipo reducido del 10% para artículos como hostelería y transporte, y el tipo superreducido del 4% para bienes de primera necesidad como el pan, la leche y los libros.',
    'La herramienta funciona en ambas direcciones: introduce un precio sin IVA para ver el total con el impuesto añadido, o introduce un precio que ya incluye IVA para extraer el importe del impuesto y la base imponible. Este segundo cálculo — pasar de un precio con IVA incluido a la base — es algo que se necesita con frecuencia pero es fácil hacer mal a mano, ya que no puedes simplemente restar el porcentaje del total.',
    'Los autónomos, pequeños empresarios y cualquiera que emita o revise facturas en España dependen habitualmente de cálculos de IVA rápidos y precisos. Esta calculadora da resultados instantáneos sin necesidad de recordar las fórmulas ni abrir una hoja de cálculo.',
  ],
  howToHeading: 'Cómo calcular el IVA',
  howToSteps: [
    { title: 'Introduce tu precio', description: 'escribe el precio base (sin IVA) o el precio total (con IVA ya incluido)' },
    { title: 'Selecciona el tipo de IVA', description: 'elige 21% (general), 10% (reducido) o 4% (superreducido) según el producto o servicio' },
    { title: 'Elige la dirección', description: 'suma el IVA a un precio base, o extráelo de un precio total' },
    { title: 'Lee el desglose', description: 've la base imponible, el importe del IVA y el total, todo calculado al instante' },
  ],
  useCasesHeading: 'Cuándo usar una calculadora de IVA',
  useCases: [
    { title: 'Emitir facturas como autónomo', description: 'Calcula rápidamente el IVA a añadir al precio de un servicio antes de enviar una factura.' },
    { title: 'Revisar un recibo o factura', description: 'Verifica que el IVA cobrado en una compra coincide con el tipo correcto para esa categoría de producto.' },
    { title: 'Fijar precios de venta', description: 'Calcula qué precio cobrar con IVA incluido para alcanzar un ingreso objetivo antes de impuestos.' },
    { title: 'Presupuestar gastos de negocio', description: 'Extrae la parte deducible de IVA de un gasto empresarial para contabilidad.' },
    { title: 'Comparar precios entre categorías', description: 'Entiende cómo los distintos tipos reducidos de IVA afectan al precio final de bienes concretos.' },
  ],
  whyHeading: '¿Por qué usar la calculadora de IVA de Pixvert?',
  whyReasons: [
    { title: 'Los tres tipos de IVA español', description: '21%, 10% y 4% cubiertos en una sola herramienta' },
    { title: 'Funciona en ambos sentidos', description: 'suma el IVA a un precio base o extráelo de un precio total' },
    { title: '100% privado y local', description: 'los cálculos ocurren en tu navegador, nada se envía a un servidor' },
    { title: 'Gratis e instantáneo', description: 'sin registro, sin límites, los resultados se actualizan mientras escribes' },
  ],
  faqs: [
    { question: '¿Cuáles son los tipos de IVA actuales en España?', answer: 'España aplica tres tipos de IVA: 21% (tipo general, la mayoría de bienes y servicios), 10% (tipo reducido, p. ej. hostelería y transporte de pasajeros) y 4% (tipo superreducido, p. ej. alimentos básicos, libros y medicamentos).' },
    { question: '¿Cómo quito el IVA de un precio total?', answer: 'Divide el precio total entre 1 más el tipo de IVA en decimal (por ejemplo, divide entre 1,21 para un IVA del 21%) para obtener el precio base, y luego resta la base del total para obtener el importe del IVA. Esta calculadora hace eso automáticamente.' },
    { question: '¿Por qué no puedo simplemente restar el 21% del total para obtener el precio base?', answer: 'Porque el 21% se calculó sobre el precio base, no sobre el total. Restar el 21% del total sobrecorrige — necesitas dividir entre 1,21 en su lugar, que es lo que hace correctamente esta calculadora.' },
    { question: '¿Esta calculadora sirve solo para España?', answer: 'Está construida en torno a los tipos específicos de IVA usados en España (21%, 10%, 4%). Para tipos de IVA o impuestos sobre ventas de otros países, necesitarías una calculadora con los porcentajes específicos de ese país.' },
    { question: '¿Mis datos de precio se envían a algún sitio?', answer: 'No, todos los cálculos ocurren localmente en tu navegador. Nada de lo que introduces se transmite a un servidor ni se guarda.' },
    { question: '¿Qué tipo de IVA aplica a mi producto o servicio?', answer: 'Depende de la categoría definida por la ley fiscal española — la mayoría de bienes y servicios caen bajo el tipo general del 21%, con tipos reducidos aplicando a categorías específicas. Consulta la guía oficial de la AEAT si no estás seguro de qué tipo aplica a tu caso.' },
  ],
  relatedTools: [
    { href: '/tools/salary-calculator', label: 'Calculadora de Salario', description: 'Calcula el salario neto en España tras IRPF y Seguridad Social' },
    { href: '/tools/mortgage-calculator', label: 'Calculadora de Hipoteca', description: 'Estima tu cuota mensual de hipoteca' },
    { href: '/tools/percentage-calculator', label: 'Calculadora de Porcentajes', description: 'Calcula porcentajes, aumentos y descuentos' },
    { href: '/tools/tip-calculator', label: 'Calculadora de Propinas', description: 'Divide una cuenta y calcula propinas' },
  ],
};
