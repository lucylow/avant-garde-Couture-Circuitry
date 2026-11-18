'use client'

import type { Led } from '@/lib/circuit'
import { cn } from '@/lib/utils'

type Props = {
  leds: Led[]
  fabric: string
  lit: boolean
  onPlace?: (led: Led) => void
  className?: string
}

export function GownCanvas({ leds, fabric, lit, onPlace, className }: Props) {
  const interactive = Boolean(onPlace)
  return (
    <svg
      viewBox="0 0 200 300"
      role="img"
      aria-label={`Vêtement — gown with ${leds.length} LEDs placed.${interactive ? ' Click to place an LED.' : ''}`}
      className={cn('mx-auto max-h-[70vh] w-full', interactive && 'cursor-crosshair', className)}
      onClick={(e) => {
        if (!onPlace) return
        const m = e.currentTarget.getScreenCTM()
        if (!m) return
        const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse())
        onPlace({ x: p.x, y: p.y })
      }}
    >
      <defs>
        <linearGradient id="silk" x1="0" x2="1">
          <stop offset="0" stopColor={fabric} />
          <stop offset="0.5" stopColor="white" stopOpacity="0.45" />
          <stop offset="1" stopColor={fabric} />
        </linearGradient>
      </defs>
      <path
        d="M80 30 Q100 22 120 30 L130 90 Q160 190 182 285 Q100 300 18 285 Q40 190 70 90 Z"
        fill={fabric}
        stroke="var(--obsidian)"
        strokeOpacity="0.55"
        strokeWidth="1"
      />
      <path d="M70 90 Q100 100 130 90 Q160 190 182 285 Q100 300 18 285 Q40 190 70 90" fill="url(#silk)" opacity="0.55" />
      <path d="M70 92 Q100 104 130 92" stroke="var(--gold)" strokeWidth="3" fill="none" />
      <path d="M72 96 Q100 108 128 96" stroke="var(--gold)" strokeWidth="0.6" strokeDasharray="2 2" fill="none" />
      <path d="M22 280 Q100 294 178 280" stroke="var(--gold)" strokeWidth="0.6" strokeDasharray="2 2" fill="none" />
      {[60, 100, 140].map((x) => (
        <path
          key={x}
          d={`M${x} 110 Q${x + (x - 100) * 0.5} 200 ${x + (x - 100)} 285`}
          stroke="var(--obsidian)"
          strokeOpacity="0.18"
          strokeDasharray="3 2"
          fill="none"
        />
      ))}
      <rect x="91" y="36" width="18" height="10" rx="1" fill="var(--obsidian)" />
      <text x="100" y="43.5" fontSize="5.5" textAnchor="middle" fill="var(--champagne)" fontFamily="var(--font-mono)">
        3.7V
      </text>
      {leds.map((l, i) => (
        <path
          key={`w${i}`}
          d={`M100 46 Q${(100 + l.x) / 2} ${l.y - 20} ${l.x} ${l.y}`}
          fill="none"
          strokeWidth="0.9"
          strokeDasharray="2 2"
          stroke={lit ? 'var(--cyan)' : 'var(--gold)'}
          strokeOpacity={lit ? 0.9 : 0.75}
        />
      ))}
      {leds.map((l, i) => (
        <circle
          key={i}
          cx={l.x}
          cy={l.y}
          r={lit ? 4.5 : 2.8}
          fill={lit ? 'var(--glow)' : 'var(--parisian)'}
          stroke={lit ? 'white' : 'var(--obsidian)'}
          strokeWidth="0.6"
          style={lit ? { filter: 'drop-shadow(0 0 4px #fbe7b0) drop-shadow(0 0 8px #55d9e8)' } : undefined}
        />
      ))}
    </svg>
  )
}
