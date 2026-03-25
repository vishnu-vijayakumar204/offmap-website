'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LOCATIONS, REGION_THEMES, type RegionThemeKey } from '@/lib/constants'
import { useStaggerReveal } from '@/hooks/useStaggerReveal'

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

export function DestinationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  useStaggerReveal(sectionRef)

  return (
    <section className="bg-[#1B4FD8] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-white/70 text-xs uppercase tracking-widest mb-3">
          DESTINATIONS
        </p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-10">
          Pick a direction. We&apos;ll show you a different side of it.
        </h2>

        <div ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {LOCATIONS.map((location) => {
            const theme = REGION_THEMES[location.slug as RegionThemeKey]
            if (!theme) return null

            return (
              <Link
                key={location.slug}
                href={`/destinations/${location.slug}`}
                className="block group"
              >
                <div
                  className="rounded-2xl overflow-hidden bg-white shadow-card hover:shadow-card-hover transition-all duration-300"
                  style={
                    {
                      '--region-color': theme.primary,
                      '--region-card-bg': theme.cardBg,
                    } as React.CSSProperties
                  }
                >
                  {/* 4px accent bar */}
                  <div className="h-1 bg-[var(--region-color)]" />

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={DESTINATION_IMAGES[location.slug] ?? ''}
                      alt={location.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <p
                        className="font-heading font-bold text-lg leading-tight"
                        style={{ color: theme.primary }}
                      >
                        {location.name}
                      </p>
                      <span className="text-xl ml-2 flex-none">{theme.emoji}</span>
                    </div>

                    {/* Label badge */}
                    <span
                      className="inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-3"
                      style={{
                        backgroundColor: theme.cardBg,
                        color: theme.primary,
                      }}
                    >
                      {theme.label}
                    </span>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {theme.description}
                    </p>

                    <p
                      className="text-sm font-semibold"
                      style={{ color: theme.primary }}
                    >
                      Explore →
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
