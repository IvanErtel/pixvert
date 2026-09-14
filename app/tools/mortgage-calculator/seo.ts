import { type ToolSEOData } from '@/components/ToolSEOContent';

export interface ToolMeta {
  title: string;
  description: string;
}

export const metaEn: ToolMeta = {
  title: 'Mortgage Calculator Online Free — Monthly Payment | Pixvert',
  description:
    'Calculate your monthly mortgage payment, total cost, and total interest instantly. Free mortgage calculator with amortization breakdown.',
};

export const metaEs: ToolMeta = {
  title: 'Calculadora de Hipoteca Gratis — Cuota Mensual | Pixvert',
  description:
    'Calcula tu cuota mensual de hipoteca, coste total e intereses al instante. Calculadora de hipoteca gratuita con desglose de amortización.',
};

export const seoEn: ToolSEOData = {
  toolName: 'Mortgage Calculator',
  whatIsHeading: 'What is a mortgage calculator?',
  whatIsParagraphs: [
    'A mortgage calculator estimates your monthly loan payment based on the amount you borrow, the interest rate, and the length of the loan. Pixvert\'s mortgage calculator computes your monthly payment instantly, along with the total amount you\'ll pay over the life of the loan and how much of that is interest versus principal.',
    'Buying a home is one of the biggest financial commitments most people make, and small differences in interest rate or loan term can change the monthly payment — and total interest paid — by tens of thousands over 20 or 30 years. This mortgage calculator lets you adjust each variable and see the impact immediately, without needing a spreadsheet or a bank appointment.',
    'The calculator uses the standard amortization formula that lenders use, so the numbers you see here match what you\'d get from a bank\'s own estimate, letting you compare offers or explore "what if" scenarios — a bigger down payment, a shorter term, a different rate — before committing to anything.',
  ],
  howToHeading: 'How to calculate your mortgage payment',
  howToSteps: [
    { title: 'Enter the loan amount', description: 'the total amount you plan to borrow (home price minus down payment)' },
    { title: 'Enter the interest rate', description: 'the annual interest rate offered by your lender' },
    { title: 'Set the loan term', description: 'typically 15, 20, or 30 years' },
    { title: 'Review the results', description: 'see your estimated monthly payment, total cost, and total interest instantly' },
  ],
  useCasesHeading: 'When to use a mortgage calculator',
  useCases: [
    { title: 'Comparing loan offers', description: 'Enter the terms from two different lenders side by side to see which results in a lower total cost.' },
    { title: 'Deciding on a down payment', description: 'See how increasing your down payment lowers the loan amount, monthly payment, and total interest.' },
    { title: 'Choosing a loan term', description: 'Compare a 15-year term against a 30-year term to understand the trade-off between monthly payment and total interest.' },
    { title: 'Budgeting before house hunting', description: 'Estimate what monthly payment you can afford before looking at properties in a given price range.' },
    { title: 'Refinancing decisions', description: 'Compare your current mortgage terms against a potential refinance offer.' },
  ],
  whyHeading: 'Why use Pixvert\'s mortgage calculator?',
  whyReasons: [
    { title: 'Instant results', description: 'monthly payment, total cost, and total interest update as you type' },
    { title: '100% private', description: 'your financial numbers are calculated locally in your browser and never sent anywhere' },
    { title: 'No signup required', description: 'run as many scenarios as you want without creating an account' },
    { title: 'Standard amortization formula', description: 'the same calculation method banks use, so estimates are realistic' },
  ],
  faqs: [
    { question: 'Is my financial information sent anywhere?', answer: 'No. All calculations run locally in your browser using JavaScript. The numbers you enter are never transmitted or stored.' },
    { question: 'Does this calculator include taxes and insurance?', answer: 'No, this calculator estimates principal and interest only. Property taxes, homeowners insurance, and HOA fees would need to be added separately for a full monthly cost estimate.' },
    { question: 'How is the monthly payment calculated?', answer: 'The tool uses the standard fixed-rate amortization formula, which spreads principal and interest across equal monthly payments over the loan term.' },
    { question: 'Why does a shorter loan term have a higher monthly payment but lower total cost?', answer: 'A shorter term spreads the same loan amount over fewer payments, so each one is larger, but you pay much less interest overall since the loan is repaid faster.' },
    { question: 'Can I use this for a car loan or personal loan?', answer: 'The same amortization math applies to any fixed-rate installment loan, so yes, though the tool is labeled and optimized for mortgage scenarios.' },
    { question: 'What interest rate should I enter if I don\'t have an offer yet?', answer: 'Check current average mortgage rates for your country and loan type as a starting estimate, then adjust once you have an actual lender quote.' },
  ],
  relatedTools: [
    { href: '/tools/salary-calculator', label: 'Salary Calculator', description: 'Estimate your net salary after tax deductions' },
    { href: '/tools/percentage-calculator', label: 'Percentage Calculator', description: 'Calculate percentages, increases, and discounts' },
    { href: '/tools/vat-calculator', label: 'VAT Calculator', description: 'Calculate VAT amounts for Spain (21%, 10%, 4%)' },
    { href: '/tools/unit-converter', label: 'Unit Converter', description: 'Convert between weight, length, temperature, and volume units' },
  ],
};

