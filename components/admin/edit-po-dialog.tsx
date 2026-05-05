"use client"

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
import { Plus, X, MapPin, Truck, Search, ExternalLink } from "lucide-react"
import { Card } from "@/components/ui/card"

interface EditPODialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdatePO: (poId: string, poData: POFormData) => void
  poData: PurchaseOrder | null
}

interface OrderItem {
  quantity: string
  truckType: string
  customerDetails: string
  quarryCode: string
  supplierName: string
  deliveryTime: string
  uom: string
  direct: string
  unitCost: string
  productName: string
}

export interface POFormData {
  client: string
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

export interface PurchaseOrder {
  id: string
  poNumber: string
  client: string
  orderedBy: string
  description: string
  pickupAddress: {
    location: string
    address: string
  }
  deliveryAddress: {
    location: string
    address: string
  }
  deliveryDateTime: string
  orderItems: Array<{
    productName: string
    quantity: number
    truckType: string
    customerDetails: string
    quarryCode: string
    deliveryTime: string
    uom: string
    direct: string
    unitCost: number
  }>
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

export function EditPODialog({ open, onOpenChange, onUpdatePO, poData }: EditPODialogProps) {
  const [formData, setFormData] = useState<POFormData>({
    client: "",
    orderedBy: "",
    description: "",
    pickupLocation: "",
    pickupAddress: "",
    deliveryLocation: "",
    deliveryAddress: "",
    deliveryDate: "",
    deliveryTime: "",
    orderItems: [],
  })

  const [productSearch, setProductSearch] = useState("")
  const [showProductSuggestions, setShowProductSuggestions] = useState(false)

  const mockProducts = [
    { name: "20mm Crushed Rock", code: "BOR-MAR-001", unitCost: "85.00", uom: "Tonne", supplier: "Boral Maroota" },
    { name: "40mm Blue Metal", code: "BOR-MAR-002", unitCost: "92.00", uom: "Tonne", supplier: "Boral Maroota" },
    { name: "Concrete Mix", code: "CON-STD-001", unitCost: "150.00", uom: "m³", supplier: "Concrete Suppliers Ltd" },
    { name: "Sand & Gravel", code: "BOR-MAR-002", unitCost: "90.00", uom: "Load", supplier: "Boral Maroota" },
    { name: "Road Base", code: "RDB-001", unitCost: "65.00", uom: "Tonne", supplier: "Roadbase Direct" },
    { name: "Sand Fill", code: "SND-FIL-001", unitCost: "45.00", uom: "Tonne", supplier: "Sand & Soil Co" },
  ]

  const filteredProducts = productSearch
    ? mockProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
          product.code.toLowerCase().includes(productSearch.toLowerCase()),
      )
    : []

  useEffect(() => {
    if (poData && open) {
      const [date, time] = poData.deliveryDateTime.split(" ")
      setFormData({
        client: poData.client,
        orderedBy: poData.orderedBy,
        description: poData.description,
        pickupLocation: poData.pickupAddress.location,
        pickupAddress: poData.pickupAddress.address,
        deliveryLocation: poData.deliveryAddress.location,
        deliveryAddress: poData.deliveryAddress.address,
        deliveryDate: date,
        deliveryTime: time,
        orderItems: poData.orderItems.map((item) => ({
          productName: item.productName,
          quantity: item.quantity.toString(),
          truckType: item.truckType,
          customerDetails: item.customerDetails,
          quarryCode: item.quarryCode,
          supplierName: "",
          deliveryTime: item.deliveryTime,
          uom: item.uom,
          direct: item.direct,
          unitCost: item.unitCost.toString(),
        })),
      })
    }
  }, [poData, open])

