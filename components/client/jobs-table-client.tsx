"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Info } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const jobs = [
  {
    id: "JOB-2024-001",
    clientPO: "PO-2024-MC-1578",
    pickupAddress: "123 George St, Sydney NSW 2000",
    tipClient: "Coastal Transport Co",
    tipAddress: "78 Beach Road, Wollongong NSW 2500",
    clientRate: 140,
    clientRateUnit: "Per Tonne",
    subcontractorRate: 140,
    subcontractorRateUnit: "Hourly",
    tipRate: 870,
    tipRateUnit: "Per Load",
    tollOneWay: 12.5,
    tollReturn: 25.0,
    trucks: [
      { registration: "GHI-789", type: "Internal", status: "active" },
      { registration: "DEF-456", type: "Internal", status: "active" },
      { registration: "SUB-002", type: "Subcontractor", status: "pending" },
    ],
    status: "New",
    entryDate: "14/01/2024",
    entryTime: "08:00",
    deliveryDate: "15/01/2024",
    deliveryTime: "08:00",
  },
  {
    id: "JOB-2024-003",
    clientPO: "PO-2024-XL-8932",
    pickupAddress: "789 Warehouse Rd, Sydney NSW 2000",
    tipClient: "Sand Transport Co",
    tipAddress: "321 Delivery Ln, Parramatta NSW 2150",
    clientRate: 165,
    clientRateUnit: "Per Tonne",
    subcontractorRate: 155,
    subcontractorRateUnit: "Hourly",
    tipRate: 920,
    tipRateUnit: "Per Load",
    tollOneWay: 12.5,
    tollReturn: 25.0,
    trucks: [{ registration: "GHI-002", type: "Internal", status: "active" }],
    status: "In Progress",
    entryDate: "13/01/2024",
    entryTime: "09:00",
    deliveryDate: "13/01/2024",
    deliveryTime: "10:00",
  },
  {
    id: "JOB-2024-004",
    clientPO: "PO-2024-IC-5432",
    pickupAddress: "321 Highway Rd, Perth WA",
    tipClient: "Rock Transport Co",
    tipAddress: "21 Quarry St, Mandurah WA 6210",
    clientRate: 135,
    clientRateUnit: "Per Tonne",
    subcontractorRate: 145,
    subcontractorRateUnit: "Hourly",
    tipRate: 880,
    tipRateUnit: "Per Load",
    tollOneWay: 12.5,
    tollReturn: 25.0,
    trucks: [
      { registration: "MNO-345", type: "Internal", status: "active" },
      { registration: "PQR-678", type: "Subcontractor", status: "active" },
      { registration: "STU-901", type: "Internal", status: "active" },
    ],
    status: "Completed",
    entryDate: "12/01/2024",
    entryTime: "09:00",
    deliveryDate: "13/01/2024",
    deliveryTime: "09:00",
  },
]

export function JobsTableClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-foreground">Jobs Management</h2>
        <div className="flex items-center gap-3">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search jobs, addresses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id} className="overflow-hidden">
            <div className="grid grid-cols-[300px_1fr_1fr] gap-6 p-6">
              {/* Left Column - Job Details */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-teal-600 mb-2">{job.id}</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Client PO #:</span>
                    <div className="font-medium text-foreground">{job.clientPO}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Pickup Address:</span>
                    <div className="font-medium text-foreground">{job.pickupAddress}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tip Client:</span>
                    <div className="font-medium text-foreground">{job.tipClient}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tip Address:</span>
                    <div className="font-medium text-foreground">{job.tipAddress}</div>
                  </div>
                </div>
              </div>

              {/* Middle Column - Rates */}
              <div>
                <h4 className="text-sm font-semibold text-amber-700 mb-3">Rates</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Client</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-green-600">${job.clientRate}</span>
                      <Badge variant="outline" className="text-xs">
                        {job.clientRateUnit}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Subcontractor</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-green-600">${job.subcontractorRate}</span>
                      <Badge variant="outline" className="text-xs">
                        {job.subcontractorRateUnit}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tip</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-green-600">${job.tipRate}</span>
                      <Badge variant="outline" className="text-xs">
                        {job.tipRateUnit}
                      </Badge>
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t">
                    <h5 className="text-sm font-semibold text-amber-700 mb-2">Tolls</h5>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">One Way</span>
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-bold text-green-600">${job.tollOneWay.toFixed(2)}</span>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                                <Info className="h-3 w-3 text-muted-foreground" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-96">
                              <div className="space-y-2">
                                <h4 className="font-semibold text-sm">Toll Estimate Information</h4>
                                <div className="space-y-1 text-xs">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Source:</span>
                                    <a
                                      href="https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary hover:underline"
                                    >
                                      TfNSW Open Data Hub
                                    </a>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Maintainer:</span>
                                    <a
                                      href="https://opendata.transport.nsw.gov.au"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary hover:underline"
                                    >
                                      TfNSW Open Data Hub and Developer Portal
                                    </a>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Last Updated:</span>
                                    <span>August 21, 2023, 7:06 PM (UTC+10:00)</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Created:</span>
                                    <span>October 5, 2017, 1:00 PM (UTC+11:00)</span>
                                  </div>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Return</span>
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-bold text-green-600">${job.tollReturn.toFixed(2)}</span>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                                <Info className="h-3 w-3 text-muted-foreground" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-96">
                              <div className="space-y-2">
                                <h4 className="font-semibold text-sm">Toll Estimate Information</h4>
                                <div className="space-y-1 text-xs">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Source:</span>
                                    <a
                                      href="https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary hover:underline"
                                    >
                                      TfNSW Open Data Hub
                                    </a>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Maintainer:</span>
                                    <a
                                      href="https://opendata.transport.nsw.gov.au"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary hover:underline"
                                    >
                                      TfNSW Open Data Hub and Developer Portal
                                    </a>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Last Updated:</span>
                                    <span>August 21, 2023, 7:06 PM (UTC+10:00)</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Created:</span>
                                    <span>October 5, 2017, 1:00 PM (UTC+11:00)</span>
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

              {/* Right Column - Trucks */}
              <div>
                <h4 className="text-sm font-semibold text-teal-700 mb-3">Trucks</h4>
                <div className="grid grid-cols-2 gap-2">
                  {job.trucks.map((truck) => (
                    <div key={truck.registration} className="flex items-center gap-2 text-sm">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          truck.status === "active"
                            ? "bg-green-500"
                            : truck.status === "pending"
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }`}
                      />
                      <div>
                        <div className="font-medium text-foreground">{truck.registration}</div>
                        <div className="text-xs text-muted-foreground">{truck.type}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-400">Job Status:</span>
                  <Badge
                    variant="secondary"
                    className={
                      job.status === "New"
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : job.status === "In Progress"
                          ? "bg-amber-500 text-white hover:bg-amber-600"
                          : "bg-green-500 text-white hover:bg-green-600"
                    }
                  >
                    {job.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400">Entry Date / Time:</span>
                  <span className="text-sm font-medium">
                    {job.entryDate} {job.entryTime}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400">Delivery Date / Time:</span>
                  <span className="text-sm font-medium">
                    {job.deliveryDate} {job.deliveryTime}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-400">Despatch Notice:</span>
                <Button variant="secondary" size="sm">
                  View
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
