import type { Metadata } from 'next'
import { Defile } from '@/components/defile'

export const metadata: Metadata = { title: 'Le Défilé | AVANT-GARDE COUTURE CIRCUITRY' }

export default function Page() {
  return <Defile />
}
