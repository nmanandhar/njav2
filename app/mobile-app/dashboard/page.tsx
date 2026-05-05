"use client"

import { useState } from "react"
import Link from "next/link"
import { Package, MessageSquare, Clock, LogOut, Menu, X, ChevronRight, Truck, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MobileAppDashboard() {
  const [menuOpen, setMenuOpen] = useState(false)

  const activeJobs = [
    {
      id: "JOB-2024-001",
      client: "ABC Manufacturing",
      pickup: "123 Industrial Ave",
      tip: "456 Commerce St",
      status: "Awaiting Response",
      priority: "High",
      isNew: true, // Added isNew flag for new job indicator
    },
    {
      id: "JOB-2024-003",
      client: "XYZ Logistics",
      pickup: "789 Warehouse Rd",
      tip: "321 Delivery Ln",
      status: "Pending",
      priority: "Normal",
      inProgress: true, // Added inProgress flag for in-progress job indicator
    },
    {
      id: "JOB-2024-004",
      client: "Infrastructure Co",
      pickup: "321 Highway Rd, Perth WA",
      tip: "21 Quarry St, Mandurah WA",
      status: "Started",
      priority: "Normal",
      jobStarted: true, // Job has been accepted, pre-start completed, and started
    },
    {
      id: "JOB-2024-010",
      client: "Westfield Development",
      pickup: "88 Cement Works, Auburn NSW",
      tip: "Westfield Site, Parramatta NSW",
      status: "Accepted",
      priority: "Normal",
      readyToStart: true, // Pre-start already completed today on same vehicle
      preStartInfo: { completedAt: "06:30 AM", fromJob: "JOB-2024-003", vehicle: "SUB-003" },
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
              <Truck className="h-5 w-5 text-chart-3" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">Driver Dashboard</h1>
              <p className="text-xs text-muted-foreground">John Driver</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-border p-4 space-y-2 lg:hidden">
            <Link href="/mobile-app/dashboard">
              <Button variant="ghost" className="w-full justify-start">
                <Package className="mr-2 h-4 w-4" />
                Active Jobs
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6 max-w-4xl mx-auto">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                  <Package className="h-5 w-5 text-chart-1" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">5</p>
                  <p className="text-xs text-muted-foreground">Active Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">6.5h</p>
                  <p className="text-xs text-muted-foreground">Hours Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Jobs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Active Jobs
            </CardTitle>
            <CardDescription>Your current job assignments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeJobs.map((job) => (
              <div key={job.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">{job.id}</p>
                      {job.isNew && (
                        <div className="flex items-center gap-1 bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                          New
                        </div>
                      )}
                      {job.inProgress && (
                        <div className="flex items-center gap-1 bg-amber-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                          In Progress
                        </div>
                      )}
                      {job.jobStarted && (
                        <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                          Started
                        </div>
                      )}
                      
                      {job.readyToStart && (
                        <div className="flex items-center gap-1 bg-teal-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                          Ready to Start
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{job.client}</p>
                  </div>
                  <Badge variant={job.priority === "High" ? "destructive" : "secondary"}>{job.priority}</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-chart-1 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground text-xs">Pickup</p>
                      <p className="text-foreground">{job.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-chart-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-muted-foreground text-xs">Tip</p>
                      <p className="text-foreground">{job.tip}</p>
                    </div>
                  </div>
                </div>
                {job.isNew && (
                  <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-xs font-medium text-blue-700">⚠️ Action Required: Accept or Reject this job</p>
                  </div>
                )}

                {job.inProgress && (
                  <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-md">
                    <p className="text-xs font-medium text-amber-700">
                      ✓ Accepted - Complete Pre-Start Checklist to begin
                    </p>
                  </div>
                )}

                {job.jobStarted && (
                  <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-xs font-medium text-green-700">
                      ✓ Job Active - Pre-Start Complete, En Route to Pickup
                    </p>
                  </div>
                )}

                

                {job.readyToStart && (
                  <div className="mt-3 p-2 bg-teal-50 border border-teal-200 rounded-md">
                    <p className="text-xs font-medium text-teal-700">
                      ✓ Accepted - Ready to Start
                    </p>
                    {job.preStartInfo && (
                      <p className="text-xs text-teal-600 mt-1">
                        Pre-start completed at {job.preStartInfo.completedAt} on {job.preStartInfo.vehicle} ({job.preStartInfo.fromJob})
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-3">
                  <Link href={`/mobile-app/dashboard/job/${job.id}`} className="block w-full">
                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                      View Details
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Feature Grid - Only Messages and Timesheet remain */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Messaging */}
          <Link href="/mobile-app/dashboard/messages" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-chart-4/10 flex items-center justify-center mb-3">
                  <MessageSquare className="h-6 w-6 text-chart-4" />
                </div>
                <CardTitle className="text-lg">Messages</CardTitle>
                <CardDescription>Chat with dispatch team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">3 New</Badge>
                  <Button variant="outline" size="sm">
                    Open
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Timesheet */}
          <Link href="/mobile-app/dashboard/timesheet" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-chart-5/10 flex items-center justify-center mb-3">
                  <Clock className="h-6 w-6 text-chart-5" />
                </div>
                <CardTitle className="text-lg">Timesheet</CardTitle>
                <CardDescription>Track your hours and breaks</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  Open
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Sign Out Button */}
        <div className="pt-4">
          <Link href="/">
            <Button variant="outline" className="w-full text-destructive hover:text-destructive bg-transparent">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
