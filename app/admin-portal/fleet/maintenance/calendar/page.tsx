"use client"

import { AdminMaintenanceHeader } from "@/components/admin/admin-maintenance-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

type ViewMode = "monthly" | "weekly" | "daily"

const getMockServiceEvents = () => {
  const today = new Date()
  const formatDate = (date: Date) => date.toISOString().split("T")[0]

  return [
    // This week
    {
      id: "SVC-2025-001",
      workOrderId: "WO-2025-001",
      vehicle: "FL-001 (Volvo FH16)",
      registration: "ABC123",
      serviceType: "Major Service (B)",
      scheduledDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2)),
      scheduledTime: "08:00",
      estimatedDuration: "4 hours",
      vendor: "Quick Fix Auto Service",
      technician: "Mike Johnson",
      status: "Completed",
      priority: "Standard",
      cost: "$850",
    },
    {
      id: "SVC-2025-002",
      workOrderId: "WO-2025-002",
      vehicle: "FL-002 (Scania R450)",
      registration: "XYZ789",
      serviceType: "Compliance Roadworthy",
      scheduledDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)),
      scheduledTime: "09:00",
      estimatedDuration: "2 hours",
      vendor: "Premium Fleet Services",
      technician: "Sarah Lee",
      status: "Completed",
      priority: "Critical",
      cost: "$450",
    },
    {
      id: "SVC-2025-003",
      workOrderId: "WO-2025-003",
      vehicle: "FL-003 (Mercedes Actros)",
      registration: "LMN456",
      serviceType: "Engine Oil & Filters",
      scheduledDate: formatDate(today),
      scheduledTime: "07:00",
      estimatedDuration: "3 hours",
      vendor: "Express Maintenance Co",
      technician: "David Chen",
      status: "In Progress",
      priority: "Standard",
      cost: "$320",
    },
    {
      id: "SVC-2025-004",
      workOrderId: "WO-2025-004",
      vehicle: "FL-004 (DAF XF)",
      registration: "DEF321",
      serviceType: "Brake Inspection",
      scheduledDate: formatDate(today),
      scheduledTime: "10:00",
      estimatedDuration: "2 hours",
      vendor: "Quick Fix Auto Service",
      technician: "Mike Johnson",
      status: "Scheduled",
      priority: "Critical",
      cost: "$280",
    },
    {
      id: "SVC-2025-005",
      workOrderId: "WO-2025-005",
      vehicle: "FL-005 (Iveco Stralis)",
      registration: "GHI654",
      serviceType: "Tire Replacement",
      scheduledDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)),
      scheduledTime: "08:30",
      estimatedDuration: "3 hours",
      vendor: "Premium Fleet Services",
      technician: "Sarah Lee",
      status: "Scheduled",
      priority: "Standard",
      cost: "$1200",
    },
    {
      id: "SVC-2025-006",
      workOrderId: "WO-2025-006",
      vehicle: "FL-006 (Volvo FH)",
      registration: "JKL987",
      serviceType: "Air Conditioning Service",
      scheduledDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2)),
      scheduledTime: "09:00",
      estimatedDuration: "2 hours",
      vendor: "Express Maintenance Co",
      technician: "David Chen",
      status: "Scheduled",
      priority: "Standard",
      cost: "$380",
    },
    {
      id: "SVC-2025-007",
      workOrderId: "WO-2025-007",
      vehicle: "FL-007 (Scania R500)",
      registration: "MNO234",
      serviceType: "Transmission Service",
      scheduledDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3)),
      scheduledTime: "07:30",
      estimatedDuration: "5 hours",
      vendor: "Quick Fix Auto Service",
      technician: "Mike Johnson",
      status: "Scheduled",
      priority: "Critical",
      cost: "$1450",
    },
    {
      id: "SVC-2025-008",
      workOrderId: "WO-2025-008",
      vehicle: "FL-008 (MAN TGX)",
      registration: "PQR567",
      serviceType: "Minor Service (A)",
      scheduledDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4)),
      scheduledTime: "08:00",
      estimatedDuration: "2 hours",
      vendor: "Premium Fleet Services",
      technician: "Sarah Lee",
      status: "Scheduled",
      priority: "Standard",
      cost: "$420",
    },
    {
      id: "SVC-2025-009",
      workOrderId: "WO-2025-009",
      vehicle: "FL-009 (Mercedes Arocs)",
      registration: "STU890",
      serviceType: "Suspension Check",
      scheduledDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5)),
      scheduledTime: "09:30",
      estimatedDuration: "3 hours",
      vendor: "Express Maintenance Co",
      technician: "David Chen",
      status: "Scheduled",
      priority: "Standard",
      cost: "$520",
    },
    // Next week
    {
      id: "SVC-2025-010",
      workOrderId: "WO-2025-010",
      vehicle: "FL-010 (Volvo FM)",
      registration: "VWX123",
      serviceType: "Electrical System Check",
      scheduledDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)),
      scheduledTime: "08:00",
      estimatedDuration: "4 hours",
      vendor: "Quick Fix Auto Service",
      technician: "Mike Johnson",
      status: "Scheduled",
      priority: "Standard",
      cost: "$650",
    },
    {
      id: "SVC-2025-011",
      workOrderId: "WO-2025-011",
      vehicle: "FL-001 (Volvo FH16)",
      registration: "ABC123",
      serviceType: "Wheel Alignment",
      scheduledDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8)),
      scheduledTime: "10:00",
      estimatedDuration: "2 hours",
      vendor: "Premium Fleet Services",
      technician: "Sarah Lee",
      status: "Scheduled",
      priority: "Standard",
      cost: "$180",
    },
    {
      id: "SVC-2025-012",
      workOrderId: "WO-2025-012",
      vehicle: "FL-002 (Scania R450)",
      registration: "XYZ789",
      serviceType: "Coolant System Service",
      scheduledDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 9)),
      scheduledTime: "08:30",
      estimatedDuration: "3 hours",
      vendor: "Express Maintenance Co",
      technician: "David Chen",
      status: "Scheduled",
      priority: "Standard",
      cost: "$480",
    },
    {
      id: "SVC-2025-013",
      workOrderId: "WO-2025-013",
      vehicle: "FL-003 (Mercedes Actros)",
      registration: "LMN456",
      serviceType: "Exhaust System Inspection",
      scheduledDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10)),
      scheduledTime: "09:00",
      estimatedDuration: "2 hours",
      vendor: "Quick Fix Auto Service",
      technician: "Mike Johnson",
      status: "Scheduled",
      priority: "Critical",
      cost: "$320",
    },
    {
      id: "SVC-2025-014",
      workOrderId: "WO-2025-014",
      vehicle: "FL-004 (DAF XF)",
      registration: "DEF321",
      serviceType: "Battery Replacement",
      scheduledDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 11)),
      scheduledTime: "07:00",
      estimatedDuration: "1 hour",
      vendor: "Premium Fleet Services",
      technician: "Sarah Lee",
      status: "Scheduled",
      priority: "Standard",
      cost: "$280",
    },
    {
      id: "SVC-2025-015",
      workOrderId: "WO-2025-015",
      vehicle: "FL-005 (Iveco Stralis)",
      registration: "GHI654",
      serviceType: "Fuel System Clean",
      scheduledDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 12)),
      scheduledTime: "08:00",
      estimatedDuration: "4 hours",
      vendor: "Express Maintenance Co",
      technician: "David Chen",
      status: "Scheduled",
      priority: "Standard",
      cost: "$550",
    },
  ]
}

