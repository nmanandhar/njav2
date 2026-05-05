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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, CheckCircle, Clock, Phone, Mail, AlertTriangle } from "lucide-react"

interface AssignDriverDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vehicleId: string
  vehicleName: string
  currentDriver?: string
}

// Mock drivers - in real app, this would come from API
const mockDrivers = [
  {
    id: "1",
    name: "John Smith",
    status: "Available",
    phone: "+61 2 9876 5432",
    email: "john.smith@company.com",
    licenseClass: "HC",
    currentVehicle: null,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    status: "Available",
    phone: "+61 2 9876 5433",
    email: "sarah.johnson@company.com",
    licenseClass: "MC",
    currentVehicle: null,
  },
  {
    id: "3",
    name: "Mike Wilson",
    status: "On Job",
    phone: "+61 2 9876 5434",
    email: "mike.wilson@company.com",
    licenseClass: "HC",
    currentVehicle: "FL-002",
  },
  {
    id: "4",
    name: "Emily Davis",
    status: "Available",
    phone: "+61 2 9876 5435",
    email: "emily.davis@company.com",
    licenseClass: "HR",
    currentVehicle: null,
  },
  {
    id: "5",
    name: "David Brown",
    status: "On Break",
    phone: "+61 2 9876 5436",
    email: "david.brown@company.com",
    licenseClass: "MC",
    currentVehicle: null,
  },
  {
    id: "6",
    name: "Lisa Anderson",
    status: "Available",
    phone: "+61 2 9876 5437",
    email: "lisa.anderson@company.com",
    licenseClass: "HC",
    currentVehicle: null,
  },
]

const statusColors = {
  Available: "default",
  "On Job": "secondary",
  "On Break": "outline",
} as const

const statusIcons = {
  Available: CheckCircle,
  "On Job": AlertTriangle,
  "On Break": Clock,
}

export function AssignDriverDialog({
  open,
  onOpenChange,
  vehicleId,
  vehicleName,
  currentDriver,
}: AssignDriverDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDriver, setSelectedDriver] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredDrivers = mockDrivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.licenseClass.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || driver.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const handleSubmit = () => {
    const driver = mockDrivers.find((d) => d.id === selectedDriver)
    console.log("[v0] Assigning driver to vehicle:", {
      vehicleId,
      vehicleName,
      driverId: selectedDriver,
      driverName: driver?.name,
    })

    // Reset and close
    setSelectedDriver("")
    setSearchTerm("")
    setFilterStatus("all")
    onOpenChange(false)
  }

  const selectedDriverData = mockDrivers.find((d) => d.id === selectedDriver)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Assign Driver</DialogTitle>
          <DialogDescription>
            Assign a driver to {vehicleName} ({vehicleId})
            {currentDriver && <span className="block mt-1 text-muted-foreground">Current driver: {currentDriver}</span>}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Search and Filter */}
          <div className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor="driverSearch">Search Drivers</Label>
              <Input
                id="driverSearch"
                placeholder="Search by name, email, or license class..."
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
                  <SelectItem value="On Job">On Job</SelectItem>
                  <SelectItem value="On Break">On Break</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Driver Selection */}
          <div className="space-y-2">
            <Label>Select Driver</Label>
            <div className="border border-border rounded-md divide-y divide-border max-h-[400px] overflow-y-auto">
              {filteredDrivers.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <User className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No drivers found matching your criteria</p>
                </div>
              ) : (
                filteredDrivers.map((driver) => {
                  const StatusIcon = statusIcons[driver.status as keyof typeof statusIcons]
                  const isSelected = selectedDriver === driver.id

                  return (
                    <div
                      key={driver.id}
                      onClick={() => setSelectedDriver(driver.id)}
                      className={`p-4 cursor-pointer transition-colors hover:bg-accent ${
                        isSelected ? "bg-accent border-l-4 border-l-primary" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {driver.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground">{driver.name}</h4>
                            <Badge
                              variant={statusColors[driver.status as keyof typeof statusColors]}
                              className="text-xs"
                            >
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {driver.status}
                            </Badge>
                          </div>

                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <Phone className="h-3 w-3" />
                              <span>{driver.phone}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Mail className="h-3 w-3" />
                              <span>{driver.email}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                License: {driver.licenseClass}
                              </Badge>
                              {driver.currentVehicle && (
                                <Badge variant="secondary" className="text-xs">
                                  Current: {driver.currentVehicle}
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

          {/* Selected Driver Summary */}
          {selectedDriverData && (
            <div className="p-4 border border-border rounded-md bg-accent/50">
              <h4 className="text-sm font-semibold mb-2">Assignment Summary</h4>
              <div className="text-sm space-y-1">
                <p>
                  <span className="text-muted-foreground">Driver:</span>{" "}
                  <span className="font-medium">{selectedDriverData.name}</span>
                </p>
                <p>
                  <span className="text-muted-foreground">Vehicle:</span>{" "}
                  <span className="font-medium">
                    {vehicleName} ({vehicleId})
                  </span>
                </p>
                {selectedDriverData.currentVehicle && (
                  <p className="text-orange-600 text-xs mt-2">
                    Note: This driver is currently assigned to {selectedDriverData.currentVehicle}. Assigning to{" "}
                    {vehicleId} will unassign them from their current vehicle.
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
          <Button onClick={handleSubmit} disabled={!selectedDriver}>
            Assign Driver
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
