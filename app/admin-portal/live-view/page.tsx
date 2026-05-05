"use client"

import { useRef } from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Navigation, Truck, Radio, Info, Map, CheckCircle, Settings } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const liveJobs = [
  {
    id: "JOB-2024-001",
    jobNumber: "JOB-2024-001",
    clientName: "Sydney Metro Construction",
    clientPO: "PO-2024-MC-1578",
    pickupAddress: "123 George St, Sydney NSW 2000",
    tipClient: "Coastal Transport Co",
    tipAddress: "78 Beach Road, Wollongong NSW 2500",
    createdBy: "Sarah Mitchell",
    trucksAllocatedBy: "John Anderson",
    clientRate: 140,
    clientRateType: "Per Tonne",
    subcontractorRate: 140,
    subcontractorRateType: "Hourly",
    tipRate: 870,
    tipRateType: "Per Load",
    tollOneWay: 12.5,
    tollReturn: 25.0,
    tollMetadata: {
      oneWay: "M5 Motorway + Eastern Distributor",
      return: "M5 Motorway + Eastern Distributor",
    },
    trucks: [
      { registration: "GHI-789", status: "active", type: "Internal", coordinates: { lat: -33.8688, lng: 151.2093 } },
      { registration: "DEF-456", status: "active", type: "Internal", coordinates: { lat: -33.8685, lng: 151.2095 } },
      {
        registration: "SUB-002",
        status: "warning",
        type: "Subcontractor",
        coordinates: { lat: -33.869, lng: 151.2091 },
      },
      { registration: "MNO-234", status: "active", type: "Internal", coordinates: { lat: -33.8687, lng: 151.2094 } },
      { registration: "PQR-567", status: "active", type: "Internal", coordinates: { lat: -33.8689, lng: 151.2092 } },
      {
        registration: "SUB-001",
        status: "warning",
        type: "Subcontractor",
        coordinates: { lat: -33.8686, lng: 151.2096 },
      },
      { registration: "JKL-890", status: "warning", type: "Internal", coordinates: { lat: -33.8691, lng: 151.208 } },
      {
        registration: "SUB-004",
        status: "warning",
        type: "Subcontractor",
        coordinates: { lat: -33.8684, lng: 151.2097 },
      },
      { registration: "ABC-123", status: "alert", type: "Internal", coordinates: { lat: -33.8692, lng: 151.2089 } },
      {
        registration: "SUB-003",
        status: "alert",
        type: "Subcontractor",
        coordinates: { lat: -33.8683, lng: 151.2098 },
      },
    ],
    status: "In Progress",
    entryDate: "14/01/2024",
    entryTime: "08:00",
    deliveryDate: "15/01/2024",
    deliveryTime: "08:00",
    currentLocation: "123 Construction Ave, City",
    stagePoint: "Stage A",
    dropSite: "Drop Site 1",
    tipSite: "Tip Site North",
    material: "Concrete Mix",
  },
  {
    id: "JOB-2024-002",
    jobNumber: "JOB-2024-002",
    clientName: "Melbourne Infrastructure",
    clientPO: "PO-2024-MI-2341",
    pickupAddress: "456 Industrial Rd, Melbourne VIC 3000",
    tipClient: "Metro Waste Services",
    tipAddress: "12 Recycling Way, Dandenong VIC 3175",
    createdBy: "Emma Williams",
    trucksAllocatedBy: "David Chen",
    clientRate: 155,
    clientRateType: "Per Tonne",
    subcontractorRate: 150,
    subcontractorRateType: "Hourly",
    tipRate: 920,
    tipRateType: "Per Load",
    tollOneWay: 15.0,
    tollReturn: 30.0,
    tollMetadata: {
      oneWay: "CityLink + Monash Freeway",
      return: "CityLink + Monash Freeway",
    },
    trucks: [
      { registration: "VIC-123", status: "active", type: "Internal", coordinates: { lat: -33.865, lng: 151.2094 } },
      {
        registration: "VIC-456",
        status: "warning",
        type: "Subcontractor",
        coordinates: { lat: -33.8652, lng: 151.2092 },
      },
      { registration: "VIC-789", status: "active", type: "Internal", coordinates: { lat: -33.8648, lng: 151.2096 } },
    ],
    status: "En Route",
    entryDate: "14/01/2024",
    entryTime: "09:30",
    deliveryDate: "15/01/2024",
    deliveryTime: "10:00",
    currentLocation: "456 Industrial Rd, City",
    stagePoint: "Stage B",
    dropSite: "Drop Site 2",
    tipSite: "Tip Site South",
    material: "Gravel",
  },
  {
    id: "JOB-2024-003",
    jobNumber: "JOB-2024-003",
    clientName: "Brisbane Developments",
    clientPO: "PO-2024-BD-8765",
    pickupAddress: "789 Development St, Brisbane QLD 4000",
    tipClient: "North Side Quarry",
    tipAddress: "45 Quarry Road, Caboolture QLD 4510",
    createdBy: "Michael Brown",
    trucksAllocatedBy: "Lisa Thompson",
    clientRate: 130,
    clientRateType: "Per Tonne",
    subcontractorRate: 135,
    subcontractorRateType: "Hourly",
    tipRate: 750,
    tipRateType: "Per Load",
    tollOneWay: 8.5,
    tollReturn: 17.0,
    tollMetadata: {
      oneWay: "Gateway Motorway",
      return: "Gateway Motorway",
    },
    trucks: [
      { registration: "QLD-234", status: "active", type: "Internal", coordinates: { lat: -33.87, lng: 151.208 } },
      { registration: "QLD-567", status: "success", type: "Internal", coordinates: { lat: -33.8702, lng: 151.2078 } },
    ],
    status: "Loading",
    entryDate: "14/01/2024",
    entryTime: "07:00",
    deliveryDate: "14/01/2024",
    deliveryTime: "16:00",
    currentLocation: "789 Development St, City",
    stagePoint: "Stage C",
    dropSite: "Drop Site 3",
    tipSite: "Tip Site East",
    material: "Sand",
  },
]

