import type React from "react"
import { DashboardSidebarClient } from "@/components/client/dashboard-sidebar-client"
import { DashboardTopNavClient } from "@/components/client/dashboard-topnav-client"

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebarClient />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardTopNavClient />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
