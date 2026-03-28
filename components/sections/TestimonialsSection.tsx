'use client'

import { useRef } from 'react'
import { SectionLabel } from '@/components/ui/scrapbook'
import { useStaggerReveal } from '@/hooks/useStaggerReveal'
import { cn } from '@/lib/utils'

interface Testimonial {
  name: string
  trip: string
  review: string
  rotation: number
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Deepika Hada',
    trip: 'Himachal Pradesh',
    review:
      'This was my very first trip with strangers and one of the best decisions I\'ve ever made. The trails, the stays, the people — everything felt intentional and real. I came back feeling like I\'d actually been somewhere.',
    rotation: -2,
  },
  {
    name: 'Sachin Kumar',
    trip: 'Himachal Pradesh',
    review:
      'OFFMAP truly lives up to their name. They took us off the beaten path to places I didn\'t know existed. No tourist traps, no rush — just genuine experiences with a group of like-minded people.',
    rotation: 1,
  },
  {
    name: 'Sumit Chaudhary',
    trip: 'Rajgundha Valley',
    review:
      'The Rajgundha trip was an unforgettable experience. The planning was seamless, the stay was beautiful, and the route felt like it was designed for people who actually want to feel a place, not just see it.',
    rotation: -1,
  },
]

function StarRating() {
  return (
    <div className="flex items-center gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-yellow text-base">★</span>
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const gridRef = useRef<HTMLDivElement>(null)
  useStaggerReveal(gridRef)

  return (
    <section className="bg-[#EEF2FF] paper-lines py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4">
        <SectionLabel
          text="Whispers from the Path"
          style="handwritten"
          className="block mb-10"
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              style={{ '--r': `${t.rotation}deg` } as React.CSSProperties}
              className={cn(
                'bg-[#FFFDE8] p-6 border-l-4 border-l-yellow',
                'rotate-[var(--r)]',
                'shadow-[2px_2px_12px_rgba(0,0,0,0.08)]'
              )}
            >
              <StarRating />
              <p className="font-body italic text-gray-700 text-base leading-relaxed mb-4">
                &ldquo;{t.review}&rdquo;
              </p>
              <p className="font-handwriting text-dark/60 text-base">
                — {t.name}, {t.trip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
