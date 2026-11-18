'use client'

import Image from 'next/image'
import { Lock } from 'lucide-react'
import { PageHeading, Reveal } from '@/components/editorial'
import { COLLECTIONS } from '@/lib/circuit'
import { useMaison } from '@/lib/maison-store'
import { cn } from '@/lib/utils'

export function CollectionsGallery() {
  const { deliveries } = useMaison()
  const done = deliveries.length

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <PageHeading
        eyebrow="Saison Lumière · Haute couture électronique"
        title="LES COLLECTIONS"
        subtitle="Six chapitres de lumière et de couture."
      />
      <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {COLLECTIONS.map((c, i) => {
          const unlocked = done >= c.unlockAt
          return (
            <li key={c.name}>
              <Reveal delay={(i % 3) * 0.1}>
                <article className="group flex flex-col gap-4">
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    <Image
                      src={c.image}
                      alt={`${c.name} — ${c.description}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className={cn(
                        'object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none',
                        !unlocked && 'grayscale opacity-50',
                      )}
                    />
                    <span className="absolute left-4 top-4 bg-background/90 px-2 py-1 font-mono text-[0.65rem] tracking-[0.2em]">
                      COLLECTION {c.numeral}
                    </span>
                    {!unlocked && (
                      <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-obsidian/40 text-background">
                        <Lock className="size-5" aria-hidden />
                        <span className="eyebrow">
                          {c.unlockAt} commande{c.unlockAt > 1 ? 's' : ''} requise{c.unlockAt > 1 ? 's' : ''}
                        </span>
                        <span className="text-xs">
                          Locked — deliver {c.unlockAt} commission{c.unlockAt > 1 ? 's' : ''}
                        </span>
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="font-display text-3xl">{c.name}</h2>
                    <p className="text-sm text-muted-foreground">{c.description}</p>
                    <div className="stitch my-2" aria-hidden />
                    <p className="font-display text-base italic">« {c.note} »</p>
                    <p className="font-mono text-xs text-primary">{c.spec}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
