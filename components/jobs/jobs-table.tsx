"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreVertical, Info, User, Phone, FileText, Map, Download, Eye, ImageIcon, CheckCircle, Clock, File } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { CardContent } from "@/components/ui/card"

const jobs = [
  {
    id: "JOB-2024-005",
    client: "Westfield Development Group",
    clientPO: "PO-2024-WD-1245",
    pickupAddress: "45 Industrial Blvd, Wetherill Park NSW 2164",
    tipClient: "Metro Recycling Solutions",
    tipAddress: "88 Commerce St, Blacktown NSW 2148",
    rates: [
      { type: "Client", price: 145, unit: "Per Tonne" },
      { type: "Client", price: 95, unit: "Hourly" },
      { type: "Client", price: 380, unit: "Per Load" },
    ],
    tollOneWay: 15.0,
    tollReturn: 30.0,
    trucks: [
      {
        registration: "XYZ-789",
        status: "active",
        make: "Volvo",
        model: "FH16",
        type: "Internal",
        driver: {
          name: "Michael Chen",
          phone: "+61 412 345 678",
          licenseClass: "HC",
          licenseExpiry: "2026-11-15",
          njaInduction: "Valid",
          whiteCard: "Valid",
          vocScore: 94,
        },
      },
      {
        registration: "ABC-456",
        status: "active",
        make: "Kenworth",
        model: "T610",
        type: "Internal",
        driver: {
          name: "Lisa Park",
          phone: "+61 423 456 789",
          licenseClass: "HC",
          licenseExpiry: "2027-03-20",
          njaInduction: "Valid",
          whiteCard: "Valid",
          vocScore: 88,
        },
      },
    ],
    status: "In Progress",
    entryDate: "15/01/2024",
    entryTime: "07:30",
    deliveryDate: "15/01/2024",
    deliveryTime: "09:00",
    priority: "high",
    driver: "michael",
    material: "Crusite - 35m³",
    clientContact: "Amanda Rodriguez",
    clientPhone: "+61 2 9123 4567",
    clientEmail: "amanda.r@westfield.com.au",
    notes: "Multiple delivery points within site. Check in at main gate first.",
    documents: [
      {
        id: "DOC-010",
        name: "Purchase Order",
        fileName: "PO-2024-WD-1245.pdf",
        type: "pdf",
        size: "198 KB",
        uploadedBy: "System",
        uploadedAt: "2024-01-14 16:00",
        status: "verified",
      },
      {
        id: "DOC-011",
        name: "Delivery Docket",
        fileName: "DD-JOB-2024-005.pdf",
        type: "pdf",
        size: "145 KB",
        uploadedBy: "Michael Chen",
        uploadedAt: "2024-01-15 07:45",
        status: "verified",
      },
    ],
  },
  {
    id: "JOB-2024-003",
    client: "ABC Construction Ltd",
    clientPO: "PO-2024-XL-8932",
    pickupAddress: "789 Warehouse Rd, Sydney NSW 2000",
    tipClient: "Sand Transport Co",
    tipAddress: "321 Delivery Ln, Parramatta NSW 2150",
    rates: [{ type: "Client", price: 165, unit: "Per Tonne" }],
    tollOneWay: 12.5,
    tollReturn: 25.0,
    trucks: [
      {
        registration: "GHI-002",
        status: "active",
        make: "Mercedes",
        model: "Actros",
        type: "Internal",
        driver: {
          name: "Emma Wilson",
          phone: "+61 445 678 901",
          licenseClass: "HC",
          licenseExpiry: "2027-08-25",
          njaInduction: "Valid",
          whiteCard: "Valid",
          vocScore: 91,
        },
      },
    ],
    status: "In Progress",
    entryDate: "13/01/2024",
    entryTime: "09:00",
    deliveryDate: "13/01/2024",
    deliveryTime: "10:00",
    priority: "high",
    driver: "sarah",
    material: "Concrete Mix - 20m³",
    clientContact: "John Smith",
    clientPhone: "+61 2 8765 4321",
    clientEmail: "john.smith@abcconstruction.com.au",
    notes: "Please call client contact 30 minutes before arrival. Site access code: #4567",
    documents: [
      {
        id: "DOC-001",
        name: "Purchase Order",
        fileName: "PO-2024-XL-8932.pdf",
        type: "pdf",
        size: "245 KB",
        uploadedBy: "System",
        uploadedAt: "2024-01-12 09:30",
        status: "verified",
      },
      {
        id: "DOC-002",
        name: "Delivery Docket",
        fileName: "DD-JOB-2024-003.pdf",
        type: "pdf",
        size: "156 KB",
        uploadedBy: "Emma Wilson",
        uploadedAt: "2024-01-13 08:45",
        status: "verified",
      },
      {
        id: "DOC-003",
        name: "Pre-Start Checklist",
        fileName: "PSC-2024-001.pdf",
        type: "pdf",
        size: "89 KB",
        uploadedBy: "Emma Wilson",
        uploadedAt: "2024-01-13 06:30",
        status: "verified",
      },
      {
        id: "DOC-004",
        name: "Site Photo - Pickup",
        fileName: "pickup-photo-001.jpg",
        type: "image",
        size: "1.2 MB",
        uploadedBy: "Emma Wilson",
        uploadedAt: "2024-01-13 09:15",
        status: "verified",
      },
      {
        id: "DOC-005",
        name: "Site Photo - Delivery",
        fileName: "delivery-photo-001.jpg",
        type: "image",
        size: "1.4 MB",
        uploadedBy: "Emma Wilson",
        uploadedAt: "2024-01-13 10:05",
        status: "pending",
      },
      {
        id: "DOC-006",
        name: "Proof of Delivery (POD)",
        fileName: "POD-JOB-2024-003.pdf",
        type: "pdf",
        size: "312 KB",
        uploadedBy: "Emma Wilson",
        uploadedAt: "2024-01-13 10:10",
        status: "verified",
      },
      {
        id: "DOC-007",
        name: "Weight Docket",
        fileName: "WD-JOB-2024-003.pdf",
        type: "pdf",
        size: "78 KB",
        uploadedBy: "Site System",
        uploadedAt: "2024-01-13 09:20",
        status: "verified",
      },
    ],
  },
]

