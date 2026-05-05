import { UserEditForm } from "@/components/users/user-edit-form"
import { DashboardTopNav } from "@/components/dashboard/dashboard-topnav"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface EditUserPageProps {
  params: {
    id: string
  }
}

export default function EditUserPage({ params }: EditUserPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardTopNav />
      <div className="flex-1">
        <div className="p-6">
          <div className="mb-6">
            <Link href="/dashboard/users">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Users
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2">Edit User</h1>
            <p className="text-muted-foreground">Update user information, role, and permissions</p>
          </div>
          <UserEditForm userId={params.id} />
        </div>
      </div>
    </div>
  )
}
