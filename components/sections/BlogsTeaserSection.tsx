'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { StampBadge, WashiTape, SectionLabel } from '@/components/ui/scrapbook'
import { useStaggerReveal } from '@/hooks/useStaggerReveal'
import { cn } from '@/lib/utils'

interface BlogPost {
  title: string
  category: string
  categoryColor: string
  date: string
  image: string
  href: string
  rotation: number
  washiColor: 'yellow' | 'blue' | 'pink'
}

const BLOG_POSTS: BlogPost[] = [
  {
    title: 'A 4-Day Slow Trek Through Bir to Barot Valley',
    category: 'Himachal Pradesh',
    categoryColor: '#2D6A4F',
    date: 'March 2025',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80',
    href: '/blogs/bir-barot-trek',
    rotation: -2,
    washiColor: 'yellow',
  },
  {
    title: "Why Jawai is Rajasthan's Best Kept Secret",
    category: 'Rajasthan',
    categoryColor: '#C1440E',
    date: 'February 2025',
    image:
      'https://assets.myntassets.com/assets/images/2026/MARCH/24/cPwCjdUZ_9141407da6e44b8993e93958dda3b3cd.jpg',
    href: '/blogs/jawai-rajasthan',
    rotation: 1,
    washiColor: 'pink',
  },
  {
    title: 'Traveling Slow: What It Actually Means',
    category: 'Travel Philosophy',
    categoryColor: '#1B4FD8',
    date: 'January 2025',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    href: '/blogs/slow-travel',
    rotation: -1,
    washiColor: 'blue',
  },
]

export function BlogsTeaserSection() {
  const gridRef = useRef<HTMLDivElement>(null)
  useStaggerReveal(gridRef)

  return (
    <section className="bg-[#FFF0F3] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <SectionLabel text="The Chronicle" style="stamp" className="mb-3" />
          <p className="font-handwriting text-blue text-xl mt-4">
            stories from the road →
          </p>
        </div>

        {/* Blog cards — corkboard scattered */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-start"
        >
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              style={{ '--post-r': `${post.rotation}deg` } as React.CSSProperties}
              className={cn(
                'group block bg-white',
                'rotate-[var(--post-r)] hover:rotate-0 hover:scale-[1.02]',
                'transition-all duration-300',
                'shadow-[2px_2px_10px_rgba(0,0,0,0.1)] hover:shadow-[4px_4px_18px_rgba(0,0,0,0.15)]'
              )}
            >
              {/* Washi tape at top */}
              <div className="relative flex justify-center -mb-1 z-10">
                <WashiTape color={post.washiColor} rotation={0} width="w-16" />
              </div>

              {/* Image with category badge */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Category stamp */}
                <div className="absolute top-2 right-2 z-10">
                  <StampBadge
                    text={post.category}
                    color={post.categoryColor}
                    rotation={3}
                    className="text-[9px]"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="font-handwriting text-gray-400 text-sm mb-2">{post.date}</p>
                <p className="font-display font-bold text-dark text-lg leading-snug mb-3 line-clamp-2">
                  {post.title}
                </p>
                <p className="font-handwriting text-blue text-base">
                  Read Journal →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
