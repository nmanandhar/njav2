import { AdminReportsHeaderNav } from "@/components/admin/admin-reports-header-nav"
import { Button } from "@/components/ui/button"
import { Download, Calendar, Filter } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function ClientsReportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminReportsHeaderNav />

      <div className="p-6 space-y-6">
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-background">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 Days
            </Button>
            <Button variant="outline" className="bg-background">
              <Filter className="h-4 w-4 mr-2" />
              All Clients
            </Button>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Client Report
          </Button>
        </div>

        {/* Client Overview */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Client Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Clients</p>
              <p className="text-2xl font-bold text-teal-600">47</p>
              <p className="text-xs text-teal-600 mt-1">+5 new this month</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Clients</p>
              <p className="text-2xl font-bold text-teal-600">42</p>
              <p className="text-xs text-muted-foreground mt-1">89.4% active rate</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg Order Value</p>
              <p className="text-2xl font-bold text-teal-600">$4,287</p>
              <p className="text-xs text-teal-600 mt-1">+8.3% from last month</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Retention Rate</p>
              <p className="text-2xl font-bold text-teal-600">96.2%</p>
              <p className="text-xs text-teal-600 mt-1">Excellent retention</p>
            </div>
          </div>
        </Card>

        {/* Payment Performance */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Payment Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-teal-50 dark:bg-teal-950/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">On-Time Payments</p>
              <p className="text-3xl font-bold text-teal-600">91.2%</p>
              <p className="text-xs text-teal-600 mt-2">38 of 42 clients paying on time</p>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Overdue Accounts</p>
              <p className="text-3xl font-bold text-yellow-600">$47,230</p>
              <p className="text-xs text-yellow-600 mt-2">4 clients with overdue balance</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Average Payment Days</p>
              <p className="text-3xl font-bold text-blue-600">28 days</p>
              <p className="text-xs text-muted-foreground mt-2">Within 30-day terms</p>
            </div>
          </div>
        </Card>

        {/* Top Clients */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Top 5 Clients by Revenue</h2>
          <div className="space-y-3">
            {[
              { name: "ABC Construction Ltd", revenue: "$487,200", jobs: 142, payment: "Excellent" },
              { name: "BuildRight Pty Ltd", revenue: "$356,840", jobs: 98, payment: "Good" },
              { name: "Metro Developments", revenue: "$298,450", jobs: 87, payment: "Excellent" },
              { name: "Skyline Constructions", revenue: "$276,920", jobs: 76, payment: "Good" },
              { name: "Premier Building Co", revenue: "$234,680", jobs: 63, payment: "Fair" },
            ].map((client, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{client.name}</p>
                  <p className="text-sm text-muted-foreground">{client.jobs} jobs completed</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-teal-600">{client.revenue}</p>
                  <p className="text-xs text-muted-foreground">Payment: {client.payment}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
