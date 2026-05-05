"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Truck,
  MapPin,
  Wrench,
  AlertTriangle,
  User,
  CheckCircle,
  Clock,
  Calendar,
  Fuel,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { ViewVehicleDetailsDialog } from "./view-vehicle-details-dialog"
import { EditVehicleDialog } from "./edit-vehicle-dialog"

const mockVehicles = [
  {
    id: "FL-001",
    registration: "ABC-123",
    make: "Volvo",
    model: "FH16",
    year: 2022,
    capacity: "40 tonnes",
    severity: "Minor Fault",
    driver: {
      name: "John Smith",
      status: "Active",
    },
    location: "Site Alpha - Construction Zone",
    job: "JOB-2024-001",
    utilisation: 87,
    maintenance: {
      last: "2024-01-10",
      due: "45d",
      dueInDays: 45,
      cost: "$2,450",
      status: "valid",
    },
    performance: {
      distance: "45,230 km",
      fuelRate: "7.8L/100km",
      fuelCost: "$1,850",
    },
    gpsStatus: "Online",
    alerts: ["En Route"],
  },
  {
    id: "FL-002",
    registration: "DEF-456",
    make: "Scania",
    model: "R450",
    year: 2021,
    capacity: "35 tonnes",
    severity: "Major or Safety-Related Fault",
    driver: {
      name: "Mike Wilson",
      status: "In Maintenance",
    },
    location: "Service Center - Parramatta",
    job: null,
    utilisation: 0,
    maintenance: {
      last: "2024-01-15",
      due: "15d",
      dueInDays: 15,
      cost: "$3,200",
      status: "expiring",
    },
    performance: {
      distance: "52,100 km",
      fuelRate: "8.2L/100km",
      fuelCost: "$2,100",
    },
    gpsStatus: "Offline",
    alerts: ["GPS Offline"],
  },
  {
    id: "FL-003",
    registration: "GHI-789",
    make: "Mercedes",
    model: "Actros",
    year: 2023,
    capacity: "42 tonnes",
    severity: "Condition to be Monitored",
    driver: {
      name: "Sarah Johnson",
      status: "Active",
    },
    location: "Site Beta - Industrial Park",
    job: "JOB-2024-002",
    utilisation: 92,
    maintenance: {
      last: "2024-01-05",
      due: "35d",
      dueInDays: 35,
      cost: "$1,800",
      status: "valid",
    },
    performance: {
      distance: "38,750 km",
      fuelRate: "7.5L/100km",
      fuelCost: "$1,650",
    },
    gpsStatus: "Online",
    alerts: ["On Break"],
  },
  {
    id: "FL-004",
    registration: "JKL-012",
    make: "DAF",
    model: "XF",
    year: 2020,
    capacity: "38 tonnes",
    severity: "Minor Fault",
    driver: null,
    location: "Depot B - Dandenong",
    job: null,
    utilisation: 0,
    maintenance: {
      last: "2023-12-20",
      due: "5d",
      dueInDays: 5,
      cost: "$2,450",
      status: "overdue",
    },
    performance: {
      distance: "67,890 km",
      fuelRate: "8.9L/100km",
      fuelCost: "$2,850",
    },
    gpsStatus: "Online",
    alerts: ["Parked"],
  },
]

const statusColors = {
  Active: "default",
  "In Maintenance": "destructive",
  Available: "secondary",
} as const

const severityColors = {
  "Minor Fault": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Major or Safety-Related Fault": "bg-red-100 text-red-800 border-red-200",
  "Condition to be Monitored": "bg-blue-100 text-blue-800 border-blue-200",
} as const

function getMaintenanceBadgeVariant(status: string) {
  switch (status) {
    case "overdue":
      return "destructive"
    case "expiring":
      return "secondary"
    default:
      return "outline"
  }
}

const getServiceDueColor = (days: number) => {
  if (days <= 0) return "text-red-600"
  if (days <= 14) return "text-orange-600"
  if (days <= 30) return "text-yellow-600"
  return "text-green-600"
}

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

