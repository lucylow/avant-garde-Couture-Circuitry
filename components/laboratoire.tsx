'use client'

import Link from 'next/link'
import { LabControls } from '@/components/lab-controls'
import { PageHeading, Reveal } from '@/components/editorial'
import { BATTERY_MAH, BATTERY_V, LED_MA, LED_V, THREAD_OHMS_PER_FT } from '@/lib/circuit'
import { useMaison } from '@/lib/maison-store'
import { cn } from '@/lib/utils'

const COMPONENTS = [
  { fr: 'Batterie', en: 'Battery — LiPo cell', spec: `${BATTERY_V}V · ${BATTERY_MAH}mAh` },
  { fr: 'Diode électroluminescente', en: 'LED — sewable', spec: `${LED_V}V · ${LED_MA}mA` },
  { fr: 'Fil conducteur', en: 'Conductive thread — steel', spec: `~${THREAD_OHMS_PER_FT}Ω/ft` },
  { fr: 'Résistance', en: 'Resistor', spec: 'adjustable 20–500Ω' },
]

function Schematic({ count, lit }: { count: number; lit: boolean }) {
  const n = Math.min(count, 8)
  const wire = lit ? 'var(--cyan)' : 'var(--parisian)'
  return (
    <svg viewBox="0 0 320 140" className="w-full" role="img" aria-label={`Parallel circuit diagram with ${count} LEDs`}>
      <line x1="20" y1="30" x2="300" y2="30" stroke={wire} strokeWidth="1.5" />
      <line x1="20" y1="110" x2="300" y2="110" stroke={wire} strokeWidth="1.5" />
      <line x1="20" y1="30" x2="20" y2="56" stroke={wire} strokeWidth="1.5" />
      <line x1="20" y1="84" x2="20" y2="110" stroke={wire} strokeWidth="1.5" />
      <line x1="8" y1="56" x2="32" y2="56" stroke="var(--champagne)" strokeWidth="2" />
      <line x1="13" y1="84" x2="27" y2="84" stroke="var(--champagne)" strokeWidth="2" />
      <text x="38" y="74" fontSize="9" fill="var(--parisian)" fontFamily="var(--font-mono)">
        {BATTERY_V}V
      </text>
      {Array.from({ length: n }).map((_, i) => {
        const x = 80 + i * (210 / Math.max(n - 1, 1)) * (n > 1 ? 1 : 0)
        return (
          <g key={i}>
            <line x1={x} y1="30" x2={x} y2="50" stroke={wire} strokeWidth="1" />
            <rect x={x - 4} y="50" width="8" height="18" fill="none" stroke="var(--champagne)" />
            <line x1={x} y1="68" x2={x} y2="80" stroke={wire} strokeWidth="1" />
            <path d={`M${x - 6} 80 L${x + 6} 80 L${x} 90 Z`} fill={lit ? 'var(--glow)' : 'none'} stroke="var(--champagne)" />
            <line x1={x - 6} y1="90" x2={x + 6} y2="90" stroke="var(--champagne)" />
            <line x1={x} y1="90" x2={x} y2="110" stroke={wire} strokeWidth="1" />
          </g>
        )
      })}
      {count === 0 && (
        <text x="180" y="74" fontSize="10" textAnchor="middle" fill="var(--parisian)">
          Aucune diode — place LEDs in the Atelier
        </text>
      )}
      {count > 8 && (
        <text x="300" y="130" fontSize="9" textAnchor="end" fill="var(--parisian)" fontFamily="var(--font-mono)">
          +{count - 8} more branches
        </text>
      )}
    </svg>
  )
}

