import { SystemHeader } from "@/components/admin/system-header"
import { AdminSystemStats } from "@/components/admin/admin-system-stats"
import { AdminSystemIntegrations } from "@/components/admin/admin-system-integrations"
import { AdminSystemConfiguration } from "@/components/admin/admin-system-configuration"
import { AdminSystemSecurity } from "@/components/admin/admin-system-security"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function AdminSystemPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-6">
        <div className="border-b bg-white px-6 py-3 -mx-6 -mt-6">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/admin-portal" className="text-orange-600 hover:text-orange-700">
              Admin Portal
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium">System</span>
          </nav>
        </div>

        <SystemHeader />
        <AdminSystemStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdminSystemIntegrations />
          <AdminSystemConfiguration />
        </div>

        <AdminSystemSecurity />
      </div>
    </div>
  )
}
