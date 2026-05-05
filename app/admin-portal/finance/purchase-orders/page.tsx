"use client"

import { AdminFinanceHeader } from "@/components/admin/admin-finance-header"
import { Button } from "@/components/ui/button"
import { PlusCircle, Search, Download, Filter, FileEdit, MapPin, Calendar, Truck, MoreVertical } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { AdminPOTemplateEditor } from "@/components/admin/admin-po-template-editor"
import { CreatePODialog, type POFormData } from "@/components/admin/create-po-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { formatCurrency } from "@/lib/utils"
import { EditPODialog, type PurchaseOrder } from "@/components/admin/edit-po-dialog"

const purchaseOrders = [
  {
    id: "SPO-2024-001",
    poType: "supplier" as const,
    poNumber: "PO-XL-8932",
    createdDate: "2024-01-10",
    client: "N J Ashton",
    orderedBy: "John Smith",
    description: "Material delivery for George St project",
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
        productName: "Concrete Mix",
        quantity: 50,
        truckType: "10m³ Tipper",
        customerDetails: "George St Site - Gate 2",
        supplierId: "BOR-MAR-001",
        supplierName: "Boral Quarry Maroota",
        deliveryTime: "08:00-12:00",
        uom: "Tonne",
        unitCost: 85.0,
        amount: 4250.0,
      },
      {
        productName: "Sand & Gravel",
        quantity: 3,
        truckType: "8m³ Tipper",
        customerDetails: "George St Site - Gate 2",
        supplierId: "BOR-MAR-002",
        supplierName: "Boral Sand & Gravel Depot",
        deliveryTime: "13:00-15:00",
        uom: "Load",
        unitCost: 90.0,
        amount: 270.0,
      },
    ],
    subtotal: 4520.0,
    gst: 452.0,
    total: 4972.0,
    status: "In Progress",
    jobNumber: "JOB-2024-003",
  },
  {
    id: "PO-2024-002",
    poType: "client" as const,
    poNumber: "PO-XL-8945",
    createdDate: "2024-01-08",
    client: "Melbourne Infrastructure",
    orderedBy: "Sarah Johnson",
    description: "Concrete transport services",
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
        productName: "Premix Concrete",
        quantity: 25,
        truckType: "Concrete Agitator",
        customerDetails: "Parramatta Tower - Basement Pour",
        supplierId: "HAN-BLK-005",
        supplierName: "Hanson Concrete Blacktown",
        deliveryTime: "06:00-10:00",
        uom: "m³",
        unitCost: 130.0,
        amount: 3250.0,
      },
    ],
    subtotal: 3250.0,
    gst: 325.0,
    total: 3575.0,
    status: "Invoiced",
    jobNumber: "JOB-2024-001",
    invoiceNumber: "INV-2024-001",
  },
  {
    id: "PO-2024-003",
    poType: "client" as const,
    poNumber: "PO-XL-8967",
    createdDate: "2024-01-12",
    client: "Brisbane Developments",
    orderedBy: "Mike Chen",
    description: "Equipment rental and transport",
    pickupAddress: {
      location: "Central Equipment Depot",
      address: "88 Logistics Way, Eastern Creek NSW 2766",
    },
    deliveryAddress: {
      location: "North Shore Development",
      address: "234 Pacific Hwy, Chatswood NSW 2067",
    },
    deliveryDateTime: "2024-01-20 09:00",
    orderItems: [
      {
        productName: "Excavator Rental",
        quantity: 2,
        truckType: "Low Loader",
        customerDetails: "Chatswood Site - Equipment Bay",
        supplierId: "EQP-CEN-012",
        supplierName: "Central Equipment Hire",
        deliveryTime: "09:00-11:00",
        uom: "Unit",
        unitCost: 3400.0,
        amount: 6800.0,
      },
    ],
    subtotal: 6800.0,
    gst: 680.0,
    total: 7480.0,
    status: "New",
    jobNumber: null,
  },
]

const statusColors = {
  New: "bg-blue-100 text-blue-800 border-blue-200",
  "Job Created": "bg-amber-100 text-amber-800 border-amber-200",
  "In Progress": "bg-purple-100 text-purple-800 border-purple-200",
  Invoiced: "bg-green-100 text-green-800 border-green-200",
}

