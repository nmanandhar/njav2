"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DollarSign, Clock, FileText, AlertTriangle, Shield, TrendingUp, Wrench, Calendar } from "lucide-react"

export function AdminMaintenanceDashboard() {
  // Sample data
  const stats = {
    avgRepairCost: 1450,
    avgDowntime: 3.2,
    totalSpend: 48500,
    regsDueToExpire: 5,
    insurancesDueToExpire: 3,
    maintenanceDue: 8,
    faultsLogged: 12,
  }

  const slaMetrics = {
    repairTimeGoal: 85,
    safetyInspectionRate: 92,
    subcontractorCompliance: 78,
  }

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Average Repair Cost */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Repair Cost per Vehicle</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.avgRepairCost}</div>
            <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
          </CardContent>
        </Card>

        {/* Avg Downtime Per Vehicle */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Downtime Per Vehicle</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgDowntime} days</div>
            <p className="text-xs text-muted-foreground mt-1">Per maintenance event</p>
          </CardContent>
        </Card>

        {/* Total Maintenance Spend */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Maintenance Spend</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalSpend.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">This quarter</p>
          </CardContent>
        </Card>

        {/* Registrations Due to Expire */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registrations Due to Expire</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.regsDueToExpire}</div>
            <Badge variant="destructive" className="mt-2">
              Within 30 days
            </Badge>
          </CardContent>
        </Card>

        {/* Insurances Due to Expire */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Insurances Due to Expire</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.insurancesDueToExpire}</div>
            <Badge variant="destructive" className="mt-2">
              Action required
            </Badge>
          </CardContent>
        </Card>

        {/* Maintenance Due */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Due</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.maintenanceDue}</div>
            <Badge className="mt-2 bg-orange-500">Scheduled soon</Badge>
          </CardContent>
        </Card>

        {/* Faults Logged */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faults Logged</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.faultsLogged}</div>
            <Badge variant="secondary" className="mt-2">
              Within 30 days
            </Badge>
          </CardContent>
        </Card>

        {/* Export Logs */}
        <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Export Logs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Download Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Audit & Compliance Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Audit & Compliance</h2>
        <Card>
          <CardHeader>
            <CardTitle>Compliance Overview</CardTitle>
            <CardDescription>Show high level information of activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Safety Inspections Completed</span>
                <span className="text-sm text-muted-foreground">24/28 vehicles</span>
              </div>
              <Progress value={86} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Documentation Up to Date</span>
                <span className="text-sm text-muted-foreground">31/35 vehicles</span>
              </div>
              <Progress value={89} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Scheduled Maintenance On Time</span>
                <span className="text-sm text-muted-foreground">28/35 vehicles</span>
              </div>
              <Progress value={80} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance SLA Tracking Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Maintenance SLA Tracking</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Repair Time Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Repair Time Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Meeting targets</span>
                  <span className="text-sm font-medium">{slaMetrics.repairTimeGoal}%</span>
                </div>
                <Progress value={slaMetrics.repairTimeGoal} />
              </div>
              <p className="text-xs text-muted-foreground">Avg repair time: 2.8 days (Target: 3 days)</p>
            </CardContent>
          </Card>

          {/* Safety Inspection Completion Rates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Safety Inspection Completion Rates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Completion rate</span>
                  <span className="text-sm font-medium">{slaMetrics.safetyInspectionRate}%</span>
                </div>
                <Progress value={slaMetrics.safetyInspectionRate} className="[&>div]:bg-green-500" />
              </div>
              <Badge className="bg-green-500">Exceeding target</Badge>
            </CardContent>
          </Card>

          {/* Sub-contractor Compliance Penalty Triggers */}
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-base">Sub-contractor Compliance Penalty Triggers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Overall compliance</span>
                    <span className="text-sm font-medium">{slaMetrics.subcontractorCompliance}%</span>
                  </div>
                  <Progress value={slaMetrics.subcontractorCompliance} className="[&>div]:bg-orange-500" />
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <p className="text-xs text-muted-foreground">
                    2 vehicles below compliance threshold - Action required to avoid penalties
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Service & Schedule Activities Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Service & Schedule Activities</h2>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>High level log of recent maintenance and service activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Activity Log Items */}
              <div className="flex items-start gap-3 pb-4 border-b border-border">
                <div className="rounded-full bg-teal-500/10 p-2">
                  <Wrench className="h-4 w-4 text-teal-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Brake replacement completed - FL-001</p>
                  <p className="text-xs text-muted-foreground">Completed by ABC Service Center • 2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-4 border-b border-border">
                <div className="rounded-full bg-blue-500/10 p-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Scheduled maintenance - FL-003</p>
                  <p className="text-xs text-muted-foreground">Scheduled for tomorrow at Service Depot A</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-4 border-b border-border">
                <div className="rounded-full bg-green-500/10 p-2">
                  <Shield className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Safety inspection passed - FL-007</p>
                  <p className="text-xs text-muted-foreground">Completed by City Inspection • 1 day ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-4 border-b border-border">
                <div className="rounded-full bg-orange-500/10 p-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Service overdue - FL-002</p>
                  <p className="text-xs text-muted-foreground">10,000 km service due • 2 days overdue</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full bg-teal-500/10 p-2">
                  <Wrench className="h-4 w-4 text-teal-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Oil change completed - FL-005</p>
                  <p className="text-xs text-muted-foreground">Completed by Quick Service • 3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