export default function ServiceCalendarPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("weekly")
  const [currentDate, setCurrentDate] = useState(new Date())

  const mockServiceEvents = getMockServiceEvents()

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

  const getFilteredServices = () => {
    return mockServiceEvents.filter((service) => {
      const serviceDate = new Date(service.scheduledDate)

      if (viewMode === "daily") {
        return serviceDate.toDateString() === currentDate.toDateString()
      }

      if (viewMode === "weekly") {
        const weekStart = new Date(currentDate)
        const day = weekStart.getDay()
        const diff = weekStart.getDate() - day
        weekStart.setDate(diff)
        weekStart.setHours(0, 0, 0, 0)

        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekStart.getDate() + 6)
        weekEnd.setHours(23, 59, 59, 999)

        return serviceDate >= weekStart && serviceDate <= weekEnd
      }

      if (viewMode === "monthly") {
        return (
          serviceDate.getMonth() === currentDate.getMonth() && serviceDate.getFullYear() === currentDate.getFullYear()
        )
      }

      return true
    })
  }

  const filteredServices = getFilteredServices()

  const groupServicesByDate = () => {
    const grouped: Record<string, typeof mockServiceEvents> = {}
    filteredServices.forEach((service) => {
      const dateKey = service.scheduledDate
      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }
      grouped[dateKey].push(service)
    })
    return grouped
  }

  const groupedServices = groupServicesByDate()

  const getMonthCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - startDate.getDay())

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

  const getServicesForDate = (date: Date) => {
    return mockServiceEvents.filter((service) => {
      const serviceDate = new Date(service.scheduledDate)
      return serviceDate.toDateString() === date.toDateString()
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "In Progress":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "Overdue":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "Standard":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-background border-b border-border px-6 py-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-orange-500 font-medium">Fleet Management</span>
          <span className="text-muted-foreground">›</span>
          <span className="text-muted-foreground">Vehicle Maintenance</span>
          <span className="text-muted-foreground">›</span>
          <span className="text-foreground">Calendar</span>
        </div>
      </div>

      {/* Header with tabs */}
      <AdminMaintenanceHeader />

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
            <div className="text-sm text-muted-foreground mb-1">Scheduled Services</div>
            <div className="text-3xl font-bold text-blue-600">{filteredServices.length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Vehicles in Service</div>
            <div className="text-3xl font-bold text-orange-600">
              {new Set(filteredServices.map((s) => s.vehicle)).size}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Estimated Cost</div>
            <div className="text-3xl font-bold text-teal-600">
              $
              {filteredServices
                .reduce((sum, s) => sum + Number.parseInt(s.cost.replace(/[^0-9]/g, "")), 0)
                .toLocaleString()}
            </div>
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
                    const dayServices = getServicesForDate(date)
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
                          {dayServices.slice(0, 3).map((service) => (
                            <div
                              key={service.id}
                              className={cn(
                                "text-xs p-1 rounded truncate cursor-pointer hover:opacity-80",
                                getStatusColor(service.status),
                              )}
                              title={`${service.workOrderId} - ${service.vehicle} - ${service.serviceType}`}
                            >
                              <div className="font-medium">{service.scheduledTime}</div>
                              <div className="truncate">{service.workOrderId}</div>
                            </div>
                          ))}
                          {dayServices.length > 3 && (
                            <div className="text-xs text-muted-foreground pl-1">+{dayServices.length - 3} more</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>

              {/* Services list below calendar */}
              {filteredServices.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">All Services This Month</h3>
                  {Object.entries(groupedServices)
                    .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
                    .map(([date, services]) => (
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
                          {services.map((service) => (
                            <div
                              key={service.id}
                              className="flex items-center gap-4 p-2 border rounded-lg hover:bg-muted/50"
                            >
                              <div className="flex-1 grid grid-cols-4 gap-4 text-sm">
                                <div>
                                  <span className="font-medium">{service.workOrderId}</span>
                                </div>
                                <div>{service.vehicle}</div>
                                <div>{service.serviceType}</div>
                                <div className="text-muted-foreground">
                                  {service.scheduledTime} ({service.estimatedDuration})
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
              {filteredServices.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No services scheduled for this day</p>
                </Card>
              ) : (
                filteredServices.map((service) => (
                  <Card key={service.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{service.workOrderId}</h3>
                          <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                          <Badge className={getPriorityColor(service.priority)}>{service.priority}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Vehicle:</span>
                            <span className="ml-2 font-medium">{service.vehicle}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Registration:</span>
                            <span className="ml-2 font-medium">{service.registration}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Service Type:</span>
                            <span className="ml-2 font-medium">{service.serviceType}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Vendor:</span>
                            <span className="ml-2 font-medium">{service.vendor}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Technician:</span>
                            <span className="ml-2 font-medium">{service.technician}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Time:</span>
                            <span className="ml-2 font-medium">
                              {service.scheduledTime} ({service.estimatedDuration})
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Estimated Cost:</span>
                            <span className="ml-2 font-medium">{service.cost}</span>
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
              {Object.keys(groupedServices).length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No services scheduled for this week</p>
                </Card>
              ) : (
                Object.entries(groupedServices)
                  .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
                  .map(([date, services]) => (
                    <Card key={date} className="p-4">
                      <div className="flex items-center gap-3 border-b pb-2 mb-4">
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
                          {services.length} {services.length === 1 ? "service" : "services"}
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        {services.map((service) => (
                          <Card key={service.id} className="p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                              <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-3">
                                  <h4 className="font-semibold">{service.workOrderId}</h4>
                                  <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                                  <Badge className={getPriorityColor(service.priority)}>{service.priority}</Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Vehicle:</span>
                                    <span className="ml-2 font-medium">{service.vehicle}</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Service:</span>
                                    <span className="ml-2 font-medium">{service.serviceType}</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Time:</span>
                                    <span className="ml-2 font-medium">
                                      {service.scheduledTime} ({service.estimatedDuration})
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Vendor:</span>
                                    <span className="ml-2 font-medium">{service.vendor}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </Card>
                  ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
