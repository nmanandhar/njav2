"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function SubcontractorFinanceHeader() {
  const pathname = usePathname()
  const isInvoicesPage = pathname?.startsWith("/subcontractor-dashboard/finance/invoices") || pathname === "/subcontractor-dashboard/invoices"
  const isStatementsPage = pathname?.startsWith("/subcontractor-dashboard/finance/statements")

  const currentTab = isStatementsPage
    ? "Statements"
    : "Invoices"

  return (
    <div className="bg-card border-b border-border">
      {/* Breadcrumb */}
      <div className="px-6 py-3 border-b border-border">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-orange-500 font-medium">Finance</span>
          <span className="text-muted-foreground">&rsaquo;</span>
          <span className="text-foreground">{currentTab}</span>
        </div>
      </div>

      {/* Top section with title */}
      <div className="px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">Finance</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage invoices and financial transactions
          </p>
        </div>
      </div>

      {/* Secondary navigation tabs */}
      <div className="px-6 border-t border-border">
        <nav className="flex space-x-6 -mb-px">
          <Link
            href="/subcontractor-dashboard/finance/invoices"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isInvoicesPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Invoices
          </Link>
          <Link
            href="/subcontractor-dashboard/finance/statements"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isStatementsPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Statements
          </Link>
        </nav>
      </div>
    </div>
  )
}
