"use client"

import { useState } from "react"
import { AdminJobsHeaderNav } from "@/components/admin/admin-jobs-header-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Download,
  Filter,
  MoreHorizontal,
  Eye,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Truck,
  User,
  Calendar,
  Camera,
  FileText,
  ChevronDown,
  ChevronUp,
  Building2,
  Users,
  ClipboardCheck,
  AlertCircle,
  X,
} from "lucide-react"

// Mock data for pre-start checklists
const mockChecklists = [
  {
    id: "PSC-2024-001",
    jobId: "JOB-2024-0156",
    date: "2024-01-15",
    time: "06:30 AM",
    driver: "Mike Johnson",
    driverType: "internal",
    vehicle: "TRK-001",
    vehicleRego: "ABC 123",
    client: "Sydney Metro Construction",
    subcontractor: null,
    status: "pass",
    completedOnTime: true,
    itemsChecked: 15,
    itemsFailed: 0,
    issuesReported: 0,
    photos: 2,
    notes: "",
    checklist: [
      { item: "Engine oil level", status: "pass", notes: "" },
      { item: "Coolant level", status: "pass", notes: "" },
      { item: "Brake fluid level", status: "pass", notes: "" },
      { item: "Tyre condition - Front Left", status: "pass", notes: "" },
      { item: "Tyre condition - Front Right", status: "pass", notes: "" },
      { item: "Tyre condition - Rear Left", status: "pass", notes: "" },
      { item: "Tyre condition - Rear Right", status: "pass", notes: "" },
      { item: "Lights - Headlights", status: "pass", notes: "" },
      { item: "Lights - Tail lights", status: "pass", notes: "" },
      { item: "Lights - Indicators", status: "pass", notes: "" },
      { item: "Windscreen condition", status: "pass", notes: "" },
      { item: "Wipers working", status: "pass", notes: "" },
      { item: "Horn working", status: "pass", notes: "" },
      { item: "Fire extinguisher present", status: "pass", notes: "" },
      { item: "First aid kit present", status: "pass", notes: "" },
    ],
  },
  {
    id: "PSC-2024-002",
    jobId: "JOB-2024-0157",
    date: "2024-01-15",
    time: "06:45 AM",
    driver: "Sarah Wilson",
    driverType: "internal",
    vehicle: "TRK-003",
    vehicleRego: "DEF 456",
    client: "Westfield Development",
    subcontractor: null,
    status: "fail",
    completedOnTime: true,
    itemsChecked: 15,
    itemsFailed: 2,
    issuesReported: 2,
    photos: 4,
    notes: "Brake light not working, reported to maintenance",
    checklist: [
      { item: "Engine oil level", status: "pass", notes: "" },
      { item: "Coolant level", status: "pass", notes: "" },
      { item: "Brake fluid level", status: "pass", notes: "" },
      { item: "Tyre condition - Front Left", status: "pass", notes: "" },
      { item: "Tyre condition - Front Right", status: "pass", notes: "" },
      { item: "Tyre condition - Rear Left", status: "fail", notes: "Low tread depth - needs replacement soon" },
      { item: "Tyre condition - Rear Right", status: "pass", notes: "" },
      { item: "Lights - Headlights", status: "pass", notes: "" },
      { item: "Lights - Tail lights", status: "fail", notes: "Left brake light not working" },
      { item: "Lights - Indicators", status: "pass", notes: "" },
      { item: "Windscreen condition", status: "pass", notes: "" },
      { item: "Wipers working", status: "pass", notes: "" },
      { item: "Horn working", status: "pass", notes: "" },
      { item: "Fire extinguisher present", status: "pass", notes: "" },
      { item: "First aid kit present", status: "pass", notes: "" },
    ],
  },
  {
    id: "PSC-2024-003",
    jobId: "JOB-2024-0158",
    date: "2024-01-15",
    time: "07:00 AM",
    driver: "Tom Anderson",
    driverType: "subcontractor",
    vehicle: "SUB-TRK-01",
    vehicleRego: "GHI 789",
    client: "Lendlease Projects",
    subcontractor: "Regional Transport Services",
    status: "pass",
    completedOnTime: false,
    itemsChecked: 15,
    itemsFailed: 0,
    issuesReported: 0,
    photos: 0,
    notes: "",
    checklist: [
      { item: "Engine oil level", status: "pass", notes: "" },
      { item: "Coolant level", status: "pass", notes: "" },
      { item: "Brake fluid level", status: "pass", notes: "" },
      { item: "Tyre condition - Front Left", status: "pass", notes: "" },
      { item: "Tyre condition - Front Right", status: "pass", notes: "" },
      { item: "Tyre condition - Rear Left", status: "pass", notes: "" },
      { item: "Tyre condition - Rear Right", status: "pass", notes: "" },
      { item: "Lights - Headlights", status: "pass", notes: "" },
      { item: "Lights - Tail lights", status: "pass", notes: "" },
      { item: "Lights - Indicators", status: "pass", notes: "" },
      { item: "Windscreen condition", status: "pass", notes: "" },
      { item: "Wipers working", status: "pass", notes: "" },
      { item: "Horn working", status: "pass", notes: "" },
      { item: "Fire extinguisher present", status: "pass", notes: "" },
      { item: "First aid kit present", status: "pass", notes: "" },
    ],
  },
  {
    id: "PSC-2024-004",
    jobId: "JOB-2024-0159",
    date: "2024-01-14",
    time: "06:15 AM",
    driver: "David Chen",
    driverType: "internal",
    vehicle: "TRK-002",
    vehicleRego: "JKL 012",
    client: "CPB Contractors",
    subcontractor: null,
    status: "pending",
    completedOnTime: true,
    itemsChecked: 15,
    itemsFailed: 1,
    issuesReported: 1,
    photos: 3,
    notes: "Minor windscreen chip noted, pending review",
    checklist: [
      { item: "Engine oil level", status: "pass", notes: "" },
      { item: "Coolant level", status: "pass", notes: "" },
      { item: "Brake fluid level", status: "pass", notes: "" },
      { item: "Tyre condition - Front Left", status: "pass", notes: "" },
      { item: "Tyre condition - Front Right", status: "pass", notes: "" },
      { item: "Tyre condition - Rear Left", status: "pass", notes: "" },
      { item: "Tyre condition - Rear Right", status: "pass", notes: "" },
      { item: "Lights - Headlights", status: "pass", notes: "" },
      { item: "Lights - Tail lights", status: "pass", notes: "" },
      { item: "Lights - Indicators", status: "pass", notes: "" },
      { item: "Windscreen condition", status: "warning", notes: "Small chip on passenger side - monitoring" },
      { item: "Wipers working", status: "pass", notes: "" },
      { item: "Horn working", status: "pass", notes: "" },
      { item: "Fire extinguisher present", status: "pass", notes: "" },
      { item: "First aid kit present", status: "pass", notes: "" },
    ],
  },
  {
    id: "PSC-2024-005",
    jobId: "JOB-2024-0160",
    date: "2024-01-14",
    time: "05:45 AM",
    driver: "James Miller",
    driverType: "subcontractor",
    vehicle: "SUB-TRK-02",
    vehicleRego: "MNO 345",
    client: "Sydney Metro Construction",
    subcontractor: "Express Haulage Co",
    status: "pass",
    completedOnTime: true,
    itemsChecked: 15,
    itemsFailed: 0,
    issuesReported: 0,
    photos: 1,
    notes: "",
    checklist: [
      { item: "Engine oil level", status: "pass", notes: "" },
      { item: "Coolant level", status: "pass", notes: "" },
      { item: "Brake fluid level", status: "pass", notes: "" },
      { item: "Tyre condition - Front Left", status: "pass", notes: "" },
      { item: "Tyre condition - Front Right", status: "pass", notes: "" },
      { item: "Tyre condition - Rear Left", status: "pass", notes: "" },
      { item: "Tyre condition - Rear Right", status: "pass", notes: "" },
      { item: "Lights - Headlights", status: "pass", notes: "" },
      { item: "Lights - Tail lights", status: "pass", notes: "" },
      { item: "Lights - Indicators", status: "pass", notes: "" },
      { item: "Windscreen condition", status: "pass", notes: "" },
      { item: "Wipers working", status: "pass", notes: "" },
      { item: "Horn working", status: "pass", notes: "" },
      { item: "Fire extinguisher present", status: "pass", notes: "" },
      { item: "First aid kit present", status: "pass", notes: "" },
    ],
  },
  {
    id: "PSC-2024-006",
    jobId: "JOB-2024-0161",
    date: "2024-01-13",
    time: "06:00 AM",
    driver: "Mike Johnson",
    driverType: "internal",
    vehicle: "TRK-001",
    vehicleRego: "ABC 123",
    client: "Multiplex Construction",
    subcontractor: null,
    status: "pass",
    completedOnTime: true,
    itemsChecked: 15,
    itemsFailed: 0,
    issuesReported: 0,
    photos: 0,
    notes: "",
    checklist: [
      { item: "Engine oil level", status: "pass", notes: "" },
      { item: "Coolant level", status: "pass", notes: "" },
      { item: "Brake fluid level", status: "pass", notes: "" },
      { item: "Tyre condition - Front Left", status: "pass", notes: "" },
      { item: "Tyre condition - Front Right", status: "pass", notes: "" },
      { item: "Tyre condition - Rear Left", status: "pass", notes: "" },
      { item: "Tyre condition - Rear Right", status: "pass", notes: "" },
      { item: "Lights - Headlights", status: "pass", notes: "" },
      { item: "Lights - Tail lights", status: "pass", notes: "" },
      { item: "Lights - Indicators", status: "pass", notes: "" },
      { item: "Windscreen condition", status: "pass", notes: "" },
      { item: "Wipers working", status: "pass", notes: "" },
      { item: "Horn working", status: "pass", notes: "" },
      { item: "Fire extinguisher present", status: "pass", notes: "" },
      { item: "First aid kit present", status: "pass", notes: "" },
    ],
  },
]

