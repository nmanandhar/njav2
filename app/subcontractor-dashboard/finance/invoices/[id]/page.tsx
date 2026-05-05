import { DashboardTopNav } from "@/components/subcontractor/dashboard-topnav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Calendar, Truck, FileText, Download, Printer, Mail } from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"

const invoicesData = {
  "RCTI-2024-01": {
    id: "RCTI-2024-01",
    invoiceNumber: "RCTI-2024-01",
    jobNumber: "JOB-2024-016",
    description: "Sand delivery to Development Site",
    driverName: "David Lee",
    invoiceDate: "2024-01-17",
    dueDate: "2024-02-16",
    paidDate: "2024-01-25",
    pickupAddress: {
      location: "Sydney Sand Supplies",
      address: "12 Quarry Rd, Penrith NSW 2750",
    },
    deliveryAddress: {
      location: "Development Site",
      address: "890 Commercial Dr, Sydney NSW 2000",
    },
    deliveryDateTime: "2024-01-17 07:00",
    orderItems: [
      {
        quantity: 30,
        truckType: "10m\u00B3 Tipper",
        customerDetails: "Development Site - Bay 3",
        supplierId: "SYD-SND-001",
        supplierName: "Sydney Sand Supplies",
        deliveryTime: "07:00-11:00",
        uom: "Tonne",
        direct: "Yes",
        unitCost: 65.0,
        amount: 1950.0,
      },
    ],
    subtotal: 1950.0,
    gst: 195.0,
    total: 2145.0,
    status: "Paid",
    paymentMethod: "Bank Transfer",
    notes: "Payment received in full. Thank you for your business.",
  },
  "RCTI-2024-02": {
    id: "RCTI-2024-02",
    invoiceNumber: "RCTI-2024-02",
    jobNumber: "JOB-2024-015",
    description: "Gravel delivery to Industrial Site",
    driverName: "Tom Brown",
    invoiceDate: "2024-01-18",
    dueDate: "2024-02-17",
    paidDate: null,
    pickupAddress: {
      location: "Metro Gravel Pit",
      address: "88 Industrial Way, Auburn NSW 2144",
    },
    deliveryAddress: {
      location: "Industrial Site",
      address: "567 Industrial Blvd, Sydney NSW 2000",
    },
    deliveryDateTime: "2024-01-18 08:00",
    orderItems: [
      {
        quantity: 25,
        truckType: "8m\u00B3 Tipper",
        customerDetails: "Industrial Site - Loading Dock B",
        supplierId: "MET-GRV-003",
        supplierName: "Metro Gravel Supplies",
        deliveryTime: "08:00-12:00",
        uom: "Tonne",
        direct: "Yes",
        unitCost: 74.0,
        amount: 1850.0,
      },
    ],
    subtotal: 1850.0,
    gst: 185.0,
    total: 2035.0,
    status: "Outstanding",
    paymentMethod: null,
    notes: "Payment due within 30 days of invoice date.",
  },
  "RCTI-2024-03": {
    id: "RCTI-2024-03",
    invoiceNumber: "RCTI-2024-03",
    jobNumber: "JOB-2024-014",
    description: "Concrete delivery to Office Tower",
    driverName: "Sarah Johnson",
    invoiceDate: "2024-01-12",
    dueDate: "2024-02-11",
    paidDate: "2024-01-20",
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
        customerDetails: "Office Tower - Basement Pour",
        supplierId: "HAN-BLK-005",
        supplierName: "Hanson Concrete Blacktown",
        deliveryTime: "06:00-10:00",
        uom: "m\u00B3",
        direct: "Yes",
        unitCost: 130.0,
        amount: 3250.0,
      },
    ],
    subtotal: 3250.0,
    gst: 325.0,
    total: 3575.0,
    status: "Paid",
    paymentMethod: "Bank Transfer",
    notes: "Payment received in full.",
  },
  "RCTI-2024-04": {
    id: "RCTI-2024-04",
    invoiceNumber: "RCTI-2024-04",
    jobNumber: "JOB-2024-013",
    description: "Aggregate supply to Highway Project",
    driverName: "James Carter",
    invoiceDate: "2024-01-05",
    dueDate: "2024-02-04",
    paidDate: null,
    pickupAddress: {
      location: "Carter Aggregates",
      address: "55 Mining Rd, Lithgow NSW 2790",
    },
    deliveryAddress: {
      location: "Highway Project Site",
      address: "321 Highway Rd, Perth WA 6000",
    },
    deliveryDateTime: "2024-01-05 09:00",
    orderItems: [
      {
        quantity: 35,
        truckType: "10m\u00B3 Tipper",
        customerDetails: "Highway Project - Section C",
        supplierId: "CAR-AGG-010",
        supplierName: "Carter Aggregates Lithgow",
        deliveryTime: "09:00-14:00",
        uom: "Tonne",
        direct: "No",
        unitCost: 70.0,
        amount: 2450.0,
      },
    ],
    subtotal: 2450.0,
    gst: 245.0,
    total: 2695.0,
    status: "Overdue",
    paymentMethod: null,
    notes: "Payment overdue. Please remit immediately.",
  },
}

