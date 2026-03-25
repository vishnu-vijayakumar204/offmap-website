'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { buttonVariants } from '@/components/ui/Button'
import { SearchBar } from '@/components/ui/SearchBar'
import { cn } from '@/lib/utils'
import { registerGSAP, EASE_OUT } from '@/lib/animations'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Stat {
  target: number
  suffix: string
  label: string
  decimals?: number
}

const STATS: Stat[] = [
  { target: 500, suffix: '+', label: 'Travelers' },
  { target: 20, suffix: '+', label: 'Destinations' },
  { target: 4.9, suffix: '★', label: 'Rating', decimals: 1 },
]

// Headline split into individual words
const LINE1_WORDS = ['Travel', 'slow,', 'go']
const LINE2_WORD = 'Offmap!'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgWrapperRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const stat0Ref = useRef<HTMLSpanElement>(null)
  const stat1Ref = useRef<HTMLSpanElement>(null)
  const stat2Ref = useRef<HTMLSpanElement>(null)
  const statRefs = [stat0Ref, stat1Ref, stat2Ref]

  useEffect(() => {
    registerGSAP()

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── Cinematic entrance sequence ───────────────────────────────────
    if (!reduced) {
      const wordSpans = headlineRef.current
        ? Array.from(headlineRef.current.querySelectorAll<HTMLElement>('[data-word]'))
        : []

      gsap.set(labelRef.current, { opacity: 0, y: 10 })
      gsap.set(wordSpans, { y: '100%' })
      gsap.set(subtextRef.current, { opacity: 0, y: 20 })
      gsap.set(searchRef.current, { opacity: 0, y: 20 })
      gsap.set(buttonsRef.current, { opacity: 0, y: 20 })
      gsap.set(statsRef.current, { opacity: 0, y: 20 })

      const tl = gsap.timeline({ delay: 0.3 })

      tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })

      if (wordSpans.length) {
        tl.to(
          wordSpans,
          { y: '0%', duration: 0.75, ease: 'power3.out', stagger: 0.08 },
          '-=0.1'
        )
      }

      tl.to(subtextRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      tl.to(searchRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      tl.to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      tl.to(statsRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')
    }

    // ── Hero parallax ─────────────────────────────────────────────────
    if (!reduced && imgWrapperRef.current && sectionRef.current) {
      gsap.to(imgWrapperRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    // ── Counter animation ─────────────────────────────────────────────
    if (!reduced && statsRef.current) {
      STATS.forEach((stat, i) => {
        const el = statRefs[i].current
        if (!el) return

        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.target,
          duration: 1.8,
          ease: EASE_OUT,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 90%',
            once: true,
          },
          onUpdate() {
            el.textContent = stat.decimals
              ? obj.val.toFixed(stat.decimals)
              : Math.round(obj.val).toString()
          },
        })
      })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[600px] flex flex-col overflow-hidden"
    >
      {/* Parallax image wrapper */}
      <div
        ref={imgWrapperRef}
        className="absolute inset-0 scale-[1.3] will-change-transform"
      >
        <Image
          src="/hero.jpeg"
          alt="Mountain landscape in Himachal Pradesh"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Bottom-up gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 pointer-events-none" />

      {/* Top-down gradient — ensures navbar text is legible */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/65 to-transparent pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-2xl">

            {/* Label */}
            <span
              ref={labelRef}
              className="inline-block text-yellow text-sm font-medium tracking-widest uppercase mb-4"
            >
              Travel Differently
            </span>

            {/* Headline — Fraunces display font, word-by-word reveal */}
            <h1
              ref={headlineRef}
              className="font-display font-bold text-white text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6"
            >
              <span className="flex flex-wrap">
                {LINE1_WORDS.map((word) => (
                  <span
                    key={word}
                    className="overflow-hidden inline-block mr-[0.22em] last:mr-0"
                  >
                    <span className="inline-block" data-word="">
                      {word}
                    </span>
                  </span>
                ))}
              </span>
              <span className="overflow-hidden inline-block">
                <span className="inline-block text-yellow" data-word="">
                  {LINE2_WORD}
                </span>
              </span>
            </h1>

            {/* Subtext */}
            <p
              ref={subtextRef}
              className="text-white/80 text-lg md:text-xl max-w-xl mb-0 leading-relaxed"
            >
              OffMap is for people who want to travel slower. To hike without
              rushing, sit with a view longer, and experience places deeply.
            </p>

            {/* Search Bar */}
            <div ref={searchRef} className="mt-8 mb-6">
              <SearchBar />
            </div>

            {/* Or explore label */}
            <p className="text-white/60 text-sm mb-4">Or explore:</p>

            {/* CTA Buttons — outline style, secondary to search */}
            <div ref={buttonsRef} className="flex flex-wrap gap-4">
              <Link
                href="/destinations"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'border-white text-white hover:bg-white hover:text-dark'
                )}
              >
                Explore Destinations
              </Link>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'border-white/60 text-white/80 hover:bg-white hover:text-dark'
                )}
              >
                Plan Your Trip
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 w-full">
        <div ref={statsRef} className="max-w-7xl mx-auto px-4 pb-12 md:pb-16">
          <div className="inline-flex items-center gap-0 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                {i > 0 && <div className="w-px h-8 bg-white/30" />}
                <div className="px-6 py-3 text-center">
                  <div className="text-white font-heading font-bold text-xl md:text-2xl leading-none">
                    <span ref={statRefs[i]}>
                      {stat.decimals ? stat.target.toFixed(stat.decimals) : stat.target}
                    </span>
                    {stat.suffix}
                  </div>
                  <div className="text-white/70 text-xs mt-0.5 font-body">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown size={28} className="text-white/70" />
      </div>
    </section>
  )
}
