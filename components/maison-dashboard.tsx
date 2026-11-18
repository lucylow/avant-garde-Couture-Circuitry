'use client'

import { Award } from 'lucide-react'
import { PageHeading, Reveal } from '@/components/editorial'
import { ACHIEVEMENTS, COLLECTIONS, JOBS } from '@/lib/circuit'
import { useMaison } from '@/lib/maison-store'
import { cn } from '@/lib/utils'

const TEAM = [
  { name: 'Héloïse Marchand', role: 'Première d’atelier — Head seamstress' },
  { name: 'Théo Valadier', role: 'Ingénieur textile — Textile engineer' },
  { name: 'Inès Morel', role: 'Brodeuse — Embroiderer' },
]
const PARTNERS = ['Soierie de Lyon', 'Fils Conducteurs & Cie', 'Institut Lumière Textile']

function Stat({ fr, en, value }: { fr: string; en: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-t border-gold/60 pt-3">
      <span className="eyebrow text-muted-foreground">
        {fr} <span className="normal-case tracking-normal">· {en}</span>
      </span>
      <span className="font-display text-4xl">{value}</span>
    </div>
  )
}

export function MaisonDashboard() {
  const m = useMaison()
  const progress = { job: m.job, credits: m.credits, deliveries: m.deliveries }
  const avg = m.deliveries.length ? Math.round(m.deliveries.reduce((s, d) => s + d.score, 0) / m.deliveries.length) : 0
  const reputation = Math.min(100, avg * 0.6 + m.deliveries.length * 8)
  const prestige = ['Atelier naissant', 'Maison reconnue', 'Maison prestigieuse', 'Haute Couture'][
    Math.min(3, Math.floor(m.deliveries.length / 2))
  ]
  const unlocked = COLLECTIONS.filter((c) => m.deliveries.length >= c.unlockAt).length

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <PageHeading eyebrow="Direction de la maison" title="LA MAISON" subtitle="Bâtir une maison de couture électronique." />

      <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Stat fr="Réputation" en="Reputation" value={`${Math.round(reputation)}%`} />
        <Stat fr="Trésorerie" en="Treasury" value={`${m.credits}`} />
        <Stat fr="Commandes" en="Commissions" value={`${m.deliveries.length}`} />
        <Stat fr="Collections" en="Unlocked" value={`${unlocked}/${COLLECTIONS.length}`} />
      </Reveal>
      <p className="mt-4 font-display text-xl italic text-primary">Prestige — {prestige}</p>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        <Reveal className="border border-border bg-card p-6 lg:col-span-2">
          <h2 className="eyebrow text-primary">Registre des commandes · Commission ledger</h2>
          {m.deliveries.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              No deliveries yet. Your first client, {JOBS[0].client}, is waiting in the Atelier.
            </p>
          ) : (
            <table className="mt-4 w-full text-left text-sm">
              <thead className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                <tr>
                  <th className="pb-2 font-medium">Pièce</th>
                  <th className="pb-2 font-medium">Client</th>
                  <th className="pb-2 font-medium">LEDs</th>
                  <th className="pb-2 font-medium">Autonomie</th>
                  <th className="pb-2 text-right font-medium">Note</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {m.deliveries.map((d, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="py-2">Nº {String(i + 1).padStart(3, '0')}</td>
                    <td className="py-2 font-sans">{d.client}</td>
                    <td className="py-2">{d.leds}</td>
                    <td className="py-2">{d.hours}h</td>
                    <td className="py-2 text-right">{d.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Reveal>

        <Reveal className="space-y-6 border border-border bg-card p-6">
          <div>
            <h2 className="eyebrow text-primary">Équipe · Team</h2>
            <ul className="mt-3 space-y-2">
              {TEAM.map((t) => (
                <li key={t.name}>
                  <p className="font-display text-lg">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="stitch" aria-hidden />
          <div>
            <h2 className="eyebrow text-primary">Partenaires · Partners</h2>
            <ul className="mt-3 space-y-1 text-sm">
              {PARTNERS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="stitch" aria-hidden />
          <div>
            <h2 className="eyebrow text-primary">Recherche · Research</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Next study: programmable LED patterns for Jardin Électrique.
            </p>
            <div className="mt-2 h-1 bg-muted">
              <div className="h-1 bg-primary" style={{ width: `${Math.min(100, m.deliveries.length * 20)}%` }} />
            </div>
          </div>
        </Reveal>
      </div>

      <section id="distinctions" aria-labelledby="distinctions-title" className="scroll-mt-24 pt-16">
        <h2 id="distinctions-title" className="text-center font-display text-4xl tracking-[0.06em]">
          DISTINCTIONS
        </h2>
        <p className="text-center font-display text-lg italic text-muted-foreground">Achievements of the maison</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((a) => {
            const earned = a.test(progress)
            return (
              <li
                key={a.id}
                className={cn(
                  'flex items-center gap-4 border p-4',
                  earned ? 'border-gold bg-card' : 'border-border opacity-60',
                )}
              >
                <Award className={cn('size-6 shrink-0', earned ? 'text-gold' : 'text-muted-foreground')} aria-hidden />
                <div>
                  <p className="font-display text-xl">{a.fr}</p>
                  <p className="text-xs text-muted-foreground">
                    {a.en}
                    <span className="sr-only">{earned ? ' — earned' : ' — not yet earned'}</span>
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
