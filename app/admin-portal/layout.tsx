"use client"

import type React from "react"
import { AdminTopNav } from "@/components/admin/admin-topnav"
import { usePathname } from "next/navigation"

export default function AdminPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/admin-portal"

  return (
    <div className="min-h-screen bg-background">
      {!isLoginPage && <AdminTopNav />}
      <main className="w-full">{children}</main>
    </div>
  )
}
