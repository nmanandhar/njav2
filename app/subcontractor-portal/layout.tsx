"use client"

import type React from "react"
import { SubcontractorTopNav } from "@/components/subcontractor-portal/subcontractor-topnav"
import { usePathname } from "next/navigation"

export default function SubcontractorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/subcontractor-portal"

  return (
    <div className="min-h-screen bg-background">
      {!isLoginPage && <SubcontractorTopNav />}
      <main>{children}</main>
    </div>
  )
}
