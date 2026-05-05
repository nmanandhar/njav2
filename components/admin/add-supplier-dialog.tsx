"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings } from "lucide-react"

interface AddSupplierDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (supplier: SupplierFormData) => void
  categories: string[]
  onManageCategories: () => void
}

export interface SupplierFormData {
  name: string
  contactName: string
  email: string
  orderEmail: string
  phone: string
  address: string
  abn: string
  status: "Active" | "Pending" | "Inactive"
  category: string
  paymentTerms: string
}

export function AddSupplierDialog({
  open,
  onOpenChange,
  onAdd,
  categories,
  onManageCategories,
}: AddSupplierDialogProps) {
  const [formData, setFormData] = useState<SupplierFormData>({
    name: "",
    contactName: "",
    email: "",
    orderEmail: "",
    phone: "",
    address: "",
    abn: "",
    status: "Active",
    category: "",
    paymentTerms: "Net 30",
  })

  const handleSubmit = () => {
    // Basic validation
    if (
      !formData.name ||
      !formData.contactName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.abn ||
      !formData.category
    ) {
      alert("Please fill in all required fields")
      return
    }

    onAdd(formData)

    // Reset form
    setFormData({
      name: "",
      contactName: "",
      email: "",
      orderEmail: "",
      phone: "",
      address: "",
      abn: "",
      status: "Active",
      category: "",
      paymentTerms: "Net 30",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto" style={{ width: "95vw", maxWidth: "95vw" }}>
        <DialogHeader>
          <DialogTitle>Add New Supplier</DialogTitle>
          <DialogDescription>
            Enter supplier information and contact details to add them to your procurement system.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Supplier Information Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Supplier Information</h3>

            {/* Supplier Name */}
            <div className="space-y-2">
              <Label htmlFor="supplierName">Supplier Name *</Label>
              <Input
                id="supplierName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="ABC Equipment Supplies Pty Ltd"
              />
            </div>

            {/* Category and ABN */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="category">Category *</Label>
                  <Button type="button" variant="ghost" size="sm" onClick={onManageCategories} className="h-7 text-xs">
                    <Settings className="h-3 w-3 mr-1" />
                    Manage
                  </Button>
                </div>
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

              <div className="space-y-2">
                <Label htmlFor="abn">ABN *</Label>
                <Input
                  id="abn"
                  value={formData.abn}
                  onChange={(e) => setFormData({ ...formData, abn: e.target.value })}
                  placeholder="12 345 678 901"
                  maxLength={14}
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="123 Business St, Sydney NSW 2000"
              />
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground">Contact Information</h3>

            {/* Contact Person */}
            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Person *</Label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                placeholder="John Smith"
              />
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Contact Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john.smith@supplier.com.au"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+61 2 1234 5678"
                />
              </div>
            </div>

            {/* Order Email */}
            <div className="space-y-2">
              <Label htmlFor="orderEmail">Order Email</Label>
              <Input
                id="orderEmail"
                type="email"
                value={formData.orderEmail}
                onChange={(e) => setFormData({ ...formData, orderEmail: e.target.value })}
                placeholder="orders@supplier.com.au"
              />
            </div>
          </div>

          {/* Payment & Status Section */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground">Payment Terms & Status</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paymentTerms">Payment Terms</Label>
                <Select
                  value={formData.paymentTerms}
                  onValueChange={(value) => setFormData({ ...formData, paymentTerms: value })}
                >
                  <SelectTrigger id="paymentTerms">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Net 7">Net 7</SelectItem>
                    <SelectItem value="Net 14">Net 14</SelectItem>
                    <SelectItem value="Net 30">Net 30</SelectItem>
                    <SelectItem value="Net 45">Net 45</SelectItem>
                    <SelectItem value="Net 60">Net 60</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value as "Active" | "Pending" | "Inactive" })
                  }
                >
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
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Supplier</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
