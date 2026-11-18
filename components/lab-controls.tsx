'use client'

import { BATTERY_MAH, LED_MA } from '@/lib/circuit'
import { useMaison } from '@/lib/maison-store'
import { cn } from '@/lib/utils'

export function Metric({ fr, en, value }: { fr: string; en: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border border-white/10 bg-white/[0.03] p-3">
      <span className="text-[0.6rem] uppercase tracking-[0.2em] text-parisian">
        {fr} <span className="opacity-60">· {en}</span>
      </span>
      <span className="font-mono text-lg text-background">{value}</span>
    </div>
  )
}

export function LabControls() {
  const { leds, ohms, setOhms, on, setOn, undo, reset, analysis: a } = useMaison()
  return (
    <div className="space-y-4">
      <label className="block">
        <span className="flex items-baseline justify-between">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-parisian">Résistance · Resistance</span>
          <span className="font-mono text-cyan">{ohms}Ω</span>
        </span>
        <input
          type="range"
          min={20}
          max={500}
          step={10}
          value={ohms}
          onChange={(e) => setOhms(+e.target.value)}
          className="mt-2 w-full accent-[#55D9E8]"
        />
      </label>

      <div className="grid grid-cols-2 gap-2">
        <Metric fr="Diodes" en="LEDs" value={String(leds.length)} />
        <Metric fr="Courant / LED" en={`limit ${LED_MA}mA`} value={`${a.ma.toFixed(1)} mA`} />
        <Metric fr="Courant total" en="Total" value={`${a.total.toFixed(0)} mA`} />
        <Metric fr="Autonomie" en={`${BATTERY_MAH}mAh`} value={`${a.hours.toFixed(1)} h`} />
      </div>

      <p
        aria-live="polite"
        className={cn(
          'border-l-2 pl-3 text-sm',
          a.ok ? 'border-cyan text-cyan' : 'border-rose text-rose',
        )}
      >
        <span className="font-display text-lg">{a.statusFr}</span>
        <br />
        <span className="text-xs text-parisian">{a.status}</span>
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setOn(!on)}
          className="eyebrow flex-1 rounded-sm bg-cyan py-2.5 text-obsidian transition-opacity hover:opacity-90"
        >
          {on ? 'Éteindre · Off' : 'Simuler · Simulate'}
        </button>
        <button
          type="button"
          onClick={undo}
          className="rounded-sm border border-white/20 px-3 text-xs text-background hover:border-cyan"
        >
          Annuler
          <span className="sr-only"> (Undo)</span>
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-sm border border-white/20 px-3 text-xs text-background hover:border-cyan"
        >
          Réinitialiser
          <span className="sr-only"> (Reset)</span>
        </button>
      </div>
    </div>
  )
}
