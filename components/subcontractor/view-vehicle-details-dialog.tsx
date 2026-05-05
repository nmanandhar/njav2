"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Truck, MapPin, Wrench, Activity, Calendar, Gauge, Fuel, User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface VehicleDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vehicle: any
}

export function ViewVehicleDetailsDialog({ open, onOpenChange, vehicle }: VehicleDetailsDialogProps) {
  console.log("[v0] ViewVehicleDetailsDialog rendered - open:", open, "vehicle:", vehicle)

  if (!vehicle) {
    console.log("[v0] No vehicle provided, returning null")
    return null
  }

  // Mock driver assignment history
  const driverHistory = [
    { driver: "John Smith", period: "2024-01-01 to Present", status: "Active" },
    { driver: "Mike Wilson", period: "2023-10-15 to 2023-12-31", status: "Completed" },
    { driver: "Sarah Johnson", period: "2023-07-01 to 2023-10-14", status: "Completed" },
  ]

  // Mock maintenance history
  const maintenanceHistory = [
    {
      date: "2024-01-10",
      type: "Scheduled Service",
      description: "Oil change, filter replacement, brake inspection",
      cost: "$1,450",
      status: "Completed",
    },
    {
      date: "2023-11-20",
      type: "Repair",
      description: "Tire replacement - front axle",
      cost: "$890",
      status: "Completed",
    },
    {
      date: "2023-09-05",
      type: "Scheduled Service",
      description: "Major service at 40,000 km",
      cost: "$2,300",
      status: "Completed",
    },
  ]

  // Mock job history
  const jobHistory = [
    {
      jobId: "JOB-2024-001",
      location: "Site Alpha - Construction Zone",
      startDate: "2024-01-15",
      status: "Active",
      duration: "5 days",
    },
    {
      jobId: "JOB-2023-089",
      location: "Site Gamma - Port Melbourne",
      startDate: "2024-01-08",
      status: "Completed",
      duration: "7 days",
    },
    {
      jobId: "JOB-2023-076",
      location: "Site Delta - Warehouse District",
      startDate: "2023-12-28",
      status: "Completed",
      duration: "11 days",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <Truck className="h-6 w-6 text-primary" />
            Vehicle Details - {vehicle.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Vehicle Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Vehicle Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Registration</p>
                  <p className="font-semibold">{vehicle.registration}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Make & Model</p>
                  <p className="font-semibold">
                    {vehicle.make} {vehicle.model}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-semibold">{vehicle.year}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Capacity</p>
                  <p className="font-semibold">{vehicle.capacity}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Current Status</p>
                  {vehicle.driver ? (
                    <Badge variant={vehicle.driver.status === "Active" ? "default" : "destructive"}>
                      {vehicle.driver.status}
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Unassigned</Badge>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Utilisation</p>
                  <div className="space-y-1">
                    <div className="text-sm font-semibold">{vehicle.utilisation}%</div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${vehicle.utilisation}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Driver Assignment History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Driver Assignment History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {driverHistory.map((assignment, index) => (
                  <div key={index} className="flex items-start justify-between p-3 rounded-lg border bg-muted/30">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {assignment.driver
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{assignment.driver}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {assignment.period}
                        </p>
                      </div>
                    </div>
                    <Badge variant={assignment.status === "Active" ? "default" : "outline"}>{assignment.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Location & Job */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location & Job History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-muted-foreground">Current Location</p>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <p className="font-semibold">{vehicle.location}</p>
                </div>
                {vehicle.job && (
                  <div className="mt-2">
                    <Badge className="bg-blue-500 text-white">Active Job: {vehicle.job}</Badge>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              <p className="text-sm font-semibold mb-3">Job History</p>
              <div className="space-y-3">
                {jobHistory.map((job, index) => (
                  <div key={index} className="flex items-start justify-between p-3 rounded-lg border bg-muted/30">
                    <div className="space-y-1">
                      <p className="font-semibold">{job.jobId}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Started: {job.startDate} • Duration: {job.duration}
                      </p>
                    </div>
                    <Badge variant={job.status === "Active" ? "default" : "outline"}>{job.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Maintenance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-3 rounded-lg border bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-1">Last Service</p>
                  <p className="font-semibold">{vehicle.maintenance.last}</p>
                </div>
                <div className="p-3 rounded-lg border bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-1">Next Service Due</p>
                  <Badge
                    variant={
                      vehicle.maintenance.status === "overdue"
                        ? "destructive"
                        : vehicle.maintenance.status === "expiring"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {vehicle.maintenance.due}
                  </Badge>
                </div>
                <div className="p-3 rounded-lg border bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-1">Total Cost (YTD)</p>
                  <p className="font-semibold">{vehicle.maintenance.cost}</p>
                </div>
              </div>

              <Separator className="my-4" />

              <p className="text-sm font-semibold mb-3">Maintenance History</p>
              <div className="space-y-3">
                {maintenanceHistory.map((record, index) => (
                  <div key={index} className="p-3 rounded-lg border bg-muted/30">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">{record.type}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {record.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">{record.cost}</p>
                        <Badge variant="outline" className="mt-1">
                          {record.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{record.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border bg-muted/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className="h-4 w-4 text-primary" />
                    <p className="text-sm text-muted-foreground">Total Distance</p>
                  </div>
                  <p className="text-2xl font-bold">{vehicle.performance.distance}</p>
                </div>
                <div className="p-4 rounded-lg border bg-muted/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Fuel className="h-4 w-4 text-primary" />
                    <p className="text-sm text-muted-foreground">Fuel Efficiency</p>
                  </div>
                  <p className="text-2xl font-bold">{vehicle.performance.fuelRate}</p>
                </div>
                <div className="p-4 rounded-lg border bg-muted/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Fuel className="h-4 w-4 text-primary" />
                    <p className="text-sm text-muted-foreground">Fuel Cost</p>
                  </div>
                  <p className="text-2xl font-bold">{vehicle.performance.fuelCost}</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg border bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-1">GPS Status</p>
                  <Badge variant={vehicle.gps === "Online" ? "default" : "destructive"}>{vehicle.gps}</Badge>
                </div>
                <div className="p-3 rounded-lg border bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-1">Active Alerts</p>
                  {vehicle.alerts.length > 0 ? (
                    <div className="space-y-1">
                      {vehicle.alerts.map((alert: string, idx: number) => (
                        <Badge key={idx} variant="secondary" className="text-orange-600">
                          {alert}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <Badge variant="outline" className="text-green-600">
                      No alerts
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
