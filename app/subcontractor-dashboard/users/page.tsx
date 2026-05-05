import { UsersHeader } from "@/components/subcontractor/users-header"
import { UsersTable } from "@/components/subcontractor/users-table"
import { UsersStats } from "@/components/subcontractor/users-stats"
import { DashboardTopNav } from "@/components/subcontractor/dashboard-topnav"

export default function SubcontractorUsersPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardTopNav />
      <div className="flex-1">
        <UsersHeader />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Users Management</h1>
            <p className="text-muted-foreground">Manage user accounts, roles, and permissions</p>
          </div>
          <UsersStats />
          <div className="mt-8">
            <UsersTable />
          </div>
        </main>
      </div>
    </div>
  )
}