export default function AdminPurchaseOrdersPage() {
  const router = useRouter()
  const [templateEditorOpen, setTemplateEditorOpen] = useState(false)
  const [createPOOpen, setCreatePOOpen] = useState(false)
  const [editPOOpen, setEditPOOpen] = useState(false)
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null)

  const handleViewDetails = (poId: string) => {
    router.push(`/admin-portal/finance/purchase-orders/${poId}`)
  }

  const handleCreatePO = (poData: POFormData) => {
    console.log("[v0] Creating new PO:", poData)
    alert("Purchase Order created successfully! (This is a placeholder - implement actual creation logic)")
  }

  const handleEditPO = (po: PurchaseOrder) => {
    setSelectedPO(po)
    setEditPOOpen(true)
  }

  const handleUpdatePO = (poId: string, poData: POFormData) => {
    console.log("[v0] Updating PO:", poId, poData)
    alert("Purchase Order updated successfully! (This is a placeholder - implement actual update logic)")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background border-b border-border px-6 py-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-orange-500 font-medium">Finance</span>
          <span className="text-muted-foreground">›</span>
          <span className="text-foreground">Purchase Orders</span>
        </div>
      </div>

      <AdminFinanceHeader />

      <div className="p-6">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type="search" placeholder="Search by PO number, description..." className="pl-10" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setTemplateEditorOpen(true)}>
              <FileEdit className="w-4 h-4 mr-2" />
              View/Edit Template
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm" onClick={() => setCreatePOOpen(true)}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Create PO
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {purchaseOrders.map((po) => (
            <Card key={po.id} className="p-0 overflow-hidden">
              <div className="flex flex-col">
                <div className="grid grid-cols-[280px_1fr_1fr_240px_60px]">
                  {/* Column 1: PO Details */}
                  <div className="bg-blue-50 px-6 py-4 border-r border-border">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-primary">{po.id}</h3>
                      <Badge
                        variant="outline"
                        className={
                          po.poType === "supplier"
                            ? "bg-amber-100 text-amber-800 border-amber-300 text-xs whitespace-nowrap"
                            : "bg-blue-100 text-blue-800 border-blue-300 text-xs whitespace-nowrap"
                        }
                      >
                        {po.poType === "supplier" ? "Supplier PO" : "Client PO"}
                      </Badge>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="text-muted-foreground">PO Number:</div>
                        <div className="font-semibold text-foreground">{po.poNumber}</div>
                      </div>

                      <div>
                        <div className="text-muted-foreground">Description:</div>
                        <div className="font-medium text-foreground">{po.description}</div>
                      </div>

                      <div>
                        <div className="text-muted-foreground">Created Date:</div>
                        <div className="font-medium text-foreground">{po.createdDate}</div>
                      </div>

                      <div>
                        <div className="text-muted-foreground">Client:</div>
                        <div className="font-semibold text-foreground">{po.client}</div>
                      </div>

                      <div>
                        <div className="text-muted-foreground">Ordered By:</div>
                        <div className="font-medium text-foreground">{po.orderedBy}</div>
                      </div>

                      {po.jobNumber && (
                        <div>
                          <div className="text-muted-foreground">Job Number:</div>
                          <div className="font-semibold text-primary">{po.jobNumber}</div>
                        </div>
                      )}

                      {po.invoiceNumber && (
                        <div>
                          <div className="text-muted-foreground">Invoice Number:</div>
                          <div className="font-semibold text-green-600">{po.invoiceNumber}</div>
                        </div>
                      )}
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
                          <div className="font-medium text-foreground">{po.pickupAddress.location}</div>
                          <div className="text-muted-foreground">{po.pickupAddress.address}</div>
                        </div>
                      </div>

                      {/* Delivery Address */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-green-600" />
                          <span className="font-semibold text-sm text-foreground">Delivery Address</span>
                        </div>
                        <div className="text-sm pl-6">
                          <div className="font-medium text-foreground">{po.deliveryAddress.location}</div>
                          <div className="text-muted-foreground">{po.deliveryAddress.address}</div>
                        </div>
                      </div>

                      {/* Delivery Date/Time */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-orange-600" />
                          <span className="font-semibold text-sm text-foreground">Delivery Date & Time</span>
                        </div>
                        <div className="text-sm pl-6 font-medium text-foreground">{po.deliveryDateTime}</div>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Order Items & Totals */}
                  <div className="bg-gray-50 px-6 py-4 border-r border-border">
                    <div className="space-y-4">
                      {/* Order Items */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Truck className="w-4 h-4 text-teal-600" />
                          <span className="font-semibold text-sm text-foreground">Order Items</span>
                        </div>

                        <div className="space-y-3 text-xs">
                          {po.orderItems.map((item, idx) => (
                            <div key={idx} className="pl-6 pb-3 border-b border-border last:border-0">
                              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                <div className="col-span-2">
                                  <span className="text-muted-foreground">Supplier ID:</span>
                                  <span className="font-medium text-foreground ml-1">{item.supplierId}</span>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-muted-foreground">Supplier Name:</span>
                                  <span className="font-medium text-foreground ml-1">{item.supplierName}</span>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-muted-foreground">Product:</span>
                                  <span className="font-semibold text-teal-700 ml-1">{item.productName}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Qty:</span>
                                  <span className="font-medium text-foreground ml-1">{item.quantity}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Unit Cost:</span>
                                  <span className="font-medium text-foreground ml-1">
                                    {formatCurrency(item.unitCost)}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">UOM:</span>
                                  <span className="font-medium text-foreground ml-1">{item.uom}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Truck:</span>
                                  <span className="font-medium text-foreground ml-1">{item.truckType}</span>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-muted-foreground">Customer:</span>
                                  <span className="font-medium text-foreground ml-1">{item.customerDetails}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Time:</span>
                                  <span className="font-medium text-foreground ml-1">{item.deliveryTime}</span>
                                </div>
                                <div className="col-span-2 mt-1 pt-1 border-t border-gray-300">
                                  <span className="text-muted-foreground">Amount:</span>
                                  <span className="font-semibold text-green-600 ml-1">
                                    {formatCurrency(item.amount)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Column 4: Amount */}
                  <div className="bg-white px-6 py-4 flex flex-col items-end justify-center border-r border-border">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-1">Amount</div>
                      <div className="text-3xl font-bold text-green-600">{formatCurrency(po.total)}</div>
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
                        <DropdownMenuItem onClick={() => handleViewDetails(po.id)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Download PDF</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditPO(po as PurchaseOrder)}>Edit PO</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Cancel PO</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="bg-slate-800 px-6 py-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400">Status:</span>
                    <Badge variant="outline" className={`ml-2 ${statusColors[po.status as keyof typeof statusColors]}`}>
                      {po.status}
                    </Badge>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => handleViewDetails(po.id)}>
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <AdminPOTemplateEditor open={templateEditorOpen} onOpenChange={setTemplateEditorOpen} />
      <CreatePODialog open={createPOOpen} onOpenChange={setCreatePOOpen} onCreatePO={handleCreatePO} />
      <EditPODialog open={editPOOpen} onOpenChange={setEditPOOpen} onUpdatePO={handleUpdatePO} poData={selectedPO} />
    </div>
  )
}
