import { UserProfile } from "@/components/users/user-profile"
import { DashboardTopNav } from "@/components/dashboard/dashboard-topnav"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardTopNav />
      <div className="flex-1">
        <UserProfile />
      </div>
    </div>
  )
}
