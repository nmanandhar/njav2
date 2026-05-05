"use client"

import { useState } from "react"
import { DashboardTopNav } from "@/components/subcontractor/dashboard-topnav"
import { SubcontractorJobsHeaderNav } from "@/components/subcontractor/subcontractor-jobs-header-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Clock, 
  Truck,
  User,
  Package
} from "lucide-react"

// Mock calendar data for subcontractor's jobs only
const mockCalendarJobs = [
  {
    id: "JOB-2024-003",
    date: "2024-01-15",
    time: "08:00",
    client: "XYZ Logistics",
    pickup: "789 Warehouse Rd, Sydney",
    delivery: "321 Delivery Ln, Parramatta",
    material: "Sand - 15m³",
    status: "scheduled",
    driver: "Michael Brown",
    vehicle: "SUB-003"
  },
  {
    id: "JOB-2024-004",
    date: "2024-01-15",
    time: "14:00",
    client: "Infrastructure Co",
    pickup: "321 Highway Rd, Perth",
    delivery: "21 Quarry St, Mandurah",
    material: "Rock - 18m³",
    status: "in-progress",
    driver: "Sarah Johnson",
    vehicle: "PQR-678"
  },
  {
    id: "JOB-2024-008",
    date: "2024-01-16",
    time: "07:30",
    client: "Sydney Metro Construction",
    pickup: "Boral Quarry, Maroota",
    delivery: "George St Site, Sydney CBD",
    material: "Concrete Mix - 20m³",
    status: "scheduled",
    driver: "Michael Brown",
    vehicle: "SUB-003"
  },
  {
    id: "JOB-2024-009",
    date: "2024-01-17",
    time: "06:00",
    client: "Westfield Development",
    pickup: "Hanson Plant, Silverwater",
    delivery: "Westfield Site, Parramatta",
    material: "Aggregate - 25m³",
    status: "scheduled",
    driver: "Sarah Johnson",
    vehicle: "PQR-678"
  },
  {
    id: "JOB-2024-010",
    date: "2024-01-18",
    time: "09:00",
    client: "Residential Builders",
    pickup: "Holcim Plant, Berrima",
    delivery: "New Estate, Camden",
    material: "Sand - 12m³",
    status: "scheduled",
    driver: "Michael Brown",
    vehicle: "SUB-003"
  }
]

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export default function SubcontractorCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 15)) // January 2024
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2024, 0, 15))
  const [viewMode, setViewMode] = useState<"month" | "week">("month")
  const [driverFilter, setDriverFilter] = useState("all")

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Generate calendar days
  const calendarDays = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(new Date(year, month + (direction === "next" ? 1 : -1), 1))
  }

  const getJobsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return mockCalendarJobs.filter(job => {
      const matchesDate = job.date === dateStr
      const matchesDriver = driverFilter === "all" || job.driver === driverFilter
      return matchesDate && matchesDriver
    })
  }

  const getSelectedDateJobs = () => {
    if (!selectedDate) return []
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
    return mockCalendarJobs.filter(job => {
      const matchesDate = job.date === dateStr
      const matchesDriver = driverFilter === "all" || job.driver === driverFilter
      return matchesDate && matchesDriver
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-blue-100 text-blue-700 border-blue-200"
      case "in-progress": return "bg-amber-100 text-amber-700 border-amber-200"
      case "completed": return "bg-green-100 text-green-700 border-green-200"
      default: return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const uniqueDrivers = [...new Set(mockCalendarJobs.map(job => job.driver))]

  return (
    <div className="min-h-screen bg-background">
      <DashboardTopNav />
      <SubcontractorJobsHeaderNav />
      
      <main className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CardTitle className="text-xl">
                      {monthNames[month]} {year}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent" onClick={() => navigateMonth("prev")}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent" onClick={() => navigateMonth("next")}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={driverFilter} onValueChange={setDriverFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="All Drivers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Drivers</SelectItem>
                        {uniqueDrivers.map(driver => (
                          <SelectItem key={driver} value={driver}>{driver}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={viewMode} onValueChange={(v) => setViewMode(v as "month" | "week")}>
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="month">Month</SelectItem>
                        <SelectItem value="week">Week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Days of week header */}
                <div className="grid grid-cols-7 mb-2">
                  {daysOfWeek.map(day => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => {
                    if (day === null) {
                      return <div key={`empty-${index}`} className="h-24 bg-muted/30 rounded-md" />
                    }

                    const jobs = getJobsForDate(day)
                    const isSelected = selectedDate && 
                      selectedDate.getDate() === day && 
                      selectedDate.getMonth() === month && 
                      selectedDate.getFullYear() === year
                    const isToday = day === 15 && month === 0 && year === 2024 // Mock "today"

                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDate(new Date(year, month, day))}
                        className={`h-24 p-1 rounded-md border text-left transition-colors ${
                          isSelected 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary/50 hover:bg-muted/50"
                        }`}
                      >
                        <div className={`text-sm font-medium mb-1 ${
                          isToday ? "bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center" : ""
                        }`}>
                          {day}
                        </div>
                        <div className="space-y-0.5 overflow-hidden">
                          {jobs.slice(0, 2).map(job => (
                            <div 
                              key={job.id} 
                              className={`text-xs px-1 py-0.5 rounded truncate ${getStatusColor(job.status)}`}
                            >
                              {job.time} - {job.client}
                            </div>
                          ))}
                          {jobs.length > 2 && (
                            <div className="text-xs text-muted-foreground px-1">
                              +{jobs.length - 2} more
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Selected Date Jobs */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {selectedDate ? (
                    <>
                      {selectedDate.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" })}
                    </>
                  ) : (
                    "Select a date"
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDate ? (
                  <div className="space-y-4">
                    {getSelectedDateJobs().length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-8">
                        No jobs scheduled for this date
                      </p>
                    ) : (
                      getSelectedDateJobs().map(job => (
                        <div key={job.id} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold text-primary">{job.id}</p>
                              <p className="text-sm text-muted-foreground">{job.client}</p>
                            </div>
                            <Badge variant="outline" className={getStatusColor(job.status)}>
                              {job.status === "in-progress" ? "In Progress" : job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                            </Badge>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{job.time}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-green-600 mt-0.5" />
                              <div>
                                <p className="text-xs text-muted-foreground">Pickup</p>
                                <p>{job.pickup}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-red-600 mt-0.5" />
                              <div>
                                <p className="text-xs text-muted-foreground">Delivery</p>
                                <p>{job.delivery}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Package className="h-4 w-4" />
                              <span>{job.material}</span>
                            </div>
                          </div>

                          <div className="pt-2 border-t flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{job.driver}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Truck className="h-4 w-4 text-muted-foreground" />
                              <span className="font-mono">{job.vehicle}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Click on a date to view scheduled jobs
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Legend */}
            <Card className="mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Status Legend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-sm">Scheduled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="text-sm">In Progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm">Completed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
