import { FleetManagementHeader } from "@/components/admin/fleet-management-header"
import { AdminDriversHeader } from "@/components/admin/admin-drivers-header"
import { AdminDriversStats } from "@/components/admin/admin-drivers-stats"
import { AdminDriversTable } from "@/components/admin/admin-drivers-table"

export default function AdminDriversPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background border-b border-border px-6 py-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-orange-500 font-medium">Fleet Management</span>
          <span className="text-muted-foreground">›</span>
          <span className="text-foreground">Drivers</span>
        </div>
      </div>

      <FleetManagementHeader />

      <div className="p-6 space-y-6">
        <AdminDriversHeader />
        <AdminDriversStats />
        <AdminDriversTable />
      </div>
    </div>
  )
}
