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
import { ScheduleMaintenanceDialog } from "./schedule-maintenance-dialog"
import { VehicleDocumentsDialog } from "./vehicle-documents-dialog"
import { TrackVehicleLocationDialog } from "./track-vehicle-location-dialog"
import { VehicleSettingsDialog } from "./vehicle-settings-dialog"
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
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

type Vehicle = {
  id: string
  vehicleId: string
  make: string
  model: string
  year: number
  registration: string
  trailerRegistration: string | null
  capacity: string
  severity: string | null
  fuelType: string
  currentDriver: string | null
  status: string
  location: string
  lastService: string
  nextService: string
  serviceDue: number
  mileage: number
  fuelEfficiency: number
  currentJob: string | null
  utilisationRate: number
  maintenanceCost: number
  fuelCost: number
  insuranceExpiry: string
  registrationExpiry: string
  lastInspection: string
  nextInspection: string
  gpsStatus: string
  alerts: string[]
}

const mockVehicles: Vehicle[] = [
  {
    id: "FL-001",
    vehicleId: "FL-001",
    make: "Volvo",
    model: "FH16",
    year: 2022,
    registration: "ABC-123",
    trailerRegistration: "TRL-101",
    capacity: "40 tonnes",
    severity: null,
    fuelType: "Diesel",
    currentDriver: "John Smith",
    status: "Active",
    location: "Site Alpha - Construction Zone",
    lastService: "2024-01-10",
    nextService: "2024-04-10",
    serviceDue: 45,
    mileage: 45230,
    fuelEfficiency: 7.8,
    currentJob: "JOB-2024-001",
    utilisationRate: 87,
    maintenanceCost: 2450,
    fuelCost: 1850,
    insuranceExpiry: "2024-12-15",
    registrationExpiry: "2024-11-30",
    lastInspection: "2024-01-20",
    nextInspection: "2024-07-20",
    gpsStatus: "Online",
    alerts: ["En Route"],
  },
  {
    id: "FL-002",
    vehicleId: "FL-002",
    make: "Scania",
    model: "R450",
    year: 2021,
    registration: "DEF-456",
    trailerRegistration: null,
    capacity: "35 tonnes",
    severity: "Major or Safety-Related Fault",
    fuelType: "Diesel",
    currentDriver: "Mike Wilson",
    status: "In Maintenance",
    location: "Service Center - Parramatta",
    lastService: "2024-01-15",
    nextService: "2024-04-15",
    serviceDue: 15,
    mileage: 52100,
    fuelEfficiency: 8.2,
    currentJob: null,
    utilisationRate: 0,
    maintenanceCost: 3200,
    fuelCost: 2100,
    insuranceExpiry: "2024-10-20",
    registrationExpiry: "2024-09-15",
    lastInspection: "2024-01-10",
    nextInspection: "2024-07-10",
    gpsStatus: "Offline",
    alerts: ["GPS Offline"],
  },
  {
    id: "FL-003",
    vehicleId: "FL-003",
    make: "Mercedes",
    model: "Actros",
    year: 2023,
    registration: "GHI-789",
    trailerRegistration: "TRL-203",
    capacity: "42 tonnes",
    severity: null,
    fuelType: "Diesel",
    currentDriver: "Sarah Johnson",
    status: "Active",
    location: "Site Beta - Industrial Park",
    lastService: "2024-01-05",
    nextService: "2024-04-05",
    serviceDue: 35,
    mileage: 38750,
    fuelEfficiency: 7.5,
    currentJob: "JOB-2024-002",
    utilisationRate: 92,
    maintenanceCost: 1800,
    fuelCost: 1650,
    insuranceExpiry: "2025-03-10",
    registrationExpiry: "2025-02-28",
    lastInspection: "2024-01-25",
    nextInspection: "2024-07-25",
    gpsStatus: "Online",
    alerts: ["On Break"],
  },
  {
    id: "FL-004",
    vehicleId: "FL-004",
    make: "DAF",
    model: "XF",
    year: 2020,
    registration: "JKL-012",
    trailerRegistration: null,
    capacity: "38 tonnes",
    severity: "Minor Fault",
    fuelType: "Diesel",
    currentDriver: null,
    status: "Available",
    location: "Depot B - Dandenong",
    lastService: "2023-12-20",
    nextService: "2024-03-20",
    serviceDue: 5,
    mileage: 67890,
    fuelEfficiency: 8.9,
    currentJob: null,
    utilisationRate: 0,
    maintenanceCost: 4100,
    fuelCost: 2850,
    insuranceExpiry: "2024-08-15",
    registrationExpiry: "2024-07-30",
    lastInspection: "2023-12-15",
    nextInspection: "2024-06-15",
    gpsStatus: "Online",
    alerts: ["Parked"],
  },
  {
    id: "FL-005",
    vehicleId: "FL-005",
    make: "Isuzu",
    model: "FVZ",
    year: 2019,
    registration: "MNO-345",
    trailerRegistration: "TRL-305",
    capacity: "25 tonnes",
    severity: "Major or Safety-Related Fault",
    fuelType: "Diesel",
    currentDriver: "Emma Davis",
    status: "Out of Service",
    location: "Workshop - Blacktown",
    lastService: "2024-01-08",
    nextService: "2024-04-08",
    serviceDue: 38,
    mileage: 78450,
    fuelEfficiency: 9.2,
    currentJob: null,
    utilisationRate: 0,
    maintenanceCost: 5200,
    fuelCost: 3100,
    insuranceExpiry: "2024-06-20",
    registrationExpiry: "2024-05-15",
    lastInspection: "2024-01-12",
    nextInspection: "2024-07-12",
    gpsStatus: "Offline",
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

export function AdminFleetTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [makeFilter, setMakeFilter] = useState("all")
  const [alertFilter, setAlertFilter] = useState("all")
  const [assignDriverDialogOpen, setAssignDriverDialogOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null)
  const [viewDetailsDialogOpen, setViewDetailsDialogOpen] = useState(false)
  const [selectedVehicleForDetails, setSelectedVehicleForDetails] = useState<(typeof mockVehicles)[0] | null>(null)
  const [selectedVehicleForEdit, setSelectedVehicleForEdit] = useState<(typeof mockVehicles)[0] | null>(null)
  const [selectedVehicleForDriver, setSelectedVehicleForDriver] = useState<(typeof mockVehicles)[0] | null>(null)
  const [selectedVehicleForMaintenance, setSelectedVehicleForMaintenance] = useState<(typeof mockVehicles)[0] | null>(
    null,
  )
  const [selectedVehicleForDocuments, setSelectedVehicleForDocuments] = useState<(typeof mockVehicles)[0] | null>(null)
  const [selectedVehicleForTracking, setSelectedVehicleForTracking] = useState<(typeof mockVehicles)[0] | null>(null)
  const [selectedVehicleForSettings, setSelectedVehicleForSettings] = useState<(typeof mockVehicles)[0] | null>(null)

  const filteredVehicles = mockVehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (vehicle.currentDriver && vehicle.currentDriver.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || vehicle.status === statusFilter
    const matchesMake = makeFilter === "all" || vehicle.make === makeFilter
    const matchesAlert = alertFilter === "all" || (alertFilter === "alerts" && vehicle.alerts.length > 0)

    return matchesSearch && matchesStatus && matchesMake && matchesAlert
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

  const handleAssignDriver = (vehicle: (typeof mockVehicles)[0]) => {
    setSelectedVehicleForDriver(vehicle)
  }

  const handleViewDetails = (vehicle: (typeof mockVehicles)[0]) => {
    setSelectedVehicleForDetails(vehicle)
  }

  const handleEditVehicle = (vehicle: (typeof mockVehicles)[0]) => {
    setSelectedVehicleForEdit(vehicle)
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

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-card-foreground">Fleet Overview</CardTitle>
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
                  <SelectItem value="Volvo">Volvo</SelectItem>
                  <SelectItem value="Scania">Scania</SelectItem>
                  <SelectItem value="Mercedes">Mercedes</SelectItem>
                  <SelectItem value="DAF">DAF</SelectItem>
                  <SelectItem value="Isuzu">Isuzu</SelectItem>
                </SelectContent>
              </Select>
              <Select value={alertFilter} onValueChange={setAlertFilter}>
                <SelectTrigger className="w-32 bg-input border-border">
                  <SelectValue placeholder="Alerts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Vehicles</SelectItem>
                  <SelectItem value="alerts">With Alerts</SelectItem>
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
                    <TableCell className="text-right">
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
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleAssignDriver(vehicle)}>
                            <User className="mr-2 h-4 w-4" />
                            Assign Driver
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleScheduleMaintenance(vehicle)}>
                            <Wrench className="mr-2 h-4 w-4" />
                            Schedule Maintenance
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

      {selectedVehicleForMaintenance && (
        <ScheduleMaintenanceDialog
          vehicle={selectedVehicleForMaintenance}
          open={!!selectedVehicleForMaintenance}
          onOpenChange={(open) => !open && setSelectedVehicleForMaintenance(null)}
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
    </div>
  )
}