  const handleProductSelect = (product: (typeof mockProducts)[0]) => {
    if (formData.orderItems.length > 0) {
      const updatedItems = [...formData.orderItems]
      updatedItems[0] = {
        ...updatedItems[0],
        productName: product.name,
        quarryCode: product.code,
        supplierName: product.supplier,
        unitCost: product.unitCost,
        uom: product.uom,
      }
      setFormData({ ...formData, orderItems: updatedItems })
    }
    setProductSearch("")
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
          supplierName: "",
          deliveryTime: "",
          uom: "",
          direct: "Yes",
          unitCost: "",
          productName: "",
        },
      ],
    })
  }

  const removeOrderItem = (index: number) => {
    const updatedItems = formData.orderItems.filter((_, i) => i !== index)
    setFormData({ ...formData, orderItems: updatedItems })
  }

  const updateOrderItem = (index: number, field: keyof OrderItem, value: string) => {
    const updatedItems = [...formData.orderItems]
    updatedItems[index] = { ...updatedItems[index], [field]: value }
    setFormData({ ...formData, orderItems: updatedItems })
  }

  const handleSubmit = () => {
    if (!poData) return
    onUpdatePO(poData.id, formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Purchase Order</DialogTitle>
          <DialogDescription>
            Update purchase order details including pickup and delivery locations, and order items.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-client">Client Name *</Label>
                <Input
                  id="edit-client"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  placeholder="ABC Construction Ltd"
                />
              </div>
              <div>
                <Label htmlFor="edit-orderedBy">Ordered By *</Label>
                <Input
                  id="edit-orderedBy"
                  value={formData.orderedBy}
                  onChange={(e) => setFormData({ ...formData, orderedBy: e.target.value })}
                  placeholder="John Smith"
                />
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="edit-description">Description *</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Material delivery for construction project"
                rows={3}
              />
            </div>
          </div>

          {/* Pickup Location */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-semibold">Pickup Location</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-pickupLocation">Location Name *</Label>
                <Input
                  id="edit-pickupLocation"
                  value={formData.pickupLocation}
                  onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                  placeholder="Boral Quarry"
                />
              </div>
              <div>
                <Label htmlFor="edit-pickupAddress">Address *</Label>
                <Input
                  id="edit-pickupAddress"
                  value={formData.pickupAddress}
                  onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                  placeholder="45 Quarry Road, Maroota NSW"
                />
              </div>
            </div>
          </div>

          {/* Delivery Location */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-green-600" />
              <h3 className="text-sm font-semibold">Delivery Location</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-deliveryLocation">Location Name *</Label>
                <Input
                  id="edit-deliveryLocation"
                  value={formData.deliveryLocation}
                  onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                  placeholder="Construction Site A"
                />
              </div>
              <div>
                <Label htmlFor="edit-deliveryAddress">Address *</Label>
                <Input
                  id="edit-deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                  placeholder="789 Warehouse Rd, Sydney NSW"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="edit-deliveryDate">Delivery Date *</Label>
                <Input
                  id="edit-deliveryDate"
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-deliveryTime">Delivery Time *</Label>
                <Input
                  id="edit-deliveryTime"
                  type="time"
                  value={formData.deliveryTime}
                  onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-teal-600" />
                <h3 className="text-sm font-semibold">Order Items</h3>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={addOrderItem}>
                <Plus className="w-4 h-4 mr-1" />
                Add Item
              </Button>
            </div>

            {/* Product Search */}
            <div className="mb-4">
              <Label htmlFor="edit-productSearch">Search Product Inventory</Label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="edit-productSearch"
                    value={productSearch}
                    onChange={(e) => {
                      setProductSearch(e.target.value)
                      setShowProductSuggestions(e.target.value.length > 0)
                    }}
                    onFocus={() => setShowProductSuggestions(productSearch.length > 0)}
                    placeholder="Search products..."
                    className="pl-10"
                  />
                  {showProductSuggestions && filteredProducts.length > 0 && (
                    <Card className="absolute z-50 w-full mt-1 max-h-48 overflow-y-auto">
                      {filteredProducts.map((product, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleProductSelect(product)}
                          className="w-full px-4 py-2 text-left hover:bg-accent text-sm border-b last:border-0"
                        >
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {product.code} • ${product.unitCost} / {product.uom}
                          </div>
                        </button>
                      ))}
                    </Card>
                  )}
                </div>
                <a
                  href="/admin-portal/procurement/products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  View Product List
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="space-y-4">
              {formData.orderItems.map((item, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-sm font-medium">Item {index + 1}</h4>
                    {formData.orderItems.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeOrderItem(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Supplier Code *</Label>
                      <Input
                        value={item.quarryCode}
                        onChange={(e) => updateOrderItem(index, "quarryCode", e.target.value)}
                        placeholder="BOR-MAR-001"
                      />
                      {item.supplierName && <p className="text-sm text-muted-foreground mt-1">{item.supplierName}</p>}
                    </div>
                    <div>
                      <Label>Product Name *</Label>
                      <Input
                        value={item.productName}
                        onChange={(e) => updateOrderItem(index, "productName", e.target.value)}
                        placeholder="Concrete Mix"
                      />
                    </div>
                    <div>
                      <Label>Quantity *</Label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateOrderItem(index, "quantity", e.target.value)}
                        placeholder="50"
                      />
                    </div>
                    <div>
                      <Label>Unit Cost (AUD) *</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={item.unitCost}
                        onChange={(e) => updateOrderItem(index, "unitCost", e.target.value)}
                        placeholder="85.00"
                      />
                    </div>
                    <div>
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
                    <div>
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
                    <div className="col-span-2">
                      <Label>Customer Details *</Label>
                      <Input
                        value={item.customerDetails}
                        onChange={(e) => updateOrderItem(index, "customerDetails", e.target.value)}
                        placeholder="George St Site - Gate 2"
                      />
                    </div>
                    <div>
                      <Label>Delivery Time Window *</Label>
                      <Input
                        value={item.deliveryTime}
                        onChange={(e) => updateOrderItem(index, "deliveryTime", e.target.value)}
                        placeholder="08:00-12:00"
                      />
                    </div>
                    <div>
                      <Label>Direct Delivery *</Label>
                      <Select value={item.direct} onValueChange={(value) => updateOrderItem(index, "direct", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
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
          <Button onClick={handleSubmit}>Update Purchase Order</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
