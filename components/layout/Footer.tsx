import Link from 'next/link'
import { Instagram, Youtube, Linkedin, Phone, Mail } from 'lucide-react'
import { FOOTER_LINKS, SITE_CONFIG } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {FOOTER_LINKS.map((column) => (
            <div key={column.heading}>
              <h3 className="font-heading font-semibold text-sm uppercase tracking-widest text-white mb-4">
                {column.heading}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="flex flex-wrap items-center gap-6 py-6 border-t border-white/10 text-sm text-white/60">
          <a
            href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-2 hover:text-white transition-colors duration-200"
          >
            <Phone size={15} />
            {SITE_CONFIG.phone}
          </a>
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="flex items-center gap-2 hover:text-white transition-colors duration-200"
          >
            <Mail size={15} />
            {SITE_CONFIG.email}
          </a>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 border-t border-white/10">
          {/* Tagline */}
          <p className="font-body text-sm italic text-white/40 max-w-xs">
            No itineraries, no pressure. Just story led travel in Offmap Himachal.
          </p>

          {/* Copyright */}
          <p className="font-body text-sm text-white/50 order-last md:order-none">
            © 2025 {SITE_CONFIG.name}
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {SITE_CONFIG.socials.instagram !== undefined && (
              <a
                href={SITE_CONFIG.socials.instagram || '#'}
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-200"
              >
                <Instagram size={18} />
              </a>
            )}
            {SITE_CONFIG.socials.youtube !== undefined && (
              <a
                href={SITE_CONFIG.socials.youtube || '#'}
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-200"
              >
                <Youtube size={18} />
              </a>
            )}
            {SITE_CONFIG.socials.linkedin !== undefined && (
              <a
                href={SITE_CONFIG.socials.linkedin || '#'}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-200"
              >
                <Linkedin size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