export default function AdminLiveViewPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDriver, setFilterDriver] = useState("all")
  const [jobNumberFilter, setJobNumberFilter] = useState("")
  const [gpsSyncInterval, setGpsSyncInterval] = useState<string>("30")
  const [isGpsSyncDialogOpen, setIsGpsSyncDialogOpen] = useState(false)
  const liveMapRef = useRef<HTMLDivElement>(null)

  // Moved AdminTopNav to layout
  // const AdminTopNav = () => null;

  const filteredJobs = liveJobs.filter((job) => {
    const matchesJobFilter = !jobNumberFilter || job.jobNumber === jobNumberFilter

    const matchesSearch =
      job.jobNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.currentLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.dropSite.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tipSite.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === "all" || job.status === filterStatus
    const matchesDriver = filterDriver === "all"

    return matchesJobFilter && matchesSearch && matchesStatus && matchesDriver
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "En Route":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "Loading":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "Completed Today":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const truckStatusColors = {
    active: "bg-green-500",
    warning: "bg-amber-500",
    alert: "bg-red-500",
    success: "bg-green-500",
  }

  const handleViewOnLiveMap = (jobNumber: string) => {
    setJobNumberFilter(jobNumber)
    setSearchQuery(jobNumber)
    // Scroll to Live Map section
    setTimeout(() => {
      liveMapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  const activeTrucks = new Set(filteredJobs.flatMap((job) => job.trucks.map((truck) => truck.registration))).size

  const completedToday = filteredJobs.filter((job) => job.status === "Completed").length

  return (
    <div>
      {/* AdminTopNav is now in layout */}
      {/* <AdminTopNav /> */}
      <div className="p-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Live View</h1>
            <p className="text-muted-foreground">Real-time tracking of jobs and driver locations</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Active Trucks</p>
                  <p className="text-xl font-bold text-foreground">{activeTrucks}</p>
                </div>
                <div className="bg-blue-500/10 p-2 rounded-lg">
                  <Truck className="h-5 w-5 text-blue-500" />
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                  <p className="text-xl font-bold text-foreground">
                    {filteredJobs.filter((j) => j.status === "In Progress").length}
                  </p>
                </div>
                <div className="bg-green-500/10 p-2 rounded-lg">
                  <Navigation className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Completed Today</p>
                  <p className="text-xl font-bold text-foreground">{completedToday}</p>
                </div>
                <div className="bg-emerald-500/10 p-2 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                </div>
              </div>
            </Card>

            <Dialog open={isGpsSyncDialogOpen} onOpenChange={setIsGpsSyncDialogOpen}>
              <DialogTrigger asChild>
                <Card className="p-4 cursor-pointer hover:bg-accent/50 transition-all relative border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 to-emerald-500/10 shadow-md hover:shadow-lg">
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1.5 shadow-lg">
                    <Settings className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">GPS Sync</p>
                      <p className="text-2xl font-bold text-foreground">{gpsSyncInterval}s</p>
                      <p className="text-xs text-green-600 dark:text-green-500 flex items-center gap-1 mt-1 font-medium">
                        <Radio className="h-3 w-3" />
                        Live
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-1 italic">Click to configure</p>
                    </div>
                    <div className="bg-green-500/20 p-3 rounded-lg">
                      <Radio className="h-6 w-6 text-green-600 dark:text-green-500" />
                    </div>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>GPS Sync Interval Settings</DialogTitle>
                  <DialogDescription>
                    Set the GPS synchronization interval for live tracking across all portals. Lower intervals provide
                    more real-time updates but may increase data usage.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Sync Interval</label>
                    <Select value={gpsSyncInterval} onValueChange={setGpsSyncInterval}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select interval" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 seconds (High frequency)</SelectItem>
                        <SelectItem value="10">10 seconds</SelectItem>
                        <SelectItem value="15">15 seconds</SelectItem>
                        <SelectItem value="30">30 seconds (Default)</SelectItem>
                        <SelectItem value="60">60 seconds</SelectItem>
                        <SelectItem value="120">2 minutes</SelectItem>
                        <SelectItem value="300">5 minutes (Low frequency)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">Current setting: {gpsSyncInterval} seconds</p>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      This setting will apply to all portals (Head Office, Client, and Subcontractor).
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h2 className="flex items-center gap-2 text-xl font-semibold">
                  <MapPin className="h-5 w-5 text-primary" />
                  Live Map
                </h2>
                {jobNumberFilter && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Showing Job</span>
                    <Badge variant="secondary" className="font-mono">
                      {jobNumberFilter}
                    </Badge>
                  </div>
                )}
              </div>
              <div className="relative w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filter by Job Number..."
                  value={jobNumberFilter}
                  onChange={(e) => setJobNumberFilter(e.target.value.toUpperCase())}
                  className="pl-10 pr-10"
                />
                {jobNumberFilter && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                    onClick={() => {
                      setJobNumberFilter("")
                      setSearchQuery("")
                      window.history.replaceState({}, "", "/admin-portal/live-view")
                    }}
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <div className="relative h-[600px] bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg overflow-hidden">
              {filteredJobs.flatMap((job) =>
                job.trucks.map((truck, index) => (
                  <div
                    key={`${job.id}-${truck.registration}`}
                    className="absolute flex flex-col items-center gap-1 animate-pulse"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                  >
                    <div className="bg-primary text-primary-foreground rounded-full p-2 shadow-lg border-2 border-background">
                      <Truck className="h-4 w-4" />
                    </div>
                    <Badge variant="outline" className="text-xs bg-background">
                      {truck.registration}
                    </Badge>
                  </div>
                )),
              )}

              <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border">
                <p className="text-xs text-muted-foreground">
                  Integration with Map Provider (Google Maps, Mapbox, etc.)
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-4">Job Details</h2>

              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by Job Number, Client, Location, Material, Drop Site, Tip Site"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="En Route">En Route</SelectItem>
                    <SelectItem value="Loading">Loading</SelectItem>
                    <SelectItem value="Completed Today">Completed Today</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No jobs found matching your filters.</p>
                </div>
              ) : (
                filteredJobs.map((job) => {
                  const sortedTrucks = [...(job.trucks || [])].sort((a, b) => {
                    const statusOrder = { active: 0, warning: 1, alert: 2, success: 0 }
                    return (statusOrder[a.status] ?? 3) - (statusOrder[b.status] ?? 3)
                  })

                  const trucksPerColumn = 5
                  const truckColumns: (typeof job.trucks)[] = []

                  if (sortedTrucks && sortedTrucks.length > 0) {
                    for (let i = 0; i < sortedTrucks.length; i += trucksPerColumn) {
                      truckColumns.push(sortedTrucks.slice(i, i + trucksPerColumn))
                    }
                  }

                  return (
                    <Card key={job.id} className="border border-border p-0 overflow-hidden">
                      <div className="grid grid-cols-[280px_300px_1fr]">
                        {/* Column 1: Client Information */}
                        <div className="p-4 border-r border-border bg-blue-50 dark:bg-blue-950/20">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="text-primary font-semibold text-base">{job.jobNumber}</div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex gap-2">
                                <span className="text-xs text-muted-foreground font-medium min-w-[100px]">Client:</span>
                                <span className="text-sm font-medium text-primary">{job.clientName}</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="text-xs text-muted-foreground font-medium min-w-[100px]">
                                  Client PO #:
                                </span>
                                <span className="text-sm">{job.clientPO}</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="text-xs text-muted-foreground font-medium min-w-[100px]">
                                  Pickup Address:
                                </span>
                                <span className="text-sm">{job.pickupAddress}</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="text-xs text-muted-foreground font-medium min-w-[100px]">
                                  Tip Client:
                                </span>
                                <span className="text-sm">{job.tipClient}</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="text-xs text-muted-foreground font-medium min-w-[100px]">
                                  Tip Address:
                                </span>
                                <span className="text-sm">{job.tipAddress}</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="text-xs text-muted-foreground font-medium min-w-[100px]">
                                  Job Created by:
                                </span>
                                <span className="text-sm">{job.createdBy}</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="text-xs text-muted-foreground font-medium min-w-[100px]">
                                  Trucks allocated by:
                                </span>
                                <span className="text-sm">{job.trucksAllocatedBy}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Column 2: Rates and Tolls */}
                        <div className="p-4 border-r border-border bg-amber-50/50 dark:bg-amber-950/10">
                          <div className="font-semibold text-sm mb-2 text-amber-900 dark:text-amber-100">Rates</div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-muted-foreground min-w-[100px]">Client</span>
                              <span className="font-semibold min-w-[60px] text-green-700 dark:text-green-400">
                                ${job.clientRate}
                              </span>
                              <span className="min-w-[80px] text-xs">{job.clientRateType}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-muted-foreground min-w-[100px]">Subcontractor</span>
                              <span className="font-semibold min-w-[60px] text-green-700 dark:text-green-400">
                                ${job.subcontractorRate}
                              </span>
                              <span className="min-w-[80px] text-xs">{job.subcontractorRateType}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-muted-foreground min-w-[100px]">Tip</span>
                              <span className="font-semibold min-w-[60px] text-green-700 dark:text-green-400">
                                ${job.tipRate}
                              </span>
                              <span className="min-w-[80px] text-xs">{job.tipRateType}</span>
                            </div>

                            <div className="border-t border-amber-200 dark:border-amber-800 pt-3 mt-3">
                              <div className="font-semibold text-sm mb-2 text-amber-900 dark:text-amber-100">Tolls</div>
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">One Way</span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-green-700 dark:text-green-400">
                                      ${job.tollOneWay.toFixed(2)}
                                    </span>
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                                          <Info className="h-3 w-3 text-muted-foreground" />
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-[400px]">
                                        <div className="space-y-3">
                                          <h4 className="font-semibold text-sm">Toll Information</h4>
                                          <div className="space-y-2 text-xs">
                                            <div>
                                              <div className="font-medium text-muted-foreground">Route</div>
                                              <div>{job.tollMetadata.oneWay}</div>
                                            </div>
                                          </div>
                                        </div>
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">Return</span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-green-700 dark:text-green-400">
                                      ${job.tollReturn.toFixed(2)}
                                    </span>
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                                          <Info className="h-3 w-3 text-muted-foreground" />
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-[400px]">
                                        <div className="space-y-3">
                                          <h4 className="font-semibold text-sm">Toll Information</h4>
                                          <div className="space-y-2 text-xs">
                                            <div>
                                              <div className="font-medium text-muted-foreground">Route</div>
                                              <div>{job.tollMetadata.return}</div>
                                            </div>
                                          </div>
                                        </div>
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Column 3: Trucks with Coordinates */}
                        <div className="p-4 bg-background">
                          <div className="font-semibold text-sm mb-2">Trucks</div>
                          <div className="flex gap-8">
                            {truckColumns.map((column, colIdx) => (
                              <div key={colIdx} className="space-y-2 min-w-[180px]">
                                {column.map((truck, idx) => (
                                  <div key={idx} className="flex items-start gap-2">
                                    <div className={`h-2 w-2 rounded-full mt-1 ${truckStatusColors[truck.status]}`} />
                                    <div>
                                      <div className="text-sm font-medium font-mono">{truck.registration}</div>
                                      <div className="text-xs text-muted-foreground">{truck.type}</div>
                                      <div className="text-xs text-blue-600 dark:text-blue-400 font-mono">
                                        {truck.coordinates.lat.toFixed(4)}°, {truck.coordinates.lng.toFixed(4)}°
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Footer Bar */}
                      <div className="-mt-6 flex items-center justify-between px-4 py-2.5 bg-slate-900">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-sm">Job Status:</span>
                            <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                              {job.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-slate-300">
                            <span className="text-slate-400">Entry Date / Time:</span> {job.entryDate} {job.entryTime}
                          </div>
                          <div className="text-sm text-slate-300">
                            <span className="text-slate-400">Delivery Date / Time:</span> {job.deliveryDate}{" "}
                            {job.deliveryTime}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 bg-transparent text-white border-white/20 hover:bg-white/10"
                            onClick={() => handleViewOnLiveMap(job.jobNumber)}
                          >
                            <Map className="h-4 w-4" />
                            View on Live Map
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )
                })
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
