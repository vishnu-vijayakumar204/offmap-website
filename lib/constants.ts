export const LOCATIONS = [
  {
    name: 'Himachal Pradesh',
    slug: 'himachal-pradesh',
    accentColor: {
      primary: '#1B4FD8',
      light: '#93C5FD',
      bg: '#EFF6FF',
    },
  },
  {
    name: 'Rajasthan',
    slug: 'rajasthan',
    accentColor: {
      primary: '#F59E0B',
      light: '#FCD34D',
      bg: '#FFFBEB',
    },
  },
] as const

export const TRIP_TYPES = [
  { label: 'Group Trips', value: 'group-trip' },
  { label: 'Day Trips', value: 'day-trip' },
  { label: 'School Trips', value: 'school-trip' },
  { label: 'Retreats', value: 'retreat' },
  { label: 'Stays', value: 'stay' },
  { label: 'Learning Experiences', value: 'learning-experience' },
] as const

export const SITE_CONFIG = {
  siteName: 'OffMap India',
  description: 'Go Where The Map Ends — Adventure travel in Himachal Pradesh and Rajasthan',
  contactEmail: 'info@offmap.in',
  whatsappNumber: '9211471385',
  whatsappUrl: 'https://wa.me/919211471385',
} as const

export const NAV_LINKS = [
  { label: 'Trips', href: '/trips' },
  { label: 'Stays', href: '/stays' },
  { label: 'School Trips', href: '/school-trips' },
  { label: 'Retreats', href: '/retreats' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
] as const

export type Location = (typeof LOCATIONS)[number]
export type TripType = (typeof TRIP_TYPES)[number]
export type NavLink = (typeof NAV_LINKS)[number]
