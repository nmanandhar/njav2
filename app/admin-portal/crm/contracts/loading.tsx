import { AdminTopNav } from "@/components/admin/admin-topnav"
import { CRMHeader } from "@/components/admin/crm-header"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <AdminTopNav />
      <CRMHeader />

      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-[400px] w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
