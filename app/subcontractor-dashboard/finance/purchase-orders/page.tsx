"use client"

import { SubcontractorFinanceHeader } from "@/components/subcontractor/finance-header"
import { DashboardTopNav } from "@/components/subcontractor/dashboard-topnav"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Download, MoreVertical, Calendar, MapPin, Truck, FileText } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

const purchaseOrders = [
  {
    id: "SPO-2024-001",
    poType: "supplier" as const,
    poNumber: "PO-XL-8932",
    createdDate: "2024-01-10",
    client: "N J Ashton",
    orderedBy: "John Smith",
    jobNumber: "JOB-2024-003",
    description: "Material delivery for George St project",
    pickupAddress: "Boral Quarry",
    pickupFullAddress: "45 Quarry Road, Maroota NSW 2756",
    deliveryAddress: "George St Construction Site",
    deliveryFullAddress: "789 Warehouse Rd, Sydney NSW 2000",
    deliveryDateTime: "2024-01-15 08:00",
    orderItems: [
      {
        productName: "Concrete Mix",
        quantity: 50,
        truckType: "10m\u00B3 Tipper",
        customerDetails: "George St Site - Gate 2",
        supplierId: "BOR-MAR-001",
        supplierName: "Boral Quarry Maroota",
        deliveryTime: "08:00-12:00",
        uom: "Tonne",
        unitCost: 85.0,
        amount: 4250.0,
      },
    ],
    subtotal: 4520.0,
    gst: 452.0,
    total: 4972.0,
    status: "Active",
  },
  {
    id: "PO-2024-002",
    poType: "client" as const,
    poNumber: "PO-XL-8945",
    createdDate: "2024-01-08",
    client: "Melbourne Infrastructure",
    orderedBy: "Sarah Wilson",
    jobNumber: "JOB-2024-001",
    description: "Concrete supply for Parramatta project",
    pickupAddress: "Hanson Concrete Plant",
    pickupFullAddress: "23 Industrial Ave, Blacktown NSW 2148",
    deliveryAddress: "Parramatta Office Tower",
    deliveryFullAddress: "150 Church St, Parramatta NSW 2150",
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
        uom: "m\u00B3",
        unitCost: 130.0,
        amount: 3250.0,
      },
    ],
    subtotal: 3250.0,
    gst: 325.0,
    total: 3575.0,
    status: "Completed",
  },
]

const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-800 border-green-200",
  Completed: "bg-blue-100 text-blue-800 border-blue-200",
  New: "bg-amber-100 text-amber-800 border-amber-200",
  Cancelled: "bg-red-100 text-red-800 border-red-200",
}

export default function SubcontractorPurchaseOrdersPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardTopNav />
      <SubcontractorFinanceHeader />

      <div className="p-6 space-y-6">
        {/* Search and Actions Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input type="text" placeholder="Search by PO number, description..." className="pl-9" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Purchase Orders */}
        <div className="space-y-4">
          {purchaseOrders.map((po) => (
            <Card key={po.id} className="overflow-hidden border border-border">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Column 1: PO Details */}
                <div className="bg-blue-50 px-6 py-4 border-r border-border lg:col-span-3">
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

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">PO Number:</span>
                      <div className="font-semibold">{po.poNumber}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Description:</span>
                      <div className="font-medium">{po.description}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Created Date:</span>
                      <div className="font-semibold">{po.createdDate}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Client:</span>
                      <div className="font-semibold">{po.client}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Job Number:</span>
                      <div className="font-semibold text-primary">{po.jobNumber}</div>
                    </div>
                  </div>
                </div>

                {/* Column 2: Addresses */}
                <div className="px-6 py-4 border-r border-border lg:col-span-3 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold mb-1">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <span>Pickup Address</span>
                    </div>
                    <div className="text-sm font-medium">{po.pickupAddress}</div>
                    <div className="text-xs text-muted-foreground">{po.pickupFullAddress}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold mb-1">
                      <MapPin className="h-4 w-4 text-green-500" />
                      <span>Delivery Address</span>
                    </div>
                    <div className="text-sm font-medium">{po.deliveryAddress}</div>
                    <div className="text-xs text-muted-foreground">{po.deliveryFullAddress}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold mb-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Delivery Date & Time</span>
                    </div>
                    <div className="text-sm font-medium">{po.deliveryDateTime}</div>
                  </div>
                </div>

                {/* Column 3: Order Items */}
                <div className="px-6 py-4 border-r border-border lg:col-span-4">
                  <div className="flex items-center gap-2 text-sm font-semibold mb-3">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <span>Order Items</span>
                  </div>
                  {po.orderItems.map((item, idx) => (
                    <div key={idx} className="text-sm space-y-1 mb-3 last:mb-0">
                      <div className="grid grid-cols-2 gap-x-4">
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
                          <span className="font-medium text-foreground ml-1">{item.productName}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Qty:</span>
                          <span className="font-medium text-foreground ml-1">{item.quantity}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Unit Cost:</span>
                          <span className="font-medium text-foreground ml-1">${item.unitCost.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">UOM:</span>
                          <span className="font-medium text-foreground ml-1">{item.uom}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Truck:</span>
                          <span className="font-medium text-foreground ml-1">{item.truckType}</span>
                        </div>
                      </div>
                      <div className="pt-1 border-t mt-2">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-semibold text-green-600 ml-1">${item.amount.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Column 4: Total and Actions */}
                <div className="px-6 py-4 lg:col-span-2 flex flex-col justify-between items-end">
                  <div className="text-right space-y-2">
                    <div className="text-sm text-muted-foreground">Amount</div>
                    <div className="text-3xl font-bold text-green-600">{formatCurrency(po.total)}</div>
                    <div className="text-xs text-muted-foreground">AUD</div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Download PDF</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Status Bar */}
              <div className="bg-sidebar px-6 py-3 flex items-center justify-between border-t border-border">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge variant="outline" className={statusColors[po.status] || ""}>
                    {po.status}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
