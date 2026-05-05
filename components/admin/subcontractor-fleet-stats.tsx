"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Activity, AlertTriangle, Wrench } from "lucide-react"

const stats = [
  {
    title: "Total Vehicles",
    value: "38",
    description: "Across 8 subcontractors",
    icon: Truck,
    trend: "+3 this month",
    badgeVariant: "default" as const,
    badgeClassName: "bg-teal-600 hover:bg-teal-700 text-white",
  },
  {
    title: "Active",
    value: "26",
    description: "Currently on jobs",
    icon: Activity,
    trend: "68% utilisation",
    badgeVariant: "default" as const,
    badgeClassName: "bg-orange-500 hover:bg-orange-600 text-white",
  },
  {
    title: "Alerts",
    value: "5",
    description: "Require attention",
    icon: AlertTriangle,
    trend: "2 urgent",
    badgeVariant: "destructive" as const,
    badgeClassName: "bg-red-600 hover:bg-red-700 text-white",
  },
  {
    title: "In Maintenance",
    value: "3",
    description: "Being serviced",
    icon: Wrench,
    trend: "RTD in 2-5 days",
    badgeVariant: "secondary" as const,
    badgeClassName: "bg-amber-100 text-amber-800 hover:bg-amber-200",
  },
]

export function SubcontractorFleetStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={stat.badgeVariant} className={stat.badgeClassName}>
                {stat.trend}
              </Badge>
              <span className="text-xs text-muted-foreground">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
