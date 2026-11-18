import { Emblem } from '@/components/brand/logo'

export default function Loading() {
  return (
    <div
      role="status"
      className="flex min-h-[70vh] flex-col items-center justify-center gap-5 text-center"
    >
      <Emblem className="size-14 animate-pulse text-primary motion-reduce:animate-none" />
      <p className="font-display text-3xl tracking-[0.14em]">MAISON AVANT-GARDE</p>
      <p className="eyebrow text-muted-foreground">Paris · Atelier · Électronique</p>
      <p className="eyebrow text-primary">{"Préparation de l'atelier…"}</p>
    </div>
  )
}
