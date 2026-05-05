"use client"

import { SubcontractorFinanceHeader } from "@/components/subcontractor/finance-header"
import { DashboardTopNav } from "@/components/subcontractor/dashboard-topnav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, MoreHorizontal, Eye, Download, Send, Calendar, DollarSign, FileText, Clock, CheckCircle, Plus, Filter, Mail, X, Paperclip, CheckCircle2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import Link from "next/link"

const invoiceStats = [
  {
    title: "Total Invoices",
    value: "56",
    change: "+4 this week",
    changeType: "positive" as const,
    icon: FileText,
    description: "All time",
  },
  {
    title: "Outstanding Amount",
    value: "$15,230",
    change: "5 invoices",
    changeType: "warning" as const,
    icon: Clock,
    description: "Awaiting payment",
  },
  {
    title: "Paid This Month",
    value: "$42,180",
    change: "+$3,800 vs last month",
    changeType: "positive" as const,
    icon: CheckCircle,
    description: "Successfully collected",
  },
  {
    title: "Average Invoice",
    value: "$1,950",
    change: "+$90 increase",
    changeType: "positive" as const,
    icon: DollarSign,
    description: "Per invoice value",
  },
]

const mockInvoices = [
  {
    id: "RCTI-2024-01",
    invoiceNumber: "RCTI-2024-01",
    jobNumber: "JOB-2024-016",
    jobDetails: "Sand delivery to Development Site",
    driverName: "David Lee",
    location: "890 Commercial Dr, City",
    material: "Sand",
    amount: 1950.0,
    status: "Paid",
    createdAt: "2024-01-17",
    dueDate: "2024-02-16",
    paidDate: "2024-01-25",
  },
  {
    id: "RCTI-2024-02",
    invoiceNumber: "RCTI-2024-02",
    jobNumber: "JOB-2024-015",
    jobDetails: "Gravel delivery to Industrial Site",
    driverName: "Tom Brown",
    location: "567 Industrial Blvd, City",
    material: "Gravel",
    amount: 1850.0,
    status: "Outstanding",
    createdAt: "2024-01-18",
    dueDate: "2024-02-17",
    paidDate: null,
  },
  {
    id: "RCTI-2024-03",
    invoiceNumber: "RCTI-2024-03",
    jobNumber: "JOB-2024-014",
    jobDetails: "Concrete delivery to Office Tower",
    driverName: "Sarah Johnson",
    location: "150 Church St, Parramatta",
    material: "Concrete",
    amount: 3250.0,
    status: "Paid",
    createdAt: "2024-01-12",
    dueDate: "2024-02-11",
    paidDate: "2024-01-20",
  },
  {
    id: "RCTI-2024-04",
    invoiceNumber: "RCTI-2024-04",
    jobNumber: "JOB-2024-013",
    jobDetails: "Aggregate supply to Highway Project",
    driverName: "James Carter",
    location: "321 Highway Rd, Perth WA",
    material: "Aggregate",
    amount: 2450.0,
    status: "Overdue",
    createdAt: "2024-01-05",
    dueDate: "2024-02-04",
    paidDate: null,
  },
]

const statusColors = {
  Paid: "default",
  Outstanding: "destructive",
  Overdue: "destructive",
  Draft: "secondary",
} as const

