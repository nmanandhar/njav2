import { InvoicesTable } from "@/components/client/invoices-table"

export default function InvoicesPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumb */}
      <div className="bg-accent/50 px-6 py-3 border-b border-border">
        <div className="flex items-center gap-2 text-sm">
          <a
            href="/client-portal/dashboard/finance/purchase-orders"
            className="text-primary hover:underline font-medium"
          >
            Finance
          </a>
          <span className="text-muted-foreground">›</span>
          <span className="text-foreground">Invoices</span>
        </div>
      </div>

      {/* Page Header */}
      <div className="px-6 py-6 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground mb-2">Invoices</h1>
        <p className="text-muted-foreground">View and manage invoices from NJ Ashton for completed jobs</p>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        <InvoicesTable />
      </div>
    </div>
  )
}
