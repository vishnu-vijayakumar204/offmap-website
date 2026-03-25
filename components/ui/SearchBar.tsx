'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Calendar, Compass, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  className?: string
}

export function SearchBar({ className }: SearchBarProps) {
  const router = useRouter()
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [type, setType] = useState('')

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (date) params.set('date', date)
    if (type) params.set('type', type)
    router.push(`/experiences?${params.toString()}`)
  }

  return (
    <div className={cn('w-full', className)}>
      {/* Desktop layout */}
      <div className="hidden md:flex items-stretch bg-white rounded-2xl shadow-lg p-2 gap-0">
        {/* Field 1 — Location */}
        <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-xl transition-colors flex-1 min-w-0 cursor-pointer">
          <MapPin size={16} className="text-muted flex-none" />
          <div className="flex flex-col min-w-0">
            <label className="text-[10px] uppercase tracking-wider text-muted font-medium pointer-events-none">
              Where to?
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent text-dark text-sm font-medium focus:outline-none cursor-pointer w-full"
            >
              <option value="">All Destinations</option>
              <option value="himachal-pradesh">Himachal Pradesh</option>
              <option value="rajasthan">Rajasthan</option>
              <option value="kashmir">Kashmir</option>
              <option value="uttarakhand">Uttarakhand</option>
            </select>
          </div>
        </div>

        <div className="w-px self-stretch bg-border mx-1" />

        {/* Field 2 — Date */}
        <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-xl transition-colors flex-1 min-w-0 cursor-pointer">
          <Calendar size={16} className="text-muted flex-none" />
          <div className="flex flex-col min-w-0 w-full">
            <label className="text-[10px] uppercase tracking-wider text-muted font-medium pointer-events-none">
              When?
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="bg-transparent text-dark text-sm font-medium focus:outline-none cursor-pointer w-full"
            />
          </div>
        </div>

        <div className="w-px self-stretch bg-border mx-1" />

        {/* Field 3 — Experience Type */}
        <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-xl transition-colors flex-1 min-w-0 cursor-pointer">
          <Compass size={16} className="text-muted flex-none" />
          <div className="flex flex-col min-w-0">
            <label className="text-[10px] uppercase tracking-wider text-muted font-medium pointer-events-none">
              What?
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-transparent text-dark text-sm font-medium focus:outline-none cursor-pointer w-full"
            >
              <option value="">All Experiences</option>
              <option value="group-trips">Group Trips</option>
              <option value="day-trips">Day Trips</option>
              <option value="stays">Stays</option>
              <option value="activities">Activities</option>
              <option value="student-program">Student Program</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-yellow text-dark font-semibold rounded-xl px-6 py-3 flex items-center gap-2 hover:bg-yellow-dark transition-colors flex-none ml-1"
        >
          <Search size={16} />
          Search
        </button>
      </div>

      {/* Mobile layout */}
      <div className="flex flex-col md:hidden bg-white rounded-2xl shadow-lg p-3 gap-2">
        {/* Field 1 — Location */}
        <div className="flex items-center gap-3 px-4 py-3 border border-border rounded-xl">
          <MapPin size={16} className="text-muted flex-none" />
          <div className="flex flex-col flex-1 min-w-0">
            <label className="text-[10px] uppercase tracking-wider text-muted font-medium">
              Where to?
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent text-dark text-sm font-medium focus:outline-none cursor-pointer mt-0.5"
            >
              <option value="">All Destinations</option>
              <option value="himachal-pradesh">Himachal Pradesh</option>
              <option value="rajasthan">Rajasthan</option>
              <option value="kashmir">Kashmir</option>
              <option value="uttarakhand">Uttarakhand</option>
            </select>
          </div>
        </div>

        {/* Field 2 — Date */}
        <div className="flex items-center gap-3 px-4 py-3 border border-border rounded-xl">
          <Calendar size={16} className="text-muted flex-none" />
          <div className="flex flex-col flex-1 min-w-0">
            <label className="text-[10px] uppercase tracking-wider text-muted font-medium">
              When?
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="bg-transparent text-dark text-sm font-medium focus:outline-none cursor-pointer mt-0.5 w-full"
            />
          </div>
        </div>

        {/* Field 3 — Experience Type */}
        <div className="flex items-center gap-3 px-4 py-3 border border-border rounded-xl">
          <Compass size={16} className="text-muted flex-none" />
          <div className="flex flex-col flex-1 min-w-0">
            <label className="text-[10px] uppercase tracking-wider text-muted font-medium">
              What?
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-transparent text-dark text-sm font-medium focus:outline-none cursor-pointer mt-0.5"
            >
              <option value="">All Experiences</option>
              <option value="group-trips">Group Trips</option>
              <option value="day-trips">Day Trips</option>
              <option value="stays">Stays</option>
              <option value="activities">Activities</option>
              <option value="student-program">Student Program</option>
            </select>
          </div>
        </div>

        {/* Search Button — full width */}
        <button
          onClick={handleSearch}
          className="bg-yellow text-dark font-semibold rounded-xl px-6 py-3 flex items-center justify-center gap-2 hover:bg-yellow-dark transition-colors w-full"
        >
          <Search size={16} />
          Search
        </button>
      </div>
    </div>
  )
}
