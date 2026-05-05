"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function MaintenanceHeader() {
  const pathname = usePathname()
  const isDefectsPage = pathname?.includes("/defects")
  const isVendorsPage = pathname?.includes("/vendors")
  const isCalendarPage = pathname?.includes("/calendar")
  const isTemplatesPage = pathname?.includes("/templates")
  const isCompliancePage = pathname?.includes("/compliance")

  return (
    <div className="bg-card border-b border-border">
      {/* Top section with title and actions */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Vehicle Maintenance</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor fleet maintenance, compliance, and service activities
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Secondary navigation tabs */}
      <div className="px-6 border-t border-border">
        <nav className="flex space-x-6 -mb-px">
          <Link
            href="/subcontractor-dashboard/fleet/maintenance"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              !isVendorsPage && !isCalendarPage && !isTemplatesPage && !isCompliancePage && !isDefectsPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Maintenance Dashboard
          </Link>
          <Link
            href="/subcontractor-dashboard/fleet/maintenance/defects"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isDefectsPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Defects & Inspections
          </Link>
          <Link
            href="/subcontractor-dashboard/fleet/maintenance/calendar"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isCalendarPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Service Calendar
          </Link>
          <Link
            href="/subcontractor-dashboard/fleet/maintenance/vendors"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isVendorsPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Service Vendors
          </Link>
          <Link
            href="/subcontractor-dashboard/fleet/maintenance/templates"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isTemplatesPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Work Order Templates
          </Link>
          <Link
            href="/subcontractor-dashboard/fleet/maintenance/compliance"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isCompliancePage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Compliance Documents Library
          </Link>
        </nav>
      </div>
    </div>
  )
}
