'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { MotionConfig } from 'motion/react'
import { analyze, FABRICS, JOBS, type Analysis, type Delivery, type Job, type Led } from '@/lib/circuit'

const SAVE_KEY = 'cc-save'

type Maison = {
  leds: Led[]
  ohms: number
  on: boolean
  job: number
  credits: number
  fabric: number
  deliveries: Delivery[]
  currentJob: Job
  analysis: Analysis
  lit: boolean
  setOhms: (n: number) => void
  setFabric: (i: number) => void
  setOn: (on: boolean) => void
  placeLed: (l: Led) => void
  undo: () => void
  reset: () => void
  applySuggestion: (s: { leds: Led[]; ohms: number; fabric: number }) => void
  deliver: () => void
}

const MaisonContext = createContext<Maison | null>(null)

export function MaisonProvider({ children }: { children: ReactNode }) {
  const [leds, setLeds] = useState<Led[]>([])
  const [ohms, setOhms] = useState(100)
  const [on, setOn] = useState(false)
  const [job, setJob] = useState(0)
  const [credits, setCredits] = useState(0)
  const [fabric, setFabric] = useState(0)
  const [deliveries, setDeliveries] = useState<Delivery[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem(SAVE_KEY) || '{}')
      if (d.job != null) {
        setJob(d.job)
        setCredits(d.credits ?? 0)
      }
      if (Array.isArray(d.deliveries)) setDeliveries(d.deliveries)
      if (Array.isArray(d.leds)) setLeds(d.leds)
      if (typeof d.ohms === 'number') setOhms(d.ohms)
      if (typeof d.fabric === 'number' && FABRICS[d.fabric]) setFabric(d.fabric)
    } catch {}
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) localStorage.setItem(SAVE_KEY, JSON.stringify({ job, credits, deliveries, leds, ohms, fabric }))
  }, [job, credits, deliveries, leds, ohms, fabric, loaded])

  const currentJob = JOBS[job % JOBS.length]
  const analysis = analyze(leds, ohms, currentJob)
  const lit = on && analysis.ok

  const value = useMemo<Maison>(
    () => ({
      leds,
      ohms,
      on,
      job,
      credits,
      fabric,
      deliveries,
      currentJob,
      analysis,
      lit,
      setOhms,
      setFabric,
      setOn,
      placeLed: (l) => setLeds((prev) => [...prev, l]),
      undo: () => setLeds((prev) => prev.slice(0, -1)),
      reset: () => {
        setLeds([])
        setOn(false)
      },
      applySuggestion: (s) => {
        setLeds(s.leds)
        setOhms(s.ohms)
        setFabric(s.fabric)
        setOn(false)
      },
      deliver: () => {
        if (!lit || !analysis.briefOk) return
        setCredits((c) => c + analysis.score * 2)
        setDeliveries((d) => [
          ...d,
          {
            job,
            client: currentJob.client,
            score: analysis.score,
            leds: leds.length,
            hours: Math.round(analysis.hours * 10) / 10,
            fabric,
          },
        ])
        setJob((j) => j + 1)
        setLeds([])
        setOn(false)
      },
    }),
    [leds, ohms, on, job, credits, fabric, deliveries, currentJob, analysis, lit],
  )

  return (
    <MaisonContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </MaisonContext.Provider>
  )
}

export function useMaison() {
  const ctx = useContext(MaisonContext)
  if (!ctx) throw new Error('useMaison must be used within MaisonProvider')
  return ctx
}
