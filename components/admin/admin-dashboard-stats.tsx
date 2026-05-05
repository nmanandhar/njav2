"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, FileText, TrendingUp, Users, Truck, MapPin, Clock, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"

const stats = [
  {
    title: "Total Clients",
    value: "156",
    change: "+13 from last month",
    changeType: "positive" as const,
    icon: Users,
    description: "Active client accounts",
  },
  {
    title: "Active Jobs",
    value: "42",
    change: "+5 from last week",
    changeType: "positive" as const,
    icon: Briefcase,
    description: "Currently in progress",
  },
  {
    title: "Pending Invoices",
    value: "23",
    change: "-1 from last week",
    changeType: "negative" as const,
    icon: FileText,
    description: "Awaiting payment",
  },
  {
    title: "Active Drivers",
    value: "28",
    change: "+3",
    changeType: "positive" as const,
    icon: Users,
    description: "Currently available",
  },
  {
    title: "Fleet Vehicles",
    value: "35",
    change: "+2",
    changeType: "positive" as const,
    icon: Truck,
    description: "Total fleet size",
  },
  {
    title: "Revenue (MTD)",
    value: "$127,450",
    change: "+$24,500 from last month",
    changeType: "positive" as const,
    icon: TrendingUp,
    description: "Month to date",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "job",
    title: "Job #2024-089 Completed",
    description: "Concrete delivery to Westfield Construction",
    time: "15 minutes ago",
    status: "completed",
    priority: "high",
  },
  {
    id: 2,
    type: "invoice",
    title: "Invoice #RCTI-2024-156 Paid",
    description: "Payment received - $4,250.00",
    time: "32 minutes ago",
    status: "paid",
    priority: "normal",
  },
  {
    id: 3,
    type: "job",
    title: "New Job Assignment",
    description: "Driver Mike Johnson assigned to Job #2024-090",
    time: "1 hour ago",
    status: "active",
    priority: "normal",
  },
  {
    id: 4,
    type: "alert",
    title: "Vehicle Maintenance Due",
    description: "Truck #FL-007 requires scheduled maintenance",
    time: "2 hours ago",
    status: "warning",
    priority: "high",
  },
  {
    id: 5,
    type: "job",
    title: "Job #2024-088 Started",
    description: "Sand delivery to Metro Construction Site",
    time: "3 hours ago",
    status: "active",
    priority: "normal",
  },
]

export function AdminDashboardStats() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  return (
    <div className="space-y-6">
      {/* Header with Live Time */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Business Overview</h2>
          <p className="text-muted-foreground">Real-time operational metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">
              {currentTime.toLocaleDateString("en-AU", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="text-lg font-mono text-primary">
              {currentTime.toLocaleTimeString("en-AU", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-2 bg-transparent"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="bg-card border-border hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
                <div className="space-y-1 mt-1">
                  <Badge variant={stat.changeType === "positive" ? "default" : "destructive"} className="text-xs">
                    {stat.change}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity - Takes 2 columns */}
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-shrink-0">
                  {activity.type === "job" ? (
                    <Briefcase className="h-4 w-4 text-primary mt-1" />
                  ) : activity.type === "invoice" ? (
                    <FileText className="h-4 w-4 text-green-600 mt-1" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-orange-600 mt-1" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-card-foreground">{activity.title}</p>
                    {activity.priority === "high" && (
                      <Badge variant="destructive" className="text-xs">
                        High
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                    <Badge
                      variant={
                        activity.status === "completed" || activity.status === "paid"
                          ? "default"
                          : activity.status === "warning"
                            ? "destructive"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Live Map View - Takes 1 column */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Live Fleet View</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Simulated Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950"></div>

              {/* Simulated Vehicle Markers */}
              <div className="absolute top-4 left-4 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div className="absolute top-8 right-6 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute bottom-6 left-8 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 right-4 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>

              <div className="text-center z-10">
                <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Live Tracking Active</p>
                <p className="text-xs text-muted-foreground">28 vehicles online</p>
                <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                  View Full Map
                </Button>
              </div>
            </div>

            {/* Fleet Status Summary */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Active</span>
                </span>
                <span className="font-medium">24</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>En Route</span>
                </span>
                <span className="font-medium">4</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Maintenance</span>
                </span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>Offline</span>
                </span>
                <span className="font-medium">4</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
