'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PolaroidCard } from '@/components/ui/scrapbook'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/lib/utils'
import { STAY_PHOTOS, STAYS_HERO } from '@/lib/images'

export function StaysTeaserSection() {
  const contentRef = useRef<HTMLDivElement>(null)
  useScrollAnimation(contentRef)

  return (
    <section className="relative py-24 md:py-36 bg-dark overflow-hidden">
      <Image
        src={STAYS_HERO}
        alt="OffMap stays"
        fill
        priority={false}
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/60 to-dark/30" />

      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-4 text-center"
      >
        <h2 className="font-display font-bold text-white text-4xl md:text-5xl mb-6 max-w-3xl mx-auto leading-tight">
          Where you stay decides how deeply you experience a place.
        </h2>

        {/* 3 polaroid cards in a row */}
        <div className="flex items-end justify-center gap-2 md:gap-4 my-10 flex-wrap">
          {STAY_PHOTOS.map((photo, i) => (
            <PolaroidCard
              key={i}
              src={photo.src}
              alt={photo.alt}
              caption={photo.caption}
              rotation={photo.rotation}
              size="sm"
              className="flex-none"
            />
          ))}
        </div>

        {/* Philosophy points */}
        <p className="font-handwriting text-white/70 text-lg md:text-xl mb-10">
          Fewer stays, better ones · Locally rooted · Experience-first
        </p>

        <Link
          href="/stays"
          className={cn(
            'font-display italic font-bold text-xl text-yellow',
            'transition-colors duration-200 hover:text-yellow/70',
            'inline-block'
          )}
        >
          Come Stay With Us →
        </Link>
      </div>
    </section>
  )
}
