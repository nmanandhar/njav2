"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DashboardTopNav } from "@/components/dashboard/dashboard-topnav"
import { ArrowLeft, Send } from "lucide-react"
import { useRouter } from "next/navigation"

const addressBookData = {
  pickupLocations: [
    {
      id: "1",
      companyName: "Sydney Quarry Supplies",
      address: "45 Industrial Road, Sydney NSW 2000",
      subLocations: [
        { id: "1-1", name: "North Loading Bay", type: "Stage Point" },
        { id: "1-2", name: "South Loading Bay", type: "Stage Point" },
      ],
    },
    {
      id: "2",
      companyName: "Melbourne Stone & Aggregate",
      address: "120 Quarry Drive, Melbourne VIC 3000",
      subLocations: [
        { id: "2-1", name: "Main Yard", type: "Stage Point" },
        { id: "2-2", name: "Storage Area B", type: "Stage Point" },
      ],
    },
    {
      id: "3",
      companyName: "Brisbane Materials Hub",
      address: "88 Logistics Way, Brisbane QLD 4000",
      subLocations: [{ id: "3-1", name: "Loading Zone A", type: "Stage Point" }],
    },
  ],
  deliveryLocations: [
    {
      id: "4",
      companyName: "ABC Construction Ltd",
      address: "123 Construction Ave, Sydney NSW 2000",
      subLocations: [
        { id: "4-1", name: "Site Entry Point", type: "Drop Site" },
        { id: "4-2", name: "Back Lot", type: "Drop Site" },
        { id: "4-3", name: "Waste Area", type: "Tip Site" },
      ],
    },
    {
      id: "5",
      companyName: "XYZ Developments",
      address: "456 Industrial Rd, Melbourne VIC 3000",
      subLocations: [
        { id: "5-1", name: "Main Drop Zone", type: "Drop Site" },
        { id: "5-2", name: "Disposal Point", type: "Tip Site" },
      ],
    },
    {
      id: "6",
      companyName: "Pacific Building Group",
      address: "789 Development St, Brisbane QLD 4000",
      subLocations: [
        { id: "6-1", name: "Eastern Drop Site", type: "Drop Site" },
        { id: "6-2", name: "Western Drop Site", type: "Drop Site" },
      ],
    },
  ],
}

