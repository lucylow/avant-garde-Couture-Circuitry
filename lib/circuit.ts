export type Led = { x: number; y: number }

export type Job = { client: string; brief: string; min: number; max: number; hours?: number }

export const JOBS: Job[] = [
  { client: 'Sora', brief: 'A soft glowing gala gown', min: 3, max: 6 },
  { client: 'Julian', brief: 'Starlit runway piece', min: 7, max: 12 },
  { client: 'Celeste', brief: 'Long-lasting evening glow (8h+)', min: 2, max: 5, hours: 8 },
]

export const FABRICS = [
  { name: 'Lilac', color: 'oklch(0.82 0.08 300)' },
  { name: 'Rose', color: 'oklch(0.85 0.09 350)' },
  { name: 'Sky', color: 'oklch(0.86 0.07 200)' },
  { name: 'Champagne', color: 'oklch(0.9 0.08 90)' },
]

export const BATTERY_V = 3.7
export const LED_V = 2.0
export const LED_MA = 20
export const BATTERY_MAH = 500