export const seoEs: ToolSEOData = {
  toolName: 'Calculadora de Hipoteca',
  whatIsHeading: '¿Qué es una calculadora de hipoteca?',
  whatIsParagraphs: [
    'Una calculadora de hipoteca estima tu cuota mensual de préstamo en base a la cantidad que pides prestada, el tipo de interés y la duración del préstamo. La calculadora de Pixvert calcula tu cuota mensual al instante, junto con el importe total que pagarás durante la vida del préstamo y cuánto de eso son intereses frente a capital.',
    'Comprar una vivienda es uno de los mayores compromisos financieros que la mayoría de personas asumen, y pequeñas diferencias en el tipo de interés o el plazo pueden cambiar la cuota mensual — y los intereses totales pagados — en decenas de miles a lo largo de 20 o 30 años. Esta calculadora te permite ajustar cada variable y ver el impacto de inmediato, sin necesitar una hoja de cálculo ni una cita en el banco.',
    'La calculadora usa la fórmula de amortización estándar que usan los bancos, así que los números que ves aquí coinciden con lo que obtendrías de la propia estimación de un banco, permitiéndote comparar ofertas o explorar escenarios hipotéticos — una entrada mayor, un plazo más corto, un tipo distinto — antes de comprometerte a nada.',
  ],
  howToHeading: 'Cómo calcular tu cuota de hipoteca',
  howToSteps: [
    { title: 'Introduce el importe del préstamo', description: 'la cantidad total que planeas pedir prestada (precio de la vivienda menos la entrada)' },
    { title: 'Introduce el tipo de interés', description: 'el tipo de interés anual ofrecido por tu banco' },
    { title: 'Define el plazo del préstamo', description: 'normalmente 15, 20 o 30 años' },
    { title: 'Revisa los resultados', description: 've tu cuota mensual estimada, coste total e intereses totales al instante' },
  ],
  useCasesHeading: 'Cuándo usar una calculadora de hipoteca',
  useCases: [
    { title: 'Comparar ofertas de préstamo', description: 'Introduce las condiciones de dos bancos distintos lado a lado para ver cuál resulta en un menor coste total.' },
    { title: 'Decidir la entrada', description: 'Ve cómo aumentar tu entrada reduce el importe del préstamo, la cuota mensual y los intereses totales.' },
    { title: 'Elegir el plazo del préstamo', description: 'Compara un plazo de 15 años frente a uno de 30 para entender el equilibrio entre cuota mensual e intereses totales.' },
    { title: 'Presupuestar antes de buscar vivienda', description: 'Estima qué cuota mensual puedes permitirte antes de mirar propiedades en un rango de precio determinado.' },
    { title: 'Decisiones de refinanciación', description: 'Compara las condiciones de tu hipoteca actual con una posible oferta de refinanciación.' },
  ],
  whyHeading: '¿Por qué usar la calculadora de hipoteca de Pixvert?',
  whyReasons: [
    { title: 'Resultados instantáneos', description: 'la cuota mensual, coste total e intereses totales se actualizan mientras escribes' },
    { title: '100% privado', description: 'tus cifras financieras se calculan localmente en tu navegador y nunca se envían a ningún sitio' },
    { title: 'Sin necesidad de registro', description: 'prueba tantos escenarios como quieras sin crear una cuenta' },
    { title: 'Fórmula de amortización estándar', description: 'el mismo método de cálculo que usan los bancos, así que las estimaciones son realistas' },
  ],
  faqs: [
    { question: '¿Mi información financiera se envía a algún sitio?', answer: 'No. Todos los cálculos se ejecutan localmente en tu navegador usando JavaScript. Los números que introduces nunca se transmiten ni se guardan.' },
    { question: '¿Esta calculadora incluye impuestos y seguros?', answer: 'No, esta calculadora estima solo capital e intereses. Los impuestos de propiedad, el seguro de hogar y las cuotas de comunidad deberían añadirse aparte para una estimación completa del coste mensual.' },
    { question: '¿Cómo se calcula la cuota mensual?', answer: 'La herramienta usa la fórmula estándar de amortización a tipo fijo, que reparte capital e intereses en cuotas mensuales iguales durante el plazo del préstamo.' },
    { question: '¿Por qué un plazo más corto tiene una cuota mensual más alta pero un coste total menor?', answer: 'Un plazo más corto reparte el mismo importe de préstamo en menos cuotas, así que cada una es mayor, pero pagas muchos menos intereses en total ya que el préstamo se devuelve más rápido.' },
    { question: '¿Puedo usar esto para un préstamo de coche o personal?', answer: 'La misma matemática de amortización se aplica a cualquier préstamo a plazos con tipo fijo, así que sí, aunque la herramienta está etiquetada y optimizada para escenarios de hipoteca.' },
    { question: '¿Qué tipo de interés debo introducir si aún no tengo una oferta?', answer: 'Consulta los tipos de hipoteca medios actuales para tu país y tipo de préstamo como estimación inicial, y ajústalo cuando tengas una oferta real de un banco.' },
  ],
  relatedTools: [
    { href: '/tools/salary-calculator', label: 'Calculadora de Salario', description: 'Estima tu salario neto tras deducciones fiscales' },
    { href: '/tools/percentage-calculator', label: 'Calculadora de Porcentajes', description: 'Calcula porcentajes, aumentos y descuentos' },
    { href: '/tools/vat-calculator', label: 'Calculadora de IVA', description: 'Calcula el IVA en España (21%, 10%, 4%)' },
    { href: '/tools/unit-converter', label: 'Conversor de Unidades', description: 'Convierte entre peso, longitud, temperatura y volumen' },
  ],
};
