'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Users, Sun, Compass, BookOpen, type LucideIcon } from 'lucide-react'
import { SectionLabel } from '@/components/ui/scrapbook'
import { useStaggerReveal } from '@/hooks/useStaggerReveal'
import { cn } from '@/lib/utils'

interface NavTile {
  label: string
  href: string
  icon: LucideIcon
  borderColor: string
}

const TILES: NavTile[] = [
  { label: 'Group Trips', href: '/experiences/group-trips', icon: Users, borderColor: '#1B4FD8' },
  { label: 'Day Trips', href: '/experiences/day-trips', icon: Sun, borderColor: '#FFD60A' },
  { label: 'Activities', href: '/experiences/activities', icon: Compass, borderColor: '#2D6A4F' },
  { label: 'Student Program', href: '/student-program', icon: BookOpen, borderColor: '#F59E0B' },
]

export function QuickNavSection() {
  const cardsRef = useRef<HTMLDivElement>(null)
  useStaggerReveal(cardsRef)

  return (
    <section className="bg-dark py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4">
        <SectionLabel
          text="done with tourist traps?"
          style="handwritten"
          className="text-yellow mb-5 block"
        />
        <h2 className="font-display font-black text-white text-4xl md:text-5xl mb-12">
          Let&apos;s Travel <span className="italic">OFFMAP</span>
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {TILES.map((tile) => {
            const Icon = tile.icon
            return (
              <Link
                key={tile.label}
                href={tile.href}
                style={{ '--tc': tile.borderColor } as React.CSSProperties}
                className={cn(
                  'group block border-2 border-[var(--tc)] rounded-none p-6',
                  'bg-transparent transition-colors duration-200',
                  'hover:bg-white/5'
                )}
              >
                <Icon size={32} className="text-yellow mb-4" />
                <p className="font-heading font-semibold text-white text-base mb-4">
                  {tile.label}
                </p>
                <span className="text-yellow text-lg group-hover:translate-x-1 inline-block transition-transform duration-200">
                  →
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
