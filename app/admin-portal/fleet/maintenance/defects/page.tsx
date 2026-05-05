import { AdminMaintenanceHeader } from "@/components/admin/admin-maintenance-header"
import { DefectsInspectionsLog } from "@/components/subcontractor/defects-inspections-log"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function DefectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-white px-6 py-3">
        <nav className="flex items-center gap-2 text-sm">
          <Link href="/admin-portal/fleet" className="text-orange-600 hover:text-orange-700">
            Fleet Management
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900 font-medium">Vehicle Maintenance</span>
        </nav>
      </div>
      <AdminMaintenanceHeader />
      <DefectsInspectionsLog />
    </div>
  )
}
