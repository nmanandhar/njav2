import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { PurchaseOrdersTable } from "@/components/client/purchase-orders-table"

export default function PurchaseOrdersPage() {
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
          <span className="text-foreground">Purchase Orders</span>
        </div>
      </div>

      {/* Page Header */}
      <div className="px-6 py-6 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-foreground">Purchase Orders</h1>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Purchase Order
          </Button>
        </div>
        <p className="text-muted-foreground">Create and manage purchase orders for your transport requirements</p>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        <PurchaseOrdersTable />
      </div>
    </div>
  )
}
