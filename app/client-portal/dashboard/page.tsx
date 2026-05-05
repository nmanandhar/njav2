import { DashboardHeaderClient } from "@/components/client/dashboard-header-client"
import { DashboardStatsClient } from "@/components/client/dashboard-stats-client"

export default function ClientDashboardPage() {
  return (
    <div className="p-6">
      <DashboardHeaderClient />
      <DashboardStatsClient />
    </div>
  )
}
