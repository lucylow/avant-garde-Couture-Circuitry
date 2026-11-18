export type Led = { x: number; y: number }

export type Job = { client: string; brief: string; briefFr: string; min: number; max: number; hours?: number }

export const JOBS: Job[] = [
  { client: 'Sora', brief: 'A soft glowing gala gown', briefFr: 'Une robe de gala à la lueur douce', min: 3, max: 6 },
  { client: 'Julian', brief: 'Starlit runway piece', briefFr: 'Une pièce de défilé étoilée', min: 7, max: 12 },
  {
    client: 'Celeste',
    brief: 'Long-lasting evening glow (8h+)',
    briefFr: 'Une lueur de soirée durable',
    min: 2,
    max: 5,
    hours: 8,
  },
]

export const FABRICS = [
  { name: 'Lavande', en: 'Lavender silk', color: '#C7B8E7' },
  { name: 'Rose poudré', en: 'Dusty rose crêpe', color: '#D6A4AD' },
  { name: 'Ciel', en: 'Sky organza', color: '#A9DDE3' },
  { name: 'Champagne', en: 'Champagne satin', color: '#E6D2B4' },
  { name: 'Bordeaux', en: 'Burgundy velvet', color: '#651E36' },
  { name: 'Minuit', en: 'Midnight taffeta', color: '#2A2530' },
]

export const BATTERY_V = 3.7
export const LED_V = 2.0
export const LED_MA = 20
export const BATTERY_MAH = 500
export const THREAD_OHMS_PER_FT = 14

export type Analysis = {
  ma: number
  total: number
  hours: number
  powerMw: number
  ok: boolean
  tooHigh: boolean
  tooLow: boolean
  status: string
  statusFr: string
  score: number
  briefOk: boolean
}

export function analyze(leds: Led[], ohms: number, job: Job): Analysis {
  const ma = ((BATTERY_V - LED_V) / ohms) * 1000
  const total = ma * leds.length
  const hours = total ? BATTERY_MAH / total : 0
  const powerMw = (BATTERY_V * total) / 1
  const tooHigh = ma > 30
  const tooLow = ma < 5
  const ok = leds.length > 0 && !tooHigh && !tooLow
  const briefOk = ok && leds.length >= job.min && leds.length <= job.max && hours >= (job.hours ?? 0)
  const score = ok ? Math.min(100, 50 + leds.length * 6 + Math.round(hours)) : 0
  const [statusFr, status] = !leds.length
    ? ['Aucune diode posée', 'Place LEDs on the gown']
    : tooHigh
      ? ['Courant excessif', 'Too much current — LEDs will burn out. Raise the resistor.']
      : tooLow
        ? ['Lumière trop faible', 'Too dim — lower the resistor.']
        : ['Circuit équilibré', 'Circuit balanced']
  return { ma, total, hours, powerMw, ok, tooHigh, tooLow, status, statusFr, score, briefOk }
}

export type JuryScores = {
  design: number
  craftsmanship: number
  engineering: number
  electrical: number
  creativity: number
}

export function juryScores(leds: Led[], a: Analysis): JuryScores {
  if (!leds.length) return { design: 0, craftsmanship: 0, engineering: 0, electrical: 0, creativity: 0 }
  const xs = leds.map((l) => l.x)
  const ys = leds.map((l) => l.y)
  const spread = (Math.max(...xs) - Math.min(...xs) + (Math.max(...ys) - Math.min(...ys))) / 400
  const threadFt = leds.reduce((s, l) => s + Math.hypot(l.x - 100, l.y - 46), 0) / 60
  const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)))
  return {
    design: clamp(40 + spread * 90 + Math.min(leds.length, 10) * 2),
    craftsmanship: clamp(95 - threadFt * 4),
    engineering: a.ok ? clamp(100 - Math.abs(a.ma - 17) * 4) : clamp(20 - Math.abs(a.ma - 17)),
    electrical: a.ok ? 100 : 0,
    creativity: clamp(35 + spread * 70 + (leds.length > 6 ? 15 : 0)),
  }
}

export type Delivery = { job: number; client: string; score: number; leds: number; hours: number; fabric: number }

export const COLLECTIONS = [
  {
    numeral: 'I',
    name: 'Lumière de Paris',
    description: 'Parisian light-inspired couture.',
    image: '/images/collection-lumiere.png',
    note: 'Warm constellations embroidered on champagne satin.',
    spec: '6 LEDs · 120Ω · parallel',
    unlockAt: 0,
  },
  {
    numeral: 'II',
    name: 'Électricité Romantique',
    description: 'Romantic silhouettes with illuminated textile details.',
    image: '/images/collection-romantique.png',
    note: 'Light that breathes through layers of dusty-rose tulle.',
    spec: '8 LEDs · 150Ω · parallel',
    unlockAt: 1,
  },
  {
    numeral: 'III',
    name: 'Jardin Électrique',
    description: 'Floral couture combined with programmable LED patterns.',
    image: '/images/collection-jardin.png',
    note: 'Each embroidered bloom hides a sewable diode at its heart.',
    spec: '10 LEDs · 170Ω · parallel',
    unlockAt: 2,
  },
  {
    numeral: 'IV',
    name: 'Minuit à Paris',
    description: 'Midnight-inspired fashion with deep colours and illuminated details.',
    image: '/images/collection-minuit.png',
    note: 'Seams traced in light across burgundy velvet.',
    spec: '4 LEDs · 200Ω · 8h+ autonomy',
    unlockAt: 3,
  },
  {
    numeral: 'V',
    name: 'Futurisme',
    description: 'Experimental futuristic garments.',
    image: '/images/collection-futurisme.png',
    note: 'Architectural panels, geometric circuitry.',
    spec: '12 LEDs · 100Ω · parallel',
    unlockAt: 5,
  },
  {
    numeral: 'VI',
    name: 'Haute Technologie',
    description: 'Advanced wearable-electronics designs.',
    image: '/images/collection-haute-tech.png',
    note: 'Gold conductive thread as visible embroidery.',
    spec: '14 LEDs · 90Ω · parallel',
    unlockAt: 8,
  },
]

export type MaisonProgress = { job: number; credits: number; deliveries: Delivery[] }

export const ACHIEVEMENTS: {
  id: string
  fr: string
  en: string
  test: (p: MaisonProgress) => boolean
}[] = [
  { id: 'first', fr: 'Première Création', en: 'Deliver your first commission', test: (p) => p.deliveries.length >= 1 },
  {
    id: 'stars',
    fr: 'Constellation',
    en: 'Deliver a piece with 10 or more LEDs',
    test: (p) => p.deliveries.some((d) => d.leds >= 10),
  },
  {
    id: 'endurance',
    fr: 'Nuit Blanche',
    en: 'Deliver a piece lasting 8 hours or more',
    test: (p) => p.deliveries.some((d) => d.hours >= 8),
  },
  { id: 'clients', fr: 'Carnet Complet', en: 'Serve every client once', test: (p) => p.job >= JOBS.length },
  { id: 'treasury', fr: 'Maison Prospère', en: 'Earn 500 Atelier Credits', test: (p) => p.credits >= 500 },
  {
    id: 'perfect',
    fr: 'Ovation',
    en: 'Score 100 on the runway',
    test: (p) => p.deliveries.some((d) => d.score >= 100),
  },
]
