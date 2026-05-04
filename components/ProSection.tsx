'use client';

import { useSubscription } from '@/lib/subscription';

const FEATURES = [
  { icon: '⚡', title: 'Conversiones ilimitadas', desc: 'Sin límite diario, convierte todo lo que necesites.' },
  { icon: '📦', title: 'Archivos hasta 50 MB', desc: 'El plan gratuito tiene límite de 5 MB por archivo.' },
  { icon: '🖼️', title: 'Todos los formatos', desc: 'Incluye AVIF, el formato más moderno y eficiente.' },
  { icon: '🚫', title: 'Sin anuncios', desc: 'Experiencia limpia sin ninguna distracción.' },
];

export default function ProSection() {
  const { isPro, loading } = useSubscription();

  if (loading || isPro) return null;

  return (
    <div className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-14">
      <div className="text-center mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#6366F1]">Plan Pro</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-2 mb-3">
          Convierte sin límites por <span className="text-[#6366F1]">3,99 €/mes</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto">
          Paga una vez y olvídate de los límites. Cancela cuando quieras, sin compromisos.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8 max-w-xl mx-auto">
        {FEATURES.map((f) => (
          <div key={f.title} className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-xl">{f.icon}</span>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{f.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <a
          href="/pricing"
          className="inline-block px-8 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white hover:opacity-90 transition-opacity shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
        >
          Ver planes y precios →
        </a>
      </div>
    </div>
  );
}
