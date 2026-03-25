'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FEATURED_ROUTES } from '@/lib/constants'
import { Badge } from '@/components/ui/Badge'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { registerGSAP } from '@/lib/animations'
import { cn } from '@/lib/utils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const ROUTE_IMAGES: Record<string, string> = {
  'bir-barot':
    'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=600&q=80',
  'rajgundha-valley':
    'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80',
  'shangarh-raghupur-fort':
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80',
  jawai:
    'https://assets.myntassets.com/assets/images/2026/MARCH/24/cPwCjdUZ_9141407da6e44b8993e93958dda3b3cd.jpg',
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
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useScrollAnimation(headingRef)

  useEffect(() => {
    registerGSAP()

    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Mobile: fall back to CSS overflow-x scroll
    if (window.innerWidth < 768) return

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 64),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth + 64}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const cards = FEATURED_ROUTES.map((route, index) => (
    <Link
      key={route.slug}
      href={`/experiences/${route.slug}`}
      className={cn(
        'flex-none w-[280px] md:w-[340px] rounded-2xl overflow-hidden bg-white shadow-card hover:shadow-card-hover transition-shadow duration-200',
        'border-l-4',
        index % 2 === 0 ? 'border-l-primary' : 'border-l-yellow'
      )}
    >
      <div className="relative h-[380px]">
        <Image
          src={ROUTE_IMAGES[route.slug] ?? ''}
          alt={route.name}
          fill
          sizes="340px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="p-4">
        <Badge variant="default">{toTitleCase(route.location)}</Badge>
        <p className="font-heading font-semibold text-dark text-base mt-2">
          {route.name}
        </p>
        <p className="text-primary text-sm mt-2 font-medium">
          View Experience →
        </p>
      </div>
    </Link>
  ))

  return (
    <section ref={sectionRef} className="bg-offwhite">
      {/* Heading — always in normal flow */}
      <div className="max-w-7xl mx-auto px-4 pt-16 md:pt-24 pb-8">
        <div ref={headingRef}>
          <p className="text-primary text-xs uppercase tracking-widest mb-3">
            FEATURED EXPERIENCES
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark">
            These aren&apos;t fixed itineraries. They&apos;re routes we&apos;ve
            fallen in love with.
          </h2>
        </div>
      </div>

      {/* Mobile: CSS overflow scroll. Desktop: GSAP animates this track */}
      <div className="overflow-x-auto md:overflow-visible pb-0">
        <div
          ref={trackRef}
          className="flex gap-6 px-4 md:px-16 pb-16 w-max"
        >
          {cards}
        </div>
      </div>
    </section>
  )
}
