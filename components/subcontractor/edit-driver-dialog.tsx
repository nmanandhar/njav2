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
import { Upload, FileText, X, RotateCcw } from "lucide-react"
import Image from "next/image"

interface Driver {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  photo?: string
  licenseStatus: "valid" | "expiring" | "expired"
  licenseExpiry: string
  insuranceStatus: "valid" | "expiring" | "expired"
  whiteCardStatus: "valid" | "expiring" | "expired"
  mobileAppAccess: boolean
  status: "active" | "inactive"
  assignedVehicle: string | null
  lastActive: string
}

interface EditDriverDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  driver: Driver | null
  onSave: (updatedDriver: Driver) => void
}

export function EditDriverDialog({ open, onOpenChange, driver, onSave }: EditDriverDialogProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    driversLicense: null as File | null,
    driversLicenseExpiry: "",
    insurance: null as File | null,
    insuranceExpiry: "",
    whiteCard: null as File | null,
    whiteCardExpiry: "",
    otherDocuments: [] as File[],
    mobileAppAccess: false,
  })

  // Populate form when driver changes
  useEffect(() => {
    if (driver) {
      setFormData({
        firstName: driver.firstName,
        lastName: driver.lastName,
        email: driver.email,
        phone: driver.phone,
        driversLicense: null,
        driversLicenseExpiry: driver.licenseExpiry,
        insurance: null,
        insuranceExpiry: "",
        whiteCard: null,
        whiteCardExpiry: "",
        otherDocuments: [],
        mobileAppAccess: driver.mobileAppAccess,
      })
      setPhotoPreview(driver.photo || null)
    }
  }, [driver])

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
    field: "driversLicense" | "insurance" | "whiteCard",
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
    console.log("[v0] Resetting mobile app access for driver:", driver?.id)
    // In a real app, this would call an API to reset the driver's mobile app credentials
    alert("Mobile app access credentials have been reset. The driver will receive new login details via email.")
  }

  const handleSubmit = () => {
    if (!driver) return

    const updatedDriver: Driver = {
      ...driver,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      photo: photoPreview || driver.photo,
      licenseExpiry: formData.driversLicenseExpiry,
      mobileAppAccess: formData.mobileAppAccess,
    }

    console.log("[v0] Driver data updated:", updatedDriver)
    onSave(updatedDriver)
    onOpenChange(false)
  }

  if (!driver) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Driver</DialogTitle>
          <DialogDescription>Update driver information and compliance documents.</DialogDescription>
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
            <h3 className="text-sm font-semibold text-foreground">Personal Details</h3>

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
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Smith"
                />
              </div>
            </div>

            {/* Contact Fields */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john.smith@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+61 4XX XXX XXX"
              />
            </div>
          </div>

          {/* Compliance Section */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground">Compliance</h3>

            {/* Driver's License */}
            <div className="space-y-2">
              <Label htmlFor="driversLicense">Driver&apos;s License</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="driversLicense"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload("driversLicense", e)}
                  className="hidden"
                />
                <Label htmlFor="driversLicense" className="cursor-pointer flex-1">
                  <div className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-accent">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {formData.driversLicense ? formData.driversLicense.name : "Upload driver's license"}
                    </span>
                  </div>
                </Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="driversLicenseExpiry">Expiry Date</Label>
                <Input
                  id="driversLicenseExpiry"
                  type="date"
                  value={formData.driversLicenseExpiry}
                  onChange={(e) => setFormData({ ...formData, driversLicenseExpiry: e.target.value })}
                />
              </div>
            </div>

            {/* Insurance */}
            <div className="space-y-2">
              <Label htmlFor="insurance">Insurance</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="insurance"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload("insurance", e)}
                  className="hidden"
                />
                <Label htmlFor="insurance" className="cursor-pointer flex-1">
                  <div className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-accent">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {formData.insurance ? formData.insurance.name : "Upload insurance document"}
                    </span>
                  </div>
                </Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="insuranceExpiry">Expiry Date</Label>
                <Input
                  id="insuranceExpiry"
                  type="date"
                  value={formData.insuranceExpiry}
                  onChange={(e) => setFormData({ ...formData, insuranceExpiry: e.target.value })}
                />
              </div>
            </div>

            {/* White Card */}
            <div className="space-y-2">
              <Label htmlFor="whiteCard">White Card</Label>
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
                      {formData.whiteCard ? formData.whiteCard.name : "Upload white card"}
                    </span>
                  </div>
                </Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="whiteCardExpiry">Expiry Date</Label>
                <Input
                  id="whiteCardExpiry"
                  type="date"
                  value={formData.whiteCardExpiry}
                  onChange={(e) => setFormData({ ...formData, whiteCardExpiry: e.target.value })}
                />
              </div>
            </div>

            {/* Other Documents */}
            <div className="space-y-2">
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

          {/* Permissions Section */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground">Permissions</h3>

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
              Driver will receive login credentials to access the mobile application
            </p>
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
