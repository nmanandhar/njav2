"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  MapPin,
  Briefcase,
  DollarSign,
  Truck,
  BarChart3,
  Settings,
  LogOut,
  User,
  UserCog,
  Package,
  Bell,
} from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const navigation = [
  { name: "Dashboard", href: "/admin-portal/dashboard", icon: LayoutDashboard },
  { name: "Live View", href: "/admin-portal/live-view", icon: MapPin },
  { name: "Jobs", href: "/admin-portal/jobs", icon: Briefcase },
  { name: "Finance", href: "/admin-portal/finance", icon: DollarSign },
  { name: "CRM", href: "/admin-portal/crm/contracts", icon: UserCog },
  { name: "Fleet", href: "/admin-portal/fleet", icon: Truck },
  { name: "Procurement", href: "/admin-portal/procurement/suppliers", icon: Package },
  { name: "Reports", href: "/admin-portal/reports", icon: BarChart3 },
]

export function AdminTopNav() {
  const pathname = usePathname()

  const handleLogout = () => {
    // Implement logout logic
    window.location.href = "/"
  }

  const isSystemActive = pathname?.startsWith("/admin-portal/system")

  return (
    <header className="bg-sidebar border-b border-sidebar-border">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-6 lg:space-x-8">
          <Link href="/admin-portal/dashboard" className="flex-shrink-0">
            <Image
              src="/images/nj-ashton-logo.avif"
              alt="NJ Ashton Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive =
                pathname === item.href ||
                (item.href.includes("/crm/") && pathname?.startsWith("/admin-portal/crm")) ||
                (item.href.includes("/procurement/") && pathname?.startsWith("/admin-portal/procurement")) ||
                pathname?.startsWith(item.href + "/")
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "flex items-center space-x-2",
                      isActive
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "text-sidebar-foreground hover:bg-blue-50 hover:text-blue-600",
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
          <ThemeToggle />
          {/* Notifications Bell Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="relative text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="font-semibold">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start py-3 cursor-pointer">
                <div className="flex items-start justify-between w-full">
                  <div className="flex-1">
                    <p className="font-medium text-sm">New Job Assigned</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      JOB-2024-003 has been assigned to you for review
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                  </div>
                  <Badge variant="destructive" className="ml-2">
                    New
                  </Badge>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start py-3 cursor-pointer">
                <div className="flex items-start justify-between w-full">
                  <div className="flex-1">
                    <p className="font-medium text-sm">Driver Response Received</p>
                    <p className="text-xs text-muted-foreground mt-1">John Smith accepted JOB-2024-001</p>
                    <p className="text-xs text-muted-foreground mt-1">15 minutes ago</p>
                  </div>
                  <Badge variant="destructive" className="ml-2">
                    New
                  </Badge>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start py-3 cursor-pointer">
                <div className="flex items-start justify-between w-full">
                  <div className="flex-1">
                    <p className="font-medium text-sm">Delivery Completed</p>
                    <p className="text-xs text-muted-foreground mt-1">JOB-2024-002 has been marked as completed</p>
                    <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                  </div>
                  <Badge variant="destructive" className="ml-2">
                    New
                  </Badge>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-sm text-blue-600 hover:text-blue-700 cursor-pointer justify-center">
                View All Notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/admin-portal/profile">
            <Button
              variant="ghost"
              size="sm"
              className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Admin User</span>
            </Button>
          </Link>
          <Link href="/admin-portal/system">
            <Button
              variant={isSystemActive ? "default" : "ghost"}
              size="sm"
              className={cn(
                "flex items-center space-x-2",
                isSystemActive
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "text-sidebar-foreground hover:bg-blue-50 hover:text-blue-600",
              )}
            >
              <Settings className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">System</span>
            </Button>
          </Link>
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
      <div className="lg:hidden border-t border-sidebar-border">
        <nav className="flex items-center justify-around py-2 overflow-x-auto">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive =
              pathname === item.href ||
              (item.href.includes("/crm/") && pathname?.startsWith("/admin-portal/crm")) ||
              (item.href.includes("/procurement/") && pathname?.startsWith("/admin-portal/procurement")) ||
              pathname?.startsWith(item.href + "/")
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "flex flex-col items-center space-y-1 h-auto py-2 px-3 min-w-0 flex-shrink-0",
                    isActive
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-sidebar-foreground hover:bg-blue-50 hover:text-blue-600",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs truncate">{item.name}</span>
                </Button>
              </Link>
            )
          })}
          <Link href="/admin-portal/profile">
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center space-y-1 h-auto py-2 px-3 min-w-0 flex-shrink-0 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <User className="h-4 w-4" />
              <span className="text-xs truncate">Admin User</span>
            </Button>
          </Link>
          <Link href="/admin-portal/system">
            <Button
              variant={isSystemActive ? "default" : "ghost"}
              size="sm"
              className={cn(
                "flex flex-col items-center space-y-1 h-auto py-2 px-3 min-w-0 flex-shrink-0",
                isSystemActive
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "text-sidebar-foreground hover:bg-blue-50 hover:text-blue-600",
              )}
            >
              <Settings className="h-4 w-4" />
              <span className="text-xs truncate">System</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="flex flex-col items-center space-y-1 h-auto py-2 px-3 min-w-0 flex-shrink-0 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-xs truncate">Logout</span>
          </Button>
        </nav>
      </div>
    </header>
  )
}
