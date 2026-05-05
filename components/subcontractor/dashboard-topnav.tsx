"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Briefcase, FileText, Users, LogOut, User, Bell, Truck, Radio } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"

const navigation = [
  { name: "Dashboard", href: "/subcontractor-dashboard", icon: LayoutDashboard },
  { name: "Jobs", href: "/subcontractor-dashboard/jobs", icon: Briefcase },
  { name: "Live View", href: "/subcontractor-dashboard/live-view", icon: Radio },
  { name: "Finance", href: "/subcontractor-dashboard/finance/invoices", icon: FileText },
  { name: "Fleet", href: "/subcontractor-dashboard/fleet", icon: Truck },
  { name: "Users", href: "/subcontractor-dashboard/users", icon: Users },
]

export function DashboardTopNav() {
  const pathname = usePathname()

  const handleLogout = () => {
    // Implement logout logic
    window.location.href = "/"
  }

  return (
    <header className="bg-sidebar border-b border-sidebar-border">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-6 lg:space-x-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/nj-ashton-logo.avif"
              alt="NJ Ashton Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Divider */}
          <div className="hidden lg:block h-8 w-px bg-sidebar-border" />

          {/* Portal Name and Client */}
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-sidebar-foreground">Sub-Contractor Portal</h1>
            <p className="text-sm text-muted-foreground">XYZ Transport Services</p>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.name === "Finance" && pathname?.startsWith("/subcontractor-dashboard/finance"))
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "flex items-center space-x-2",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Bell className="h-4 w-4" />
          </Button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <User className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Sub-Contractor</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-sidebar-border">
        <nav className="flex items-center justify-around py-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "flex flex-col items-center space-y-1 h-auto py-2 px-3",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs">{item.name}</span>
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
