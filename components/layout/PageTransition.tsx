'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion, useAnimation } from 'framer-motion'

// Custom cubic-bezier — sharp acceleration, elegant deceleration
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1]

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const controls = useAnimation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip animation on the very first page load
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    let cancelled = false

    async function runWipe() {
      // Phase 1 (0.4s): Yellow overlay slides in from the left — covers the screen
      await controls.start({
        x: '0%',
        transition: { duration: 0.4, ease: EASE },
      })
      if (cancelled) return

      // Phase 2 (0.4s): Yellow overlay slides out to the right — reveals new page
      await controls.start({
        x: '100%',
        transition: { duration: 0.4, ease: EASE },
      })
      if (cancelled) return

      // Reset to off-screen-left ready for next navigation
      controls.set({ x: '-100%' })
    }

    runWipe()

    return () => {
      cancelled = true
    }
  }, [pathname, controls])

  return (
    <>
      {children}

      {/* Full-screen yellow overlay — sits above all content */}
      <motion.div
        aria-hidden="true"
        initial={{ x: '-100%' }}
        animate={controls}
        className="fixed inset-0 z-[200] pointer-events-none"
        style={{ backgroundColor: '#FFD60A' }}
      />
    </>
  )
}
