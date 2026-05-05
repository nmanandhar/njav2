"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Wrench, CheckCircle, DollarSign } from "lucide-react"

const utilisationData = [
  { vehicle: "FL-001", utilisation: 87, revenue: 12500, jobs: 15 },
  { vehicle: "FL-003", utilisation: 92, revenue: 14200, jobs: 18 },
  { vehicle: "FL-004", utilisation: 0, revenue: 0, jobs: 0 },
  { vehicle: "FL-002", utilisation: 0, revenue: 0, jobs: 0 },
  { vehicle: "FL-005", utilisation: 0, revenue: 0, jobs: 0 },
]

const maintenanceSchedule = [
  { vehicle: "FL-004", type: "Service Overdue", daysOverdue: -5, priority: "High" },
  { vehicle: "FL-001", type: "Service Due", daysUntil: 45, priority: "Medium" },
  { vehicle: "FL-003", type: "Service Due", daysUntil: 35, priority: "Medium" },
  { vehicle: "FL-002", type: "In Maintenance", daysUntil: 0, priority: "Active" },
  { vehicle: "FL-005", type: "Major Repair", daysUntil: 0, priority: "Critical" },
]

const costAnalysis = [
  { category: "Fuel", amount: 28500, percentage: 45, trend: "up" },
  { category: "Maintenance", amount: 18200, percentage: 29, trend: "down" },
  { category: "Insurance", amount: 9800, percentage: 16, trend: "stable" },
  { category: "Registration", amount: 6300, percentage: 10, trend: "stable" },
]

const fleetPerformance = {
  totalRevenue: 156800,
  totalCosts: 62800,
  profit: 94000,
  profitMargin: 59.9,
  averageUtilisation: 68,
  fuelEfficiency: 8.1,
  maintenanceCompliance: 85,
}

export function AdminFleetAnalytics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Fleet Performance Overview */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Fleet Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-sm text-muted-foreground">Profit Margin</span>
              </div>
              <p className="text-2xl font-bold">{fleetPerformance.profitMargin}%</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-muted-foreground">Utilisation</span>
              </div>
              <p className="text-2xl font-bold">{fleetPerformance.averageUtilisation}%</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Revenue</span>
              <span className="font-semibold text-foreground">${fleetPerformance.totalRevenue.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Costs</span>
              <span className="font-semibold text-foreground">${fleetPerformance.totalCosts.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm border-t pt-2">
              <span className="text-muted-foreground">Net Profit</span>
              <span className="font-bold text-green-600">${fleetPerformance.profit.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Fuel Efficiency</span>
              <span className="font-medium">{fleetPerformance.fuelEfficiency}L/100km</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Maintenance Compliance</span>
              <span className="font-medium">{fleetPerformance.maintenanceCompliance}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Utilisation */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center space-x-2">
            <CheckCircle className="h-5 w-5" />
            <span>Vehicle Utilisation</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {utilisationData.map((vehicle) => (
            <div key={vehicle.vehicle} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{vehicle.vehicle}</span>
                  <Badge
                    variant={vehicle.utilisation > 80 ? "default" : vehicle.utilisation > 0 ? "secondary" : "outline"}
                  >
                    {vehicle.utilisation}%
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">${vehicle.revenue.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{vehicle.jobs} jobs</div>
                </div>
              </div>
              <Progress value={vehicle.utilisation} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Maintenance Schedule */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center space-x-2">
            <Wrench className="h-5 w-5" />
            <span>Maintenance Schedule</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {maintenanceSchedule.map((item) => (
            <div key={item.vehicle} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                  {item.vehicle.split("-")[1]}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.vehicle}</p>
                  <p className="text-xs text-muted-foreground">{item.type}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge
                  variant={
                    item.priority === "Critical" || item.priority === "High"
                      ? "destructive"
                      : item.priority === "Active"
                        ? "default"
                        : "secondary"
                  }
                  className="text-xs"
                >
                  {item.priority}
                </Badge>
                <div className="text-xs text-muted-foreground mt-1">
                  {item.daysOverdue < 0
                    ? `${Math.abs(item.daysOverdue)} days overdue`
                    : item.daysUntil === 0
                      ? "Active"
                      : `${item.daysUntil} days`}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Cost Analysis */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Cost Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {costAnalysis.map((cost) => (
            <div key={cost.category} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{cost.category}</span>
                  {cost.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-red-600" />
                  ) : cost.trend === "down" ? (
                    <TrendingDown className="h-3 w-3 text-green-600" />
                  ) : (
                    <div className="h-3 w-3 rounded-full bg-gray-400" />
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">${cost.amount.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{cost.percentage}%</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${cost.percentage}%` }} />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
