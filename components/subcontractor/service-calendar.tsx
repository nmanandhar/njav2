"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Search, CalendarIcon } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ServiceEvent {
  id: string
  workOrderId: string
  vehicleDetails: string
  assignedDriver: string
  scheduledDate: string
  serviceCategory: string
  status: "Scheduled" | "Overdue" | "In Progress" | "Completed" | "Cancelled"
  priority: "Critical" | "Standard" | "Advisory"
  assignedVendor: string
  vendorServiceId: string
}

const mockEvents: ServiceEvent[] = [
  {
    id: "1",
    workOrderId: "WO-2024-001",
    vehicleDetails: "Toyota Hiace (Rego: ABC123)",
    assignedDriver: "John Smith",
    scheduledDate: "2024-01-15",
    serviceCategory: "Major Service (B)",
    status: "Scheduled",
    priority: "Standard",
    assignedVendor: "Quick Fix Auto Service",
    vendorServiceId: "SV-001",
  },
  {
    id: "2",
    workOrderId: "WO-2024-002",
    vehicleDetails: "Ford Transit (Rego: XYZ789)",
    assignedDriver: "Sarah Williams",
    scheduledDate: "2024-01-12",
    serviceCategory: "Compliance Roadworthy",
    status: "Overdue",
    priority: "Critical",
    assignedVendor: "Premium Fleet Services",
    vendorServiceId: "SV-002",
  },
  {
    id: "3",
    workOrderId: "WO-2024-003",
    vehicleDetails: "Mercedes Sprinter (Rego: LMN456)",
    assignedDriver: "Michael Chen",
    scheduledDate: "2024-01-18",
    serviceCategory: "Engine Oil & Filters",
    status: "In Progress",
    priority: "Standard",
    assignedVendor: "Express Maintenance Co",
    vendorServiceId: "SV-003",
  },
  {
    id: "4",
    workOrderId: "WO-2024-004",
    vehicleDetails: "Isuzu NPR (Rego: DEF321)",
    assignedDriver: "Emma Johnson",
    scheduledDate: "2024-01-22",
    serviceCategory: "Brake Inspection",
    status: "Scheduled",
    priority: "Advisory",
    assignedVendor: "Quick Fix Auto Service",
    vendorServiceId: "SV-001",
  },
  {
    id: "5",
    workOrderId: "WO-2024-005",
    vehicleDetails: "Volkswagen Crafter (Rego: GHI654)",
    assignedDriver: "David Lee",
    scheduledDate: "2024-01-08",
    serviceCategory: "Minor Service (A)",
    status: "Completed",
    priority: "Standard",
    assignedVendor: "Premium Fleet Services",
    vendorServiceId: "SV-002",
  },
]

function getStatusColor(status: ServiceEvent["status"]) {
  switch (status) {
    case "Scheduled":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
    case "Overdue":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
    case "In Progress":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
    case "Completed":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
    case "Cancelled":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }
}

function getPriorityColor(priority: ServiceEvent["priority"]) {
  switch (priority) {
    case "Critical":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
    case "Standard":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
    case "Advisory":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
  }
}

export function ServiceCalendar() {
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("month")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek, year, month }
  }

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate)

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return mockEvents.filter((event) => event.scheduledDate === dateStr)
  }

  const filteredEvents = mockEvents.filter((event) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      event.workOrderId.toLowerCase().includes(query) ||
      event.vehicleDetails.toLowerCase().includes(query) ||
      event.assignedDriver.toLowerCase().includes(query) ||
      event.assignedVendor.toLowerCase().includes(query)
    )
  })

  return (
    <div className="p-6 space-y-6">
      {/* Search and Filter Section */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by work order, vehicle, driver, or vendor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Day View</SelectItem>
            <SelectItem value="week">Week View</SelectItem>
            <SelectItem value="month">Month View</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
            <span className="text-lg font-semibold">
              {currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" onClick={goToToday}>
          Today
        </Button>
      </div>

      {viewMode === "month" && (
        <div className="border border-border rounded-lg overflow-hidden bg-card">
          {/* Calendar Header - Days of Week */}
          <div className="grid grid-cols-7 border-b border-border bg-muted/50">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="p-3 text-center text-sm font-semibold text-muted-foreground border-r border-border last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Body - Days */}
          <div className="grid grid-cols-7">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: startingDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} className="min-h-[120px] p-2 border-r border-b border-border bg-muted/20" />
            ))}

            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1
              const eventsForDay = getEventsForDate(day)
              const isToday =
                day === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear()

              return (
                <div
                  key={day}
                  className={cn(
                    "min-h-[120px] p-2 border-r border-b border-border bg-card hover:bg-muted/50 transition-colors",
                    isToday && "bg-primary/5",
                  )}
                >
                  <div
                    className={cn(
                      "text-sm font-semibold mb-1 w-7 h-7 flex items-center justify-center rounded-full",
                      isToday && "bg-primary text-primary-foreground",
                    )}
                  >
                    {day}
                  </div>
                  <div className="space-y-1">
                    {eventsForDay.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className={cn(
                          "text-xs p-1 rounded truncate cursor-pointer",
                          event.status === "Overdue" && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
                          event.status === "Scheduled" &&
                            "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
                          event.status === "In Progress" &&
                            "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
                          event.status === "Completed" &&
                            "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
                        )}
                        title={`${event.workOrderId} - ${event.vehicleDetails}`}
                      >
                        {event.workOrderId}
                      </div>
                    ))}
                    {eventsForDay.length > 3 && (
                      <div className="text-xs text-muted-foreground px-1">+{eventsForDay.length - 3} more</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Service Events Table */}
      {viewMode !== "month" && (
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Work Order ID</TableHead>
                <TableHead>Vehicle Details</TableHead>
                <TableHead>Assigned Driver</TableHead>
                <TableHead>Scheduled Date</TableHead>
                <TableHead>Service Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assigned Vendor</TableHead>
                <TableHead>Vendor Service ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.workOrderId}</TableCell>
                  <TableCell>{event.vehicleDetails}</TableCell>
                  <TableCell>{event.assignedDriver}</TableCell>
                  <TableCell>
                    {new Date(event.scheduledDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{event.serviceCategory}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getPriorityColor(event.priority)}>
                      {event.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{event.assignedVendor}</TableCell>
                  <TableCell className="text-muted-foreground">{event.vendorServiceId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Summary */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredEvents.length} service event{filteredEvents.length !== 1 ? "s" : ""}
      </div>
    </div>
  )
}
