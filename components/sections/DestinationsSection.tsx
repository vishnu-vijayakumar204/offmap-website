'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LOCATIONS, REGION_THEMES, type RegionThemeKey } from '@/lib/constants'
import { TornEdge, StampBadge, WashiTape, SectionLabel } from '@/components/ui/scrapbook'
import { PostageStamp } from '@/components/ui/scrapbook'
import { useStaggerReveal } from '@/hooks/useStaggerReveal'
import { cn } from '@/lib/utils'

const DESTINATION_IMAGES: Record<string, string> = {
  'himachal-pradesh':
    'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
  rajasthan:
    'https://assets.myntassets.com/assets/images/2026/MARCH/24/JCyziwzs_6ee01729919d469899c817cec3ea5cd8.jpg',
  uttarakhand:
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  kashmir:
    'https://assets.myntassets.com/assets/images/2026/MARCH/24/D2v6kHyH_d1c879ce666440a292c02cf334ea2085.jpg',
}

const CARD_ROTATIONS: Record<string, string> = {
  'himachal-pradesh': '-2deg',
  rajasthan: '2deg',
  kashmir: '-1deg',
  uttarakhand: '1.5deg',
}

const CARD_OFFSETS: Record<string, string> = {
  'himachal-pradesh': '',
  rajasthan: 'mt-12',
  kashmir: 'mt-6',
  uttarakhand: 'mt-16',
}

export function DestinationsSection() {
  const gridRef = useRef<HTMLDivElement>(null)
  useStaggerReveal(gridRef)

  return (
    <section className="bg-[#FFF8E7] diagonal-stripes">
      <TornEdge position="top" color="#FFF8E7" />

      <div className="max-w-7xl mx-auto px-4 pt-4 pb-20 md:pb-28">
        {/* Header */}
        <div className="mb-12">
          <div className="relative inline-block mb-6">
            <WashiTape color="yellow" rotation={-2} width="w-44" />
            <span className="absolute inset-0 flex items-center justify-center font-handwriting text-dark/80 text-sm pointer-events-none">
              Unmapped awaits
            </span>
          </div>

          <SectionLabel text="WANDERLUST" style="stamp" className="mb-4 block" />

          <h2 className="font-display font-black text-dark text-4xl md:text-5xl mt-5">
            Pick your direction
          </h2>
        </div>

        {/* Scattered destination cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6"
        >
          {LOCATIONS.map((location) => {
            const theme = REGION_THEMES[location.slug as RegionThemeKey]
            if (!theme) return null
            const rotation = CARD_ROTATIONS[location.slug] ?? '0deg'
            const offset = CARD_OFFSETS[location.slug] ?? ''

            return (
              <Link
                key={location.slug}
                href={`/destinations/${location.slug}`}
                style={
                  {
                    '--card-r': rotation,
                    '--border-c': theme.primary,
                  } as React.CSSProperties
                }
                className={cn(
                  'group block bg-white',
                  'border-2 border-[var(--border-c)]',
                  'rotate-[var(--card-r)] hover:rotate-0 hover:scale-[1.02]',
                  'transition-all duration-300',
                  'shadow-[2px_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[4px_4px_20px_rgba(0,0,0,0.15)]',
                  offset
                )}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={DESTINATION_IMAGES[location.slug] ?? ''}
                    alt={location.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* PostageStamp overlay top-right */}
                  <div className="absolute top-3 right-3 z-10">
                    <PostageStamp region={location.slug as RegionThemeKey} />
                  </div>
                </div>

                {/* Card content */}
                <div className="p-5">
                  <p className="font-handwriting text-[var(--border-c)] text-xs uppercase tracking-wider mb-1">
                    {theme.label}
                  </p>
                  <p className="font-display font-bold text-[var(--border-c)] text-2xl mb-2">
                    {location.name}
                  </p>
                  <p className="font-body text-gray-500 text-sm leading-relaxed mb-4">
                    {theme.description}
                  </p>
                  <p className="font-handwriting text-[var(--border-c)] text-base">
                    Explore →
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
