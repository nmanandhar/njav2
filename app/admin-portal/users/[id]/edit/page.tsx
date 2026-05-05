import { UserEditForm } from "@/components/users/user-edit-form"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface AdminUserEditPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function AdminUserEditPage({ params }: AdminUserEditPageProps) {
  const { id } = await params

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/admin-portal/system" className="hover:text-foreground transition-colors">
          System
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/admin-portal/system/users" className="hover:text-foreground transition-colors">
          Users
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Edit User</span>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit User</h1>
        <p className="text-muted-foreground mt-2">Update user information, roles, and permissions</p>
      </div>

      <UserEditForm userId={id} returnPath="/admin-portal/system/users" />
    </div>
  )
}
