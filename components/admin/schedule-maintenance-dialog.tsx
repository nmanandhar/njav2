"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Wrench, Calendar, Clock, MapPin, FileText } from "lucide-react"

interface ScheduleMaintenanceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vehicleId: string
  vehicleName: string
  currentMileage?: number
}

// Mock data - in real app, this would come from API
const serviceCategories = [
  { id: "minor-a", name: "Minor Service (A)", description: "Standard service including oil change and basic checks" },
  { id: "major-b", name: "Major Service (B)", description: "Comprehensive service with detailed inspections" },
  {
    id: "brake-inspection",
    name: "Brake Inspection",
    description: "Full brake system inspection and maintenance",
  },
  {
    id: "compliance",
    name: "Compliance Roadworthy",
    description: "Full compliance and roadworthy inspection",
  },
  { id: "engine-oil", name: "Engine Oil & Filters", description: "Oil change and filter replacement" },
  {
    id: "tire-rotation",
    name: "Tire Rotation & Balance",
    description: "Tire rotation, balancing, and pressure check",
  },
]

const serviceVendors = [
  {
    id: "SV-001",
    name: "Quick Fix Auto Service",
    location: "123 Main St, Sydney NSW 2000",
    phone: "+61 2 9876 5432",
    rating: 4.8,
  },
  {
    id: "SV-002",
    name: "Premium Fleet Services",
    location: "789 Fleet Rd, Brisbane QLD 4000",
    phone: "+61 7 3456 7890",
    rating: 4.9,
  },
  {
    id: "SV-003",
    name: "Express Maintenance Co",
    location: "321 Service Ave, Perth WA 6000",
    phone: "+61 8 9123 4567",
    rating: 4.6,
  },
]

const workOrderTemplates = [
  { id: "WOT-001", name: "Standard Vehicle Service" },
  { id: "WOT-002", name: "Heavy Vehicle Major Service" },
  { id: "WOT-003", name: "Compliance & Safety Inspection" },
]

