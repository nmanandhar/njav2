"use client"

import type React from "react"
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
import { Upload, X, Video, Plus, Truck } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { AddVehicleTypeDialog } from "./add-vehicle-type-dialog"

interface AddSubcontractorVehicleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock subcontractors for the dropdown
const mockSubcontractors = [
  { id: "1", name: "Regional Transport Services", abn: "87 654 321 098" },
  { id: "2", name: "Coastal Haulage", abn: "12 345 678 901" },
  { id: "3", name: "Alliance Logistics", abn: "98 765 432 109" },
  { id: "4", name: "Express Transport", abn: "45 678 901 234" },
]

const defaultVehicleTypes = [
  { value: "bogie", label: "Bogie" },
  { value: "8-wheeler", label: "8 Wheeler" },
  { value: "10-wheeler", label: "10 Wheeler" },
  { value: "tri-axle", label: "Tri-axle / Superdog" },
  { value: "quad", label: "Quad" },
  { value: "quin", label: "Quin" },
  { value: "walking-floor", label: "Walking Floor" },
  { value: "a-double", label: "A-Double" },
  { value: "b-double", label: "B-Double" },
  { value: "semi", label: "Semi" },
  { value: "side-tipper", label: "Side Tipper" },
  { value: "prime-mover", label: "Prime Mover" },
]

