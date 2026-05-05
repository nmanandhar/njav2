import { JobsHeaderClient } from "@/components/client/jobs-header-client"
import { JobsStatsClient } from "@/components/client/jobs-stats-client"
import { JobsTableClient } from "@/components/client/jobs-table-client"

export default function ClientJobsPage() {
  return (
    <div className="p-6">
      <JobsHeaderClient />
      <JobsStatsClient />
      <JobsTableClient />
    </div>
  )
}
