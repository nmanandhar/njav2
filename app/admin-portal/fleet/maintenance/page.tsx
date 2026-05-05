import { AdminMaintenanceHeader } from "@/components/admin/admin-maintenance-header"
import { AdminMaintenanceDashboard } from "@/components/admin/admin-maintenance-dashboard"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function AdminMaintenancePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-6">
        {/* Breadcrumb */}
        <div className="border-b bg-white px-6 py-3 -mx-6 -mt-6">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/admin-portal/fleet" className="text-orange-600 hover:text-orange-700">
              Fleet Management
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Vehicle Maintenance</span>
          </nav>
        </div>

        <AdminMaintenanceHeader />
        <AdminMaintenanceDashboard />
      </div>
    </div>
  )
}
