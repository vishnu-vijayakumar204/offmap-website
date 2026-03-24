'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { gsap } from 'gsap'
import { NAV_LINKS } from '@/lib/constants'
import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { DURATION_FAST, EASE_OUT } from '@/lib/animations'

export default function Navbar() {
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Scroll detection — plain scroll event for reliable initial state
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 72)
    }
    // Run once on mount to catch pre-scrolled state
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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
            className={cn(
              'font-heading font-bold text-xl hover:opacity-80 transition-colors duration-300',
              isScrolled ? 'text-dark' : 'text-white'
            )}
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
                  isScrolled
                    ? isActive(link.href)
                      ? 'text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-yellow after:rounded-full'
                      : 'text-dark hover:text-primary'
                    : isActive(link.href)
                      ? 'text-yellow after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-yellow after:rounded-full'
                      : 'text-white hover:text-yellow'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className={cn(
                isScrolled
                  ? buttonVariants({ variant: 'primary', size: 'sm' })
                  : buttonVariants({ variant: 'outline', size: 'sm' }),
                !isScrolled && 'border-white text-white hover:bg-white hover:text-dark'
              )}
            >
              Plan Your Trip
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={cn(
              'md:hidden flex items-center justify-center w-11 h-11 transition-colors duration-300',
              isScrolled ? 'text-dark' : 'text-white'
            )}
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
            href="/contact"
            onClick={closeMobileMenu}
            className={cn(buttonVariants({ variant: 'primary', size: 'md' }), 'w-full')}
          >
            Plan Your Trip
          </Link>
        </div>
      </div>
    </>
  )
}
