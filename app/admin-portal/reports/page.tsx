import { AdminReportsHeaderNav } from "@/components/admin/admin-reports-header-nav"
import { AdminReportsStats } from "@/components/admin/admin-reports-stats"
import { Button } from "@/components/ui/button"
import { Download, Calendar, Filter } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function AdminReportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminReportsHeaderNav />

      <div className="p-6 space-y-6">
        {/* Date Range and Filter Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-background">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 Days
            </Button>
            <Button variant="outline" className="bg-background">
              <Filter className="h-4 w-4 mr-2" />
              All Categories
            </Button>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Key Metrics Overview */}
        <AdminReportsStats />

        {/* Quick Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-2">Financial Health</h3>
            <p className="text-sm text-muted-foreground mb-4">Revenue, expenses, and profitability</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Revenue</span>
                <span className="font-semibold text-teal-600">$2,847,392</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Net Profit</span>
                <span className="font-semibold text-teal-600">$486,056</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Profit Margin</span>
                <span className="font-semibold">17.1%</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-2">Operational Efficiency</h3>
            <p className="text-sm text-muted-foreground mb-4">Jobs, deliveries, and performance</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Completed Jobs</span>
                <span className="font-semibold text-teal-600">1,247</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">On-Time Rate</span>
                <span className="font-semibold text-teal-600">94.3%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Avg Job Duration</span>
                <span className="font-semibold">2.8 hrs</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-2">Client Performance</h3>
            <p className="text-sm text-muted-foreground mb-4">Customer satisfaction and growth</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Active Clients</span>
                <span className="font-semibold text-teal-600">47</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Payment Rate</span>
                <span className="font-semibold text-teal-600">91.2%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Avg Order Value</span>
                <span className="font-semibold">$4,287</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-2">Subcontractor Performance</h3>
            <p className="text-sm text-muted-foreground mb-4">Partner reliability and quality</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Active Subcontractors</span>
                <span className="font-semibold text-teal-600">23</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Completion Rate</span>
                <span className="font-semibold text-teal-600">96.8%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Quality Score</span>
                <span className="font-semibold">4.7/5.0</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-2">Fleet Utilization</h3>
            <p className="text-sm text-muted-foreground mb-4">Vehicles, maintenance, and costs</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Active Vehicles</span>
                <span className="font-semibold text-teal-600">38</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Utilization Rate</span>
                <span className="font-semibold text-teal-600">87.3%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Avg Cost/Day</span>
                <span className="font-semibold">$427</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-2">Compliance Status</h3>
            <p className="text-sm text-muted-foreground mb-4">Certifications and documentation</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Documents Current</span>
                <span className="font-semibold text-teal-600">98.2%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Expiring Soon</span>
                <span className="font-semibold text-yellow-600">7</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Overdue</span>
                <span className="font-semibold text-red-600">2</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
