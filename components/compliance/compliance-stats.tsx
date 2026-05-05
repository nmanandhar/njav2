import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, CheckCircle, Clock, FileText, Users } from "lucide-react"

const complianceStats = [
  {
    title: "Active Certifications",
    value: "12",
    change: "All current",
    changeType: "positive" as const,
    icon: Shield,
    description: "Valid certificates",
  },
  {
    title: "Expiring Soon",
    value: "3",
    change: "Within 30 days",
    changeType: "warning" as const,
    icon: Clock,
    description: "Requires renewal",
  },
  {
    title: "Safety Incidents",
    value: "0",
    change: "This month",
    changeType: "positive" as const,
    icon: CheckCircle,
    description: "Zero incidents",
  },
  {
    title: "Overdue Items",
    value: "1",
    change: "Needs attention",
    changeType: "negative" as const,
    icon: AlertTriangle,
    description: "Immediate action required",
  },
  {
    title: "Audit Records",
    value: "24",
    change: "Last 12 months",
    changeType: "neutral" as const,
    icon: FileText,
    description: "Completed audits",
  },
  {
    title: "Trained Personnel",
    value: "18/22",
    change: "82% compliance",
    changeType: "positive" as const,
    icon: Users,
    description: "Staff certification",
  },
]

export function ComplianceStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {complianceStats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
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
