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

interface AddOperatorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddOperatorDialog({ open, onOpenChange }: AddOperatorDialogProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    licenseClass: "RII",
    licenseExpiry: "",
    licenseDocument: null as File | null,
    medical: null as File | null,
    medicalExpiry: "",
    whiteCard: null as File | null,
    whiteCardExpiry: "",
    njaInduction: null as File | null,
    njaExpiry: "",
    fatigueManagement: null as File | null,
    fatigueExpiry: "",
    otherDocuments: [] as File[],
    mobileAppAccess: true,
    hourlyRateWeekday: "",
    hourlyRateWeekend: "",
    nightRateWeekday: "",
    nightRateWeekend: "",
    operatorType: "Internal",
    assignMachinery: "",
    vocScore: "",
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
    field: "licenseDocument" | "medical" | "whiteCard" | "njaInduction" | "fatigueManagement",
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
    console.log("[v0] Operator data submitted:", formData)
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      licenseNumber: "",
      licenseClass: "RII",
      licenseExpiry: "",
      licenseDocument: null,
      medical: null,
      medicalExpiry: "",
      whiteCard: null,
      whiteCardExpiry: "",
      njaInduction: null,
      njaExpiry: "",
      fatigueManagement: null,
      fatigueExpiry: "",
      otherDocuments: [],
      mobileAppAccess: true,
      hourlyRateWeekday: "",
      hourlyRateWeekend: "",
      nightRateWeekday: "",
      nightRateWeekend: "",
      operatorType: "Internal",
      assignMachinery: "",
      vocScore: "",
    })
    setPhotoPreview(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[95vw] w-full sm:!max-w-[95vw] md:!max-w-[1800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Operator</DialogTitle>
          <DialogDescription>
            Enter operator information, upload required compliance documents, and configure pay rates.
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
                    <Image
                      src={photoPreview || "/placeholder.svg"}
                      alt="Operator photo"
                      fill
                      className="object-cover"
                    />
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
                  placeholder="Robert"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Thompson"
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
                  placeholder="robert.thompson@example.com"
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

            {/* Operator Type and Machinery Assignment */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="operatorType">Operator Type</Label>
                <Select
                  value={formData.operatorType}
                  onValueChange={(value) => setFormData({ ...formData, operatorType: value })}
                >
                  <SelectTrigger id="operatorType">
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
                <Label htmlFor="assignMachinery">Assign Machinery (Optional)</Label>
                <Select
                  value={formData.assignMachinery}
                  onValueChange={(value) => setFormData({ ...formData, assignMachinery: value })}
                >
                  <SelectTrigger id="assignMachinery">
                    <SelectValue placeholder="Select machinery" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EXC-001">EXC-001 - Caterpillar 320 (2022)</SelectItem>
                    <SelectItem value="EXC-002">EXC-002 - Komatsu PC200 (2021)</SelectItem>
                    <SelectItem value="EXC-003">EXC-003 - Volvo EC380 (2023)</SelectItem>
                    <SelectItem value="BLD-001">BLD-001 - CAT D6T (2022)</SelectItem>
                    <SelectItem value="BLD-002">BLD-002 - Komatsu D65 (2020)</SelectItem>
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

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number *</Label>
                <Input
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  placeholder="LIC-87654"
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
                    <SelectItem value="RII">RII - Resources & Infrastructure</SelectItem>
                    <SelectItem value="RIIHAN">RIIHAN - High Risk Work License</SelectItem>
                    <SelectItem value="EWP">EWP - Elevated Work Platform</SelectItem>
                    <SelectItem value="Forklift">Forklift License</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vocScore">VOC Score (Optional)</Label>
                <Input
                  id="vocScore"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.vocScore}
                  onChange={(e) => setFormData({ ...formData, vocScore: e.target.value })}
                  placeholder="92"
                />
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
                <Label htmlFor="licenseDocument">Upload License Document</Label>
                <Input
                  id="licenseDocument"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload("licenseDocument", e)}
                  className="hidden"
                />
                <Label htmlFor="licenseDocument" className="cursor-pointer">
                  <div className="flex items-center gap-2 p-2 border border-border rounded-md hover:bg-accent">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {formData.licenseDocument ? formData.licenseDocument.name : "Choose file"}
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

            {/* NJA Induction */}
            <div className="space-y-2">
              <Label>NJA Induction Certificate</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    id="njaInduction"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("njaInduction", e)}
                    className="hidden"
                  />
                  <Label htmlFor="njaInduction" className="cursor-pointer">
                    <div className="flex items-center gap-2 p-2 border border-border rounded-md hover:bg-accent">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {formData.njaInduction ? formData.njaInduction.name : "Upload NJA induction"}
                      </span>
                    </div>
                  </Label>
                </div>
                <div className="space-y-2">
                  <Input
                    id="njaExpiry"
                    type="date"
                    value={formData.njaExpiry}
                    onChange={(e) => setFormData({ ...formData, njaExpiry: e.target.value })}
                    placeholder="Expiry date"
                  />
                </div>
              </div>
            </div>

            {/* Fatigue Management */}
            <div className="space-y-2">
              <Label>Fatigue Management Certificate</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    id="fatigueManagement"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("fatigueManagement", e)}
                    className="hidden"
                  />
                  <Label htmlFor="fatigueManagement" className="cursor-pointer">
                    <div className="flex items-center gap-2 p-2 border border-border rounded-md hover:bg-accent">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {formData.fatigueManagement ? formData.fatigueManagement.name : "Upload fatigue certificate"}
                      </span>
                    </div>
                  </Label>
                </div>
                <div className="space-y-2">
                  <Input
                    id="fatigueExpiry"
                    type="date"
                    value={formData.fatigueExpiry}
                    onChange={(e) => setFormData({ ...formData, fatigueExpiry: e.target.value })}
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
                    placeholder="65"
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
                    placeholder="78"
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
                    placeholder="75"
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
                    placeholder="85"
                    className="pl-7"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile App Access */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mobileAppAccess"
                checked={formData.mobileAppAccess}
                onCheckedChange={(checked) => setFormData({ ...formData, mobileAppAccess: checked as boolean })}
              />
              <Label htmlFor="mobileAppAccess" className="text-sm font-normal">
                Grant mobile app access
              </Label>
            </div>
            <p className="text-xs text-muted-foreground mt-1 ml-6">
              Operator will receive login credentials to access the mobile app
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Operator</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
