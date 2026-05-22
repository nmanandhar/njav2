"use client"

import { FleetManagementHeader } from "@/components/admin/fleet-management-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { 
  ChevronLeft, 
  ChevronRight, 
  CalendarIcon, 
  User, 
  Clock, 
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plane,
  Heart,
  Baby,
  Briefcase,
  GraduationCap
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

type ViewMode = "monthly" | "weekly" | "daily"
type LeaveStatus = "Approved" | "Pending" | "Rejected"
type LeaveType = "Annual Leave" | "Sick Leave" | "Personal Leave" | "Parental Leave" | "Training" | "Other"

const getMockLeaveRequests = () => {
  const today = new Date()
  const formatDate = (date: Date) => date.toISOString().split("T")[0]

  return [
    // This week
    {
      id: "LR-2025-001",
      driverName: "John Smith",
      driverId: "DRV-001",
      phone: "+61 412 345 678",
      leaveType: "Annual Leave" as LeaveType,
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2)),
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3)),
      totalDays: 6,
      reason: "Family vacation to Queensland",
      status: "Approved" as LeaveStatus,
      submittedDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10)),
      approvedBy: "Sarah Manager",
    },
    {
      id: "LR-2025-002",
      driverName: "Sarah Johnson",
      driverId: "DRV-002",
      phone: "+61 423 456 789",
      leaveType: "Sick Leave" as LeaveType,
      startDate: formatDate(today),
      endDate: formatDate(today),
      totalDays: 1,
      reason: "Medical appointment",
      status: "Approved" as LeaveStatus,
      submittedDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)),
      approvedBy: "Sarah Manager",
    },
    {
      id: "LR-2025-003",
      driverName: "Emma Wilson",
      driverId: "DRV-003",
      phone: "+61 434 567 890",
      leaveType: "Personal Leave" as LeaveType,
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)),
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)),
      totalDays: 1,
      reason: "Personal matters",
      status: "Pending" as LeaveStatus,
      submittedDate: formatDate(today),
      approvedBy: null,
    },
    {
      id: "LR-2025-004",
      driverName: "David Martinez",
      driverId: "DRV-004",
      phone: "+61 445 678 901",
      leaveType: "Training" as LeaveType,
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5)),
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6)),
      totalDays: 2,
      reason: "Heavy Vehicle License upgrade training",
      status: "Approved" as LeaveStatus,
      submittedDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5)),
      approvedBy: "Admin User",
    },
    // Next week
    {
      id: "LR-2025-005",
      driverName: "Mike Chen",
      driverId: "DRV-005",
      phone: "+61 456 789 012",
      leaveType: "Annual Leave" as LeaveType,
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)),
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 11)),
      totalDays: 5,
      reason: "Holiday trip",
      status: "Approved" as LeaveStatus,
      submittedDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14)),
      approvedBy: "Sarah Manager",
    },
    {
      id: "LR-2025-006",
      driverName: "Lisa Anderson",
      driverId: "DRV-006",
      phone: "+61 467 890 123",
      leaveType: "Parental Leave" as LeaveType,
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14)),
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth() + 2, today.getDate())),
      totalDays: 60,
      reason: "Parental leave - new baby",
      status: "Approved" as LeaveStatus,
      submittedDate: formatDate(new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())),
      approvedBy: "HR Department",
    },
    {
      id: "LR-2025-007",
      driverName: "Tom Roberts",
      driverId: "DRV-007",
      phone: "+61 478 901 234",
      leaveType: "Sick Leave" as LeaveType,
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3)),
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4)),
      totalDays: 2,
      reason: "Recovery from minor surgery",
      status: "Pending" as LeaveStatus,
      submittedDate: formatDate(today),
      approvedBy: null,
    },
    {
      id: "LR-2025-008",
      driverName: "Rachel Green",
      driverId: "DRV-008",
      phone: "+61 489 012 345",
      leaveType: "Annual Leave" as LeaveType,
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 20)),
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 27)),
      totalDays: 8,
      reason: "Overseas trip",
      status: "Approved" as LeaveStatus,
      submittedDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30)),
      approvedBy: "Sarah Manager",
    },
    {
      id: "LR-2025-009",
      driverName: "James Wilson",
      driverId: "DRV-009",
      phone: "+61 490 123 456",
      leaveType: "Personal Leave" as LeaveType,
      startDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5)),
      endDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5)),
      totalDays: 1,
      reason: "Family emergency",
      status: "Approved" as LeaveStatus,
      submittedDate: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6)),
      approvedBy: "Admin User",
    },
  ]
}

