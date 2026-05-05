"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreVertical, MapPin, Calendar, Truck } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

const mockPurchaseOrders = [
  {
    id: "PO-2024-001",
    poNumber: "PO-XL-8932",
    createdDate: "2024-01-10",
    orderedBy: "John Smith",
    orderedDate: "2024-01-10",
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
        quantity: 50,
        truckType: "10m³ Tipper",
        customerDetails: "George St Site - Gate 2",
        quarryCode: "BOR-MAR-001",
        deliveryTime: "08:00-12:00",
        uom: "Tonne",
        direct: "Yes",
        unitCost: 85.0,
        amount: 4250.0,
      },
      {
        quantity: 10,
        truckType: "8m³ Tipper",
        customerDetails: "George St Site - Gate 2",
        quarryCode: "BOR-MAR-002",
        deliveryTime: "13:00-15:00",
        uom: "Tonne",
        direct: "No",
        unitCost: 95.0,
        amount: 950.0,
      },
    ],
    subtotal: 5200.0,
    gst: 520.0,
    total: 5720.0,
    status: "Job Created",
    jobNumber: "JOB-2024-003",
  },
  {
    id: "PO-2024-002",
    poNumber: "PO-XL-8933",
    createdDate: "2024-01-12",
    orderedBy: "Sarah Johnson",
    orderedDate: "2024-01-12",
    description: "Aggregate transport for Beach Road site",
    pickupAddress: {
      location: "Hanson Aggregate",
      address: "123 Industrial Dr, Penrith NSW 2750",
    },
    deliveryAddress: {
      location: "Beach Road Development",
      address: "456 Beach Rd, Manly NSW 2095",
    },
    deliveryDateTime: "2024-01-18 07:00",
    orderItems: [
      {
        quantity: 30,
        truckType: "12m³ Tipper",
        customerDetails: "Beach Rd - Main Entry",
        quarryCode: "HAN-PEN-003",
        deliveryTime: "07:00-11:00",
        uom: "Tonne",
        direct: "Yes",
        unitCost: 90.0,
        amount: 2700.0,
      },
    ],
    subtotal: 2700.0,
    gst: 270.0,
    total: 2970.0,
    status: "New",
    jobNumber: null,
  },
]

const statusColors = {
  New: "bg-blue-100 text-blue-800 border-blue-200",
  "Job Created": "bg-amber-100 text-amber-800 border-amber-200",
  Invoiced: "bg-green-100 text-green-800 border-green-200",
}

export function PurchaseOrdersTable() {
  const router = useRouter()

  const handleViewDetails = (poId: string) => {
    router.push(`/dashboard/finance/purchase-orders/${poId}`)
  }

  return (
    <div className="space-y-4">
      {mockPurchaseOrders.map((po) => (
        <Card key={po.id} className="p-0 overflow-hidden">
          <div className="grid grid-cols-[280px_1fr_1fr_50px]">
            {/* Column 1: PO Details */}
            <div className="bg-blue-50 px-6 py-4 border-r border-border">
              <h3 className="text-xl font-bold text-primary mb-4">{po.id}</h3>

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
                  <div className="text-muted-foreground">Ordered By:</div>
                  <div className="font-medium text-foreground">{po.orderedBy}</div>
                </div>

                {po.jobNumber && (
                  <div>
                    <div className="text-muted-foreground">Job Number:</div>
                    <div className="font-semibold text-primary">{po.jobNumber}</div>
                  </div>
                )}

                <div className="pt-2">
                  <Badge variant="outline" className={statusColors[po.status as keyof typeof statusColors]}>
                    {po.status}
                  </Badge>
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
                            <span className="text-muted-foreground">Quarry:</span>
                            <span className="font-medium text-foreground ml-1">{item.quarryCode}</span>
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
                            <span className="font-medium text-foreground ml-1">${item.unitCost.toFixed(2)}</span>
                            <span className="mx-2">×</span>
                            <span className="text-muted-foreground">Amount:</span>
                            <span className="font-semibold text-green-600 ml-1">${item.amount.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="pt-3 border-t-2 border-border space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium text-foreground">${po.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST (10%):</span>
                    <span className="font-medium text-foreground">${po.gst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="font-semibold text-foreground">Total:</span>
                    <span className="text-xl font-bold text-green-600">${po.total.toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">AUD</div>
                </div>
              </div>
            </div>

            {/* Column 4: Menu */}
            <div className="bg-gray-50 px-3 py-4 flex items-start justify-center pt-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleViewDetails(po.id)}>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Download PDF</DropdownMenuItem>
                  <DropdownMenuItem>Edit PO</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Cancel PO</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="bg-slate-800 px-6 py-3 flex items-center justify-end -mt-6">
            <Button variant="secondary" size="sm" onClick={() => handleViewDetails(po.id)}>
              View Details
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
