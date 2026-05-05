"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MoreVertical, Download } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockInvoices = [
  {
    id: "INV-2024-001",
    poNumber: "PO-2024-001",
    jobNumber: "JOB-2024-003",
    date: "20/01/2024",
    dueDate: "03/02/2024",
    description: "Concrete delivery - George St project",
    amount: "$4,500",
    status: "Paid",
  },
  {
    id: "INV-2024-002",
    poNumber: "PO-2024-002",
    jobNumber: "JOB-2024-004",
    date: "22/01/2024",
    dueDate: "05/02/2024",
    description: "Aggregate transport - Beach Road site",
    amount: "$3,200",
    status: "Outstanding",
  },
]

const statusColors = {
  Outstanding: "bg-amber-100 text-amber-800 border-amber-200",
  Paid: "bg-green-100 text-green-800 border-green-200",
  Overdue: "bg-red-100 text-red-800 border-red-200",
}

export function InvoicesTable() {
  return (
    <div className="p-6 space-y-6">
      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input type="search" placeholder="Search invoices..." className="pl-10" />
        </div>
      </div>

      {/* Invoices List */}
      <div className="space-y-4">
        {mockInvoices.map((invoice) => (
          <Card key={invoice.id} className="p-0 overflow-hidden">
            <div className="grid grid-cols-[1fr_200px_150px_150px_50px] items-center">
              {/* Invoice Details */}
              <div className="bg-blue-50 px-6 py-4 border-r border-border">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-primary">{invoice.id}</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">PO Number:</span>
                    <div className="font-medium text-primary">{invoice.poNumber}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Job Number:</span>
                    <div className="font-medium text-primary">{invoice.jobNumber}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Description:</span>
                    <div className="font-medium text-foreground">{invoice.description}</div>
                  </div>
                </div>
              </div>

              {/* Dates & Amount */}
              <div className="bg-amber-50 px-6 py-4 border-r border-border">
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-muted-foreground">Invoice Date</div>
                    <div className="font-medium text-foreground">{invoice.date}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Due Date</div>
                    <div className="font-medium text-foreground">{invoice.dueDate}</div>
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div className="bg-gray-50 px-6 py-4 border-r border-border">
                <div className="text-sm text-muted-foreground mb-1">Amount</div>
                <div className="text-2xl font-bold text-green-600">{invoice.amount}</div>
              </div>

              {/* Status & Actions */}
              <div className="bg-gray-50 px-6 py-4 border-r border-border">
                <Badge
                  variant="outline"
                  className={statusColors[invoice.status as keyof typeof statusColors] + " mb-3"}
                >
                  {invoice.status}
                </Badge>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
              </div>

              {/* Menu */}
              <div className="bg-gray-50 px-3 py-4 flex items-center justify-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Download PDF</DropdownMenuItem>
                    <DropdownMenuItem>Print</DropdownMenuItem>
                    <DropdownMenuItem>Email Invoice</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
