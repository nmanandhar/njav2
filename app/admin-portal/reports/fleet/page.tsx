import { AdminReportsHeaderNav } from "@/components/admin/admin-reports-header-nav"
import { AdminFleetAnalytics } from "@/components/admin/admin-fleet-analytics"
import { AdminReportsExport } from "@/components/admin/admin-reports-export"
import { Button } from "@/components/ui/button"
import { Download, Calendar, Filter } from "lucide-react"

export default function FleetReportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminReportsHeaderNav />

      <div className="p-6 space-y-6">
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-background">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 Days
            </Button>
            <Button variant="outline" className="bg-background">
              <Filter className="h-4 w-4 mr-2" />
              All Vehicles
            </Button>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Fleet Report
          </Button>
        </div>

        {/* Fleet Analytics */}
        <AdminFleetAnalytics />

        {/* Export Options */}
        <AdminReportsExport />
      </div>
    </div>
  )
}
