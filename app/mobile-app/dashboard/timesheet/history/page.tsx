"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Download, Filter, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TimesheetHistoryPage() {
  const [filterPeriod, setFilterPeriod] = useState("current-month")

  // Mock data for timesheet history
  const timesheetHistory = [
    {
      id: 1,
      date: "2024-01-08",
      dayOfWeek: "Monday",
      clockIn: "07:00 AM",
      clockOut: "03:30 PM",
      totalHours: "8.5h",
      regularHours: "8h",
      overtimeHours: "0.5h",
      breaks: "30m",
      status: "Pending Approval",
      notes: "",
    },
    {
      id: 2,
      date: "2024-01-07",
      dayOfWeek: "Sunday",
      clockIn: "06:45 AM",
      clockOut: "03:15 PM",
      totalHours: "8.5h",
      regularHours: "8h",
      overtimeHours: "0.5h",
      breaks: "30m",
      status: "Approved",
      notes: "",
    },
    {
      id: 3,
      date: "2024-01-06",
      dayOfWeek: "Saturday",
      clockIn: "07:15 AM",
      clockOut: "03:45 PM",
      totalHours: "8.5h",
      regularHours: "8h",
      overtimeHours: "0.5h",
      breaks: "30m",
      status: "Approved",
      notes: "",
    },
    {
      id: 4,
      date: "2024-01-05",
      dayOfWeek: "Friday",
      clockIn: "07:00 AM",
      clockOut: "05:30 PM",
      totalHours: "10.5h",
      regularHours: "8h",
      overtimeHours: "2.5h",
      breaks: "30m",
      status: "Approved",
      notes: "Overtime approved for urgent delivery",
    },
    {
      id: 5,
      date: "2024-01-04",
      dayOfWeek: "Thursday",
      clockIn: "07:00 AM",
      clockOut: "03:30 PM",
      totalHours: "8.5h",
      regularHours: "8h",
      overtimeHours: "0.5h",
      breaks: "30m",
      status: "Approved",
      notes: "",
    },
  ]

  const monthSummary = {
    totalHours: "168.5h",
    regularHours: "160h",
    overtimeHours: "8.5h",
    totalBreaks: "10h",
    daysWorked: 20,
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center gap-4 p-4">
          <Link href="/mobile-app/dashboard/timesheet">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold text-foreground">Timesheet History</h1>
            <p className="text-xs text-muted-foreground">View all shifts</p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </header>

      <main className="p-4 space-y-6 max-w-4xl mx-auto">
        {/* Filter and Summary */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Period Summary</CardTitle>
                <CardDescription>January 2024</CardDescription>
              </div>
              <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-week">This Week</SelectItem>
                  <SelectItem value="last-week">Last Week</SelectItem>
                  <SelectItem value="current-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">{monthSummary.totalHours}</p>
                <p className="text-xs text-muted-foreground">Total Hours</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">{monthSummary.regularHours}</p>
                <p className="text-xs text-muted-foreground">Regular</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">{monthSummary.overtimeHours}</p>
                <p className="text-xs text-muted-foreground">Overtime</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">{monthSummary.totalBreaks}</p>
                <p className="text-xs text-muted-foreground">Break Time</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg col-span-2 sm:col-span-2">
                <p className="text-2xl font-bold text-foreground">{monthSummary.daysWorked}</p>
                <p className="text-xs text-muted-foreground">Days Worked</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timesheet Entries */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Shift Records
            </CardTitle>
            <CardDescription>Detailed timesheet entries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {timesheetHistory.map((entry) => (
              <div key={entry.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-foreground">{entry.dayOfWeek}</p>
                    <p className="text-sm text-muted-foreground">{entry.date}</p>
                  </div>
                  <Badge
                    variant={entry.status === "Approved" ? "default" : "secondary"}
                    className={
                      entry.status === "Approved"
                        ? "bg-green-600 text-white"
                        : "bg-amber-100 text-amber-700 border-amber-300"
                    }
                  >
                    {entry.status === "Approved" ? (
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertCircle className="h-3 w-3 mr-1" />
                    )}
                    {entry.status}
                  </Badge>
                </div>

                {/* Time Details */}
                <div className="grid grid-cols-4 gap-2 text-sm mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Clock In</p>
                    <p className="font-semibold text-foreground">{entry.clockIn}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Clock Out</p>
                    <p className="font-semibold text-foreground">{entry.clockOut}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="font-semibold text-foreground">{entry.totalHours}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Break</p>
                    <p className="font-semibold text-foreground">{entry.breaks}</p>
                  </div>
                </div>

                {/* Hours Breakdown */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Regular:</span>
                    <span className="font-semibold text-foreground">{entry.regularHours}</span>
                  </div>
                  {entry.overtimeHours !== "0h" && entry.overtimeHours !== "0.0h" && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-amber-600" />
                      <span className="text-muted-foreground">Overtime:</span>
                      <span className="font-semibold text-amber-600">{entry.overtimeHours}</span>
                    </div>
                  )}
                </div>

                {/* Notes */}
                {entry.notes && (
                  <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-xs text-blue-700">
                      <strong>Note:</strong> {entry.notes}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Help Text */}
        <Card className="bg-muted/30 border-muted">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center">
              Approved timesheets are processed for payroll. Contact dispatch if you need to make corrections.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
