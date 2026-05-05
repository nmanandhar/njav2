import React from "react"
import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "Job Tracking Portal | NJ Ashton Transport",
  description: "Track your delivery jobs and shipments in real-time",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0D5C46",
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}
