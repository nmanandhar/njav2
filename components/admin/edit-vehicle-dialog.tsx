"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { Upload, X, Video, Truck } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"

interface EditVehicleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vehicle: any // The vehicle data to edit
}

// Mock drivers for the dropdown - in real app, this would come from API
const mockDrivers = [
  { id: "1", name: "John Smith", status: "Active" },
  { id: "2", name: "Sarah Johnson", status: "Active" },
  { id: "3", name: "Mike Wilson", status: "Active" },
  { id: "4", name: "Emily Davis", status: "Active" },
  { id: "5", name: "David Brown", status: "Active" },
]

export function EditVehicleDialog({ open, onOpenChange, vehicle }: EditVehicleDialogProps) {
  const [mediaFiles, setMediaFiles] = useState<File[]>([])
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([])
  const [driverSearch, setDriverSearch] = useState("")
  const [formData, setFormData] = useState({
    registrationNumber: "",
    year: "",
    make: "",
    model: "",
    vehicleType: "",
    configuration: "",
    assignedDriver: "",
    status: "",
    currentMileage: "",
    lastServiceDate: "",
    lastServiceMileage: "",
    hasTrailer: false,
    trailerRegistration: "",
  })

  useEffect(() => {
    if (vehicle) {
      // Parse vehicle details to extract year, make, model
      const vehicleDetails = vehicle.vehicle || ""
      const match = vehicleDetails.match(/(.+?)\s+(.+?)\s+$$(\d{4})$$/)
      const make = match ? match[1] : ""
      const model = match ? match[2] : ""
      const year = match ? match[3] : ""

      setFormData({
        registrationNumber: vehicle.registration || "",
        year: year,
        make: make,
        model: model,
        vehicleType: "", // Would need to be stored in vehicle data
        configuration: vehicle.capacity || "",
        assignedDriver: vehicle.driver?.name || "",
        status: vehicle.status || "",
        currentMileage: vehicle.performance?.currentMileage?.replace(/[^\d]/g, "") || "",
        lastServiceDate: vehicle.maintenance?.lastService?.split(" ")[1] || "",
        lastServiceMileage: "",
        hasTrailer: !!vehicle.trailerRegistration,
        trailerRegistration: vehicle.trailerRegistration || "",
      })
    }
  }, [vehicle])

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

  const filteredDrivers = mockDrivers.filter((driver) => driver.name.toLowerCase().includes(driverSearch.toLowerCase()))

  const handleSubmit = () => {
    console.log("[v0] Vehicle data updated:", formData, "Media files:", mediaFiles)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Vehicle</DialogTitle>
          <DialogDescription>
            Update vehicle information and upload additional photos or videos for your fleet records.
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
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Select
                value={formData.vehicleType}
                onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}
              >
                <SelectTrigger id="vehicleType">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bogie">Bogie</SelectItem>
                  <SelectItem value="8-wheeler">8 Wheeler</SelectItem>
                  <SelectItem value="10-wheeler">10 Wheeler</SelectItem>
                  <SelectItem value="tri-axle">Tri-axle / Superdog</SelectItem>
                  <SelectItem value="quad">Quad</SelectItem>
                  <SelectItem value="quin">Quin</SelectItem>
                  <SelectItem value="walking-floor">Walking Floor</SelectItem>
                  <SelectItem value="a-double">A-Double</SelectItem>
                  <SelectItem value="b-double">B-Double</SelectItem>
                  <SelectItem value="semi">Semi</SelectItem>
                  <SelectItem value="side-tipper">Side Tipper</SelectItem>
                  <SelectItem value="prime-mover">Prime Mover</SelectItem>
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

            {/* Driver Assignment */}
            <div className="space-y-2">
              <Label htmlFor="assignedDriver">Driver Assignment</Label>
              <Select
                value={formData.assignedDriver}
                onValueChange={(value) => setFormData({ ...formData, assignedDriver: value })}
              >
                <SelectTrigger id="assignedDriver">
                  <SelectValue placeholder="Search and select driver" />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2">
                    <Input
                      placeholder="Search drivers..."
                      value={driverSearch}
                      onChange={(e) => setDriverSearch(e.target.value)}
                      className="mb-2"
                    />
                  </div>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  {filteredDrivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      {driver.name} ({driver.status})
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
                  <SelectItem value="maintenance">In Maintenance</SelectItem>
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
                id="hasTrailer"
                checked={formData.hasTrailer}
                onCheckedChange={(checked) => setFormData({ ...formData, hasTrailer: checked as boolean, trailerRegistration: checked ? formData.trailerRegistration : "" })}
              />
              <Label htmlFor="hasTrailer" className="text-sm font-semibold text-foreground cursor-pointer flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Add Trailer
              </Label>
            </div>

            {formData.hasTrailer && (
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
              <Label htmlFor="mediaUpload">Upload Additional Photos / Videos</Label>
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
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
