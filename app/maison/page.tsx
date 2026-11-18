import type { Metadata } from 'next'
import { MaisonDashboard } from '@/components/maison-dashboard'

export const metadata: Metadata = { title: 'La Maison | AVANT-GARDE COUTURE CIRCUITRY' }

export default function Page() {
  return <MaisonDashboard />
}
