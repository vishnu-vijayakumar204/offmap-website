'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Mountain,
  Tent,
  Landmark,
  Binoculars,
  Zap,
  Home,
  Star,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { REGION_THEMES, LOCATIONS, type RegionThemeKey } from '@/lib/constants'
import {
  PostageStamp,
  WashiTape,
  StampBadge,
  JournalNote,
  SectionLabel,
} from '@/components/ui/scrapbook'
import { ExperienceCard, type ExperienceCardData } from '@/components/ui/ExperienceCard'
import { cn } from '@/lib/utils'

// ─── Wavy SVG divider ────────────────────────────────────────────────────────
function WavyDivider({ fill }: { fill: string }) {
  return (
    <div className="w-full overflow-hidden leading-none -mb-px">
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-14 md:h-20 block"
      >
        <path
          d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1350,20 1440,40 L1440,80 L0,80 Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}

// ─── Experiences data ────────────────────────────────────────────────────────
const EXPERIENCES: ExperienceCardData[] = [
  {
    name: 'Bir–Barot Trek',
    region: 'Himachal Pradesh',
    regionSlug: 'himachal-pradesh',
    type: 'Trekking',
    days: '4 days',
    price: '₹8,999',
    description: 'Apple orchards, pine forests and shepherd villages that most maps don\'t show.',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80',
    featured: true,
  },
  {
    name: 'Rajgundha Valley',
    region: 'Himachal Pradesh',
    regionSlug: 'himachal-pradesh',
    type: 'Camping',
    days: '3 days',
    price: '₹7,499',
    description: 'Remote valley camping with local shepherd families under open Himalayan skies.',
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=600&q=80',
  },
  {
    name: 'Shangarh–Raghupur Fort',
    region: 'Himachal Pradesh',
    regionSlug: 'himachal-pradesh',
    type: 'Cultural',
    days: '2 days',
    price: '₹5,999',
    description: 'Ancient fort ruins perched above a sacred meadow with Himalayan valley views.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80',
  },
  {
    name: 'Paragliding in Bir',
    region: 'Himachal Pradesh',
    regionSlug: 'himachal-pradesh',
    type: 'Activities',
    days: '1 day',
    price: '₹3,499',
    description: 'Tandem paragliding from the world\'s best launch site above the Kangra Valley.',
    image: 'https://images.unsplash.com/photo-1601024445168-8de05a04a38e?w=600&q=80',
  },
  {
    name: 'Jawai Safari',
    region: 'Rajasthan',
    regionSlug: 'rajasthan',
    type: 'Wildlife',
    days: '3 days',
    price: '₹11,999',
    description: 'Leopard territory, ancient temples and tribal villages off the tourist trail.',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed31459?w=600&q=80',
  },
  {
    name: 'Udaipur–Mount Abu',
    region: 'Rajasthan',
    regionSlug: 'rajasthan',
    type: 'Cultural',
    days: '4 days',
    price: '₹10,999',
    description: 'Lakes, palaces and the only hill station in Rajasthan — slow and real.',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80',
  },
  {
    name: 'Jaisalmer Dunes',
    region: 'Rajasthan',
    regionSlug: 'rajasthan',
    type: 'Adventure',
    days: '3 days',
    price: '₹9,499',
    description: 'Desert camping under a billion stars in the golden heart of the Thar.',
    image: 'https://images.unsplash.com/photo-1619837374214-0deea4c1d3e4?w=600&q=80',
  },
  {
    name: 'Horse Riding Workshop',
    region: 'Rajasthan',
    regionSlug: 'rajasthan',
    type: 'Activities',
    days: '1 day',
    price: '₹2,999',
    description: 'Traditional Marwari horse riding with local trainers in the desert heartland.',
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&q=80',
  },
  {
    name: 'Kasar Devi–Khaliya Top',
    region: 'Uttarakhand',
    regionSlug: 'uttarakhand',
    type: 'Trekking',
    days: '5 days',
    price: '₹12,999',
    description: 'Through rhododendron forests to high meadows with sweeping Himalayan panoramas.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80',
  },
  {
    name: 'Binsar Wildlife Sanctuary',
    region: 'Uttarakhand',
    regionSlug: 'uttarakhand',
    type: 'Wildlife',
    days: '3 days',
    price: '₹8,499',
    description: 'Dense oak forests, Himalayan birds and the quiet chance of spotting a leopard.',
    image: 'https://images.unsplash.com/photo-1600097454296-12f6d5c3b4d9?w=600&q=80',
  },
  {
    name: 'Dal Lake Experience',
    region: 'Kashmir',
    regionSlug: 'kashmir',
    type: 'Stays',
    days: '4 days',
    price: 'Coming Soon',
    description: 'Shikara rides through floating gardens, saffron fields and silent mornings.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80',
    comingSoon: true,
  },
  {
    name: 'Gulmarg in Snow',
    region: 'Kashmir',
    regionSlug: 'kashmir',
    type: 'Adventure',
    days: '3 days',
    price: 'Coming Soon',
    description: 'Asia\'s highest gondola and winter trails through untouched snowfields.',
    image: 'https://images.unsplash.com/photo-1588083920840-7c26994d1f4e?w=600&q=80',
    comingSoon: true,
  },
]

// ─── Activity types for carousel ─────────────────────────────────────────────
const ACTIVITY_TYPES = [
  { label: 'Trekking', value: 'trekking', icon: Mountain, color: '#2D6A4F', bg: '#E8F5EE' },
  { label: 'Camping', value: 'camping', icon: Tent, color: '#6B4226', bg: '#EBE0D5' },
  { label: 'Cultural', value: 'cultural', icon: Landmark, color: '#C1440E', bg: '#FBE9DC' },
  { label: 'Wildlife', value: 'wildlife', icon: Binoculars, color: '#F59E0B', bg: '#FFF3CD' },
  { label: 'Adventure', value: 'adventure', icon: Zap, color: '#1B4FD8', bg: '#EEF2FF' },
  { label: 'Stays', value: 'stays', icon: Home, color: '#7C3AED', bg: '#F3E8FF' },
  { label: 'Activities', value: 'activities', icon: Star, color: '#0D9488', bg: '#CCFBF1' },
  { label: 'Learning', value: 'learning', icon: BookOpen, color: '#FFD60A', bg: '#FFFDE8' },
] as const

// ─── Region filter buttons ────────────────────────────────────────────────────
const REGIONS = [
  { label: 'All', value: 'all', primary: '#0F172A' },
  ...LOCATIONS.map((l) => ({
    label: REGION_THEMES[l.slug as RegionThemeKey]?.name.split(' ')[0] ?? l.name,
    value: l.slug,
    primary: REGION_THEMES[l.slug as RegionThemeKey]?.primary ?? '#0F172A',
  })),
]

// ─── Page ────────────────────────────────────────────────────────────────────
export default function ExperiencesPage() {
  const [activeRegion, setActiveRegion] = useState('all')
  const [activeType, setActiveType] = useState('all')

  const gridRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [carouselScroll, setCarouselScroll] = useState(0)

  const handleCarouselScroll = useCallback(() => {
    if (carouselRef.current) setCarouselScroll(carouselRef.current.scrollLeft)
  }, [])

  const scrollCarousel = (dir: 'left' | 'right') => {
    carouselRef.current?.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' })
  }

  const handleActivityClick = (value: string) => {
    setActiveType(value === activeType ? 'all' : value)
    setTimeout(
      () => gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      80
    )
  }

  const filteredExperiences = EXPERIENCES.filter((e) => {
    const regionMatch = activeRegion === 'all' || e.regionSlug === activeRegion
    const typeMatch = activeType === 'all' || e.type.toLowerCase() === activeType
    return regionMatch && typeMatch
  })

  const featured = EXPERIENCES[0]
  const featuredTheme = REGION_THEMES[featured.regionSlug as RegionThemeKey]

  const isCarouselAtStart = carouselScroll <= 8
  const isCarouselAtEnd = carouselRef.current
    ? carouselScroll >= carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 8
    : false

  return (
    <main>

      {/* ════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ════════════════════════════════════════════════════════════ */}
      <section className="relative h-[55vh] min-h-[420px] overflow-hidden flex items-center justify-center text-center">
        <Image
          src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1920&q=80"
          alt="Experiences hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />

        <div className="relative z-10 px-4 max-w-2xl mx-auto">
          <p className="font-handwriting text-yellow-400 text-xl mb-3">
            not your usual trip
          </p>
          <h1 className="font-display font-black text-white text-4xl md:text-6xl leading-tight mb-4">
            Experience the Unscripted
          </h1>
          <p className="font-body text-white/80 text-lg max-w-xl mx-auto">
            Every experience is something we&apos;ve done ourselves first. No packages. No
            checklists. Just real.
          </p>
        </div>

        {/* Wavy bottom into filter bar */}
        <div className="absolute bottom-[-1px] left-0 right-0 z-10">
          <WavyDivider fill="#FFF8E7" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 2 — FILTER BAR (sticky)
      ════════════════════════════════════════════════════════════ */}
      <div className="sticky top-16 z-40 bg-[#FFF8E7]/95 backdrop-blur-sm border-b border-[#E2E8F0]/50">
        <div className="max-w-7xl mx-auto px-4 py-4">

          {/* Row 1 — By Region */}
          <div className="flex flex-wrap gap-2 mb-3">
            {REGIONS.map((r) => {
              const isActive = activeRegion === r.value
              return (
                <button
                  key={r.value}
                  onClick={() => setActiveRegion(r.value)}
                  style={
                    isActive
                      ? ({ '--rc': r.primary } as React.CSSProperties)
                      : undefined
                  }
                  className={cn(
                    'px-4 py-1.5 rounded-full font-body text-sm font-medium transition-all duration-150',
                    isActive
                      ? 'bg-[var(--rc)] text-white shadow-sm'
                      : 'bg-white border-2 border-gray-200 text-dark/70 hover:border-gray-300'
                  )}
                >
                  {r.label}
                </button>
              )
            })}
          </div>

          {/* Row 2 — By Type */}
          <div className="flex flex-wrap gap-2">
            {[{ label: 'All Types', value: 'all' }, ...ACTIVITY_TYPES.map((a) => ({ label: a.label, value: a.value }))].map(
              (t) => {
                const isActive = activeType === t.value
                return (
                  <button
                    key={t.value}
                    onClick={() => setActiveType(t.value)}
                    className={cn(
                      'px-3 py-1 rounded-full font-body text-xs font-medium border-2 transition-all duration-150',
                      isActive
                        ? 'bg-dark text-white border-dark'
                        : 'bg-white border-gray-200 text-dark/60 hover:border-gray-300'
                    )}
                  >
                    {t.label}
                  </button>
                )
              }
            )}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          SECTION 3 — FEATURED EXPERIENCE
      ════════════════════════════════════════════════════════════ */}
      <section className="bg-[#FFF8E7] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

            {/* LEFT — Image */}
            <div className="relative h-72 md:h-80 rounded-2xl overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <PostageStamp region={featured.regionSlug as RegionThemeKey} />
              </div>
            </div>

            {/* RIGHT — Content */}
            <div>
              <WashiTape color="yellow" rotation={-2} width="w-28" className="mb-4" />
              <p className="font-handwriting text-dark/50 text-lg mb-2">our favourite →</p>

              <div className="mb-3">
                <StampBadge text="Featured" color={featuredTheme.primary} rotation={-3} />
              </div>

              <h2 className="font-display font-black text-dark text-3xl md:text-4xl leading-tight mb-1">
                {featured.name}
              </h2>
              <p
                style={{ color: featuredTheme.primary }}
                className="font-handwriting text-lg mb-4"
              >
                {featured.region}
              </p>
              <p className="font-body text-gray-600 text-base leading-relaxed mb-6">
                A 4-day journey through apple orchards, pine forests and shepherd villages
                that most maps don&apos;t show.
              </p>

              {/* Detail pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { emoji: '📅', label: '4 Days' },
                  { emoji: '👥', label: 'Group' },
                  { emoji: '💰', label: 'From ₹8,999' },
                ].map((pill) => (
                  <span
                    key={pill.label}
                    className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1 font-body text-sm text-dark/70"
                  >
                    <span>{pill.emoji}</span>
                    {pill.label}
                  </span>
                ))}
              </div>

              <Link
                href={`/destinations/${featured.regionSlug}`}
                className="inline-block font-body font-semibold text-dark bg-yellow px-6 py-3 border-2 border-dark hover:bg-yellow/80 transition-colors duration-200"
              >
                View Experience →
              </Link>
            </div>
          </div>
        </div>

        <WavyDivider fill="#E8F4F0" />
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 4 — ALL EXPERIENCES GRID
      ════════════════════════════════════════════════════════════ */}
      <section ref={gridRef} className="bg-[#E8F4F0] py-16 md:py-20 scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-10">
            <div>
              <SectionLabel text="All Experiences" style="handwritten" className="block mb-2" />
              <p className="font-handwriting text-dark/50 text-lg">
                every one of these we&apos;ve done ourselves
              </p>
            </div>
            <div className="sm:ml-auto">
              <StampBadge
                text={`${filteredExperiences.length} experience${filteredExperiences.length !== 1 ? 's' : ''}`}
                color="#0F172A"
                rotation={-2}
              />
            </div>
          </div>

          {/* Grid */}
          {filteredExperiences.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExperiences.map((exp) => (
                <ExperienceCard key={exp.name} {...exp} />
              ))}
            </div>
          ) : (
            <div className="py-20 flex flex-col items-center gap-6">
              <JournalNote
                text="nothing here yet — check back soon 🗺️"
                type="sticky"
                className="text-center"
              />
              <button
                onClick={() => { setActiveRegion('all'); setActiveType('all') }}
                className="font-body text-sm text-dark/50 underline underline-offset-2 hover:text-dark transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        <WavyDivider fill="#FFF8E7" />
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 5 — ACTIVITY TYPES CAROUSEL
      ════════════════════════════════════════════════════════════ */}
      <section className="bg-[#FFF8E7] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <div className="mb-10">
            <h2 className="font-display font-bold text-dark text-3xl mb-1">
              Browse by Activity
            </h2>
            <p className="font-handwriting text-dark/50 text-xl">
              what kind of traveler are you?
            </p>
          </div>

          {/* Carousel */}
          <div className="relative">
            {/* Left arrow */}
            {!isCarouselAtStart && (
              <button
                onClick={() => scrollCarousel('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-11 h-11 rounded-full bg-white shadow-[var(--shadow-card)] flex items-center justify-center hover:shadow-[var(--shadow-polaroid)] transition-shadow duration-200"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} className="text-dark" />
              </button>
            )}

            {/* Right arrow */}
            {!isCarouselAtEnd && (
              <button
                onClick={() => scrollCarousel('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-11 h-11 rounded-full bg-white shadow-[var(--shadow-card)] flex items-center justify-center hover:shadow-[var(--shadow-polaroid)] transition-shadow duration-200"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} className="text-dark" />
              </button>
            )}

            <div
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              className="flex gap-4 overflow-x-auto pb-2"
              style={
                {
                  scrollSnapType: 'x mandatory',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                } as React.CSSProperties
              }
            >
              {ACTIVITY_TYPES.map((act) => {
                const Icon = act.icon
                const isActive = activeType === act.value
                return (
                  <button
                    key={act.value}
                    onClick={() => handleActivityClick(act.value)}
                    style={
                      {
                        scrollSnapAlign: 'start',
                        '--act-color': act.color,
                        '--act-bg': act.bg,
                      } as React.CSSProperties
                    }
                    className={cn(
                      'flex-shrink-0 w-32 bg-white rounded-2xl p-5 text-center',
                      'shadow-[var(--shadow-card)]',
                      'hover:-translate-y-1 hover:shadow-[var(--shadow-polaroid)]',
                      'transition-all duration-200 cursor-pointer',
                      isActive && 'ring-2 ring-[var(--act-color)] ring-offset-2'
                    )}
                  >
                    {/* Icon circle */}
                    <div
                      style={{ backgroundColor: act.bg }}
                      className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-2"
                    >
                      <Icon size={24} style={{ color: act.color }} />
                    </div>
                    <p
                      style={{ color: isActive ? act.color : undefined }}
                      className="font-heading font-semibold text-xs text-dark leading-tight"
                    >
                      {act.label}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <WavyDivider fill="#F59E0B" />
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 6 — STUDENT PROGRAM CALLOUT
      ════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F59E0B] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* LEFT */}
            <div>
              <span className="text-8xl block mb-5" role="img" aria-label="School bag">
                🎒
              </span>
              <h2 className="font-display font-black text-dark text-3xl md:text-4xl leading-tight mb-4">
                Schools &amp; Colleges
              </h2>
              <p className="font-body text-dark/70 text-base leading-relaxed mb-8 max-w-md">
                Experiential learning through nature and culture. We design school and college
                programs that go beyond textbooks.
              </p>
              <Link
                href="/student-program"
                className="inline-block font-body font-semibold text-white bg-dark px-6 py-3 border-2 border-dark hover:bg-dark/90 transition-colors duration-200"
              >
                Plan a School Trip →
              </Link>
            </div>

            {/* RIGHT — 3 benefit tiles */}
            <div className="flex flex-col gap-3">
              {[
                '✅ Real terrain, real learning',
                '✅ Confidence + curiosity building',
                '✅ Designed for Indian schools',
              ].map((benefit) => (
                <div
                  key={benefit}
                  className="bg-white/20 rounded-xl p-4"
                >
                  <p className="font-handwriting text-dark text-lg">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <WavyDivider fill="#FFD60A" />
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 7 — FINAL CTA
      ════════════════════════════════════════════════════════════ */}
      <section className="bg-yellow py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <WashiTape color="blue" rotation={-1} width="w-24" className="mx-auto mb-6" />
          <h2 className="font-display font-black text-dark text-4xl md:text-5xl leading-tight mb-3">
            Can&apos;t decide? We&apos;ll help.
          </h2>
          <p className="font-handwriting text-dark/60 text-xl mb-10">
            no pressure, no fixed plans
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="font-body font-semibold text-white bg-dark px-8 py-4 border-2 border-dark hover:bg-dark/90 transition-colors duration-200"
            >
              Talk to Us
            </Link>
            <Link
              href="/destinations"
              className="font-body font-semibold text-dark px-8 py-4 border-2 border-dark hover:bg-dark/10 transition-colors duration-200"
            >
              View All Destinations
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
