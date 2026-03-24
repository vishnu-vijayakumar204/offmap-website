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
        <h2 className="font-heading font-bold text-white text-3xl md:text-5xl mb-6 max-w-3xl mx-auto leading-tight">
          Where you stay decides how deeply you experience a place.
        </h2>
        <p className="text-white/70 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Different stories. Different reasons. Same feeling when they arrive.
          A sense of slowing down. Of belonging, even if it&apos;s just for a few days.
        </p>
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-10 text-white/60 text-sm">
          <li className="flex items-center gap-2"><span className="text-yellow">—</span> Fewer stays, better ones</li>
          <li className="flex items-center gap-2"><span className="text-yellow">—</span> Locally rooted</li>
          <li className="flex items-center gap-2"><span className="text-yellow">—</span> Experience-first</li>
        </ul>
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