export function FleetTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [makeFilter, setMakeFilter] = useState("all")
  const [vehicleFilter, setVehicleFilter] = useState("all")
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false)
  const [editVehicleOpen, setEditVehicleOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null)

  const filteredVehicles = mockVehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (vehicle.driver && vehicle.driver.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || (vehicle.driver && vehicle.driver.status === statusFilter)
    const matchesMake = makeFilter === "all" || vehicle.make === makeFilter
    const matchesVehicle = vehicleFilter === "all"

    return matchesSearch && matchesStatus && matchesMake && matchesVehicle
  })

  const handleViewDetails = (vehicle: any) => {
    console.log("[v0] View Details clicked for vehicle:", vehicle)
    setSelectedVehicle(vehicle)
    setViewDetailsOpen(true)
    console.log("[v0] Dialog state set to true")
  }

  const handleEditVehicle = (vehicle: any) => {
    setSelectedVehicle(vehicle)
    setEditVehicleOpen(true)
  }

  return (
    <>
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
                  className="pl-10 w-64 bg-input border-border"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 bg-input border-border">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="In Maintenance">In Maintenance</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
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
                </SelectContent>
              </Select>
              <Select value={vehicleFilter} onValueChange={setVehicleFilter}>
                <SelectTrigger className="w-32 bg-input border-border">
                  <SelectValue placeholder="Vehicles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Vehicles</SelectItem>
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
                          <div className="font-semibold">{vehicle.id}</div>
                          <div className="text-xs text-muted-foreground">
                            {vehicle.make} {vehicle.model} ({vehicle.year})
                          </div>
                          <div className="text-xs text-muted-foreground">{vehicle.registration}</div>
                          <div className="text-xs text-muted-foreground">{vehicle.capacity}</div>
                          <Badge
                            variant="outline"
                            className={`text-xs mt-1 ${severityColors[vehicle.severity as keyof typeof severityColors]}`}
                          >
                            {vehicle.severity}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {vehicle.driver ? (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                {vehicle.driver.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-foreground text-sm">{vehicle.driver.name}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(vehicle.driver.status)}
                            <Badge variant={statusColors[vehicle.driver.status as keyof typeof statusColors]}>
                              {vehicle.driver.status}
                            </Badge>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span className="text-sm">Unassigned</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-start space-x-1">
                          <MapPin className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-foreground">{vehicle.location}</span>
                        </div>
                        {vehicle.job ? (
                          <div className="text-sm font-medium text-foreground">{vehicle.job}</div>
                        ) : (
                          <div className="text-sm text-muted-foreground">No active job</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">{vehicle.utilisation}%</div>
                        <Progress value={vehicle.utilisation} className="h-1 w-24" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                          <Wrench className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Last: {vehicle.maintenance.last}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className={`text-xs ${getServiceDueColor(vehicle.maintenance.dueInDays)}`}>
                            Due: {vehicle.maintenance.due}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">Cost: {vehicle.maintenance.cost}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm text-foreground">{vehicle.performance.distance}</div>
                        <div className="flex items-center space-x-1">
                          <Fuel className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{vehicle.performance.fuelRate}</span>
                        </div>
                        <div className="text-xs font-medium text-foreground">Fuel: {vehicle.performance.fuelCost}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                          <div
                            className={`h-2 w-2 rounded-full ${vehicle.gpsStatus === "Online" ? "bg-green-600" : "bg-gray-400"}`}
                          />
                          <Badge variant={vehicle.gpsStatus === "Online" ? "default" : "secondary"} className="text-xs">
                            {vehicle.gpsStatus}
                          </Badge>
                        </div>
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
                          <DropdownMenuItem>
                            <Wrench className="mr-2 h-4 w-4" />
                            Schedule Maintenance
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            Assign Driver
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <ViewVehicleDetailsDialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen} vehicle={selectedVehicle} />
      <EditVehicleDialog open={editVehicleOpen} onOpenChange={setEditVehicleOpen} vehicle={selectedVehicle} />
    </>
  )
}
