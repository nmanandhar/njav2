import { InvoiceDetails } from "@/components/subcontractor/invoice-details"
import { DashboardSidebar } from "@/components/subcontractor/dashboard-sidebar"

interface InvoiceDetailPageProps {
  params: {
    id: string
  }
}

export default function SubcontractorInvoiceDetailPage({ params }: InvoiceDetailPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1">
          <InvoiceDetails invoiceId={params.id} />
        </div>
      </div>
    </div>
  )
}
