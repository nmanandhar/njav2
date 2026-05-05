"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function SystemHeader() {
  const pathname = usePathname()
  const isSettingsPage = pathname === "/admin-portal/system"
  const isUsersPage = pathname?.includes("/users")

  return (
    <div className="bg-card border-b border-border">
      {/* Top section with title */}
      <div className="px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold">System</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage integrations, configurations, and system administration
          </p>
        </div>
      </div>

      {/* Secondary navigation tabs */}
      <div className="px-6 border-t border-border">
        <nav className="flex space-x-6 -mb-px">
          <Link
            href="/admin-portal/system"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isSettingsPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Settings
          </Link>
          <Link
            href="/admin-portal/system/users"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isUsersPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Users
          </Link>
        </nav>
      </div>
    </div>
  )
}
