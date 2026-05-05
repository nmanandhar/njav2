import { DashboardTopNav } from "@/components/subcontractor/dashboard-topnav"
import { MaintenanceHeader } from "@/components/subcontractor/maintenance-header"
import { ComplianceDocumentsLibrary } from "@/components/subcontractor/compliance-documents-library"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function ComplianceDocumentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardTopNav />
      <div className="border-b bg-white px-6 py-3">
        <nav className="flex items-center gap-2 text-sm">
          <Link href="/subcontractor-dashboard/fleet" className="text-orange-600 hover:text-orange-700">
            Fleet Management
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900 font-medium">Vehicle Maintenance</span>
        </nav>
      </div>
      <MaintenanceHeader />
      <div className="p-6">
        <ComplianceDocumentsLibrary />
      </div>
    </div>
  )
}
