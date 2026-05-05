"use client"

import { useState, useRef } from "react"
import { DashboardTopNav } from "@/components/dashboard/dashboard-topnav"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, MapPin, Navigation, Truck, Radio, Map, Info, CheckCircle } from "lucide-react"

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
      oneWay: "M1 Motorway → Princes Highway",
      return: "Princes Highway → M1 Motorway → Harbour Bridge",
    },
    status: "In Progress",
    entryDate: "14/01/2024",
    entryTime: "08:00",
    deliveryDate: "15/01/2024",
    deliveryTime: "08:00",
    trucks: [
      { registration: "GHI-789", type: "Internal", status: "active", coordinates: { lat: -33.8688, lng: 151.2093 } },
      { registration: "DEF-456", type: "Internal", status: "active", coordinates: { lat: -33.8655, lng: 151.2095 } },
      {
        registration: "SUB-002",
        type: "Subcontractor",
        status: "loading",
        coordinates: { lat: -33.869, lng: 151.2051 },
      },
      { registration: "MNO-234", type: "Internal", status: "active", coordinates: { lat: -33.8687, lng: 151.2094 } },
      {
        registration: "PQR-567",
        type: "Internal",
        status: "active",
        coordinates: { lat: -33.8689, lng: 151.2092 },
      },
    ],
  },
  {
    id: "JOB-2024-002",
    jobNumber: "JOB-2024-002",
    clientName: "Harbour Bridge Renovators",
    clientPO: "PO-2024-HB-2891",
    pickupAddress: "456 Industrial Rd, Sydney NSW 2000",
    tipClient: "Northern Waste Co",
    tipAddress: "234 Pacific Highway, Hornsby NSW 2077",
    createdBy: "Michael Chen",
    trucksAllocatedBy: "Sarah Johnson",
    clientRate: 120,
    clientRateType: "Per Tonne",
    subcontractorRate: 120,
    subcontractorRateType: "Hourly",
    tipRate: 650,
    tipRateType: "Per Load",
    tollOneWay: 8.75,
    tollReturn: 17.5,
    tollMetadata: {
      oneWay: "Harbour Bridge → M2 Motorway",
      return: "M2 Motorway → Harbour Bridge",
    },
    status: "En Route",
    entryDate: "14/01/2024",
    entryTime: "09:30",
    deliveryDate: "15/01/2024",
    deliveryTime: "09:30",
    trucks: [
      {
        registration: "SUB-001",
        type: "Subcontractor",
        status: "active",
        coordinates: { lat: -33.865, lng: 151.2094 },
      },
      { registration: "JKL-890", type: "Internal", status: "active", coordinates: { lat: -33.8691, lng: 151.208 } },
      {
        registration: "SUB-004",
        type: "Subcontractor",
        status: "active",
        coordinates: { lat: -33.8684, lng: 151.2097 },
      },
    ],
  },
  {
    id: "JOB-2024-003",
    jobNumber: "JOB-2024-003",
    clientName: "Barangaroo Development Ltd",
    clientPO: "PO-2024-BD-4532",
    pickupAddress: "789 Development St, Sydney NSW 2000",
    tipClient: "Western Materials Hub",
    tipAddress: "567 Parramatta Road, Parramatta NSW 2150",
    createdBy: "Emma Rodriguez",
    trucksAllocatedBy: "Mike Wilson",
    clientRate: 160,
    clientRateType: "Per Tonne",
    subcontractorRate: 160,
    subcontractorRateType: "Hourly",
    tipRate: 920,
    tipRateType: "Per Load",
    tollOneWay: 6.25,
    tollReturn: 12.5,
    tollMetadata: {
      oneWay: "City West Link → M4 Western Motorway",
      return: "M4 Western Motorway → City West Link",
    },
    status: "Loading",
    entryDate: "14/01/2024",
    entryTime: "10:00",
    deliveryDate: "15/01/2024",
    deliveryTime: "10:00",
    trucks: [
      { registration: "ABC-123", type: "Internal", status: "loading", coordinates: { lat: -33.87, lng: 151.208 } },
      {
        registration: "SUB-003",
        type: "Subcontractor",
        status: "loading",
        coordinates: { lat: -33.8692, lng: 151.2089 },
      },
    ],
  },
]

