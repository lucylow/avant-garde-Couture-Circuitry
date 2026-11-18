import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AVANT-GARDE COUTURE CIRCUITRY',
    short_name: 'AVANT-GARDE',
    description:
      'An experimental Parisian fashion house where haute couture, electrical engineering, wearable electronics, and creative technology come together.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF7F1',
    theme_color: '#651E36',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  }
}
