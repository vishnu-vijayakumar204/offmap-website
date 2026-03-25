'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/Button'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/lib/utils'

export function FinalCtaSection() {
  const contentRef = useRef<HTMLDivElement>(null)
  useScrollAnimation(contentRef)

  return (
    <section className="bg-yellow py-20 md:py-28">
      <div
        ref={contentRef}
        className="max-w-3xl mx-auto px-4 text-center"
      >
        <h2 className="font-display font-bold text-dark text-3xl md:text-5xl leading-tight mb-8">
          You don&apos;t need a fixed plan. Just the intention to go somewhere
          different.
        </h2>
        <Link
          href="/contact"
          className={cn(buttonVariants({ variant: 'dark', size: 'lg' }))}
        >
          Plan Your Journey
        </Link>
      </div>
    </section>
  )
}
