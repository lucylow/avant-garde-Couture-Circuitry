'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function PageHeading({
  eyebrow,
  title,
  subtitle,
  className,
  dark,
}: {
  eyebrow: string
  title: string
  subtitle: string
  className?: string
  dark?: boolean
}) {
  return (
    <Reveal className={cn('flex flex-col items-center gap-3 py-12 text-center md:py-16', className)}>
      <p className={cn('eyebrow', dark ? 'text-champagne' : 'text-primary')}>{eyebrow}</p>
      <h1 className="font-display text-5xl font-semibold tracking-[0.06em] md:text-7xl">{title}</h1>
      <motion.div
        className="gold-rule max-w-xs"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      <p className={cn('font-display text-xl italic md:text-2xl', dark ? 'text-parisian' : 'text-muted-foreground')}>
        {subtitle}
      </p>
    </Reveal>
  )
}

export function GarmentLabel({ piece, className }: { piece: number; className?: string }) {
  return (
    <div
      className={cn(
        'inline-flex flex-col items-center gap-1 border border-gold/70 bg-card px-5 py-3 text-center text-foreground',
        className,
      )}
    >
      <span className="font-display text-sm font-semibold tracking-[0.2em]">MAISON AVANT-GARDE</span>
      <span className="stitch w-full" aria-hidden />
      <span className="font-mono text-[0.65rem] tracking-[0.2em]">PIÈCE Nº {String(piece).padStart(3, '0')}</span>
      <span className="text-[0.55rem] uppercase tracking-[0.3em] text-muted-foreground">
        Création originale · Atelier électronique · Paris
      </span>
    </div>
  )
}

export function Term({ fr, en }: { fr: string; en: string }) {
  return (
    <span className="flex flex-col leading-tight">
      <span className="font-display text-base">{fr}</span>
      <span className="text-[0.65rem] uppercase tracking-[0.15em] opacity-70">{en}</span>
    </span>
  )
}
