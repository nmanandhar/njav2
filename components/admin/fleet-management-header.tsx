"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function FleetManagementHeader() {
  const pathname = usePathname()
  const isInternalFleetPage = pathname === "/admin-portal/fleet" || pathname === "/admin-portal/fleet/internal"
  const isDriversPage = pathname === "/admin-portal/fleet/drivers"
  const isMachineryPage = pathname === "/admin-portal/fleet/machinery"
  const isOperatorsPage = pathname === "/admin-portal/fleet/operators"
  const isMaintenancePage = pathname.startsWith("/admin-portal/fleet/maintenance")
  const isSubcontractorsPage = pathname === "/admin-portal/fleet/subcontractors"
  const isSubcontractorFleetPage = pathname === "/admin-portal/fleet/subcontractor-fleet"

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
            href="/admin-portal/fleet"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isInternalFleetPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Internal Fleet
          </Link>
          <Link
            href="/admin-portal/fleet/drivers"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isDriversPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Drivers
          </Link>
          <Link
            href="/admin-portal/fleet/machinery"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isMachineryPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Machinery
          </Link>
          <Link
            href="/admin-portal/fleet/operators"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isOperatorsPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Operators
          </Link>
          <Link
            href="/admin-portal/fleet/maintenance"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isMaintenancePage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Vehicle Maintenance
          </Link>
          <Link
            href="/admin-portal/fleet/subcontractors"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isSubcontractorsPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Subcontractors
          </Link>
          <Link
            href="/admin-portal/fleet/subcontractor-fleet"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isSubcontractorFleetPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Subcontractor Fleet
          </Link>
        </nav>
      </div>
    </div>
  )
}
