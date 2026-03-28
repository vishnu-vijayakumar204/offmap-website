'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  PolaroidCard,
  WashiTape,
  SectionLabel,
  JournalNote,
} from '@/components/ui/scrapbook'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  useScrollAnimation(sectionRef)

  return (
    <section className="bg-[#E8F4F0] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4">
        <div ref={sectionRef} className="lg:grid lg:grid-cols-12 gap-16 items-start">

          {/* Left column — journal page */}
          <div className="lg:col-span-7 mb-14 lg:mb-0">
            <div className="paper-lines bg-[#D4EDE6] rounded-xl p-6 md:p-10 relative">
              {/* Washi tape decoration */}
              <div className="absolute -top-3 left-8">
                <WashiTape color="yellow" rotation={-2} width="w-28" />
                <span className="absolute inset-0 flex items-center justify-center font-handwriting text-dark/80 text-sm pointer-events-none">
                  our story →
                </span>
              </div>

              <div className="mt-4">
                <SectionLabel text="a note from us" style="handwritten" className="mb-5" />

                <h2 className="font-display font-bold text-dark text-4xl md:text-5xl leading-tight mb-6">
                  We Don&apos;t Sell Tours.
                  <br />
                  We Map Memories.
                </h2>

                <p className="font-body text-dark/70 text-base leading-relaxed mb-4">
                  We believe the best stories aren&apos;t found in guidebooks. They&apos;re
                  written in the margins of worn notebooks, shared over roadside chai, and
                  discovered when you stop rushing.
                </p>

                <p className="font-body text-dark/70 text-base leading-relaxed mb-8">
                  We spend more time in fewer places, connect with locals, and discover
                  experiences before creating trips.
                </p>

                <JournalNote text="No itineraries, just flow 🌊" type="sticky" className="mb-6" />

                <Link
                  href="/contact"
                  className="font-handwriting text-blue text-lg font-semibold hover:text-blue/70 transition-colors duration-200 inline-block mt-4"
                >
                  Plan Your Journey →
                </Link>
              </div>
            </div>
          </div>

          {/* Right column — photo collage (desktop only) */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative h-[460px]">
              {/* Large — back layer */}
              <PolaroidCard
                src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80"
                alt="Himalayan landscape"
                caption="lost in Himachal"
                rotation={-3}
                size="lg"
                washiColor="yellow"
                className="absolute top-0 right-8 z-[2]"
              />
              {/* Medium — front rotated */}
              <PolaroidCard
                src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=600&q=80"
                alt="Local village scene"
                caption="chai stop, Rajasthan"
                rotation={4}
                size="md"
                washiColor="blue"
                className="absolute top-12 right-0 z-[3]"
              />
              {/* Small — bottom accent */}
              <PolaroidCard
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                alt="Forest trail"
                caption="the trail less taken"
                rotation={-1}
                size="sm"
                className="absolute bottom-0 left-8 z-[1]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
