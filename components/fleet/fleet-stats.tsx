import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, CheckCircle, Wrench, AlertTriangle } from "lucide-react"

const fleetStats = [
  {
    title: "Total Fleet",
    value: "35",
    badge: "+3 this month",
    badgeVariant: "default" as const,
    icon: Truck,
    description: "Active vehicles",
  },
  {
    title: "Active",
    value: "28",
    badge: "80% utilisation",
    badgeVariant: "secondary" as const,
    icon: CheckCircle,
    description: "Currently operational",
  },
  {
    title: "Maintenance",
    value: "4",
    badge: "2 overdue",
    badgeVariant: "destructive" as const,
    icon: Wrench,
    description: "In service/repair",
  },
  {
    title: "Alerts",
    value: "7",
    badge: "3 critical",
    badgeVariant: "destructive" as const,
    icon: AlertTriangle,
    description: "Require attention",
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
              <div className="text-2xl font-bold text-card-foreground mb-2">{stat.value}</div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={stat.badgeVariant} className="text-xs">
                  {stat.badge}
                </Badge>
                <span className="text-xs text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
