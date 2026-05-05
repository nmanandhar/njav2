"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, MoreHorizontal, Eye, Download, Send, Calendar, DollarSign, FileText } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock invoice data based on the scope document
const mockInvoices = [
  {
    id: "INV-2024-001",
    invoiceNumber: "INV-2024-001",
    jobNumber: "JOB-2024-001",
    jobDetails: "Concrete delivery to Construction Site Alpha",
    driverName: "John Smith",
    location: "123 Construction Ave, City",
    material: "Concrete Mix",
    dropSite: "Site Alpha",
    tipSite: "Tip Point 1",
    amount: 2450.0,
    status: "Paid",
    createdAt: "2024-01-15",
    dueDate: "2024-02-14",
    paidDate: "2024-01-28",
  },
  {
    id: "INV-2024-002",
    invoiceNumber: "INV-2024-002",
    jobNumber: "JOB-2024-002",
    jobDetails: "Gravel delivery to Industrial Site Beta",
    driverName: "Sarah Johnson",
    location: "456 Industrial Rd, City",
    material: "Gravel",
    dropSite: "Site Beta",
    tipSite: "Tip Point 2",
    amount: 1850.0,
    status: "Outstanding",
    createdAt: "2024-01-16",
    dueDate: "2024-02-15",
    paidDate: null,
  },
  {
    id: "INV-2024-003",
    invoiceNumber: "INV-2024-003",
    jobNumber: "JOB-2024-003",
    jobDetails: "Sand delivery to Development Site Gamma",
    driverName: "Mike Wilson",
    location: "789 Development St, City",
    material: "Sand",
    dropSite: "Site Gamma",
    tipSite: "Tip Point 1",
    amount: 3200.0,
    status: "Outstanding",
    createdAt: "2024-01-17",
    dueDate: "2024-02-16",
    paidDate: null,
  },
]

const statusColors = {
  Paid: "default",
  Outstanding: "destructive",
  Overdue: "destructive",
  Draft: "secondary",
} as const

export function InvoicesTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.jobNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.material.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleCreateInvoice = (jobNumber: string) => {
    // Navigate to invoice creation with pre-filled job data
    console.log(`Creating invoice for ${jobNumber}`)
  }

  const handleDownloadPDF = (invoiceId: string) => {
    // Generate and download PDF
    console.log(`Downloading PDF for ${invoiceId}`)
  }

  return (
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
                <SelectItem value="Draft">Draft</SelectItem>
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
                            View Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCreateInvoice(invoice.jobNumber)}>
                            <FileText className="mr-2 h-4 w-4" />
                            Create New Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="mr-2 h-4 w-4" />
                            Send Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownloadPDF(invoice.id)}>
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
  )
}
