'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { fadeInUp, STAGGER_DEFAULT } from '@/lib/animations'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&q=80'

const STATS = [
  { value: '500+', label: 'Travelers' },
  { value: '20+', label: 'Destinations' },
  { value: '4.9★', label: 'Rating' },
]

export function HeroSection() {
  const labelRef = useRef<HTMLSpanElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const stagger = STAGGER_DEFAULT
    const elements: [React.RefObject<Element | null>, number][] = [
      [labelRef, 0],
      [headlineRef, stagger * 1],
      [subtextRef, stagger * 2],
      [buttonsRef, stagger * 3],
      [statsRef, stagger * 4],
    ]

    elements.forEach(([ref, delay]) => {
      if (ref.current) fadeInUp(ref.current, { delay })
    })
  }, [])

  return (
    <section className="relative w-full h-screen min-h-[600px] flex flex-col">
      {/* Background image */}
      <Image
        src={HERO_IMAGE}
        alt="Mountain landscape in Himachal Pradesh"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-2xl">
            {/* Label */}
            <span
              ref={labelRef}
              className="inline-block text-yellow text-sm font-medium tracking-widest uppercase mb-4"
            >
              Adventure Awaits
            </span>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="font-heading font-bold text-white text-4xl md:text-6xl lg:text-7xl leading-tight mb-6"
            >
              Go Where The
              <br />
              <span className="text-yellow">Map</span> Ends
            </h1>

            {/* Subtext */}
            <p
              ref={subtextRef}
              className="text-white/80 text-lg md:text-xl max-w-xl mb-8 leading-relaxed"
            >
              Group trips, stays, retreats and day experiences across Himachal
              Pradesh &amp; Rajasthan
            </p>

            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-wrap gap-4">
              <Link
                href="/trips"
                className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}
              >
                Explore Trips
              </Link>
              <Link
                href="/about#enquiry"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'border-white text-white hover:bg-white hover:text-dark'
                )}
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 w-full">
        <div
          ref={statsRef}
          className="max-w-7xl mx-auto px-4 pb-12 md:pb-16"
        >
          <div className="inline-flex items-center gap-0 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                {i > 0 && <div className="w-px h-8 bg-white/30" />}
                <div className="px-6 py-3 text-center">
                  <div className="text-white font-heading font-bold text-xl md:text-2xl leading-none">
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-xs mt-0.5 font-body">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown size={28} className="text-white/70" />
      </div>
    </section>
  )
}
