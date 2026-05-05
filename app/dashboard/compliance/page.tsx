import { ComplianceHeader } from "@/components/compliance/compliance-header"
import { ComplianceTable } from "@/components/compliance/compliance-table"
import { ComplianceStats } from "@/components/compliance/compliance-stats"
import { DashboardTopNav } from "@/components/dashboard/dashboard-topnav"

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardTopNav />
      <div className="flex-1">
        <ComplianceHeader />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Compliance Management</h1>
            <p className="text-muted-foreground">
              Monitor regulatory compliance, safety protocols, and audit requirements
            </p>
          </div>
          <ComplianceStats />
          <div className="mt-8">
            <ComplianceTable />
          </div>
        </main>
      </div>
    </div>
  )
}
