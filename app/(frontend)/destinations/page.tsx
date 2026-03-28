'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Mountain,
  Tent,
  Palette,
  Home,
  Zap,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react'
import { LOCATIONS, REGION_THEMES, type RegionThemeKey } from '@/lib/constants'
import { WashiTape, SectionLabel, PostageStamp } from '@/components/ui/scrapbook'
import { IndiaMap } from '@/components/ui/IndiaMap'
import { cn } from '@/lib/utils'
import { RegionSection, REGION_EXPERIENCES } from '@/components/sections/RegionSection'

// ─── Wavy SVG divider ────────────────────────────────────────────────────────
// position="bottom": honey fill appears at BOTTOM of SVG (fills below waveline)
// position="top": visually flipped so honey fill appears at TOP of SVG

function WavyDivider({
  fill,
  position = 'bottom',
}: {
  fill: string
  position?: 'top' | 'bottom'
}) {
  // Bottom path: waveline in middle, fill below → bottom of SVG
  const bottomPath =
    'M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1350,20 1440,40 L1440,80 L0,80 Z'
  // Top path: waveline in middle, fill above → top of SVG
  const topPath =
    'M0,40 C180,0 360,80 540,40 C720,0 900,80 1080,40 C1260,0 1350,60 1440,40 L1440,0 L0,0 Z'

  return (
    <div className="w-full overflow-hidden leading-none">
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-14 md:h-20 block"
      >
        <path d={position === 'top' ? topPath : bottomPath} fill={fill} />
      </svg>
    </div>
  )
}

// ─── Experience categories ────────────────────────────────────────────────────
interface Category {
  label: string
  icon: LucideIcon
  color: string
  bg: string
  href: string
}

const CATEGORIES: Category[] = [
  { label: 'Trekking', icon: Mountain, color: '#2D6A4F', bg: '#D4EDE6', href: '/experiences?type=trekking' },
  { label: 'Camping', icon: Tent, color: '#6B4226', bg: '#E8D5C4', href: '/experiences?type=camping' },
  { label: 'Culture', icon: Palette, color: '#C1440E', bg: '#F5D0C4', href: '/experiences?type=culture' },
  { label: 'Stays', icon: Home, color: '#1B4FD8', bg: '#D4DFFF', href: '/stays' },
  { label: 'Activities', icon: Zap, color: '#F59E0B', bg: '#FEF3C7', href: '/experiences?type=activities' },
  { label: 'Learning', icon: GraduationCap, color: '#7C3AED', bg: '#EDE9FE', href: '/student-program' },
]

// ─── Destination images ───────────────────────────────────────────────────────
const DESTINATION_IMAGES: Record<string, string> = {
  'himachal-pradesh':
    'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
  rajasthan:
    'https://assets.myntassets.com/assets/images/2026/MARCH/24/JCyziwzs_6ee01729919d469899c817cec3ea5cd8.jpg',
  uttarakhand:
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  kashmir:
    'https://assets.myntassets.com/assets/images/2026/MARCH/24/D2v6kHyH_d1c879ce666440a292c02cf334ea2085.jpg',
}


