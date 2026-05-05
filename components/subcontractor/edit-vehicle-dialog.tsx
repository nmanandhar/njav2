"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { Upload, X, FileVideo } from "lucide-react"

interface EditVehicleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vehicle: any
}

export function EditVehicleDialog({ open, onOpenChange, vehicle }: EditVehicleDialogProps) {
  const [formData, setFormData] = useState({
    registration: "",
    vehicleType: "",
    configuration: "",
    driverAssignment: "",
    status: "",
    currentMileage: "",
    lastServiceDate: "",
    lastServiceMileage: "",
  })

  const [media, setMedia] = useState<Array<{ file: File; preview: string; type: string }>>([])

  useEffect(() => {
    if (vehicle) {
      setFormData({
        registration: vehicle.registration || "",
        vehicleType: vehicle.model?.toLowerCase() || "",
        configuration: `${vehicle.make} ${vehicle.model} - ${vehicle.capacity}` || "",
        driverAssignment: vehicle.driver?.name || "unassigned",
        status: vehicle.driver?.status?.toLowerCase().replace(" ", "-") || "active",
        currentMileage: vehicle.performance?.distance?.replace(" km", "").replace(",", "") || "",
        lastServiceDate: vehicle.maintenance?.last || "",
        lastServiceMileage: "",
      })
    }
  }, [vehicle])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      files.forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setMedia((prev) => [
            ...prev,
            {
              file,
              preview: reader.result as string,
              type: file.type.startsWith("video/") ? "video" : "image",
            },
          ])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeMedia = (index: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    console.log("Updated vehicle data:", formData)
    console.log("Media files:", media)
    // Handle form submission
    onOpenChange(false)
  }

  // Mock driver data for dropdown
  const drivers = [
    { id: "1", name: "John Smith" },
    { id: "2", name: "Sarah Johnson" },
    { id: "3", name: "Mike Wilson" },
    { id: "4", name: "Emily Davis" },
    { id: "5", name: "David Brown" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Vehicle - {vehicle?.id}</DialogTitle>
          <DialogDescription>Update vehicle information and upload additional documentation.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Vehicle Details Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Vehicle Details</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="registration">Registration Number</Label>
                <Input
                  id="registration"
                  placeholder="e.g., ABC-123"
                  value={formData.registration}
                  onChange={(e) => handleInputChange("registration", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicleType">Vehicle Type</Label>
                <Select value={formData.vehicleType} onValueChange={(value) => handleInputChange("vehicleType", value)}>
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="configuration">Configuration</Label>
              <Textarea
                id="configuration"
                placeholder="Enter vehicle configuration details (e.g., 6x4, payload capacity, special equipment)"
                value={formData.configuration}
                onChange={(e) => handleInputChange("configuration", e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="driver">Driver Assignment</Label>
                <Select
                  value={formData.driverAssignment}
                  onValueChange={(value) => handleInputChange("driverAssignment", value)}
                >
                  <SelectTrigger id="driver">
                    <SelectValue placeholder="Select driver" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {drivers.map((driver) => (
                      <SelectItem key={driver.id} value={driver.id}>
                        {driver.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
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
          </div>

          {/* Mileage & Service Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Mileage & Service</h3>

            <div className="space-y-2">
              <Label htmlFor="currentMileage">Current Mileage (km)</Label>
              <Input
                id="currentMileage"
                type="number"
                placeholder="e.g., 45230"
                value={formData.currentMileage}
                onChange={(e) => handleInputChange("currentMileage", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lastServiceDate">Last Service Date</Label>
                <Input
                  id="lastServiceDate"
                  type="date"
                  value={formData.lastServiceDate}
                  onChange={(e) => handleInputChange("lastServiceDate", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastServiceMileage">Last Service Mileage (km)</Label>
                <Input
                  id="lastServiceMileage"
                  type="number"
                  placeholder="e.g., 40000"
                  value={formData.lastServiceMileage}
                  onChange={(e) => handleInputChange("lastServiceMileage", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Photos & Videos Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Photos & Videos</h3>

            <div className="space-y-2">
              <Label>Upload Media</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleMediaUpload}
                  className="hidden"
                  id="media-upload"
                />
                <label htmlFor="media-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                    <br />
                    Photos (JPG, PNG) or Videos (MP4, MOV)
                  </p>
                </label>
              </div>

              {media.length > 0 && (
                <div className="grid grid-cols-4 gap-3 mt-3">
                  {media.map((item, index) => (
                    <div key={index} className="relative group rounded-lg overflow-hidden border">
                      {item.type === "video" ? (
                        <div className="aspect-square bg-muted flex items-center justify-center">
                          <FileVideo className="h-8 w-8 text-muted-foreground" />
                          <video
                            src={item.preview}
                            className="absolute inset-0 w-full h-full object-cover opacity-50"
                          />
                        </div>
                      ) : (
                        <img
                          src={item.preview || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          className="w-full aspect-square object-cover"
                        />
                      )}
                      <button
                        onClick={() => removeMedia(index)}
                        className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Update Vehicle</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
