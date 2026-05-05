import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, CheckCircle, AlertTriangle, FileText } from "lucide-react"

const driverStats = [
  {
    title: "Total Drivers",
    value: "15",
    description: "Registered drivers",
    change: "+2 this month",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Active",
    value: "12",
    description: "Currently assigned",
    change: "80% utilisation",
    changeType: "neutral" as const,
    icon: CheckCircle,
  },
  {
    title: "Compliance",
    value: "2",
    description: "Licenses/certs",
    change: "1 expiring soon",
    changeType: "warning" as const,
    icon: FileText,
  },
  {
    title: "Alerts",
    value: "3",
    description: "Require attention",
    change: "1 critical",
    changeType: "negative" as const,
    icon: AlertTriangle,
  },
]

export function DriversStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {driverStats.map((stat) => {
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
