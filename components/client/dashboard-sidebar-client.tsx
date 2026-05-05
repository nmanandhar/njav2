"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Briefcase, FileText, Settings, Package, DollarSign } from "lucide-react"
import Image from "next/image"

const navigation = [
  { name: "Dashboard", href: "/client-portal/dashboard", icon: LayoutDashboard },
  { name: "Jobs", href: "/client-portal/dashboard/jobs", icon: Briefcase },
  { name: "Finance", href: "/client-portal/dashboard/finance/purchase-orders", icon: DollarSign },
  { name: "Invoices", href: "/client-portal/dashboard/invoices", icon: FileText },
  { name: "Products", href: "/client-portal/dashboard/products", icon: Package },
  { name: "Settings", href: "/client-portal/dashboard/settings", icon: Settings },
]

export function DashboardSidebarClient() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-border bg-card">
        <div className="flex items-center gap-3 h-16 px-6 border-b border-border">
          <Image
            src="/images/nj-ashton-logo.avif"
            alt="NJ Ashton Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <div>
            <div className="font-bold text-foreground">NJ Ashton</div>
            <div className="text-xs text-muted-foreground">Client Portal</div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
