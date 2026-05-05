"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, X, RotateCcw, Calendar } from "lucide-react"

interface EditOperatorDialogProps {
  operator: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditOperatorDialog({ operator, open, onOpenChange }: EditOperatorDialogProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    licenseClass: "",
    licenseExpiry: "",
    operatorLicense: null as File | null,
    medical: null as File | null,
    medicalExpiry: "",
    whiteCard: null as File | null,
    whiteCardExpiry: "",
    njaInduction: null as File | null,
    njaInductionExpiry: "",
    fatigueManagement: null as File | null,
    fatigueExpiry: "",
    vocScore: "",
    otherDocuments: [] as File[],
    mobileAppAccess: true,
    hourlyRateWeekday: "",
    hourlyRateWeekend: "",
    nightRateWeekday: "",
    nightRateWeekend: "",
    operatorType: "Internal",
    assignMachinery: "",
  })

  // Populate form when operator changes
  useEffect(() => {
    if (operator) {
      const [firstName, ...lastNameParts] = operator.name.split(" ")
      const lastName = lastNameParts.join(" ")

      setFormData({
        firstName: firstName,
        lastName: lastName,
        email: operator.email,
        phone: operator.phone,
        licenseNumber: operator.licenseNumber,
        licenseClass: operator.licenseClass,
        licenseExpiry: operator.licenseExpiry,
        operatorLicense: null,
        medical: null,
        medicalExpiry: operator.medicalExpiry || "",
        whiteCard: null,
        whiteCardExpiry: operator.whiteCard || "",
        njaInduction: null,
        njaInductionExpiry: "",
        fatigueManagement: null,
        fatigueExpiry: "",
        vocScore: operator.vocScore?.toString() || "",
        otherDocuments: [],
        mobileAppAccess: true,
        hourlyRateWeekday: operator.hourlyRate?.weekday?.toString() || "",
        hourlyRateWeekend: operator.hourlyRate?.weekend?.toString() || "",
        nightRateWeekday: operator.nightRate?.weekday?.toString() || "",
        nightRateWeekend: operator.nightRate?.weekend?.toString() || "",
        operatorType: operator.type || "Internal",
        assignMachinery: operator.machinery || "",
      })
      setPhotoPreview(null)
    }
  }, [operator])

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
    field: "operatorLicense" | "medical" | "whiteCard" | "njaInduction" | "fatigueManagement",
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

  const handleResetMobileAppAccess = () => {
    alert("Password reset email will be sent to " + operator.email)
  }

  const handleSubmit = () => {
    console.log("Saving operator:", formData)
    alert("Operator updated successfully!")
    onOpenChange(false)
  }

  if (!operator) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[95vw] w-full sm:!max-w-[95vw] md:!max-w-[1800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Operator</DialogTitle>
          <DialogDescription>Update operator information, compliance documents, and pay rates.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Reset Mobile App Access Button */}
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={handleResetMobileAppAccess} className="text-muted-foreground">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Mobile App Access
            </Button>
          </div>

          {/* Personal Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <div className="h-8 w-1 bg-primary mr-3" />
              Personal Details
            </h3>

            {/* Photo Upload */}
            <div className="space-y-2 pl-4">
              <Label>Upload Photo</Label>
              <div className="flex items-center gap-4">
                {photoPreview ? (
                  <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-border">
                    <img
                      src={photoPreview || "/placeholder.svg"}
                      alt="Operator photo"
                      className="object-cover w-full h-full"
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
            <div className="grid grid-cols-2 gap-4 pl-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="James"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Wilson"
                  required
                />
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-2 gap-4 pl-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="james.wilson@example.com"
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
            <div className="grid grid-cols-2 gap-4 pl-4">
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
                    <SelectItem value="EX-001 (Excavator)">EX-001 - Excavator (Caterpillar 320)</SelectItem>
                    <SelectItem value="BL-001 (Bulldozer)">BL-001 - Bulldozer (Caterpillar D6)</SelectItem>
                    <SelectItem value="LD-001 (Loader)">LD-001 - Loader (Volvo L120)</SelectItem>
                    <SelectItem value="GR-001 (Grader)">GR-001 - Grader (Caterpillar 140M)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* License Information Section */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-semibold flex items-center">
              <div className="h-8 w-1 bg-primary mr-3" />
              License Information
            </h3>

            <div className="grid grid-cols-3 gap-4 pl-4">
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number *</Label>
                <Input
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  placeholder="RII-12345"
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
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RII">RII - Resources & Infrastructure</SelectItem>
                    <SelectItem value="RIIHAN">RIIHAN - High Risk Work</SelectItem>
                    <SelectItem value="CPCCDO">CPCCDO - Dogging</SelectItem>
                    <SelectItem value="CPCCLRG">CPCCLRG - Rigging</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vocScore">VOC Score (%)</Label>
                <Input
                  id="vocScore"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.vocScore}
                  onChange={(e) => setFormData({ ...formData, vocScore: e.target.value })}
                  placeholder="95"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pl-4">
              <div className="space-y-2">
                <Label htmlFor="licenseExpiry">License Expiry Date *</Label>
                <div className="relative">
                  <Input
                    id="licenseExpiry"
                    type="date"
                    value={formData.licenseExpiry}
                    onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })}
                    required
                  />
                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="operatorLicense">Upload License Document</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="operatorLicense"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("operatorLicense", e)}
                    className="hidden"
                  />
                  <Label htmlFor="operatorLicense" className="cursor-pointer flex-1">
                    <div className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-accent">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {formData.operatorLicense ? formData.operatorLicense.name : "Choose file"}
                      </span>
                    </div>
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Documents Section */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-semibold flex items-center">
              <div className="h-8 w-1 bg-primary mr-3" />
              Compliance Documents
            </h3>

            {/* Medical */}
            <div className="grid grid-cols-2 gap-4 pl-4">
              <div className="space-y-2">
                <Label htmlFor="medicalExpiry">Medical Certificate Expiry</Label>
                <div className="relative">
                  <Input
                    id="medicalExpiry"
                    type="date"
                    value={formData.medicalExpiry}
                    onChange={(e) => setFormData({ ...formData, medicalExpiry: e.target.value })}
                  />
                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="medical">Upload Medical Certificate</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="medical"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("medical", e)}
                    className="hidden"
                  />
                  <Label htmlFor="medical" className="cursor-pointer flex-1">
                    <div className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-accent">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {formData.medical ? formData.medical.name : "Choose file"}
                      </span>
                    </div>
                  </Label>
                </div>
              </div>
            </div>

            {/* White Card */}
            <div className="grid grid-cols-2 gap-4 pl-4">
              <div className="space-y-2">
                <Label htmlFor="whiteCardExpiry">White Card Expiry</Label>
                <div className="relative">
                  <Input
                    id="whiteCardExpiry"
                    type="date"
                    value={formData.whiteCardExpiry}
                    onChange={(e) => setFormData({ ...formData, whiteCardExpiry: e.target.value })}
                  />
                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="whiteCard">Upload White Card</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="whiteCard"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("whiteCard", e)}
                    className="hidden"
                  />
                  <Label htmlFor="whiteCard" className="cursor-pointer flex-1">
                    <div className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-accent">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {formData.whiteCard ? formData.whiteCard.name : "Choose file"}
                      </span>
                    </div>
                  </Label>
                </div>
              </div>
            </div>

            {/* NJA Induction */}
            <div className="grid grid-cols-2 gap-4 pl-4">
              <div className="space-y-2">
                <Label htmlFor="njaInductionExpiry">NJA Induction Expiry</Label>
                <div className="relative">
                  <Input
                    id="njaInductionExpiry"
                    type="date"
                    value={formData.njaInductionExpiry}
                    onChange={(e) => setFormData({ ...formData, njaInductionExpiry: e.target.value })}
                  />
                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="njaInduction">Upload NJA Induction</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="njaInduction"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("njaInduction", e)}
                    className="hidden"
                  />
                  <Label htmlFor="njaInduction" className="cursor-pointer flex-1">
                    <div className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-accent">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {formData.njaInduction ? formData.njaInduction.name : "Choose file"}
                      </span>
                    </div>
                  </Label>
                </div>
              </div>
            </div>

            {/* Fatigue Management */}
            <div className="grid grid-cols-2 gap-4 pl-4">
              <div className="space-y-2">
                <Label htmlFor="fatigueExpiry">Fatigue Management Expiry</Label>
                <div className="relative">
                  <Input
                    id="fatigueExpiry"
                    type="date"
                    value={formData.fatigueExpiry}
                    onChange={(e) => setFormData({ ...formData, fatigueExpiry: e.target.value })}
                  />
                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatigueManagement">Upload Fatigue Management Certificate</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="fatigueManagement"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("fatigueManagement", e)}
                    className="hidden"
                  />
                  <Label htmlFor="fatigueManagement" className="cursor-pointer flex-1">
                    <div className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-accent">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {formData.fatigueManagement ? formData.fatigueManagement.name : "Choose file"}
                      </span>
                    </div>
                  </Label>
                </div>
              </div>
            </div>

            {/* Other Documents */}
            <div className="space-y-2 pl-4">
              <Label htmlFor="otherDocuments">Other Documents</Label>
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
                  <div className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-accent">
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
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-semibold flex items-center">
              <div className="h-8 w-1 bg-primary mr-3" />
              Pay Rates
            </h3>

            <div className="grid grid-cols-2 gap-6 pl-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hourlyRateWeekday">Hourly Rate - Weekday (WD)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                    <Input
                      id="hourlyRateWeekday"
                      type="number"
                      value={formData.hourlyRateWeekday}
                      onChange={(e) => setFormData({ ...formData, hourlyRateWeekday: e.target.value })}
                      placeholder="60"
                      className="pl-7"
                    />
                    <span className="absolute right-3 top-3 text-muted-foreground">/hr</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hourlyRateWeekend">Hourly Rate - Weekend (WE)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                    <Input
                      id="hourlyRateWeekend"
                      type="number"
                      value={formData.hourlyRateWeekend}
                      onChange={(e) => setFormData({ ...formData, hourlyRateWeekend: e.target.value })}
                      placeholder="90"
                      className="pl-7"
                    />
                    <span className="absolute right-3 top-3 text-muted-foreground">/hr</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nightRateWeekday">Night Rate - Weekday (WD)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                    <Input
                      id="nightRateWeekday"
                      type="number"
                      value={formData.nightRateWeekday}
                      onChange={(e) => setFormData({ ...formData, nightRateWeekday: e.target.value })}
                      placeholder="70"
                      className="pl-7"
                    />
                    <span className="absolute right-3 top-3 text-muted-foreground">/hr</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nightRateWeekend">Night Rate - Weekend (WE)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                    <Input
                      id="nightRateWeekend"
                      type="number"
                      value={formData.nightRateWeekend}
                      onChange={(e) => setFormData({ ...formData, nightRateWeekend: e.target.value })}
                      placeholder="105"
                      className="pl-7"
                    />
                    <span className="absolute right-3 top-3 text-muted-foreground">/hr</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile App Access */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-semibold flex items-center">
              <div className="h-8 w-1 bg-primary mr-3" />
              Mobile App Access
            </h3>
            <div className="flex items-center space-x-2 pl-4">
              <Checkbox
                id="mobileAppAccess"
                checked={formData.mobileAppAccess}
                onCheckedChange={(checked) => setFormData({ ...formData, mobileAppAccess: checked as boolean })}
              />
              <Label htmlFor="mobileAppAccess" className="cursor-pointer">
                Grant operator access to mobile app
              </Label>
            </div>
            <p className="text-sm text-muted-foreground pl-4">This will send login credentials to {formData.email}</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
