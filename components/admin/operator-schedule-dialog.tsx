"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Package, Construction, ExternalLink } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface Job {
  id: string
  client: string
  material: string
  site: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  operator: string
  machinery: string
  status: string
}

interface OperatorScheduleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  operator: {
    name: string
    email: string
    phone?: string
    photoUrl?: string
    machinery?: {
      id: string
      model: string
    }
    licenseType?: string
  } | null
}

// Mock function to get jobs for a specific operator
const getJobsForOperator = (operatorName: string | undefined): Job[] => {
  if (!operatorName) return []

  const today = new Date()
  const formatDate = (date: Date) => date.toISOString().split("T")[0]

  const allJobs: Job[] = [
    {
      id: "JOB-2025-004",
      client: "Sydney Metro Construction",
      material: "Excavation Works",
      site: "789 George St, Sydney NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2)),
      startTime: "07:00",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2)),
      endTime: "15:00",
      operator: "Robert Thompson",
      machinery: "EXC-001 (Caterpillar 320)",
      status: "In Progress",
    },
    {
      id: "JOB-2025-005",
      client: "BuildCorp Pty Ltd",
      material: "Site Preparation",
      site: "150 Church St, Parramatta NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)),
      startTime: "06:30",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)),
      endTime: "14:30",
      operator: "Jennifer Lee",
      machinery: "EXC-002 (Komatsu PC200)",
      status: "In Progress",
    },
    {
      id: "JOB-2025-006",
      client: "Urban Developments",
      material: "Foundation Digging",
      site: "234 Pacific Hwy, Chatswood NSW",
      startDate: formatDate(new Date(today)),
      startTime: "07:00",
      endDate: formatDate(new Date(today)),
      endTime: "16:00",
      operator: "Michael Chen",
      machinery: "EXC-003 (Hitachi ZX200)",
      status: "In Progress",
    },
    {
      id: "JOB-2025-012",
      client: "South West Projects",
      material: "Trenching Works",
      site: "67 Narellan Rd, Narellan NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8)),
      startTime: "06:00",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8)),
      endTime: "14:00",
      operator: "Robert Thompson",
      machinery: "EXC-001 (Caterpillar 320)",
      status: "Scheduled",
    },
    {
      id: "JOB-2025-013",
      client: "Central Coast Builders",
      material: "Demolition Works",
      site: "78 The Entrance Rd, The Entrance NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)),
      startTime: "07:00",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)),
      endTime: "15:30",
      operator: "Jennifer Lee",
      machinery: "EXC-002 (Komatsu PC200)",
      status: "Scheduled",
    },
    {
      id: "JOB-2025-021",
      client: "Manly Development Corp",
      material: "Grading Works",
      site: "45 The Corso, Manly NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 19)),
      startTime: "07:00",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 19)),
      endTime: "15:00",
      operator: "Robert Thompson",
      machinery: "EXC-001 (Caterpillar 320)",
      status: "Scheduled",
    },
    {
      id: "JOB-2025-022",
      client: "Campbelltown Projects",
      material: "Earthmoving",
      site: "78 Airds Rd, Campbelltown NSW",
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 18)),
      startTime: "06:30",
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 18)),
      endTime: "14:30",
      operator: "Jennifer Lee",
      machinery: "EXC-002 (Komatsu PC200)",
      status: "Scheduled",
    },
  ]

  return allJobs.filter((job) => job.operator === operatorName)
}

