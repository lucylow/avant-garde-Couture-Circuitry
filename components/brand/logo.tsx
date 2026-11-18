import { cn } from '@/lib/utils'

export function Emblem({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn('size-10', className)}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect x="1.5" y="1.5" width="45" height="45" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="5" y="5" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
      <path
        d="M24 9 L25.6 21.4 L38 24 L25.6 26.6 L24 39 L22.4 26.6 L10 24 L22.4 21.4 Z"
        fill="currentColor"
      />
      <path
        d="M9 38 C 16 34, 20 30, 22.4 26.6"
        fill="none"
        stroke="var(--gold, #B99A67)"
        strokeWidth="0.9"
        strokeDasharray="1.6 1.4"
      />
      <circle cx="9" cy="38" r="1.3" fill="var(--gold, #B99A67)" />
      <path d="M38 10 L32 10 L32 16" fill="none" stroke="var(--gold, #B99A67)" strokeWidth="0.9" />
      <circle cx="38" cy="10" r="1.3" fill="var(--gold, #B99A67)" />
    </svg>
  )
}

type WordmarkProps = { className?: string; size?: 'sm' | 'md' | 'lg'; showSupport?: boolean }

export function Wordmark({ className, size = 'md', showSupport = true }: WordmarkProps) {
  const titles = { sm: 'text-xl', md: 'text-3xl', lg: 'text-5xl md:text-7xl' }
  const subs = { sm: 'text-[0.55rem]', md: 'text-[0.65rem]', lg: 'text-xs md:text-sm' }
  return (
    <div className={cn('flex flex-col items-center text-center leading-none', className)}>
      <span className={cn('font-display font-semibold tracking-[0.12em]', titles[size])}>AVANT-GARDE</span>
      <span className="mt-2 flex items-center gap-3">
        <span className="h-px w-6 bg-gold" aria-hidden />
        <span className={cn('font-sans font-medium uppercase tracking-[0.4em]', subs[size])}>Couture Circuitry</span>
        <span className="h-px w-6 bg-gold" aria-hidden />
      </span>
      {showSupport && (
        <span className={cn('mt-2 font-sans uppercase tracking-[0.35em] text-muted-foreground', subs[size])}>
          Paris · Atelier · Électronique
        </span>
      )}
    </div>
  )
}

export function NavLogo({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-3', className)}>
      <Emblem className="size-8 text-primary" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-semibold tracking-[0.14em]">AVANT-GARDE</span>
        <span className="mt-1 text-[0.55rem] font-medium uppercase tracking-[0.35em] text-muted-foreground">
          Couture Circuitry
        </span>
      </span>
    </span>
  )
}
