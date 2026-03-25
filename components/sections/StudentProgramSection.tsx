'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { GraduationCap } from 'lucide-react'
import { buttonVariants } from '@/components/ui/Button'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { cn } from '@/lib/utils'

export function StudentProgramSection() {
  const contentRef = useRef<HTMLDivElement>(null)
  useScrollAnimation(contentRef)

  return (
    <section className="relative bg-[#F59E0B] py-16 md:py-24 overflow-hidden">
      {/* Decorative emoji */}
      <span className="absolute top-8 right-8 text-8xl opacity-20 select-none pointer-events-none">
        🎒
      </span>

      <div className="max-w-7xl mx-auto px-4">
        <div ref={contentRef} className="text-center max-w-2xl mx-auto">
          <GraduationCap size={40} className="text-dark/70 mb-4 mx-auto" />
          <p className="text-dark/60 text-xs uppercase tracking-widest mb-3">
            STUDENT PROGRAM
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-4">
            Learning hits different outside classrooms.
          </h2>
          <p className="text-dark/70 text-lg max-w-xl mx-auto mb-8">
            We design school and college programs that go beyond textbooks. Real
            terrain, real communities, real learning.
          </p>
          <Link
            href="/student-program"
            className={cn(buttonVariants({ variant: 'dark', size: 'lg' }))}
          >
            Plan a School Trip
          </Link>
        </div>
      </div>
    </section>
  )
}
