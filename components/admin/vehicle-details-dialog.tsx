"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Truck, Wrench, FileText, Activity, User, Fuel, Container } from "lucide-react"

interface VehicleDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vehicle: any
}

export function VehicleDetailsDialog({ open, onOpenChange, vehicle }: VehicleDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState("details")

  if (!vehicle) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl">{vehicle.id}</DialogTitle>
              <DialogDescription className="text-base mt-1">
                {vehicle.make} {vehicle.model} ({vehicle.year}) • {vehicle.registration}
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              {vehicle.status === "Active" && <Badge className="bg-emerald-500">Active</Badge>}
              {vehicle.status === "In Maintenance" && <Badge variant="destructive">In Maintenance</Badge>}
              {vehicle.status === "Idle" && <Badge variant="secondary">Idle</Badge>}
              {vehicle.gpsStatus === "Online" && (
                <Badge variant="outline" className="border-emerald-500 text-emerald-500">
                  Online
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-6 mt-6">
            {/* Vehicle Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Vehicle Information
              </h3>
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Vehicle ID</p>
                  <p className="text-sm font-medium">{vehicle.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Registration Number</p>
                  <p className="text-sm font-medium">{vehicle.registration}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Year</p>
                  <p className="text-sm font-medium">{vehicle.year}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Make</p>
                  <p className="text-sm font-medium">{vehicle.make}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Model</p>
                  <p className="text-sm font-medium">{vehicle.model}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Vehicle Type</p>
                  <p className="text-sm font-medium">{vehicle.type}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground mb-1">Capacity</p>
                  <p className="text-sm font-medium">{vehicle.capacity}</p>
                </div>
              </div>
            </div>

            {/* Trailer Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Container className="h-4 w-4" />
                Trailer Information
              </h3>
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Trailer Status</p>
                  {vehicle.trailerRegistration ? (
                    <span className="inline-block px-2 py-1 text-xs font-medium text-white bg-teal-600 rounded">
                      Attached
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 text-xs font-medium text-white bg-gray-400 rounded">
                      No Trailer
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Trailer Registration</p>
                  {vehicle.trailerRegistration ? (
                    <p className="text-sm font-medium">{vehicle.trailerRegistration}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">N/A</p>
                  )}
                </div>
              </div>
            </div>

            {/* Driver Assignment */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <User className="h-4 w-4" />
                Driver Assignment
              </h3>
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Assigned Driver</p>
                  <p className="text-sm font-medium">{vehicle.driver}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Driver Status</p>
                  <p className="text-sm font-medium">{vehicle.status}</p>
                </div>
              </div>
            </div>

            {/* Current Location & Job */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Current Location & Job
              </h3>
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Location</p>
                  <p className="text-sm font-medium">{vehicle.location}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Current Job</p>
                  <p className="text-sm font-medium">{vehicle.job || "No active job"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">GPS Status</p>
                  <p className="text-sm font-medium">{vehicle.gpsStatus}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Vehicle State</p>
                  <p className="text-sm font-medium">{vehicle.gpsActivity}</p>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Fuel className="h-4 w-4" />
                Performance Metrics
              </h3>
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Current Mileage</p>
                  <p className="text-sm font-medium">{vehicle.mileage}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Fuel Consumption</p>
                  <p className="text-sm font-medium">{vehicle.fuelConsumption}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Fuel Cost</p>
                  <p className="text-sm font-medium">{vehicle.fuelCost}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Maintenance Tab */}
          <TabsContent value="maintenance" className="space-y-6 mt-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Maintenance History
              </h3>
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Last Service</p>
                  <p className="text-sm font-medium">{vehicle.lastService}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Next Service Due</p>
                  <p className="text-sm font-medium">{vehicle.nextService}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Maintenance Cost</p>
                  <p className="text-sm font-medium">{vehicle.maintenanceCost}</p>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                <h4 className="text-sm font-medium">Recent Service Records</h4>
                <div className="space-y-2">
                  {[
                    { date: "2024-01-10", type: "Oil Change & Filter", cost: "$450", notes: "Regular service" },
                    { date: "2023-12-15", type: "Brake Inspection", cost: "$1,200", notes: "Replaced front pads" },
                    { date: "2023-11-20", type: "Tire Rotation", cost: "$180", notes: "All tires rotated" },
                  ].map((record, index) => (
                    <div key={index} className="p-3 border border-border rounded-md">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-sm font-medium">{record.type}</p>
                        <p className="text-sm font-semibold">{record.cost}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{record.date}</span>
                        <span>•</span>
                        <span>{record.notes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6 mt-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Performance Analytics
              </h3>
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Utilisation Rate</p>
                  <p className="text-sm font-medium">{vehicle.utilization}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Distance (This Month)</p>
                  <p className="text-sm font-medium">{vehicle.mileage}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Average Fuel Economy</p>
                  <p className="text-sm font-medium">{vehicle.fuelConsumption}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Fuel Cost (This Month)</p>
                  <p className="text-sm font-medium">{vehicle.fuelCost}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Jobs Completed</p>
                  <p className="text-sm font-medium">127 jobs</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Average Job Duration</p>
                  <p className="text-sm font-medium">3.2 hours</p>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-2">Performance Insights</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">✓</span>
                    <span>Fuel efficiency is 8% above fleet average</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">✓</span>
                    <span>High utilisation rate indicates optimal usage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">⚠</span>
                    <span>Service due in 3 days - schedule maintenance soon</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6 mt-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Vehicle Documents
              </h3>

              <div className="space-y-3">
                {[
                  { name: "Registration Certificate", type: "PDF", date: "2024-01-15", status: "Valid" },
                  { name: "Insurance Policy", type: "PDF", date: "2024-01-01", status: "Valid" },
                  { name: "Safety Inspection Report", type: "PDF", date: "2024-01-10", status: "Valid" },
                  { name: "Compliance Certificate", type: "PDF", date: "2023-12-20", status: "Expiring Soon" },
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.type} • Updated {doc.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={doc.status === "Valid" ? "outline" : "secondary"} className="text-xs">
                        {doc.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6 mt-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Recent Activity
              </h3>

              <div className="space-y-3">
                {[
                  { time: "2 hours ago", action: "Completed delivery", location: "Site Alpha - Construction Zone" },
                  { time: "4 hours ago", action: "Started job", location: "JOB-2024-001" },
                  { time: "Yesterday", action: "Maintenance completed", location: "Service Center - Parramatta" },
                  { time: "2 days ago", action: "Assigned to driver", location: "John Smith" },
                  { time: "3 days ago", action: "GPS location updated", location: "En Route" },
                ].map((activity, index) => (
                  <div key={index} className="flex gap-3 p-3 border border-border rounded-md">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.location}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>Edit Vehicle</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
