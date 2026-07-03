'use client';

import { useState } from 'react';
import { Locale } from '@/lib/i18n';
import { useLocalizedContent } from '@/lib/useLocalizedContent';

function getStats(text: string) {
  const trimmed = text.trim();
  const words = trimmed === '' ? 0 : trimmed.split(/\s+/).length;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const lines = text === '' ? 0 : text.split('\n').length;
  const sentences = trimmed === '' ? 0 : (trimmed.match(/[.!?]+/g) ?? []).length;
  const paragraphs = trimmed === '' ? 0 : trimmed.split(/\n\s*\n/).filter(Boolean).length || (trimmed ? 1 : 0);
  const readingTime = Math.max(1, Math.ceil(words / 200));
  return { words, chars, charsNoSpaces, lines, sentences, paragraphs, readingTime };
}

interface WordCounterContent {
  heroTitle: string;
  heroSubtitle: string;
  statLabels: { words: string; chars: string; charsNoSpaces: string; sentences: string; paragraphs: string; lines: string };
  readingTimePrefix: string;
  readingTimeSuffix: string;
  placeholder: string;
  charactersWord: string;
  clearButton: string;
  features: { icon: string; title: string; description: string }[];
}

const content: Partial<Record<Locale, WordCounterContent>> = {
  en: {
    heroTitle: 'Word Counter — Free',
    heroSubtitle: 'Paste or type your text below. Word count, character count, and reading time update in real time.',
    statLabels: { words: 'Words', chars: 'Characters', charsNoSpaces: 'No spaces', sentences: 'Sentences', paragraphs: 'Paragraphs', lines: 'Lines' },
    readingTimePrefix: 'Reading time:',
    readingTimeSuffix: 'at 200 words/min',
    placeholder: 'Type or paste your text here…',
    charactersWord: 'characters',
    clearButton: 'Clear',
    features: [
      { icon: '📊', title: 'Real-time stats', description: 'All counters update instantly as you type. No button to press.' },
      { icon: '⏱️', title: 'Reading time', description: 'Estimated at 200 words/minute, a standard average reading speed.' },
      { icon: '🔒', title: 'Fully private', description: 'Everything runs in your browser. Your text never leaves your device.' },
    ],
  },
  es: {
    heroTitle: 'Contador de Palabras — Gratis',
    heroSubtitle: 'Pega o escribe tu texto abajo. El conteo de palabras, caracteres y tiempo de lectura se actualiza en tiempo real.',
    statLabels: { words: 'Palabras', chars: 'Caracteres', charsNoSpaces: 'Sin espacios', sentences: 'Frases', paragraphs: 'Párrafos', lines: 'Líneas' },
    readingTimePrefix: 'Tiempo de lectura:',
    readingTimeSuffix: 'a 200 palabras/min',
    placeholder: 'Escribe o pega tu texto aquí…',
    charactersWord: 'caracteres',
    clearButton: 'Limpiar',
    features: [
      { icon: '📊', title: 'Estadísticas en tiempo real', description: 'Todos los contadores se actualizan al instante mientras escribes. Sin botones que pulsar.' },
      { icon: '⏱️', title: 'Tiempo de lectura', description: 'Estimado a 200 palabras por minuto, una velocidad de lectura media estándar.' },
      { icon: '🔒', title: 'Totalmente privado', description: 'Todo ocurre en tu navegador. Tu texto nunca sale de tu dispositivo.' },
    ],
  },
};

export default function WordCounterTool() {
  const c = useLocalizedContent(content);
  const [text, setText] = useState('');
  const stats = getStats(text);

  const STAT_CARDS = [
    { key: 'words' as const, label: c.statLabels.words },
    { key: 'chars' as const, label: c.statLabels.chars },
    { key: 'charsNoSpaces' as const, label: c.statLabels.charsNoSpaces },
    { key: 'sentences' as const, label: c.statLabels.sentences },
    { key: 'paragraphs' as const, label: c.statLabels.paragraphs },
    { key: 'lines' as const, label: c.statLabels.lines },
  ];

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
          {c.heroTitle}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          {c.heroSubtitle}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-5">
        {STAT_CARDS.map(({ key, label }) => (
          <div
            key={key}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-center"
          >
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
              {stats[key].toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Reading time */}
      <div className="mb-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <span>⏱️</span>
        <span>
          {c.readingTimePrefix} <span className="font-semibold text-slate-700 dark:text-slate-300">~{stats.readingTime} min</span>
          {' '}{c.readingTimeSuffix}
        </span>
      </div>

      {/* Textarea */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={c.placeholder}
        className="w-full h-72 rounded-2xl border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
      />

      <div className="mt-3 flex justify-between items-center text-xs text-slate-400">
        <span>{stats.chars.toLocaleString()} {c.charactersWord}</span>
        <button
          onClick={() => setText('')}
          className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          {c.clearButton}
        </button>
      </div>

      <section className="mt-12 grid sm:grid-cols-3 gap-6 text-sm">
        {c.features.map((f, i) => (
          <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
            <div className="text-2xl mb-2">{f.icon}</div>
            <h2 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{f.title}</h2>
            <p className="text-slate-500 dark:text-slate-400">{f.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
