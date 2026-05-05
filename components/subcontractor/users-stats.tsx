import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserX, Shield } from "lucide-react"

export function UsersStats() {
  const stats = [
    {
      title: "Total Users",
      value: "12",
      change: "+1 from last month",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Active Users",
      value: "11",
      change: "+1 from last week",
      icon: UserCheck,
      color: "text-green-500",
    },
    {
      title: "Inactive Users",
      value: "1",
      change: "No change",
      icon: UserX,
      color: "text-orange-500",
    },
    {
      title: "Admin Users",
      value: "2",
      change: "No change",
      icon: Shield,
      color: "text-purple-500",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
