"use client"

import { DashboardTopNav } from "@/components/dashboard/dashboard-topnav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, FileEdit, MapPin, Calendar, Truck, User, Building2, Hash, Clock } from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"
import { EditPODialog } from "@/components/client/edit-po-dialog"
import { useState } from "react"

const statusColors = {
  New: "bg-blue-100 text-blue-800 border-blue-200",
  "Job Created": "bg-amber-100 text-amber-800 border-amber-200",
  Invoiced: "bg-green-100 text-green-800 border-green-200",
}

export default function PurchaseOrderDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // Mock data - in production, fetch by ID
  const purchaseOrderDetails = {
    id: "PO-2024-001",
    poNumber: "PO-XL-8932",
    createdDate: "2024-01-10",
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
        quarryCode: "BOR-MAR-001",
        deliveryTime: "08:00-12:00",
        uom: "Tonne",
        unitCost: 85.0,
        amount: 4250.0,
      },
      {
        productName: "Gravel 20mm",
        quantity: 3,
        truckType: "8m³ Tipper",
        customerDetails: "George St Site - Gate 2",
        quarryCode: "BOR-MAR-002",
        deliveryTime: "13:00-15:00",
        uom: "Load",
        unitCost: 90.0,
        amount: 270.0,
      },
    ],
    subtotal: 4520.0,
    gst: 452.0,
    total: 4972.0,
    status: "Job Created",
    jobNumber: "JOB-2024-003",
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardTopNav />

      <div className="bg-background border-b border-border px-6 py-3">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/dashboard/finance/purchase-orders" className="text-orange-500 font-medium hover:underline">
            Finance
          </Link>
          <span className="text-muted-foreground">›</span>
          <Link href="/dashboard/finance/purchase-orders" className="text-foreground hover:underline">
            Purchase Orders
          </Link>
          <span className="text-muted-foreground">›</span>
          <span className="text-foreground">{id}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/dashboard/finance/purchase-orders">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Purchase Orders
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)}>
              <FileEdit className="w-4 h-4 mr-2" />
              Edit PO
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Header Card */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-primary mb-2">{purchaseOrderDetails.id}</h1>
                <p className="text-muted-foreground">{purchaseOrderDetails.description}</p>
              </div>
              <Badge
                variant="outline"
                className={`${statusColors[purchaseOrderDetails.status as keyof typeof statusColors]} text-base px-4 py-1`}
              >
                {purchaseOrderDetails.status}
              </Badge>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Hash className="w-4 h-4" />
                  PO Number
                </div>
                <div className="font-semibold text-lg">{purchaseOrderDetails.poNumber}</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Calendar className="w-4 h-4" />
                  Created Date
                </div>
                <div className="font-semibold text-lg">{purchaseOrderDetails.createdDate}</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <User className="w-4 h-4" />
                  Ordered By
                </div>
                <div className="font-semibold text-lg">{purchaseOrderDetails.orderedBy}</div>
              </div>
              {purchaseOrderDetails.jobNumber && (
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Building2 className="w-5 h-5 text-primary" />
                    Job Number
                  </div>
                  <div className="font-semibold text-lg text-primary">{purchaseOrderDetails.jobNumber}</div>
                </div>
              )}
            </div>
          </Card>

          {/* Addresses & Delivery Card */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Pickup Address</span>
                </div>
                <div className="pl-7">
                  <div className="font-medium text-lg">{purchaseOrderDetails.pickupAddress.location}</div>
                  <div className="text-muted-foreground">{purchaseOrderDetails.pickupAddress.address}</div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">Delivery Address</span>
                </div>
                <div className="pl-7">
                  <div className="font-medium text-lg">{purchaseOrderDetails.deliveryAddress.location}</div>
                  <div className="text-muted-foreground">{purchaseOrderDetails.deliveryAddress.address}</div>
                </div>
              </div>

              <div className="col-span-2">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold">Delivery Date & Time</span>
                </div>
                <div className="pl-7 font-medium text-lg">{purchaseOrderDetails.deliveryDateTime}</div>
              </div>
            </div>
          </Card>

          {/* Order Items Card */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-teal-600" />
              Order Items
            </h2>
            <div className="space-y-4">
              {purchaseOrderDetails.orderItems.map((item, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-border">
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Quarry Code</div>
                      <div className="font-semibold">{item.quarryCode}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Product Name</div>
                      <div className="font-semibold text-teal-600">{item.productName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Quantity</div>
                      <div className="font-semibold text-lg">{item.quantity}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Unit Cost</div>
                      <div className="font-semibold">{formatCurrency(item.unitCost)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">UOM</div>
                      <div className="font-semibold">{item.uom}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Truck Type</div>
                      <div className="font-semibold">{item.truckType}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-sm text-muted-foreground mb-1">Customer Details</div>
                      <div className="font-semibold">{item.customerDetails}</div>
                    </div>
                    <div className="col-span-2 flex items-end justify-end">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground mb-1">Amount</div>
                        <div className="font-bold text-lg text-green-600">{formatCurrency(item.amount)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Totals Card */}
          <Card className="p-6">
            <div className="max-w-md ml-auto space-y-3">
              <div className="flex justify-between text-lg">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-semibold">{formatCurrency(purchaseOrderDetails.subtotal)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-muted-foreground">GST (10%):</span>
                <span className="font-semibold">{formatCurrency(purchaseOrderDetails.gst)}</span>
              </div>
              <div className="pt-3 border-t-2 border-border flex justify-between">
                <span className="text-xl font-bold">Total:</span>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">{formatCurrency(purchaseOrderDetails.total)}</div>
                  <div className="text-sm text-muted-foreground">AUD</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Edit PO dialog */}
      <EditPODialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        purchaseOrder={purchaseOrderDetails}
        onUpdatePO={(updatedPO) => {
          console.log("PO updated:", updatedPO)
          setIsEditDialogOpen(false)
        }}
      />
    </div>
  )
}
