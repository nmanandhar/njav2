"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, X, Save, Plus } from "lucide-react"
import Link from "next/link"

const mockClients = [
  { id: "SMC-001", name: "Sydney Metro Construction", address: "123 George St, Sydney NSW 2000" },
  { id: "BE-001", name: "Brisbane Earthworks Pty Ltd", address: "456 Industrial Rd, Melbourne VIC" },
  { id: "MI-001", name: "Melbourne Infrastructure Group", address: "789 Development St, Brisbane QLD" },
  { id: "PM-001", name: "Perth Mining Solutions", address: "321 Highway Rd, Perth WA" },
]

const mockTippers = [
  { id: "TIP-BME-001", name: "Blue Mountains Earthmoving", address: "78 Beach Road, Wollongong NSW 2500" },
  { id: "TIP-MHS-002", name: "Metro Haulage Solutions", address: "89 Quarry Lane, Ballarat VIC 3350" },
  { id: "TIP-CT-003", name: "Coastal Transport Co", address: "98 Beach St, Gold Coast QLD 4217" },
  { id: "TIP-WSL-004", name: "Western Sydney Logistics", address: "45 Depot Road, Penrith NSW 2750" },
]

const mockSubcontractors = [
  { id: "SUB-RT-001", name: "Regional Transport Services" },
  { id: "SUB-CH-001", name: "Coastal Haulage Pty Ltd" },
  { id: "SUB-AL-001", name: "Alliance Logistics Group" },
  { id: "SUB-ET-001", name: "Express Transport Solutions" },
]

const mockMaterials = [
  { id: "PRD-001", name: "Hydraulic Oil - Premium Grade", unit: "Per Tonne" },
  { id: "PRD-004", name: "VENM / Clay", unit: "Per Tonne" },
  { id: "PRD-005", name: "VENM / Shale", unit: "Per Tonne" },
  { id: "PRD-006", name: "VENM / Sandstone", unit: "Per Tonne" },
]

const mockVehicles = [
  { id: "FL-001", registration: "GHI-789", make: "Volvo FH16", type: "Internal" },
  { id: "FL-002", registration: "DEF-456", make: "Scania R450", type: "Internal" },
  { id: "FL-003", registration: "ABC-123", make: "Mercedes Actros", type: "Internal" },
  { id: "FL-004", registration: "JKL-890", make: "DAF XF", type: "Internal" },
  { id: "FL-005", registration: "MNO-234", make: "Isuzu FVZ", type: "Internal" },
  { id: "SC-001", registration: "SUB-001", make: "Kenworth T610", type: "Subcontractor" },
  { id: "SC-002", registration: "SUB-002", make: "Mack Anthem", type: "Subcontractor" },
  { id: "SC-003", registration: "SUB-003", make: "Western Star 4900", type: "Subcontractor" },
  { id: "SC-004", registration: "SUB-004", make: "Peterbilt 389", type: "Subcontractor" },
]

