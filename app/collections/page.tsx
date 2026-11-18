import type { Metadata } from 'next'
import { CollectionsGallery } from '@/components/collections-gallery'

export const metadata: Metadata = { title: 'Les Collections | AVANT-GARDE COUTURE CIRCUITRY' }

export default function Page() {
  return <CollectionsGallery />
}
