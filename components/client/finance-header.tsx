"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function FinanceHeader() {
  const pathname = usePathname()
  const isPurchaseOrdersPage = pathname === "/dashboard/finance/purchase-orders"
  const isInvoicesPage = pathname === "/dashboard/finance/invoices"
  const isStatementsPage = pathname === "/dashboard/finance/statements"

  return (
    <div className="bg-card border-b border-border">
      {/* Top section with title */}
      <div className="px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">Finance</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage purchase orders, invoices, and financial transactions
          </p>
        </div>
      </div>

      {/* Secondary navigation tabs */}
      <div className="px-6 border-t border-border">
        <nav className="flex space-x-6 -mb-px">
          <Link
            href="/dashboard/finance/purchase-orders"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isPurchaseOrdersPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Purchase Orders
          </Link>
          <Link
            href="/dashboard/finance/invoices"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isInvoicesPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Invoices
          </Link>
          <Link
            href="/dashboard/finance/statements"
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