const truckStatusColors = {
  active: "bg-green-500",
  loading: "bg-orange-500",
  inactive: "bg-red-500",
}

export default function LiveViewPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [jobNumberFilter, setJobNumberFilter] = useState("")
  const mapRef = useRef<HTMLDivElement>(null)

  const filteredJobs = liveJobs.filter((job) => {
    if (jobNumberFilter && job.jobNumber !== jobNumberFilter) {
      return false
    }

    const matchesSearch =
      job.jobNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.pickupAddress.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSearch
  })

  // Calculate statistics
  const activeJobs = filteredJobs.length
  const inProgressCount = filteredJobs.filter((j) => j.status === "In Progress").length
  const enRouteCount = filteredJobs.filter((j) => j.status === "En Route").length
  const loadingCount = filteredJobs.filter((j) => j.status === "Loading").length
  const completedToday = filteredJobs.filter((job) => job.status === "Completed").length

  const activeTrucks = new Set(filteredJobs.flatMap((job) => job.trucks.map((truck) => truck.registration))).size

  const handleViewOnLiveMap = (jobNumber: string) => {
    setJobNumberFilter(jobNumber)
    setSearchQuery(jobNumber)

    // Scroll to map
    setTimeout(() => {
      mapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardTopNav />
      <div className="flex-1">
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Live View</h1>
            <p className="text-muted-foreground">Real-time tracking of jobs and driver locations</p>
          </div>

          {/* Stats Cards */}
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
                  <p className="text-xl font-bold text-foreground">{inProgressCount}</p>
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
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">GPS Sync</p>
                  <p className="text-xl font-bold text-foreground">30s</p>
                  <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                    <Radio className="h-3 w-3" />
                    Live
                  </p>
                </div>
                <div className="bg-green-500/10 p-2 rounded-lg">
                  <Map className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </Card>
          </div>

          {/* Live Map Section */}
          <Card className="p-6 mb-6" ref={mapRef}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Live Map
                </h2>
                {jobNumberFilter && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Showing Job</span>
                    <Badge variant="outline" className="font-mono">
                      {jobNumberFilter}
                    </Badge>
                  </div>
                )}
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filter by Job Number..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setJobNumberFilter(e.target.value)
                  }}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="relative w-full h-[500px] bg-muted rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgb(0,0,0,0.1) 1px, transparent 1px),
                      linear-gradient(to bottom, rgb(0,0,0,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                  }}
                />

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
                  <p className="text-sm font-medium">Active Jobs: {activeJobs}</p>
                  <p className="text-xs text-muted-foreground">{inProgressCount} in progress</p>
                </div>
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full border shadow-sm">
                <p className="text-xs text-muted-foreground">
                  Integration with Map Provider (Google Maps, Mapbox, etc.)
                </p>
              </div>
            </div>
          </Card>

          {/* Job Details Section */}
          <Card className="overflow-hidden">
            <CardHeader className="border-b">
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {filteredJobs.map((job) => {
                const sortedTrucks = [...(job.trucks || [])].sort((a, b) => {
                  const statusOrder = { active: 0, loading: 1, inactive: 2 }
                  return (statusOrder[a.status] ?? 3) - (statusOrder[b.status] ?? 3)
                })

                // Split trucks into columns for display (5 trucks per column)
                const trucksPerColumn = 5
                const truckColumns: (typeof job.trucks)[] = []

                if (sortedTrucks && sortedTrucks.length > 0) {
                  for (let i = 0; i < sortedTrucks.length; i += trucksPerColumn) {
                    truckColumns.push(sortedTrucks.slice(i, i + trucksPerColumn))
                  }
                }

                return (
                  <div key={job.id} className="border border-border p-0 overflow-hidden mb-4">
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
                    <div className="bg-slate-900 dark:bg-slate-950 px-4 py-3 flex items-center justify-between text-sm text-slate-300">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">Job Status:</span>
                          <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">In Progress</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">Entry Date / Time:</span>
                          <span className="text-slate-200">
                            {job.entryDate} {job.entryTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">Delivery Date / Time:</span>
                          <span className="text-slate-200">
                            {job.deliveryDate} {job.deliveryTime}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewOnLiveMap(job.jobNumber)}
                          className="text-slate-300 hover:text-slate-100 hover:bg-slate-800"
                        >
                          <Map className="h-4 w-4 mr-2" />
                          View on Live Map
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
