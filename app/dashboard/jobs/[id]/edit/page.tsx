"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DashboardTopNav } from "@/components/dashboard/dashboard-topnav"
import { ArrowLeft, Save, MapPin, Building2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface EditJobPageProps {
  params: {
    id: string
  }
}

const mockPickupLocations = [
  {
    id: "1",
    company: "ABC Concrete Supply",
    address: "123 Industrial Way, Sydney NSW 2000",
    contact: "John Manager",
    phone: "02 9876 5432",
    subLocations: [
      { id: "1a", type: "Stage Point", name: "Stage Point A", address: "Gate 1, 123 Industrial Way" },
      { id: "1b", type: "Drop Site", name: "Loading Bay 2", address: "Rear Access, 123 Industrial Way" },
    ],
  },
  {
    id: "2",
    company: "XYZ Materials Depot",
    address: "456 Supply Road, Melbourne VIC 3000",
    contact: "Sarah Supervisor",
    phone: "03 8765 4321",
    subLocations: [
      { id: "2a", type: "Stage Point", name: "North Yard", address: "North Section, 456 Supply Road" },
      { id: "2b", type: "Tip Site", name: "Waste Area", address: "South End, 456 Supply Road" },
    ],
  },
  {
    id: "3",
    company: "Depot A",
    address: "123 Industrial Way, Sydney NSW 2000",
    contact: "Mike Operations",
    phone: "02 5555 6666",
    subLocations: [],
  },
]

const mockDeliveryLocations = [
  {
    id: "1",
    company: "Construction Site Alpha",
    address: "456 Development Ave, Brisbane QLD 4000",
    contact: "Jane Site Manager",
    phone: "07 1234 5678",
    subLocations: [
      { id: "1a", type: "Drop Site", name: "Drop Zone A", address: "East Wing, 456 Development Ave" },
      { id: "1b", type: "Stage Point", name: "Staging Area 1", address: "West Gate, 456 Development Ave" },
    ],
  },
  {
    id: "2",
    company: "Beta Building Project",
    address: "789 Construction Blvd, Perth WA 6000",
    contact: "Tom Foreman",
    phone: "08 9876 5432",
    subLocations: [
      { id: "2a", type: "Drop Site", name: "Main Pour Site", address: "Level 3, 789 Construction Blvd" },
      { id: "2b", type: "Tip Site", name: "Waste Collection", address: "Ground Level, 789 Construction Blvd" },
    ],
  },
]

export default function EditJobPage({ params }: EditJobPageProps) {
  const router = useRouter()

  const [formData, setFormData] = useState({
    jobNumber: "JOB-2024-001",
    clientName: "ABC Construction Ltd",
    driverName: "John Smith",
    driverType: "Internal",
    truckAllocation: "TRUCK-001",
    materialType: "Concrete Mix",
    volume: "15",
    weight: "22",
    pickupLocationId: "3",
    deliveryLocationId: "1",
    pickupStagePoint: "",
    pickupDropSite: "",
    pickupTipSite: "",
    deliveryStagePoint: "",
    deliveryDropSite: "",
    deliveryTipSite: "",
    scheduledDate: "2024-01-15",
    scheduledTime: "08:00",
    priority: "normal",
    status: "In Progress",
    notes: "High-strength concrete required. Contact site manager before delivery.",
  })

  const selectedPickupLocation = mockPickupLocations.find((loc) => loc.id === formData.pickupLocationId)
  const selectedDeliveryLocation = mockDeliveryLocations.find((loc) => loc.id === formData.deliveryLocationId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Job updated:", formData)
    alert("Job updated successfully!")
    router.push("/dashboard/jobs")
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (field === "pickupLocationId") {
      setFormData((prev) => ({ ...prev, pickupStagePoint: "", pickupDropSite: "", pickupTipSite: "" }))
    }
    if (field === "deliveryLocationId") {
      setFormData((prev) => ({ ...prev, deliveryStagePoint: "", deliveryDropSite: "", deliveryTipSite: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardTopNav />
      <div className="flex-1">
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Edit Job: {formData.jobNumber}</h1>
                <p className="text-muted-foreground">Update job details and assignments</p>
              </div>
            </div>
            <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </header>

        <main className="p-6">
          <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-6">
            {/* Job Information */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Job Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jobNumber">Job Number</Label>
                    <Input id="jobNumber" value={formData.jobNumber} disabled className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input
                      id="clientName"
                      value={formData.clientName}
                      onChange={(e) => handleChange("clientName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={formData.priority} onValueChange={(value) => handleChange("priority", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="scheduledDate">Scheduled Date</Label>
                    <Input
                      id="scheduledDate"
                      type="date"
                      value={formData.scheduledDate}
                      onChange={(e) => handleChange("scheduledDate", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="scheduledTime">Scheduled Time</Label>
                    <Input
                      id="scheduledTime"
                      type="time"
                      value={formData.scheduledTime}
                      onChange={(e) => handleChange("scheduledTime", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Driver & Vehicle Assignment */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Driver & Vehicle Assignment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="driverName">Driver Name</Label>
                    <Input id="driverName" value={formData.driverName} disabled className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driverType">Driver Type</Label>
                    <Input id="driverType" value={formData.driverType} disabled className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="truckAllocation">Truck Allocation</Label>
                    <Input
                      id="truckAllocation"
                      value={`${formData.truckAllocation} (Volvo FH16)`}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Material Details */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Material Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="materialType">Material Type</Label>
                    <Select
                      value={formData.materialType}
                      onValueChange={(value) => handleChange("materialType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Concrete Mix">Concrete Mix</SelectItem>
                        <SelectItem value="Gravel">Gravel</SelectItem>
                        <SelectItem value="Sand">Sand</SelectItem>
                        <SelectItem value="Topsoil">Topsoil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="volume">Volume (m³)</Label>
                    <Input
                      id="volume"
                      type="number"
                      step="0.1"
                      value={formData.volume}
                      onChange={(e) => handleChange("volume", e.target.value)}
                      required
                      placeholder="Enter volume"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (Tonnes)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={(e) => handleChange("weight", e.target.value)}
                      required
                      placeholder="Enter weight"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Location Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Pickup Location */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickupLocation">Pickup Location</Label>
                    <Select
                      value={formData.pickupLocationId}
                      onValueChange={(value) => handleChange("pickupLocationId", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select pickup location from address book" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockPickupLocations.map((location) => (
                          <SelectItem key={location.id} value={location.id}>
                            {location.company}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedPickupLocation && (
                    <Card className="bg-muted/50 border-muted">
                      <CardContent className="pt-4 space-y-2">
                        <div className="flex items-start space-x-2">
                          <Building2 className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">{selectedPickupLocation.company}</p>
                            <p className="text-xs text-muted-foreground">{selectedPickupLocation.contact}</p>
                            <p className="text-xs text-muted-foreground">{selectedPickupLocation.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <p className="text-sm text-muted-foreground">{selectedPickupLocation.address}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {selectedPickupLocation && selectedPickupLocation.subLocations.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pickupStagePoint">Stage Point (Optional)</Label>
                        <Select
                          value={formData.pickupStagePoint}
                          onValueChange={(value) => handleChange("pickupStagePoint", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select stage point" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedPickupLocation.subLocations
                              .filter((subLoc) => subLoc.type === "Stage Point")
                              .map((subLoc) => (
                                <SelectItem key={subLoc.id} value={subLoc.id}>
                                  {subLoc.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pickupDropSite">Drop Site (Optional)</Label>
                        <Select
                          value={formData.pickupDropSite}
                          onValueChange={(value) => handleChange("pickupDropSite", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select drop site" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedPickupLocation.subLocations
                              .filter((subLoc) => subLoc.type === "Drop Site")
                              .map((subLoc) => (
                                <SelectItem key={subLoc.id} value={subLoc.id}>
                                  {subLoc.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pickupTipSite">Tip Site (Optional)</Label>
                        <Select
                          value={formData.pickupTipSite}
                          onValueChange={(value) => handleChange("pickupTipSite", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select tip site" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedPickupLocation.subLocations
                              .filter((subLoc) => subLoc.type === "Tip Site")
                              .map((subLoc) => (
                                <SelectItem key={subLoc.id} value={subLoc.id}>
                                  {subLoc.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Delivery Location */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="deliveryLocation">Delivery Location</Label>
                    <Select
                      value={formData.deliveryLocationId}
                      onValueChange={(value) => handleChange("deliveryLocationId", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select delivery location from address book" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockDeliveryLocations.map((location) => (
                          <SelectItem key={location.id} value={location.id}>
                            {location.company}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedDeliveryLocation && (
                    <Card className="bg-muted/50 border-muted">
                      <CardContent className="pt-4 space-y-2">
                        <div className="flex items-start space-x-2">
                          <Building2 className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">{selectedDeliveryLocation.company}</p>
                            <p className="text-xs text-muted-foreground">{selectedDeliveryLocation.contact}</p>
                            <p className="text-xs text-muted-foreground">{selectedDeliveryLocation.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <p className="text-sm text-muted-foreground">{selectedDeliveryLocation.address}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {selectedDeliveryLocation && selectedDeliveryLocation.subLocations.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="deliveryStagePoint">Stage Point (Optional)</Label>
                        <Select
                          value={formData.deliveryStagePoint}
                          onValueChange={(value) => handleChange("deliveryStagePoint", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select stage point" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedDeliveryLocation.subLocations
                              .filter((subLoc) => subLoc.type === "Stage Point")
                              .map((subLoc) => (
                                <SelectItem key={subLoc.id} value={subLoc.id}>
                                  {subLoc.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deliveryDropSite">Drop Site (Optional)</Label>
                        <Select
                          value={formData.deliveryDropSite}
                          onValueChange={(value) => handleChange("deliveryDropSite", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select drop site" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedDeliveryLocation.subLocations
                              .filter((subLoc) => subLoc.type === "Drop Site")
                              .map((subLoc) => (
                                <SelectItem key={subLoc.id} value={subLoc.id}>
                                  {subLoc.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deliveryTipSite">Tip Site (Optional)</Label>
                        <Select
                          value={formData.deliveryTipSite}
                          onValueChange={(value) => handleChange("deliveryTipSite", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select tip site" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedDeliveryLocation.subLocations
                              .filter((subLoc) => subLoc.type === "Tip Site")
                              .map((subLoc) => (
                                <SelectItem key={subLoc.id} value={subLoc.id}>
                                  {subLoc.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter any additional notes or special instructions..."
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  rows={4}
                />
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
