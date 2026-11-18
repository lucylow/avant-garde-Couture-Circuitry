'use client'

import type { Led } from '@/lib/circuit'

type Props = {
  leds: Led[]
  fabric: string
  lit: boolean
  onPlace: (led: Led) => void
}

export function GownCanvas({ leds, fabric, lit, onPlace }: Props) {
  return (
    <svg
      viewBox="0 0 200 300"
      role="img"
      aria-label={`Gown with ${leds.length} LEDs placed. Click to place an LED.`}
      className="mx-auto w-full max-h-[70vh] cursor-crosshair"
      onClick={(e) => {
        const m = e.currentTarget.getScreenCTM()
        if (!m) return
        const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse())
        onPlace({ x: p.x, y: p.y })
      }}
    >
      <defs>
        <linearGradient id="silk" x1="0" x2="1">
          <stop offset="0" stopColor={fabric} />
          <stop offset="0.5" stopColor="white" stopOpacity="0.5" />
          <stop offset="1" stopColor={fabric} />
        </linearGradient>
      </defs>
      <path
        d="M80 30 Q100 22 120 30 L130 90 Q160 190 182 285 Q100 300 18 285 Q40 190 70 90 Z"
        fill={fabric}
        className="stroke-primary"
        strokeWidth="2"
      />
      <path d="M70 90 Q100 100 130 90 Q160 190 182 285 Q100 300 18 285 Q40 190 70 90" fill="url(#silk)" opacity="0.6" />
      <path d="M70 92 Q100 104 130 92" className="stroke-primary" strokeWidth="4" fill="none" />
      {[60, 100, 140].map((x) => (
        <path
          key={x}
          d={`M${x} 110 Q${x + (x - 100) * 0.5} 200 ${x + (x - 100)} 285`}
          className="stroke-primary"
          strokeOpacity="0.25"
          fill="none"
        />
      ))}
      <rect x="91" y="36" width="18" height="10" rx="2" className="fill-foreground" />
      <text x="100" y="44" fontSize="6" textAnchor="middle" className="fill-background">
        3.7V
      </text>
      {leds.map((l, i) => (
        <path
          key={`w${i}`}
          d={`M100 46 Q${(100 + l.x) / 2} ${l.y - 20} ${l.x} ${l.y}`}
          fill="none"
          strokeWidth="1"
          strokeDasharray="2 2"
          className={lit ? 'stroke-glow' : 'stroke-muted-foreground'}
        />
      ))}
      {leds.map((l, i) => (
        <circle
          key={i}
          cx={l.x}
          cy={l.y}
          r={lit ? 5 : 3}
          className={lit ? 'fill-glow' : 'fill-muted-foreground'}
          style={lit ? { filter: 'drop-shadow(0 0 4px gold)' } : undefined}
        />
      ))}
    </svg>
  )
}
