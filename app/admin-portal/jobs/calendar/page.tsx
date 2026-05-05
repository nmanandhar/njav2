"use client"

import { AdminJobsHeaderNav } from "@/components/admin/admin-jobs-header-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, CalendarIcon, MapPin, Truck, User, Package, Clock, Building2, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

type ViewMode = "monthly" | "weekly" | "daily"

const getMockInProgressJobs = () => {
  const today = new Date()
  const formatDate = (date: Date) => date.toISOString().split("T")[0]

  return [
    // This week - various days
    {
      id: "JOB-2025-001",
      client: "Sydney Metro Construction",
      material: "Hydraulic Oil - Premium Grade",
      pickupAddress: "45 Quarry Road, Maroota NSW",
      deliveryAddress: "789 George St, Sydney NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2)),
      startTime: "08:00",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2)),
      endTime: "17:00",
      driver: "John Smith",
      vehicle: "FL-001 (Volvo FH16)",
      status: "In Progress",
    },
    {
      id: "JOB-2025-002",
      client: "BuildCorp Pty Ltd",
      material: "VENM / Clay",
      pickupAddress: "23 Industrial Ave, Blacktown NSW",
      deliveryAddress: "150 Church St, Parramatta NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)),
      startTime: "06:00",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)),
      endTime: "14:00",
      driver: "Sarah Johnson",
      vehicle: "FL-002 (Scania R450)",
      status: "In Progress",
    },
    {
      id: "JOB-2025-003",
      client: "Urban Developments",
      material: "VENM / Sandstone",
      pickupAddress: "88 Logistics Way, Eastern Creek NSW",
      deliveryAddress: "234 Pacific Hwy, Chatswood NSW",
      startDate: formatDate(today),
      startTime: "09:00",
      endDate: formatDate(today),
      endTime: "16:00",
      driver: "Emma Wilson",
      vehicle: "FL-003 (Mercedes Actros)",
      status: "In Progress",
    },
    {
      id: "JOB-2025-004",
      client: "Infrastructure Co",
      material: "Hydraulic Oil - Premium Grade",
      pickupAddress: "12 Transport Road, Ryde NSW",
      deliveryAddress: "67 Construction Ave, North Sydney NSW",
      startDate: formatDate(today),
      startTime: "07:00",
      endDate: formatDate(today),
      endTime: "15:00",
      driver: "David Martinez",
      vehicle: "FL-004 (DAF XF)",
      status: "In Progress",
    },
    {
      id: "JOB-2025-005",
      client: "Coastal Builders",
      material: "VENM / Gravel",
      pickupAddress: "56 Port Botany Road, Botany NSW",
      deliveryAddress: "112 Beach Rd, Bondi NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)),
      startTime: "07:30",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)),
      endTime: "16:30",
      driver: "Mike Chen",
      vehicle: "FL-005 (Iveco Stralis)",
      status: "In Progress",
    },
    {
      id: "JOB-2025-006",
      client: "Northern Construction Ltd",
      material: "Hydraulic Oil - Standard",
      pickupAddress: "34 Hornsby Heights Rd, Hornsby NSW",
      deliveryAddress: "88 Pacific Hwy, Wahroonga NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2)),
      startTime: "08:00",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2)),
      endTime: "14:00",
      driver: "Lisa Anderson",
      vehicle: "FL-006 (Volvo FH)",
      status: "In Progress",
    },
    {
      id: "JOB-2025-007",
      client: "Western Sydney Projects",
      material: "VENM / Fill",
      pickupAddress: "290 Great Western Hwy, Penrith NSW",
      deliveryAddress: "45 Main St, Blacktown NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3)),
      startTime: "06:30",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3)),
      endTime: "15:00",
      driver: "Tom Roberts",
      vehicle: "FL-007 (Scania R500)",
      status: "In Progress",
    },
    {
      id: "JOB-2025-008",
      client: "Metropolitan Developments",
      material: "VENM / Rock",
      pickupAddress: "78 Cumberland Hwy, Carlingford NSW",
      deliveryAddress: "156 Victoria Rd, Gladesville NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4)),
      startTime: "07:00",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4)),
      endTime: "16:00",
      driver: "Rachel Green",
      vehicle: "FL-008 (MAN TGX)",
      status: "In Progress",
    },
    {
      id: "JOB-2025-009",
      client: "Eastern Suburbs Construction",
      material: "Hydraulic Oil - Premium Grade",
      pickupAddress: "12 Anzac Pde, Maroubra NSW",
      deliveryAddress: "234 Oxford St, Bondi Junction NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5)),
      startTime: "08:30",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5)),
      endTime: "17:00",
      driver: "James Wilson",
      vehicle: "FL-009 (Mercedes Arocs)",
      status: "In Progress",
    },
    // Next week
    {
      id: "JOB-2025-010",
      client: "Central Coast Builders",
      material: "VENM / Sand",
      pickupAddress: "45 Industrial Drive, Somersby NSW",
      deliveryAddress: "78 The Entrance Rd, The Entrance NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)),
      startTime: "06:00",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)),
      endTime: "14:30",
      driver: "Sarah Johnson",
      vehicle: "FL-002 (Scania R450)",
      status: "In Progress",
    },
    {
      id: "JOB-2025-011",
      client: "South West Projects",
      material: "VENM / Topsoil",
      pickupAddress: "123 Camden Valley Way, Camden NSW",
      deliveryAddress: "67 Narellan Rd, Narellan NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8)),
      startTime: "07:00",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8)),
      endTime: "15:00",
      driver: "John Smith",
      vehicle: "FL-001 (Volvo FH16)",
      status: "In Progress",
    },
    {
      id: "JOB-2025-012",
      client: "Inner West Developments",
      material: "Hydraulic Oil - Premium Grade",
      pickupAddress: "89 Parramatta Rd, Leichhardt NSW",
      deliveryAddress: "234 King St, Newtown NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 9)),
      startTime: "08:00",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 9)),
      endTime: "16:00",
      driver: "Emma Wilson",
      vehicle: "FL-003 (Mercedes Actros)",
      status: "In Progress",
    },
    {
      id: "JOB-2025-013",
      client: "North Shore Construction",
      material: "VENM / Crushed Rock",
      pickupAddress: "45 Miller St, North Sydney NSW",
      deliveryAddress: "178 Pacific Hwy, St Leonards NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10)),
      startTime: "07:30",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10)),
      endTime: "15:30",
      driver: "David Martinez",
      vehicle: "FL-004 (DAF XF)",
      status: "In Progress",
    },
    {
      id: "JOB-2025-014",
      client: "Hills District Projects",
      material: "VENM / Clay",
      pickupAddress: "234 Windsor Rd, Baulkham Hills NSW",
      deliveryAddress: "89 Castle Hill Rd, Castle Hill NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 11)),
      startTime: "06:30",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 11)),
      endTime: "14:30",
      driver: "Mike Chen",
      vehicle: "FL-005 (Iveco Stralis)",
      status: "In Progress",
    },
    {
      id: "JOB-2025-015",
      client: "Liverpool Construction Co",
      material: "Hydraulic Oil - Standard",
      pickupAddress: "156 Hoxton Park Rd, Liverpool NSW",
      deliveryAddress: "78 Macquarie St, Liverpool NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 12)),
      startTime: "07:00",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 12)),
      endTime: "15:00",
      driver: "Lisa Anderson",
      vehicle: "FL-006 (Volvo FH)",
      status: "In Progress",
    },
    {
      id: "JOB-2025-016",
      client: "Bankstown Developments",
      material: "VENM / Fill",
      pickupAddress: "89 Stacey St, Bankstown NSW",
      deliveryAddress: "234 Chapel Rd, Bankstown NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 13)),
      startTime: "08:00",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 13)),
      endTime: "16:00",
      driver: "Tom Roberts",
      vehicle: "FL-007 (Scania R500)",
      status: "In Progress",
    },
    {
      id: "JOB-2025-017",
      client: "Sutherland Shire Builders",
      material: "VENM / Sandstone",
      pickupAddress: "45 President Ave, Caringbah NSW",
      deliveryAddress: "123 Kingsway, Cronulla NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14)),
      startTime: "07:30",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14)),
      endTime: "15:30",
      driver: "Rachel Green",
      vehicle: "FL-008 (MAN TGX)",
      status: "In Progress",
    },
    {
      id: "JOB-2025-018",
      client: "Ryde Construction Services",
      material: "Hydraulic Oil - Premium Grade",
      pickupAddress: "67 Victoria Rd, Ryde NSW",
      deliveryAddress: "189 Delhi Rd, North Ryde NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15)),
      startTime: "08:00",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15)),
      endTime: "17:00",
      driver: "James Wilson",
      vehicle: "FL-009 (Mercedes Arocs)",
      status: "In Progress",
    },
    // Week after next
    {
      id: "JOB-2025-019",
      client: "Campbelltown Projects",
      material: "VENM / Gravel",
      pickupAddress: "234 Queen St, Campbelltown NSW",
      deliveryAddress: "78 Airds Rd, Campbelltown NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 18)),
      startTime: "06:00",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 18)),
      endTime: "14:00",
      driver: "Sarah Johnson",
      vehicle: "FL-002 (Scania R450)",
      status: "In Progress",
    },
    {
      id: "JOB-2025-020",
      client: "Manly Development Corp",
      material: "Hydraulic Oil - Standard",
      pickupAddress: "89 Pittwater Rd, Manly NSW",
      deliveryAddress: "45 The Corso, Manly NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 19)),
      startTime: "08:00",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 19)),
      endTime: "16:00",
      driver: "John Smith",
      vehicle: "FL-001 (Volvo FH16)",
      status: "In Progress",
    },
    {
      id: "JOB-2025-021",
      client: "Auburn Construction Ltd",
      material: "VENM / Rock",
      pickupAddress: "123 Parramatta Rd, Auburn NSW",
      deliveryAddress: "67 Station Rd, Auburn NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 21)),
      startTime: "07:00",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 21)),
      endTime: "15:00",
      driver: "Emma Wilson",
      vehicle: "FL-003 (Mercedes Actros)",
      status: "In Progress",
    },
    {
      id: "JOB-2025-022",
      client: "Burwood Developments",
      material: "VENM / Fill",
      pickupAddress: "178 Burwood Rd, Burwood NSW",
      deliveryAddress: "89 Concord Rd, Concord NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 22)),
      startTime: "08:30",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 22)),
      endTime: "16:30",
      driver: "David Martinez",
      vehicle: "FL-004 (DAF XF)",
      status: "In Progress",
    },
  ]
}

