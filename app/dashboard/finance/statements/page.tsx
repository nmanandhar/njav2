"use client"

import { DashboardTopNav } from "@/components/dashboard/dashboard-topnav"
import { FinanceHeader } from "@/components/client/finance-header"
import { Button } from "@/components/ui/button"
import { Search, Download, Filter, Calendar, MoreVertical, FileText } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"

const statements = [
  {
    id: "STMT-2024-01",
    statementNumber: "STMT-2024-01",
    period: "January 2024",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    issueDate: "2024-02-01",
    invoiceCount: 8,
    totalInvoiced: 24350.0,
    totalPaid: 18200.0,
    totalOutstanding: 6150.0,
    status: "Partially Paid",
  },
  {
    id: "STMT-2023-12",
    statementNumber: "STMT-2023-12",
    period: "December 2023",
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    issueDate: "2024-01-01",
    invoiceCount: 12,
    totalInvoiced: 35720.0,
    totalPaid: 35720.0,
    totalOutstanding: 0.0,
    status: "Paid",
  },
  {
    id: "STMT-2023-11",
    statementNumber: "STMT-2023-11",
    period: "November 2023",
    startDate: "2023-11-01",
    endDate: "2023-11-30",
    issueDate: "2023-12-01",
    invoiceCount: 10,
    totalInvoiced: 28940.0,
    totalPaid: 28940.0,
    totalOutstanding: 0.0,
    status: "Paid",
  },
]

const statusColors = {
  Paid: "bg-green-100 text-green-800 border-green-200",
  "Partially Paid": "bg-yellow-100 text-yellow-800 border-yellow-200",
  Outstanding: "bg-red-100 text-red-800 border-red-200",
}

export default function StatementsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardTopNav />

      <div className="flex-1">
        <FinanceHeader />

        <div className="p-6 space-y-6">
          {/* Search and Actions Bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="text" placeholder="Search by statement number, period..." className="pl-9" />
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Statements List */}
          <div className="space-y-4">
            {statements.map((statement) => (
              <Card key={statement.id} className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column - Statement Info */}
                  <div className="lg:col-span-3 space-y-3">
                    <div>
                      <Link
                        href={`/dashboard/finance/statements/${statement.id}`}
                        className="text-lg font-bold text-primary hover:underline"
                      >
                        {statement.statementNumber}
                      </Link>
                    </div>

                    <div className="space-y-1.5 text-sm">
                      <div>
                        <span className="text-muted-foreground">Period:</span>
                        <div className="font-medium">{statement.period}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Issue Date:</span>
                        <div className="font-medium">{statement.issueDate}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Invoices:</span>
                        <div className="font-medium">{statement.invoiceCount} invoices</div>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column - Financial Summary */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Statement Period</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">From:</span>
                      <span className="font-medium">{statement.startDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">To:</span>
                      <span className="font-medium">{statement.endDate}</span>
                    </div>

                    <div className="pt-2 border-t border-border space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Total Invoiced:</span>
                        <span className="font-semibold">{formatCurrency(statement.totalInvoiced)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Total Paid:</span>
                        <span className="font-semibold text-green-600">{formatCurrency(statement.totalPaid)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Outstanding:</span>
                        <span className="font-semibold text-red-600">{formatCurrency(statement.totalOutstanding)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Amount and Actions */}
                  <div className="lg:col-span-3 flex flex-col justify-between items-end">
                    <div className="text-right space-y-2">
                      <div className="text-sm text-muted-foreground">Total Amount</div>
                      <div className="text-3xl font-bold text-primary">{formatCurrency(statement.totalInvoiced)}</div>
                      <Badge variant="outline" className={statusColors[statement.status as keyof typeof statusColors]}>
                        {statement.status}
                      </Badge>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/finance/statements/${statement.id}`}>
                            <FileText className="h-4 w-4 mr-2" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
