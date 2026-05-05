import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, FileText, TrendingUp, Users, MapPin, Clock } from "lucide-react"

const stats = [
  {
    title: "Active Jobs",
    value: "24",
    change: "+3 from last week",
    changeType: "positive" as const,
    icon: Briefcase,
    description: "Currently in progress",
  },
  {
    title: "Pending Jobs",
    value: "8",
    change: "Same as last week",
    changeType: "neutral" as const,
    icon: FileText,
    description: "Scheduled for assignment",
  },
  {
    title: "Jobs This Month",
    value: "87",
    change: "+13 from last month",
    changeType: "positive" as const,
    icon: TrendingUp,
    description: "Compared to last month",
  },
  {
    title: "Active Drivers",
    value: "12",
    change: "+2",
    changeType: "positive" as const,
    icon: Users,
    description: "Currently available",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "job",
    title: "Job #2024-001 Completed",
    description: "Material delivery to Construction Site A",
    time: "2 hours ago",
    status: "completed",
  },
  {
    id: 2,
    type: "job",
    title: "New Job Assignment",
    description: "Driver John Smith assigned to Job #2024-002",
    time: "3 hours ago",
    status: "active",
  },
  {
    id: 3,
    type: "job",
    title: "Job #2024-003 Started",
    description: "Driver Sarah Johnson en route to pickup location",
    time: "4 hours ago",
    status: "active",
  },
  {
    id: 4,
    type: "job",
    title: "Driver Reassignment",
    description: "Job #2024-004 reassigned to Driver Mike Wilson",
    time: "6 hours ago",
    status: "active",
  },
]

export function DashboardStats() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Badge
                    variant={
                      stat.changeType === "positive"
                        ? "default"
                        : stat.changeType === "neutral"
                          ? "outline"
                          : "destructive"
                    }
                    className="text-xs"
                  >
                    {stat.change}
                  </Badge>
                  <span>{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {activity.type === "job" ? (
                    <Briefcase className="h-4 w-4 text-primary mt-1" />
                  ) : (
                    <FileText className="h-4 w-4 text-accent mt-1" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                    <Badge variant={activity.status === "completed" ? "default" : "secondary"} className="text-xs">
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Live View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Interactive map view</p>
                <p className="text-xs text-muted-foreground">Real-time driver locations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
