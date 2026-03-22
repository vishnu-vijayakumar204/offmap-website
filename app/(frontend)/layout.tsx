import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { DM_Sans } from "next/font/google"
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
      <body className={`${poppins.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}