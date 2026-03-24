'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FEATURED_ROUTES } from '@/lib/constants'
import { Badge } from '@/components/ui/Badge'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const ROUTE_IMAGES: Record<string, string> = {
  'bir-barot':
    'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=600&q=80',
  'rajgundha-valley':
    'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80',
  'shangarh-raghupur-fort':
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80',
  jawai:
    'https://images.unsplash.com/photo-1477587458883-47145ed31459?w=600&q=80',
  'kasar-devi-khaliya-top':
    'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80',
}

function toTitleCase(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function FeaturedExperiencesSection() {
  const headingRef = useRef<HTMLDivElement>(null)
  useScrollAnimation(headingRef)

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div ref={headingRef}>
          <p className="text-primary text-xs uppercase tracking-widest mb-3">
            FEATURED EXPERIENCES
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-8">
            These aren&apos;t fixed itineraries. They&apos;re routes we&apos;ve fallen in love with.
          </h2>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
          {FEATURED_ROUTES.map((route) => (
            <Link
              key={route.slug}
              href={`/experiences/${route.slug}`}
              className="flex-none w-[280px] snap-start rounded-2xl overflow-hidden bg-white shadow-card hover:shadow-card-hover transition-shadow duration-200"
            >
              <div className="relative h-[340px]">
                <Image
                  src={ROUTE_IMAGES[route.slug] ?? ''}
                  alt={route.name}
                  fill
                  sizes="280px"
                  className="object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-4">
                <Badge variant="default">
                  {toTitleCase(route.location)}
                </Badge>
                <p className="font-heading font-semibold text-dark text-base mt-2">
                  {route.name}
                </p>
                <p className="text-primary text-sm mt-2 font-medium">
                  View Experience →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
