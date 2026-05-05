import { AdminReportsHeaderNav } from "@/components/admin/admin-reports-header-nav"
import { Button } from "@/components/ui/button"
import { Download, Calendar, Filter } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function SubcontractorsReportsPage() {
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
              All Subcontractors
            </Button>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Subcontractor Report
          </Button>
        </div>

        {/* Subcontractor Overview */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Subcontractor Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Subcontractors</p>
              <p className="text-2xl font-bold text-teal-600">23</p>
              <p className="text-xs text-teal-600 mt-1">+2 new this month</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active This Month</p>
              <p className="text-2xl font-bold text-teal-600">19</p>
              <p className="text-xs text-muted-foreground mt-1">82.6% utilization</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Completion Rate</p>
              <p className="text-2xl font-bold text-teal-600">96.8%</p>
              <p className="text-xs text-teal-600 mt-1">+1.2% improvement</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Quality Score</p>
              <p className="text-2xl font-bold text-teal-600">4.7/5.0</p>
              <p className="text-xs text-teal-600 mt-1">Excellent performance</p>
            </div>
          </div>
        </Card>

        {/* Performance Metrics */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-teal-50 dark:bg-teal-950/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">On-Time Completion</p>
              <p className="text-3xl font-bold text-teal-600">94.5%</p>
              <p className="text-xs text-teal-600 mt-2">672 of 711 jobs on schedule</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Average Response Time</p>
              <p className="text-3xl font-bold text-blue-600">22 mins</p>
              <p className="text-xs text-muted-foreground mt-2">From job assignment to acceptance</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Compliance Rate</p>
              <p className="text-3xl font-bold text-purple-600">98.2%</p>
              <p className="text-xs text-purple-600 mt-2">All documents current</p>
            </div>
          </div>
        </Card>

        {/* Top Performers */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Top 5 Subcontractors by Performance</h2>
          <div className="space-y-3">
            {[
              { name: "FastHaul Transport", jobs: 247, rate: "98.4%", quality: "4.9/5.0", revenue: "$142,380" },
              { name: "Metro Logistics", jobs: 198, rate: "96.8%", quality: "4.8/5.0", revenue: "$118,650" },
              { name: "Swift Delivery Co", jobs: 176, rate: "95.2%", quality: "4.7/5.0", revenue: "$97,430" },
              { name: "Premier Transport", jobs: 154, rate: "97.1%", quality: "4.6/5.0", revenue: "$89,220" },
              { name: "City Express Logistics", jobs: 142, rate: "94.9%", quality: "4.8/5.0", revenue: "$83,760" },
            ].map((sub, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{sub.name}</p>
                  <p className="text-sm text-muted-foreground">{sub.jobs} jobs completed</p>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Completion</p>
                    <p className="text-sm font-semibold text-teal-600">{sub.rate}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Quality</p>
                    <p className="text-sm font-semibold text-teal-600">{sub.quality}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Revenue</p>
                    <p className="text-sm font-bold text-teal-600">{sub.revenue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
