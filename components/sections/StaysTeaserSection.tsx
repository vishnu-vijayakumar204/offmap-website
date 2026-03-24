'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/Button'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/lib/utils'

export function StaysTeaserSection() {
  const contentRef = useRef<HTMLDivElement>(null)
  useScrollAnimation(contentRef)

  return (
    <section className="relative py-24 md:py-36 bg-dark overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1920&q=80"
        alt="OffMap stays"
        fill
        priority={false}
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-dark/30" />
      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-4 text-center"
      >
        <h2 className="font-heading font-bold text-white text-3xl md:text-5xl mb-6 max-w-2xl mx-auto">
          People like you, find places like this.
        </h2>
        <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
          We don&apos;t pick stays from booking sites. Every place we recommend,
          we&apos;ve stayed in. Small, soulful, and connected to the place.
        </p>
        <Link
          href="/stays"
          className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }))}
        >
          Explore Stays
        </Link>
      </div>
    </section>
  )
}
