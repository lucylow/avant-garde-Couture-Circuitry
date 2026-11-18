'use server'

import { generateText, Output } from 'ai'
import { z } from 'zod'
import type { Led } from '@/lib/circuit'

export type Suggestion = { leds: Led[]; ohms: number; fabric: number; note: string; error?: string }

const schema = z.object({
  leds: z.array(z.object({ x: z.number(), y: z.number() })),
  ohms: z.number(),
  fabric: z.number(),
  note: z.string(),
})

const SYSTEM = `You are a couture wearable-tech engineer. Gown SVG is 200x300; fabric area roughly x 30-170, y 40-280 (narrow bodice near x 75-125 above y 90). Battery 3.7V, LEDs 2.0V. Resistor 60-300 ohms keeps 5-30mA per LED. Fabric index: 0 lilac, 1 rose, 2 sky, 3 champagne. Return 3-14 LEDs and a one short sentence note.`

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))

export async function suggestLayout(rawConcept: string): Promise<Suggestion> {
  const concept = String(rawConcept ?? '').slice(0, 400).trim()
  const empty = { leds: [], ohms: 100, fabric: 0, note: '' }
  if (!concept) return { ...empty, error: 'Describe a concept first.' }

  try {
    const { output } = await generateText({
      model: 'openai/gpt-6-astra',
      maxRetries: 0,
      system: SYSTEM,
      prompt: concept,
      output: Output.object({ schema }),
    })
    return {
      leds: output.leds.slice(0, 14).map((l) => ({ x: clamp(l.x, 20, 180), y: clamp(l.y, 35, 285) })),
      ohms: clamp(Math.round(output.ohms / 10) * 10 || 100, 20, 500),
      fabric: clamp(Math.round(output.fabric) || 0, 0, 3),
      note: output.note,
    }
  } catch (e) {
    console.error('stylist', e)
    const m = String((e as Error)?.message ?? '')
    return {
      ...empty,
      error: /402|credit/i.test(m)
        ? 'Out of AI credits.'
        : /429/.test(m)
          ? 'Busy — try again shortly.'
          : "The stylist couldn't answer. Try again.",
    }
  }
}
