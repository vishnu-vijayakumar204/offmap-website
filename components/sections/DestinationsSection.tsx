'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LOCATIONS } from '@/lib/constants'
import { Badge } from '@/components/ui/Badge'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/lib/utils'

const DESTINATION_IMAGES: Record<string, string> = {
  'himachal-pradesh':
    'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
  rajasthan:
    'https://images.unsplash.com/photo-1477587458883-47145ed6979e?w=800&q=80',
  uttarakhand:
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  kashmir:
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
}

export function DestinationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  useScrollAnimation(sectionRef)

  return (
    <section className="bg-offwhite py-16 md:py-24">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4">
        <p className="text-primary text-xs uppercase tracking-widest mb-3">
          DESTINATIONS
        </p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-10">
          Pick a direction. We&apos;ll show you a different side of it.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {LOCATIONS.map((location) => (
            <Link
              key={location.slug}
              href={`/destinations/${location.slug}`}
              className="block"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group cursor-pointer">
                <Image
                  src={DESTINATION_IMAGES[location.slug] ?? ''}
                  alt={location.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className={cn(
                    'object-cover transition-transform duration-500 group-hover:scale-105'
                  )}
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-heading font-bold text-white text-xl">
                    {location.name}
                  </p>
                  {location.intro ? (
                    <p className="text-white/70 text-sm mt-1">{location.intro}</p>
                  ) : (
                    <Badge variant="yellow" className="mt-1">
                      Coming Soon
                    </Badge>
                  )}
                  <p className="text-white/80 text-sm mt-3">Explore →</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