export function JobsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [driverFilter, setDriverFilter] = useState("all")
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false)
  const [viewDetailsJob, setViewDetailsJob] = useState<(typeof jobs)[0] | null>(null)
  const [isDespatchNoticeOpen, setIsDespatchNoticeOpen] = useState(false)
  const [despatchNoticeJob, setDespatchNoticeJob] = useState<(typeof jobs)[0] | null>(null)
  const [isViewDocumentsOpen, setIsViewDocumentsOpen] = useState(false)
  const [viewDocumentsJob, setViewDocumentsJob] = useState<(typeof jobs)[0] | null>(null)

  const router = useRouter()

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = searchQuery
      ? job.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.driver.toLowerCase().includes(searchQuery.toLowerCase())
      : true

    const matchesStatus = statusFilter === "all" || job.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesPriority = priorityFilter === "all" || job.priority.toLowerCase() === priorityFilter.toLowerCase()
    const matchesDriver = driverFilter === "all" || job.driver.toLowerCase() === driverFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesPriority && matchesDriver
  })

  const handleViewDetails = (job: (typeof jobs)[0]) => {
    setViewDetailsJob(job)
    setIsViewDetailsOpen(true)
  }

  const handleViewDespatchNotice = (job: (typeof jobs)[0]) => {
    setDespatchNoticeJob(job)
    setIsDespatchNoticeOpen(true)
  }

  const handleViewDocuments = (job: (typeof jobs)[0]) => {
    setViewDocumentsJob(job)
    setIsViewDocumentsOpen(true)
  }

  const handleViewOnLiveMap = (jobNumber: string) => {
    router.push(`/dashboard/live-view?job=${jobNumber}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-foreground">Jobs Management</h2>
        <div className="flex items-center gap-3">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search jobs, clients, drivers..."
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
          <Select value={driverFilter} onValueChange={setDriverFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Drivers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Drivers</SelectItem>
              <SelectItem value="sarah">Sarah Johnson</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="overflow-hidden p-0">
            <div className="grid grid-cols-[280px_300px_1fr_50px]">
              {/* Left Column - Job Details with light blue background */}
              <div className="space-y-3 px-6 pt-6 pb-6 bg-blue-50 border-r border-border">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-teal-600">{job.id}</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground text-xs">Client:</span>
                    <div className="font-medium text-foreground">{job.client}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Client PO #:</span>
                    <div className="font-medium text-foreground">{job.clientPO}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Pickup Address:</span>
                    <div className="font-medium text-foreground">{job.pickupAddress}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Tip Client:</span>
                    <div className="font-medium text-foreground">{job.tipClient}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Tip Address:</span>
                    <div className="font-medium text-foreground">{job.tipAddress}</div>
                  </div>
                </div>
              </div>

              {/* Middle Column - Rate with vertical border */}
              <div className="px-6 pt-6 pb-6 bg-amber-50 border-r border-border">
                <h4 className="text-sm font-semibold text-amber-700 mb-3">Rates</h4>
                <div className="space-y-2">
                  {job.rates.map((rate, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{rate.type}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-green-600">${rate.price}</span>
                        <Badge variant="outline" className="text-xs">
                          {rate.unit}
                        </Badge>
                      </div>
                    </div>
                  ))}

                  {/* Tolls section with info icons showing TfNSW API metadata */}
                  <div className="border-t border-amber-200 pt-2 mt-3">
                    <h5 className="text-sm font-semibold text-amber-700 mb-2">Tolls</h5>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">One Way</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold text-green-600">${job.tollOneWay.toFixed(2)}</span>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                                <Info className="h-3 w-3 text-muted-foreground" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-96" align="end">
                              <div className="space-y-3">
                                <h4 className="font-semibold text-sm">Additional Info</h4>
                                <div className="space-y-2 text-xs">
                                  <div className="grid grid-cols-[100px_1fr] gap-2">
                                    <span className="font-medium">Source</span>
                                    <a
                                      href="https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline"
                                    >
                                      https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api
                                    </a>
                                  </div>
                                  <div className="grid grid-cols-[100px_1fr] gap-2">
                                    <span className="font-medium">Maintainer</span>
                                    <a
                                      href="https://opendata.transport.nsw.gov.au/"
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
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Return</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold text-green-600">${job.tollReturn.toFixed(2)}</span>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                                <Info className="h-3 w-3 text-muted-foreground" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-96" align="end">
                              <div className="space-y-3">
                                <h4 className="font-semibold text-sm">Additional Info</h4>
                                <div className="space-y-2 text-xs">
                                  <div className="grid grid-cols-[100px_1fr] gap-2">
                                    <span className="font-medium">Source</span>
                                    <a
                                      href="https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline"
                                    >
                                      https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api
                                    </a>
                                  </div>
                                  <div className="grid grid-cols-[100px_1fr] gap-2">
                                    <span className="font-medium">Maintainer</span>
                                    <a
                                      href="https://opendata.transport.nsw.gov.au/"
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
              </div>

              {/* Right Column - Trucks */}
              <div className="px-6 pt-6 pb-6 bg-gray-50">
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
                      <div className="font-medium text-foreground">{truck.registration}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start justify-center pt-6 bg-white">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => handleViewDetails(job)}>View Details</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleViewDocuments(job)}>View Documents</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleViewOnLiveMap(job.id)}>
                      Track Job on Live View
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Footer */}
            <div className="-mt-6 bg-slate-900 text-white px-6 py-2 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-400">Job Status:</span>
                  <Badge
                    variant="secondary"
                    className={
                      job.status === "New"
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : job.status === "In Progress"
                          ? "bg-purple-500 text-white hover:bg-purple-600"
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
                <Button variant="secondary" size="sm" onClick={() => handleViewDespatchNotice(job)}>
                  Manage
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-transparent text-white border-white/20 hover:bg-white/10"
                  onClick={() => handleViewOnLiveMap(job.id)}
                >
                  <Map className="h-4 w-4" />
                  View on Live Map
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="!max-w-[95vw] w-full sm:!max-w-[95vw] md:!max-w-[1400px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{viewDetailsJob?.id} - Job Details</DialogTitle>
            <DialogDescription>Complete information for this job</DialogDescription>
          </DialogHeader>

          {viewDetailsJob && (
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Client Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Client Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Client</Label>
                      <p className="font-medium">{viewDetailsJob.client}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Client Contact</Label>
                      <p className="font-medium">{viewDetailsJob.clientContact}</p>
                      <p className="text-sm text-muted-foreground">{viewDetailsJob.clientPhone}</p>
                      <p className="text-sm text-muted-foreground">{viewDetailsJob.clientEmail}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Client PO #</Label>
                    <p className="font-medium">{viewDetailsJob.clientPO}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Pickup Address</Label>
                    <p className="font-medium">{viewDetailsJob.pickupAddress}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Tip Client</Label>
                    <p className="font-medium">{viewDetailsJob.tipClient}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Tip Address</Label>
                    <p className="font-medium">{viewDetailsJob.tipAddress}</p>
                  </div>
                </div>

                {/* Toll Estimate */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Toll Estimate</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-muted-foreground">One Way</Label>
                        <p className="font-medium text-lg text-green-600">${viewDetailsJob.tollOneWay.toFixed(2)}</p>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="text-muted-foreground hover:text-foreground transition-colors">
                            <Info className="h-4 w-4" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px]">
                          <div className="space-y-3">
                            <h4 className="font-semibold">Additional Info</h4>
                            <div className="space-y-2">
                              <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                <span className="font-medium">Source</span>
                                <a
                                  href="https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline break-all"
                                >
                                  https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api
                                </a>
                              </div>
                              <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                <span className="font-medium">Maintainer</span>
                                <a
                                  href="https://opendata.transport.nsw.gov.au"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline"
                                >
                                  TfNSW Open Data Hub and Developer Portal
                                </a>
                              </div>
                              <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                <span className="font-medium">Last Updated</span>
                                <span>August 21, 2023, 7:06 PM (UTC+10:00)</span>
                              </div>
                              <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                <span className="font-medium">Created</span>
                                <span>October 5, 2017, 1:00 PM (UTC+11:00)</span>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-muted-foreground">Return</Label>
                        <p className="font-medium text-lg text-green-600">${viewDetailsJob.tollReturn.toFixed(2)}</p>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="text-muted-foreground hover:text-foreground transition-colors">
                            <Info className="h-4 w-4" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px]">
                          <div className="space-y-3">
                            <h4 className="font-semibold">Additional Info</h4>
                            <div className="space-y-2">
                              <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                <span className="font-medium">Source</span>
                                <a
                                  href="https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline break-all"
                                >
                                  https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api
                                </a>
                              </div>
                              <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                <span className="font-medium">Maintainer</span>
                                <a
                                  href="https://opendata.transport.nsw.gov.au"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline"
                                >
                                  TfNSW Open Data Hub and Developer Portal
                                </a>
                              </div>
                              <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                <span className="font-medium">Last Updated</span>
                                <span>August 21, 2023, 7:06 PM (UTC+10:00)</span>
                              </div>
                              <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
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

                {/* Schedule */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Schedule</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Entry Date</Label>
                      <p className="font-medium">{viewDetailsJob.entryDate}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Entry Time</Label>
                      <p className="font-medium">{viewDetailsJob.entryTime}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Delivery Date</Label>
                      <p className="font-medium">{viewDetailsJob.deliveryDate}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Delivery Time</Label>
                      <p className="font-medium">{viewDetailsJob.deliveryTime}</p>
                    </div>
                  </div>
                </div>

                {/* Material */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Material</h3>
                  <div>
                    <Label className="text-muted-foreground">Material</Label>
                    <p className="font-medium">{viewDetailsJob.material}</p>
                  </div>
                </div>

                {/* Rate */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Client Rates</h3>
                  <div className="space-y-3">
                    {viewDetailsJob.rates.map((rate, index) => (
                      <div key={index} className="grid grid-cols-2 gap-4 p-3 bg-muted/50 rounded-lg">
                        <div>
                          <Label className="text-muted-foreground">{rate.unit} Rate</Label>
                          <p className="font-medium text-green-600">${rate.price}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Unit</Label>
                          <p className="font-medium">{rate.unit}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Truck Assignment */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Assigned Vehicles</h3>
                  <div className="border rounded-lg p-4 space-y-4">
                    {viewDetailsJob.trucks.map((truck, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            {/* Vehicle Info */}
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="font-semibold font-mono text-lg">{truck.registration}</div>
                                <div className="text-sm text-muted-foreground">
                                  {truck.make} {truck.model}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="default" className="text-xs">
                                    {truck.type}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            {/* Driver Info */}
                            {truck.driver && (
                              <div className="border-t pt-3 space-y-2">
                                <div className="text-xs font-medium text-muted-foreground">Driver Details</div>
                                <div className="space-y-1.5">
                                  <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">{truck.driver.name}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">{truck.driver.phone}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">
                                      {truck.driver.licenseClass} License (Exp: {truck.driver.licenseExpiry})
                                    </span>
                                  </div>
                                </div>

                                {/* License & Compliance */}
                                <div className="space-y-2 pt-2">
                                  <div className="text-xs font-medium text-muted-foreground">License & Compliance</div>
                                  <div className="flex flex-wrap gap-1.5">
                                    <Badge
                                      variant={truck.driver.njaInduction === "Valid" ? "default" : "destructive"}
                                      className="text-xs"
                                    >
                                      NJA Induction: {truck.driver.njaInduction}
                                    </Badge>
                                    <Badge
                                      variant={truck.driver.whiteCard === "Valid" ? "default" : "destructive"}
                                      className="text-xs"
                                    >
                                      White Card: {truck.driver.whiteCard}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      VOC: {truck.driver.vocScore}%
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Additional Information */}
                {viewDetailsJob.notes && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Additional Information</h3>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <Label className="text-muted-foreground">Notes</Label>
                      <p className="font-medium text-sm mt-2">{viewDetailsJob.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isDespatchNoticeOpen} onOpenChange={setIsDespatchNoticeOpen}>
        <DialogContent className="!max-w-[95vw] md:!max-w-[1000px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Despatch Notice</DialogTitle>
            <DialogDescription>Despatch notice details for {despatchNoticeJob?.id}</DialogDescription>
          </DialogHeader>

          {despatchNoticeJob && (
            <div className="grid gap-6 py-4">
              {/* Job Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Job Information</h3>
                <div className="grid grid-cols-2 gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div>
                    <Label className="text-sm font-medium">Job Number</Label>
                    <p className="text-sm mt-1">{despatchNoticeJob.id}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Client</Label>
                    <p className="text-sm mt-1">{despatchNoticeJob.client}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Delivery Date</Label>
                    <p className="text-sm mt-1">{despatchNoticeJob.deliveryDate}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Delivery Time</Label>
                    <p className="text-sm mt-1">{despatchNoticeJob.deliveryTime}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium">Trucks Assigned</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {despatchNoticeJob.trucks.map((truck, idx) => (
                        <Badge key={idx} variant="outline" className="bg-gray-100 text-gray-800">
                          {truck.registration}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Rate</Label>
                    <p className="text-sm mt-1">
                      ${despatchNoticeJob.rate} {despatchNoticeJob.rateUnit}
                    </p>
                  </div>
                  <div className="col-span-2 border-t border-green-300 pt-4 mt-2">
                    <Label className="text-sm font-medium mb-3 block">Toll Estimate</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">One Way</span>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold text-green-600">
                              ${despatchNoticeJob.tollOneWay.toFixed(2)}
                            </span>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                                  <Info className="h-4 w-4 text-blue-500" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[400px]">
                                <div className="space-y-3">
                                  <h4 className="font-semibold text-sm">Additional Info</h4>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="font-medium">Source:</span>{" "}
                                      <a
                                        href="https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                      >
                                        TfNSW Toll Calculator API
                                      </a>
                                    </div>
                                    <div>
                                      <span className="font-medium">Maintainer:</span>{" "}
                                      <a
                                        href="https://opendata.transport.nsw.gov.au"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                      >
                                        TfNSW Open Data Hub and Developer Portal
                                      </a>
                                    </div>
                                    <div>
                                      <span className="font-medium">Last Updated:</span> August 21, 2023, 7:06 PM
                                      (UTC+10:00)
                                    </div>
                                    <div>
                                      <span className="font-medium">Created:</span> October 5, 2017, 1:00 PM (UTC+11:00)
                                    </div>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Return</span>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold text-green-600">
                              ${despatchNoticeJob.tollReturn.toFixed(2)}
                            </span>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                                  <Info className="h-4 w-4 text-blue-500" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[400px]">
                                <div className="space-y-3">
                                  <h4 className="font-semibold text-sm">Additional Info</h4>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="font-medium">Source:</span>{" "}
                                      <a
                                        href="https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                      >
                                        TfNSW Toll Calculator API
                                      </a>
                                    </div>
                                    <div>
                                      <span className="font-medium">Maintainer:</span>{" "}
                                      <a
                                        href="https://opendata.transport.nsw.gov.au"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                      >
                                        TfNSW Open Data Hub and Developer Portal
                                      </a>
                                    </div>
                                    <div>
                                      <span className="font-medium">Last Updated:</span> August 21, 2023, 7:06 PM
                                      (UTC+10:00)
                                    </div>
                                    <div>
                                      <span className="font-medium">Created:</span> October 5, 2017, 1:00 PM (UTC+11:00)
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
              </div>

              {/* Despatch Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Despatch Details</h3>
                <div className="grid grid-cols-2 gap-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div>
                    <Label className="text-sm font-medium">Loading Time</Label>
                    <p className="text-sm mt-1">7:00 AM</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium"># Trucks Loading at a Time</Label>
                    <p className="text-sm mt-1">5</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">NJA Contact on Approach</Label>
                    <p className="text-sm mt-1">Brady</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">NJA Contact Phone</Label>
                    <p className="text-sm mt-1">0459266198</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium">Staging Location</Label>
                    <p className="text-sm mt-1">Mt Ousley road. On both sides</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium">Loading Instructions</Label>
                    <p className="text-sm mt-1">
                      Please follow the VMP attached for loading. Ensure all paperwork is completed before departure.
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium">PPE Equipment Requirements</Label>
                    <p className="text-sm mt-1">
                      Long sleeve shirts, hard hats, eye protection, gloves, steel cap boots, long pants - all PPE must
                      be worn
                    </p>
                  </div>
                </div>
              </div>

              {/* Driver Assignment */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Assigned Drivers</h3>
                <div className="p-4 border border-slate-200 rounded-lg">
                  <div className="space-y-3">
                    {despatchNoticeJob.trucks.map((truck, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <div>
                            <p className="font-medium text-sm">{truck.registration}</p>
                            <p className="text-xs text-slate-500">{truck.driver?.name}</p>
                          </div>
                        </div>
                        <Badge variant="default" className="text-xs">
                          {truck.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Documents Modal */}
      <Dialog open={isViewDocumentsOpen} onOpenChange={setIsViewDocumentsOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Job Documents - {viewDocumentsJob?.id}
            </DialogTitle>
            <DialogDescription>
              View and download all documents associated with this job
            </DialogDescription>
          </DialogHeader>

          {viewDocumentsJob && (
            <div className="flex-1 overflow-y-auto space-y-4">
              {/* Document Summary */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Documents</p>
                      <p className="text-2xl font-bold">{viewDocumentsJob.documents?.length || 0}</p>
                    </div>
                    <FileText className="h-8 w-8 text-muted-foreground/30" />
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Verified</p>
                      <p className="text-2xl font-bold text-green-600">
                        {viewDocumentsJob.documents?.filter(d => d.status === 'verified').length || 0}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500/30" />
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending</p>
                      <p className="text-2xl font-bold text-amber-600">
                        {viewDocumentsJob.documents?.filter(d => d.status === 'pending').length || 0}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-amber-500/30" />
                  </div>
                </Card>
              </div>

              {/* Documents List */}
              <Card>
                <div className="p-4 border-b">
                  <h3 className="font-semibold">Documents</h3>
                </div>
                <div className="divide-y">
                  {viewDocumentsJob.documents?.map((doc) => (
                    <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        {/* Document Icon */}
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          doc.type === 'pdf' ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                          {doc.type === 'pdf' ? (
                            <File className={`h-5 w-5 ${doc.type === 'pdf' ? 'text-red-600' : 'text-blue-600'}`} />
                          ) : (
                            <ImageIcon className="h-5 w-5 text-blue-600" />
                          )}
                        </div>

                        {/* Document Info */}
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm">{doc.name}</p>
                            {doc.status === 'verified' ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            ) : doc.status === 'pending' ? (
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                Pending
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">
                                <File className="h-3 w-3 mr-1" />
                                Rejected
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{doc.fileName}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span>{doc.size}</span>
                            <span>|</span>
                            <span>Uploaded by {doc.uploadedBy}</span>
                            <span>|</span>
                            <span>{doc.uploadedAt}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="gap-1.5">
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1.5 bg-transparent">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Download All Button */}
              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setIsViewDocumentsOpen(false)}>
                  Close
                </Button>
                <Button className="gap-2">
                  <Download className="h-4 w-4" />
                  Download All Documents
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
