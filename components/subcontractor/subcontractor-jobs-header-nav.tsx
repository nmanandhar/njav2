"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function SubcontractorJobsHeaderNav() {
  const pathname = usePathname()
  const isJobsPage = pathname === "/subcontractor-dashboard/jobs" || pathname === "/subcontractor-dashboard/jobs/jobs"
  const isCalendarPage = pathname?.includes("/jobs/calendar")
  const isPreStartPage = pathname?.includes("/jobs/pre-start-checklists")

  return (
    <div className="bg-card border-b border-border">
      {/* Top section with title */}
      <div className="px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">Jobs Management</h1>
          <p className="text-sm text-muted-foreground mt-1">View and manage your assigned jobs</p>
        </div>
      </div>

      {/* Secondary navigation tabs */}
      <div className="px-6 border-t border-border">
        <nav className="flex space-x-6 -mb-px">
          <Link
            href="/subcontractor-dashboard/jobs"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isJobsPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Jobs
          </Link>
          <Link
            href="/subcontractor-dashboard/jobs/calendar"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isCalendarPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Calendar
          </Link>
          <Link
            href="/subcontractor-dashboard/jobs/pre-start-checklists"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isPreStartPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Pre-Start Checklists Log
          </Link>
        </nav>
      </div>
    </div>
  )
}
