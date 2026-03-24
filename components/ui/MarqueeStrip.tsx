'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const TEXT =
  'Travel Slow\u2003·\u2003Go Offmap\u2003·\u2003Himachal Pradesh\u2003·\u2003Rajasthan\u2003·\u2003Uttarakhand\u2003·\u2003Kashmir\u2003·\u2003'

export function MarqueeStrip() {
  const trackRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    animRef.current = gsap.to(track, {
      xPercent: -50,
      ease: 'none',
      repeat: -1,
      duration: 28,
    })

    return () => {
      animRef.current?.kill()
    }
  }, [])

  return (
    <div
      className="bg-dark overflow-hidden py-4 select-none cursor-default"
      onMouseEnter={() => animRef.current?.pause()}
      onMouseLeave={() => animRef.current?.resume()}
    >
      <div ref={trackRef} className="flex whitespace-nowrap w-max">
        <span className="text-white/40 text-xs uppercase tracking-[0.2em]">
          {TEXT.repeat(6)}
        </span>
        <span className="text-white/40 text-xs uppercase tracking-[0.2em]">
          {TEXT.repeat(6)}
        </span>
      </div>
    </div>
  )
}
