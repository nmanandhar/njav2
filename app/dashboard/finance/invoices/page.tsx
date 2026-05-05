"use client"

import { useState } from "react"
import { DashboardTopNav } from "@/components/dashboard/dashboard-topnav"
import { FinanceHeader } from "@/components/client/finance-header"
import { Button } from "@/components/ui/button"
import { Search, Download, Filter, MapPin, Calendar, Truck, MoreVertical, Mail, Send, Plus, X, Paperclip, CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

const invoices = [
  {
    id: "RCTI-2024-01",
    invoiceNumber: "RCTI-2024-01",
    poNumber: "PO-XL-8945",
    jobNumber: "JOB-2024-001",
    description: "Concrete transport services",
    orderedBy: "Sarah Johnson",
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
        quarryCode: "HAN-BLK-005",
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
    invoiceNumber: "RCTI-2024-02",
    poNumber: "PO-XL-8932",
    jobNumber: "JOB-2024-003",
    invoiceDate: "2024-01-20",
    dueDate: "2024-02-19",
    paidDate: null,
    description: "Material delivery for George St project",
    orderedBy: "John Smith",
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
        quantity: 3,
        truckType: "8m³ Tipper",
        customerDetails: "George St Site - Gate 2",
        quarryCode: "BOR-MAR-002",
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
    status: "Outstanding",
  },
]

const statusColors = {
  Paid: "bg-green-100 text-green-800 border-green-200",
  Outstanding: "bg-amber-100 text-amber-800 border-amber-200",
  Overdue: "bg-red-100 text-red-800 border-red-200",
}

export default function InvoicesPage() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<(typeof invoices)[0] | null>(null)
  const [emailRecipients, setEmailRecipients] = useState<string[]>([])
  const [newRecipient, setNewRecipient] = useState("")
  const [emailSubject, setEmailSubject] = useState("")
  const [emailMessage, setEmailMessage] = useState("")
  const [attachPdf, setAttachPdf] = useState(true)
  const [ccAccounts, setCcAccounts] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleEmailInvoice = (invoice: (typeof invoices)[0]) => {
    setSelectedInvoice(invoice)
    setEmailRecipients(["accounts@client.com"])
    setEmailSubject(`Invoice ${invoice.invoiceNumber} - ${invoice.description}`)
    setEmailMessage(`Dear Customer,

Please find attached invoice ${invoice.invoiceNumber} for ${invoice.description}.

Invoice Details:
- Invoice Number: ${invoice.invoiceNumber}
- PO Number: ${invoice.poNumber}
- Job Number: ${invoice.jobNumber}
- Amount: ${formatCurrency(invoice.total)} AUD
- Due Date: ${invoice.dueDate || "Upon receipt"}

If you have any questions regarding this invoice, please don't hesitate to contact us.

Thank you for your business.

Kind regards,
NJ Ashton Transport`)
    setAttachPdf(true)
    setCcAccounts(false)
    setIsSent(false)
    setIsEmailModalOpen(true)
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

  const handleSendEmail = async () => {
    setIsSending(true)
    // Simulate sending email
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSending(false)
    setIsSent(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardTopNav />

      <div className="bg-background border-b border-border px-6 py-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-orange-500 font-medium">Finance</span>
          <span className="text-muted-foreground">›</span>
          <span className="text-foreground">Invoices</span>
        </div>
      </div>

      <FinanceHeader />

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
          </div>
        </div>

        {/* Invoices Table */}
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <Card key={invoice.id} className="p-0 overflow-hidden">
              <div className="flex flex-col">
                <div className="grid grid-cols-[280px_1fr_1fr_280px]">
                  {/* Column 1: Invoice Details */}
                  <div className="bg-blue-50 px-6 py-4 border-r border-border">
                    <h3 className="text-xl font-bold text-primary mb-4">{invoice.invoiceNumber}</h3>

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
                        <div className="text-muted-foreground">Due Date:</div>
                        <div className="font-medium text-foreground">{invoice.dueDate}</div>
                      </div>

                      {invoice.paidDate && (
                        <div>
                          <div className="text-muted-foreground">Paid Date:</div>
                          <div className="font-medium text-green-600">{invoice.paidDate}</div>
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
                      </div>

                      {/* Financial Totals */}
                      <div className="border-t-2 border-border pt-3 space-y-1 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Subtotal:</span>
                          <span className="font-medium">{formatCurrency(invoice.subtotal)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">GST (10%):</span>
                          <span className="font-medium">{formatCurrency(invoice.gst)}</span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <span className="font-semibold">Total:</span>
                          <span className="text-xl font-bold text-green-600">{formatCurrency(invoice.total)}</span>
                        </div>
                        <div className="text-right text-xs text-muted-foreground">AUD</div>
                      </div>
                    </div>
                  </div>

                  {/* Column 4: Amount */}
                  <div className="bg-white px-6 py-4 flex flex-col items-end justify-between">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-1">Amount</div>
                      <div className="text-3xl font-bold text-green-600">{formatCurrency(invoice.total)}</div>
                      <div className="text-xs text-muted-foreground">AUD</div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/dashboard/finance/invoices/${invoice.id}`}>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem>Download PDF</DropdownMenuItem>
                        <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEmailInvoice(invoice)}>Send Invoice</DropdownMenuItem>
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
                  <Link href={`/dashboard/finance/invoices/${invoice.id}`}>
                    <Button variant="secondary" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Send Invoice Modal */}
      <Dialog open={isEmailModalOpen} onOpenChange={(open) => {
        setIsEmailModalOpen(open)
        if (!open) {
          setIsSent(false)
        }
      }}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Send Invoice
            </DialogTitle>
            <DialogDescription>
              Send invoice {selectedInvoice?.invoiceNumber} to recipients
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
                  Invoice {selectedInvoice?.invoiceNumber} has been sent to {emailRecipients.length} recipient{emailRecipients.length > 1 ? 's' : ''}.
                </p>
              </div>
              <Button onClick={() => setIsEmailModalOpen(false)}>
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
                    <p className="font-semibold">{selectedInvoice?.invoiceNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="font-bold text-green-600">{selectedInvoice ? formatCurrency(selectedInvoice.total) : ''}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant="outline" className={selectedInvoice ? statusColors[selectedInvoice.status as keyof typeof statusColors] : ''}>
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
                      if (e.key === 'Enter') {
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
                  id="cc-accounts"
                  checked={ccAccounts}
                  onCheckedChange={(checked) => setCcAccounts(checked as boolean)}
                />
                <Label htmlFor="cc-accounts" className="text-sm font-normal cursor-pointer">
                  CC accounts@njashton.com.au
                </Label>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="email-subject">Subject</Label>
                <Input
                  id="email-subject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="email-message">Message</Label>
                <Textarea
                  id="email-message"
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  rows={10}
                  className="resize-none"
                />
              </div>

              {/* Attachment Option */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="attach-pdf"
                  checked={attachPdf}
                  onCheckedChange={(checked) => setAttachPdf(checked as boolean)}
                />
                <Label htmlFor="attach-pdf" className="text-sm font-normal cursor-pointer flex items-center gap-2">
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                  Attach invoice PDF ({selectedInvoice?.invoiceNumber}.pdf)
                </Label>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2 border-t">
                <Button variant="outline" onClick={() => setIsEmailModalOpen(false)} className="bg-transparent">
                  Cancel
                </Button>
                <Button 
                  onClick={handleSendEmail} 
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
