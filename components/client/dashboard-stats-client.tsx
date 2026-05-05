import { Card } from "@/components/ui/card"
import { Briefcase, Clock, CheckCircle, FileText } from "lucide-react"

export function DashboardStatsClient() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Active Jobs</h3>
          <Briefcase className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="text-3xl font-bold text-foreground mb-1">12</div>
        <p className="text-sm text-muted-foreground">Currently in progress</p>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Pending Jobs</h3>
          <Clock className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="text-3xl font-bold text-foreground mb-1">5</div>
        <p className="text-sm text-muted-foreground">Awaiting assignment</p>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Completed</h3>
          <CheckCircle className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="text-3xl font-bold text-foreground mb-1">28</div>
        <p className="text-sm text-muted-foreground">This month</p>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Invoices</h3>
          <FileText className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="text-3xl font-bold text-foreground mb-1">3</div>
        <p className="text-sm text-muted-foreground">Pending payment</p>
      </Card>
    </div>
  )
}
