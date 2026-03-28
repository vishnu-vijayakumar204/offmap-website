'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/lib/utils'

export function FinalCtaSection() {
  const contentRef = useRef<HTMLDivElement>(null)
  useScrollAnimation(contentRef)

  return (
    <section className="bg-yellow py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div ref={contentRef}>
          <h2 className="font-display font-black text-dark text-4xl md:text-5xl leading-tight">
            You don&apos;t need a fixed plan.
          </h2>
          <p className="font-display font-black text-dark text-4xl md:text-5xl leading-tight mt-2 mb-5">
            Just the intention to go somewhere different.
          </p>
          <p className="font-handwriting text-dark/60 text-xl mb-10">
            no itineraries, no pressure :)
          </p>
          <Link
            href="/contact"
            className={cn(
              'font-display italic font-bold text-xl text-white',
              'bg-dark border-2 border-dark px-10 py-4 rounded-none',
              'inline-block transition-colors duration-200',
              'hover:bg-transparent hover:text-dark'
            )}
          >
            Plan Your Journey
          </Link>
        </div>
      </div>
    </section>
  )
}