type Job = ReturnType<typeof getMockInProgressJobs>[0]

export default function JobsCalendarPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("weekly")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isJobModalOpen, setIsJobModalOpen] = useState(false)

  const mockInProgressJobs = getMockInProgressJobs()

  const handleJobClick = (job: Job) => {
    setSelectedJob(job)
    setIsJobModalOpen(true)
  }

  const formatDateHeader = () => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long" }
    if (viewMode === "weekly") {
      return `Week of ${currentDate.toLocaleDateString("en-AU", { month: "short", day: "numeric", year: "numeric" })}`
    }
    if (viewMode === "daily") {
      return currentDate.toLocaleDateString("en-AU", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    }
    return currentDate.toLocaleDateString("en-AU", options)
  }

  const handlePrevious = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "monthly") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else if (viewMode === "weekly") {
      newDate.setDate(newDate.getDate() - 7)
    } else {
      newDate.setDate(newDate.getDate() - 1)
    }
    setCurrentDate(newDate)
  }

  const handleNext = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "monthly") {
      newDate.setMonth(newDate.getMonth() + 1)
    } else if (viewMode === "weekly") {
      newDate.setDate(newDate.getDate() + 7)
    } else {
      newDate.setDate(newDate.getDate() + 1)
    }
    setCurrentDate(newDate)
  }

  const getFilteredJobs = () => {
    return mockInProgressJobs.filter((job) => {
      const jobDate = new Date(job.startDate)

      if (viewMode === "daily") {
        return jobDate.toDateString() === currentDate.toDateString()
      }

      if (viewMode === "weekly") {
        // Get the start of the week (Sunday)
        const weekStart = new Date(currentDate)
        const day = weekStart.getDay()
        const diff = weekStart.getDate() - day
        weekStart.setDate(diff)
        weekStart.setHours(0, 0, 0, 0)

        // Get the end of the week (Saturday)
        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekStart.getDate() + 6)
        weekEnd.setHours(23, 59, 59, 999)

        return jobDate >= weekStart && jobDate <= weekEnd
      }

      if (viewMode === "monthly") {
        return jobDate.getMonth() === currentDate.getMonth() && jobDate.getFullYear() === currentDate.getFullYear()
      }

      return true
    })
  }

  const filteredJobs = getFilteredJobs()

  const groupJobsByDate = () => {
    const grouped: Record<string, typeof mockInProgressJobs> = {}
    filteredJobs.forEach((job) => {
      const dateKey = job.startDate
      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }
      grouped[dateKey].push(job)
    })
    return grouped
  }

  const groupedJobs = groupJobsByDate()

  const getMonthCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)

    // Start from the Sunday before the first day of month
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - startDate.getDay())

    // End on the Saturday after the last day of month
    const endDate = new Date(lastDay)
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()))

    const days = []
    const current = new Date(startDate)

    while (current <= endDate) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }

    return days
  }

  const getJobsForDate = (date: Date) => {
    return mockInProgressJobs.filter((job) => {
      const jobDate = new Date(job.startDate)
      return jobDate.toDateString() === date.toDateString()
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-background border-b border-border px-6 py-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-orange-500 font-medium">Jobs</span>
          <span className="text-muted-foreground">›</span>
          <span className="text-foreground">Calendar</span>
        </div>
      </div>

      {/* Header with tabs */}
      <AdminJobsHeaderNav />

      <div className="p-6 space-y-6">
        {/* Calendar Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handlePrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                Today
              </Button>
              <Button variant="outline" size="icon" onClick={handleNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold">{formatDateHeader()}</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "monthly" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("monthly")}
            >
              Monthly
            </Button>
            <Button
              variant={viewMode === "weekly" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("weekly")}
            >
              Weekly
            </Button>
            <Button
              variant={viewMode === "daily" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("daily")}
            >
              Daily
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Jobs in Progress</div>
            <div className="text-3xl font-bold text-purple-600">{filteredJobs.length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Active Vehicles</div>
            <div className="text-3xl font-bold text-teal-600">{new Set(filteredJobs.map((j) => j.vehicle)).size}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Active Drivers</div>
            <div className="text-3xl font-bold text-blue-600">{new Set(filteredJobs.map((j) => j.driver)).size}</div>
          </Card>
        </div>

        {/* Calendar View */}
        <div className="space-y-4">
          {viewMode === "monthly" ? (
            <div className="space-y-4">
              {/* Calendar Grid */}
              <Card className="p-4">
                {/* Day headers */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar days */}
                <div className="grid grid-cols-7 gap-2">
                  {getMonthCalendarDays().map((date, idx) => {
                    const dayJobs = getJobsForDate(date)
                    const isCurrentMonth = date.getMonth() === currentDate.getMonth()
                    const isToday = date.toDateString() === new Date().toDateString()

                    return (
                      <div
                        key={idx}
                        className={cn(
                          "min-h-[120px] p-2 border rounded-lg",
                          !isCurrentMonth && "bg-muted/30 text-muted-foreground",
                          isToday && "border-primary border-2 bg-primary/5",
                        )}
                      >
                        <div className="text-sm font-medium mb-2">{date.getDate()}</div>
                        <div className="space-y-1">
                          {dayJobs.slice(0, 3).map((job) => (
                            <div
                              key={job.id}
                              className="text-xs p-1 rounded bg-purple-100 text-purple-800 truncate cursor-pointer hover:bg-purple-200"
                              title={`${job.id} - ${job.client}`}
                              onClick={() => handleJobClick(job)}
                            >
                              <div className="font-medium">{job.startTime}</div>
                              <div className="truncate">{job.id}</div>
                            </div>
                          ))}
                          {dayJobs.length > 3 && (
                            <div className="text-xs text-muted-foreground pl-1">+{dayJobs.length - 3} more</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>

              {/* Jobs list below calendar */}
              {filteredJobs.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">All Jobs This Month</h3>
                  {Object.entries(groupedJobs)
                    .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
                    .map(([date, jobs]) => (
                      <Card key={date} className="p-4">
                        <h4 className="font-semibold mb-3">
                          {new Date(date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </h4>
                        <div className="space-y-2">
                          {jobs.map((job) => (
                            <div
                              key={job.id}
                              className="flex items-center gap-4 p-2 border rounded-lg hover:bg-muted/50 cursor-pointer"
                              onClick={() => handleJobClick(job)}
                            >
                              <div className="flex-1 grid grid-cols-4 gap-4 text-sm">
                                <div>
                                  <span className="font-medium">{job.id}</span>
                                </div>
                                <div>{job.client}</div>
                                <div>{job.driver}</div>
                                <div className="text-muted-foreground">
                                  {job.startTime} - {job.endTime}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    ))}
                </div>
              )}
            </div>
          ) : viewMode === "daily" ? (
            <div className="space-y-3">
              {filteredJobs.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No jobs scheduled for this day</p>
                </Card>
              ) : (
                filteredJobs.map((job) => (
                  <Card key={job.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleJobClick(job)}>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{job.id}</h3>
                          <Badge className="bg-purple-100 text-purple-800 border-purple-200">{job.status}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Client:</span>
                            <span className="ml-2 font-medium">{job.client}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Material:</span>
                            <span className="ml-2 font-medium">{job.material}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Driver:</span>
                            <span className="ml-2 font-medium">{job.driver}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Vehicle:</span>
                            <span className="ml-2 font-medium">{job.vehicle}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-muted-foreground">Time:</span>
                            <span className="ml-2 font-medium">
                              {job.startTime} - {job.endTime}
                            </span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-muted-foreground">Pickup:</span>
                            <span className="ml-2">{job.pickupAddress}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-muted-foreground">Delivery:</span>
                            <span className="ml-2">{job.deliveryAddress}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {Object.keys(groupedJobs).length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No jobs scheduled for this week</p>
                </Card>
              ) : (
                Object.entries(groupedJobs)
                  .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
                  .map(([date, jobs]) => (
                    <Card key={date} className="p-4">
                      <div className="flex items-center gap-3 border-b pb-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-semibold text-lg">
                          {new Date(date).toLocaleDateString("en-AU", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </h3>
                        <Badge variant="outline" className="ml-2">
                          {jobs.length} {jobs.length === 1 ? "job" : "jobs"}
                        </Badge>
                      </div>
                      {jobs.map((job) => (
                        <Card key={job.id} className="p-4 ml-8 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleJobClick(job)}>
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-3">
                                <h4 className="font-semibold">{job.id}</h4>
                                <Badge className="bg-purple-100 text-purple-800 border-purple-200">{job.status}</Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Client:</span>
                                  <span className="ml-2 font-medium">{job.client}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Driver:</span>
                                  <span className="ml-2 font-medium">{job.driver}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Time:</span>
                                  <span className="ml-2 font-medium">
                                    {job.startTime} - {job.endTime}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Vehicle:</span>
                                  <span className="ml-2 font-medium">{job.vehicle}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </Card>
                  ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Job Details Modal */}
      <Dialog open={isJobModalOpen} onOpenChange={setIsJobModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold">{selectedJob?.id}</span>
                <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                  {selectedJob?.status}
                </Badge>
              </div>
            </DialogTitle>
          </DialogHeader>

          {selectedJob && (
            <div className="space-y-6">
              {/* Client & Material */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    Client
                  </div>
                  <p className="font-medium">{selectedJob.client}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Package className="h-4 w-4" />
                    Material
                  </div>
                  <p className="font-medium">{selectedJob.material}</p>
                </div>
              </div>

              {/* Driver & Vehicle */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    Driver
                  </div>
                  <p className="font-medium">{selectedJob.driver}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="h-4 w-4" />
                    Vehicle
                  </div>
                  <p className="font-medium">{selectedJob.vehicle}</p>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarIcon className="h-4 w-4" />
                    Date
                  </div>
                  <p className="font-medium">
                    {new Date(selectedJob.startDate).toLocaleDateString("en-AU", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Time
                  </div>
                  <p className="font-medium">{selectedJob.startTime} - {selectedJob.endTime}</p>
                </div>
              </div>

              {/* Pickup Address */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-green-600" />
                  Pickup Address
                </div>
                <p className="font-medium">{selectedJob.pickupAddress}</p>
              </div>

              {/* Delivery Address */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-red-600" />
                  Delivery Address
                </div>
                <p className="font-medium">{selectedJob.deliveryAddress}</p>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsJobModalOpen(false)} className="bg-transparent">
                  Close
                </Button>
                <Button 
                  className="bg-teal-700 hover:bg-teal-800"
                  onClick={() => window.location.href = `/admin-portal/jobs/jobs/${selectedJob.id}`}
                >
                  View Full Details
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
