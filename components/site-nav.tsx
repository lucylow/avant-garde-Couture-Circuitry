'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Award, BookOpen, Building2, FlaskConical, Home, Layers, MoreHorizontal, Scissors, Sparkles, X } from 'lucide-react'
import { NavLogo } from '@/components/brand/logo'
import { cn } from '@/lib/utils'

export const NAV = [
  { href: '/', fr: 'Le Salon', en: 'Home', icon: Home, primary: true },
  { href: '/histoire', fr: "L'Histoire", en: 'Story', icon: BookOpen, primary: false },
  { href: '/atelier', fr: "L'Atelier", en: 'Design studio', icon: Scissors, primary: true },
  { href: '/laboratoire', fr: 'Laboratoire', en: 'Engineering lab', icon: FlaskConical, primary: true },
  { href: '/defile', fr: 'Le Défilé', en: 'Runway', icon: Sparkles, primary: true },
  { href: '/maison', fr: 'La Maison', en: 'Fashion house', icon: Building2, primary: false },
  { href: '/collections', fr: 'Les Collections', en: 'Collections', icon: Layers, primary: false },
  { href: '/maison#distinctions', fr: 'Distinctions', en: 'Achievements', icon: Award, primary: false },
]

function isActive(pathname: string, href: string) {
  const base = href.split('#')[0]
  if (href.includes('#')) return false
  return base === '/' ? pathname === '/' : pathname.startsWith(base)
}

export function SiteHeader() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 md:px-8">
        <Link href="/" aria-label="AVANT-GARDE COUTURE CIRCUITRY — Le Salon" className="text-foreground">
          <NavLogo />
        </Link>
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center">
            {NAV.map((item, i) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href} className="flex items-center">
                  {i > 0 && <span className="mx-1 h-3 w-px bg-gold/50" aria-hidden />}
                  <Link
                    href={item.href}
                    title={item.en}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative px-2.5 py-2 font-display text-[1.05rem] transition-colors hover:text-primary',
                      active ? 'text-primary' : 'text-foreground/80',
                    )}
                  >
                    {item.fr}
                    <span
                      aria-hidden
                      className={cn(
                        'absolute inset-x-2.5 -bottom-0.5 h-0.5 origin-left bg-primary transition-transform duration-300',
                        active ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <span className="eyebrow hidden text-muted-foreground md:block lg:hidden">Maison Avant-Garde</span>
      </div>
    </header>
  )
}

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const primary = NAV.filter((n) => n.primary)
  const secondary = NAV.filter((n) => !n.primary)

  return (
    <nav aria-label="Navigation mobile" className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      {open && (
        <div id="more-menu" className="border-t border-border bg-card px-4 pb-3 pt-4 shadow-lg">
          <p className="eyebrow mb-2 text-muted-foreground">Plus — More</p>
          <ul className="grid grid-cols-2 gap-2">
            {secondary.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-sm border border-border px-3 py-2.5"
                >
                  <item.icon className="size-4 text-primary" aria-hidden />
                  <span className="flex flex-col leading-tight">
                    <span className="font-display text-base">{item.fr}</span>
                    <span className="text-[0.65rem] text-muted-foreground">{item.en}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <ul className="flex border-t border-border bg-background/95 backdrop-blur">
        {primary.map((item) => {
          const active = isActive(pathname, item.href)
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex flex-col items-center gap-1 py-2 text-[0.65rem]',
                  active ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                <item.icon className="size-5" aria-hidden />
                {item.fr}
              </Link>
            </li>
          )
        })}
        <li className="flex-1">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="more-menu"
            onClick={() => setOpen(!open)}
            className="flex w-full flex-col items-center gap-1 py-2 text-[0.65rem] text-muted-foreground"
          >
            {open ? <X className="size-5" aria-hidden /> : <MoreHorizontal className="size-5" aria-hidden />}
            Plus
          </button>
        </li>
      </ul>
    </nav>
  )
}