export function AddSubcontractorVehicleDialog({ open, onOpenChange }: AddSubcontractorVehicleDialogProps) {
  const [mediaFiles, setMediaFiles] = useState<File[]>([])
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([])
  const [subcontractorSearch, setSubcontractorSearch] = useState("")
  const [vehicleTypes, setVehicleTypes] = useState(defaultVehicleTypes)
  const [isAddVehicleTypeOpen, setIsAddVehicleTypeOpen] = useState(false)
  const [formData, setFormData] = useState({
    registrationNumber: "",
    year: "",
    make: "",
    model: "",
    vehicleType: "",
    configuration: "",
    subcontractorId: "",
    status: "",
    currentMileage: "",
    lastServiceDate: "",
    lastServiceMileage: "",
    addTrailer: false,
    trailerRegistration: "",
  })

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setMediaFiles([...mediaFiles, ...files])

    // Create previews for images and videos
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setMediaPreviews((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeMedia = (index: number) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index))
    setMediaPreviews(mediaPreviews.filter((_, i) => i !== index))
  }

  const filteredSubcontractors = mockSubcontractors.filter((sub) =>
    sub.name.toLowerCase().includes(subcontractorSearch.toLowerCase()),
  )

  const handleAddVehicleType = (newType: { value: string; label: string; description: string }) => {
    setVehicleTypes([...vehicleTypes, { value: newType.value, label: newType.label }])
    setFormData({ ...formData, vehicleType: newType.value })
    console.log("[v0] New vehicle type added:", newType)
  }

  const handleSubmit = () => {
    console.log("[v0] Subcontractor vehicle data submitted:", formData, "Media files:", mediaFiles)
    // Reset form
    setFormData({
      registrationNumber: "",
      year: "",
      make: "",
      model: "",
      vehicleType: "",
      configuration: "",
      subcontractorId: "",
      status: "",
      currentMileage: "",
      lastServiceDate: "",
      lastServiceMileage: "",
      addTrailer: false,
      trailerRegistration: "",
    })
    setMediaFiles([])
    setMediaPreviews([])
    setSubcontractorSearch("")
    onOpenChange(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Vehicle</DialogTitle>
            <DialogDescription>
              Enter vehicle information and upload photos or videos for your fleet records.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Vehicle Details Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Vehicle Details</h3>

              {/* Registration Number */}
              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <Input
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                  placeholder="ABC-123"
                />
              </div>

              {/* Year, Make, and Model */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2022"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="make">Make</Label>
                  <Input
                    id="make"
                    value={formData.make}
                    onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                    placeholder="Volvo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="FH16"
                  />
                </div>
              </div>

              {/* Vehicle Type */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="vehicleType">Vehicle Type</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAddVehicleTypeOpen(true)}
                    className="h-7 text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add New
                  </Button>
                </div>
                <Select
                  value={formData.vehicleType}
                  onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}
                >
                  <SelectTrigger id="vehicleType">
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Configuration */}
              <div className="space-y-2">
                <Label htmlFor="configuration">Configuration</Label>
                <Textarea
                  id="configuration"
                  value={formData.configuration}
                  onChange={(e) => setFormData({ ...formData, configuration: e.target.value })}
                  placeholder="Enter vehicle configuration details, specs, or notes..."
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Add details like capacity, dimensions, special features, etc.
                </p>
              </div>

              {/* Subcontractor Assignment */}
              <div className="space-y-2">
                <Label htmlFor="subcontractorId">Subcontractor</Label>
                <Select
                  value={formData.subcontractorId}
                  onValueChange={(value) => setFormData({ ...formData, subcontractorId: value })}
                >
                  <SelectTrigger id="subcontractorId">
                    <SelectValue placeholder="Search and select subcontractor" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="p-2">
                      <Input
                        placeholder="Search subcontractors..."
                        value={subcontractorSearch}
                        onChange={(e) => setSubcontractorSearch(e.target.value)}
                        className="mb-2"
                      />
                    </div>
                    {filteredSubcontractors.map((sub) => (
                      <SelectItem key={sub.id} value={sub.id}>
                        {sub.name} (ABN: {sub.abn})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="idle">Idle</SelectItem>
                    <SelectItem value="out-of-service">Out of Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Mileage & Service Section */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground">Mileage & Service</h3>

              {/* Current Mileage */}
              <div className="space-y-2">
                <Label htmlFor="currentMileage">Current Mileage (km)</Label>
                <Input
                  id="currentMileage"
                  type="number"
                  value={formData.currentMileage}
                  onChange={(e) => setFormData({ ...formData, currentMileage: e.target.value })}
                  placeholder="45000"
                />
              </div>

              {/* Last Service Date */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lastServiceDate">Last Service Date</Label>
                  <Input
                    id="lastServiceDate"
                    type="date"
                    value={formData.lastServiceDate}
                    onChange={(e) => setFormData({ ...formData, lastServiceDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastServiceMileage">Service Mileage (km)</Label>
                  <Input
                    id="lastServiceMileage"
                    type="number"
                    value={formData.lastServiceMileage}
                    onChange={(e) => setFormData({ ...formData, lastServiceMileage: e.target.value })}
                    placeholder="40000"
                  />
                </div>
              </div>
            </div>

            {/* Trailer Section */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="addTrailer"
                  checked={formData.addTrailer}
                  onCheckedChange={(checked) => setFormData({ ...formData, addTrailer: checked as boolean, trailerRegistration: checked ? formData.trailerRegistration : "" })}
                />
                <Label htmlFor="addTrailer" className="text-sm font-semibold text-foreground cursor-pointer flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Add Trailer
                </Label>
              </div>

              {formData.addTrailer && (
                <div className="space-y-2 ml-6">
                  <Label htmlFor="trailerRegistration">Trailer Registration Number</Label>
                  <Input
                    id="trailerRegistration"
                    value={formData.trailerRegistration}
                    onChange={(e) => setFormData({ ...formData, trailerRegistration: e.target.value })}
                    placeholder="TRL-456"
                  />
                </div>
              )}
            </div>

            {/* Media Upload Section */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground">Photos & Videos</h3>

              <div className="space-y-2">
                <Label htmlFor="mediaUpload">Upload Photos / Videos</Label>
                <div className="space-y-2">
                  <Input
                    id="mediaUpload"
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleMediaUpload}
                    className="hidden"
                  />
                  <Label htmlFor="mediaUpload" className="cursor-pointer">
                    <div className="flex items-center gap-2 p-4 border-2 border-dashed border-border rounded-md hover:bg-accent">
                      <Upload className="h-5 w-5 text-muted-foreground" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Click to upload photos or videos</span>
                        <span className="text-xs text-muted-foreground">
                          JPG, PNG, GIF, MP4, MOV (max. 50MB per file)
                        </span>
                      </div>
                    </div>
                  </Label>

                  {/* Media Previews */}
                  {mediaFiles.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 mt-3">
                      {mediaFiles.map((file, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square rounded-md overflow-hidden border border-border bg-muted">
                            {file.type.startsWith("image/") ? (
                              <Image
                                src={mediaPreviews[index] || "/placeholder.svg"}
                                alt={`Upload ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Video className="h-8 w-8 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeMedia(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                          <p className="text-xs text-muted-foreground mt-1 truncate">{file.name}</p>
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
            <Button onClick={handleSubmit}>Add Vehicle</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AddVehicleTypeDialog
        open={isAddVehicleTypeOpen}
        onOpenChange={setIsAddVehicleTypeOpen}
        onAdd={handleAddVehicleType}
      />
    </>
  )
}
