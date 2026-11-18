import Link from 'next/link'
import { Wordmark } from '@/components/brand/logo'

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-obsidian pb-24 text-background lg:pb-0">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-16">
        <Wordmark size="md" className="[&_.text-muted-foreground]:text-parisian" />
        <p className="font-display text-xl italic text-champagne">{"L'art de la mode et de l'ingénierie."}</p>
        <div className="gold-rule max-w-md" />
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.25em] text-parisian">
          <li>
            <Link href="/histoire" className="hover:text-champagne">
              {"L'Histoire"}
            </Link>
          </li>
          <li>
            <Link href="/collections" className="hover:text-champagne">
              Les Collections
            </Link>
          </li>
          <li>
            <Link href="/maison" className="hover:text-champagne">
              La Maison
            </Link>
          </li>
        </ul>
        <p className="text-center text-xs text-parisian">
          © AVANT-GARDE COUTURE CIRCUITRY · Maison de Couture Électronique · Simulation only — not a certified wearable
          design.
        </p>
      </div>
    </footer>
  )
}
