import { JobDetails } from "@/components/jobs/job-details"
import { DashboardTopNav } from "@/components/dashboard/dashboard-topnav"

interface JobDetailPageProps {
  params: {
    id: string
  }
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardTopNav />
      <div className="flex-1">
        <JobDetails jobId={params.id} />
      </div>
    </div>
  )
}
