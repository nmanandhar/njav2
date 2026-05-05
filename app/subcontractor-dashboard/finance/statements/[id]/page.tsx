"use client"

import { DashboardTopNav } from "@/components/subcontractor/dashboard-topnav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Calendar, FileText, DollarSign, CreditCard } from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"

const statusColors: Record<string, string> = {
  Paid: "bg-green-100 text-green-800 border-green-200",
  "Partially Paid": "bg-yellow-100 text-yellow-800 border-yellow-200",
  Outstanding: "bg-red-100 text-red-800 border-red-200",
}

const invoiceStatusColors: Record<string, string> = {
  Paid: "bg-green-100 text-green-800 border-green-200",
  "Partially Paid": "bg-yellow-100 text-yellow-800 border-yellow-200",
  Unpaid: "bg-red-100 text-red-800 border-red-200",
}

export default function SubcontractorStatementDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params

  const statementDetails = {
    id: "STMT-2024-01-XYZ",
    statementNumber: "STMT-2024-01-XYZ",
    period: "January 2024",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    issueDate: "2024-02-01",
    invoiceCount: 6,
    totalInvoiced: 18450.0,
    totalPaid: 14200.0,
    totalOutstanding: 4250.0,
    status: "Partially Paid",
    companyName: "XYZ Transport Services",
    companyAddress: "456 Transport Ave, Penrith NSW 2750",
    invoices: [
      {
        id: "RCTI-2024-01",
        invoiceNumber: "RCTI-2024-01",
        invoiceDate: "2024-01-05",
        dueDate: "2024-01-20",
        description: "Sand delivery to Development Site",
        amount: 1950.0,
        paid: 1950.0,
        outstanding: 0.0,
        status: "Paid",
        paymentDate: "2024-01-18",
      },
      {
        id: "RCTI-2024-02",
        invoiceNumber: "RCTI-2024-02",
        invoiceDate: "2024-01-08",
        dueDate: "2024-01-23",
        description: "Gravel delivery to Industrial Site",
        amount: 1850.0,
        paid: 1850.0,
        outstanding: 0.0,
        status: "Paid",
        paymentDate: "2024-01-22",
      },
      {
        id: "RCTI-2024-03",
        invoiceNumber: "RCTI-2024-03",
        invoiceDate: "2024-01-12",
        dueDate: "2024-01-27",
        description: "Concrete delivery to Office Tower",
        amount: 3250.0,
        paid: 3250.0,
        outstanding: 0.0,
        status: "Paid",
        paymentDate: "2024-01-25",
      },
      {
        id: "RCTI-2024-04",
        invoiceNumber: "RCTI-2024-04",
        invoiceDate: "2024-01-15",
        dueDate: "2024-01-30",
        description: "Aggregate supply to Highway Project",
        amount: 2450.0,
        paid: 2450.0,
        outstanding: 0.0,
        status: "Paid",
        paymentDate: "2024-01-28",
      },
      {
        id: "RCTI-2024-05",
        invoiceNumber: "RCTI-2024-05",
        invoiceDate: "2024-01-20",
        dueDate: "2024-02-04",
        description: "Material delivery - Westfield Site",
        amount: 4700.0,
        paid: 4700.0,
        outstanding: 0.0,
        status: "Paid",
        paymentDate: "2024-02-02",
      },
      {
        id: "RCTI-2024-06",
        invoiceNumber: "RCTI-2024-06",
        invoiceDate: "2024-01-25",
        dueDate: "2024-02-09",
        description: "Bulk earth removal - Auburn Site",
        amount: 4250.0,
        paid: 0.0,
        outstanding: 4250.0,
        status: "Unpaid",
        paymentDate: null,
      },
    ],
    paymentHistory: [
      {
        id: "PAY-001",
        paymentDate: "2024-01-18",
        amount: 1950.0,
        method: "Bank Transfer",
        reference: "TXN-2024-0118-XYZ",
        invoices: ["RCTI-2024-01"],
      },
      {
        id: "PAY-002",
        paymentDate: "2024-01-22",
        amount: 1850.0,
        method: "Bank Transfer",
        reference: "TXN-2024-0122-XYZ",
        invoices: ["RCTI-2024-02"],
      },
      {
        id: "PAY-003",
        paymentDate: "2024-01-25",
        amount: 3250.0,
        method: "Bank Transfer",
        reference: "TXN-2024-0125-XYZ",
        invoices: ["RCTI-2024-03"],
      },
      {
        id: "PAY-004",
        paymentDate: "2024-01-28",
        amount: 2450.0,
        method: "Bank Transfer",
        reference: "TXN-2024-0128-XYZ",
        invoices: ["RCTI-2024-04"],
      },
      {
        id: "PAY-005",
        paymentDate: "2024-02-02",
        amount: 4700.0,
        method: "Bank Transfer",
        reference: "TXN-2024-0202-XYZ",
        invoices: ["RCTI-2024-05"],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardTopNav />

      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild className="bg-transparent">
              <Link href="/subcontractor-dashboard/finance/statements">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-primary">{statementDetails.statementNumber}</h1>
              <p className="text-sm text-muted-foreground mt-1">Statement Details</p>
            </div>
          </div>
          <Button variant="default" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>

        {/* Statement Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Invoiced</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(statementDetails.totalInvoiced)}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{formatCurrency(statementDetails.totalPaid)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Outstanding</p>
                <p className="text-2xl font-bold text-red-600 mt-1">
                  {formatCurrency(statementDetails.totalOutstanding)}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Invoices</p>
                <p className="text-2xl font-bold mt-1">{statementDetails.invoiceCount}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Statement Details & Period */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Statement Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Statement Number:</span>
                <span className="font-medium">{statementDetails.statementNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Period:</span>
                <span className="font-medium">{statementDetails.period}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Issue Date:</span>
                <span className="font-medium">{statementDetails.issueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant="outline" className={statusColors[statementDetails.status] || ""}>
                  {statementDetails.status}
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold text-lg">Statement Period</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">From:</span>
                <span className="font-medium">{statementDetails.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">To:</span>
                <span className="font-medium">{statementDetails.endDate}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Invoices Table */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Invoices</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Invoice #</th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Due Date</th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Description</th>
                  <th className="text-right py-3 px-4 font-medium text-sm text-muted-foreground">Amount</th>
                  <th className="text-right py-3 px-4 font-medium text-sm text-muted-foreground">Paid</th>
                  <th className="text-right py-3 px-4 font-medium text-sm text-muted-foreground">Outstanding</th>
                  <th className="text-center py-3 px-4 font-medium text-sm text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {statementDetails.invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <span className="text-primary font-medium">{invoice.invoiceNumber}</span>
                    </td>
                    <td className="py-3 px-4 text-sm">{invoice.invoiceDate}</td>
                    <td className="py-3 px-4 text-sm">{invoice.dueDate}</td>
                    <td className="py-3 px-4 text-sm">{invoice.description}</td>
                    <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(invoice.amount)}</td>
                    <td className="py-3 px-4 text-sm text-right text-green-600 font-medium">
                      {formatCurrency(invoice.paid)}
                    </td>
                    <td className="py-3 px-4 text-sm text-right text-red-600 font-medium">
                      {formatCurrency(invoice.outstanding)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge
                        variant="outline"
                        className={invoiceStatusColors[invoice.status] || ""}
                      >
                        {invoice.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-muted/30 border-t-2">
                <tr>
                  <td colSpan={4} className="py-3 px-4 font-semibold text-right">
                    Total:
                  </td>
                  <td className="py-3 px-4 font-bold text-right">{formatCurrency(statementDetails.totalInvoiced)}</td>
                  <td className="py-3 px-4 font-bold text-right text-green-600">
                    {formatCurrency(statementDetails.totalPaid)}
                  </td>
                  <td className="py-3 px-4 font-bold text-right text-red-600">
                    {formatCurrency(statementDetails.totalOutstanding)}
                  </td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>

        {/* Payment History */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Payment History</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Payment Date</th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Method</th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Reference</th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-muted-foreground">Applied to Invoices</th>
                </tr>
              </thead>
              <tbody>
                {statementDetails.paymentHistory.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm">{payment.paymentDate}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-green-600">{formatCurrency(payment.amount)}</td>
                    <td className="py-3 px-4 text-sm">{payment.method}</td>
                    <td className="py-3 px-4 text-sm font-mono text-xs">{payment.reference}</td>
                    <td className="py-3 px-4 text-sm">{payment.invoices.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-muted/30 border-t-2">
                <tr>
                  <td className="py-3 px-4 font-semibold">Total Paid:</td>
                  <td className="py-3 px-4 font-bold text-green-600">{formatCurrency(statementDetails.totalPaid)}</td>
                  <td colSpan={3} />
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
