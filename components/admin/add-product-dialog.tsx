"use client"
import { useState } from "react"
import type React from "react"

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
import { ImagePlus, X, Plus, Trash2 } from "lucide-react"

interface LocationStock {
  id: string
  location: string
  stockQuantity: string
}

interface AddProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (product: ProductFormData) => void
}

export interface ProductFormData {
  name: string
  sku: string
  category: string
  description: string
  unitType: string
  unitPrice: string
  reorderLevel: string
  locations: LocationStock[]
  availability: "In Stock" | "Low Stock" | "Out of Stock"
  image?: string
}

const categories = [
  "Fluids & Lubricants",
  "Parts & Components",
  "Safety & PPE",
  "Tools & Equipment",
  "Tires & Wheels",
  "Electrical & Lighting",
]

const unitTypes = ["Per Tonne", "Hourly", "Load Rate", "Per Unit", "Per Litre", "Per Kilogram", "Per Metre"]

export function AddProductDialog({ open, onOpenChange, onAdd }: AddProductDialogProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    sku: "",
    category: "",
    description: "",
    unitType: "Per Unit",
    unitPrice: "",
    reorderLevel: "",
    locations: [{ id: "1", location: "", stockQuantity: "" }],
    availability: "In Stock",
    image: undefined,
  })

  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreviewImage(result)
        setFormData({ ...formData, image: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setPreviewImage(null)
    setFormData({ ...formData, image: undefined })
  }

  const handleAddLocation = () => {
    const newLocation: LocationStock = {
      id: Date.now().toString(),
      location: "",
      stockQuantity: "",
    }
    setFormData({
      ...formData,
      locations: [...formData.locations, newLocation],
    })
  }

  const handleRemoveLocation = (id: string) => {
    if (formData.locations.length === 1) {
      alert("At least one location is required")
      return
    }
    setFormData({
      ...formData,
      locations: formData.locations.filter((loc) => loc.id !== id),
    })
  }

  const handleLocationChange = (id: string, field: "location" | "stockQuantity", value: string) => {
    setFormData({
      ...formData,
      locations: formData.locations.map((loc) => (loc.id === id ? { ...loc, [field]: value } : loc)),
    })
  }

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.sku ||
      !formData.category ||
      !formData.unitPrice ||
      !formData.reorderLevel ||
      formData.locations.some((loc) => !loc.location || !loc.stockQuantity)
    ) {
      alert("Please fill in all required fields including all locations and stock quantities")
      return
    }

    onAdd(formData)

    setFormData({
      name: "",
      sku: "",
      category: "",
      description: "",
      unitType: "Per Unit",
      unitPrice: "",
      reorderLevel: "",
      locations: [{ id: "1", location: "", stockQuantity: "" }],
      availability: "In Stock",
      image: undefined,
    })
    setPreviewImage(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto" style={{ width: "95vw", maxWidth: "95vw" }}>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Enter product information to add it to your inventory.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Product Image Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Product Image</h3>

            <div className="flex items-start gap-4">
              {previewImage ? (
                <div className="relative">
                  <img
                    src={previewImage || "/placeholder.svg"}
                    alt="Product preview"
                    className="h-32 w-32 rounded-lg border border-border object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -right-2 -top-2 h-6 w-6"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label
                  htmlFor="productImage"
                  className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/50 hover:bg-muted"
                >
                  <ImagePlus className="h-8 w-8 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Upload Image</span>
                  <input
                    id="productImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
              <div className="flex-1 text-sm text-muted-foreground">
                <p>Upload a product image (optional)</p>
                <p className="text-xs">Recommended: 400x400px, Max 2MB</p>
              </div>
            </div>
          </div>

          {/* Basic Information Section */}
          <div className="space-y-4 border-t border-border pt-4">
            <h3 className="text-sm font-semibold text-foreground">Basic Information</h3>

            {/* Product Name */}
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name *</Label>
              <Input
                id="productName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Hydraulic Oil - Premium Grade"
              />
            </div>

            {/* SKU and Category */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sku">SKU *</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="HYD-OIL-20L"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter product description..."
                rows={3}
              />
            </div>
          </div>

          {/* Pricing & Inventory Section */}
          <div className="space-y-4 border-t border-border pt-4">
            <h3 className="text-sm font-semibold text-foreground">Pricing & Inventory</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="unitType">Unit Type *</Label>
                <Select
                  value={formData.unitType}
                  onValueChange={(value) => setFormData({ ...formData, unitType: value })}
                >
                  <SelectTrigger id="unitType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {unitTypes.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="unitPrice">Unit Price *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="unitPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.unitPrice}
                    onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                    placeholder="0.00"
                    className="pl-7"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reorderLevel">Reorder Level *</Label>
                <Input
                  id="reorderLevel"
                  type="number"
                  min="0"
                  value={formData.reorderLevel}
                  onChange={(e) => setFormData({ ...formData, reorderLevel: e.target.value })}
                  placeholder="10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Select
                  value={formData.availability}
                  onValueChange={(value) =>
                    setFormData({ ...formData, availability: value as "In Stock" | "Low Stock" | "Out of Stock" })
                  }
                >
                  <SelectTrigger id="availability">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In Stock">In Stock</SelectItem>
                    <SelectItem value="Low Stock">Low Stock</SelectItem>
                    <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Storage Locations Section */}
          <div className="space-y-4 border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Storage Locations</h3>
              <Button type="button" variant="outline" size="sm" onClick={handleAddLocation}>
                <Plus className="mr-2 h-4 w-4" />
                Add Location
              </Button>
            </div>

            <div className="space-y-3">
              {formData.locations.map((locationItem, index) => (
                <div key={locationItem.id} className="rounded-lg border border-border bg-muted/30 p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`location-${locationItem.id}`}>Location {index + 1} *</Label>
                        <Input
                          id={`location-${locationItem.id}`}
                          value={locationItem.location}
                          onChange={(e) => handleLocationChange(locationItem.id, "location", e.target.value)}
                          placeholder="Warehouse A - Bay 3"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`stock-${locationItem.id}`}>Stock Quantity *</Label>
                        <Input
                          id={`stock-${locationItem.id}`}
                          type="number"
                          min="0"
                          value={locationItem.stockQuantity}
                          onChange={(e) => handleLocationChange(locationItem.id, "stockQuantity", e.target.value)}
                          placeholder="0"
                        />
                      </div>
                    </div>

                    {formData.locations.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="mt-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleRemoveLocation(locationItem.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddProductDialog
