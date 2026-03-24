'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Users, Zap, Compass, Star, ArrowRight, type LucideIcon } from 'lucide-react'
import { EXPERIENCES } from '@/lib/constants'
import { useStaggerReveal } from '@/hooks/useStaggerReveal'
import { cn } from '@/lib/utils'

const ICON_MAP: Record<string, LucideIcon> = {
  'Group Trips': Users,
  'Day Trips': Zap,
  'Activities & Experiences': Compass,
  'Tailored Trips': Star,
}

export function QuickNavSection() {
  const cardsRef = useRef<HTMLDivElement>(null)
  useStaggerReveal(cardsRef)

  return (
    <section className="bg-primary py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-yellow text-xs tracking-widest uppercase mb-3">
          DONE TRAVELING TO CROWDED DESTINATIONS?
        </p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-10">
          Let&apos;s Travel <span className="italic">OFFMAP</span>
        </h2>

        <div
          ref={cardsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {EXPERIENCES.map((experience) => {
            const Icon = ICON_MAP[experience.label]
            return (
              <Link
                key={experience.label}
                href={experience.href}
                className={cn(
                  'bg-white rounded-2xl p-6',
                  'hover:shadow-card-hover transition-shadow duration-200'
                )}
              >
                {Icon && (
                  <Icon size={28} className="text-primary mb-4" />
                )}
                <p className="font-heading font-semibold text-dark text-base mb-1">
                  {experience.label}
                </p>
                <ArrowRight size={16} className="text-primary mt-4" />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
