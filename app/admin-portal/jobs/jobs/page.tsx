import { AdminJobsHeader } from "@/components/admin/admin-jobs-header"
import { AdminJobsTable } from "@/components/admin/admin-jobs-table"
import { AdminJobsHeaderNav } from "@/components/admin/admin-jobs-header-nav"

export default function AdminJobsListPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background border-b border-border px-6 py-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-orange-500 font-medium">Jobs</span>
          <span className="text-muted-foreground">›</span>
          <span className="text-foreground">Jobs</span>
        </div>
      </div>

      <AdminJobsHeaderNav />

      <div className="p-6 space-y-6">
        <AdminJobsHeader />
        <AdminJobsTable />
      </div>
    </div>
  )
}
