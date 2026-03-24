'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { NAV_LINKS } from '@/lib/constants'
import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { DURATION_FAST, EASE_OUT } from '@/lib/animations'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Navbar() {
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Scroll detection via ScrollTrigger
  useEffect(() => {
    if (typeof window === 'undefined') return

    const trigger = ScrollTrigger.create({
      start: 'top -72',
      onEnter: () => setIsScrolled(true),
      onLeaveBack: () => setIsScrolled(false),
    })

    return () => trigger.kill()
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  // Animate mobile menu in/out
  useEffect(() => {
    const menu = mobileMenuRef.current
    if (!menu) return

    if (isMobileOpen) {
      gsap.fromTo(
        menu,
        { x: '100%' },
        { x: '0%', duration: DURATION_FAST, ease: EASE_OUT }
      )
    } else {
      gsap.to(menu, { x: '100%', duration: DURATION_FAST, ease: EASE_OUT })
    }
  }, [isMobileOpen])

  function closeMobileMenu() {
    setIsMobileOpen(false)
  }

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)]'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading font-bold text-xl text-dark hover:opacity-80 transition-opacity"
            onClick={closeMobileMenu}
          >
            OffMap India
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-body text-sm transition-colors duration-200 relative pb-0.5',
                  isActive(link.href)
                    ? 'text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-yellow after:rounded-full'
                    : 'text-dark hover:text-primary'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link href="/trips" className={cn(buttonVariants({ variant: 'primary', size: 'sm' }))}>
              Book Now
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-11 h-11 text-dark"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white z-50 md:hidden flex flex-col translate-x-full"
        aria-hidden={!isMobileOpen}
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-border">
          <span className="font-heading font-bold text-lg text-dark">Menu</span>
          <button
            className="flex items-center justify-center w-11 h-11 text-dark"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile Nav Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className={cn(
                'font-body text-base py-3 px-3 rounded-lg transition-colors duration-200',
                isActive(link.href)
                  ? 'text-primary bg-primary/5 font-medium'
                  : 'text-dark hover:text-primary hover:bg-primary/5'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile CTA */}
        <div className="px-4 py-6 border-t border-border">
          <Link
            href="/trips"
            onClick={closeMobileMenu}
            className={cn(buttonVariants({ variant: 'primary', size: 'md' }), 'w-full')}
          >
            Book Now
          </Link>
        </div>
      </div>
    </>
  )
}
