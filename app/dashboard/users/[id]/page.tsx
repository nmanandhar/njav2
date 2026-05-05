import { JobDetails } from "@/components/jobs/job-details"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

interface JobDetailPageProps {
  params: {
    id: string
  }
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
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