type LeaveRequest = ReturnType<typeof getMockLeaveRequests>[0]

const getLeaveTypeIcon = (type: LeaveType) => {
  switch (type) {
    case "Annual Leave": return <Plane className="h-4 w-4" />
    case "Sick Leave": return <Heart className="h-4 w-4" />
    case "Personal Leave": return <User className="h-4 w-4" />
    case "Parental Leave": return <Baby className="h-4 w-4" />
    case "Training": return <GraduationCap className="h-4 w-4" />
    default: return <Briefcase className="h-4 w-4" />
  }
}

const getLeaveTypeColor = (type: LeaveType) => {
  switch (type) {
    case "Annual Leave": return "bg-blue-100 text-blue-700 border-blue-200"
    case "Sick Leave": return "bg-red-100 text-red-700 border-red-200"
    case "Personal Leave": return "bg-purple-100 text-purple-700 border-purple-200"
    case "Parental Leave": return "bg-pink-100 text-pink-700 border-pink-200"
    case "Training": return "bg-amber-100 text-amber-700 border-amber-200"
    default: return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

const getStatusColor = (status: LeaveStatus) => {
  switch (status) {
    case "Approved": return "bg-green-100 text-green-700"
    case "Pending": return "bg-amber-100 text-amber-700"
    case "Rejected": return "bg-red-100 text-red-700"
  }
}

const getStatusIcon = (status: LeaveStatus) => {
  switch (status) {
    case "Approved": return <CheckCircle className="h-3 w-3" />
    case "Pending": return <AlertCircle className="h-3 w-3" />
    case "Rejected": return <XCircle className="h-3 w-3" />
  }
}

export default function LeaveCalendarPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("weekly")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null)
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false)

  const mockLeaveRequests = getMockLeaveRequests()

  const handleLeaveClick = (leave: LeaveRequest) => {
    setSelectedLeave(leave)
    setIsLeaveModalOpen(true)
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

  const isDateInRange = (date: Date, startDate: string, endDate: string) => {
    const d = new Date(date.toDateString())
    const start = new Date(startDate)
    const end = new Date(endDate)
    return d >= start && d <= end
  }

  const getFilteredLeaves = () => {
    return mockLeaveRequests.filter((leave) => {
      const leaveStart = new Date(leave.startDate)
      const leaveEnd = new Date(leave.endDate)

      if (viewMode === "daily") {
        return isDateInRange(currentDate, leave.startDate, leave.endDate)
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

        return (leaveStart <= weekEnd && leaveEnd >= weekStart)
      }

      if (viewMode === "monthly") {
        const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
        const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
        return (leaveStart <= monthEnd && leaveEnd >= monthStart)
      }

      return true
    })
  }

  const filteredLeaves = getFilteredLeaves()

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

  const getLeavesForDate = (date: Date) => {
    return mockLeaveRequests.filter((leave) => isDateInRange(date, leave.startDate, leave.endDate))
  }

  const pendingCount = mockLeaveRequests.filter(l => l.status === "Pending").length
  const approvedCount = mockLeaveRequests.filter(l => l.status === "Approved").length
  const driversOnLeave = new Set(filteredLeaves.filter(l => l.status === "Approved").map(l => l.driverId)).size

  const handleApprove = (leaveId: string) => {
    alert(`Leave request ${leaveId} approved`)
    setIsLeaveModalOpen(false)
  }

  const handleReject = (leaveId: string) => {
    alert(`Leave request ${leaveId} rejected`)
    setIsLeaveModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-background border-b border-border px-6 py-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-orange-500 font-medium">Fleet Management</span>
          <span className="text-muted-foreground">›</span>
          <span className="text-muted-foreground">Drivers</span>
          <span className="text-muted-foreground">›</span>
          <span className="text-foreground">Holiday/Leave Calendar</span>
        </div>
      </div>

      {/* Header */}
      <FleetManagementHeader />

      <div className="p-6 space-y-6">
        {/* Back link and title */}
        <div className="flex items-center gap-4">
          <Link href="/admin-portal/fleet/drivers">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Drivers
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Holiday/Leave Calendar</h1>
        </div>

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
        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Pending Requests</div>
            <div className="text-3xl font-bold text-amber-600">{pendingCount}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Approved This Period</div>
            <div className="text-3xl font-bold text-green-600">{filteredLeaves.filter(l => l.status === "Approved").length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Drivers on Leave</div>
            <div className="text-3xl font-bold text-blue-600">{driversOnLeave}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground mb-1">Total Approved</div>
            <div className="text-3xl font-bold text-teal-600">{approvedCount}</div>
          </Card>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-sm text-muted-foreground">Leave Types:</span>
          {(["Annual Leave", "Sick Leave", "Personal Leave", "Parental Leave", "Training"] as LeaveType[]).map((type) => (
            <div key={type} className={cn("flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border", getLeaveTypeColor(type))}>
              {getLeaveTypeIcon(type)}
              {type}
            </div>
          ))}
        </div>

        {/* Calendar View */}
        {viewMode === "monthly" && (
          <Card className="p-4">
            <div className="grid grid-cols-7 gap-1">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
              {getMonthCalendarDays().map((date, index) => {
                const dayLeaves = getLeavesForDate(date)
                const isCurrentMonth = date.getMonth() === currentDate.getMonth()
                const isToday = date.toDateString() === new Date().toDateString()

                return (
                  <div
                    key={index}
                    className={cn(
                      "min-h-[100px] p-1 border rounded-lg",
                      !isCurrentMonth && "bg-muted/30 text-muted-foreground",
                      isToday && "border-primary border-2"
                    )}
                  >
                    <div className={cn(
                      "text-sm font-medium mb-1 text-right pr-1",
                      isToday && "text-primary"
                    )}>
                      {date.getDate()}
                    </div>
                    <div className="space-y-0.5">
                      {dayLeaves.slice(0, 3).map((leave) => (
                        <button
                          key={leave.id}
                          onClick={() => handleLeaveClick(leave)}
                          className={cn(
                            "w-full text-left px-1.5 py-0.5 rounded text-xs truncate border",
                            getLeaveTypeColor(leave.leaveType),
                            "hover:opacity-80 transition-opacity"
                          )}
                        >
                          {leave.driverName}
                        </button>
                      ))}
                      {dayLeaves.length > 3 && (
                        <div className="text-xs text-muted-foreground text-center">
                          +{dayLeaves.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        )}

        {viewMode === "weekly" && (
          <Card className="p-4">
            <div className="space-y-2">
              {(() => {
                const weekStart = new Date(currentDate)
                const day = weekStart.getDay()
                const diff = weekStart.getDate() - day
                weekStart.setDate(diff)

                const weekDays = []
                for (let i = 0; i < 7; i++) {
                  const d = new Date(weekStart)
                  d.setDate(weekStart.getDate() + i)
                  weekDays.push(d)
                }

                return weekDays.map((date) => {
                  const dayLeaves = getLeavesForDate(date)
                  const isToday = date.toDateString() === new Date().toDateString()

                  return (
                    <div
                      key={date.toISOString()}
                      className={cn(
                        "flex border rounded-lg overflow-hidden",
                        isToday && "border-primary border-2"
                      )}
                    >
                      <div className={cn(
                        "w-32 p-3 bg-muted/50 flex flex-col justify-center",
                        isToday && "bg-primary/10"
                      )}>
                        <div className="text-sm font-medium">
                          {date.toLocaleDateString("en-AU", { weekday: "short" })}
                        </div>
                        <div className={cn("text-2xl font-bold", isToday && "text-primary")}>
                          {date.getDate()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {date.toLocaleDateString("en-AU", { month: "short" })}
                        </div>
                      </div>
                      <div className="flex-1 p-3">
                        {dayLeaves.length === 0 ? (
                          <div className="text-sm text-muted-foreground">No leave scheduled</div>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {dayLeaves.map((leave) => (
                              <button
                                key={leave.id}
                                onClick={() => handleLeaveClick(leave)}
                                className={cn(
                                  "flex items-center gap-2 px-3 py-2 rounded-lg border text-sm",
                                  getLeaveTypeColor(leave.leaveType),
                                  "hover:opacity-80 transition-opacity"
                                )}
                              >
                                {getLeaveTypeIcon(leave.leaveType)}
                                <span className="font-medium">{leave.driverName}</span>
                                <Badge className={cn("text-xs", getStatusColor(leave.status))}>
                                  {leave.status}
                                </Badge>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })
              })()}
            </div>
          </Card>
        )}

        {viewMode === "daily" && (
          <Card className="p-6">
            <div className="space-y-4">
              {filteredLeaves.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No leave scheduled for this day</p>
                </div>
              ) : (
                filteredLeaves.map((leave) => (
                  <button
                    key={leave.id}
                    onClick={() => handleLeaveClick(leave)}
                    className="w-full text-left"
                  >
                    <Card className={cn(
                      "p-4 border-l-4 hover:shadow-md transition-shadow",
                      leave.leaveType === "Annual Leave" && "border-l-blue-500",
                      leave.leaveType === "Sick Leave" && "border-l-red-500",
                      leave.leaveType === "Personal Leave" && "border-l-purple-500",
                      leave.leaveType === "Parental Leave" && "border-l-pink-500",
                      leave.leaveType === "Training" && "border-l-amber-500"
                    )}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "p-2 rounded-full",
                            getLeaveTypeColor(leave.leaveType)
                          )}>
                            {getLeaveTypeIcon(leave.leaveType)}
                          </div>
                          <div>
                            <div className="font-semibold">{leave.driverName}</div>
                            <div className="text-sm text-muted-foreground">{leave.leaveType}</div>
                          </div>
                        </div>
                        <Badge className={cn(getStatusColor(leave.status), "gap-1")}>
                          {getStatusIcon(leave.status)}
                          {leave.status}
                        </Badge>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Period:</span>
                          <div className="font-medium">
                            {new Date(leave.startDate).toLocaleDateString("en-AU", { day: "numeric", month: "short" })}
                            {leave.startDate !== leave.endDate && ` - ${new Date(leave.endDate).toLocaleDateString("en-AU", { day: "numeric", month: "short" })}`}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Duration:</span>
                          <div className="font-medium">{leave.totalDays} day{leave.totalDays > 1 ? "s" : ""}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Reason:</span>
                          <div className="font-medium truncate">{leave.reason}</div>
                        </div>
                      </div>
                    </Card>
                  </button>
                ))
              )}
            </div>
          </Card>
        )}
      </div>

      {/* Leave Details Modal */}
      <Dialog open={isLeaveModalOpen} onOpenChange={setIsLeaveModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedLeave && getLeaveTypeIcon(selectedLeave.leaveType)}
              Leave Request Details
            </DialogTitle>
            <DialogDescription>
              Review and manage this leave request
            </DialogDescription>
          </DialogHeader>

          {selectedLeave && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{selectedLeave.driverName}</div>
                    <div className="text-sm text-muted-foreground">{selectedLeave.driverId}</div>
                  </div>
                </div>
                <Badge className={cn(getStatusColor(selectedLeave.status), "gap-1")}>
                  {getStatusIcon(selectedLeave.status)}
                  {selectedLeave.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <div className="text-sm text-muted-foreground">Leave Type</div>
                  <div className={cn(
                    "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-sm mt-1 border",
                    getLeaveTypeColor(selectedLeave.leaveType)
                  )}>
                    {getLeaveTypeIcon(selectedLeave.leaveType)}
                    {selectedLeave.leaveType}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                  <div className="font-medium mt-1">{selectedLeave.totalDays} day{selectedLeave.totalDays > 1 ? "s" : ""}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Start Date</div>
                  <div className="font-medium mt-1">
                    {new Date(selectedLeave.startDate).toLocaleDateString("en-AU", { 
                      weekday: "short", 
                      day: "numeric", 
                      month: "short", 
                      year: "numeric" 
                    })}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">End Date</div>
                  <div className="font-medium mt-1">
                    {new Date(selectedLeave.endDate).toLocaleDateString("en-AU", { 
                      weekday: "short", 
                      day: "numeric", 
                      month: "short", 
                      year: "numeric" 
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="text-sm text-muted-foreground mb-1">Reason</div>
                <div className="p-3 bg-muted/50 rounded-lg text-sm">{selectedLeave.reason}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <div className="text-sm text-muted-foreground">Submitted</div>
                  <div className="text-sm font-medium mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(selectedLeave.submittedDate).toLocaleDateString("en-AU")}
                  </div>
                </div>
                {selectedLeave.approvedBy && (
                  <div>
                    <div className="text-sm text-muted-foreground">Approved By</div>
                    <div className="text-sm font-medium mt-1">{selectedLeave.approvedBy}</div>
                  </div>
                )}
              </div>

              {selectedLeave.status === "Pending" && (
                <div className="flex gap-2 pt-4 border-t">
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => handleApprove(selectedLeave.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="flex-1"
                    onClick={() => handleReject(selectedLeave.id)}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
