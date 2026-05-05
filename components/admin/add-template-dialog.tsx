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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Upload, X } from "lucide-react"

interface AddTemplateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddTemplateDialog({ open, onOpenChange }: AddTemplateDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    serviceCategory: "",
    vehicleType: "",
    pdfFile: null as File | null,
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setFormData({ ...formData, pdfFile: file })
    } else {
      alert("Please upload a PDF file")
    }
  }

  const removeFile = () => {
    setFormData({ ...formData, pdfFile: null })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Add template form submitted:", formData)
    // Reset form and close dialog
    setFormData({
      name: "",
      description: "",
      serviceCategory: "",
      vehicleType: "",
      pdfFile: null,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Work Order Template</DialogTitle>
          <DialogDescription>
            Upload a PDF template and configure its details for use in maintenance scheduling.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            {/* PDF Upload Section */}
            <div className="space-y-2">
              <Label htmlFor="pdfFile">
                Template Document <span className="text-destructive">*</span>
              </Label>
              <div className="space-y-2">
                <Input id="pdfFile" type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" required />
                {!formData.pdfFile ? (
                  <Label htmlFor="pdfFile" className="cursor-pointer">
                    <div className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-border rounded-lg hover:bg-accent transition-colors">
                      <Upload className="h-5 w-5 text-muted-foreground" />
                      <div className="text-center">
                        <p className="text-sm font-medium text-foreground">Upload PDF Template</p>
                        <p className="text-xs text-muted-foreground">Click to browse or drag and drop</p>
                      </div>
                    </div>
                  </Label>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="text-sm font-medium">{formData.pdfFile.name}</p>
                        <p className="text-xs text-muted-foreground">{(formData.pdfFile.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={removeFile}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Template Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Template Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="e.g., Standard Vehicle Service"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Provide a detailed description of this template and when it should be used..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
              />
            </div>

            {/* Service Category & Vehicle Type */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serviceCategory">
                  Service Category <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.serviceCategory}
                  onValueChange={(value) => setFormData({ ...formData, serviceCategory: value })}
                  required
                >
                  <SelectTrigger id="serviceCategory">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minor-service">Minor Service (A)</SelectItem>
                    <SelectItem value="major-service">Major Service (B)</SelectItem>
                    <SelectItem value="engine-oil">Engine Oil & Filters</SelectItem>
                    <SelectItem value="brake-inspection">Brake Inspection</SelectItem>
                    <SelectItem value="compliance">Compliance Roadworthy</SelectItem>
                    <SelectItem value="transmission">Transmission Service</SelectItem>
                    <SelectItem value="coolant">Coolant System Service</SelectItem>
                    <SelectItem value="electrical">Electrical Diagnostics</SelectItem>
                    <SelectItem value="ac-service">A/C Service</SelectItem>
                    <SelectItem value="wheel-alignment">Wheel Alignment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicleType">
                  Vehicle Type <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.vehicleType}
                  onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}
                  required
                >
                  <SelectTrigger id="vehicleType">
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Vehicle Types</SelectItem>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="truck">Truck</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
                    <SelectItem value="heavy-vehicle">Heavy Vehicle</SelectItem>
                    <SelectItem value="bus">Bus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Add Template
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
