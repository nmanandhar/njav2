"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, MoreHorizontal, Eye, Edit, Truck, MapPin, Calendar, Wrench, Fuel, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock fleet data based on the scope document
const mockVehicles = [
  {
    id: "TRUCK-001",
    vehicleId: "TRUCK-001",
    make: "Volvo",
    model: "FH16",
    year: 2022,
    registration: "ABC-123",
    capacity: "40 tonnes",
    fuelType: "Diesel",
    currentDriver: "John Smith",
    driverType: "Internal",
    status: "Active",
    location: "Depot A",
    lastService: "2024-01-10",
    nextService: "2024-04-10",
    mileage: 45230,
    fuelEfficiency: 7.8,
    currentJob: "JOB-2024-001",
  },
  {
    id: "TRUCK-002",
    vehicleId: "TRUCK-002",
    make: "Scania",
    model: "R450",
    year: 2021,
    registration: "DEF-456",
    capacity: "35 tonnes",
    fuelType: "Diesel",
    currentDriver: "Mike Wilson",
    driverType: "Internal",
    status: "In Maintenance",
    location: "Service Center",
    lastService: "2024-01-15",
    nextService: "2024-04-15",
    mileage: 52100,
    fuelEfficiency: 8.2,
    currentJob: null,
  },
  {
    id: "TRUCK-003",
    vehicleId: "TRUCK-003",
    make: "Mercedes",
    model: "Actros",
    year: 2023,
    registration: "GHI-789",
    capacity: "42 tonnes",
    fuelType: "Diesel",
    currentDriver: "Sarah Johnson",
    driverType: "Subcontractor",
    status: "Active",
    location: "Site Beta",
    lastService: "2024-01-05",
    nextService: "2024-04-05",
    mileage: 38750,
    fuelEfficiency: 7.5,
    currentJob: "JOB-2024-002",
  },
  {
    id: "TRUCK-004",
    vehicleId: "TRUCK-004",
    make: "DAF",
    model: "XF",
    year: 2020,
    registration: "JKL-012",
    capacity: "38 tonnes",
    fuelType: "Diesel",
    currentDriver: null,
    driverType: null,
    status: "Available",
    location: "Depot B",
    lastService: "2023-12-20",
    nextService: "2024-03-20",
    mileage: 67890,
    fuelEfficiency: 8.9,
    currentJob: null,
  },
]

const statusColors = {
  Active: "default",
  Available: "secondary",
  "In Maintenance": "destructive",
  "Out of Service": "destructive",
} as const

export function FleetTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [makeFilter, setMakeFilter] = useState("all")

  const filteredVehicles = mockVehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (vehicle.currentDriver && vehicle.currentDriver.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || vehicle.status === statusFilter
    const matchesMake = makeFilter === "all" || vehicle.make === makeFilter

    return matchesSearch && matchesStatus && matchesMake
  })

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-card-foreground">Fleet Overview</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vehicles..."
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
                <TableHead className="text-muted-foreground">Vehicle</TableHead>
                <TableHead className="text-muted-foreground">Driver</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Location</TableHead>
                <TableHead className="text-muted-foreground">Maintenance</TableHead>
                <TableHead className="text-muted-foreground">Performance</TableHead>
                <TableHead className="text-muted-foreground">Current Job</TableHead>
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
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {vehicle.currentDriver ? (
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {vehicle.currentDriver
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-foreground">{vehicle.currentDriver}</div>
                          <Badge variant="outline" className="text-xs">
                            {vehicle.driverType}
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
                    <Badge variant={statusColors[vehicle.status as keyof typeof statusColors]}>{vehicle.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start space-x-1">
                      <MapPin className="h-3 w-3 text-muted-foreground mt-1 flex-shrink-0" />
                      <span className="text-sm text-foreground">{vehicle.location}</span>
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
                        <span className="text-xs text-muted-foreground">Next: {vehicle.nextService}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm text-foreground">{vehicle.mileage.toLocaleString()} km</div>
                      <div className="flex items-center space-x-1">
                        <Fuel className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{vehicle.fuelEfficiency}L/100km</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {vehicle.currentJob ? (
                      <div className="text-sm font-medium text-foreground">{vehicle.currentJob}</div>
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
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
  )
}
