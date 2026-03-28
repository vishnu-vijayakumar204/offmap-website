import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Calendar, Users } from 'lucide-react'
import { LOCATIONS, REGION_THEMES, FEATURED_ROUTES, type RegionThemeKey } from '@/lib/constants'
import { PostageStamp, WashiTape, StampBadge } from '@/components/ui/scrapbook'

// ─── Images ───────────────────────────────────────────────────────────────────
const DESTINATION_IMAGES: Record<string, string> = {
  'himachal-pradesh':
    'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&q=80',
  rajasthan:
    'https://assets.myntassets.com/assets/images/2026/MARCH/24/JCyziwzs_6ee01729919d469899c817cec3ea5cd8.jpg',
  uttarakhand:
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
  kashmir:
    'https://assets.myntassets.com/assets/images/2026/MARCH/24/D2v6kHyH_d1c879ce666440a292c02cf334ea2085.jpg',
}

const ROUTE_IMAGES: Record<string, string> = {
  'bir-barot': 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=600&q=80',
  'rajgundha-valley': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80',
  'shangarh-raghupur-fort': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80',
  jawai: 'https://assets.myntassets.com/assets/images/2026/MARCH/24/cPwCjdUZ_9141407da6e44b8993e93958dda3b3cd.jpg',
  'kasar-devi-khaliya-top': 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80',
}

const ROUTE_DETAILS: Record<string, { days: string; type: string; tagline: string }> = {
  'bir-barot': { days: '4 days', type: 'Trek', tagline: 'Through pine forests and alpine meadows' },
  'rajgundha-valley': { days: '3 days', type: 'Valley Trek', tagline: 'A hidden valley few tourists find' },
  'shangarh-raghupur-fort': { days: '2 days', type: 'Heritage Walk', tagline: 'Sacred meadow and ancient fort ruins' },
  jawai: { days: '3 days', type: 'Wildlife', tagline: 'Leopards, temples, and the Bishnoi way of life' },
  'kasar-devi-khaliya-top': { days: '4 days', type: 'Himalayan Trek', tagline: 'High altitude meadows above Almora' },
}

// ─── Generate static paths ────────────────────────────────────────────────────
export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }))
}

// ─── Page ─────────────────────────────────────────────────────────────────────
interface Props {
  params: Promise<{ slug: string }>
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params

  const location = LOCATIONS.find((l) => l.slug === slug)
  if (!location) notFound()

  const theme = REGION_THEMES[slug as RegionThemeKey]
  if (!theme) notFound()

  const routes = FEATURED_ROUTES.filter((r) => r.location === slug)
  const heroImage = DESTINATION_IMAGES[slug] ?? DESTINATION_IMAGES['himachal-pradesh']

