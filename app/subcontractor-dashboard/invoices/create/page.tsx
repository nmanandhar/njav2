import { CreateInvoiceForm } from "@/components/subcontractor/create-invoice-form"
import { DashboardSidebar } from "@/components/subcontractor/dashboard-sidebar"

export default function SubcontractorCreateInvoicePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1">
          <CreateInvoiceForm />
        </div>
      </div>
    </div>
  )
}
