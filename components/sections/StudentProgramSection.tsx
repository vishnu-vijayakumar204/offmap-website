'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { TornEdge, StampBadge, JournalNote } from '@/components/ui/scrapbook'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export function StudentProgramSection() {
  const contentRef = useRef<HTMLDivElement>(null)
  useScrollAnimation(contentRef)

  return (
    <section className="relative bg-[#F59E0B] overflow-hidden">
      <TornEdge position="top" color="#F59E0B" />

      {/* Decorative background emoji */}
      <span className="absolute top-8 right-4 md:right-8 text-9xl opacity-10 select-none pointer-events-none">
        🎒
      </span>

      <div className="max-w-7xl mx-auto px-4 pt-12 pb-20 md:pb-28">
        <div ref={contentRef} className="text-center max-w-2xl mx-auto">
          <StampBadge
            text="Student Program"
            color="#0F172A"
            rotation={-2}
            className="mb-6"
          />

          <h2 className="font-display font-black text-dark text-4xl md:text-5xl leading-tight mt-6">
            Learning hits different
            <br />
            outside classrooms.
          </h2>

          <p className="font-body text-dark/70 text-base mt-5 mb-8 leading-relaxed">
            We design purposeful travel programs for schools and colleges — combining real
            terrain, cultural immersion, and reflection. No textbook can replicate a
            Himalayan trail or a night under desert stars.
          </p>

          <div className="flex justify-center mb-8">
            <JournalNote text="real terrain, real learning 📚" type="sticky" />
          </div>

          <Link
            href="/student-program"
            className="font-heading font-semibold text-white bg-dark border-2 border-dark px-8 py-3 rounded-none inline-block transition-colors duration-200 hover:bg-dark/85"
          >
            Plan a School Trip →
          </Link>
        </div>
      </div>
    </section>
  )
}
