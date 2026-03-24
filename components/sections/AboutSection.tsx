'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/Button'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/lib/utils'

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  useScrollAnimation(sectionRef)

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div ref={sectionRef} className="lg:grid lg:grid-cols-12 gap-12 items-center">
          {/* Left column */}
          <div className="lg:col-span-7 mb-10 lg:mb-0">
            <p className="text-yellow text-xs tracking-widest uppercase mb-4">
              ABOUT OFFMAP
            </p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-6">
              We don&apos;t make trips around sightseeing
            </h2>
            <p className="text-muted leading-relaxed text-base mb-4">
              We curate journeys around experiencing places you&apos;re visiting. No Itineraries Just Flow &amp; Slow Travel.
            </p>
            <p className="text-muted leading-relaxed text-base mb-4">
              Travel shouldn&apos;t feel rushed. That&apos;s why we do it differently.
            </p>
            <p className="text-muted leading-relaxed text-base mb-8">
              We spend more time in fewer places, connect with locals, and discover experiences before creating trips.
            </p>
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: 'secondary', size: 'md' }))}
            >
              Plan Your Journey
            </Link>
          </div>

          {/* Right column */}
          <div className="lg:col-span-5">
            <div className="bg-border rounded-3xl aspect-[4/3] flex items-center justify-center">
              <span className="text-muted text-sm italic">Illustration coming</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
