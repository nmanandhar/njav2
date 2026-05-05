import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, CheckCircle, Wrench, AlertTriangle } from "lucide-react"

const fleetStats = [
  {
    title: "Total Fleet",
    value: "35",
    description: "Active vehicles",
    change: "+3 this month",
    changeType: "positive" as const,
    icon: Truck,
  },
  {
    title: "Active",
    value: "28",
    description: "Currently operational",
    change: "80% utilisation",
    changeType: "neutral" as const,
    icon: CheckCircle,
  },
  {
    title: "Maintenance",
    value: "4",
    description: "In service/repair",
    change: "2 overdue",
    changeType: "warning" as const,
    icon: Wrench,
  },
  {
    title: "Alerts",
    value: "7",
    description: "Require attention",
    change: "3 critical",
    changeType: "negative" as const,
    icon: AlertTriangle,
  },
]

export function FleetStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {fleetStats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground flex-wrap">
                <Badge
                  variant={
                    stat.changeType === "positive"
                      ? "default"
                      : stat.changeType === "negative"
                        ? "destructive"
                        : stat.changeType === "warning"
                          ? "destructive"
                          : "secondary"
                  }
                  className="text-xs"
                >
                  {stat.change}
                </Badge>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
