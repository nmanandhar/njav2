import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserX, ShieldCheck } from "lucide-react"

export function AdminUsersStats() {
  const stats = [
    {
      title: "Total Users",
      value: "12",
      change: "+1 from last month",
      changeColor: "text-blue-600",
      icon: Users,
      iconColor: "text-blue-600",
    },
    {
      title: "Active Users",
      value: "11",
      change: "+1 from last week",
      changeColor: "text-green-600",
      icon: UserCheck,
      iconColor: "text-green-600",
    },
    {
      title: "Inactive Users",
      value: "1",
      change: "No change",
      changeColor: "text-muted-foreground",
      icon: UserX,
      iconColor: "text-orange-600",
    },
    {
      title: "Admin Users",
      value: "2",
      change: "No change",
      changeColor: "text-muted-foreground",
      icon: ShieldCheck,
      iconColor: "text-purple-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className={`h-5 w-5 ${stat.iconColor}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <p className={`text-xs ${stat.changeColor} mt-1`}>{stat.change}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