export function OperatorScheduleDialog({ open, onOpenChange, operator }: OperatorScheduleDialogProps) {
  const [viewMode, setViewMode] = useState<"week" | "month" | "day">("week")

  if (!operator) return null

  const jobs = getJobsForOperator(operator.name)
  const today = new Date()

  // Filter jobs based on view mode
  const getFilteredJobs = () => {
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const weekStart = new Date(todayStart)
    weekStart.setDate(todayStart.getDate() - todayStart.getDay())
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)
    weekEnd.setHours(23, 59, 59)

    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
    const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59)

    const dayEnd = new Date(todayStart)
    dayEnd.setHours(23, 59, 59)

    return jobs.filter((job) => {
      const jobDate = new Date(job.startDate)

      if (viewMode === "day") {
        return jobDate >= todayStart && jobDate <= dayEnd
      } else if (viewMode === "week") {
        return jobDate >= weekStart && jobDate <= weekEnd
      } else {
        return jobDate >= monthStart && jobDate <= monthEnd
      }
    })
  }

  const filteredJobs = getFilteredJobs()

  // Group jobs by date
  const jobsByDate = filteredJobs.reduce(
    (acc, job) => {
      const date = job.startDate
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(job)
      return acc
    },
    {} as Record<string, Job[]>,
  )

  const sortedDates = Object.keys(jobsByDate).sort()

  // Calculate stats
  const totalJobs = filteredJobs.length
  const totalHours = filteredJobs.reduce((sum, job) => {
    const [startHour, startMin] = job.startTime.split(":").map(Number)
    const [endHour, endMin] = job.endTime.split(":").map(Number)
    const hours = endHour - startHour + (endMin - startMin) / 60
    return sum + hours
  }, 0)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const formatDateHeader = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-AU", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getViewModeTitle = () => {
    if (viewMode === "day") return "Today's Schedule"
    if (viewMode === "week") return "This Week's Schedule"
    return "This Month's Schedule"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[95vw] w-full sm:!max-w-[95vw] md:!max-w-[1400px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">Operator Schedule</DialogTitle>
            <Link href="/admin-portal/jobs/calendar">
              <Button variant="outline" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Full Calendar
              </Button>
            </Link>
          </div>
        </DialogHeader>

        {/* Operator Info Header */}
        <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
          <Avatar className="h-16 w-16">
            <AvatarImage src={operator.photoUrl || "/placeholder.svg"} alt={operator.name} />
            <AvatarFallback className="bg-teal-600 text-white text-lg">{getInitials(operator.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{operator.name}</h3>
            <p className="text-sm text-muted-foreground">{operator.email}</p>
            {operator.phone && <p className="text-sm text-muted-foreground">{operator.phone}</p>}
          </div>
          <div className="flex flex-col gap-2 items-end">
            {operator.machinery && (
              <div className="flex items-center gap-2 text-sm">
                <Construction className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{operator.machinery.id}</span>
                <span className="text-muted-foreground">({operator.machinery.model})</span>
              </div>
            )}
            {operator.licenseType && (
              <Badge variant="default" className="bg-teal-600 hover:bg-teal-700">
                License: {operator.licenseType}
              </Badge>
            )}
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{getViewModeTitle()}</h3>
            <p className="text-sm text-muted-foreground">
              {totalJobs} {totalJobs === 1 ? "job" : "jobs"} • {totalHours.toFixed(1)} hours
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant={viewMode === "day" ? "default" : "outline"} size="sm" onClick={() => setViewMode("day")}>
              Daily
            </Button>
            <Button variant={viewMode === "week" ? "default" : "outline"} size="sm" onClick={() => setViewMode("week")}>
              Weekly
            </Button>
            <Button
              variant={viewMode === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("month")}
            >
              Monthly
            </Button>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {sortedDates.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Jobs Scheduled</h3>
              <p className="text-sm text-muted-foreground">{operator.name} has no jobs scheduled for this period.</p>
            </div>
          ) : (
            sortedDates.map((date) => (
              <div key={date} className="space-y-3">
                <div className="sticky top-0 bg-background z-10 pb-2">
                  <h4 className="text-sm font-semibold text-muted-foreground border-b pb-2">
                    {formatDateHeader(date)}
                  </h4>
                </div>
                <div className="space-y-3">
                  {jobsByDate[date].map((job) => (
                    <div key={job.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-base">{job.id}</span>
                            <Badge
                              variant="outline"
                              className={
                                job.status === "In Progress"
                                  ? "bg-purple-50 text-purple-700 border-purple-200"
                                  : "bg-blue-50 text-blue-700 border-blue-200"
                              }
                            >
                              {job.status}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium text-muted-foreground">{job.client}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {job.startTime} - {job.endTime}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <Package className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs text-muted-foreground">Work Type</p>
                              <p className="text-sm font-medium">{job.material}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Construction className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs text-muted-foreground">Machinery</p>
                              <p className="text-sm font-medium">{job.machinery}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs text-muted-foreground">Site Location</p>
                              <p className="text-sm">{job.site}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* DialogFooter with Close button */}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
