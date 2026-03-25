'use client'

import { useRef } from 'react'
import Image from 'next/image'
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
              className={cn(buttonVariants({ variant: 'primary', size: 'md' }))}
            >
              Plan Your Journey
            </Link>
          </div>

          {/* Right column — photo collage (desktop only) */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative h-[420px]">
              {/* Large image — back layer */}
              <div className="absolute top-0 right-8 w-64 h-80 rounded-2xl overflow-hidden shadow-card-hover z-10">
                <Image
                  src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80"
                  alt="Himalayan landscape"
                  fill
                  className="object-cover"
                  sizes="256px"
                />
              </div>
              {/* Medium image — rotated middle layer */}
              <div className="absolute top-16 right-48 w-48 h-56 rounded-xl overflow-hidden shadow-xl rotate-[-4deg] z-20">
                <Image
                  src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=600&q=80"
                  alt="Local village scene"
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
              {/* Small image — rotated front accent */}
              <div className="absolute bottom-0 right-24 w-32 h-40 rounded-xl overflow-hidden shadow-lg rotate-[3deg] z-30">
                <Image
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80"
                  alt="Forest trail"
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
