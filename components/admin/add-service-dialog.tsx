"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, FileText, Upload, X, Wrench, DollarSign, Clock } from "lucide-react"

interface AddServiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddServiceDialog({ open, onOpenChange }: AddServiceDialogProps) {
  const [formData, setFormData] = useState({
    // Vehicle & Service Type
    vehicleId: "",
    serviceType: "",
    serviceCategory: "",
    priority: "Medium",

    // Service Details
    serviceDescription: "",
    workRequired: "",
    mileageAtService: "",

    // Scheduling
    scheduledDate: "",
    scheduledTime: "",
    estimatedDuration: "",
    dueDate: "",

    // Vendor & Location
    serviceVendor: "",
    serviceLocation: "",
    vendorContactName: "",
    vendorContactPhone: "",

    // Cost Estimation
    estimatedCost: "",
    estimatedLabor: "",
    estimatedParts: "",

    // Parts & Materials
    partsRequired: [] as string[],

    // Documents
    workOrderDocument: null as File | null,
    quotationDocument: null as File | null,
    otherDocuments: [] as File[],

    // Additional Options
    sendNotification: true,
    recurring: false,
    recurringInterval: "",
    recurringUnit: "months",
  })

  const [currentPart, setCurrentPart] = useState("")

  const handleFileUpload = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, [field]: file })
    }
  }

  const handleOtherDocumentsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData({ ...formData, otherDocuments: [...formData.otherDocuments, ...files] })
  }

  const removeOtherDocument = (index: number) => {
    setFormData({
      ...formData,
      otherDocuments: formData.otherDocuments.filter((_, i) => i !== index),
    })
  }

  const addPart = () => {
    if (currentPart.trim()) {
      setFormData({
        ...formData,
        partsRequired: [...formData.partsRequired, currentPart.trim()],
      })
      setCurrentPart("")
    }
  }

  const removePart = (index: number) => {
    setFormData({
      ...formData,
      partsRequired: formData.partsRequired.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Service data:", formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[95vw] w-full sm:!max-w-[95vw] md:!max-w-[1800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
          <DialogDescription>
            Schedule a maintenance service, create a work order, and manage service documentation.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            {/* Vehicle & Service Type Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center">
                <div className="h-6 w-1 bg-primary mr-2" />
                Vehicle & Service Type
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleId">Select Vehicle *</Label>
                  <Select
                    value={formData.vehicleId}
                    onValueChange={(value) => setFormData({ ...formData, vehicleId: value })}
                    required
                  >
                    <SelectTrigger id="vehicleId">
                      <SelectValue placeholder="Choose vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FL-001">FL-001 - Volvo FH16 (2022)</SelectItem>
                      <SelectItem value="FL-002">FL-002 - Scania R450 (2021)</SelectItem>
                      <SelectItem value="FL-003">FL-003 - Mercedes Actros (2023)</SelectItem>
                      <SelectItem value="FL-004">FL-004 - DAF XF (2020)</SelectItem>
                      <SelectItem value="FL-005">FL-005 - MAN TGX (2021)</SelectItem>
                      <SelectItem value="EXC-001">EXC-001 - Caterpillar 320 (Excavator)</SelectItem>
                      <SelectItem value="EXC-002">EXC-002 - Komatsu PC200 (Excavator)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceType">Service Type *</Label>
                  <Select
                    value={formData.serviceType}
                    onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                    required
                  >
                    <SelectTrigger id="serviceType">
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Scheduled Maintenance</SelectItem>
                      <SelectItem value="repair">Repair</SelectItem>
                      <SelectItem value="inspection">Safety Inspection</SelectItem>
                      <SelectItem value="registration">Registration Service</SelectItem>
                      <SelectItem value="tire">Tire Service</SelectItem>
                      <SelectItem value="brake">Brake Service</SelectItem>
                      <SelectItem value="oil">Oil Change</SelectItem>
                      <SelectItem value="coolant">Coolant Service</SelectItem>
                      <SelectItem value="transmission">Transmission Service</SelectItem>
                      <SelectItem value="electrical">Electrical Repair</SelectItem>
                      <SelectItem value="bodywork">Bodywork/Paint</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceCategory">Service Category</Label>
                  <Select
                    value={formData.serviceCategory}
                    onValueChange={(value) => setFormData({ ...formData, serviceCategory: value })}
                  >
                    <SelectTrigger id="serviceCategory">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="preventive">Preventive Maintenance</SelectItem>
                      <SelectItem value="corrective">Corrective Maintenance</SelectItem>
                      <SelectItem value="breakdown">Breakdown/Emergency</SelectItem>
                      <SelectItem value="compliance">Compliance/Regulatory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level *</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value })}
                    required
                  >
                    <SelectTrigger id="priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Critical">Critical - Immediate Attention</SelectItem>
                      <SelectItem value="High">High - Within 24 Hours</SelectItem>
                      <SelectItem value="Medium">Medium - Within 1 Week</SelectItem>
                      <SelectItem value="Low">Low - Planned Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mileageAtService">Current Mileage/Hours</Label>
                <Input
                  id="mileageAtService"
                  type="number"
                  value={formData.mileageAtService}
                  onChange={(e) => setFormData({ ...formData, mileageAtService: e.target.value })}
                  placeholder="45230 km or 1250 hours"
                />
              </div>
            </div>

            {/* Service Details Section */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground flex items-center">
                <div className="h-6 w-1 bg-primary mr-2" />
                Service Details
              </h3>

              <div className="space-y-2">
                <Label htmlFor="serviceDescription">Service Description *</Label>
                <Textarea
                  id="serviceDescription"
                  value={formData.serviceDescription}
                  onChange={(e) => setFormData({ ...formData, serviceDescription: e.target.value })}
                  placeholder="Brief description of the service required..."
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workRequired">Detailed Work Required</Label>
                <Textarea
                  id="workRequired"
                  value={formData.workRequired}
                  onChange={(e) => setFormData({ ...formData, workRequired: e.target.value })}
                  placeholder="Detailed breakdown of work to be performed, including any specific requirements or concerns..."
                  rows={4}
                />
              </div>
            </div>

            {/* Scheduling Section */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground flex items-center">
                <div className="h-6 w-1 bg-primary mr-2" />
                Scheduling
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="scheduledDate">Scheduled Date *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="scheduledDate"
                      type="date"
                      value={formData.scheduledDate}
                      onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scheduledTime">Scheduled Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="scheduledTime"
                      type="time"
                      value={formData.scheduledTime}
                      onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estimatedDuration">Estimated Duration (hours)</Label>
                  <Input
                    id="estimatedDuration"
                    type="number"
                    step="0.5"
                    value={formData.estimatedDuration}
                    onChange={(e) => setFormData({ ...formData, estimatedDuration: e.target.value })}
                    placeholder="4.5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date (If Applicable)</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Recurring Service Option */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="recurring"
                    checked={formData.recurring}
                    onCheckedChange={(checked) => setFormData({ ...formData, recurring: checked as boolean })}
                  />
                  <Label htmlFor="recurring" className="text-sm font-normal cursor-pointer">
                    Set as Recurring Service
                  </Label>
                </div>

                {formData.recurring && (
                  <div className="ml-6 grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="recurringInterval">Repeat Every</Label>
                      <Input
                        id="recurringInterval"
                        type="number"
                        value={formData.recurringInterval}
                        onChange={(e) => setFormData({ ...formData, recurringInterval: e.target.value })}
                        placeholder="3"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recurringUnit">Time Unit</Label>
                      <Select
                        value={formData.recurringUnit}
                        onValueChange={(value) => setFormData({ ...formData, recurringUnit: value })}
                      >
                        <SelectTrigger id="recurringUnit">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="days">Days</SelectItem>
                          <SelectItem value="weeks">Weeks</SelectItem>
                          <SelectItem value="months">Months</SelectItem>
                          <SelectItem value="years">Years</SelectItem>
                          <SelectItem value="km">Kilometers</SelectItem>
                          <SelectItem value="hours">Operating Hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Vendor & Location Section */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground flex items-center">
                <div className="h-6 w-1 bg-primary mr-2" />
                Vendor & Location
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceVendor">Service Vendor *</Label>
                  <Select
                    value={formData.serviceVendor}
                    onValueChange={(value) => setFormData({ ...formData, serviceVendor: value })}
                    required
                  >
                    <SelectTrigger id="serviceVendor">
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="internal">Internal Workshop</SelectItem>
                      <SelectItem value="abc-service">ABC Service Center</SelectItem>
                      <SelectItem value="city-auto">City Auto Repair</SelectItem>
                      <SelectItem value="quick-service">Quick Service Depot</SelectItem>
                      <SelectItem value="premium-maintenance">Premium Maintenance Co.</SelectItem>
                      <SelectItem value="fleet-specialists">Fleet Specialists</SelectItem>
                      <SelectItem value="other">Other Vendor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceLocation">Service Location</Label>
                  <Input
                    id="serviceLocation"
                    value={formData.serviceLocation}
                    onChange={(e) => setFormData({ ...formData, serviceLocation: e.target.value })}
                    placeholder="123 Service St, Parramatta NSW"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vendorContactName">Vendor Contact Name</Label>
                  <Input
                    id="vendorContactName"
                    value={formData.vendorContactName}
                    onChange={(e) => setFormData({ ...formData, vendorContactName: e.target.value })}
                    placeholder="John Smith"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vendorContactPhone">Vendor Contact Phone</Label>
                  <Input
                    id="vendorContactPhone"
                    type="tel"
                    value={formData.vendorContactPhone}
                    onChange={(e) => setFormData({ ...formData, vendorContactPhone: e.target.value })}
                    placeholder="+61 2 XXXX XXXX"
                  />
                </div>
              </div>
            </div>

            {/* Cost Estimation Section */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground flex items-center">
                <div className="h-6 w-1 bg-primary mr-2" />
                Cost Estimation
              </h3>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estimatedLabor">Estimated Labor Cost</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="estimatedLabor"
                      type="number"
                      step="0.01"
                      value={formData.estimatedLabor}
                      onChange={(e) => setFormData({ ...formData, estimatedLabor: e.target.value })}
                      placeholder="500.00"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedParts">Estimated Parts Cost</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="estimatedParts"
                      type="number"
                      step="0.01"
                      value={formData.estimatedParts}
                      onChange={(e) => setFormData({ ...formData, estimatedParts: e.target.value })}
                      placeholder="350.00"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedCost">Total Estimated Cost</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="estimatedCost"
                      type="number"
                      step="0.01"
                      value={formData.estimatedCost}
                      onChange={(e) => setFormData({ ...formData, estimatedCost: e.target.value })}
                      placeholder="850.00"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Parts & Materials Section */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground flex items-center">
                <div className="h-6 w-1 bg-primary mr-2" />
                Parts & Materials Required
              </h3>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={currentPart}
                    onChange={(e) => setCurrentPart(e.target.value)}
                    placeholder="Enter part name or part number"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addPart()
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={addPart}>
                    Add Part
                  </Button>
                </div>

                {formData.partsRequired.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Parts List:</Label>
                    <div className="space-y-1">
                      {formData.partsRequired.map((part, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                          <div className="flex items-center gap-2">
                            <Wrench className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{part}</span>
                          </div>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removePart(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Documents Section */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground flex items-center">
                <div className="h-6 w-1 bg-primary mr-2" />
                Service Documents
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Work Order Document */}
                <div className="space-y-2">
                  <Label htmlFor="workOrderDocument">Work Order Document</Label>
                  <Input
                    id="workOrderDocument"
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("workOrderDocument", e)}
                    className="hidden"
                  />
                  <Label htmlFor="workOrderDocument" className="cursor-pointer">
                    <div className="flex items-center gap-2 p-2 border border-border rounded-md hover:bg-accent">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {formData.workOrderDocument ? formData.workOrderDocument.name : "Upload work order"}
                      </span>
                    </div>
                  </Label>
                </div>

                {/* Quotation Document */}
                <div className="space-y-2">
                  <Label htmlFor="quotationDocument">Quotation/Estimate</Label>
                  <Input
                    id="quotationDocument"
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("quotationDocument", e)}
                    className="hidden"
                  />
                  <Label htmlFor="quotationDocument" className="cursor-pointer">
                    <div className="flex items-center gap-2 p-2 border border-border rounded-md hover:bg-accent">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {formData.quotationDocument ? formData.quotationDocument.name : "Upload quotation"}
                      </span>
                    </div>
                  </Label>
                </div>
              </div>

              {/* Other Documents */}
              <div className="space-y-2">
                <Label htmlFor="otherDocuments">Additional Documents</Label>
                <div className="space-y-2">
                  <Input
                    id="otherDocuments"
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    multiple
                    onChange={handleOtherDocumentsUpload}
                    className="hidden"
                  />
                  <Label htmlFor="otherDocuments" className="cursor-pointer">
                    <div className="flex items-center gap-2 p-2 border border-border rounded-md hover:bg-accent">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Upload photos, reports, or other documents</span>
                    </div>
                  </Label>

                  {formData.otherDocuments.length > 0 && (
                    <div className="space-y-1">
                      {formData.otherDocuments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{file.name}</span>
                          </div>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeOtherDocument(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground flex items-center">
                <div className="h-6 w-1 bg-primary mr-2" />
                Notifications
              </h3>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sendNotification"
                  checked={formData.sendNotification}
                  onCheckedChange={(checked) => setFormData({ ...formData, sendNotification: checked as boolean })}
                />
                <Label htmlFor="sendNotification" className="text-sm font-normal cursor-pointer">
                  Send notification to driver and service vendor
                </Label>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Schedule Service</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