const statusColors = {
  Paid: "bg-green-100 text-green-800 border-green-200",
  Outstanding: "bg-amber-100 text-amber-800 border-amber-200",
  Overdue: "bg-red-100 text-red-800 border-red-200",
}

export default async function SubcontractorInvoiceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const invoice = invoicesData[id as keyof typeof invoicesData]

  if (!invoice) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardTopNav />
        <div className="p-6">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold">Invoice not found</h2>
            <p className="text-muted-foreground mt-2">The invoice you are looking for does not exist.</p>
            <Link href="/subcontractor-dashboard/finance/invoices">
              <Button className="mt-4">Back to Invoices</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardTopNav />

      {/* Breadcrumb */}
      <div className="bg-background border-b border-border px-6 py-3">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/subcontractor-dashboard" className="text-muted-foreground hover:text-foreground">
            Dashboard
          </Link>
          <span className="text-muted-foreground">&rsaquo;</span>
          <Link href="/subcontractor-dashboard/finance/invoices" className="text-orange-500 font-medium hover:text-orange-600">
            Finance
          </Link>
          <span className="text-muted-foreground">&rsaquo;</span>
          <Link href="/subcontractor-dashboard/finance/invoices" className="text-muted-foreground hover:text-foreground">
            Invoices
          </Link>
          <span className="text-muted-foreground">&rsaquo;</span>
          <span className="text-foreground font-medium">{invoice.invoiceNumber}</span>
        </div>
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/subcontractor-dashboard/finance/invoices">
              <Button variant="outline" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">{invoice.invoiceNumber}</h1>
              <p className="text-muted-foreground">{invoice.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <Badge
            variant="outline"
            className={`${statusColors[invoice.status as keyof typeof statusColors]} text-sm px-3 py-1`}
          >
            {invoice.status}
          </Badge>
        </div>

        <div className="grid gap-6">
          {/* Recipient Created Tax Invoice Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Recipient Created Tax Invoice</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Invoice Number</div>
                <div className="font-semibold">{invoice.invoiceNumber}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Job Number</div>
                <div className="font-semibold">{invoice.jobNumber}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Driver</div>
                <div className="font-semibold">{invoice.driverName}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Invoice Date</div>
                <div className="font-semibold">{invoice.invoiceDate}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Due Date</div>
                <div className="font-semibold">{invoice.dueDate}</div>
              </div>
              {invoice.paidDate && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Paid Date</div>
                  <div className="font-semibold text-green-600">{invoice.paidDate}</div>
                </div>
              )}
              {invoice.paymentMethod && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Payment Method</div>
                  <div className="font-semibold">{invoice.paymentMethod}</div>
                </div>
              )}
            </div>
          </Card>

          {/* Addresses */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">Pickup Address</h3>
              </div>
              <div>
                <div className="font-medium">{invoice.pickupAddress.location}</div>
                <div className="text-sm text-muted-foreground">{invoice.pickupAddress.address}</div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold">Delivery Address</h3>
              </div>
              <div>
                <div className="font-medium">{invoice.deliveryAddress.location}</div>
                <div className="text-sm text-muted-foreground">{invoice.deliveryAddress.address}</div>
              </div>
            </Card>
          </div>

          {/* Delivery Date & Time */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold">Delivery Date & Time</h3>
            </div>
            <div className="font-medium">{invoice.deliveryDateTime}</div>
          </Card>

          {/* Order Items */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-5 h-5 text-teal-600" />
              <h3 className="font-semibold">Order Items</h3>
            </div>

            <div className="space-y-4">
              {invoice.orderItems.map((item, idx) => (
                <div key={idx} className="border border-border rounded-lg p-4">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Supplier ID</div>
                      <div className="font-medium">{item.supplierId}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Supplier Name</div>
                      <div className="font-medium">{item.supplierName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Quantity</div>
                      <div className="font-medium">
                        {item.quantity} {item.uom}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Truck Type</div>
                      <div className="font-medium">{item.truckType}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Customer Details</div>
                      <div className="font-medium">{item.customerDetails}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Delivery Time</div>
                      <div className="font-medium">{item.deliveryTime}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Direct</div>
                      <div className="font-medium">{item.direct}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">Unit Cost:</span>
                      <span className="font-medium">{formatCurrency(item.unitCost)}</span>
                      <span className="text-muted-foreground">x</span>
                      <span className="font-medium">{item.quantity}</span>
                    </div>
                    <div className="text-lg font-bold text-green-600">{formatCurrency(item.amount)}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Financial Summary */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Financial Summary</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-lg">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-semibold">{formatCurrency(invoice.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-lg">
                <span className="text-muted-foreground">GST (10%):</span>
                <span className="font-semibold">{formatCurrency(invoice.gst)}</span>
              </div>
              <div className="border-t border-border pt-3 flex items-center justify-between">
                <span className="text-xl font-bold">Total:</span>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">{formatCurrency(invoice.total)}</div>
                  <div className="text-sm text-muted-foreground">AUD</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Notes */}
          {invoice.notes && (
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Notes</h3>
              <p className="text-muted-foreground">{invoice.notes}</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
