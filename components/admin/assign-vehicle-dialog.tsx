"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Truck, CheckCircle, Wrench, XCircle } from "lucide-react"

interface AssignVehicleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  driverId: string
  driverName: string
  currentVehicle?: string
}

// Mock vehicles - in real app, this would come from API
const mockVehicles = [
  {
    id: "FL-001",
    vehicleId: "FL-001",
    make: "Volvo",
    model: "FH16",
    year: 2022,
    registration: "ABC-123",
    capacity: "40 tonnes",
    status: "Active",
    location: "Site Alpha - Construction Zone",
    currentDriver: "John Smith",
    gpsStatus: "Online",
  },
  {
    id: "FL-002",
    vehicleId: "FL-002",
    make: "Scania",
    model: "R450",
    year: 2021,
    registration: "DEF-456",
    capacity: "35 tonnes",
    status: "In Maintenance",
    location: "Service Center - Parramatta",
    currentDriver: "Mike Wilson",
    gpsStatus: "Offline",
  },
  {
    id: "FL-003",
    vehicleId: "FL-003",
    make: "Mercedes",
    model: "Actros",
    year: 2023,
    registration: "GHI-789",
    capacity: "42 tonnes",
    status: "Active",
    location: "Site Beta - Industrial Park",
    currentDriver: "Sarah Johnson",
    gpsStatus: "Online",
  },
  {
    id: "FL-004",
    vehicleId: "FL-004",
    make: "DAF",
    model: "XF",
    year: 2020,
    registration: "JKL-012",
    capacity: "38 tonnes",
    status: "Available",
    location: "Depot B - Dandenong",
    currentDriver: null,
    gpsStatus: "Online",
  },
  {
    id: "FL-005",
    vehicleId: "FL-005",
    make: "MAN",
    model: "TGX",
    year: 2021,
    registration: "MNO-345",
    capacity: "40 tonnes",
    status: "Available",
    location: "Depot A - Sunshine",
    currentDriver: null,
    gpsStatus: "Online",
  },
  {
    id: "FL-006",
    vehicleId: "FL-006",
    make: "Iveco",
    model: "Stralis",
    year: 2022,
    registration: "PQR-678",
    capacity: "36 tonnes",
    status: "Active",
    location: "Site Gamma - Port",
    currentDriver: "Emily Davis",
    gpsStatus: "Online",
  },
]

const statusColors = {
  Active: "default",
  Available: "secondary",
  "In Maintenance": "outline",
  Offline: "destructive",
} as const

const statusIcons = {
  Active: CheckCircle,
  Available: CheckCircle,
  "In Maintenance": Wrench,
  Offline: XCircle,
}

export function AssignVehicleDialog({
  open,
  onOpenChange,
  driverId,
  driverName,
  currentVehicle,
}: AssignVehicleDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVehicle, setSelectedVehicle] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredVehicles = mockVehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.registration.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || vehicle.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const handleSubmit = () => {
    const vehicle = mockVehicles.find((v) => v.id === selectedVehicle)
    console.log("[v0] Assigning vehicle to driver:", {
      driverId,
      driverName,
      vehicleId: selectedVehicle,
      vehicleName: vehicle ? `${vehicle.make} ${vehicle.model}` : "",
    })

    // Reset and close
    setSelectedVehicle("")
    setSearchTerm("")
    setFilterStatus("all")
    onOpenChange(false)
  }

  const selectedVehicleData = mockVehicles.find((v) => v.id === selectedVehicle)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Assign Vehicle</DialogTitle>
          <DialogDescription>
            Assign a vehicle to {driverName}
            {currentVehicle && (
              <span className="block mt-1 text-muted-foreground">Current vehicle: {currentVehicle}</span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Search and Filter */}
          <div className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor="vehicleSearch">Search Vehicles</Label>
              <Input
                id="vehicleSearch"
                placeholder="Search by vehicle ID, make, model, or registration..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div className="w-40">
              <Label htmlFor="statusFilter">Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger id="statusFilter" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="In Maintenance">In Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Vehicle Selection */}
          <div className="space-y-2">
            <Label>Select Vehicle</Label>
            <div className="border border-border rounded-md divide-y divide-border max-h-[400px] overflow-y-auto">
              {filteredVehicles.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Truck className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No vehicles found matching your criteria</p>
                </div>
              ) : (
                filteredVehicles.map((vehicle) => {
                  const StatusIcon = statusIcons[vehicle.status as keyof typeof statusIcons]
                  const isSelected = selectedVehicle === vehicle.id

                  return (
                    <div
                      key={vehicle.id}
                      onClick={() => setSelectedVehicle(vehicle.id)}
                      className={`p-4 cursor-pointer transition-colors hover:bg-accent ${
                        isSelected ? "bg-accent border-l-4 border-l-primary" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-md bg-muted">
                          <Truck className="h-5 w-5 text-muted-foreground" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground">
                              {vehicle.vehicleId} ({vehicle.make} {vehicle.model})
                            </h4>
                            <Badge
                              variant={statusColors[vehicle.status as keyof typeof statusColors]}
                              className="text-xs"
                            >
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {vehicle.status}
                            </Badge>
                          </div>

                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <span>
                                {vehicle.year} • {vehicle.registration}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span>{vehicle.capacity} capacity</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs">{vehicle.location}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge
                                variant={vehicle.gpsStatus === "Online" ? "default" : "destructive"}
                                className="text-xs"
                              >
                                GPS: {vehicle.gpsStatus}
                              </Badge>
                              {vehicle.currentDriver && (
                                <Badge variant="secondary" className="text-xs">
                                  Current Driver: {vehicle.currentDriver}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground">
                            <CheckCircle className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* Selected Vehicle Summary */}
          {selectedVehicleData && (
            <div className="p-4 border border-border rounded-md bg-accent/50">
              <h4 className="text-sm font-semibold mb-2">Assignment Summary</h4>
              <div className="text-sm space-y-1">
                <p>
                  <span className="text-muted-foreground">Driver:</span>{" "}
                  <span className="font-medium">{driverName}</span>
                </p>
                <p>
                  <span className="text-muted-foreground">Vehicle:</span>{" "}
                  <span className="font-medium">
                    {selectedVehicleData.make} {selectedVehicleData.model} ({selectedVehicleData.vehicleId})
                  </span>
                </p>
                {selectedVehicleData.currentDriver && (
                  <p className="text-orange-600 text-xs mt-2">
                    Note: This vehicle is currently assigned to {selectedVehicleData.currentDriver}. Assigning to{" "}
                    {driverName} will unassign the current driver.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedVehicle}>
            Assign Vehicle
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
