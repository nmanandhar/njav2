"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Upload, FileText, X } from "lucide-react"
import Image from "next/image"

interface AddDriverDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddDriverDialog({ open, onOpenChange }: AddDriverDialogProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    licenseClass: "HC",
    licenseExpiry: "",
    driversLicense: null as File | null,
    medical: null as File | null,
    medicalExpiry: "",
    whiteCard: null as File | null,
    whiteCardExpiry: "",
    insurance: null as File | null,
    insuranceExpiry: "",
    otherDocuments: [] as File[],
    mobileAppAccess: true,
    hourlyRateWeekday: "",
    hourlyRateWeekend: "",
    nightRateWeekday: "",
    nightRateWeekend: "",
    driverType: "Internal",
    assignVehicle: "",
  })

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileUpload = (
    field: "driversLicense" | "medical" | "whiteCard" | "insurance",
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
    const newDocs = formData.otherDocuments.filter((_, i) => i !== index)
    setFormData({ ...formData, otherDocuments: newDocs })
  }

  const handleSubmit = () => {
    console.log("[v0] Driver data submitted:", formData)
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      licenseNumber: "",
      licenseClass: "HC",
      licenseExpiry: "",
      driversLicense: null,
      medical: null,
      medicalExpiry: "",
      whiteCard: null,
      whiteCardExpiry: "",
      insurance: null,
      insuranceExpiry: "",
      otherDocuments: [],
      mobileAppAccess: true,
      hourlyRateWeekday: "",
      hourlyRateWeekend: "",
      nightRateWeekday: "",
      nightRateWeekend: "",
      driverType: "Internal",
      assignVehicle: "",
    })
    setPhotoPreview(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[95vw] w-full sm:!max-w-[95vw] md:!max-w-[1800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Driver</DialogTitle>
          <DialogDescription>
            Enter driver information, upload required compliance documents, and configure pay rates.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Personal Details Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center">
              <div className="h-6 w-1 bg-primary mr-2" />
              Personal Details
            </h3>

            {/* Photo Upload */}
            <div className="space-y-2">
              <Label>Upload Photo</Label>
              <div className="flex items-center gap-4">
                {photoPreview ? (
                  <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-border">
                    <Image src={photoPreview || "/placeholder.svg"} alt="Driver photo" fill className="object-cover" />
                  </div>
                ) : (
                  <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-border">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
                <div>
                  <Input id="photo" type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  <Label htmlFor="photo" className="cursor-pointer">
                    <Button type="button" variant="outline" size="sm" asChild>
                      <span>Choose Photo</span>
                    </Button>
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG or GIF (max. 5MB)</p>
                </div>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="John"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Smith"
                  required
                />
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john.smith@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+61 4XX XXX XXX"
                  required
                />
              </div>
            </div>

            {/* Driver Type and Vehicle Assignment */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="driverType">Driver Type</Label>
                <Select
                  value={formData.driverType}
                  onValueChange={(value) => setFormData({ ...formData, driverType: value })}
                >
                  <SelectTrigger id="driverType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Internal">Internal</SelectItem>
                    <SelectItem value="Subcontractor">Subcontractor</SelectItem>
                    <SelectItem value="Casual">Casual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignVehicle">Assign Vehicle (Optional)</Label>
                <Select
                  value={formData.assignVehicle}
                  onValueChange={(value) => setFormData({ ...formData, assignVehicle: value })}
                >
                  <SelectTrigger id="assignVehicle">
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FL-001">FL-001 - Volvo FH16 (2022)</SelectItem>
                    <SelectItem value="FL-002">FL-002 - Scania R500 (2021)</SelectItem>
                    <SelectItem value="FL-003">FL-003 - Mercedes Actros (2023)</SelectItem>
                    <SelectItem value="FL-004">FL-004 - DAF XF (2020)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* License Information Section */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground flex items-center">
              <div className="h-6 w-1 bg-primary mr-2" />
              License Information
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number *</Label>
                <Input
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  placeholder="LIC-12345"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="licenseClass">License Class *</Label>
                <Select
                  value={formData.licenseClass}
                  onValueChange={(value) => setFormData({ ...formData, licenseClass: value })}
                >
                  <SelectTrigger id="licenseClass">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HC">HC - Heavy Combination</SelectItem>
                    <SelectItem value="MC">MC - Multi Combination</SelectItem>
                    <SelectItem value="HR">HR - Heavy Rigid</SelectItem>
                    <SelectItem value="MR">MR - Medium Rigid</SelectItem>
                    <SelectItem value="LR">LR - Light Rigid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="licenseExpiry">License Expiry Date *</Label>
                <Input
                  id="licenseExpiry"
                  type="date"
                  value={formData.licenseExpiry}
                  onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="driversLicense">Upload License Document</Label>
                <Input
                  id="driversLicense"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload("driversLicense", e)}
                  className="hidden"
                />
                <Label htmlFor="driversLicense" className="cursor-pointer">
                  <div className="flex items-center gap-2 p-2 border border-border rounded-md hover:bg-accent">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {formData.driversLicense ? formData.driversLicense.name : "Choose file"}
                    </span>
                  </div>
                </Label>
              </div>
            </div>
          </div>

          {/* Compliance Documents Section */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground flex items-center">
              <div className="h-6 w-1 bg-primary mr-2" />
              Compliance Documents
            </h3>

            {/* Medical Certificate */}
            <div className="space-y-2">
              <Label>Medical Certificate</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    id="medical"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("medical", e)}
                    className="hidden"
                  />
                  <Label htmlFor="medical" className="cursor-pointer">
                    <div className="flex items-center gap-2 p-2 border border-border rounded-md hover:bg-accent">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {formData.medical ? formData.medical.name : "Upload medical"}
                      </span>
                    </div>
                  </Label>
                </div>
                <div className="space-y-2">
                  <Input
                    id="medicalExpiry"
                    type="date"
                    value={formData.medicalExpiry}
                    onChange={(e) => setFormData({ ...formData, medicalExpiry: e.target.value })}
                    placeholder="Expiry date"
                  />
                </div>
              </div>
            </div>

            {/* White Card */}
            <div className="space-y-2">
              <Label>White Card (Construction)</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    id="whiteCard"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("whiteCard", e)}
                    className="hidden"
                  />
                  <Label htmlFor="whiteCard" className="cursor-pointer">
                    <div className="flex items-center gap-2 p-2 border border-border rounded-md hover:bg-accent">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {formData.whiteCard ? formData.whiteCard.name : "Upload white card"}
                      </span>
                    </div>
                  </Label>
                </div>
                <div className="space-y-2">
                  <Input
                    id="whiteCardExpiry"
                    type="date"
                    value={formData.whiteCardExpiry}
                    onChange={(e) => setFormData({ ...formData, whiteCardExpiry: e.target.value })}
                    placeholder="Expiry date"
                  />
                </div>
              </div>
            </div>

            {/* Insurance */}
            <div className="space-y-2">
              <Label>Insurance Certificate</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    id="insurance"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("insurance", e)}
                    className="hidden"
                  />
                  <Label htmlFor="insurance" className="cursor-pointer">
                    <div className="flex items-center gap-2 p-2 border border-border rounded-md hover:bg-accent">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {formData.insurance ? formData.insurance.name : "Upload insurance"}
                      </span>
                    </div>
                  </Label>
                </div>
                <div className="space-y-2">
                  <Input
                    id="insuranceExpiry"
                    type="date"
                    value={formData.insuranceExpiry}
                    onChange={(e) => setFormData({ ...formData, insuranceExpiry: e.target.value })}
                    placeholder="Expiry date"
                  />
                </div>
              </div>
            </div>

            {/* Other Documents */}
            <div className="space-y-2">
              <Label htmlFor="otherDocuments">Other Documents (Optional)</Label>
              <div className="space-y-2">
                <Input
                  id="otherDocuments"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                  onChange={handleOtherDocumentsUpload}
                  className="hidden"
                />
                <Label htmlFor="otherDocuments" className="cursor-pointer">
                  <div className="flex items-center gap-2 p-2 border border-border rounded-md hover:bg-accent">
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Upload additional documents</span>
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

          {/* Pay Rates Section */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground flex items-center">
              <div className="h-6 w-1 bg-primary mr-2" />
              Pay Rates (per hour)
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hourlyRateWeekday">Hourly Rate (Weekday)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="hourlyRateWeekday"
                    type="number"
                    value={formData.hourlyRateWeekday}
                    onChange={(e) => setFormData({ ...formData, hourlyRateWeekday: e.target.value })}
                    placeholder="55"
                    className="pl-7"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hourlyRateWeekend">Hourly Rate (Weekend)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="hourlyRateWeekend"
                    type="number"
                    value={formData.hourlyRateWeekend}
                    onChange={(e) => setFormData({ ...formData, hourlyRateWeekend: e.target.value })}
                    placeholder="68"
                    className="pl-7"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nightRateWeekday">Night Rate (Weekday)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="nightRateWeekday"
                    type="number"
                    value={formData.nightRateWeekday}
                    onChange={(e) => setFormData({ ...formData, nightRateWeekday: e.target.value })}
                    placeholder="65"
                    className="pl-7"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nightRateWeekend">Night Rate (Weekend)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="nightRateWeekend"
                    type="number"
                    value={formData.nightRateWeekend}
                    onChange={(e) => setFormData({ ...formData, nightRateWeekend: e.target.value })}
                    placeholder="75"
                    className="pl-7"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Permissions Section */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground flex items-center">
              <div className="h-6 w-1 bg-primary mr-2" />
              Permissions & Access
            </h3>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="mobileAppAccess"
                checked={formData.mobileAppAccess}
                onCheckedChange={(checked) => setFormData({ ...formData, mobileAppAccess: checked as boolean })}
              />
              <Label htmlFor="mobileAppAccess" className="text-sm font-normal cursor-pointer">
                Mobile App Access
              </Label>
            </div>
            <p className="text-xs text-muted-foreground ml-6">
              Driver will receive login credentials via email to access the mobile application for job management,
              timesheets, and documents.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Driver</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
