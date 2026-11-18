import type { Metadata } from 'next'
import { Emblem } from '@/components/brand/logo'
import { PageHeading, Reveal } from '@/components/editorial'

export const metadata: Metadata = { title: "L'Histoire | AVANT-GARDE COUTURE CIRCUITRY" }

const CHAPTERS = [
  {
    fr: 'La couture',
    en: 'Couture',
    text: 'Every piece begins in the Atelier: a silhouette, a fabric, and the hand of the designer.',
  },
  {
    fr: "L'ingénierie",
    en: 'Engineering',
    text: 'In the Laboratoire, every diode is calculated. Voltage, current and resistance are part of the pattern.',
  },
  {
    fr: 'La scène',
    en: 'The stage',
    text: 'On the Défilé, only electrically sound creations may shine. Light is earned, never faked.',
  },
]

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 md:px-8">
      <PageHeading eyebrow="À propos · About" title="L'HISTOIRE" subtitle="La haute couture rencontre l'électronique." />
      <Reveal className="flex flex-col items-center gap-6 text-center">
        <Emblem className="size-16 text-primary" title="Emblème de la Maison Avant-Garde" />
        <p className="max-w-2xl font-display text-2xl leading-relaxed">
          AVANT-GARDE COUTURE CIRCUITRY is an experimental Parisian fashion house where haute couture, wearable
          electronics and electrical engineering meet.
        </p>
        <p className="max-w-2xl text-muted-foreground">
          {
            "MAISON AVANT-GARDE treats conductive thread as embroidery and LEDs as jewels. Circuits become invisible design infrastructure — and every collection tells a technological story."
          }
        </p>
      </Reveal>
      <ol className="mt-16 grid gap-8 md:grid-cols-3">
        {CHAPTERS.map((c, i) => (
          <li key={c.fr}>
            <Reveal delay={i * 0.1} className="flex flex-col gap-2 border-t border-gold pt-4">
              <span className="font-mono text-xs text-gold">Chapitre {String(i + 1).padStart(2, '0')}</span>
              <h2 className="font-display text-3xl">{c.fr}</h2>
              <p className="eyebrow text-muted-foreground">{c.en}</p>
              <p className="text-sm">{c.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  )
}
