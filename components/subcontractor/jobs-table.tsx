"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreVertical, Info } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Pre-start checklist tracking per driver per vehicle per day
const preStartCompletedToday: Record<string, { completedAt: string; jobId: string }> = {
  "Michael Brown_SUB-003": { completedAt: "06:30 AM", jobId: "JOB-2024-003" },
}

const mockJobs = [
  {
    id: "JOB-2024-001",
    jobNumber: "JOB-2024-001",
    clientName: "Sydney Metro Construction",
    clientPO: "PO-2024-MC-1578",
    pickupAddress: "123 George St, Sydney NSW 2000",
    tipClient: "Coastal Transport Co",
    tipAddress: "78 Beach Road, Wollongong NSW 2500",
    status: "New",
    preStartStatus: "not_required", // New job, not accepted yet
    entryDateTime: "14/01/2024 08:00",
    deliveryDateTime: "15/01/2024 08:00",
    entryDate: "2024-01-14",
    entryTime: "08:00",
    deliveryDate: "2024-01-15",
    deliveryTime: "08:00",
    material: "Concrete Mix - 20m³",
    rates: [
      { type: "Client", price: "140", unit: "Per Tonne" },
      { type: "Subcontractor", price: "140", unit: "Hourly" },
      { type: "Tip", price: "870", unit: "Per Load" },
    ],
    tollOneWay: 12.5,
    tollReturn: 25.0,
    trucks: [
      { registration: "GHI-789", type: "Internal", status: "accepted" },
      { registration: "SUB-001", type: "Subcontractor", status: "pending" },
      { registration: "DEF-456", type: "Internal", status: "pending" },
      { registration: "SUB-002", type: "Subcontractor", status: "pending" },
      { registration: "MNO-234", type: "Internal", status: "accepted" },
    ],
    assignedDrivers: [
      {
        name: "Emma Wilson",
        phone: "+61 445 678 901",
        license: "HC License (Exp: 2027-08-25)",
        vehicle: "GHI-789",
        vehicleModel: "Mercedes Actros",
        inductions: "NJA Induction: Valid",
        compliance: { whiteCard: true, voc: "91%" },
      },
    ],
    priority: "Normal",
    notes: "Special instructions for this job.",
  },
  {
    id: "JOB-2024-003",
    jobNumber: "JOB-2024-003",
    clientName: "XYZ Logistics",
    clientPO: "PO-2024-XYZ-4321",
    pickupAddress: "789 Warehouse Rd, Sydney NSW 2000",
    tipClient: "Sand Transport Co",
    tipAddress: "321 Delivery Ln, Parramatta NSW 2150",
    status: "In Progress",
    preStartStatus: "completed", // Pre-start done, job in progress
    entryDateTime: "12/01/2024 10:00",
    deliveryDateTime: "13/01/2024 10:00",
    entryDate: "2024-01-12",
    entryTime: "10:00",
    deliveryDate: "2024-01-13",
    deliveryTime: "10:00",
    material: "Sand - 15m³",
    rates: [
      { type: "Client", price: "165", unit: "Per Tonne" },
      { type: "Subcontractor", price: "155", unit: "Hourly" },
      { type: "Tip", price: "920", unit: "Per Load" },
    ],
    tollOneWay: 12.5,
    tollReturn: 25.0,
    trucks: [
      { registration: "GHI-002", type: "Internal", status: "accepted" },
      { registration: "SUB-003", type: "Subcontractor", status: "accepted" },
    ],
    assignedDrivers: [
      {
        name: "Michael Brown",
        phone: "+61 445 678 902",
        license: "HC License (Exp: 2026-05-15)",
        vehicle: "SUB-003",
        vehicleModel: "Volvo FM",
        inductions: "NJA Induction: Valid",
        compliance: { whiteCard: true, voc: "95%" },
      },
    ],
    priority: "High",
    notes: "",
  },
  {
    id: "JOB-2024-004",
    jobNumber: "JOB-2024-004",
    clientName: "Infrastructure Co",
    clientPO: "PO-2024-IC-5432",
    pickupAddress: "321 Highway Rd, Perth WA",
    tipClient: "Rock Transport Co",
    tipAddress: "21 Quarry St, Mandurah WA 6210",
    status: "Completed",
    preStartStatus: "completed",
    entryDateTime: "12/01/2024 09:00",
    deliveryDateTime: "13/01/2024 09:00",
    entryDate: "2024-01-12",
    entryTime: "09:00",
    deliveryDate: "2024-01-13",
    deliveryTime: "09:00",
    material: "Rock - 18m³",
    rates: [
      { type: "Client", price: "135", unit: "Per Tonne" },
      { type: "Subcontractor", price: "145", unit: "Hourly" },
      { type: "Tip", price: "880", unit: "Per Load" },
    ],
    tollOneWay: 12.5,
    tollReturn: 25.0,
    trucks: [
      { registration: "MNO-345", type: "Internal", status: "accepted" },
      { registration: "PQR-678", type: "Subcontractor", status: "accepted" },
      { registration: "STU-901", type: "Internal", status: "accepted" },
      { registration: "YZA-567", type: "Internal", status: "accepted" },
      { registration: "JKL-890", type: "Internal", status: "pending" },
      { registration: "VWX-234", type: "Subcontractor", status: "pending" },
    ],
    assignedDrivers: [
      {
        name: "Sarah Johnson",
        phone: "+61 445 678 903",
        license: "HC License (Exp: 2028-03-10)",
        vehicle: "PQR-678",
        vehicleModel: "Scania R450",
        inductions: "NJA Induction: Valid",
        compliance: { whiteCard: true, voc: "88%" },
      },
    ],
    priority: "Low",
    notes: "Please ensure timely delivery.",
  },
  {
    id: "JOB-2024-010",
    jobNumber: "JOB-2024-010",
    clientName: "Westfield Development",
    clientPO: "PO-2024-WD-7654",
    pickupAddress: "88 Cement Works, Auburn NSW 2144",
    tipClient: "Westfield Construction",
    tipAddress: "Westfield Site, Parramatta NSW 2150",
    status: "In Progress",
    preStartStatus: "ready", // Pre-start already completed today on same vehicle
    preStartCompletedInfo: { completedAt: "06:30 AM", jobId: "JOB-2024-003", vehicle: "SUB-003" },
    entryDateTime: "15/01/2024 09:00",
    deliveryDateTime: "15/01/2024 16:00",
    entryDate: "2024-01-15",
    entryTime: "09:00",
    deliveryDate: "2024-01-15",
    deliveryTime: "16:00",
    material: "Ready Mix Concrete - 30m³",
    rates: [
      { type: "Client", price: "170", unit: "Per Tonne" },
      { type: "Subcontractor", price: "165", unit: "Hourly" },
      { type: "Tip", price: "890", unit: "Per Load" },
    ],
    tollOneWay: 8.5,
    tollReturn: 17.0,
    trucks: [
      { registration: "SUB-003", type: "Subcontractor", status: "accepted" },
    ],
    assignedDrivers: [
      {
        name: "Michael Brown",
        phone: "+61 445 678 902",
        license: "HC License (Exp: 2026-05-15)",
        vehicle: "SUB-003",
        vehicleModel: "Volvo FM",
        inductions: "NJA Induction: Valid",
        compliance: { whiteCard: true, voc: "95%" },
      },
    ],
    priority: "Normal",
    notes: "Second job for Michael Brown today - Pre-start already completed.",
  },
]

