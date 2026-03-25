import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { DM_Sans } from "next/font/google"
import { Fraunces } from "next/font/google"
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar"
import { PageTransition } from "@/components/layout/PageTransition"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-fraunces",
})

export const metadata: Metadata = {
  title: "OffMap India",
  description: "Go Where The Map Ends",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${dmSans.variable} ${fraunces.variable} antialiased`}>
        <SmoothScrollProvider>
          <ScrollProgressBar />
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}