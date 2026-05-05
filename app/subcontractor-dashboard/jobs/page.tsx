import { DashboardTopNav } from "@/components/subcontractor/dashboard-topnav"
import { JobsTable } from "@/components/subcontractor/jobs-table"
import { JobsStats } from "@/components/subcontractor/jobs-stats"
import { SubcontractorJobsHeaderNav } from "@/components/subcontractor/subcontractor-jobs-header-nav"

export default function SubcontractorJobsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardTopNav />
      <SubcontractorJobsHeaderNav />
      <div className="flex-1">
        <main className="p-6 space-y-6">
          <JobsStats />
          <JobsTable />
        </main>
      </div>
    </div>
  )
}
