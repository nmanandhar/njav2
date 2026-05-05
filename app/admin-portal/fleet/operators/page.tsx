import { FleetManagementHeader } from "@/components/admin/fleet-management-header"
import { AdminOperatorsHeader } from "@/components/admin/admin-operators-header"
import { AdminOperatorsStats } from "@/components/admin/admin-operators-stats"
import { AdminOperatorsTable } from "@/components/admin/admin-operators-table"

export default function AdminOperatorsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background border-b border-border px-6 py-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-orange-500 font-medium">Fleet Management</span>
          <span className="text-muted-foreground">›</span>
          <span className="text-foreground">Operators</span>
        </div>
      </div>

      <FleetManagementHeader />

      <div className="p-6 space-y-6">
        <AdminOperatorsHeader />
        <AdminOperatorsStats />
        <AdminOperatorsTable />
      </div>
    </div>
  )
}
