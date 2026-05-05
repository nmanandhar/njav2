"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Search,
  MoreHorizontal,
  Eye,
  Download,
  Send,
  Calendar,
  DollarSign,
  FileText,
  Edit,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock,
  Building,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

// Enhanced mock invoice data with all scope features
const mockInvoices = [
  {
    id: "INV-2024-001",
    invoiceNumber: "INV-2024-001",
    jobNumber: "JOB-2024-001",
    clientName: "Metro Construction Ltd",
    clientEmail: "accounts@metroconstruction.com.au",
    jobDetails: "Concrete delivery to Construction Site Alpha",
    driverName: "John Smith",
    location: "123 Construction Ave, Sydney NSW",
    material: "Concrete Mix - 20m³",
    dropSite: "Site Alpha - Construction Zone",
    tipSite: "Tip Point 1 - Blacktown",
    amount: 4250.0,
    tax: 425.0,
    total: 4675.0,
    status: "Paid",
    priority: "Normal",
    createdAt: "2024-01-15",
    dueDate: "2024-02-14",
    paidDate: "2024-01-28",
    paymentMethod: "Bank Transfer",
    xeroSyncStatus: "Synced",
    notes: "Payment received on time",
  },
  {
    id: "INV-2024-002",
    invoiceNumber: "INV-2024-002",
    jobNumber: "JOB-2024-002",
    clientName: "BuildCorp Pty Ltd",
    clientEmail: "finance@buildcorp.com.au",
    jobDetails: "Gravel delivery to Industrial Site Beta",
    driverName: "Sarah Johnson",
    location: "456 Industrial Rd, Melbourne VIC",
    material: "Gravel - 15m³",
    dropSite: "Site Beta - Industrial Park",
    tipSite: "Tip Point 2 - Clayton",
    amount: 3200.0,
    tax: 320.0,
    total: 3520.0,
    status: "Outstanding",
    priority: "High",
    createdAt: "2024-01-16",
    dueDate: "2024-02-15",
    paidDate: null,
    paymentMethod: null,
    xeroSyncStatus: "Synced",
    notes: "Follow up required",
  },
  {
    id: "INV-2024-003",
    invoiceNumber: "INV-2024-003",
    jobNumber: "JOB-2024-003",
    clientName: "Urban Developments",
    clientEmail: "admin@urbandevelopments.com.au",
    jobDetails: "Sand delivery to Development Site Gamma",
    driverName: "Mike Wilson",
    location: "789 Development St, Brisbane QLD",
    material: "Sand - 25m³",
    dropSite: "Site Gamma - Residential",
    tipSite: "Tip Point 1 - Blacktown",
    amount: 2850.0,
    tax: 285.0,
    total: 3135.0,
    status: "Overdue",
    priority: "High",
    createdAt: "2024-01-10",
    dueDate: "2024-02-09",
    paidDate: null,
    paymentMethod: null,
    xeroSyncStatus: "Synced",
    notes: "Payment overdue - urgent follow up",
  },
  {
    id: "INV-2024-004",
    invoiceNumber: "INV-2024-004",
    jobNumber: "JOB-2024-004",
    clientName: "Infrastructure Co",
    clientEmail: "payments@infrastructure.com.au",
    jobDetails: "Crushed Rock delivery to Highway Project",
    driverName: "Emma Davis",
    location: "321 Highway Rd, Perth WA",
    material: "Crushed Rock - 30m³",
    dropSite: "Site Delta - Highway Project",
    tipSite: "Tip Point 3 - Rockingham",
    amount: 5100.0,
    tax: 510.0,
    total: 5610.0,
    status: "Draft",
    priority: "Normal",
    createdAt: "2024-01-18",
    dueDate: "2024-02-17",
    paidDate: null,
    paymentMethod: null,
    xeroSyncStatus: "Pending",
    notes: "Awaiting client approval",
  },
]

const statusColors = {
  Paid: "default",
  Outstanding: "secondary",
  Overdue: "destructive",
  Draft: "outline",
} as const