export function Laboratoire() {
  const { leds, ohms, lit, analysis: a, currentJob } = useMaison()
  const n = leds.length
  const drop = BATTERY_V - LED_V
  const seriesV = n * LED_V
  const seriesOk = n > 0 && seriesV < BATTERY_V
  const threadFt = leds.reduce((s, l) => s + Math.hypot(l.x - 100, l.y - 46), 0) / 60

  return (
    <div className="bg-[linear-gradient(180deg,#19171A_0%,#2a1520_60%,#19171A_100%)] text-background">
      <div className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
        <PageHeading
          dark
          eyebrow="Département de recherche · Engineering lab"
          title="LE LABORATOIRE"
          subtitle="La science au service de la création."
        />

        <Reveal>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {COMPONENTS.map((c) => (
              <li key={c.fr} className="border border-white/10 bg-white/[0.03] p-4">
                <p className="font-display text-xl">{c.fr}</p>
                <p className="text-xs uppercase tracking-[0.15em] text-parisian">{c.en}</p>
                <p className="mt-3 font-mono text-sm text-cyan">{c.spec}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <Reveal className="border border-white/10 p-5">
              <p className="eyebrow text-champagne">Circuit électrique · Electrical circuit</p>
              <p className="mb-4 text-xs text-parisian">Parallel — each LED branch gets the full battery voltage.</p>
              <Schematic count={n} lit={lit} />
            </Reveal>

            <Reveal className="grid gap-4 md:grid-cols-2">
              <div className="border border-white/10 p-5">
                <p className="eyebrow text-champagne">{"Loi d'Ohm · Ohm's law"}</p>
                <dl className="mt-4 space-y-2 font-mono text-sm">
                  <div className="flex justify-between">
                    <dt className="text-parisian">Tension · V drop</dt>
                    <dd>
                      {BATTERY_V} − {LED_V} = {drop.toFixed(1)}V
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-parisian">Courant · I = V/R</dt>
                    <dd>
                      {drop.toFixed(1)}/{ohms} = {a.ma.toFixed(1)}mA
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-parisian">Puissance · P</dt>
                    <dd>{a.powerMw.toFixed(0)} mW</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-parisian">Fil · thread</dt>
                    <dd>
                      ~{threadFt.toFixed(1)} ft · {(threadFt * THREAD_OHMS_PER_FT).toFixed(0)}Ω
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="border border-white/10 p-5">
                <p className="eyebrow text-champagne">Série vs Parallèle · Series vs parallel</p>
                <div className="mt-4 space-y-3 text-sm">
                  <p>
                    <span className="font-display text-lg">Série</span>
                    <br />
                    <span className="font-mono text-xs text-parisian">
                      needs {seriesV.toFixed(1)}V for {n} LEDs —{' '}
                      <span className={seriesOk ? 'text-cyan' : 'text-rose'}>
                        {n === 0 ? '—' : seriesOk ? 'possible' : `exceeds ${BATTERY_V}V`}
                      </span>
                    </span>
                  </p>
                  <p>
                    <span className="font-display text-lg">Parallèle</span>
                    <br />
                    <span className="font-mono text-xs text-parisian">
                      {BATTERY_V}V per branch · {a.total.toFixed(0)}mA shared draw
                    </span>
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal className="border border-white/10 p-5">
              <p className="eyebrow text-champagne">{"Rapport d'ingénierie · Engineering report"}</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className={cn(n > 0 ? 'text-cyan' : 'text-rose')}>
                  {n > 0 ? '✓' : '✕'} Diodes posées — {n} LEDs placed
                </li>
                <li className={cn(!a.tooHigh ? 'text-cyan' : 'text-rose')}>
                  {!a.tooHigh ? '✓' : '✕'} Courant sous 30mA — current safe for LEDs
                </li>
                <li className={cn(!a.tooLow ? 'text-cyan' : 'text-rose')}>
                  {!a.tooLow ? '✓' : '✕'} Courant au-dessus de 5mA — visible brightness
                </li>
                <li className={cn(a.briefOk ? 'text-cyan' : 'text-parisian')}>
                  {a.briefOk ? '✓' : '○'} Commande de {currentJob.client} — brief ({currentJob.min}–{currentJob.max}{' '}
                  LEDs{currentJob.hours ? `, ${currentJob.hours}h+` : ''})
                </li>
              </ul>
            </Reveal>
          </div>

          <aside className="h-fit space-y-4 border border-cyan/30 bg-white/[0.02] p-5 lg:sticky lg:top-24">
            <p className="eyebrow text-cyan">Polarité & réglages · Controls</p>
            <LabControls />
            <Link
              href="/atelier"
              className="eyebrow block border border-white/20 py-2.5 text-center hover:border-champagne"
            >
              {"Retour à l'Atelier"}
            </Link>
          </aside>
        </div>
      </div>
    </div>
  )
}
