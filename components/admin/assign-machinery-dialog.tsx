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
import { Wrench, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

interface AssignMachineryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  operatorId: string
  operatorName: string
  currentMachinery?: string
}

// Mock machinery - matches the machinery inventory
const mockMachinery = [
  {
    id: "EXC-001",
    machineryId: "EXC-001",
    type: "Excavator",
    make: "Caterpillar",
    model: "320",
    year: 2021,
    serialNumber: "CAT320-2021-001",
    status: "Active",
    location: "Site Alpha - Construction Zone",
    currentOperator: "Robert Thompson",
    hours: 2450,
    alerts: ["Insurance expiring soon"],
  },
  {
    id: "EXC-002",
    machineryId: "EXC-002",
    type: "Excavator",
    make: "Komatsu",
    model: "PC200",
    year: 2022,
    serialNumber: "KOM-PC200-2022-045",
    status: "Active",
    location: "Site Beta - Industrial Park",
    currentOperator: "Jennifer Lee",
    hours: 1890,
    alerts: [],
  },
  {
    id: "BHL-001",
    machineryId: "BHL-001",
    type: "Backhoe Loader",
    make: "JCB",
    model: "3CX",
    year: 2020,
    serialNumber: "JCB-3CX-2020-123",
    status: "Available",
    location: "Depot A - Sunshine",
    currentOperator: null,
    hours: 3200,
    alerts: ["Registration expiring soon", "Insurance expiring soon"],
  },
  {
    id: "DOZ-001",
    machineryId: "DOZ-001",
    type: "Dozer",
    make: "Caterpillar",
    model: "D6T",
    year: 2019,
    serialNumber: "CAT-D6T-2019-087",
    status: "Available",
    location: "Depot B - Dandenong",
    currentOperator: null,
    hours: 4120,
    alerts: [],
  },
  {
    id: "GRD-001",
    machineryId: "GRD-001",
    type: "Grader",
    make: "Caterpillar",
    model: "140M",
    year: 2021,
    serialNumber: "CAT-140M-2021-034",
    status: "Active",
    location: "Site Gamma - Road Works",
    currentOperator: "Sarah Martinez",
    hours: 2780,
    alerts: ["Service overdue", "Insurance expiring soon"],
  },
  {
    id: "SKD-001",
    machineryId: "SKD-001",
    type: "Skid Steer",
    make: "Bobcat",
    model: "S650",
    year: 2022,
    serialNumber: "BOB-S650-2022-156",
    status: "In Maintenance",
    location: "Service Center - Parramatta",
    currentOperator: null,
    hours: 1560,
    alerts: [],
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

export function AssignMachineryDialog({
  open,
  onOpenChange,
  operatorId,
  operatorName,
  currentMachinery,
}: AssignMachineryDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMachinery, setSelectedMachinery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")

  const machineTypes = [...new Set(mockMachinery.map((m) => m.type))].sort()

  const filteredMachinery = mockMachinery.filter((machine) => {
    const matchesSearch =
      machine.machineryId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || machine.status === filterStatus
    const matchesType = filterType === "all" || machine.type === filterType

    return matchesSearch && matchesStatus && matchesType
  })

  const handleSubmit = () => {
    const machine = mockMachinery.find((m) => m.id === selectedMachinery)
    console.log("[v0] Assigning machinery to operator:", {
      operatorId,
      operatorName,
      machineryId: selectedMachinery,
      machineryName: machine ? `${machine.make} ${machine.model}` : "",
    })

    // Reset and close
    setSelectedMachinery("")
    setSearchTerm("")
    setFilterStatus("all")
    setFilterType("all")
    onOpenChange(false)
  }

  const selectedMachineryData = mockMachinery.find((m) => m.id === selectedMachinery)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Assign Machinery</DialogTitle>
          <DialogDescription>
            Assign machinery to {operatorName}
            {currentMachinery && (
              <span className="block mt-1 text-muted-foreground">Current machinery: {currentMachinery}</span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Search and Filter */}
          <div className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor="machinerySearch">Search Machinery</Label>
              <Input
                id="machinerySearch"
                placeholder="Search by ID, type, make, model, or serial number..."
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
                  <SelectItem value="In Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-40">
              <Label htmlFor="typeFilter">Type</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger id="typeFilter" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {machineTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Machinery Selection */}
          <div className="space-y-2">
            <Label>Select Machinery</Label>
            <div className="border border-border rounded-md divide-y divide-border max-h-[400px] overflow-y-auto">
              {filteredMachinery.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Wrench className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No machinery found matching your criteria</p>
                </div>
              ) : (
                filteredMachinery.map((machine) => {
                  const StatusIcon = statusIcons[machine.status as keyof typeof statusIcons]
                  const isSelected = selectedMachinery === machine.id

                  return (
                    <div
                      key={machine.id}
                      onClick={() => setSelectedMachinery(machine.id)}
                      className={`p-4 cursor-pointer transition-colors hover:bg-accent ${
                        isSelected ? "bg-accent border-l-4 border-l-primary" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-md bg-muted">
                          <Wrench className="h-5 w-5 text-muted-foreground" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground">
                              {machine.machineryId} ({machine.make} {machine.model})
                            </h4>
                            <Badge
                              variant={statusColors[machine.status as keyof typeof statusColors]}
                              className="text-xs"
                            >
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {machine.status}
                            </Badge>
                          </div>

                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <span>
                                {machine.type} • {machine.year}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span>{machine.hours.toLocaleString()} hours</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs">{machine.location}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              {machine.currentOperator && (
                                <Badge variant="secondary" className="text-xs">
                                  Current: {machine.currentOperator}
                                </Badge>
                              )}
                              {machine.alerts.length > 0 && (
                                <Badge variant="outline" className="text-xs text-orange-600">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  {machine.alerts.length} alert{machine.alerts.length > 1 ? "s" : ""}
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

          {/* Selected Machinery Summary */}
          {selectedMachineryData && (
            <div className="p-4 border border-border rounded-md bg-accent/50">
              <h4 className="text-sm font-semibold mb-2">Assignment Summary</h4>
              <div className="text-sm space-y-1">
                <p>
                  <span className="text-muted-foreground">Operator:</span>{" "}
                  <span className="font-medium">{operatorName}</span>
                </p>
                <p>
                  <span className="text-muted-foreground">Machinery:</span>{" "}
                  <span className="font-medium">
                    {selectedMachineryData.make} {selectedMachineryData.model} ({selectedMachineryData.machineryId})
                  </span>
                </p>
                <p>
                  <span className="text-muted-foreground">Type:</span>{" "}
                  <span className="font-medium">{selectedMachineryData.type}</span>
                </p>
                {selectedMachineryData.currentOperator && (
                  <p className="text-orange-600 text-xs mt-2">
                    Note: This machinery is currently assigned to {selectedMachineryData.currentOperator}. Assigning to{" "}
                    {operatorName} will unassign the current operator.
                  </p>
                )}
                {selectedMachineryData.alerts.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-border">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Active Alerts:</p>
                    {selectedMachineryData.alerts.map((alert, idx) => (
                      <p key={idx} className="text-xs text-orange-600 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        {alert}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedMachinery}>
            Assign Machinery
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