const priorityColors = {
  High: "destructive",
  Normal: "secondary",
  Low: "outline",
} as const

export function AdminFinanceTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [clientFilter, setClientFilter] = useState("all")

  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.jobNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.material.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
    const matchesPriority = priorityFilter === "all" || invoice.priority === priorityFilter
    const matchesClient = clientFilter === "all" || invoice.clientName === clientFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesClient
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Paid":
        return <CheckCircle className="h-3 w-3 text-green-600" />
      case "Outstanding":
        return <Clock className="h-3 w-3 text-blue-600" />
      case "Overdue":
        return <AlertTriangle className="h-3 w-3 text-red-600" />
      default:
        return <FileText className="h-3 w-3 text-gray-600" />
    }
  }

  const handleDownloadPDF = (invoiceId: string) => {
    console.log(`Downloading PDF for ${invoiceId}`)
  }

  const handleSendInvoice = (invoiceId: string) => {
    console.log(`Sending invoice ${invoiceId}`)
  }

  const handleMarkPaid = (invoiceId: string) => {
    console.log(`Marking invoice ${invoiceId} as paid`)
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-card-foreground">Invoice Management</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices, clients, jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80 bg-input border-border"
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
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-32 bg-input border-border">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
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
                <TableHead className="text-muted-foreground">Invoice Details</TableHead>
                <TableHead className="text-muted-foreground">Client & Job</TableHead>
                <TableHead className="text-muted-foreground">Driver & Location</TableHead>
                <TableHead className="text-muted-foreground">Amount & Status</TableHead>
                <TableHead className="text-muted-foreground">Payment Info</TableHead>
                <TableHead className="text-muted-foreground">Sync Status</TableHead>
                <TableHead className="text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id} className="border-border">
                  <TableCell className="font-medium text-foreground">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{invoice.invoiceNumber}</span>
                        <Badge
                          variant={priorityColors[invoice.priority as keyof typeof priorityColors]}
                          className="text-xs"
                        >
                          {invoice.priority}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center space-x-3">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {invoice.createdAt}
                        </span>
                        <span className="flex items-center">
                          <FileText className="h-3 w-3 mr-1" />
                          {invoice.jobNumber}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1">
                        <Building className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">{invoice.clientName}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{invoice.clientEmail}</div>
                      <div className="text-xs font-medium text-foreground">{invoice.jobDetails}</div>
                      <div className="text-xs text-muted-foreground">{invoice.material}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {invoice.driverName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium text-foreground">{invoice.driverName}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{invoice.location}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-3 w-3 text-muted-foreground" />
                        <span className="font-semibold text-foreground">${invoice.total.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(invoice.status)}
                        <Badge variant={statusColors[invoice.status as keyof typeof statusColors]} className="text-xs">
                          {invoice.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">Due: {invoice.dueDate}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {invoice.paidDate ? (
                        <>
                          <div className="text-xs font-medium text-green-600">Paid: {invoice.paidDate}</div>
                          <div className="text-xs text-muted-foreground">{invoice.paymentMethod}</div>
                        </>
                      ) : (
                        <div className="text-xs text-muted-foreground">Payment pending</div>
                      )}
                      {invoice.notes && <div className="text-xs text-muted-foreground italic">{invoice.notes}</div>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={invoice.xeroSyncStatus === "Synced" ? "default" : "secondary"} className="text-xs">
                      {invoice.xeroSyncStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadPDF(invoice.id)}
                        className="h-8 px-2"
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Invoice
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleSendInvoice(invoice.id)}>
                            <Send className="mr-2 h-4 w-4" />
                            Send to Client
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownloadPDF(invoice.id)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {invoice.status !== "Paid" && (
                            <DropdownMenuItem onClick={() => handleMarkPaid(invoice.id)}>
                              <CreditCard className="mr-2 h-4 w-4" />
                              Mark as Paid
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Building className="mr-2 h-4 w-4" />
                            Sync with Xero
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

        {filteredInvoices.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No invoices found matching your criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