// ─── Main page ────────────────────────────────────────────────────────────────
export default function DestinationsPage() {
  const [activeRegion, setActiveRegion] = useState<string>('all')
  const cardsSectionRef = useRef<HTMLElement>(null)

  const filteredLocations =
    activeRegion === 'all'
      ? [...LOCATIONS]
      : LOCATIONS.filter((l) => l.slug === activeRegion)

  const handleRegionFilter = (slug: string) => {
    setActiveRegion(slug)
    setTimeout(() => {
      cardsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  return (
    <main>

      {/* ═══ SECTION 1: HERO ═══════════════════════════════════════════════════ */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&q=80"
          alt="Himalayan landscape"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <span className="font-handwriting text-yellow text-xl mb-3 block">
            explore india differently
          </span>
          <h1 className="font-display font-black text-white text-4xl md:text-6xl lg:text-7xl leading-tight">
            Pick Your Direction
          </h1>
          <p className="font-body text-white/80 text-lg max-w-2xl mx-auto mt-4">
            Destinations we&apos;ve lived and explored before offering them to you.
          </p>
        </div>

        {/* Wavy SVG divider into Section 2 (#FFF8E7) */}
        <div className="absolute bottom-[-1px] left-0 right-0 z-10">
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-14 md:h-20 block"
          >
            <path
              d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1350,20 1440,40 L1440,80 L0,80 Z"
              fill="#FFF8E7"
            />
          </svg>
        </div>
      </section>

      {/* ═══ SECTION 2: REGION FILTER TABS ════════════════════════════════════ */}
      <section className="bg-[#FFF8E7] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveRegion('all')}
              className={cn(
                'font-body text-sm px-5 py-2 rounded-full border-2 transition-colors duration-200',
                activeRegion === 'all'
                  ? 'bg-dark text-white border-dark'
                  : 'bg-white text-dark border-gray-200 hover:bg-gray-50'
              )}
            >
              All Regions
            </button>

            {LOCATIONS.map((location) => {
              const theme = REGION_THEMES[location.slug as RegionThemeKey]
              if (!theme) return null
              const isActive = activeRegion === location.slug
              return (
                <button
                  key={location.slug}
                  onClick={() => setActiveRegion(location.slug)}
                  style={
                    isActive
                      ? ({ '--rb': theme.primary } as React.CSSProperties)
                      : undefined
                  }
                  className={cn(
                    'font-body text-sm px-5 py-2 rounded-full border-2 transition-colors duration-200',
                    isActive
                      ? 'bg-[var(--rb)] text-white border-[var(--rb)]'
                      : 'bg-white text-dark border-gray-200 hover:bg-gray-50'
                  )}
                >
                  {theme.emoji} {location.name}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: MAP + INTRO ════════════════════════════════════════════ */}
      <section className="bg-[#FFF8E7] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* LEFT — Text + Region pills */}
            <div className="relative">
              <div className="absolute -top-2 right-4 z-10 hidden lg:block">
                <PostageStamp region="himachal-pradesh" />
              </div>

              <div className="relative inline-block mb-6">
                <WashiTape color="yellow" rotation={-2} width="w-40" />
                <span className="absolute inset-0 flex items-center justify-center font-handwriting text-dark/80 text-sm pointer-events-none">
                  your next chapter →
                </span>
              </div>

              <SectionLabel
                text="Regions We've Explored"
                style="handwritten"
                className="block mb-5"
              />

              <h2 className="font-display font-bold text-dark text-3xl leading-tight mb-4">
                Every journey starts with a place.
              </h2>
              <p className="font-body text-dark/60 text-base leading-relaxed mb-8">
                These are destinations we&apos;ve lived and explored on foot, by road,
                and with local guides — before we ever took a group there.
              </p>

              <div className="flex flex-col gap-4">
                {LOCATIONS.map((location) => {
                  const theme = REGION_THEMES[location.slug as RegionThemeKey]
                  if (!theme) return null
                  return (
                    <Link
                      key={location.slug}
                      href={`/destinations/${location.slug}`}
                      style={{ '--rp': theme.primary } as React.CSSProperties}
                      className="flex items-center gap-3 group w-fit"
                    >
                      <span className="w-3 h-3 rounded-full flex-none bg-[var(--rp)]" />
                      <span className="font-body text-sm text-dark group-hover:text-[var(--rp)] transition-colors duration-200">
                        {location.name}
                      </span>
                      <span className="text-base">{theme.emoji}</span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* RIGHT — India map */}
            <IndiaMap
              activeRegion={activeRegion}
              onRegionClick={handleRegionFilter}
            />

          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: EXPERIENCE CATEGORIES ═════════════════════════════════ */}
      <section className="bg-[#E8F4F0]">
        <WavyDivider fill="#FFF8E7" position="top" />

        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-dark text-3xl">
              What Would You Like To Do?
            </h2>
            <p className="font-handwriting text-blue text-xl mt-2">
              choose your vibe →
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.label}
                  href={cat.href}
                  style={
                    { '--cat': cat.color, '--cat-bg': cat.bg } as React.CSSProperties
                  }
                  className={cn(
                    'group bg-white rounded-2xl p-6 text-center block',
                    'shadow-[var(--shadow-card)]',
                    'hover:-translate-y-1 hover:shadow-[var(--shadow-polaroid)]',
                    'transition-all duration-200'
                  )}
                >
                  <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center bg-[var(--cat-bg)] group-hover:bg-[var(--cat)] transition-colors duration-200">
                    <Icon
                      size={28}
                      className="text-[var(--cat)] group-hover:text-white transition-colors duration-200"
                    />
                  </div>
                  <p className="font-heading font-semibold text-dark text-sm">
                    {cat.label}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>

        <WavyDivider fill="#FFF8E7" position="bottom" />
      </section>

      {/* ═══ SECTION 5: REGION SECTIONS ═══════════════════════════════════════ */}
      <section
        ref={cardsSectionRef}
        className="bg-[#FFF8E7] py-16 md:py-24 scroll-mt-16"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <SectionLabel text="Where We Go" style="handwritten" className="block mb-3" />
            <h2 className="font-display font-bold text-dark text-3xl">
              {activeRegion === 'all'
                ? 'All Destinations'
                : REGION_THEMES[activeRegion as RegionThemeKey]?.name ?? 'Destinations'}
            </h2>
          </div>

          {LOCATIONS.map((location) => (
            <div
              key={location.slug}
              className={activeRegion !== 'all' && activeRegion !== location.slug ? 'hidden' : ''}
            >
              <RegionSection
                region={location.slug as RegionThemeKey}
                experiences={REGION_EXPERIENCES[location.slug as RegionThemeKey]}
              />
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}
