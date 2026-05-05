import { AdminReportsHeaderNav } from "@/components/admin/admin-reports-header-nav"
import { Button } from "@/components/ui/button"
import { Download, Calendar, Filter } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function OperationsReportsPage() {
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
              All Jobs
            </Button>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Operations Report
          </Button>
        </div>

        {/* Jobs Performance */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Jobs Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Jobs</p>
              <p className="text-2xl font-bold text-teal-600">1,247</p>
              <p className="text-xs text-teal-600 mt-1">+12% from last month</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Completed</p>
              <p className="text-2xl font-bold text-teal-600">1,176</p>
              <p className="text-xs text-muted-foreground mt-1">94.3% completion rate</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">58</p>
              <p className="text-xs text-muted-foreground mt-1">4.7% of total</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">On-Time Delivery</p>
              <p className="text-2xl font-bold text-teal-600">94.3%</p>
              <p className="text-xs text-teal-600 mt-1">+2.1% improvement</p>
            </div>
          </div>
        </Card>

        {/* Delivery Performance */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Delivery Performance</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-foreground">Average Delivery Time</p>
                <p className="text-sm text-muted-foreground">Time from job creation to completion</p>
              </div>
              <p className="text-2xl font-bold text-teal-600">2.8 hrs</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-foreground">Response Time</p>
                <p className="text-sm text-muted-foreground">Time to accept and start job</p>
              </div>
              <p className="text-2xl font-bold text-teal-600">18 mins</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-foreground">Customer Satisfaction</p>
                <p className="text-sm text-muted-foreground">Based on post-delivery feedback</p>
              </div>
              <p className="text-2xl font-bold text-teal-600">4.8/5.0</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