// Mock filter options
const clients = [
  "Sydney Metro Construction",
  "Westfield Development",
  "Lendlease Projects",
  "CPB Contractors",
  "Multiplex Construction",
]

const subcontractors = [
  "Regional Transport Services",
  "Express Haulage Co",
  "Metro Logistics",
]

const drivers = [
  { name: "Mike Johnson", type: "internal" },
  { name: "Sarah Wilson", type: "internal" },
  { name: "David Chen", type: "internal" },
  { name: "Tom Anderson", type: "subcontractor" },
  { name: "James Miller", type: "subcontractor" },
]

const vehicles = [
  { id: "TRK-001", rego: "ABC 123" },
  { id: "TRK-002", rego: "JKL 012" },
  { id: "TRK-003", rego: "DEF 456" },
  { id: "SUB-TRK-01", rego: "GHI 789" },
  { id: "SUB-TRK-02", rego: "MNO 345" },
]

export default function PreStartChecklistsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [clientFilter, setClientFilter] = useState<string>("all")
  const [subcontractorFilter, setSubcontractorFilter] = useState<string>("all")
  const [driverTypeFilter, setDriverTypeFilter] = useState<string>("all")
  const [driverFilter, setDriverFilter] = useState<string>("all")
  const [vehicleFilter, setVehicleFilter] = useState<string>("all")
  const [dateRangeFilter, setDateRangeFilter] = useState<string>("7days")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedChecklists, setSelectedChecklists] = useState<string[]>([])
  const [viewingChecklist, setViewingChecklist] = useState<typeof mockChecklists[0] | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  // Filter checklists
  const filteredChecklists = mockChecklists.filter((checklist) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        checklist.id.toLowerCase().includes(query) ||
        checklist.jobId.toLowerCase().includes(query) ||
        checklist.driver.toLowerCase().includes(query) ||
        checklist.vehicle.toLowerCase().includes(query) ||
        checklist.vehicleRego.toLowerCase().includes(query)
      if (!matchesSearch) return false
    }

    // Status filter
    if (statusFilter !== "all" && checklist.status !== statusFilter) return false

    // Client filter
    if (clientFilter !== "all" && checklist.client !== clientFilter) return false

    // Subcontractor filter
    if (subcontractorFilter !== "all") {
      if (subcontractorFilter === "none" && checklist.subcontractor !== null) return false
      if (subcontractorFilter !== "none" && checklist.subcontractor !== subcontractorFilter) return false
    }

    // Driver type filter
    if (driverTypeFilter !== "all" && checklist.driverType !== driverTypeFilter) return false

    // Driver filter
    if (driverFilter !== "all" && checklist.driver !== driverFilter) return false

    // Vehicle filter
    if (vehicleFilter !== "all" && checklist.vehicle !== vehicleFilter) return false

    return true
  })

  // Calculate stats
  const stats = {
    total: filteredChecklists.length,
    passed: filteredChecklists.filter((c) => c.status === "pass").length,
    failed: filteredChecklists.filter((c) => c.status === "fail").length,
    pending: filteredChecklists.filter((c) => c.status === "pending").length,
    issuesReported: filteredChecklists.reduce((acc, c) => acc + c.issuesReported, 0),
    lateSubmissions: filteredChecklists.filter((c) => !c.completedOnTime).length,
  }

  const passRate = stats.total > 0 ? Math.round((stats.passed / stats.total) * 100) : 0

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedChecklists(filteredChecklists.map((c) => c.id))
    } else {
      setSelectedChecklists([])
    }
  }

  const handleSelectChecklist = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedChecklists([...selectedChecklists, id])
    } else {
      setSelectedChecklists(selectedChecklists.filter((cId) => cId !== id))
    }
  }

  const handleViewChecklist = (checklist: typeof mockChecklists[0]) => {
    setViewingChecklist(checklist)
    setIsDetailModalOpen(true)
  }

  const handleMarkAsReviewed = (ids: string[]) => {
    // In a real app, this would update the backend
    console.log("Marking as reviewed:", ids)
  }

  const handleExport = (format: "csv" | "pdf") => {
    // In a real app, this would trigger a download
    console.log(`Exporting ${selectedChecklists.length > 0 ? selectedChecklists.length : "all"} checklists as ${format}`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pass":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Pass
          </Badge>
        )
      case "fail":
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-100">
            <XCircle className="h-3 w-3 mr-1" />
            Fail
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
            <Clock className="h-3 w-3 mr-1" />
            Pending Review
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getItemStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "fail":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const clearFilters = () => {
    setStatusFilter("all")
    setClientFilter("all")
    setSubcontractorFilter("all")
    setDriverTypeFilter("all")
    setDriverFilter("all")
    setVehicleFilter("all")
    setDateRangeFilter("7days")
    setSearchQuery("")
  }

  const activeFilterCount = [
    statusFilter !== "all",
    clientFilter !== "all",
    subcontractorFilter !== "all",
    driverTypeFilter !== "all",
    driverFilter !== "all",
    vehicleFilter !== "all",
    dateRangeFilter !== "7days",
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-background">
      <AdminJobsHeaderNav />

      <div className="p-6 space-y-6">
        {/* Summary Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Checklists</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <ClipboardCheck className="h-8 w-8 text-muted-foreground/30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pass Rate</p>
                  <p className="text-2xl font-bold text-green-600">{passRate}%</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-600/30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Passed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.passed}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-600/30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Failed</p>
                  <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600/30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-amber-600/30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Issues Reported</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.issuesReported}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-600/30" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4 space-y-4">
            {/* Search Bar and Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by Job ID, Driver, Vehicle..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2 bg-transparent"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {activeFilterCount}
                    </Badge>
                  )}
                  {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleExport("csv")}>
                      <FileText className="h-4 w-4 mr-2" />
                      Export as CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport("pdf")}>
                      <FileText className="h-4 w-4 mr-2" />
                      Export as PDF
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {selectedChecklists.length > 0 && (
                  <Button
                    variant="default"
                    onClick={() => handleMarkAsReviewed(selectedChecklists)}
                    className="gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Mark as Reviewed ({selectedChecklists.length})
                  </Button>
                )}
              </div>
            </div>

            {/* Expandable Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
                {/* Date Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    Date Range
                  </label>
                  <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="7days">Last 7 Days</SelectItem>
                      <SelectItem value="30days">Last 30 Days</SelectItem>
                      <SelectItem value="90days">Last 90 Days</SelectItem>
                      <SelectItem value="all">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                    Status
                  </label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pass">Pass</SelectItem>
                      <SelectItem value="fail">Fail</SelectItem>
                      <SelectItem value="pending">Pending Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Client Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    Client
                  </label>
                  <Select value={clientFilter} onValueChange={setClientFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Clients</SelectItem>
                      {clients.map((client) => (
                        <SelectItem key={client} value={client}>
                          {client}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Subcontractor Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    Subcontractor
                  </label>
                  <Select value={subcontractorFilter} onValueChange={setSubcontractorFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="none">Internal Only</SelectItem>
                      {subcontractors.map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Driver Type Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    Driver Type
                  </label>
                  <Select value={driverTypeFilter} onValueChange={setDriverTypeFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Drivers</SelectItem>
                      <SelectItem value="internal">Internal Drivers</SelectItem>
                      <SelectItem value="subcontractor">Subcontractor Drivers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Driver Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    Driver
                  </label>
                  <Select value={driverFilter} onValueChange={setDriverFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Drivers</SelectItem>
                      {drivers.map((driver) => (
                        <SelectItem key={driver.name} value={driver.name}>
                          {driver.name} ({driver.type})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Vehicle Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    Vehicle
                  </label>
                  <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Vehicles</SelectItem>
                      {vehicles.map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.id}>
                          {vehicle.id} ({vehicle.rego})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <Button
                    variant="ghost"
                    onClick={clearFilters}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Checklists Table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Checklists Log</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 pl-4">
                    <Checkbox
                      checked={
                        selectedChecklists.length === filteredChecklists.length &&
                        filteredChecklists.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Checklist ID</TableHead>
                  <TableHead>Job ID</TableHead>
                  <TableHead>Date / Time</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Issues</TableHead>
                  <TableHead>Compliance</TableHead>
                  <TableHead className="text-right pr-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredChecklists.map((checklist) => (
                  <TableRow 
                    key={checklist.id}
                    className={checklist.status === "fail" ? "bg-red-50/50" : ""}
                  >
                    <TableCell className="pl-4">
                      <Checkbox
                        checked={selectedChecklists.includes(checklist.id)}
                        onCheckedChange={(checked) =>
                          handleSelectChecklist(checklist.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell className="font-medium">{checklist.id}</TableCell>
                    <TableCell>
                      <span className="text-primary hover:underline cursor-pointer">
                        {checklist.jobId}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{checklist.date}</p>
                        <p className="text-sm text-muted-foreground">{checklist.time}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="font-medium">{checklist.driver}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {checklist.driverType === "internal" ? "Internal" : checklist.subcontractor}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{checklist.vehicle}</p>
                        <p className="text-xs text-muted-foreground">{checklist.vehicleRego}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm max-w-[150px] truncate">{checklist.client}</p>
                    </TableCell>
                    <TableCell>{getStatusBadge(checklist.status)}</TableCell>
                    <TableCell>
                      {checklist.issuesReported > 0 ? (
                        <div className="flex items-center gap-1 text-orange-600">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="font-medium">{checklist.issuesReported}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {checklist.completedOnTime ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          On Time
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          Late
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right pr-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewChecklist(checklist)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {checklist.photos > 0 && (
                            <DropdownMenuItem>
                              <Camera className="h-4 w-4 mr-2" />
                              View Photos ({checklist.photos})
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleMarkAsReviewed([checklist.id])}>
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Mark as Reviewed
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleExport("pdf")}>
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredChecklists.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={11} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <ClipboardCheck className="h-10 w-10 mb-2 opacity-50" />
                        <p>No checklists found matching your filters</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Checklist Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-primary" />
              Pre-Start Checklist Details
            </DialogTitle>
            <DialogDescription>
              {viewingChecklist?.id} - {viewingChecklist?.date} at {viewingChecklist?.time}
            </DialogDescription>
          </DialogHeader>

          {viewingChecklist && (
            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="space-y-6">
                {/* Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Job</p>
                    <p className="font-medium text-primary">{viewingChecklist.jobId}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Driver</p>
                    <p className="font-medium">{viewingChecklist.driver}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Vehicle</p>
                    <p className="font-medium">{viewingChecklist.vehicle}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Status</p>
                    {getStatusBadge(viewingChecklist.status)}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Checklist Items</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle2 className="h-4 w-4" />
                        {viewingChecklist.checklist.filter((i) => i.status === "pass").length} Passed
                      </span>
                      <span className="flex items-center gap-1 text-red-600">
                        <XCircle className="h-4 w-4" />
                        {viewingChecklist.checklist.filter((i) => i.status === "fail").length} Failed
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {viewingChecklist.checklist.map((item, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-3 p-3 rounded-lg border ${
                          item.status === "fail"
                            ? "bg-red-50 border-red-200"
                            : item.status === "warning"
                            ? "bg-amber-50 border-amber-200"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        {getItemStatusIcon(item.status)}
                        <div className="flex-1">
                          <p className="font-medium">{item.item}</p>
                          {item.notes && (
                            <p className="text-sm text-muted-foreground mt-1">{item.notes}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {viewingChecklist.notes && (
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-2">Additional Notes</h3>
                    <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">
                      {viewingChecklist.notes}
                    </p>
                  </div>
                )}

                {/* Photos */}
                {viewingChecklist.photos > 0 && (
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Attached Photos ({viewingChecklist.photos})
                    </h3>
                    <div className="grid grid-cols-4 gap-2">
                      {Array.from({ length: viewingChecklist.photos }).map((_, i) => (
                        <div
                          key={i}
                          className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-300"
                        >
                          <Camera className="h-6 w-6 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsDetailModalOpen(false)} className="bg-transparent">
              Close
            </Button>
            <Button variant="outline" onClick={() => handleExport("pdf")} className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            {viewingChecklist?.status === "pending" && (
              <Button onClick={() => handleMarkAsReviewed([viewingChecklist.id])} className="gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Mark as Reviewed
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
