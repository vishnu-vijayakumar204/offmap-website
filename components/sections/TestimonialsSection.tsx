'use client'

import { useRef } from 'react'
import { Star } from 'lucide-react'
import { Card, CardBody } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useStaggerReveal } from '@/hooks/useStaggerReveal'

interface Testimonial {
  name: string
  location: string
  review: string
  initials: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Deepika Hada',
    location: 'Himachal Pradesh',
    review:
      'This was my very first trip with strangers and one of the best decisions I\'ve ever made. The trails, the stays, the people — everything felt intentional and real. I came back feeling like I\'d actually been somewhere.',
    initials: 'DH',
  },
  {
    name: 'Sachin Kumar',
    location: 'Himachal Pradesh',
    review:
      'OFFMAP truly lives up to their name. They took us off the beaten path to places I didn\'t know existed. No tourist traps, no rush — just genuine experiences with a group of like-minded people.',
    initials: 'SK',
  },
  {
    name: 'Sumit Chaudhary',
    location: 'Himachal Pradesh',
    review:
      'The Rajgundha trip was an unforgettable experience. The planning was seamless, the stay was beautiful, and the route felt like it was designed for people who actually want to feel a place, not just see it.',
    initials: 'SC',
  },
]

function StarRating() {
  return (
    <div className="flex items-center gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className="text-yellow fill-yellow" />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const gridRef = useRef<HTMLDivElement>(null)
  useStaggerReveal(gridRef)

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-primary text-xs uppercase tracking-widest mb-3">
          WHAT TRAVELERS SAY
        </p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-10">
          Real people. Real experiences.
        </h2>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="flex flex-col bg-offwhite">
              <CardBody className="flex flex-col flex-1">
                <StarRating />
                <p className="font-body text-muted text-base leading-relaxed flex-1 mb-6">
                  &ldquo;{t.review}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  {/* Avatar placeholder */}
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-none">
                    <span className="text-primary font-heading font-semibold text-sm">
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-dark text-sm">
                      {t.name}
                    </p>
                    <Badge variant="himachal" className="mt-0.5">
                      {t.location}
                    </Badge>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
