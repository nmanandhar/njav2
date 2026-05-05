import { FleetManagementHeader } from "@/components/admin/fleet-management-header"
import { AdminMachineryHeader } from "@/components/admin/admin-machinery-header"
import { AdminMachineryTable } from "@/components/admin/admin-machinery-table"

export default function AdminMachineryPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background border-b border-border px-6 py-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-orange-500 font-medium">Fleet Management</span>
          <span className="text-muted-foreground">›</span>
          <span className="text-foreground">Machinery</span>
        </div>
      </div>

      <FleetManagementHeader />

      <div className="p-6 space-y-6">
        <AdminMachineryHeader />
        <AdminMachineryTable />
      </div>
    </div>
  )
}