export default function SubcontractorFinanceInvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isSendModalOpen, setIsSendModalOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<(typeof mockInvoices)[0] | null>(null)
  const [emailRecipients, setEmailRecipients] = useState<string[]>([])
  const [newRecipient, setNewRecipient] = useState("")
  const [emailSubject, setEmailSubject] = useState("")
  const [emailMessage, setEmailMessage] = useState("")
  const [attachPdf, setAttachPdf] = useState(true)
  const [ccSelf, setCcSelf] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleSendInvoice = (invoice: (typeof mockInvoices)[0]) => {
    setSelectedInvoice(invoice)
    setEmailRecipients(["accounts@njashton.com.au"])
    setEmailSubject(`Invoice ${invoice.invoiceNumber} - ${invoice.jobDetails}`)
    setEmailMessage(`Dear NJ Ashton Transport,

Please find attached invoice ${invoice.invoiceNumber} for your review.

Invoice Details:
- Invoice Number: ${invoice.invoiceNumber}
- Job Number: ${invoice.jobNumber}
- Description: ${invoice.jobDetails}
- Amount: $${invoice.amount.toLocaleString()} AUD
- Due Date: ${invoice.dueDate}

Please process payment by the due date. If you have any questions regarding this invoice, please don't hesitate to contact us.

Thank you.

Kind regards,
Coastal Transport Co`)
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

  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.jobNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.driverName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-background">
      <DashboardTopNav />
      <SubcontractorFinanceHeader />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {invoiceStats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Badge
                      variant={
                        stat.changeType === "positive"
                          ? "default"
                          : stat.changeType === "warning"
                            ? "destructive"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {stat.change}
                    </Badge>
                    <span>{stat.description}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Invoices Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-card-foreground">Invoices List</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search invoices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64 bg-input border-border"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32 bg-input border-border">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Outstanding">Outstanding</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-muted-foreground">Invoice Number</TableHead>
                    <TableHead className="text-muted-foreground">Job Details</TableHead>
                    <TableHead className="text-muted-foreground">Driver</TableHead>
                    <TableHead className="text-muted-foreground">Amount</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-muted-foreground">Due Date</TableHead>
                    <TableHead className="text-muted-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id} className="border-border">
                      <TableCell className="font-medium text-foreground">
                        <div>
                          <div className="font-semibold">{invoice.invoiceNumber}</div>
                          <div className="text-xs text-muted-foreground flex items-center">
                            <FileText className="h-3 w-3 mr-1" />
                            {invoice.jobNumber}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <div className="font-medium text-foreground truncate">{invoice.jobDetails}</div>
                          <div className="text-xs text-muted-foreground">{invoice.material}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                              {invoice.driverName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-foreground">{invoice.driverName}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-3 w-3 text-muted-foreground" />
                          <span className="font-semibold text-foreground">{invoice.amount.toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusColors[invoice.status as keyof typeof statusColors]}>{invoice.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm text-foreground">{invoice.dueDate}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <Download className="h-3 w-3" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/subcontractor-dashboard/finance/invoices/${invoice.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Invoice
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSendInvoice(invoice)}>
                                <Send className="mr-2 h-4 w-4" />
                                Send Invoice
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
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
              Send invoice {selectedInvoice?.invoiceNumber} to NJ Ashton Transport
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
                  Invoice {selectedInvoice?.invoiceNumber} has been sent to {emailRecipients.length} recipient{emailRecipients.length > 1 ? "s" : ""}.
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
                    <p className="font-semibold">{selectedInvoice?.invoiceNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Job</p>
                    <p className="font-semibold">{selectedInvoice?.jobNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="font-bold text-green-600">${selectedInvoice?.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant={selectedInvoice ? statusColors[selectedInvoice.status as keyof typeof statusColors] : "default"}>
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
                  id="cc-self"
                  checked={ccSelf}
                  onCheckedChange={(checked) => setCcSelf(checked as boolean)}
                />
                <Label htmlFor="cc-self" className="text-sm font-normal cursor-pointer">
                  CC myself (admin@coastaltransport.com.au)
                </Label>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="send-subject">Subject</Label>
                <Input
                  id="send-subject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="send-message">Message</Label>
                <Textarea
                  id="send-message"
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  rows={10}
                  className="resize-none"
                />
              </div>

              {/* Attachment Option */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="attach-pdf-send"
                  checked={attachPdf}
                  onCheckedChange={(checked) => setAttachPdf(checked as boolean)}
                />
                <Label htmlFor="attach-pdf-send" className="text-sm font-normal cursor-pointer flex items-center gap-2">
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                  Attach invoice PDF ({selectedInvoice?.invoiceNumber}.pdf)
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
