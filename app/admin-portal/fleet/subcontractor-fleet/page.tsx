import { FleetManagementHeader } from "@/components/admin/fleet-management-header"
import { SubcontractorFleetHeader } from "@/components/admin/subcontractor-fleet-header"
import { SubcontractorFleetStats } from "@/components/admin/subcontractor-fleet-stats"
import { SubcontractorFleetTable } from "@/components/admin/subcontractor-fleet-table"

export default function SubcontractorFleetPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background border-b border-border px-6 py-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-orange-500 font-medium">Fleet Management</span>
          <span className="text-muted-foreground">›</span>
          <span className="text-foreground">Subcontractor Fleet</span>
        </div>
      </div>

      <FleetManagementHeader />

      <div className="p-6 space-y-6">
        <SubcontractorFleetHeader />
        <SubcontractorFleetStats />
        <SubcontractorFleetTable />
      </div>
    </div>
  )
}
