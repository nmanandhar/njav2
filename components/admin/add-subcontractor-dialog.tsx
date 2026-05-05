"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Upload, X } from "lucide-react"

interface AddSubcontractorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddSubcontractorDialog({ open, onOpenChange }: AddSubcontractorDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    companyEmail: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    abn: "",
    status: "Pending",
    hourlyRate: "",
    travelHours: "",
    perTonneRate: "",
    loadRate: "",
    insuranceDocument: null as File | null,
    abnDocument: null as File | null,
    contractDocument: null as File | null,
    otherDocuments: [] as File[],
  })

  const handleFileUpload = (
    field: "insuranceDocument" | "abnDocument" | "contractDocument",
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0] || null
    setFormData({ ...formData, [field]: file })
  }

  const handleOtherDocumentsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData({ ...formData, otherDocuments: [...formData.otherDocuments, ...files] })
  }

  const removeOtherDocument = (index: number) => {
    const updated = formData.otherDocuments.filter((_, i) => i !== index)
    setFormData({ ...formData, otherDocuments: updated })
  }

  const handleSubmit = () => {
    console.log("[v0] Adding new subcontractor:", formData)
    // Reset form
    setFormData({
      name: "",
      companyEmail: "",
      contactName: "",
      email: "",
      phone: "",
      address: "",
      abn: "",
      status: "Pending",
      hourlyRate: "",
      travelHours: "",
      perTonneRate: "",
      loadRate: "",
      insuranceDocument: null,
      abnDocument: null,
      contractDocument: null,
      otherDocuments: [],
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[95vw] w-full sm:!max-w-[95vw] md:!max-w-[1400px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Subcontractor</DialogTitle>
          <DialogDescription>
            Enter subcontractor business information, contact details, compliance documents, and rate structure.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Business Details Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center">
              <div className="h-6 w-1 bg-primary mr-2" />
              Business Details
            </h3>

            <div className="space-y-2">
              <Label htmlFor="name">Business/Company Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Regional Transport Services"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="abn">ABN *</Label>
                <Input
                  id="abn"
                  value={formData.abn}
                  onChange={(e) => setFormData({ ...formData, abn: e.target.value })}
                  placeholder="XX XXX XXX XXX"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Business Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="45 Industrial Dr, Penrith NSW 2750"
                rows={2}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyEmail">Company Email</Label>
              <Input
                id="companyEmail"
                type="email"
                value={formData.companyEmail}
                onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })}
                placeholder="info@company.com.au"
              />
            </div>
          </div>

          {/* Primary Contact Section */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground flex items-center">
              <div className="h-6 w-1 bg-primary mr-2" />
              Primary Contact
            </h3>

            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Person Name *</Label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                placeholder="e.g., Michael Roberts"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@company.com.au"
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
                  placeholder="+61 X XXXX XXXX"
                  required
                />
              </div>
            </div>
          </div>

          {/* Rate Structure Section */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground flex items-center">
              <div className="h-6 w-1 bg-primary mr-2" />
              Rate Structure
            </h3>
            <p className="text-sm text-muted-foreground">
              Configure pricing rates for different service types. Leave blank if not applicable.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly Rate</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                    placeholder="115"
                    className="pl-7"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Per hour rate</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="travelHours">Travel Hours Rate</Label>
                <Input
                  id="travelHours"
                  type="number"
                  value={formData.travelHours}
                  onChange={(e) => setFormData({ ...formData, travelHours: e.target.value })}
                  placeholder="1.5"
                  step="0.5"
                />
                <p className="text-xs text-muted-foreground">Hours for travel time</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="perTonneRate">Per Tonne Rate</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="perTonneRate"
                    type="number"
                    value={formData.perTonneRate}
                    onChange={(e) => setFormData({ ...formData, perTonneRate: e.target.value })}
                    placeholder="42"
                    className="pl-7"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Rate per tonne</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="loadRate">Load Rate</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="loadRate"
                    type="number"
                    value={formData.loadRate}
                    onChange={(e) => setFormData({ ...formData, loadRate: e.target.value })}
                    placeholder="780"
                    className="pl-7"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Flat rate per load</p>
              </div>
            </div>
          </div>

          {/* Compliance Documents Section */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground flex items-center">
              <div className="h-6 w-1 bg-primary mr-2" />
              Compliance Documents
            </h3>

            {/* Insurance Certificate */}
            <div className="space-y-2">
              <Label>Insurance Certificate</Label>
              <Input
                id="insuranceDocument"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload("insuranceDocument", e)}
                className="hidden"
              />
              <Label htmlFor="insuranceDocument" className="cursor-pointer">
                <div className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-accent transition-colors">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formData.insuranceDocument ? formData.insuranceDocument.name : "Upload insurance certificate"}
                  </span>
                  {!formData.insuranceDocument && <Upload className="h-4 w-4 ml-auto text-muted-foreground" />}
                </div>
              </Label>
              {formData.insuranceDocument && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFormData({ ...formData, insuranceDocument: null })}
                  className="w-full"
                >
                  <X className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              )}
            </div>

            {/* ABN Document */}
            <div className="space-y-2">
              <Label>ABN Registration Document</Label>
              <Input
                id="abnDocument"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload("abnDocument", e)}
                className="hidden"
              />
              <Label htmlFor="abnDocument" className="cursor-pointer">
                <div className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-accent transition-colors">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formData.abnDocument ? formData.abnDocument.name : "Upload ABN document"}
                  </span>
                  {!formData.abnDocument && <Upload className="h-4 w-4 ml-auto text-muted-foreground" />}
                </div>
              </Label>
              {formData.abnDocument && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFormData({ ...formData, abnDocument: null })}
                  className="w-full"
                >
                  <X className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              )}
            </div>

            {/* Contract Document */}
            <div className="space-y-2">
              <Label>Subcontractor Agreement/Contract</Label>
              <Input
                id="contractDocument"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload("contractDocument", e)}
                className="hidden"
              />
              <Label htmlFor="contractDocument" className="cursor-pointer">
                <div className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-accent transition-colors">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formData.contractDocument ? formData.contractDocument.name : "Upload contract document"}
                  </span>
                  {!formData.contractDocument && <Upload className="h-4 w-4 ml-auto text-muted-foreground" />}
                </div>
              </Label>
              {formData.contractDocument && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFormData({ ...formData, contractDocument: null })}
                  className="w-full"
                >
                  <X className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              )}
            </div>

            {/* Other Documents */}
            <div className="space-y-2">
              <Label htmlFor="otherDocuments">Additional Documents (Optional)</Label>
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
                  <div className="flex items-center gap-2 p-3 border border-border rounded-md hover:bg-accent transition-colors">
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
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Subcontractor</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
