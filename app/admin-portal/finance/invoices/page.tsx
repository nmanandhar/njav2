"use client"

import type React from "react"

import { AdminFinanceHeader } from "@/components/admin/admin-finance-header"
import { Button } from "@/components/ui/button"
import { Search, Download, Filter, MapPin, Calendar, Truck, MoreVertical, Plus, Mail, Send, X, Paperclip, CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { formatCurrency } from "@/lib/utils"
import { useState } from "react"

const invoices = [
  {
    id: "RCTI-2024-01",
    poNumber: "PO-XL-8945",
    jobNumber: "JOB-2024-001",
    description: "Concrete transport services",
    invoiceDate: "2024-01-12",
    dueDate: "2024-02-11",
    client: "Melbourne Infrastructure",
    pickupAddress: {
      location: "Hanson Concrete Plant",
      address: "23 Industrial Ave, Blacktown NSW 2148",
    },
    deliveryAddress: {
      location: "Parramatta Office Tower",
      address: "150 Church St, Parramatta NSW 2150",
    },
    deliveryDateTime: "2024-01-12 06:00",
    orderItems: [
      {
        quantity: 25,
        truckType: "Concrete Agitator",
        customerDetails: "Parramatta Tower - Basement Pour",
        supplierId: "HAN-BLK-005",
        supplierName: "Hanson Concrete Blacktown",
        deliveryTime: "06:00-10:00",
        uom: "m³",
        direct: "Yes",
        unitCost: 130.0,
        amount: 3250.0,
      },
    ],
    subtotal: 3250.0,
    gst: 325.0,
    total: 3575.0,
    status: "Paid",
  },
  {
    id: "RCTI-2024-02",
    poNumber: "PO-XL-8932",
    jobNumber: "JOB-2024-003",
    description: "Material delivery for George St project",
    invoiceDate: "2024-01-15",
    dueDate: "2024-02-14",
    client: "Melbourne Infrastructure",
    pickupAddress: {
      location: "Boral Quarry",
      address: "45 Quarry Road, Maroota NSW 2756",
    },
    deliveryAddress: {
      location: "George St Construction Site",
      address: "789 Warehouse Rd, Sydney NSW 2000",
    },
    deliveryDateTime: "2024-01-15 08:00",
    orderItems: [
      {
        quantity: 50,
        truckType: "10m³ Tipper",
        customerDetails: "George St Site - Gate 2",
        supplierId: "BOR-MAR-001",
        supplierName: "Boral Quarry Maroota",
        deliveryTime: "08:00-12:00",
        uom: "Tonne",
        direct: "Yes",
        unitCost: 85.0,
        amount: 4250.0,
      },
      {
        quantity: 3,
        truckType: "8m³ Tipper",
        customerDetails: "George St Site - Gate 2",
        supplierId: "BOR-MAR-002",
        supplierName: "Boral Sand & Gravel Depot",
        deliveryTime: "13:00-15:00",
        uom: "Load",
        direct: "No",
        unitCost: 90.0,
        amount: 270.0,
      },
    ],
    subtotal: 4520.0,
    gst: 452.0,
    total: 4972.0,
    status: "Pending",
  },
]

const statusColors = {
  Paid: "bg-green-100 text-green-800 border-green-200",
  Pending: "bg-amber-100 text-amber-800 border-amber-200",
  Overdue: "bg-red-100 text-red-800 border-red-200",
}

export default function AdminInvoicesPage() {
  const router = useRouter()
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false)
  const [formData, setFormData] = useState({
    client: "",
    poNumber: "",
    jobNumber: "",
    description: "",
    invoiceDate: "",
    dueDate: "",
    pickupLocation: "",
    pickupAddress: "",
    deliveryLocation: "",
    deliveryAddress: "",
    deliveryDateTime: "",
    items: [
      {
        quantity: "",
        truckType: "",
        customerDetails: "",
        quarryCode: "",
        deliveryTime: "",
        uom: "m³",
        direct: "Yes",
        unitCost: "",
      },
    ],
    notes: "",
  })

  const [isSendModalOpen, setIsSendModalOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<(typeof invoices)[0] | null>(null)
  const [emailRecipients, setEmailRecipients] = useState<string[]>([])
  const [newRecipient, setNewRecipient] = useState("")
  const [emailSubject, setEmailSubject] = useState("")
  const [emailMessage, setEmailMessage] = useState("")
  const [attachPdf, setAttachPdf] = useState(true)
  const [ccSelf, setCcSelf] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleViewDetails = (invoiceId: string) => {
    router.push(`/admin-portal/finance/invoices/${invoiceId}`)
  }

  const handleSendInvoice = (invoice: (typeof invoices)[0]) => {
    setSelectedInvoice(invoice)
    setEmailRecipients([`accounts@${invoice.client.toLowerCase().replace(/\s+/g, "")}.com.au`])
    setEmailSubject(`Invoice ${invoice.id} - ${invoice.description}`)
    setEmailMessage(`Dear ${invoice.client},

Please find attached invoice ${invoice.id} for your review.

Invoice Details:
- Invoice Number: ${invoice.id}
- Job Number: ${invoice.jobNumber}
- PO Number: ${invoice.poNumber}
- Description: ${invoice.description}
- Amount: $${invoice.total.toLocaleString()} AUD (incl. GST)
- Due Date: ${invoice.dueDate}

Please process payment by the due date. If you have any questions regarding this invoice, please don't hesitate to contact us.

Thank you.

Kind regards,
NJ Ashton Transport`)
    setAttachPdf(true)
    setCcSelf(false)
    setIsSent(false)
    setIsSendModalOpen(true)
  }

  const handleAddRecipient = () => {
    if (newRecipient && !emailRecipients.includes(newRecipient)) {
      setEmailRecipients([...emailRecipients, newRecipient])
      setNewRecipient("")
    }
  }

  const handleRemoveRecipient = (email: string) => {
    setEmailRecipients(emailRecipients.filter((r) => r !== email))
  }

  const handleConfirmSend = async () => {
    setIsSending(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSending(false)
    setIsSent(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] New invoice data:", formData)
    setIsCreateInvoiceOpen(false)
    setFormData({
      client: "",
      poNumber: "",
      jobNumber: "",
      description: "",
      invoiceDate: "",
      dueDate: "",
      pickupLocation: "",
      pickupAddress: "",
      deliveryLocation: "",
      deliveryAddress: "",
      deliveryDateTime: "",
      items: [
        {
          quantity: "",
          truckType: "",
          customerDetails: "",
          quarryCode: "",
          deliveryTime: "",
          uom: "m³",
          direct: "Yes",
          unitCost: "",
        },
      ],
      notes: "",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background border-b border-border px-6 py-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-orange-500 font-medium">Finance</span>
          <span className="text-muted-foreground">›</span>
          <span className="text-foreground">Invoices</span>
        </div>
      </div>

      <AdminFinanceHeader />

      <div className="p-6">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type="search" placeholder="Search by invoice number, job..." className="pl-10" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Dialog open={isCreateInvoiceOpen} onOpenChange={setIsCreateInvoiceOpen}>
              <DialogTrigger asChild>
                <Button className="bg-teal-700 hover:bg-teal-800" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Invoice
                </Button>
              </DialogTrigger>
              <DialogContent className="!max-w-[calc(100vw-4rem)] w-[calc(100vw-4rem)] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Invoice</DialogTitle>
                  <DialogDescription>Fill in the details to create a new invoice</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-sm">Invoice Details</h3>

                      <div className="space-y-2">
                        <Label htmlFor="client">Client *</Label>
                        <Select
                          value={formData.client}
                          onValueChange={(value) => setFormData({ ...formData, client: value })}
                        >
                          <SelectTrigger id="client">
                            <SelectValue placeholder="Select client" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sydney-metro">Sydney Metro Construction</SelectItem>
                            <SelectItem value="melbourne-infra">Melbourne Infrastructure</SelectItem>
                            <SelectItem value="brisbane-dev">Brisbane Developments</SelectItem>
                            <SelectItem value="nj-ashton">N J Ashton</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="poNumber">PO Number *</Label>
                          <Input
                            id="poNumber"
                            placeholder="PO-XL-XXXX"
                            value={formData.poNumber}
                            onChange={(e) => setFormData({ ...formData, poNumber: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="jobNumber">Job Number *</Label>
                          <Input
                            id="jobNumber"
                            placeholder="JOB-2024-XXX"
                            value={formData.jobNumber}
                            onChange={(e) => setFormData({ ...formData, jobNumber: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Input
                          id="description"
                          placeholder="Brief description of services"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="invoiceDate">Invoice Date *</Label>
                          <Input
                            id="invoiceDate"
                            type="date"
                            value={formData.invoiceDate}
                            onChange={(e) => setFormData({ ...formData, invoiceDate: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dueDate">Due Date *</Label>
                          <Input
                            id="dueDate"
                            type="date"
                            value={formData.dueDate}
                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                          />
                        </div>
                      </div>

                      <h3 className="font-semibold text-sm pt-4">Pickup Details</h3>

                      <div className="space-y-2">
                        <Label htmlFor="pickupLocation">Pickup Location *</Label>
                        <Input
                          id="pickupLocation"
                          placeholder="e.g., Boral Quarry"
                          value={formData.pickupLocation}
                          onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pickupAddress">Pickup Address *</Label>
                        <Input
                          id="pickupAddress"
                          placeholder="Full address"
                          value={formData.pickupAddress}
                          onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                        />
                      </div>

                      <h3 className="font-semibold text-sm pt-4">Delivery Details</h3>

                      <div className="space-y-2">
                        <Label htmlFor="deliveryLocation">Delivery Location *</Label>
                        <Input
                          id="deliveryLocation"
                          placeholder="e.g., George St Construction Site"
                          value={formData.deliveryLocation}
                          onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="deliveryAddress">Delivery Address *</Label>
                        <Input
                          id="deliveryAddress"
                          placeholder="Full address"
                          value={formData.deliveryAddress}
                          onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="deliveryDateTime">Delivery Date & Time *</Label>
                        <Input
                          id="deliveryDateTime"
                          type="datetime-local"
                          value={formData.deliveryDateTime}
                          onChange={(e) => setFormData({ ...formData, deliveryDateTime: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-sm">Order Items</h3>

                      {formData.items.map((item, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label>Quantity *</Label>
                              <Input
                                type="number"
                                placeholder="0"
                                value={item.quantity}
                                onChange={(e) => {
                                  const newItems = [...formData.items]
                                  newItems[index].quantity = e.target.value
                                  setFormData({ ...formData, items: newItems })
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>UOM</Label>
                              <Select
                                value={item.uom}
                                onValueChange={(value) => {
                                  const newItems = [...formData.items]
                                  newItems[index].uom = value
                                  setFormData({ ...formData, items: newItems })
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="m³">m³</SelectItem>
                                  <SelectItem value="Tonne">Tonne</SelectItem>
                                  <SelectItem value="Load">Load</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Truck Type *</Label>
                            <Input
                              placeholder="e.g., 10m³ Tipper"
                              value={item.truckType}
                              onChange={(e) => {
                                const newItems = [...formData.items]
                                newItems[index].truckType = e.target.value
                                setFormData({ ...formData, items: newItems })
                              }}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Customer Details</Label>
                            <Input
                              placeholder="e.g., Gate 2"
                              value={item.customerDetails}
                              onChange={(e) => {
                                const newItems = [...formData.items]
                                newItems[index].customerDetails = e.target.value
                                setFormData({ ...formData, items: newItems })
                              }}
                            />
                          </div>

<div className="space-y-2">
                                            <Label>Supplier ID</Label>
                                            <Input
                                              placeholder="e.g., BOR-MAR-001"
                                              value={item.quarryCode}
                                              onChange={(e) => {
                                                const newItems = [...formData.items]
                                                newItems[index].quarryCode = e.target.value
                                                setFormData({ ...formData, items: newItems })
                                              }}
                                            />
                                          </div>

                          <div className="space-y-2">
                            <Label>Delivery Time</Label>
                            <Input
                              placeholder="e.g., 08:00-12:00"
                              value={item.deliveryTime}
                              onChange={(e) => {
                                const newItems = [...formData.items]
                                newItems[index].deliveryTime = e.target.value
                                setFormData({ ...formData, items: newItems })
                              }}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label>Unit Cost ($) *</Label>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={item.unitCost}
                                onChange={(e) => {
                                  const newItems = [...formData.items]
                                  newItems[index].unitCost = e.target.value
                                  setFormData({ ...formData, items: newItems })
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Direct</Label>
                              <Select
                                value={item.direct}
                                onValueChange={(value) => {
                                  const newItems = [...formData.items]
                                  newItems[index].direct = value
                                  setFormData({ ...formData, items: newItems })
                                }}
                              >
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
                        </div>
                      ))}

                      <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          placeholder="Any additional notes or special instructions"
                          rows={3}
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsCreateInvoiceOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Create Invoice</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="space-y-4">
          {invoices.map((invoice) => (
            <Card key={invoice.id} className="p-0 overflow-hidden">
              <div className="flex flex-col">
                <div className="grid grid-cols-[280px_1fr_1fr_240px_60px]">
                  {/* Column 1: Invoice Details */}
                  <div className="bg-blue-50 px-6 py-4 border-r border-border">
                    <h3 className="text-xl font-bold text-primary mb-4">{invoice.id}</h3>

                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="text-muted-foreground">PO Number:</div>
                        <div className="font-semibold text-foreground">{invoice.poNumber}</div>
                      </div>

                      <div>
                        <div className="text-muted-foreground">Job Number:</div>
                        <div className="font-semibold text-primary">{invoice.jobNumber}</div>
                      </div>

                      <div>
                        <div className="text-muted-foreground">Description:</div>
                        <div className="font-medium text-foreground">{invoice.description}</div>
                      </div>

                      <div>
                        <div className="text-muted-foreground">Invoice Date:</div>
                        <div className="font-medium text-foreground">{invoice.invoiceDate}</div>
                      </div>

                      <div>
                        <div className="text-muted-foreground">Client:</div>
                        <div className="font-semibold text-foreground">{invoice.client}</div>
                      </div>

                      <div>
                        <div className="text-muted-foreground">Due Date:</div>
                        <div className="font-medium text-foreground">{invoice.dueDate}</div>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Addresses & Delivery Info */}
                  <div className="bg-amber-50 px-6 py-4 border-r border-border">
                    <div className="space-y-4">
                      {/* Pickup Address */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-sm text-foreground">Pickup Address</span>
                        </div>
                        <div className="text-sm pl-6">
                          <div className="font-medium text-foreground">{invoice.pickupAddress.location}</div>
                          <div className="text-muted-foreground">{invoice.pickupAddress.address}</div>
                        </div>
                      </div>

                      {/* Delivery Address */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-green-600" />
                          <span className="font-semibold text-sm text-foreground">Delivery Address</span>
                        </div>
                        <div className="text-sm pl-6">
                          <div className="font-medium text-foreground">{invoice.deliveryAddress.location}</div>
                          <div className="text-muted-foreground">{invoice.deliveryAddress.address}</div>
                        </div>
                      </div>

                      {/* Delivery Date/Time */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-orange-600" />
                          <span className="font-semibold text-sm text-foreground">Delivery Date & Time</span>
                        </div>
                        <div className="text-sm pl-6 font-medium text-foreground">{invoice.deliveryDateTime}</div>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Order Items */}
                  <div className="bg-gray-50 px-6 py-4 border-r border-border">
                    <div className="space-y-4">
                      {/* Order Items */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Truck className="w-4 h-4 text-teal-600" />
                          <span className="font-semibold text-sm text-foreground">Order Items</span>
                        </div>

                        <div className="space-y-3 text-xs">
                          {invoice.orderItems.map((item, idx) => (
                            <div key={idx} className="pl-6 pb-3 border-b border-border last:border-0">
                              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                <div>
                                  <span className="text-muted-foreground">Qty:</span>
                                  <span className="font-medium text-foreground ml-1">{item.quantity}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">UOM:</span>
                                  <span className="font-medium text-foreground ml-1">{item.uom}</span>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-muted-foreground">Truck:</span>
                                  <span className="font-medium text-foreground ml-1">{item.truckType}</span>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-muted-foreground">Supplier ID:</span>
                                  <span className="font-medium text-foreground ml-1">{item.supplierId}</span>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-muted-foreground">Supplier Name:</span>
                                  <span className="font-medium text-foreground ml-1">{item.supplierName}</span>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-muted-foreground">Customer:</span>
                                  <span className="font-medium text-foreground ml-1">{item.customerDetails}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Time:</span>
                                  <span className="font-medium text-foreground ml-1">{item.deliveryTime}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Direct:</span>
                                  <span className="font-medium text-foreground ml-1">{item.direct}</span>
                                </div>
                                <div className="col-span-2 mt-1 pt-1 border-t border-gray-300">
                                  <span className="text-muted-foreground">Unit Cost:</span>
                                  <span className="font-medium text-foreground ml-1">
                                    {formatCurrency(item.unitCost)}
                                  </span>
                                  <span className="mx-2">×</span>
                                  <span className="text-muted-foreground">Amount:</span>
                                  <span className="font-semibold text-green-600 ml-1">
                                    {formatCurrency(item.amount)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-border space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal:</span>
                            <span className="font-medium">{formatCurrency(invoice.subtotal)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">GST (10%):</span>
                            <span className="font-medium">{formatCurrency(invoice.gst)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Column 4: Amount */}
                  <div className="bg-white px-6 py-4 flex flex-col items-end justify-center border-r border-border">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-1">Amount</div>
                      <div className="text-3xl font-bold text-green-600">{formatCurrency(invoice.total)}</div>
                      <div className="text-xs text-muted-foreground">AUD</div>
                    </div>
                  </div>

                  {/* Column 5: Actions Menu */}
                  <div className="bg-white p-4 flex items-start justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(invoice.id)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Download PDF</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSendInvoice(invoice)}>Send Invoice</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="bg-slate-800 px-6 py-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400">Status:</span>
                    <Badge
                      variant="outline"
                      className={`ml-2 ${statusColors[invoice.status as keyof typeof statusColors]}`}
                    >
                      {invoice.status}
                    </Badge>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => handleViewDetails(invoice.id)}>
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Send Invoice Modal */}
      <Dialog open={isSendModalOpen} onOpenChange={(open) => {
        setIsSendModalOpen(open)
        if (!open) setIsSent(false)
      }}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Send Invoice
            </DialogTitle>
            <DialogDescription>
              Send invoice {selectedInvoice?.id} to {selectedInvoice?.client}
            </DialogDescription>
          </DialogHeader>

          {isSent ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Invoice Sent Successfully</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Invoice {selectedInvoice?.id} has been sent to {emailRecipients.length} recipient{emailRecipients.length > 1 ? "s" : ""}.
                </p>
              </div>
              <Button onClick={() => setIsSendModalOpen(false)}>
                Done
              </Button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Invoice Summary */}
              <Card className="p-4 bg-muted/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Invoice</p>
                    <p className="font-semibold">{selectedInvoice?.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Client</p>
                    <p className="font-semibold">{selectedInvoice?.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Job</p>
                    <p className="font-semibold">{selectedInvoice?.jobNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="font-bold text-green-600">{selectedInvoice && formatCurrency(selectedInvoice.total)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant="outline" className={selectedInvoice ? statusColors[selectedInvoice.status as keyof typeof statusColors] : ""}>
                      {selectedInvoice?.status}
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Recipients */}
              <div className="space-y-2">
                <Label>Recipients</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {emailRecipients.map((email) => (
                    <Badge key={email} variant="secondary" className="gap-1 pr-1">
                      {email}
                      <button
                        type="button"
                        onClick={() => handleRemoveRecipient(email)}
                        className="ml-1 hover:bg-muted rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Add recipient email..."
                    value={newRecipient}
                    onChange={(e) => setNewRecipient(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddRecipient()
                      }
                    }}
                  />
                  <Button variant="outline" size="icon" onClick={handleAddRecipient} className="bg-transparent">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* CC Option */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cc-self-admin"
                  checked={ccSelf}
                  onCheckedChange={(checked) => setCcSelf(checked as boolean)}
                />
                <Label htmlFor="cc-self-admin" className="text-sm font-normal cursor-pointer">
                  CC myself (admin@njashton.com.au)
                </Label>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="admin-send-subject">Subject</Label>
                <Input
                  id="admin-send-subject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="admin-send-message">Message</Label>
                <Textarea
                  id="admin-send-message"
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  rows={10}
                  className="resize-none"
                />
              </div>

              {/* Attachment Option */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="attach-pdf-admin"
                  checked={attachPdf}
                  onCheckedChange={(checked) => setAttachPdf(checked as boolean)}
                />
                <Label htmlFor="attach-pdf-admin" className="text-sm font-normal cursor-pointer flex items-center gap-2">
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                  Attach invoice PDF ({selectedInvoice?.id}.pdf)
                </Label>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2 border-t">
                <Button variant="outline" onClick={() => setIsSendModalOpen(false)} className="bg-transparent">
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmSend}
                  disabled={isSending || emailRecipients.length === 0}
                  className="gap-2"
                >
                  {isSending ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Invoice
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
