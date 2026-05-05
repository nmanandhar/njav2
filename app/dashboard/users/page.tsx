import { UsersHeader } from "@/components/users/users-header"
import { UsersTable } from "@/components/users/users-table"
import { UsersStats } from "@/components/users/users-stats"
import { DashboardTopNav } from "@/components/dashboard/dashboard-topnav"

export default function UsersPage() {
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
