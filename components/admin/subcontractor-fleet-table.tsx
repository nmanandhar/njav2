"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { AssignDriverDialog } from "./assign-driver-dialog"
import { VehicleDetailsDialog } from "./vehicle-details-dialog"
import { EditVehicleDialog } from "./edit-vehicle-dialog"
import { VehicleDocumentsDialog } from "./vehicle-documents-dialog"
import { TrackVehicleLocationDialog } from "./track-vehicle-location-dialog"
import { VehicleSettingsDialog } from "./vehicle-settings-dialog"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SubcontractorMaintenanceHistoryDialog } from "@/components/admin/subcontractor-maintenance-history-dialog"
import {
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Truck,
  MapPin,
  Calendar,
  Wrench,
  Fuel,
  User,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  FileText,
  Activity,
  Building2,
  History,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

const mockVehicles = [
  {
    id: "SC-001",
    vehicleId: "SC-001",
    make: "Kenworth",
    model: "T610",
    year: 2021,
    registration: "SUB-001",
    trailerRegistration: "TRL-SC01",
    capacity: "45 tonnes",
    severity: null,
    fuelType: "Diesel",
    subcontractor: "Heavy Equipment Supplies Pty Ltd",
    subcontractorType: "Subcontractor",
    currentDriver: "David Brown",
    status: "Active",
    location: "Site Charlie - Highway Construction",
    lastService: "2024-01-12",
    nextService: "2024-04-12",
    serviceDue: 42,
    mileage: 41200,
    fuelEfficiency: 8.1,
    currentJob: "JOB-2024-005",
    utilisationRate: 85,
    maintenanceCost: 2200,
    fuelCost: 1920,
    insuranceExpiry: "2024-11-20",
    registrationExpiry: "2024-10-15",
    lastInspection: "2024-01-18",
    nextInspection: "2024-07-18",
    gpsStatus: "Online",
    alerts: ["En Route"],
  },
  {
    id: "SC-002",
    vehicleId: "SC-002",
    make: "Mack",
    model: "Anthem",
    year: 2020,
    registration: "SUB-002",
    trailerRegistration: null,
    capacity: "38 tonnes",
    severity: "Condition to be Monitored",
    fuelType: "Diesel",
    subcontractor: "Metro Transport Solutions",
    subcontractorType: "Subcontractor",
    currentDriver: "Rachel Green",
    status: "Active",
    location: "Site Delta - Residential Development",
    lastService: "2024-01-08",
    nextService: "2024-04-08",
    serviceDue: 38,
    mileage: 55800,
    fuelEfficiency: 8.5,
    currentJob: "JOB-2024-008",
    utilisationRate: 92,
    maintenanceCost: 2650,
    fuelCost: 2100,
    insuranceExpiry: "2024-09-30",
    registrationExpiry: "2024-08-20",
    lastInspection: "2024-01-15",
    nextInspection: "2024-07-15",
    gpsStatus: "Online",
    alerts: ["On Break"],
  },
  {
    id: "SC-003",
    vehicleId: "SC-003",
    make: "Western Star",
    model: "4900",
    year: 2019,
    registration: "SUB-003",
    trailerRegistration: "TRL-SC03",
    capacity: "42 tonnes",
    severity: "Major or Safety-Related Fault",
    fuelType: "Diesel",
    subcontractor: "Heavy Equipment Supplies Pty Ltd",
    subcontractorType: "Subcontractor",
    currentDriver: null,
    status: "In Maintenance",
    location: "Subcontractor Depot - Penrith",
    lastService: "2024-01-10",
    nextService: "2024-04-10",
    serviceDue: 10,
    mileage: 72300,
    fuelEfficiency: 9.1,
    currentJob: null,
    utilisationRate: 0,
    maintenanceCost: 4800,
    fuelCost: 2850,
    insuranceExpiry: "2024-07-15",
    registrationExpiry: "2024-06-30",
    lastInspection: "2024-01-05",
    nextInspection: "2024-07-05",
    gpsStatus: "Offline",
    alerts: ["GPS Offline"],
  },
  {
    id: "SC-004",
    vehicleId: "SC-004",
    make: "Freightliner",
    model: "Cascadia",
    year: 2022,
    registration: "SUB-004",
    trailerRegistration: null,
    capacity: "40 tonnes",
    severity: "Minor Fault",
    fuelType: "Diesel",
    subcontractor: "Premium Logistics Group",
    subcontractorType: "Subcontractor",
    currentDriver: "Tom Martinez",
    status: "Active",
    location: "Site Echo - Mining Site",
    lastService: "2024-01-14",
    nextService: "2024-04-14",
    serviceDue: 44,
    mileage: 35600,
    fuelEfficiency: 7.9,
    currentJob: "JOB-2024-012",
    utilisationRate: 88,
    maintenanceCost: 1950,
    fuelCost: 1780,
    insuranceExpiry: "2025-01-10",
    registrationExpiry: "2024-12-15",
    lastInspection: "2024-01-20",
    nextInspection: "2024-07-20",
    gpsStatus: "Online",
    alerts: ["Parked"],
  },
  {
    id: "SC-005",
    vehicleId: "SC-005",
    make: "Peterbilt",
    model: "579",
    year: 2023,
    registration: "SUB-005",
    trailerRegistration: "TRL-SC05",
    capacity: "43 tonnes",
    severity: "Condition to be Monitored",
    fuelType: "Diesel",
    subcontractor: "Metro Transport Solutions",
    subcontractorType: "Subcontractor",
    currentDriver: "Lisa Anderson",
    status: "Active",
    location: "Site Foxtrot - Commercial Building",
    lastService: "2024-01-16",
    nextService: "2024-04-16",
    serviceDue: 46,
    mileage: 28900,
    fuelEfficiency: 7.6,
    currentJob: "JOB-2024-015",
    utilisationRate: 90,
    maintenanceCost: 1650,
    fuelCost: 1590,
    insuranceExpiry: "2025-02-28",
    registrationExpiry: "2025-01-20",
    lastInspection: "2024-01-22",
    nextInspection: "2024-07-22",
    gpsStatus: "Online",
    alerts: ["Idling"],
  },
]

const statusColors = {
  Active: "default",
  Available: "secondary",
  "In Maintenance": "destructive",
  "Out of Service": "destructive",
} as const

const severityColors = {
  "Minor Fault": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Major or Safety-Related Fault": "bg-red-100 text-red-800 border-red-200",
  "Condition to be Monitored": "bg-blue-100 text-blue-800 border-blue-200",
} as const

export function SubcontractorFleetTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [makeFilter, setMakeFilter] = useState("all")
  const [subcontractorFilter, setSubcontractorFilter] = useState("all")

  const [selectedVehicleForDetails, setSelectedVehicleForDetails] = useState<(typeof mockVehicles)[0] | null>(null)
  const [selectedVehicleForEdit, setSelectedVehicleForEdit] = useState<(typeof mockVehicles)[0] | null>(null)
  const [selectedVehicleForDriver, setSelectedVehicleForDriver] = useState<(typeof mockVehicles)[0] | null>(null)
  const [selectedVehicleForMaintenance, setSelectedVehicleForMaintenance] = useState<(typeof mockVehicles)[0] | null>(
    null,
  )
  const [selectedVehicleForDocuments, setSelectedVehicleForDocuments] = useState<(typeof mockVehicles)[0] | null>(null)
  const [selectedVehicleForTracking, setSelectedVehicleForTracking] = useState<(typeof mockVehicles)[0] | null>(null)
  const [selectedVehicleForSettings, setSelectedVehicleForSettings] = useState<(typeof mockVehicles)[0] | null>(null)
  const [selectedSubcontractor, setSelectedSubcontractor] = useState<{
    name: string
    id: string
    contactName: string
    email: string
    phone: string
    address: string
    abn: string
    status: string
    vehicles: number
    hourlyRate?: number
    travelHours?: number
    perTonneRate?: number
    loadRate?: number
    lastActivity?: string
  } | null>(null)
  const [isSubcontractorDetailsOpen, setIsSubcontractorDetailsOpen] = useState(false)
  const [selectedVehicleForMaintenanceHistory, setSelectedVehicleForMaintenanceHistory] = useState<any>(null)
  const [isMaintenanceHistoryDialogOpen, setIsMaintenanceHistoryDialogOpen] = useState(false)

  const filteredVehicles = mockVehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.subcontractor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (vehicle.currentDriver && vehicle.currentDriver.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || vehicle.status === statusFilter
    const matchesMake = makeFilter === "all" || vehicle.make === makeFilter
    const matchesSubcontractor = subcontractorFilter === "all" || vehicle.subcontractor === subcontractorFilter

    return matchesSearch && matchesStatus && matchesMake && matchesSubcontractor
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="h-3 w-3 text-green-600" />
      case "Available":
        return <Clock className="h-3 w-3 text-blue-600" />
      case "In Maintenance":
        return <Wrench className="h-3 w-3 text-orange-600" />
      default:
        return <AlertTriangle className="h-3 w-3 text-red-600" />
    }
  }

  const getServiceDueColor = (days: number) => {
    if (days <= 0) return "text-red-600"
    if (days <= 14) return "text-orange-600"
    if (days <= 30) return "text-yellow-600"
    return "text-green-600"
  }

  const uniqueSubcontractors = Array.from(new Set(mockVehicles.map((v) => v.subcontractor)))

  const handleViewDetails = (vehicle: (typeof mockVehicles)[0]) => {
    setSelectedVehicleForDetails(vehicle)
  }

  const handleEditVehicle = (vehicle: (typeof mockVehicles)[0]) => {
    setSelectedVehicleForEdit(vehicle)
  }

  const handleAssignDriver = (vehicle: (typeof mockVehicles)[0]) => {
    setSelectedVehicleForDriver(vehicle)
  }

  const handleScheduleMaintenance = (vehicle: (typeof mockVehicles)[0]) => {
    setSelectedVehicleForMaintenance(vehicle)
  }

  const handleViewDocuments = (vehicle: (typeof mockVehicles)[0]) => {
    setSelectedVehicleForDocuments(vehicle)
  }

  const handleTrackLocation = (vehicle: (typeof mockVehicles)[0]) => {
    setSelectedVehicleForTracking(vehicle)
  }

  const handleVehicleSettings = (vehicle: (typeof mockVehicles)[0]) => {
    setSelectedVehicleForSettings(vehicle)
  }

  const handleViewSubcontractorDetails = (vehicle: (typeof mockVehicles)[0]) => {
    const subcontractorData = {
      "Heavy Equipment Supplies Pty Ltd": {
        name: "Heavy Equipment Supplies Pty Ltd",
        id: "SUB-RT-001",
        contactName: "Michael Roberts",
        email: "michael@regionaltransport.com.au",
        phone: "+61 2 9876 1234",
        address: "45 Industrial Dr, Penrith NSW 2750",
        abn: "87 654 321 098",
        status: "Active",
        vehicles: 12,
        hourlyRate: 115,
        travelHours: 1.5,
        perTonneRate: 42,
        loadRate: 780,
        lastActivity: "2024-01-16",
      },
      "Metro Transport Solutions": {
        name: "Metro Transport Solutions",
        id: "SUB-CH-001",
        contactName: "Jennifer Lee",
        email: "jennifer@coastalhaulage.com.au",
        phone: "+61 7 5555 6789",
        address: "78 Port Road, Brisbane QLD 4000",
        abn: "65 432 198 765",
        status: "Active",
        vehicles: 8,
        hourlyRate: 125,
        travelHours: 2.0,
        perTonneRate: 45,
        loadRate: 820,
        lastActivity: "2024-01-15",
      },
      "Premium Logistics Group": {
        name: "Premium Logistics Group",
        id: "SUB-AL-001",
        contactName: "Peter Thompson",
        email: "peter@alliancelogistics.com.au",
        phone: "+61 3 8765 4321",
        address: "112 Transport Way, Melbourne VIC 3000",
        abn: "43 219 876 543",
        status: "Active",
        vehicles: 15,
        hourlyRate: 135,
        travelHours: 1.0,
        perTonneRate: 48,
        loadRate: 850,
        lastActivity: "2024-01-12",
      },
    }

    const subcontractorInfo = subcontractorData[vehicle.subcontractor as keyof typeof subcontractorData]
    if (subcontractorInfo) {
      setSelectedSubcontractor(subcontractorInfo)
      setIsSubcontractorDetailsOpen(true)
    }
  }

  const handleViewMaintenanceHistory = (vehicle: any) => {
    setSelectedVehicleForMaintenanceHistory(vehicle)
    setIsMaintenanceHistoryDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-card-foreground">Subcontractor Fleet Overview</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search vehicles, drivers, registration..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80 bg-input border-border"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 bg-input border-border">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="In Maintenance">In Maintenance</SelectItem>
                  <SelectItem value="Out of Service">Out of Service</SelectItem>
                </SelectContent>
              </Select>
              <Select value={makeFilter} onValueChange={setMakeFilter}>
                <SelectTrigger className="w-32 bg-input border-border">
                  <SelectValue placeholder="Make" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Makes</SelectItem>
                  <SelectItem value="Kenworth">Kenworth</SelectItem>
                  <SelectItem value="Mack">Mack</SelectItem>
                  <SelectItem value="Western Star">Western Star</SelectItem>
                  <SelectItem value="Freightliner">Freightliner</SelectItem>
                  <SelectItem value="Peterbilt">Peterbilt</SelectItem>
                </SelectContent>
              </Select>
              <Select value={subcontractorFilter} onValueChange={setSubcontractorFilter}>
                <SelectTrigger className="w-48 bg-input border-border">
                  <SelectValue placeholder="Subcontractor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subcontractors</SelectItem>
                  {uniqueSubcontractors.map((subcontractor) => (
                    <SelectItem key={subcontractor} value={subcontractor}>
                      {subcontractor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Vehicle Details</TableHead>
                  <TableHead className="text-muted-foreground">Trailer</TableHead>
                  <TableHead className="text-muted-foreground">Driver & Status</TableHead>
                  <TableHead className="text-muted-foreground">Location & Job</TableHead>
                  <TableHead className="text-muted-foreground">Utilisation</TableHead>
                  <TableHead className="text-muted-foreground">Maintenance History</TableHead>
                  <TableHead className="text-muted-foreground">Performance</TableHead>
                  <TableHead className="text-muted-foreground">GPS Activity</TableHead>
                  <TableHead className="text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id} className="border-border">
                    <TableCell className="font-medium text-foreground">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Truck className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold">{vehicle.vehicleId}</div>
                          <div className="text-xs text-muted-foreground">
                            {vehicle.make} {vehicle.model} ({vehicle.year})
                          </div>
                          <div className="text-xs text-muted-foreground">{vehicle.registration}</div>
                          <div className="text-xs text-muted-foreground">{vehicle.capacity}</div>
                          {vehicle.severity && (
                            <Badge
                              variant="outline"
                              className={`text-xs mt-1 ${severityColors[vehicle.severity as keyof typeof severityColors]}`}
                            >
                              {vehicle.severity}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {vehicle.trailerRegistration ? (
                        <span className="inline-block px-2 py-1 text-xs font-medium text-white bg-teal-600 rounded">
                          {vehicle.trailerRegistration}
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs font-medium text-white bg-gray-400 rounded">
                          NA
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-1">
                          <Building2 className="h-3 w-3 text-muted-foreground" />
                          <span
                            className="text-xs text-muted-foreground truncate max-w-[180px]"
                            title={vehicle.subcontractor}
                          >
                            {vehicle.subcontractor}
                          </span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {vehicle.subcontractorType}
                        </Badge>
                        {vehicle.currentDriver ? (
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                {vehicle.currentDriver
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-xs font-medium text-foreground">{vehicle.currentDriver}</div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 text-muted-foreground">
                            <User className="h-4 w-4" />
                            <span className="text-xs">Unassigned</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(vehicle.status)}
                          <Badge
                            variant={statusColors[vehicle.status as keyof typeof statusColors]}
                            className="text-xs"
                          >
                            {vehicle.status}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-start space-x-1">
                          <MapPin className="h-3 w-3 text-muted-foreground mt-1 flex-shrink-0" />
                          <span className="text-xs text-foreground">{vehicle.location}</span>
                        </div>
                        {vehicle.currentJob ? (
                          <div className="text-xs font-medium text-foreground">{vehicle.currentJob}</div>
                        ) : (
                          <div className="text-xs text-muted-foreground">No active job</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">{vehicle.utilisationRate}%</div>
                        <Progress value={vehicle.utilisationRate} className="h-1 w-24" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                          <Wrench className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Last: {vehicle.lastService}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className={`text-xs ${getServiceDueColor(vehicle.serviceDue)}`}>
                            Due: {vehicle.serviceDue}d
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Cost: ${vehicle.maintenanceCost.toLocaleString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-xs text-foreground">{vehicle.mileage.toLocaleString()} km</div>
                        <div className="flex items-center space-x-1">
                          <Fuel className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{vehicle.fuelEfficiency}L/100km</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Fuel: ${vehicle.fuelCost.toLocaleString()}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <div
                          className={`h-2 w-2 rounded-full ${vehicle.gpsStatus === "Online" ? "bg-green-600" : "bg-gray-400"}`}
                        />
                        <Badge variant={vehicle.gpsStatus === "Online" ? "default" : "secondary"} className="text-xs">
                          {vehicle.gpsStatus}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(vehicle)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditVehicle(vehicle)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Vehicle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewSubcontractorDetails(vehicle)}>
                            <Building2 className="mr-2 h-4 w-4" />
                            View Subcontractor Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewMaintenanceHistory(vehicle)}>
                            <History className="mr-2 h-4 w-4" />
                            View Maintenance History
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleAssignDriver(vehicle)}>
                            <User className="mr-2 h-4 w-4" />
                            Assign Driver
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleViewDocuments(vehicle)}>
                            <FileText className="mr-2 h-4 w-4" />
                            View Documents
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleTrackLocation(vehicle)}>
                            <Activity className="mr-2 h-4 w-4" />
                            Track Location
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleVehicleSettings(vehicle)}>
                            <Settings className="mr-2 h-4 w-4" />
                            Vehicle Settings
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredVehicles.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No vehicles found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedVehicleForDetails && (
        <VehicleDetailsDialog
          vehicle={selectedVehicleForDetails}
          open={!!selectedVehicleForDetails}
          onOpenChange={(open) => !open && setSelectedVehicleForDetails(null)}
        />
      )}

      {selectedVehicleForEdit && (
        <EditVehicleDialog
          vehicle={selectedVehicleForEdit}
          open={!!selectedVehicleForEdit}
          onOpenChange={(open) => !open && setSelectedVehicleForEdit(null)}
        />
      )}

      {selectedVehicleForDriver && (
        <AssignDriverDialog
          vehicle={selectedVehicleForDriver}
          open={!!selectedVehicleForDriver}
          onOpenChange={(open) => !open && setSelectedVehicleForDriver(null)}
        />
      )}

      {selectedVehicleForDocuments && (
        <VehicleDocumentsDialog
          vehicle={selectedVehicleForDocuments}
          open={!!selectedVehicleForDocuments}
          onOpenChange={(open) => !open && setSelectedVehicleForDocuments(null)}
        />
      )}

      {selectedVehicleForTracking && (
        <TrackVehicleLocationDialog
          vehicle={selectedVehicleForTracking}
          open={!!selectedVehicleForTracking}
          onOpenChange={(open) => !open && setSelectedVehicleForTracking(null)}
        />
      )}

      {selectedVehicleForSettings && (
        <VehicleSettingsDialog
          vehicle={selectedVehicleForSettings}
          open={!!selectedVehicleForSettings}
          onOpenChange={(open) => !open && setSelectedVehicleForSettings(null)}
        />
      )}

      {selectedSubcontractor && (
        <Dialog open={isSubcontractorDetailsOpen} onOpenChange={setIsSubcontractorDetailsOpen}>
          <DialogContent className="!max-w-[95vw] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">Subcontractor Details</DialogTitle>
              <DialogDescription>Complete information for {selectedSubcontractor.name}</DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="grid grid-cols-3 gap-4 pb-4 border-b">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Subcontractor ID</p>
                  <p className="font-mono text-lg font-semibold">{selectedSubcontractor.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
                  <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100 mt-1">
                    {selectedSubcontractor.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Vehicle Count</p>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{selectedSubcontractor.vehicles} vehicles</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Company Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Company Name</p>
                    <p className="font-medium mt-1">{selectedSubcontractor.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">ABN</p>
                    <p className="text-sm mt-1">{selectedSubcontractor.abn}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                  <p className="text-sm mt-1">{selectedSubcontractor.address}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Company Phone</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm">{selectedSubcontractor.phone}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Company Email</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm">{selectedSubcontractor.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold">Rates</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Hourly Rate</p>
                    <div className="grid grid-cols-2 gap-4 mt-1">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Rate ($/hr)</p>
                        <p className="text-sm font-medium mt-1">
                          {selectedSubcontractor.hourlyRate ? `$${selectedSubcontractor.hourlyRate}/hr` : "Not set"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Travel Hours</p>
                        <p className="text-sm mt-1">
                          {selectedSubcontractor.travelHours ? `${selectedSubcontractor.travelHours} hours` : "Not set"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Per Tonne Rate ($/tonne)</p>
                    <p className="text-sm font-medium mt-1">
                      {selectedSubcontractor.perTonneRate ? `$${selectedSubcontractor.perTonneRate}/tonne` : "Not set"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Load Rate ($/load)</p>
                    <p className="text-sm font-medium mt-1">
                      {selectedSubcontractor.loadRate ? `$${selectedSubcontractor.loadRate}/load` : "Not set"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold">Contact Person</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Name</p>
                    <p className="font-medium mt-1">{selectedSubcontractor.contactName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Phone</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm">{selectedSubcontractor.phone}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm">{selectedSubcontractor.email}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold">Administrative Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Date Added</p>
                    <p className="text-sm mt-1">{selectedSubcontractor.lastActivity}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Added By</p>
                    <p className="text-sm mt-1">Admin User</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsSubcontractorDetailsOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {selectedVehicleForMaintenanceHistory && (
        <SubcontractorMaintenanceHistoryDialog
          open={isMaintenanceHistoryDialogOpen}
          onOpenChange={setIsMaintenanceHistoryDialogOpen}
          vehicle={selectedVehicleForMaintenanceHistory}
        />
      )}
    </div>
  )
}
