import { AdminFinanceHeader } from "@/components/admin/admin-finance-header"
import { AdminFinanceTable } from "@/components/admin/admin-finance-table"
import { AdminFinanceAnalytics } from "@/components/admin/admin-finance-analytics"
import { redirect } from "next/navigation"

export default function AdminFinancePage() {
  redirect("/admin-portal/finance/purchase-orders")

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 space-y-6">
        <AdminFinanceHeader />
        <AdminFinanceTable />
        <AdminFinanceAnalytics />
      </div>
    </div>
  )
}
