"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface CRMHeaderProps {
  onAddClick?: () => void
}

export function CRMHeader({ onAddClick }: CRMHeaderProps) {
  const pathname = usePathname()
  const isContractsPage = pathname?.includes("/contracts")
  const isClientsPage = pathname?.includes("/clients")
  const isTipPage = pathname?.includes("/tip")

  return (
    <div className="bg-card border-b border-border">
      {/* Top section with title and actions */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Customer Relationship Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage client contracts, relationships, and communications
          </p>
        </div>
        <Button onClick={onAddClick}>
          <Plus className="h-4 w-4 mr-2" />
          {isClientsPage ? "Add Client" : isTipPage ? "Add Tip" : "Add Contract"}
        </Button>
      </div>

      {/* Secondary navigation tabs */}
      <div className="px-6 border-t border-border">
        <nav className="flex space-x-6 -mb-px">
          <Link
            href="/admin-portal/crm/clients"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isClientsPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Clients
          </Link>
          <Link
            href="/admin-portal/crm/tip"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isTipPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Tip
          </Link>
          <Link
            href="/admin-portal/crm/contracts"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isContractsPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Contracts
          </Link>
        </nav>
      </div>
    </div>
  )
}
