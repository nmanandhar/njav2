import { JobsHeader } from "@/components/jobs/jobs-header"
import { JobsTable } from "@/components/jobs/jobs-table"
import { JobsStats } from "@/components/jobs/jobs-stats"
import { DashboardTopNav } from "@/components/dashboard/dashboard-topnav"

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardTopNav />
      <div className="flex-1">
        <div className="border-b border-border px-6 py-6">
          <h1 className="text-2xl font-bold text-foreground">Jobs Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage job assignments, track progress, and monitor deliveries
          </p>
        </div>
        <JobsHeader />
        <main className="p-6">
          <JobsStats />
          <div className="mt-8">
            <JobsTable />
          </div>
        </main>
      </div>
    </div>
  )
}
