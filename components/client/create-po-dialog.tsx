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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, MapPin, Truck, Search } from "lucide-react"
import { Card } from "@/components/ui/card"

interface CreatePODialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreatePO: (poData: POFormData) => void
}

interface OrderItem {
  quantity: string
  truckType: string
  customerDetails: string
  quarryCode: string
  deliveryTime: string
  uom: string
  unitCost: string
  productName: string
  supplierName: string // Added supplier name field
}

export interface POFormData {
  orderedBy: string
  description: string
  pickupLocation: string
  pickupAddress: string
  deliveryLocation: string
  deliveryAddress: string
  deliveryDate: string
  deliveryTime: string
  orderItems: OrderItem[]
}

const truckTypes = [
  "10m³ Tipper",
  "8m³ Tipper",
  "12m³ Tipper",
  "Concrete Agitator",
  "Low Loader",
  "Semi Tipper",
  "Dog Tipper",
]

const uomOptions = ["Tonne", "Load", "m³", "Unit", "Hour"]

export function CreatePODialog({ open, onOpenChange, onCreatePO }: CreatePODialogProps) {
  const [formData, setFormData] = useState<POFormData>({
    orderedBy: "",
    description: "",
    pickupLocation: "",
    pickupAddress: "",
    deliveryLocation: "",
    deliveryAddress: "",
    deliveryDate: "",
    deliveryTime: "",
    orderItems: [
      {
        quantity: "",
        truckType: "",
        customerDetails: "",
        quarryCode: "",
        deliveryTime: "",
        uom: "",
        unitCost: "",
        productName: "",
        supplierName: "", // Initialize supplier name
      },
    ],
  })

  const [productSearch, setProductSearch] = useState("")
  const [showProductSuggestions, setShowProductSuggestions] = useState(false)

  const mockProducts = [
    { name: "20mm Crushed Rock", code: "BOR-MAR-001", unitCost: "85.00", uom: "Tonne", supplier: "Boral Maroota" },
    { name: "40mm Blue Metal", code: "BOR-MAR-002", unitCost: "92.00", uom: "Tonne", supplier: "Boral Maroota" },
    { name: "Concrete Mix", code: "CON-STD-001", unitCost: "150.00", uom: "m³", supplier: "Concrete Suppliers Ltd" },
    { name: "Road Base", code: "RDB-001", unitCost: "65.00", uom: "Tonne", supplier: "ReadyMix Concrete" },
    { name: "Sand Fill", code: "SND-FIL-001", unitCost: "45.00", uom: "Tonne", supplier: "Sand & Soil Supplies" },
  ]

  const filteredProducts = productSearch
    ? mockProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
          product.code.toLowerCase().includes(productSearch.toLowerCase()),
      )
    : []

  const handleProductSelect = (product: (typeof mockProducts)[0]) => {
    if (formData.orderItems.length > 0) {
      const updatedItems = [...formData.orderItems]
      updatedItems[0] = {
        ...updatedItems[0],
        quarryCode: product.code,
        unitCost: product.unitCost,
        uom: product.uom,
        productName: product.name,
        supplierName: product.supplier, // Set supplier name when product is selected
      }
      setFormData({ ...formData, orderItems: updatedItems })
    }
    setProductSearch(product.name)
    setShowProductSuggestions(false)
  }

  const addOrderItem = () => {
    setFormData({
      ...formData,
      orderItems: [
        ...formData.orderItems,
        {
          quantity: "",
          truckType: "",
          customerDetails: "",
          quarryCode: "",
          deliveryTime: "",
          uom: "",
          unitCost: "",
          productName: "",
          supplierName: "", // Initialize supplier name for new items
        },
      ],
    })
  }

  const removeOrderItem = (index: number) => {
    if (formData.orderItems.length > 1) {
      setFormData({
        ...formData,
        orderItems: formData.orderItems.filter((_, i) => i !== index),
      })
    }
  }

  const updateOrderItem = (index: number, field: keyof OrderItem, value: string) => {
    const updatedItems = [...formData.orderItems]
    updatedItems[index] = { ...updatedItems[index], [field]: value }
    setFormData({ ...formData, orderItems: updatedItems })
  }

  const handleSubmit = () => {
    if (
      !formData.orderedBy ||
      !formData.description ||
      !formData.pickupLocation ||
      !formData.pickupAddress ||
      !formData.deliveryLocation ||
      !formData.deliveryAddress ||
      !formData.deliveryDate ||
      !formData.deliveryTime
    ) {
      alert("Please fill in all required fields")
      return
    }

    for (const item of formData.orderItems) {
      if (
        !item.quantity ||
        !item.truckType ||
        !item.customerDetails ||
        !item.quarryCode ||
        !item.deliveryTime ||
        !item.uom ||
        !item.unitCost ||
        !item.productName
      ) {
        alert("Please fill in all order item fields")
        return
      }
    }

    onCreatePO(formData)

    setFormData({
      orderedBy: "",
      description: "",
      pickupLocation: "",
      pickupAddress: "",
      deliveryLocation: "",
      deliveryAddress: "",
      deliveryDate: "",
      deliveryTime: "",
      orderItems: [
        {
          quantity: "",
          truckType: "",
          customerDetails: "",
          quarryCode: "",
          deliveryTime: "",
          uom: "",
          unitCost: "",
          productName: "",
          supplierName: "", // Initialize supplier name
        },
      ],
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto !max-w-[calc(100vw-2rem)] w-[calc(100vw-2rem)]">
        <DialogHeader>
          <DialogTitle>Create Purchase Order</DialogTitle>
          <DialogDescription>
            Enter purchase order details including pickup and delivery locations, and order items.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Basic Information</h3>

            <div className="space-y-2">
              <Label htmlFor="orderedBy">Ordered By *</Label>
              <Input
                id="orderedBy"
                value={formData.orderedBy}
                onChange={(e) => setFormData({ ...formData, orderedBy: e.target.value })}
                placeholder="John Smith"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Material delivery for construction project"
                rows={2}
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-foreground">Pickup Location</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pickupLocation">Location Name *</Label>
                <Input
                  id="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                  placeholder="Boral Quarry"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pickupAddress">Address *</Label>
                <Input
                  id="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                  placeholder="45 Quarry Road, Maroota NSW 2756"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-600" />
              <h3 className="text-sm font-semibold text-foreground">Delivery Location</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deliveryLocation">Location Name *</Label>
                <Input
                  id="deliveryLocation"
                  value={formData.deliveryLocation}
                  onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                  placeholder="Construction Site A"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliveryAddress">Address *</Label>
                <Input
                  id="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                  placeholder="789 Warehouse Rd, Sydney NSW 2000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deliveryDate">Delivery Date *</Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliveryTime">Delivery Time *</Label>
                <Input
                  id="deliveryTime"
                  type="time"
                  value={formData.deliveryTime}
                  onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-teal-600" />
                <h3 className="text-sm font-semibold text-foreground">Order Items</h3>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={addOrderItem}>
                <Plus className="w-4 h-4 mr-1" />
                Add Item
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="productSearch">Search Product Inventory</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="productSearch"
                  value={productSearch}
                  onChange={(e) => {
                    setProductSearch(e.target.value)
                    setShowProductSuggestions(true)
                  }}
                  onFocus={() => setShowProductSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowProductSuggestions(false), 200)}
                  placeholder="Search by product name or code..."
                  className="pl-9"
                />
                {showProductSuggestions && filteredProducts.length > 0 && (
                  <Card className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto">
                    <div className="p-1">
                      {filteredProducts.map((product, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleProductSelect(product)}
                          className="w-full text-left px-3 py-2 hover:bg-accent rounded-sm transition-colors"
                        >
                          <div className="font-medium text-sm">{product.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {product.code} • ${product.unitCost}/{product.uom}
                          </div>
                        </button>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {formData.orderItems.map((item, index) => (
                <Card key={index} className="p-4 relative">
                  {formData.orderItems.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => removeOrderItem(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Quarry/Supplier Code *</Label>
                        <Input
                          value={item.quarryCode}
                          onChange={(e) => updateOrderItem(index, "quarryCode", e.target.value)}
                          placeholder="BOR-MAR-001"
                        />
                        {item.supplierName && <p className="text-sm text-muted-foreground">{item.supplierName}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label>Product Name</Label>
                        <Input
                          value={item.productName}
                          onChange={(e) => updateOrderItem(index, "productName", e.target.value)}
                          placeholder="Concrete Mix"
                          className="bg-muted/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Quantity *</Label>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateOrderItem(index, "quantity", e.target.value)}
                          placeholder="50"
                          min="0"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Unit Cost (AUD) *</Label>
                        <Input
                          type="number"
                          value={item.unitCost}
                          onChange={(e) => updateOrderItem(index, "unitCost", e.target.value)}
                          placeholder="85.00"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>UOM *</Label>
                        <Select value={item.uom} onValueChange={(value) => updateOrderItem(index, "uom", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select UOM" />
                          </SelectTrigger>
                          <SelectContent>
                            {uomOptions.map((uom) => (
                              <SelectItem key={uom} value={uom}>
                                {uom}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Truck Type *</Label>
                        <Select
                          value={item.truckType}
                          onValueChange={(value) => updateOrderItem(index, "truckType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select truck type" />
                          </SelectTrigger>
                          <SelectContent>
                            {truckTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Customer Details *</Label>
                      <Input
                        value={item.customerDetails}
                        onChange={(e) => updateOrderItem(index, "customerDetails", e.target.value)}
                        placeholder="George St Site - Gate 2"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Delivery Time Window *</Label>
                        <Input
                          value={item.deliveryTime}
                          onChange={(e) => updateOrderItem(index, "deliveryTime", e.target.value)}
                          placeholder="08:00-12:00"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Purchase Order</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
