"use client"

import { useState, useRef } from "react"
import { DashboardTopNav } from "@/components/subcontractor/dashboard-topnav"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, MapPin, Navigation, Truck, Radio, Map, Info, CheckCircle, X } from "lucide-react"

const CURRENT_SUBCONTRACTOR = "John's Trucking Co"

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
    subcontractorName: "John's Trucking Co",
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
      {
        registration: "SUB-002",
        type: "Subcontractor",
        owner: "John's Trucking Co",
        status: "active",
        coordinates: { lat: -33.869, lng: 151.2051 },
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
    subcontractorName: "John's Trucking Co",
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
        owner: "John's Trucking Co",
        status: "active",
        coordinates: { lat: -33.865, lng: 151.2094 },
      },
      {
        registration: "SUB-004",
        type: "Subcontractor",
        owner: "John's Trucking Co",
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
    subcontractorName: "John's Trucking Co",
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
    deliveryDate: "14/01/2024",
    deliveryTime: "16:00",
    trucks: [
      {
        registration: "SUB-003",
        type: "Subcontractor",
        owner: "John's Trucking Co",
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

export default function SubcontractorLiveViewPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [jobNumberFilter, setJobNumberFilter] = useState("")
  const mapRef = useRef<HTMLDivElement>(null)

  const filteredJobs = liveJobs
    .filter((job) => job.subcontractorName === CURRENT_SUBCONTRACTOR)
    .map((job) => ({
      ...job,
      trucks: job.trucks.filter((truck) => truck.owner === CURRENT_SUBCONTRACTOR),
    }))
    .filter((job) => {
      if (jobNumberFilter && job.jobNumber !== jobNumberFilter) {
        return false
      }

      const matchesSearch =
        job.jobNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.pickupAddress.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesSearch
    })

  const activeJobs = filteredJobs.length
  const inProgressCount = filteredJobs.filter((j) => j.status === "In Progress").length
  const completedToday = filteredJobs.filter((job) => job.status === "Completed").length
  const activeTrucks = new Set(filteredJobs.flatMap((job) => job.trucks.map((truck) => truck.registration))).size

  const handleViewOnLiveMap = (jobNumber: string) => {
    setJobNumberFilter(jobNumber)
    setSearchQuery(jobNumber)
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
            <p className="text-muted-foreground">Real-time tracking of your trucks and assigned jobs</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Trucks</p>
                    <p className="text-3xl font-bold mt-2">{activeTrucks}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Truck className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                    <p className="text-3xl font-bold mt-2">{inProgressCount}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Navigation className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed Today</p>
                    <p className="text-3xl font-bold mt-2">{completedToday}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-emerald-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">GPS Sync</p>
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-3xl font-bold">30s</p>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        <Radio className="h-3 w-3 mr-1" />
                        Live
                      </Badge>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Radio className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Map */}
          <Card className="p-6 mb-6" ref={mapRef}>
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
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <div className="relative h-[600px] bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg overflow-hidden">
              {filteredJobs.flatMap((job) =>
                job.trucks.map((truck) => (
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

          {/* Job Details */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Job Details</CardTitle>
              <Badge variant="outline">{filteredJobs.length} Active Jobs</Badge>
            </CardHeader>
            <CardContent>
              {filteredJobs.length === 0 ? (
                <div className="text-center py-12">
                  <Truck className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">No active jobs</p>
                  <p className="text-sm text-muted-foreground/70 mt-1">
                    {searchQuery
                      ? "Try adjusting your search query"
                      : "You don't have any jobs in progress at the moment"}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredJobs.map((job) => (
                    <div key={job.id} className="border border-border p-0 overflow-hidden">
                      <div className="grid grid-cols-[300px_300px_1fr]">
                        {/* Column 1: Client Information */}
                        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border-r border-border">
                          <div>
                            <h3 className="text-xl font-bold text-blue-900 mb-2">{job.jobNumber}</h3>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm text-blue-600 font-medium">Client:</p>
                                <p className="text-base font-semibold">{job.clientName}</p>
                              </div>
                              <div>
                                <p className="text-sm text-blue-600 font-medium">Client PO #:</p>
                                <p className="text-base">{job.clientPO}</p>
                              </div>
                              <div>
                                <p className="text-sm text-blue-600 font-medium">Pickup Address:</p>
                                <p className="text-base">{job.pickupAddress}</p>
                              </div>
                              <div>
                                <p className="text-sm text-blue-600 font-medium">Tip Client:</p>
                                <p className="text-base font-semibold">{job.tipClient}</p>
                              </div>
                              <div>
                                <p className="text-sm text-blue-600 font-medium">Tip Address:</p>
                                <p className="text-base">{job.tipAddress}</p>
                              </div>
                              <div>
                                <p className="text-sm text-blue-600 font-medium">Job Created by:</p>
                                <p className="text-base">{job.createdBy}</p>
                              </div>
                              <div>
                                <p className="text-sm text-blue-600 font-medium">Trucks allocated by:</p>
                                <p className="text-base">{job.trucksAllocatedBy}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Column 2: Rates and Tolls */}
                        <div className="p-4 bg-amber-50/50 dark:bg-amber-950/10 border-r border-border">
                          <div className="mb-4">
                            <h4 className="font-bold text-amber-900 mb-3">Rates</h4>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <p className="text-sm text-amber-700">Subcontractor</p>
                                <div className="text-right">
                                  <p className="text-lg font-bold text-green-600">${job.subcontractorRate}</p>
                                  <p className="text-xs text-muted-foreground">{job.subcontractorRateType}</p>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <p className="text-sm text-amber-700">Tip</p>
                                <div className="text-right">
                                  <p className="text-lg font-bold text-green-600">${job.tipRate}</p>
                                  <p className="text-xs text-muted-foreground">{job.tipRateType}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-amber-200 pt-4">
                            <h4 className="font-bold text-amber-900 mb-3">Tolls</h4>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <p className="text-sm text-amber-700">One Way</p>
                                <div className="flex items-center gap-2">
                                  <p className="text-lg font-bold text-green-600">${job.tollOneWay.toFixed(2)}</p>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <Info className="h-4 w-4" />
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                      <div className="space-y-2">
                                        <h4 className="font-semibold">Route Details</h4>
                                        <p className="text-sm text-muted-foreground">{job.tollMetadata.oneWay}</p>
                                      </div>
                                    </PopoverContent>
                                  </Popover>
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <p className="text-sm text-amber-700">Return</p>
                                <div className="flex items-center gap-2">
                                  <p className="text-lg font-bold text-green-600">${job.tollReturn.toFixed(2)}</p>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <Info className="h-4 w-4" />
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                      <div className="space-y-2">
                                        <h4 className="font-semibold">Route Details</h4>
                                        <p className="text-sm text-muted-foreground">{job.tollMetadata.return}</p>
                                      </div>
                                    </PopoverContent>
                                  </Popover>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Column 3: Trucks */}
                        <div className="p-4 bg-background">
                          <h4 className="font-bold mb-3">Trucks</h4>
                          <div className="space-y-3">
                            {job.trucks.map((truck) => (
                              <div key={truck.registration} className="flex items-start gap-2">
                                <span className={`h-2.5 w-2.5 rounded-full mt-1 ${truckStatusColors[truck.status]}`} />
                                <div className="flex-1">
                                  <p className="font-semibold">{truck.registration}</p>
                                  <p className="text-sm text-muted-foreground">{truck.type}</p>
                                  <p className="text-xs text-blue-600">
                                    {truck.coordinates.lat.toFixed(4)}°, {truck.coordinates.lng.toFixed(4)}°
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="bg-slate-900 dark:bg-slate-950 text-white px-4 py-3 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-400">Job Status:</span>
                            <Badge variant="secondary" className="bg-purple-500 text-white">
                              In Progress
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-slate-400">Entry Date / Time:</span>
                            <span className="text-white">
                              {job.entryDate} {job.entryTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-slate-400">Delivery Date / Time:</span>
                            <span className="text-white">
                              {job.deliveryDate} {job.deliveryTime}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                          onClick={() => handleViewOnLiveMap(job.jobNumber)}
                        >
                          <Map className="h-4 w-4 mr-2" />
                          View on Live Map
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
