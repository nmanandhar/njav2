import { SystemHeader } from "@/components/admin/system-header"
import { AdminUsersStats } from "@/components/admin/admin-users-stats"
import { AdminUsersTable } from "@/components/admin/admin-users-table"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export default function AdminSystemUsersPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b px-6 py-3">
        <div className="flex items-center text-sm">
          <Link href="/admin-portal" className="text-orange-600 hover:text-orange-700 transition-colors">
            Admin Portal
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <span className="text-gray-600">System</span>
        </div>
      </div>

      <SystemHeader />

      <main className="p-6 space-y-6">
        <AdminUsersStats />
        <AdminUsersTable />
      </main>
    </div>
  )
}
