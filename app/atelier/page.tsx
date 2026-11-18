import type { Metadata } from 'next'
import { Atelier } from '@/components/atelier'

export const metadata: Metadata = { title: "L'Atelier | AVANT-GARDE COUTURE CIRCUITRY" }

export default function Page() {
  return <Atelier />
}
