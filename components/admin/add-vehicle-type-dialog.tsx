"use client"

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

interface AddVehicleTypeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (vehicleType: { value: string; label: string; description: string }) => void
}

export function AddVehicleTypeDialog({ open, onOpenChange, onAdd }: AddVehicleTypeDialogProps) {
  const [formData, setFormData] = useState({
    label: "",
    description: "",
  })

  const handleSubmit = () => {
    if (!formData.label.trim()) return

    const vehicleType = {
      value: formData.label.toLowerCase().replace(/\s+/g, "-"),
      label: formData.label,
      description: formData.description,
    }

    onAdd(vehicleType)

    // Reset form
    setFormData({
      label: "",
      description: "",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Vehicle Type</DialogTitle>
          <DialogDescription>Create a custom vehicle type for your fleet classification.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="vehicleTypeName">
              Vehicle Type Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="vehicleTypeName"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              placeholder="e.g., Road Train, B-Triple, Tanker"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Optional: Add details about this vehicle type, typical configurations, or usage..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!formData.label.trim()}>
            Add Vehicle Type
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
