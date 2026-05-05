import { DashboardTopNav } from "@/components/subcontractor/dashboard-topnav"
import { SubcontractorFleetHeader } from "@/components/subcontractor/subcontractor-fleet-header"
import { DriversStats } from "@/components/subcontractor/drivers-stats"
import { DriversTable } from "@/components/subcontractor/drivers-table"

export default function SubcontractorFleetDriversPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardTopNav />

      {/* Breadcrumb navigation */}
      <div className="bg-background border-b border-border px-6 py-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-orange-500 font-medium">Fleet Management</span>
          <span className="text-muted-foreground">›</span>
          <span className="text-foreground">Drivers</span>
        </div>
      </div>

      {/* Fleet header with tabs */}
      <SubcontractorFleetHeader />

      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Drivers</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage driver accounts, track activity, and monitor performance
          </p>
        </div>

        <DriversStats />
        <DriversTable />
      </div>
    </div>
  )
}
