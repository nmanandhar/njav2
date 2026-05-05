import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { DashboardTopNav } from "@/components/dashboard/dashboard-topnav"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardTopNav />
      <div className="flex-1">
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your business.</p>
          </div>
          <DashboardStats />
        </main>
      </div>
    </div>
  )
}
