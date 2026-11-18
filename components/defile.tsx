'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { GownCanvas } from '@/components/gown-canvas'
import { PageHeading } from '@/components/editorial'
import { FABRICS, juryScores } from '@/lib/circuit'
import { useMaison } from '@/lib/maison-store'

const JURY = [
  ['design', 'Création', 'Fashion design'],
  ['craftsmanship', 'Savoir-faire', 'Craftsmanship'],
  ['engineering', 'Ingénierie', 'Engineering'],
  ['electrical', 'Fonctionnement', 'Electrical functionality'],
  ['creativity', 'Créativité', 'Creativity'],
] as const

export function Defile() {
  const m = useMaison()
  const a = m.analysis
  const scores = juryScores(m.leds, a)
  const presentable = m.lit

  return (
    <div className="bg-[radial-gradient(ellipse_at_top,#3d1424_0%,#19171A_65%)] text-background">
      <div className="mx-auto max-w-6xl px-4 pb-16 md:px-8">
        <PageHeading
          dark
          eyebrow="Présentation de la collection"
          title="LE DÉFILÉ"
          subtitle="La scène appartient à la création."
        />

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_380px]">
          <section aria-label="Runway" className="relative overflow-hidden border border-white/10 px-4 pb-10 pt-6">
            <div className="pointer-events-none absolute inset-0 flex justify-around" aria-hidden>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-full w-1/4 bg-[linear-gradient(180deg,rgba(230,210,180,0.35),transparent_75%)] blur-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: presentable ? 1 : 0.15 }}
                  transition={{ duration: 0.8, delay: presentable ? i * 0.35 : 0 }}
                />
              ))}
            </div>
            <div className="relative flex items-center justify-between">
              <p className="eyebrow text-champagne">Look numéro {String(m.job + 1).padStart(2, '0')}</p>
              <p className="eyebrow text-parisian">Création originale</p>
            </div>
            <motion.div
              className="relative mx-auto max-w-sm py-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <GownCanvas leds={m.leds} fabric={FABRICS[m.fabric].color} lit={m.lit} />
            </motion.div>
            <div className="relative mx-auto h-2 max-w-md bg-[radial-gradient(ellipse,rgba(230,210,180,0.4),transparent_70%)]" />
          </section>

          <aside className="space-y-6">
            <div className="border border-white/10 p-5">
              <p className="eyebrow text-champagne">Détails techniques</p>
              <dl className="mt-3 grid grid-cols-2 gap-3 font-mono text-sm">
                <div>
                  <dt className="text-[0.6rem] uppercase tracking-[0.2em] text-parisian">Tissu</dt>
                  <dd>{FABRICS[m.fabric].name}</dd>
                </div>
                <div>
                  <dt className="text-[0.6rem] uppercase tracking-[0.2em] text-parisian">Diodes</dt>
                  <dd>{m.leds.length}</dd>
                </div>
                <div>
                  <dt className="text-[0.6rem] uppercase tracking-[0.2em] text-parisian">Courant</dt>
                  <dd>{a.ma.toFixed(1)} mA</dd>
                </div>
                <div>
                  <dt className="text-[0.6rem] uppercase tracking-[0.2em] text-parisian">Autonomie</dt>
                  <dd>{a.hours.toFixed(1)} h</dd>
                </div>
              </dl>
            </div>

            {!presentable ? (
              <div className="space-y-3 border border-rose/50 p-5">
                <p className="font-display text-2xl text-rose">Présentation suspendue</p>
                <p className="text-sm text-parisian">
                  {a.ok
                    ? 'The circuit is valid but powered off. Simulate it in the Atelier or Laboratoire to light the runway.'
                    : `The circuit is not electrically valid — ${a.status}`}
                </p>
                <Link href="/atelier" className="eyebrow inline-block text-champagne underline-offset-4 hover:underline">
                  {"Retour à l'Atelier →"}
                </Link>
              </div>
            ) : (
              <div className="space-y-4 border border-gold/60 p-5">
                <p className="eyebrow text-champagne">Évaluation du jury</p>
                <ul className="space-y-3">
                  {JURY.map(([key, fr, en], i) => (
                    <li key={key}>
                      <div className="flex justify-between text-sm">
                        <span>
                          <span className="font-display text-lg">{fr}</span>{' '}
                          <span className="text-xs text-parisian">{en}</span>
                        </span>
                        <span className="font-mono">{scores[key]}</span>
                      </div>
                      <div className="mt-1 h-px bg-white/10">
                        <motion.div
                          className="h-px bg-champagne"
                          initial={{ width: 0 }}
                          animate={{ width: `${scores[key]}%` }}
                          transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="flex items-baseline justify-between border-t border-white/10 pt-3">
                  <span className="eyebrow text-parisian">Note du défilé</span>
                  <span className="font-display text-4xl">{a.score}/100</span>
                </p>
                {a.briefOk ? (
                  <button
                    type="button"
                    onClick={m.deliver}
                    className="eyebrow w-full rounded-sm bg-champagne py-3 text-obsidian hover:opacity-90"
                  >
                    Collection terminée · Deliver to {m.currentJob.client} (+{a.score * 2})
                  </button>
                ) : (
                  <p className="text-sm text-rose">{"Doesn't match the brief yet."}</p>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
