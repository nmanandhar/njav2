"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

export function AdminReportsHeaderNav() {
  const pathname = usePathname()
  const isOverviewPage = pathname === "/admin-portal/reports"
  const isFinancialPage = pathname?.includes("/reports/financial")
  const isOperationsPage = pathname?.includes("/reports/operations")
  const isClientsPage = pathname?.includes("/reports/clients")
  const isSubcontractorsPage = pathname?.includes("/reports/subcontractors")
  const isFleetPage = pathname?.includes("/reports/fleet")

  let currentSection = "Overview"
  if (isFinancialPage) currentSection = "Financial"
  else if (isOperationsPage) currentSection = "Operations"
  else if (isClientsPage) currentSection = "Clients"
  else if (isSubcontractorsPage) currentSection = "Subcontractors"
  else if (isFleetPage) currentSection = "Fleet"

  return (
    <div className="bg-card border-b border-border">
      <div className="px-6 pt-4 pb-2">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/admin-portal/reports" className="text-primary hover:underline">
            Reports
          </Link>
          {!isOverviewPage && (
            <>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{currentSection}</span>
            </>
          )}
        </div>
      </div>

      {/* Top section with title */}
      <div className="px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">Business Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">Comprehensive analytics and performance insights</p>
        </div>
      </div>

      {/* Secondary navigation tabs */}
      <div className="px-6 border-t border-border">
        <nav className="flex space-x-6 -mb-px">
          <Link
            href="/admin-portal/reports"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isOverviewPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Overview
          </Link>
          <Link
            href="/admin-portal/reports/financial"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isFinancialPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Financial
          </Link>
          <Link
            href="/admin-portal/reports/operations"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isOperationsPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Operations
          </Link>
          <Link
            href="/admin-portal/reports/clients"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isClientsPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Clients
          </Link>
          <Link
            href="/admin-portal/reports/subcontractors"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isSubcontractorsPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Subcontractors
          </Link>
          <Link
            href="/admin-portal/reports/fleet"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isFleetPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Fleet
          </Link>
        </nav>
      </div>
    </div>
  )
}
