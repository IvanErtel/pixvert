'use client';

import { useState } from 'react';
import { useSubscription } from '@/lib/subscription';
import { useRouter } from 'next/navigation';

export default function ActivatePage() {
  const { activate } = useSubscription();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/activate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), pin: showPin ? pin : undefined }),
    });
    const data = await res.json();
    setLoading(false);

    if (data.success) {
      activate(email.trim(), data.ownerToken);
      router.push('/');
    } else if (data.pin_required) {
      setShowPin(true);
      setError('');
    } else if (data.error === 'invalid_pin') {
      setError('PIN incorrecto.');
    } else if (data.error === 'no_subscription') {
      setError('No encontramos una suscripción activa para ese email. Usa el email con el que pagaste.');
    } else {
      setError('Algo salió mal. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-xl">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Activar Pro
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Ingresa el email que usaste al pagar para activar tu acceso Pro en este dispositivo.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
              />
            </div>

            {showPin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Código de acceso
                </label>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="••••••"
                  required
                  autoFocus
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6366F1] text-sm"
                />
              </div>
            )}

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl font-semibold text-sm bg-[#6366F1] text-white hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verificando...' : 'Activar'}
            </button>
          </form>

          <p className="text-xs text-slate-400 mt-4 text-center">
            ¿Aún no tienes Pro?{' '}
            <a href="/pricing" className="text-[#6366F1] hover:underline">Ver planes</a>
          </p>
        </div>
      </div>
    </div>
  );
}
