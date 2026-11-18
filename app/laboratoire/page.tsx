import type { Metadata } from 'next'
import { Laboratoire } from '@/components/laboratoire'

export const metadata: Metadata = { title: 'Le Laboratoire | AVANT-GARDE COUTURE CIRCUITRY' }

export default function Page() {
  return <Laboratoire />
}
