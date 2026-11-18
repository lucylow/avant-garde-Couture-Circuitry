'use client'

import { useEffect, useState } from 'react'
import { GownCanvas } from '@/components/gown-canvas'
import { StylistPanel } from '@/components/stylist-panel'
import { BATTERY_MAH, BATTERY_V, FABRICS, JOBS, LED_MA, LED_V, type Led } from '@/lib/circuit'

const SAVE_KEY = 'cc-save'

export function Atelier() {
  const [leds, setLeds] = useState<Led[]>([])
  const [ohms, setOhms] = useState(100)
  const [on, setOn] = useState(false)
  const [job, setJob] = useState(0)
  const [credits, setCredits] = useState(0)
  const [fabric, setFabric] = useState(FABRICS[0].color)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem(SAVE_KEY) || '{}')
      if (d.job != null) {
        setJob(d.job)
        setCredits(d.credits ?? 0)
      }
    } catch {}
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) localStorage.setItem(SAVE_KEY, JSON.stringify({ job, credits }))
  }, [job, credits, loaded])

  const J = JOBS[job % JOBS.length]
  const ma = ((BATTERY_V - LED_V) / ohms) * 1000
  const total = ma * leds.length
  const hours = total ? BATTERY_MAH / total : 0
  const ok = leds.length > 0 && ma >= 5 && ma <= 30
  const lit = on && ok
  const briefOk = ok && leds.length >= J.min && leds.length <= J.max && hours >= (J.hours ?? 0)
  const score = ok ? Math.min(100, 50 + leds.length * 6 + Math.round(hours)) : 0
  const status = !leds.length
    ? 'Place LEDs on the gown'
    : ma > 30
      ? 'Too much current — LEDs will burn out. Raise the resistor.'
      : ma < 5
        ? 'Too dim — lower the resistor.'
        : 'Circuit balanced ✓'

  const deliver = () => {
    setCredits(credits + score * 2)
    setJob(job + 1)
    setLeds([])
    setOn(false)
  }

  return (
    <main className="mx-auto grid min-h-screen max-w-5xl gap-6 p-6 md:grid-cols-[1fr_320px]">
      <section className="rounded-2xl border bg-card p-4">
        <h1 className="font-display text-4xl">Couture Circuitry</h1>
        <p className="mb-2 text-sm text-muted-foreground">
          Click the gown to place LEDs (parallel circuit, 3.7V battery).
        </p>
        <GownCanvas leds={leds} fabric={fabric} lit={lit} onPlace={(l) => setLeds([...leds, l])} />
      </section>

      <aside className="space-y-3 rounded-2xl border bg-card p-4 text-sm">
        <div className="rounded-xl bg-muted p-3">
          <p className="text-xs text-muted-foreground">
            Commission #{job + 1} · {credits} Atelier Credits
          </p>
          <p className="font-semibold">
            {J.client}: {J.brief}
          </p>
          <p className="text-xs">
            Needs {J.min}–{J.max} LEDs{J.hours ? `, ${J.hours}h battery` : ''}
          </p>
        </div>

        <div className="flex gap-2" role="group" aria-label="Fabric colour">
          {FABRICS.map((f) => (
            <button
              key={f.color}
              type="button"
              aria-label={f.name}
              aria-pressed={fabric === f.color}
              onClick={() => setFabric(f.color)}
              className={`h-7 w-7 rounded-full border-2 ${fabric === f.color ? 'border-primary' : 'border-border'}`}
              style={{ background: f.color }}
            />
          ))}
        </div>

        <StylistPanel
          onSuggest={(r) => {
            setLeds(r.leds)
            setOhms(r.ohms)
            setFabric(FABRICS[r.fabric].color)
            setOn(false)
          }}
        />

        <h2 className="font-display text-2xl">Engineering Lab</h2>
        <ul className="grid grid-cols-2 gap-1 text-xs">
          {[
            ['LiPo cell', '3.7V · 500mAh'],
            ['Sewable LED', '2.0V · 20mA'],
            ['Steel thread', '~14Ω/ft'],
            ['Resistor', `${ohms}Ω`],
          ].map(([n, v]) => (
            <li key={n} className="rounded-md border p-1.5">
              <b>{n}</b>
              <br />
              <span className="text-muted-foreground">{v}</span>
            </li>
          ))}
        </ul>

        <label className="block">
          Resistor: {ohms}Ω
          <input
            type="range"
            min={20}
            max={500}
            step={10}
            value={ohms}
            onChange={(e) => setOhms(+e.target.value)}
            className="w-full accent-primary"
          />
        </label>

        <p>
          LEDs: {leds.length} · Per LED: {ma.toFixed(1)} mA (limit {LED_MA})
        </p>
        <p>
          Total: {total.toFixed(0)} mA · Battery: {hours.toFixed(1)} h
        </p>
        <p className={ok ? 'font-semibold text-primary' : 'text-destructive'} aria-live="polite">
          {status}
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setOn(!on)}
            className="flex-1 rounded-lg bg-primary py-2 text-primary-foreground"
          >
            {on ? 'Power off' : 'Simulate'}
          </button>
          <button type="button" onClick={() => setLeds(leds.slice(0, -1))} className="rounded-lg border px-3">
            Undo
          </button>
          <button
            type="button"
            onClick={() => {
              setLeds([])
              setOn(false)
            }}
            className="rounded-lg border px-3"
          >
            Reset
          </button>
        </div>

        {lit && <p className="font-display text-xl">Runway score: {score}/100</p>}
        {lit &&
          (briefOk ? (
            <button type="button" onClick={deliver} className="w-full rounded-lg bg-accent py-2 font-semibold">
              Deliver to {J.client} (+{score * 2} credits)
            </button>
          ) : (
            <p className="text-destructive">{"Doesn't match the brief yet."}</p>
          ))}
        <p className="text-xs text-muted-foreground">Simulation only — not a certified wearable design.</p>
      </aside>
    </main>
  )
}
