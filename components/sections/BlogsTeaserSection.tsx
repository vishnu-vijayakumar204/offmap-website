'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Card, CardBody } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface BlogPost {
  title: string
  category: string
  date: string
  image: string
  href: string
}

const BLOG_POSTS: BlogPost[] = [
  {
    title: 'A 4-Day Slow Trek Through Bir to Barot Valley',
    category: 'Himachal Pradesh',
    date: 'March 2025',
    image:
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80',
    href: '/blogs/bir-barot-trek',
  },
  {
    title: "Why Jawai is Rajasthan's Best Kept Secret",
    category: 'Rajasthan',
    date: 'February 2025',
    image:
      'https://images.unsplash.com/photo-1477587458883-47145ed6979e?w=600&q=80',
    href: '/blogs/jawai-rajasthan',
  },
  {
    title: 'Traveling Slow: What It Actually Means',
    category: 'Travel Philosophy',
    date: 'January 2025',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    href: '/blogs/slow-travel',
  },
]

export function BlogsTeaserSection() {
  const gridRef = useRef<HTMLDivElement>(null)
  useScrollAnimation(gridRef)

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-primary text-xs uppercase tracking-widest mb-3">
          BLOGS
        </p>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark mb-10">
          Stories, guides, and places to explore.
        </h2>
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {BLOG_POSTS.map((post) => (
            <Link key={post.href} href={post.href}>
              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <CardBody>
                  <Badge variant="default">{post.category}</Badge>
                  <p className="font-heading font-semibold text-dark text-lg mt-3 mb-1 line-clamp-2">
                    {post.title}
                  </p>
                  <p className="text-muted text-sm">{post.date}</p>
                  <div className="text-primary text-sm font-medium mt-3 flex items-center gap-1">
                    Read More <ArrowRight size={14} />
                  </div>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