export function ScheduleMaintenanceDialog({
  open,
  onOpenChange,
  vehicleId,
  vehicleName,
  currentMileage,
}: ScheduleMaintenanceDialogProps) {
  const [formData, setFormData] = useState({
    serviceType: "",
    serviceVendor: "",
    workOrderTemplate: "",
    serviceDate: "",
    serviceTime: "",
    estimatedDuration: "",
    specialInstructions: "",
    priority: "normal",
  })

  const handleSubmit = () => {
    console.log("[v0] Scheduling maintenance:", {
      vehicleId,
      vehicleName,
      ...formData,
    })

    // Reset form
    setFormData({
      serviceType: "",
      serviceVendor: "",
      workOrderTemplate: "",
      serviceDate: "",
      serviceTime: "",
      estimatedDuration: "",
      specialInstructions: "",
      priority: "normal",
    })
    onOpenChange(false)
  }

  const selectedService = serviceCategories.find((cat) => cat.id === formData.serviceType)
  const selectedVendor = serviceVendors.find((vendor) => vendor.id === formData.serviceVendor)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Maintenance</DialogTitle>
          <DialogDescription>
            Schedule a maintenance service for {vehicleName} ({vehicleId})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Vehicle Information */}
          <Card className="p-4 bg-muted/50">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-teal-500/10 p-2">
                <Wrench className="h-4 w-4 text-teal-600" />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="text-sm font-semibold">Vehicle Information</h4>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="text-muted-foreground">Vehicle:</span>{" "}
                    <span className="font-medium">
                      {vehicleName} ({vehicleId})
                    </span>
                  </p>
                  {currentMileage && (
                    <p>
                      <span className="text-muted-foreground">Current Mileage:</span>{" "}
                      <span className="font-medium">{currentMileage.toLocaleString()} km</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Service Type */}
          <div className="space-y-2">
            <Label htmlFor="serviceType">
              Service Type <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.serviceType}
              onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
            >
              <SelectTrigger id="serviceType">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                {serviceCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex flex-col">
                      <span>{category.name}</span>
                      <span className="text-xs text-muted-foreground">{category.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedService && (
              <p className="text-xs text-muted-foreground mt-1">
                <FileText className="inline h-3 w-3 mr-1" />
                {selectedService.description}
              </p>
            )}
          </div>

          {/* Work Order Template (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="workOrderTemplate">Work Order Template (Optional)</Label>
            <Select
              value={formData.workOrderTemplate}
              onValueChange={(value) => setFormData({ ...formData, workOrderTemplate: value })}
            >
              <SelectTrigger id="workOrderTemplate">
                <SelectValue placeholder="Select work order template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None - Custom Service</SelectItem>
                {workOrderTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name} ({template.id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Service Vendor */}
          <div className="space-y-2">
            <Label htmlFor="serviceVendor">
              Service Vendor <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.serviceVendor}
              onValueChange={(value) => setFormData({ ...formData, serviceVendor: value })}
            >
              <SelectTrigger id="serviceVendor">
                <SelectValue placeholder="Select service vendor" />
              </SelectTrigger>
              <SelectContent>
                {serviceVendors.map((vendor) => (
                  <SelectItem key={vendor.id} value={vendor.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{vendor.name}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {vendor.location}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedVendor && (
              <div className="text-xs text-muted-foreground space-y-1 mt-2">
                <p className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {selectedVendor.location}
                </p>
                <p>Phone: {selectedVendor.phone}</p>
                <Badge variant="secondary" className="text-xs">
                  Rating: {selectedVendor.rating}/5.0
                </Badge>
              </div>
            )}
          </div>

          {/* Scheduling Details */}
          <Card className="p-4 space-y-4">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Scheduling Details
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serviceDate">
                  Service Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="serviceDate"
                  type="date"
                  value={formData.serviceDate}
                  onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serviceTime">
                  Service Time <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="serviceTime"
                  type="time"
                  value={formData.serviceTime}
                  onChange={(e) => setFormData({ ...formData, serviceTime: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedDuration">Estimated Duration (hours)</Label>
              <Select
                value={formData.estimatedDuration}
                onValueChange={(value) => setFormData({ ...formData, estimatedDuration: value })}
              >
                <SelectTrigger id="estimatedDuration">
                  <SelectValue placeholder="Select estimated duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="2">2 hours</SelectItem>
                  <SelectItem value="3">3 hours</SelectItem>
                  <SelectItem value="4">4 hours</SelectItem>
                  <SelectItem value="6">6 hours</SelectItem>
                  <SelectItem value="8">Full day (8 hours)</SelectItem>
                  <SelectItem value="16">2 days</SelectItem>
                </SelectContent>
              </Select>
              {formData.estimatedDuration && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Vehicle will be unavailable during this period
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger id="priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Special Instructions */}
          <div className="space-y-2">
            <Label htmlFor="specialInstructions">Special Instructions / Notes</Label>
            <Textarea
              id="specialInstructions"
              value={formData.specialInstructions}
              onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
              placeholder="Enter any special instructions, known issues, or specific requirements..."
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              Include details like known faults, specific parts to check, or customer requirements
            </p>
          </div>

          {/* Service Summary */}
          {formData.serviceType && formData.serviceVendor && formData.serviceDate && (
            <Card className="p-4 bg-teal-500/5 border-teal-500/20">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Wrench className="h-4 w-4 text-teal-600" />
                Service Summary
              </h4>
              <div className="text-sm space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Vehicle:</span>
                  <span className="font-medium">
                    {vehicleName} ({vehicleId})
                  </span>

                  <span className="text-muted-foreground">Service:</span>
                  <span className="font-medium">{selectedService?.name}</span>

                  <span className="text-muted-foreground">Vendor:</span>
                  <span className="font-medium">{selectedVendor?.name}</span>

                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">
                    {new Date(formData.serviceDate).toLocaleDateString()}
                    {formData.serviceTime && ` at ${formData.serviceTime}`}
                  </span>

                  {formData.estimatedDuration && (
                    <>
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{formData.estimatedDuration} hours</span>
                    </>
                  )}

                  <span className="text-muted-foreground">Priority:</span>
                  <Badge
                    variant={
                      formData.priority === "urgent"
                        ? "destructive"
                        : formData.priority === "high"
                          ? "default"
                          : "secondary"
                    }
                    className="w-fit"
                  >
                    {formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1)}
                  </Badge>
                </div>
              </div>
            </Card>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              !formData.serviceType || !formData.serviceVendor || !formData.serviceDate || !formData.serviceTime
            }
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Service
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
