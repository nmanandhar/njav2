"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wrench, CheckCircle, FileText, AlertTriangle } from "lucide-react"

interface Machinery {
  status: string
  alerts: string[]
  serviceDue: number
}

interface AdminMachineryStatsProps {
  machinery: Machinery[]
}

export function AdminMachineryStats({ machinery }: AdminMachineryStatsProps) {
  const totalMachinery = machinery.length
  const activeMachinery = machinery.filter((m) => m.status === "Active").length
  const availableMachinery = machinery.filter((m) => m.status === "Available").length
  const inMaintenance = machinery.filter((m) => m.status === "In Maintenance").length

  const totalAlerts = machinery.reduce((sum, m) => sum + m.alerts.length, 0)
  const serviceOverdue = machinery.filter((m) => m.serviceDue <= 0).length
  const serviceDueSoon = machinery.filter((m) => m.serviceDue > 0 && m.serviceDue <= 30).length
  const criticalAlerts = serviceOverdue

  const complianceIssues = machinery.filter((m) => m.alerts.length > 0).length

  const utilisationRate = Math.round(
    (machinery.reduce((sum, m) => sum + (m.status === "Active" ? 1 : 0), 0) / totalMachinery) * 100,
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Machinery */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Machinery</p>
              <p className="text-3xl font-bold text-foreground">{totalMachinery}</p>
              <div className="flex items-center gap-2">
                <Badge variant="default" className="text-xs">
                  {activeMachinery} active
                </Badge>
                <span className="text-xs text-muted-foreground">{availableMachinery} available</span>
              </div>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <Wrench className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Status */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Active</p>
              <p className="text-3xl font-bold text-foreground">{activeMachinery}</p>
              <div className="flex items-center gap-2">
                <Badge variant="default" className="text-xs">
                  {utilisationRate}% utilisation
                </Badge>
                <span className="text-xs text-muted-foreground">Currently in use</span>
              </div>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Compliance</p>
              <p className="text-3xl font-bold text-foreground">{complianceIssues}</p>
              <div className="flex items-center gap-2">
                {serviceDueSoon > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {serviceDueSoon} service due
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground">Require attention</span>
              </div>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Alerts</p>
              <p className="text-3xl font-bold text-foreground">{totalAlerts}</p>
              <div className="flex items-center gap-2">
                {criticalAlerts > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {criticalAlerts} critical
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground">Require attention</span>
              </div>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
