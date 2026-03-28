'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PolaroidCard } from '@/components/ui/scrapbook'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/lib/utils'

const STAY_PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&q=80',
    alt: 'Cozy mountain stay',
    caption: 'waking up to this',
    rotation: -3,
  },
  {
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    alt: 'Forest homestay view',
    caption: 'the view from bed',
    rotation: 2,
  },
  {
    src: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80',
    alt: 'Local homestay',
    caption: 'locally rooted',
    rotation: -1,
  },
]

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