  return (
    <main>

      {/* ═══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <Image
          src={heroImage}
          alt={location.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70" />

        <div className="relative z-10 h-full flex flex-col justify-end px-4 pb-16 md:pb-20 max-w-7xl mx-auto w-full">
          <span className="font-handwriting text-yellow text-xl mb-3 block">
            {theme.emoji} {theme.label}
          </span>
          <h1 className="font-display font-black text-white text-5xl md:text-7xl lg:text-8xl leading-tight">
            {location.name}
          </h1>
          {location.intro && (
            <p className="font-body text-white/80 text-lg mt-3 max-w-xl">
              {location.intro}
            </p>
          )}
          <div className="flex gap-3 mt-6 flex-wrap">
            <Link
              href="/contact"
              style={{ '--tc': theme.primary } as React.CSSProperties}
              className="font-heading font-semibold text-white bg-[var(--tc)] px-6 py-3 rounded-none border-2 border-[var(--tc)] transition-colors duration-200 hover:bg-transparent text-sm"
            >
              Plan a Trip Here →
            </Link>
            {routes.length > 0 && (
              <Link
                href="#routes"
                className="font-body text-white border border-white/60 px-6 py-3 rounded-none text-sm transition-colors duration-200 hover:bg-white/10"
              >
                See Routes ↓
              </Link>
            )}
          </div>
        </div>

        {/* Wavy divider into next section */}
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

      {/* ═══ OVERVIEW ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#FFF8E7] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left — Description */}
            <div className="lg:col-span-7">
              <div className="relative inline-block mb-6">
                <WashiTape color="yellow" rotation={-2} width="w-32" />
                <span className="absolute inset-0 flex items-center justify-center font-handwriting text-dark/80 text-sm pointer-events-none">
                  why we love it
                </span>
              </div>

              <h2 className="font-display font-bold text-dark text-3xl md:text-4xl leading-tight mb-5">
                What Makes {location.name} Different
              </h2>

              <p className="font-body text-dark/70 text-base leading-relaxed mb-4">
                {theme.description} We discovered this place slowly — through local
                connections, on foot, and by staying long enough to understand the
                rhythm of the place.
              </p>
              <p className="font-body text-dark/70 text-base leading-relaxed mb-6">
                Every OffMap trip here is built around experiences that can&apos;t be
                replicated. Not tourist spots — real places, real people, real
                moments.
              </p>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: MapPin, label: 'On-ground scouted' },
                  { icon: Users, label: 'Small groups only' },
                  { icon: Calendar, label: 'Seasonal trips' },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      style={{ '--tc': theme.primary } as React.CSSProperties}
                      className="text-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-[var(--tc)]/10 flex items-center justify-center mx-auto mb-2">
                        <Icon size={20} className="text-[var(--tc)]" />
                      </div>
                      <p className="font-body text-dark/60 text-xs text-center leading-tight">
                        {item.label}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right — Region stamp card */}
            <div className="lg:col-span-5">
              <div
                style={
                  {
                    '--tc': theme.primary,
                    '--bg': theme.bg,
                  } as React.CSSProperties
                }
                className="bg-[var(--bg)] border-2 border-[var(--tc)] p-8 relative"
              >
                <div className="absolute -top-4 -right-4">
                  <PostageStamp region={slug as RegionThemeKey} />
                </div>

                <StampBadge
                  text={theme.label}
                  color={theme.primary}
                  rotation={-3}
                  className="mb-5"
                />

                <p className="font-display font-bold text-[var(--tc)] text-2xl mb-3">
                  {location.name}
                </p>
                <p className="font-body text-dark/60 text-sm leading-relaxed mb-6">
                  {theme.description}
                </p>

                <div className="border-t border-[var(--tc)]/20 pt-4">
                  <p className="font-handwriting text-[var(--tc)] text-base">
                    Best time: Oct–Jun (varies by route)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURED ROUTES ═══════════════════════════════════════════════════ */}
      {routes.length > 0 && (
        <section
          id="routes"
          className="bg-[#E8F4F0] py-16 md:py-24 scroll-mt-16"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-10">
              <span className="font-handwriting text-blue text-xl font-bold block mb-2">
                Experiences in {location.name} →
              </span>
              <h2 className="font-display font-bold text-dark text-3xl">
                Routes We&apos;ve Fallen in Love With
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {routes.map((route) => {
                const details = ROUTE_DETAILS[route.slug]
                const img = ROUTE_IMAGES[route.slug]
                return (
                  <Link
                    key={route.slug}
                    href={`/experiences/${route.slug}`}
                    style={
                      { '--tc': theme.primary } as React.CSSProperties
                    }
                    className="group block bg-white border-2 border-[var(--tc)] hover:shadow-[var(--shadow-polaroid)] transition-shadow duration-200"
                  >
                    <div className="relative h-48 overflow-hidden">
                      {img && (
                        <Image
                          src={img}
                          alt={route.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="p-5">
                      <p className="font-display font-bold text-dark text-lg mb-1">
                        {route.name}
                      </p>
                      {details && (
                        <>
                          <p className="font-body text-gray-500 text-xs mb-2">
                            {details.days} · {details.type}
                          </p>
                          <p className="font-handwriting text-dark/50 text-sm mb-4">
                            {details.tagline}
                          </p>
                        </>
                      )}
                      <p className="font-handwriting text-[var(--tc)] text-sm">
                        View Experience →
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══ CTA ═══════════════════════════════════════════════════════════════ */}
      <section
        style={{ '--tc': theme.primary } as React.CSSProperties}
        className="bg-[var(--tc)] py-16 md:py-20"
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="font-handwriting text-white/70 text-xl mb-4">
            Ready to go?
          </p>
          <h2 className="font-display font-black text-white text-4xl md:text-5xl leading-tight mb-6">
            Let&apos;s Plan Your {location.name} Trip
          </h2>
          <p className="font-body text-white/80 text-base mb-8 leading-relaxed">
            We&apos;ll help you figure out when to go, what to carry, and how to
            make the most of every day there.
          </p>
          <Link
            href="/contact"
            className="font-heading font-semibold text-[var(--tc)] bg-white px-8 py-3 rounded-none border-2 border-white inline-block transition-colors duration-200 hover:bg-transparent hover:text-white"
          >
            Plan With Us →
          </Link>
        </div>
      </section>

    </main>
  )
}
