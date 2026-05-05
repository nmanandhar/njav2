import { DashboardTopNav } from "@/components/subcontractor/dashboard-topnav"
import { SubcontractorFleetHeader } from "@/components/subcontractor/subcontractor-fleet-header"
import { FleetStats } from "@/components/subcontractor/fleet-stats"
import { FleetTable } from "@/components/subcontractor/fleet-table"

export default function SubcontractorFleetPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardTopNav />

      <div className="bg-background border-b border-border px-6 py-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-orange-500 font-medium">Fleet Management</span>
          <span className="text-muted-foreground">›</span>
          <span className="text-foreground">Subcontractor Fleet</span>
        </div>
      </div>

      <SubcontractorFleetHeader />

      <div className="p-6 space-y-6">
        <FleetStats />
        <FleetTable />
      </div>
    </div>
  )
}