const truckStatusColors: Record<string, string> = {
  accepted: "bg-green-500",
  pending: "bg-amber-500",
  rejected: "bg-red-500",
}

export function JobsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedJob, setSelectedJob] = useState<(typeof mockJobs)[0] | null>(null)
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false)
  const [isDespatchNoticeOpen, setIsDespatchNoticeOpen] = useState(false)

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.jobNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.pickupAddress.toLowerCase().includes(searchTerm.toLowerCase())

    let matchesStatus = statusFilter === "all" || job.status === statusFilter
    // Handle pre-start specific filters
    if (statusFilter === "pre-start-required") {
      matchesStatus = job.preStartStatus === "required"
    } else if (statusFilter === "ready-to-start") {
      matchesStatus = job.preStartStatus === "ready"
    }

    const matchesPriority = priorityFilter === "all" || job.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleViewDetails = (job: (typeof mockJobs)[0]) => {
    setSelectedJob(job)
    setIsViewDetailsOpen(true)
  }

  const handleViewDespatch = (job: (typeof mockJobs)[0]) => {
    setSelectedJob(job)
    setIsDespatchNoticeOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">Jobs Management</div>
        <div className="flex items-center gap-3">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs, clients, drivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="pre-start-required">Pre-Start Required</SelectItem>
              <SelectItem value="ready-to-start">Ready to Start</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Normal">Normal</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All Drivers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Drivers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredJobs.map((job) => {
          const truckColumns = [
            job.trucks.slice(0, Math.ceil(job.trucks.length / 2)),
            job.trucks.slice(Math.ceil(job.trucks.length / 2)),
          ]

          return (
            <Card key={job.id} className="border border-border p-0 overflow-hidden">
              <div className="grid grid-cols-[280px_300px_1fr_50px]">
                {/* Client Information Column */}
                <div className="px-4 pt-4 pb-4 border-r border-border bg-blue-50 dark:bg-blue-950/20">
                  <div className="space-y-2">
                    <div className="text-primary font-semibold text-base">{job.jobNumber}</div>
                    <div className="space-y-1">
                      <div className="flex gap-2">
                        <span className="text-xs text-muted-foreground font-medium min-w-[100px]">Client:</span>
                        <span className="text-sm font-medium text-primary">{job.clientName}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-xs text-muted-foreground font-medium min-w-[100px]">Client PO #:</span>
                        <span className="text-sm">{job.clientPO}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-xs text-muted-foreground font-medium min-w-[100px]">Pickup Address:</span>
                        <span className="text-sm">{job.pickupAddress}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-xs text-muted-foreground font-medium min-w-[100px]">Tip Client:</span>
                        <span className="text-sm">{job.tipClient}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-xs text-muted-foreground font-medium min-w-[100px]">Tip Address:</span>
                        <span className="text-sm">{job.tipAddress}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rates Column */}
                <div className="px-4 pt-4 pb-4 border-r border-border bg-amber-50/50 dark:bg-amber-950/10">
                  <div className="font-semibold text-sm mb-2 text-amber-900 dark:text-amber-100">Rates</div>
                  <div className="space-y-1">
                    {job.rates.map((rate, idx) => (
                      <div key={idx} className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground min-w-[100px]">{rate.type}</span>
                        <span className="font-semibold min-w-[60px] text-green-700 dark:text-green-400">
                          ${rate.price}
                        </span>
                        <span className="min-w-[80px] text-xs">{rate.unit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-amber-200 dark:border-amber-800">
                    <div className="font-semibold text-sm mb-2 text-amber-900 dark:text-amber-100">Tolls</div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">One Way</span>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-green-700 dark:text-green-400">
                            ${job.tollOneWay.toFixed(2)}
                          </span>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                                <Info className="h-3 w-3 text-muted-foreground" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-96" align="end">
                              <div className="space-y-3">
                                <h4 className="font-semibold text-sm">Additional Info</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="grid grid-cols-[100px_1fr] gap-2">
                                    <span className="font-medium">Source</span>
                                    <a
                                      href="https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline"
                                    >
                                      TfNSW Toll Calculator API
                                    </a>
                                  </div>
                                  <div className="grid grid-cols-[100px_1fr] gap-2">
                                    <span className="font-medium">Maintainer</span>
                                    <a
                                      href="https://opendata.transport.nsw.gov.au"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline"
                                    >
                                      TfNSW Open Data Hub and Developer Portal
                                    </a>
                                  </div>
                                  <div className="grid grid-cols-[100px_1fr] gap-2">
                                    <span className="font-medium">Last Updated</span>
                                    <span>August 21, 2023, 7:06 PM (UTC+10:00)</span>
                                  </div>
                                  <div className="grid grid-cols-[100px_1fr] gap-2">
                                    <span className="font-medium">Created</span>
                                    <span>October 5, 2017, 1:00 PM (UTC+11:00)</span>
                                  </div>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Return</span>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-green-700 dark:text-green-400">
                            ${job.tollReturn.toFixed(2)}
                          </span>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                                <Info className="h-3 w-3 text-muted-foreground" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-96" align="end">
                              <div className="space-y-3">
                                <h4 className="font-semibold text-sm">Additional Info</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="grid grid-cols-[100px_1fr] gap-2">
                                    <span className="font-medium">Source</span>
                                    <a
                                      href="https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline"
                                    >
                                      TfNSW Toll Calculator API
                                    </a>
                                  </div>
                                  <div className="grid grid-cols-[100px_1fr] gap-2">
                                    <span className="font-medium">Maintainer</span>
                                    <a
                                      href="https://opendata.transport.nsw.gov.au"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline"
                                    >
                                      TfNSW Open Data Hub and Developer Portal
                                    </a>
                                  </div>
                                  <div className="grid grid-cols-[100px_1fr] gap-2">
                                    <span className="font-medium">Last Updated</span>
                                    <span>August 21, 2023, 7:06 PM (UTC+10:00)</span>
                                  </div>
                                  <div className="grid grid-cols-[100px_1fr] gap-2">
                                    <span className="font-medium">Created</span>
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

                {/* Trucks Column */}
                <div className="px-4 pt-4 pb-4 border-r border-border bg-background">
                  <div className="font-semibold text-sm mb-2">Trucks</div>
                  <div className="flex gap-8">
                    {truckColumns.map((column, colIdx) => (
                      <div key={colIdx} className="space-y-1.5 min-w-[180px]">
                        {column.map((truck, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full ${truckStatusColors[truck.status]}`} />
                            <div>
                              <div className="text-sm font-medium font-mono">{truck.registration}</div>
                              <div className="text-xs text-muted-foreground">{truck.type}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions Column */}
                <div className="px-4 pt-4 pb-4 flex items-start justify-center bg-background">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(job)}>View Details</DropdownMenuItem>
                      <DropdownMenuItem>View Documents</DropdownMenuItem>
                      <DropdownMenuItem>Track Job on Live View</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Submit Invoice</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Footer with Job Status and Dates */}
              <div className="flex items-center justify-between bg-slate-900 px-6 py-4 text-white gap-4 -mt-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm">Job Status:</span>
                  {/* Main status badge */}
                  <div
                    className={`px-4 py-1 rounded font-semibold text-sm ${
                      job.status === "New"
                        ? "bg-blue-600"
                        : job.status === "In Progress"
                          ? "bg-blue-500"
                          : "bg-green-600"
                    }`}
                  >
                    {job.status}
                  </div>
                  {/* Pre-start status badge - only show for In Progress jobs */}
                  {job.status === "In Progress" && job.preStartStatus === "required" && (
                    <div className="px-3 py-1 rounded text-xs font-medium bg-amber-500 text-white">
                      Complete Pre-Start Checklist to begin
                    </div>
                  )}
                  {job.status === "In Progress" && job.preStartStatus === "ready" && (
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 rounded text-xs font-medium bg-teal-500 text-white">
                        Ready to Start
                      </div>
                      {job.preStartCompletedInfo && (
                        <span className="text-xs text-slate-300">
                          Pre-start done at {job.preStartCompletedInfo.completedAt} ({job.preStartCompletedInfo.jobId})
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Entry Date / Time:</span>
                    <span className="font-medium">{job.entryDateTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Delivery Date / Time:</span>
                    <span className="font-medium">{job.deliveryDateTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 ml-auto">
                  <span className="text-sm text-white">Despatch Notice:</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 bg-white text-slate-900 hover:bg-teal-500 hover:text-white"
                    onClick={() => handleViewDespatch(job)}
                  >
                    View
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* View Details Dialog */}
      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="!max-w-[95vw] w-full sm:!max-w-[95vw] md:!max-w-[1400px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedJob?.jobNumber} - Job Details</DialogTitle>
            <DialogDescription>Complete information for this job</DialogDescription>
          </DialogHeader>

          {selectedJob && (
            <div className="grid grid-cols-2 gap-6 mt-4">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Client Information */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Client Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                      <span className="font-medium min-w-[120px]">Client</span>
                      <span className="font-semibold">{selectedJob.clientName}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium min-w-[120px]">Client PO #</span>
                      <span>{selectedJob.clientPO}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium min-w-[120px]">Pickup Address</span>
                      <span>{selectedJob.pickupAddress}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium min-w-[120px]">Tip Client</span>
                      <span>{selectedJob.tipClient}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-medium min-w-[120px]">Tip Address</span>
                      <span>{selectedJob.tipAddress}</span>
                    </div>
                  </div>
                </div>

                {/* Toll Estimate */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Toll Estimate</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">One Way</span>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-green-700 dark:text-green-400">
                          ${selectedJob.tollOneWay.toFixed(2)}
                        </span>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                              <Info className="h-3 w-3 text-muted-foreground" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-96" align="end">
                            <div className="space-y-3">
                              <h4 className="font-semibold text-sm">Additional Info</h4>
                              <div className="space-y-2 text-sm">
                                <div className="grid grid-cols-[100px_1fr] gap-2">
                                  <span className="font-medium">Source</span>
                                  <a
                                    href="https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                  >
                                    TfNSW Toll Calculator API
                                  </a>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] gap-2">
                                  <span className="font-medium">Maintainer</span>
                                  <a
                                    href="https://opendata.transport.nsw.gov.au"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                  >
                                    TfNSW Open Data Hub and Developer Portal
                                  </a>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] gap-2">
                                  <span className="font-medium">Last Updated</span>
                                  <span>August 21, 2023, 7:06 PM (UTC+10:00)</span>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] gap-2">
                                  <span className="font-medium">Created</span>
                                  <span>October 5, 2017, 1:00 PM (UTC+11:00)</span>
                                </div>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Return</span>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-green-700 dark:text-green-400">
                          ${selectedJob.tollReturn.toFixed(2)}
                        </span>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                              <Info className="h-3 w-3 text-muted-foreground" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-96" align="end">
                            <div className="space-y-3">
                              <h4 className="font-semibold text-sm">Additional Info</h4>
                              <div className="space-y-2 text-sm">
                                <div className="grid grid-cols-[100px_1fr] gap-2">
                                  <span className="font-medium">Source</span>
                                  <a
                                    href="https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                  >
                                    TfNSW Toll Calculator API
                                  </a>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] gap-2">
                                  <span className="font-medium">Maintainer</span>
                                  <a
                                    href="https://opendata.transport.nsw.gov.au"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                  >
                                    TfNSW Open Data Hub and Developer Portal
                                  </a>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] gap-2">
                                  <span className="font-medium">Last Updated</span>
                                  <span>August 21, 2023, 7:06 PM (UTC+10:00)</span>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] gap-2">
                                  <span className="font-medium">Created</span>
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

                {/* Schedule */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Schedule</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium block mb-1">Entry Date</span>
                      <span>{selectedJob.entryDate}</span>
                    </div>
                    <div>
                      <span className="font-medium block mb-1">Entry Time</span>
                      <span>{selectedJob.entryTime}</span>
                    </div>
                    <div>
                      <span className="font-medium block mb-1">Delivery Date</span>
                      <span>{selectedJob.deliveryDate}</span>
                    </div>
                    <div>
                      <span className="font-medium block mb-1">Delivery Time</span>
                      <span>{selectedJob.deliveryTime}</span>
                    </div>
                  </div>
                </div>

                {/* Material */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Material</h3>
                  <div className="text-sm">
                    <span className="font-medium">Material</span>
                    <p className="mt-1">{selectedJob.material}</p>
                  </div>
                </div>

                {/* Rates */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Rates</h3>
                  <div className="space-y-2 text-sm">
                    {selectedJob.rates.map((rate, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="font-medium">{rate.type}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-green-700 dark:text-green-400">${rate.price}</span>
                          <span className="text-muted-foreground">{rate.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Assigned Vehicles */}
              <div>
                <div className="mb-6 p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                  <div className="text-sm font-medium mb-3">Driver Responses</div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-sm">
                        <span className="font-semibold">6</span> Accepted
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-amber-500" />
                      <span className="text-sm">
                        <span className="font-semibold">2</span> Pending
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                      <span className="text-sm">
                        <span className="font-semibold">2</span> Rejected
                      </span>
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-3">Assigned Vehicles ({selectedJob.assignedDrivers.length})</h3>
                <div className="space-y-4">
                  {selectedJob.assignedDrivers.map((driver, idx) => (
                    <Card key={idx} className="p-4 bg-slate-50 dark:bg-slate-900">
                      <div className="space-y-3">
                        <div className="font-semibold text-lg">{driver.vehicle}</div>
                        <div className="text-sm text-muted-foreground">{driver.vehicleModel}</div>

                        <div className="pt-3 border-t">
                          <div className="font-medium mb-2">Driver Details</div>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">👤</span>
                              <span>{driver.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">📞</span>
                              <span>{driver.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">📄</span>
                              <span>{driver.license}</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t">
                          <div className="font-medium mb-2">License & Compliance</div>
                          <div className="flex flex-wrap gap-2">
                            <div className="px-3 py-1 bg-teal-600 text-white rounded text-xs font-semibold">
                              {driver.inductions}
                            </div>
                            {driver.compliance.whiteCard && (
                              <div className="px-3 py-1 bg-white text-slate-900 border border-slate-300 rounded text-xs font-semibold">
                                White Card: Valid
                              </div>
                            )}
                            <div className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded text-xs font-semibold">
                              VOC: {driver.compliance.voc}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">Additional Information</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Priority</div>
                      <p className="font-medium">{selectedJob.priority}</p>
                    </div>
                    {selectedJob.notes && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Notes</div>
                        <p className="text-sm">{selectedJob.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Despatch Notice Dialog */}
      <Dialog open={isDespatchNoticeOpen} onOpenChange={setIsDespatchNoticeOpen}>
        <DialogContent className="!max-w-[95vw] md:!max-w-[1000px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Despatch Notice - {selectedJob?.jobNumber}</DialogTitle>
            <DialogDescription>Job despatch information and assigned drivers</DialogDescription>
          </DialogHeader>

          {selectedJob && (
            <div className="space-y-6 mt-4">
              {/* Job Information */}
              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="font-semibold text-lg mb-3 text-green-900 dark:text-green-100">Job Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium block mb-1">Job Number</span>
                    <span>{selectedJob.jobNumber}</span>
                  </div>
                  <div>
                    <span className="font-medium block mb-1">Client</span>
                    <span>{selectedJob.clientName}</span>
                  </div>
                  <div>
                    <span className="font-medium block mb-1">Pickup Address</span>
                    <span>{selectedJob.pickupAddress}</span>
                  </div>
                  <div>
                    <span className="font-medium block mb-1">Tip Address</span>
                    <span>{selectedJob.tipAddress}</span>
                  </div>
                  <div>
                    <span className="font-medium block mb-1">Entry Date / Time</span>
                    <span>{selectedJob.entryDateTime}</span>
                  </div>
                  <div>
                    <span className="font-medium block mb-1">Delivery Date / Time</span>
                    <span>{selectedJob.deliveryDateTime}</span>
                  </div>
                  <div>
                    <span className="font-medium block mb-1">Material</span>
                    <span>{selectedJob.material}</span>
                  </div>
                  <div>
                    <span className="font-medium block mb-1">Subcontractor Rate</span>
                    <span className="font-semibold text-green-700 dark:text-green-400">
                      ${selectedJob.rates.find((r) => r.type === "Subcontractor")?.price}{" "}
                      {selectedJob.rates.find((r) => r.type === "Subcontractor")?.unit}
                    </span>
                  </div>

                  {/* Toll Information */}
                  <div className="col-span-2 pt-3 border-t border-green-200 dark:border-green-800">
                    <span className="font-medium block mb-2">Toll Estimate</span>
                    <div className="flex gap-6">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">One Way:</span>
                        <span className="font-semibold text-green-700 dark:text-green-400">
                          ${selectedJob.tollOneWay.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Return:</span>
                        <span className="font-semibold text-green-700 dark:text-green-400">
                          ${selectedJob.tollReturn.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loading Instructions */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Loading Instructions</h3>
                <p className="text-sm text-muted-foreground">
                  Please arrive 15 minutes before scheduled time. Check in at the site office for loading bay
                  assignment.
                </p>
              </div>

              {/* PPE Requirements */}
              <div>
                <h3 className="font-semibold text-lg mb-3">PPE Requirements</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100 rounded text-sm font-medium">
                    Hard Hat
                  </div>
                  <div className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100 rounded text-sm font-medium">
                    Safety Boots
                  </div>
                  <div className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100 rounded text-sm font-medium">
                    Hi-Vis Vest
                  </div>
                  <div className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100 rounded text-sm font-medium">
                    Safety Glasses
                  </div>
                </div>
              </div>

              {/* Assigned Drivers */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Assigned Drivers</h3>
                <div className="space-y-3">
                  {selectedJob.assignedDrivers.map((driver, idx) => (
                    <Card key={idx} className="p-4 bg-slate-50 dark:bg-slate-900">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-lg">{driver.vehicle}</div>
                          <div className="text-sm text-muted-foreground">{driver.vehicleModel}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium block mb-1">Driver</span>
                            <span>{driver.name}</span>
                          </div>
                          <div>
                            <span className="font-medium block mb-1">Phone</span>
                            <span>{driver.phone}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="font-medium block mb-1">License</span>
                            <span>{driver.license}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          <div className="px-3 py-1 bg-teal-600 text-white rounded text-xs font-semibold">
                            {driver.inductions}
                          </div>
                          {driver.compliance.whiteCard && (
                            <div className="px-3 py-1 bg-white text-slate-900 border border-slate-300 rounded text-xs font-semibold">
                              White Card: Valid
                            </div>
                          )}
                          <div className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded text-xs font-semibold">
                            VOC: {driver.compliance.voc}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
