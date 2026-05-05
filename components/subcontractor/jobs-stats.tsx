import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Clock, CheckCircle, AlertTriangle } from "lucide-react"

const jobStats = [
  {
    title: "Total Jobs",
    value: "84",
    change: "+12 from last week",
    changeType: "positive" as const,
    icon: Briefcase,
    description: "Assigned to you",
  },
  {
    title: "Active Jobs",
    value: "22",
    change: "Currently in progress",
    changeType: "neutral" as const,
    icon: Clock,
    description: "68% utilisation",
  },
  {
    title: "Pending Jobs",
    value: "15",
    change: "Awaiting assignment",
    changeType: "warning" as const,
    icon: AlertTriangle,
    description: "Requires attention",
  },
  {
    title: "Completed Today",
    value: "5",
    change: "Ready for invoicing",
    changeType: "positive" as const,
    icon: CheckCircle,
    description: "Today",
  },
]

export function JobsStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {jobStats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.change}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
