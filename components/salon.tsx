'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Wordmark } from '@/components/brand/logo'
import { Reveal } from '@/components/editorial'
import { COLLECTIONS } from '@/lib/circuit'
import { useMaison } from '@/lib/maison-store'

export function Salon() {
  const m = useMaison()
  const featured = COLLECTIONS.filter((c) => m.deliveries.length >= c.unlockAt).at(-1) ?? COLLECTIONS[0]
  const last = m.deliveries.at(-1)

  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 md:px-8 lg:grid-cols-2 lg:pt-16">
        <div className="flex flex-col gap-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
            <Wordmark size="lg" className="items-start text-left [&>span:nth-child(2)]:justify-start" />
          </motion.div>
          <div className="gold-rule max-w-sm bg-gradient-to-r from-gold to-transparent" />
          <h1 className="font-display text-4xl font-medium leading-tight md:text-5xl">
            BIENVENUE CHEZ MAISON AVANT-GARDE.
          </h1>
          <p className="font-display text-2xl italic text-primary">
            Where imagination becomes couture, and couture becomes intelligent.
          </p>
          <p lang="fr" className="max-w-xl text-pretty">
            {
              "Entrez dans un univers où la haute couture rencontre l'ingénierie électronique. Imaginez, créez, expérimentez et présentez vos créations sur les podiums du futur."
            }
          </p>
          <p lang="en" className="max-w-xl text-sm text-muted-foreground">
            Enter a world where haute couture meets electronic engineering. Imagine, create, experiment, and present
            your creations on the runways of the future.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/atelier"
              className="eyebrow rounded-sm bg-primary px-6 py-3.5 text-primary-foreground transition-opacity hover:opacity-90"
            >
              {"Entrer dans l'atelier"}
            </Link>
            <Link
              href="/collections"
              className="eyebrow rounded-sm border border-foreground px-6 py-3.5 transition-colors hover:bg-foreground hover:text-background"
            >
              Découvrir la collection
            </Link>
          </div>
        </div>
        <motion.div
          className="relative aspect-[4/5] overflow-hidden"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/salon-hero.png"
            alt="Ivory silk gown on a dress form, embroidered with gold conductive thread and glowing LEDs, in a Parisian atelier"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <span className="absolute bottom-4 left-4 bg-background/90 px-3 py-1.5 font-display text-sm italic">
            Pièce Nº 001 — Atelier électronique, Paris
          </span>
        </motion.div>
      </section>

      <section aria-label="Le point de la maison" className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-px bg-border md:grid-cols-4">
          <Reveal className="flex flex-col gap-2 bg-card p-6">
            <p className="eyebrow text-primary">Commande en cours</p>
            <p className="font-display text-2xl">{m.currentJob.client}</p>
            <p className="text-sm text-muted-foreground">{m.currentJob.brief}</p>
            <Link href="/atelier" className="mt-auto text-sm text-primary underline-offset-4 hover:underline">
              {"Ouvrir l'atelier →"}
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-2 bg-card p-6">
            <p className="eyebrow text-primary">Collection actuelle</p>
            <p className="font-display text-2xl">
              {featured.numeral} — {featured.name}
            </p>
            <p className="text-sm text-muted-foreground">{featured.description}</p>
            <Link href="/collections" className="mt-auto text-sm text-primary underline-offset-4 hover:underline">
              Les Collections →
            </Link>
          </Reveal>
          <Reveal delay={0.2} className="flex flex-col gap-2 bg-card p-6">
            <p className="eyebrow text-primary">Recherche · Research</p>
            <p className="font-mono text-2xl">{Math.min(100, m.deliveries.length * 20)}%</p>
            <div className="h-1 bg-muted">
              <div className="h-1 bg-primary" style={{ width: `${Math.min(100, m.deliveries.length * 20)}%` }} />
            </div>
            <Link href="/laboratoire" className="mt-auto text-sm text-primary underline-offset-4 hover:underline">
              Laboratoire →
            </Link>
          </Reveal>
          <Reveal delay={0.3} className="flex flex-col gap-2 bg-card p-6">
            <p className="eyebrow text-primary">Dernier défilé</p>
            {last ? (
              <>
                <p className="font-display text-2xl">
                  {last.client} · {last.score}/100
                </p>
                <p className="text-sm text-muted-foreground">
                  {last.leds} LEDs · {last.hours}h autonomy
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No runway presentation yet.</p>
            )}
            <Link href="/defile" className="mt-auto text-sm text-primary underline-offset-4 hover:underline">
              Le Défilé →
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20 md:px-8">
        <Reveal className="flex flex-col items-center gap-2 text-center">
          <p className="eyebrow text-primary">Saison Lumière</p>
          <h2 className="font-display text-4xl tracking-[0.06em] md:text-5xl">LES COLLECTIONS</h2>
        </Reveal>
        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {COLLECTIONS.map((c, i) => (
            <li key={c.name}>
              <Reveal delay={i * 0.06}>
                <Link href="/collections" className="group flex flex-col gap-2">
                  <span className="relative block aspect-[3/4] overflow-hidden bg-muted">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 16vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
                    />
                  </span>
                  <span className="font-mono text-[0.65rem] text-gold">COLLECTION {c.numeral}</span>
                  <span className="font-display text-lg leading-tight">{c.name}</span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
