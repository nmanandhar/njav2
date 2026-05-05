import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, FileText, AlertTriangle, CheckCircle, Clock, DollarSign } from "lucide-react"

export function AdminReportsStats() {
  const reportStats = [
    {
      title: "Generated Reports",
      value: "1,247",
      change: "+138 from last month",
      changeType: "positive" as const,
      icon: FileText,
      description: "This month",
    },
    {
      title: "Compliance Score",
      value: "98.5%",
      change: "+2.1 points",
      changeType: "positive" as const,
      icon: CheckCircle,
      description: "ISO standards",
    },
    {
      title: "Pending Reviews",
      value: "8",
      change: "-1 from last week",
      changeType: "positive" as const,
      icon: Clock,
      description: "Awaiting approval",
    },
    {
      title: "Revenue Tracked",
      value: "$2.4M",
      change: "+$365K from last year",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "YTD total",
    },
    {
      title: "Data Accuracy",
      value: "99.2%",
      change: "+0.3 points",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "Validation rate",
    },
    {
      title: "Critical Alerts",
      value: "3",
      change: "-3 from last week",
      changeType: "positive" as const,
      icon: AlertTriangle,
      description: "Requires attention",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {reportStats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="bg-card border-border hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                <Badge variant={stat.changeType === "positive" ? "default" : "destructive"} className="text-xs">
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
