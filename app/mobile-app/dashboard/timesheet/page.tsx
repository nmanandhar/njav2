"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, Play, Square, Calendar, ChevronRight, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TimesheetPage() {
  const [clockedIn, setClockedIn] = useState(false)
  const [onBreak, setOnBreak] = useState(false)
  const [currentShiftTime, setCurrentShiftTime] = useState("0h 0m")
  const [breakTime, setBreakTime] = useState("0m")

  const recentShifts = [
    {
      id: 1,
      jobId: "JOB-1234",
      jobName: "ABC Construction Site",
      date: "2024-01-08",
      dayOfWeek: "Monday",
      clockIn: "07:00 AM",
      clockOut: "03:30 PM",
      totalHours: "8.5h",
      breaks: "30m",
      status: "Pending Approval",
    },
    {
      id: 2,
      jobId: "JOB-1198",
      jobName: "Downtown Delivery",
      date: "2024-01-07",
      dayOfWeek: "Sunday",
      clockIn: "06:45 AM",
      clockOut: "03:15 PM",
      totalHours: "8.5h",
      breaks: "30m",
      status: "Approved",
    },
    {
      id: 3,
      jobId: "JOB-1156",
      jobName: "Northside Transport",
      date: "2024-01-06",
      dayOfWeek: "Saturday",
      clockIn: "07:15 AM",
      clockOut: "03:45 PM",
      totalHours: "8.5h",
      breaks: "30m",
      status: "Approved",
    },
  ]

  const handleClockIn = () => {
    setClockedIn(true)
    // In real app, this would call API to record clock in time
  }

  const handleClockOut = () => {
    setClockedIn(false)
    setOnBreak(false)
    // In real app, this would call API to record clock out time
  }

  const handleBreak = () => {
    setOnBreak(!onBreak)
    // In real app, this would call API to record break start/end
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center gap-4 p-4">
          <Link href="/mobile-app/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="font-semibold text-foreground">Timesheet</h1>
            <p className="text-xs text-muted-foreground">Track your hours</p>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6 max-w-4xl mx-auto">
        {/* Current Status Card */}
        <Card className={clockedIn ? "border-2 border-green-500" : ""}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Current Status</CardTitle>
              {clockedIn && (
                <Badge className="bg-green-600 text-white">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2" />
                  Clocked In
                </Badge>
              )}
              {!clockedIn && <Badge variant="outline">Not Clocked In</Badge>}
            </div>
            <CardDescription>
              {clockedIn ? "You are currently on the clock" : "Clock in to start tracking your time"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Time Display */}
            {clockedIn && (
              <div className="text-center py-6 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Time Today</p>
                <p className="text-5xl font-bold text-foreground mb-4">{currentShiftTime}</p>
                {onBreak && (
                  <div className="flex items-center justify-center gap-2 text-amber-600">
                    <Coffee className="h-5 w-5" />
                    <span className="font-semibold">On Break - {breakTime}</span>
                  </div>
                )}
                {!onBreak && (
                  <p className="text-sm text-muted-foreground">
                    Break Time: <span className="font-semibold">{breakTime}</span>
                  </p>
                )}
              </div>
            )}

            {/* Clock In/Out Buttons */}
            <div className="space-y-3">
              {!clockedIn && (
                <Button onClick={handleClockIn} size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <Play className="mr-2 h-5 w-5" />
                  Clock In
                </Button>
              )}

              {clockedIn && !onBreak && (
                <>
                  <Button
                    onClick={handleBreak}
                    size="lg"
                    variant="outline"
                    className="w-full border-2 border-amber-500 text-amber-700 hover:bg-amber-50 bg-transparent"
                  >
                    <Coffee className="mr-2 h-5 w-5" />
                    Start Break
                  </Button>
                  <Button
                    onClick={handleClockOut}
                    size="lg"
                    variant="destructive"
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    <Square className="mr-2 h-5 w-5" />
                    Clock Out
                  </Button>
                </>
              )}

              {clockedIn && onBreak && (
                <>
                  <Button onClick={handleBreak} size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <Play className="mr-2 h-5 w-5" />
                    End Break
                  </Button>
                  <Button
                    onClick={handleClockOut}
                    size="lg"
                    variant="outline"
                    className="w-full border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                  >
                    <Square className="mr-2 h-5 w-5" />
                    Clock Out
                  </Button>
                </>
              )}
            </div>

            {/* Today's Summary */}
            {clockedIn && (
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">07:00 AM</p>
                  <p className="text-xs text-muted-foreground">Clock In Time</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">--:--</p>
                  <p className="text-xs text-muted-foreground">Clock Out Time</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Week Summary */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">This Week</CardTitle>
                <CardDescription>Jan 6 - Jan 12, 2024</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">42.5h</p>
                <p className="text-xs text-muted-foreground">Total Hours</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-xl font-bold text-foreground">5</p>
                <p className="text-xs text-muted-foreground">Days Worked</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-xl font-bold text-foreground">2.5h</p>
                <p className="text-xs text-muted-foreground">Break Time</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-xl font-bold text-foreground">40h</p>
                <p className="text-xs text-muted-foreground">Regular</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Jobs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Jobs
                </CardTitle>
                <CardDescription>Your timesheet history</CardDescription>
              </div>
              <Link href="/mobile-app/dashboard/timesheet/history">
                <Button variant="ghost" size="sm">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentShifts.map((shift) => (
              <div key={shift.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-foreground">{shift.dayOfWeek}</p>
                      <Badge variant="outline" className="text-xs font-mono">
                        {shift.jobId}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{shift.jobName}</p>
                    <p className="text-xs text-muted-foreground">{shift.date}</p>
                  </div>
                  <Badge
                    variant={shift.status === "Approved" ? "default" : "secondary"}
                    className={shift.status === "Approved" ? "bg-green-600 text-white" : "bg-amber-100 text-amber-700"}
                  >
                    {shift.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">In</p>
                    <p className="font-semibold text-foreground">{shift.clockIn}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Out</p>
                    <p className="font-semibold text-foreground">{shift.clockOut}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="font-semibold text-foreground">{shift.totalHours}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Break</p>
                    <p className="font-semibold text-foreground">{shift.breaks}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Help Text */}
        <Card className="bg-muted/30 border-muted">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center">
              <Clock className="inline h-4 w-4 mr-1" />
              Remember to clock in at the start of your shift and clock out when you finish. Don't forget to take your
              breaks!
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
