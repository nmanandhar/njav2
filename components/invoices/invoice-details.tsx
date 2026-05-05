"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, Send, FileText, MapPin, User, Package } from "lucide-react"

interface InvoiceDetailsProps {
  invoiceId: string
}

// Mock invoice detail data
const mockInvoiceDetail = {
  id: "INV-2024-001",
  invoiceNumber: "INV-2024-001",
  status: "Paid",
  jobNumber: "JOB-2024-001",
  createdAt: "2024-01-15",
  dueDate: "2024-02-14",
  paidDate: "2024-01-28",
  amount: 2450.0,
  tax: 245.0,
  total: 2695.0,
  client: {
    name: "ABC Construction Ltd",
    address: "123 Business Park, City, State 12345",
    email: "billing@abcconstruction.com",
    phone: "+1 (555) 987-6543",
  },
  job: {
    description: "Concrete delivery to Construction Site Alpha",
    driver: "John Smith",
    location: "123 Construction Ave, City",
    material: "Concrete Mix - High-strength, 4000 PSI",
    quantity: "15 cubic yards",
    dropSite: "Site Alpha",
    tipSite: "Tip Point 1",
    completedAt: "2024-01-15T14:30:00Z",
  },
  lineItems: [
    {
      description: "Concrete Mix Delivery",
      quantity: 15,
      unit: "cubic yards",
      rate: 120.0,
      amount: 1800.0,
    },
    {
      description: "Transportation Fee",
      quantity: 1,
      unit: "trip",
      rate: 350.0,
      amount: 350.0,
    },
    {
      description: "Site Access Fee",
      quantity: 1,
      unit: "fee",
      rate: 300.0,
      amount: 300.0,
    },
  ],
  paymentHistory: [
    {
      date: "2024-01-28",
      amount: 2695.0,
      method: "Bank Transfer",
      reference: "TXN-789456123",
      status: "Completed",
    },
  ],
}

export function InvoiceDetails({ invoiceId }: InvoiceDetailsProps) {
  const handleDownloadPDF = () => {
    console.log(`Downloading PDF for ${invoiceId}`)
  }

  const handleSendInvoice = () => {
    console.log(`Sending invoice ${invoiceId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Invoices
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{mockInvoiceDetail.invoiceNumber}</h1>
              <p className="text-muted-foreground">Invoice Details & Payment Status</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={mockInvoiceDetail.status === "Paid" ? "default" : "destructive"}>
              {mockInvoiceDetail.status}
            </Badge>
            <Button variant="outline" onClick={handleSendInvoice}>
              <Send className="h-4 w-4 mr-2" />
              Send Invoice
            </Button>
            <Button onClick={handleDownloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Invoice Overview */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Invoice Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Client Information */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Bill To</h3>
                  <div className="space-y-1">
                    <div className="font-medium text-foreground">{mockInvoiceDetail.client.name}</div>
                    <div className="text-sm text-muted-foreground">{mockInvoiceDetail.client.address}</div>
                    <div className="text-sm text-muted-foreground">{mockInvoiceDetail.client.email}</div>
                    <div className="text-sm text-muted-foreground">{mockInvoiceDetail.client.phone}</div>
                  </div>
                </div>

                <Separator />

                {/* Job Information */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Job Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">Job Number</span>
                      </div>
                      <div className="text-sm text-foreground">{mockInvoiceDetail.jobNumber}</div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">Driver</span>
                      </div>
                      <div className="text-sm text-foreground">{mockInvoiceDetail.job.driver}</div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">Location</span>
                      </div>
                      <div className="text-sm text-foreground">{mockInvoiceDetail.job.location}</div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">Material</span>
                      </div>
                      <div className="text-sm text-foreground">{mockInvoiceDetail.job.material}</div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Line Items */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Invoice Items</h3>
                  <div className="space-y-3">
                    {mockInvoiceDetail.lineItems.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{item.description}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.quantity} {item.unit} × ${item.rate.toFixed(2)}
                          </div>
                        </div>
                        <div className="font-semibold text-foreground">${item.amount.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-foreground">
                      <span>Subtotal:</span>
                      <span>${mockInvoiceDetail.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-foreground">
                      <span>Tax (10%):</span>
                      <span>${mockInvoiceDetail.tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold text-foreground">
                      <span>Total:</span>
                      <span>${mockInvoiceDetail.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Invoice Summary */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Invoice Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Invoice Date:</span>
                  <span className="text-foreground">{mockInvoiceDetail.createdAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Due Date:</span>
                  <span className="text-foreground">{mockInvoiceDetail.dueDate}</span>
                </div>
                {mockInvoiceDetail.paidDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Paid Date:</span>
                    <span className="text-accent">{mockInvoiceDetail.paidDate}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-foreground">Total Amount:</span>
                  <span className="text-foreground">${mockInvoiceDetail.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment History */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockInvoiceDetail.paymentHistory.map((payment, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-foreground">${payment.amount.toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">{payment.method}</div>
                          <div className="text-xs text-muted-foreground">{payment.reference}</div>
                        </div>
                        <div className="text-right">
                          <Badge variant="default" className="text-xs">
                            {payment.status}
                          </Badge>
                          <div className="text-xs text-muted-foreground mt-1">{payment.date}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
