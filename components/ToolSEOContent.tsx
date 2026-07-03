import Link from 'next/link';

export interface ToolStep {
  title: string;
  description: string;
}

export interface ToolUseCase {
  title: string;
  description: string;
}

export interface ToolReason {
  title: string;
  description: string;
}

export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface RelatedTool {
  href: string;
  label: string;
  description: string;
}

export interface ToolSEOData {
  /** Used only for schema.org output, not rendered as a heading itself */
  toolName: string;
  whatIsHeading: string;
  whatIsParagraphs: string[];
  howToHeading: string;
  howToSteps: ToolStep[];
  useCasesHeading: string;
  useCases: ToolUseCase[];
  whyHeading: string;
  whyReasons: ToolReason[];
  faqHeading?: string;
  faqs: ToolFAQ[];
  relatedHeading?: string;
  relatedTools: RelatedTool[];
}

export default function ToolSEOContent({
  whatIsHeading,
  whatIsParagraphs,
  howToHeading,
  howToSteps,
  useCasesHeading,
  useCases,
  whyHeading,
  whyReasons,
  faqHeading = 'Frequently Asked Questions',
  faqs,
  relatedHeading = 'Related Tools',
  relatedTools,
}: ToolSEOData) {
  return (
    <section className="max-w-3xl mx-auto w-full px-4 pb-16 pt-6">
      <div className="border-t border-slate-200 dark:border-slate-800 pt-10 space-y-12">
        {/* What is */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            {whatIsHeading}
          </h2>
          <div className="space-y-4">
            {whatIsParagraphs.map((p, i) => (
              <p key={i} className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* How to */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            {howToHeading}
          </h2>
          <ol className="space-y-3">
            {howToSteps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-none w-7 h-7 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed pt-0.5">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{step.title}</span>
                  {step.description ? ` — ${step.description}` : ''}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Use cases */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            {useCasesHeading}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {useCases.map((uc, i) => (
              <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{uc.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why choose Pixvert */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            {whyHeading}
          </h2>
          <ul className="space-y-2.5">
            {whyReasons.map((r, i) => (
              <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-400">
                <span className="text-indigo-500 dark:text-indigo-400 flex-none">✓</span>
                <span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{r.title}</span>
                  {r.description ? `: ${r.description}` : ''}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            {faqHeading}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1.5">{faq.question}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related tools */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            {relatedHeading}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {relatedTools.map((tool, i) => (
              <Link
                key={i}
                href={tool.href}
                className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-colors"
              >
                <h3 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-1">{tool.label}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
