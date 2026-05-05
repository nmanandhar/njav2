import { AdminUsersStats } from "@/components/admin/admin-users-stats"
import { AdminUsersTable } from "@/components/admin/admin-users-table"

export default function AdminUsersPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Users Management</h1>
        <p className="text-muted-foreground">Manage user accounts, roles, and permissions</p>
      </div>

      <AdminUsersStats />

      <AdminUsersTable />
    </div>
  )
}
