"use client"

import { useState } from "react"
import { DashboardTopNav } from "@/components/subcontractor/dashboard-topnav"
import { SubcontractorJobsHeaderNav } from "@/components/subcontractor/subcontractor-jobs-header-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Search, 
  Download, 
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Eye,
  ClipboardCheck,
  MoreHorizontal,
  ImageIcon,
  X
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import Image from 'next/image'

// Mock pre-start checklist data for subcontractor's drivers only
const mockChecklists = [
  {
    id: "PSC-2024-101",
    jobId: "JOB-2024-003",
    date: "2024-01-15",
    time: "06:30 AM",
    driver: "Michael Brown",
    vehicle: "SUB-003",
    vehiclePlate: "DEF 456",
    client: "XYZ Logistics",
    status: "pass",
    issues: 0,
    compliance: "on-time",
    items: [
      { name: "Lights & Indicators", status: "pass", notes: "" },
      { name: "Tyres & Wheels", status: "pass", notes: "" },
      { name: "Brakes", status: "pass", notes: "" },
      { name: "Mirrors", status: "pass", notes: "" },
      { name: "Fluid Levels", status: "pass", notes: "" },
      { name: "Safety Equipment", status: "pass", notes: "" },
      { name: "Load Security", status: "pass", notes: "" },
      { name: "Documentation", status: "pass", notes: "" },
    ],
    photos: []
  },
  {
    id: "PSC-2024-102",
    jobId: "JOB-2024-004",
    date: "2024-01-15",
    time: "06:45 AM",
    driver: "Sarah Johnson",
    vehicle: "PQR-678",
    vehiclePlate: "GHI 789",
    client: "Infrastructure Co",
    status: "fail",
    issues: 2,
    compliance: "on-time",
    items: [
      { name: "Lights & Indicators", status: "pass", notes: "" },
      { name: "Tyres & Wheels", status: "fail", notes: "Rear left tyre showing wear" },
      { name: "Brakes", status: "pass", notes: "" },
      { name: "Mirrors", status: "pass", notes: "" },
      { name: "Fluid Levels", status: "fail", notes: "Windscreen washer low" },
      { name: "Safety Equipment", status: "pass", notes: "" },
      { name: "Load Security", status: "pass", notes: "" },
      { name: "Documentation", status: "pass", notes: "" },
    ],
    photos: ["/images/tyre-wear.jpg"]
  },
  {
    id: "PSC-2024-103",
    jobId: "JOB-2024-008",
    date: "2024-01-14",
    time: "05:45 AM",
    driver: "Michael Brown",
    vehicle: "SUB-003",
    vehiclePlate: "DEF 456",
    client: "Sydney Metro Construction",
    status: "pass",
    issues: 0,
    compliance: "on-time",
    items: [
      { name: "Lights & Indicators", status: "pass", notes: "" },
      { name: "Tyres & Wheels", status: "pass", notes: "" },
      { name: "Brakes", status: "pass", notes: "" },
      { name: "Mirrors", status: "pass", notes: "" },
      { name: "Fluid Levels", status: "pass", notes: "" },
      { name: "Safety Equipment", status: "pass", notes: "" },
      { name: "Load Security", status: "pass", notes: "" },
      { name: "Documentation", status: "pass", notes: "" },
    ],
    photos: []
  },
  {
    id: "PSC-2024-104",
    jobId: "JOB-2024-009",
    date: "2024-01-14",
    time: "06:00 AM",
    driver: "Sarah Johnson",
    vehicle: "PQR-678",
    vehiclePlate: "GHI 789",
    client: "Westfield Development",
    status: "pass",
    issues: 0,
    compliance: "late",
    items: [
      { name: "Lights & Indicators", status: "pass", notes: "" },
      { name: "Tyres & Wheels", status: "pass", notes: "" },
      { name: "Brakes", status: "pass", notes: "" },
      { name: "Mirrors", status: "pass", notes: "" },
      { name: "Fluid Levels", status: "pass", notes: "" },
      { name: "Safety Equipment", status: "pass", notes: "" },
      { name: "Load Security", status: "pass", notes: "" },
      { name: "Documentation", status: "pass", notes: "" },
    ],
    photos: []
  },
  {
    id: "PSC-2024-105",
    jobId: "JOB-2024-010",
    date: "2024-01-13",
    time: "07:00 AM",
    driver: "Michael Brown",
    vehicle: "SUB-003",
    vehiclePlate: "DEF 456",
    client: "Residential Builders",
    status: "pending",
    issues: 1,
    compliance: "on-time",
    items: [
      { name: "Lights & Indicators", status: "pass", notes: "" },
      { name: "Tyres & Wheels", status: "pass", notes: "" },
      { name: "Brakes", status: "pending", notes: "Minor squeak noticed - monitoring" },
      { name: "Mirrors", status: "pass", notes: "" },
      { name: "Fluid Levels", status: "pass", notes: "" },
      { name: "Safety Equipment", status: "pass", notes: "" },
      { name: "Load Security", status: "pass", notes: "" },
      { name: "Documentation", status: "pass", notes: "" },
    ],
    photos: []
  }
]

export default function SubcontractorPreStartChecklistsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [driverFilter, setDriverFilter] = useState("all")
  const [vehicleFilter, setVehicleFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [viewingChecklist, setViewingChecklist] = useState<typeof mockChecklists[0] | null>(null)

  // Calculate stats
  const totalChecklists = mockChecklists.length
  const passedCount = mockChecklists.filter(c => c.status === "pass").length
  const failedCount = mockChecklists.filter(c => c.status === "fail").length
  const pendingCount = mockChecklists.filter(c => c.status === "pending").length
  const issuesCount = mockChecklists.reduce((acc, c) => acc + c.issues, 0)
  const passRate = Math.round((passedCount / totalChecklists) * 100)

  // Filter checklists
  const filteredChecklists = mockChecklists.filter(checklist => {
    const matchesSearch = 
      checklist.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      checklist.jobId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      checklist.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      checklist.vehicle.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || checklist.status === statusFilter
    const matchesDriver = driverFilter === "all" || checklist.driver === driverFilter
    const matchesVehicle = vehicleFilter === "all" || checklist.vehicle === vehicleFilter

    return matchesSearch && matchesStatus && matchesDriver && matchesVehicle
  })

  const uniqueDrivers = [...new Set(mockChecklists.map(c => c.driver))]
  const uniqueVehicles = [...new Set(mockChecklists.map(c => c.vehicle))]

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredChecklists.map(c => c.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id])
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pass":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200 gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Pass
          </Badge>
        )
      case "fail":
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200 gap-1">
            <XCircle className="h-3 w-3" />
            Fail
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-700 border-amber-200 gap-1">
            <Clock className="h-3 w-3" />
            Pending Review
          </Badge>
        )
      default:
        return null
    }
  }

  const clearFilters = () => {
    setStatusFilter("all")
    setDriverFilter("all")
    setVehicleFilter("all")
    setDateFilter("all")
    setSearchTerm("")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardTopNav />
      <SubcontractorJobsHeaderNav />
      
      <main className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Checklists</p>
                  <p className="text-2xl font-bold">{totalChecklists}</p>
                </div>
                <ClipboardCheck className="h-8 w-8 text-muted-foreground/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pass Rate</p>
                  <p className="text-2xl font-bold text-green-600">{passRate}%</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Passed</p>
                  <p className="text-2xl font-bold text-green-600">{passedCount}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Failed</p>
                  <p className="text-2xl font-bold text-red-600">{failedCount}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
                </div>
                <Clock className="h-8 w-8 text-amber-500/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Issues Reported</p>
                  <p className="text-2xl font-bold text-orange-600">{issuesCount}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by Job ID, Driver, Vehicle..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="gap-2 bg-transparent"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            {/* Expandable Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pass">Pass</SelectItem>
                      <SelectItem value="fail">Fail</SelectItem>
                      <SelectItem value="pending">Pending Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Driver</label>
                  <Select value={driverFilter} onValueChange={setDriverFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Drivers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Drivers</SelectItem>
                      {uniqueDrivers.map(driver => (
                        <SelectItem key={driver} value={driver}>{driver}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Vehicle</label>
                  <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Vehicles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Vehicles</SelectItem>
                      {uniqueVehicles.map(vehicle => (
                        <SelectItem key={vehicle} value={vehicle}>{vehicle}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Date Range</label>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">Last 7 Days</SelectItem>
                      <SelectItem value="month">Last 30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-4 flex justify-end">
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Checklists Table */}
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>Checklists Log</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="p-4 text-left w-10">
                      <Checkbox 
                        checked={selectedItems.length === filteredChecklists.length && filteredChecklists.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Checklist ID</th>
                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Job ID</th>
                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Date / Time</th>
                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Driver</th>
                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Vehicle</th>
                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Client</th>
                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Issues</th>
                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Compliance</th>
                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredChecklists.map((checklist) => (
                    <tr 
                      key={checklist.id} 
                      className={`border-b hover:bg-muted/50 ${checklist.status === "fail" ? "bg-red-50/50" : ""}`}
                    >
                      <td className="p-4">
                        <Checkbox 
                          checked={selectedItems.includes(checklist.id)}
                          onCheckedChange={(checked) => handleSelectItem(checklist.id, checked as boolean)}
                        />
                      </td>
                      <td className="p-4">
                        <span className="font-medium">{checklist.id}</span>
                      </td>
                      <td className="p-4">
                        <Link 
                          href={`/subcontractor-dashboard/jobs/${checklist.jobId}`}
                          className="text-primary hover:underline font-medium"
                        >
                          {checklist.jobId}
                        </Link>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{checklist.date}</p>
                          <p className="text-sm text-muted-foreground">{checklist.time}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span>{checklist.driver}</span>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium font-mono">{checklist.vehicle}</p>
                          <p className="text-sm text-muted-foreground">{checklist.vehiclePlate}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="truncate max-w-[150px] block">{checklist.client}</span>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(checklist.status)}
                      </td>
                      <td className="p-4">
                        {checklist.issues > 0 ? (
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            {checklist.issues}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        <Badge 
                          variant="outline" 
                          className={checklist.compliance === "on-time" 
                            ? "bg-green-50 text-green-700 border-green-200" 
                            : "bg-red-50 text-red-700 border-red-200"
                          }
                        >
                          {checklist.compliance === "on-time" ? "On Time" : "Late"}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setViewingChecklist(checklist)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download PDF
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredChecklists.length === 0 && (
              <div className="p-8 text-center">
                <ClipboardCheck className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No checklists found matching your filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* View Checklist Detail Dialog */}
      <Dialog open={!!viewingChecklist} onOpenChange={() => setViewingChecklist(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Pre-Start Checklist: {viewingChecklist?.id}</span>
              {viewingChecklist && getStatusBadge(viewingChecklist.status)}
            </DialogTitle>
          </DialogHeader>

          {viewingChecklist && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-6 pr-4">
                {/* Header Info */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Job ID</p>
                    <p className="font-medium">{viewingChecklist.jobId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date / Time</p>
                    <p className="font-medium">{viewingChecklist.date} at {viewingChecklist.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Driver</p>
                    <p className="font-medium">{viewingChecklist.driver}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Vehicle</p>
                    <p className="font-medium">{viewingChecklist.vehicle} ({viewingChecklist.vehiclePlate})</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Client</p>
                    <p className="font-medium">{viewingChecklist.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Compliance</p>
                    <Badge 
                      variant="outline" 
                      className={viewingChecklist.compliance === "on-time" 
                        ? "bg-green-50 text-green-700 border-green-200" 
                        : "bg-red-50 text-red-700 border-red-200"
                      }
                    >
                      {viewingChecklist.compliance === "on-time" ? "On Time" : "Late"}
                    </Badge>
                  </div>
                </div>

                {/* Checklist Items */}
                <div>
                  <h4 className="font-semibold mb-3">Checklist Items</h4>
                  <div className="space-y-2">
                    {viewingChecklist.items.map((item, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          item.status === "fail" 
                            ? "bg-red-50 border-red-200" 
                            : item.status === "pending"
                            ? "bg-amber-50 border-amber-200"
                            : "bg-green-50/50 border-green-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {item.status === "pass" && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                          {item.status === "fail" && <XCircle className="h-5 w-5 text-red-600" />}
                          {item.status === "pending" && <Clock className="h-5 w-5 text-amber-600" />}
                          <span className="font-medium">{item.name}</span>
                        </div>
                        {item.notes && (
                          <span className="text-sm text-muted-foreground italic">{item.notes}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Photos */}
                {viewingChecklist.photos.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      Attached Photos ({viewingChecklist.photos.length})
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {viewingChecklist.photos.map((photo, index) => (
                        <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                          <Image src={photo} alt={`Photo ${index}`} width={64} height={64} className="h-8 w-8 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
