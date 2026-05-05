import { redirect } from "next/navigation"
import { AdminJobsHeader } from "@/components/admin/admin-jobs-header"
import { AdminJobsTable } from "@/components/admin/admin-jobs-table"

export default function AdminJobsPage() {
  redirect("/admin-portal/jobs/jobs")

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-6">
        <AdminJobsHeader />
        <AdminJobsTable />
      </div>
    </div>
  )
}
