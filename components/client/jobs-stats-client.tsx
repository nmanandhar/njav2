import { Card } from "@/components/ui/card"
import { Calendar, MapPin, Filter } from "lucide-react"
import { Badge as UIBadge } from "@/components/ui/badge"

export function JobsStatsClient() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Total Jobs</h3>
          <Calendar className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="text-3xl font-bold text-foreground mb-2">45</div>
        <div className="flex items-center gap-2 text-sm">
          <UIBadge variant="secondary" className="bg-teal-500/10 text-teal-600 hover:bg-teal-500/20">
            +3 this week
          </UIBadge>
          <span className="text-muted-foreground">All jobs</span>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Active Jobs</h3>
          <MapPin className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="text-3xl font-bold text-foreground mb-2">12</div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Currently in progress</p>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Pending Jobs</h3>
          <Filter className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="text-3xl font-bold text-foreground mb-2">5</div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Awaiting assignment</p>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Completed Today</h3>
          <UIBadge variant="secondary" className="bg-teal-600 text-white">
            Today
          </UIBadge>
        </div>
        <div className="text-3xl font-bold text-foreground mb-2">2</div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Ready for invoicing</p>
        </div>
      </Card>
    </div>
  )
}
