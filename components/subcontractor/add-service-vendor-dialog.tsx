"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, X, Upload } from "lucide-react"
import { Card } from "@/components/ui/card"

type Location = {
  address: string
  id: string
}

interface AddServiceVendorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddServiceVendorDialog({ open, onOpenChange }: AddServiceVendorDialogProps) {
  const [locations, setLocations] = useState<Location[]>([{ address: "", id: "1" }])
  const [complianceDocuments, setComplianceDocuments] = useState<File[]>([])

  const addLocation = () => {
    setLocations([...locations, { address: "", id: Date.now().toString() }])
  }

  const removeLocation = (id: string) => {
    if (locations.length > 1) {
      setLocations(locations.filter((loc) => loc.id !== id))
    }
  }

  const updateLocation = (id: string, address: string) => {
    setLocations(locations.map((loc) => (loc.id === id ? { ...loc, address } : loc)))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setComplianceDocuments([...complianceDocuments, ...Array.from(e.target.files)])
    }
  }

  const removeDocument = (index: number) => {
    setComplianceDocuments(complianceDocuments.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Service vendor added")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Service Vendor</DialogTitle>
          <DialogDescription>Add a new service vendor to your fleet maintenance network</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Information */}
          <Card className="p-4 space-y-4">
            <h3 className="font-semibold text-sm">Company Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName">
                  Company Name <span className="text-destructive">*</span>
                </Label>
                <Input id="companyName" placeholder="Enter company name" required />
              </div>

              <div>
                <Label htmlFor="phone">
                  Phone <span className="text-destructive">*</span>
                </Label>
                <Input id="phone" type="tel" placeholder="+61 2 9876 5432" required />
              </div>

              <div>
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input id="email" type="email" placeholder="company@example.com.au" required />
              </div>
            </div>
          </Card>

          {/* Locations */}
          <Card className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">Service Locations</h3>
              <Button type="button" variant="outline" size="sm" onClick={addLocation}>
                <Plus className="h-3 w-3 mr-1" />
                Add Location
              </Button>
            </div>
            <div className="space-y-3">
              {locations.map((location, index) => (
                <div key={location.id} className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor={`location-${location.id}`}>
                      Address {index + 1} {index === 0 && <span className="text-destructive">*</span>}
                    </Label>
                    <Input
                      id={`location-${location.id}`}
                      value={location.address}
                      onChange={(e) => updateLocation(location.id, e.target.value)}
                      placeholder="Enter full address"
                      required={index === 0}
                    />
                  </div>
                  {locations.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="mt-7"
                      onClick={() => removeLocation(location.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Contact Person */}
          <Card className="p-4 space-y-4">
            <h3 className="font-semibold text-sm">Contact Person</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="contactName">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input id="contactName" placeholder="Enter contact person name" required />
              </div>

              <div>
                <Label htmlFor="contactPhone">
                  Phone <span className="text-destructive">*</span>
                </Label>
                <Input id="contactPhone" type="tel" placeholder="+61 412 345 678" required />
              </div>

              <div>
                <Label htmlFor="contactEmail">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input id="contactEmail" type="email" placeholder="contact@example.com.au" required />
              </div>
            </div>
          </Card>

          {/* Compliance Documents */}
          <Card className="p-4 space-y-4">
            <h3 className="font-semibold text-sm">Compliance Documents</h3>
            <div>
              <Label htmlFor="documents">Upload Documents</Label>
              <div className="mt-2">
                <label
                  htmlFor="documents"
                  className="flex items-center justify-center w-full h-32 px-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
                >
                  <div className="text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                      <br />
                      PDF, DOC, DOCX (max 10MB each)
                    </p>
                  </div>
                  <input
                    id="documents"
                    type="file"
                    className="hidden"
                    multiple
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {complianceDocuments.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">Uploaded Documents:</p>
                  {complianceDocuments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <span className="text-sm truncate flex-1">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeDocument(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#0F6E80] hover:bg-[#0F6E80]/90">
              Add Service Vendor
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
