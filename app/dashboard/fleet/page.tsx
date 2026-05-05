import { FleetHeader } from "@/components/fleet/fleet-header"
import { FleetTable } from "@/components/fleet/fleet-table"
import { FleetStats } from "@/components/fleet/fleet-stats"
import { DashboardTopNav } from "@/components/dashboard/dashboard-topnav"

export default function FleetPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardTopNav />
      <div className="flex-1">
        <FleetHeader />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Fleet Management</h1>
            <p className="text-muted-foreground">Manage vehicles, track maintenance, and monitor fleet performance</p>
          </div>
          <FleetStats />
          <div className="mt-8">
            <FleetTable />
          </div>
        </main>
      </div>
    </div>
  )
}
