'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { GownCanvas } from '@/components/gown-canvas'
import { StylistPanel } from '@/components/stylist-panel'
import { LabControls } from '@/components/lab-controls'
import { GarmentLabel, PageHeading } from '@/components/editorial'
import { FABRICS } from '@/lib/circuit'
import { useMaison } from '@/lib/maison-store'
import { cn } from '@/lib/utils'

function Step({ n, fr, en }: { n: string; fr: string; en: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-mono text-xs text-gold">{n}</span>
      <h2 className="flex flex-col">
        <span className="eyebrow text-foreground">{fr}</span>
        <span className="text-xs text-muted-foreground">{en}</span>
      </h2>
    </div>
  )
}

export function Atelier() {
  const m = useMaison()
  const { currentJob: J, analysis: a } = m

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <PageHeading eyebrow="Maison Avant-Garde · Studio de création" title="L'ATELIER" subtitle="L'art de créer." />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section aria-labelledby="apercu" className="border border-border bg-card p-4 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p id="apercu" className="eyebrow text-primary">
                Aperçu du vêtement
              </p>
              <p className="text-sm text-muted-foreground">
                Garment preview — click the gown to place LEDs (parallel circuit, 3.7V battery).
              </p>
            </div>
            <GarmentLabel piece={m.job + 1} className="hidden sm:inline-flex" />
          </div>
          <motion.div
            key={m.fabric}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="py-6"
          >
            <GownCanvas leds={m.leds} fabric={FABRICS[m.fabric].color} lit={m.lit} onPlace={m.placeLed} />
          </motion.div>
        </section>

        <aside className="flex flex-col gap-6">
          <div className="border border-border bg-card p-5">
            <p className="eyebrow text-muted-foreground">
              Commande Nº {m.job + 1} · {m.credits} Atelier Credits
            </p>
            <p className="mt-2 font-display text-2xl">{J.client}</p>
            <p className="font-display text-lg italic text-muted-foreground">{J.briefFr}</p>
            <p className="text-sm">{J.brief}</p>
            <p className="mt-2 font-mono text-xs text-primary">
              {J.min}–{J.max} LEDs{J.hours ? ` · ${J.hours}h+ battery` : ''}
            </p>
          </div>

          <div className="space-y-4 border border-border bg-card p-5">
            <Step n="01" fr="Choisir un tissu" en="Choose a fabric" />
            <div className="grid grid-cols-3 gap-2" role="group" aria-label="Tissu — fabric">
              {FABRICS.map((f, i) => (
                <button
                  key={f.name}
                  type="button"
                  aria-pressed={m.fabric === i}
                  onClick={() => m.setFabric(i)}
                  className={cn(
                    'flex flex-col items-start gap-1.5 border p-1.5 text-left transition-colors',
                    m.fabric === i ? 'border-primary' : 'border-border hover:border-gold',
                  )}
                >
                  <span className="h-8 w-full" style={{ background: f.color }} aria-hidden />
                  <span className="text-[0.65rem] leading-tight">
                    <span className="block font-medium">{f.name}</span>
                    <span className="text-muted-foreground">{f.en}</span>
                  </span>
                </button>
              ))}
            </div>
            <div className="stitch" aria-hidden />
            <Step n="02" fr="Ajouter des détails" en="Broderie lumineuse — LED embroidery" />
            <StylistPanel onSuggest={(r) => m.applySuggestion(r)} />
          </div>

          <div className="space-y-4 bg-obsidian p-5 text-background">
            <div className="flex items-baseline justify-between">
              <Step n="03" fr="Personnaliser le circuit" en="Tune the circuit" />
              <Link href="/laboratoire" className="text-xs text-cyan underline-offset-4 hover:underline">
                Laboratoire →
              </Link>
            </div>
            <LabControls />
          </div>

          {m.lit && (
            <div className="space-y-3 border border-gold bg-card p-5">
              <p className="eyebrow text-primary">Évaluation · Runway score</p>
              <p className="font-display text-4xl">{a.score}/100</p>
              {a.briefOk ? (
                <>
                  <button
                    type="button"
                    onClick={m.deliver}
                    className="eyebrow w-full rounded-sm bg-primary py-3 text-primary-foreground hover:opacity-90"
                  >
                    Enregistrer la création · Deliver (+{a.score * 2})
                  </button>
                  <Link
                    href="/defile"
                    className="eyebrow block text-center text-primary underline-offset-4 hover:underline"
                  >
                    Présenter au Défilé →
                  </Link>
                </>
              ) : (
                <p className="text-sm text-destructive">{"Doesn't match the brief yet."}</p>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
