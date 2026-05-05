import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Server, Database, Shield, Zap, Users, Globe } from "lucide-react"

export function AdminSystemStats() {
  const systemStats = [
    {
      title: "System Uptime",
      value: "99.9%",
      change: "30 days",
      icon: Server,
      status: "healthy",
    },
    {
      title: "Database Health",
      value: "Optimal",
      change: "All systems",
      icon: Database,
      status: "healthy",
    },
    {
      title: "Security Score",
      value: "A+",
      change: "ISO 27001",
      icon: Shield,
      status: "healthy",
    },
    {
      title: "API Response",
      value: "145ms",
      change: "Average",
      icon: Zap,
      status: "healthy",
    },
    {
      title: "Active Users",
      value: "156",
      change: "Online now",
      icon: Users,
      status: "healthy",
    },
    {
      title: "Integrations",
      value: "12",
      change: "Connected",
      icon: Globe,
      status: "warning",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {systemStats.map((stat) => {
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
                <Badge
                  variant={
                    stat.status === "healthy" ? "default" : stat.status === "warning" ? "secondary" : "destructive"
                  }
                  className="text-xs"
                >
                  {stat.status}
                </Badge>
                <span>{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
