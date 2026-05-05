import { JobDetails } from "@/components/subcontractor/job-details"
import { DashboardSidebar } from "@/components/subcontractor/dashboard-sidebar"

interface JobDetailPageProps {
  params: {
    id: string
  }
}

export default function SubcontractorJobDetailPage({ params }: JobDetailPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1">
          <JobDetails jobId={params.id} />
        </div>
      </div>
    </div>
  )
}
