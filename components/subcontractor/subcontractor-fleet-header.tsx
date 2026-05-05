"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function SubcontractorFleetHeader() {
  const pathname = usePathname()
  const isVehiclesPage =
    pathname === "/subcontractor-dashboard/fleet" || pathname === "/subcontractor-dashboard/fleet/vehicles"
  const isDriversPage = pathname === "/subcontractor-dashboard/fleet/drivers"
  const isMaintenancePage = pathname.startsWith("/subcontractor-dashboard/fleet/maintenance")

  return (
    <div className="bg-card border-b border-border">
      {/* Top section with title */}
      <div className="px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">Fleet Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your fleet vehicles, maintenance schedules, and performance metrics
          </p>
        </div>
      </div>

      {/* Secondary navigation tabs */}
      <div className="px-6 border-t border-border">
        <nav className="flex space-x-6 -mb-px">
          <Link
            href="/subcontractor-dashboard/fleet"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isVehiclesPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Subcontractor Fleet
          </Link>
          <Link
            href="/subcontractor-dashboard/fleet/drivers"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isDriversPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Drivers
          </Link>
          <Link
            href="/subcontractor-dashboard/fleet/maintenance"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isMaintenancePage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Vehicle Maintenance
          </Link>
        </nav>
      </div>
    </div>
  )
}