export default function NewJobPage() {
  const [selectedTrucks, setSelectedTrucks] = useState<string[]>([])
  const [selectedClient, setSelectedClient] = useState("")
  const [selectedTipClient, setSelectedTipClient] = useState("")

  const addTruck = (truckId: string) => {
    if (!selectedTrucks.includes(truckId)) {
      setSelectedTrucks([...selectedTrucks, truckId])
    }
  }

  const removeTruck = (truckId: string) => {
    setSelectedTrucks(selectedTrucks.filter((id) => id !== truckId))
  }

  const selectedClientData = mockClients.find((c) => c.id === selectedClient)
  const selectedTipClientData = mockTippers.find((t) => t.id === selectedTipClient)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin-portal/jobs">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Jobs
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Create New Job</h1>
              <p className="text-muted-foreground">
                Fill in the details to create a new job for tracking and management
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/admin-portal/jobs">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Create Job
            </Button>
          </div>
        </div>

        {/* Form Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Client & Schedule */}
          <div className="col-span-2 space-y-6">
            {/* Client Information */}
            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Client *</Label>
                    <Select value={selectedClient} onValueChange={setSelectedClient}>
                      <SelectTrigger id="client">
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockClients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pickupAddress">Pickup Address *</Label>
                    <Input
                      id="pickupAddress"
                      placeholder="Enter pickup address"
                      defaultValue={selectedClientData?.address}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tipClient">Tip Client</Label>
                    <Select value={selectedTipClient} onValueChange={setSelectedTipClient}>
                      <SelectTrigger id="tipClient">
                        <SelectValue placeholder="Select tip client" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockTippers.map((tipper) => (
                          <SelectItem key={tipper.id} value={tipper.id}>
                            {tipper.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tipAddress">Tip Address</Label>
                    <Input
                      id="tipAddress"
                      placeholder="Enter tip address"
                      defaultValue={selectedTipClientData?.address}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="entryDateTime">Entry Date & Time *</Label>
                    <Input id="entryDateTime" type="datetime-local" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deliveryDateTime">Delivery Date & Time *</Label>
                    <Input id="deliveryDateTime" type="datetime-local" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select defaultValue="Normal">
                      <SelectTrigger id="priority">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High Priority</SelectItem>
                        <SelectItem value="Normal">Normal</SelectItem>
                        <SelectItem value="Low">Low Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedDuration">Estimated Duration</Label>
                    <Input id="estimatedDuration" placeholder="e.g., 4 hours" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Material & Location */}
            <Card>
              <CardHeader>
                <CardTitle>Material & Location Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="material">Material/Product *</Label>
                    <Select>
                      <SelectTrigger id="material">
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockMaterials.map((material) => (
                          <SelectItem key={material.id} value={material.id}>
                            {material.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity (Tonnes)</Label>
                    <Input id="quantity" type="number" placeholder="Enter quantity" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Site Location</Label>
                    <Input id="location" placeholder="Enter site location" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dropSite">Drop Site</Label>
                    <Input id="dropSite" placeholder="Enter drop site" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rates */}
            <Card>
              <CardHeader>
                <CardTitle>Rate Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientRate">Client Rate *</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input id="clientRate" type="number" placeholder="0.00" className="pl-7" />
                      </div>
                      <Select defaultValue="Per Tonne">
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Hourly">Hourly</SelectItem>
                          <SelectItem value="Per Tonne">Per Tonne</SelectItem>
                          <SelectItem value="Load Rate">Load Rate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subcontractorRate">Subcontractor Rate</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input id="subcontractorRate" type="number" placeholder="0.00" className="pl-7" />
                      </div>
                      <Select defaultValue="Hourly">
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Hourly">Hourly</SelectItem>
                          <SelectItem value="Per Tonne">Per Tonne</SelectItem>
                          <SelectItem value="Load Rate">Load Rate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tipperRate">Tipper Rate</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input id="tipperRate" type="number" placeholder="0.00" className="pl-7" />
                      </div>
                      <Select defaultValue="Load Rate">
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Hourly">Hourly</SelectItem>
                          <SelectItem value="Per Tonne">Per Tonne</SelectItem>
                          <SelectItem value="Load Rate">Load Rate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notes">Job Notes & Special Instructions</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any additional notes, special instructions, or requirements for this job..."
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Truck Assignment */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Truck Assignment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Add Trucks to Job</Label>
                  <Select onValueChange={addTruck}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select truck to add" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockVehicles
                        .filter((v) => !selectedTrucks.includes(v.id))
                        .map((vehicle) => (
                          <SelectItem key={vehicle.id} value={vehicle.id}>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-semibold">{vehicle.registration}</span>
                              <span className="text-muted-foreground text-xs">
                                {vehicle.make} ({vehicle.type})
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedTrucks.length > 0 ? (
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <span>Assigned Trucks</span>
                      <Badge variant="secondary">{selectedTrucks.length} truck(s)</Badge>
                    </div>

                    <div className="space-y-2 max-h-[500px] overflow-y-auto">
                      {selectedTrucks.map((truckId) => {
                        const truck = mockVehicles.find((v) => v.id === truckId)
                        if (!truck) return null
                        return (
                          <div
                            key={truckId}
                            className="flex items-center justify-between p-3 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
                          >
                            <div className="flex-1">
                              <div className="font-mono font-semibold text-sm">{truck.registration}</div>
                              <div className="text-xs text-muted-foreground">{truck.make}</div>
                              <Badge variant="outline" className="mt-1 text-xs">
                                {truck.type}
                              </Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTruck(truckId)}
                              className="hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
                    <Plus className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No trucks assigned yet</p>
                    <p className="text-xs">Select trucks from the dropdown above</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Summary */}
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-base">Job Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Client:</span>
                  <span className="font-medium">{selectedClientData?.name || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tip Client:</span>
                  <span className="font-medium">{selectedTipClientData?.name || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Trucks Assigned:</span>
                  <span className="font-medium">{selectedTrucks.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