export default function NewJobPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    jobNumber: "",
    clientName: "",
    status: "Pending",
    priority: "Normal",
    materialType: "",
    volumeM3: "",
    weightTonnes: "",
    pickupLocationId: "",
    pickupLocation: "",
    pickupCompany: "",
    deliveryLocationId: "",
    deliveryLocation: "",
    deliveryCompany: "",
    stagePoint: "",
    dropSite: "",
    tipSite: "",
    scheduledDate: "",
    scheduledTime: "",
    notes: "",
  })

  const [availablePickupSubLocations, setAvailablePickupSubLocations] = useState<any[]>([])
  const [availableDeliverySubLocations, setAvailableDeliverySubLocations] = useState<any[]>([])

  useEffect(() => {
    const generateJobNumber = () => {
      const year = new Date().getFullYear()
      const random = Math.floor(Math.random() * 900) + 100
      return `JOB-${year}-${random}`
    }

    setFormData((prev) => ({
      ...prev,
      jobNumber: generateJobNumber(),
      clientName: "ABC Construction Ltd",
    }))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] New job form submitted:", formData)
    alert("Job submitted successfully! Our team will review and assign a driver shortly.")
    router.push("/dashboard/jobs")
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePickupLocationChange = (locationId: string) => {
    const selected = addressBookData.pickupLocations.find((loc) => loc.id === locationId)
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        pickupLocationId: locationId,
        pickupCompany: selected.companyName,
        pickupLocation: selected.address,
        stagePoint: "", // Reset sub-location when main location changes
      }))
      setAvailablePickupSubLocations(selected.subLocations)
    }
  }

  const handleDeliveryLocationChange = (locationId: string) => {
    const selected = addressBookData.deliveryLocations.find((loc) => loc.id === locationId)
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        deliveryLocationId: locationId,
        deliveryCompany: selected.companyName,
        deliveryLocation: selected.address,
        dropSite: "", // Reset sub-locations when main location changes
        tipSite: "",
      }))
      setAvailableDeliverySubLocations(selected.subLocations)
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
                <h1 className="text-2xl font-bold text-foreground">Create New Job</h1>
                <p className="text-muted-foreground">Fill in the details to submit a new job request</p>
              </div>
            </div>
            <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
              <Send className="h-4 w-4 mr-2" />
              Submit
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
                    <p className="text-xs text-muted-foreground">System generated</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input id="clientName" value={formData.clientName} disabled className="bg-muted" />
                    <p className="text-xs text-muted-foreground">Auto-populated from your account</p>
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
                      required
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
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Concrete Mix">Concrete Mix</SelectItem>
                        <SelectItem value="Gravel">Gravel</SelectItem>
                        <SelectItem value="Sand">Sand</SelectItem>
                        <SelectItem value="Topsoil">Topsoil</SelectItem>
                        <SelectItem value="Asphalt">Asphalt</SelectItem>
                        <SelectItem value="Crushed Rock">Crushed Rock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="volumeM3">Volume (m³)</Label>
                    <Input
                      id="volumeM3"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 15.5"
                      value={formData.volumeM3}
                      onChange={(e) => handleChange("volumeM3", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weightTonnes">Weight (Tonnes)</Label>
                    <Input
                      id="weightTonnes"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 25.0"
                      value={formData.weightTonnes}
                      onChange={(e) => handleChange("weightTonnes", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Details */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Location Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickupLocation">Pickup Location</Label>
                    <Select value={formData.pickupLocationId} onValueChange={handlePickupLocationChange} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pickup location from address book" />
                      </SelectTrigger>
                      <SelectContent>
                        {addressBookData.pickupLocations.map((location) => (
                          <SelectItem key={location.id} value={location.id}>
                            {location.companyName} - {location.address}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {formData.pickupCompany && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Company Name</Label>
                        <p className="text-sm font-medium">{formData.pickupCompany}</p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Address</Label>
                        <p className="text-sm font-medium">{formData.pickupLocation}</p>
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="deliveryLocation">Delivery Location</Label>
                    <Select value={formData.deliveryLocationId} onValueChange={handleDeliveryLocationChange} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select delivery location from address book" />
                      </SelectTrigger>
                      <SelectContent>
                        {addressBookData.deliveryLocations.map((location) => (
                          <SelectItem key={location.id} value={location.id}>
                            {location.companyName} - {location.address}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {formData.deliveryCompany && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Company Name</Label>
                        <p className="text-sm font-medium">{formData.deliveryCompany}</p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Address</Label>
                        <p className="text-sm font-medium">{formData.deliveryLocation}</p>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stagePoint">Stage Point (Optional)</Label>
                      <Select
                        value={formData.stagePoint}
                        onValueChange={(value) => handleChange("stagePoint", value)}
                        disabled={!formData.pickupLocationId}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select stage point" />
                        </SelectTrigger>
                        <SelectContent>
                          {availablePickupSubLocations
                            .filter((sub) => sub.type === "Stage Point")
                            .map((sub) => (
                              <SelectItem key={sub.id} value={sub.name}>
                                {sub.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dropSite">Drop Site (Optional)</Label>
                      <Select
                        value={formData.dropSite}
                        onValueChange={(value) => handleChange("dropSite", value)}
                        disabled={!formData.deliveryLocationId}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select drop site" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableDeliverySubLocations
                            .filter((sub) => sub.type === "Drop Site")
                            .map((sub) => (
                              <SelectItem key={sub.id} value={sub.name}>
                                {sub.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tipSite">Tip Site (Optional)</Label>
                      <Select
                        value={formData.tipSite}
                        onValueChange={(value) => handleChange("tipSite", value)}
                        disabled={!formData.deliveryLocationId}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select tip site" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableDeliverySubLocations
                            .filter((sub) => sub.type === "Tip Site")
                            .map((sub) => (
                              <SelectItem key={sub.id} value={sub.name}>
                                {sub.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
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
                <Send className="h-4 w-4 mr-2" />
                Submit
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
