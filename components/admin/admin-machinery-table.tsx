"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreVertical, Search, MapPin, User, Calendar, AlertTriangle } from "lucide-react"
import { AdminMachineryStats } from "./admin-machinery-stats"

interface Machinery {
  id: string
  machineryId: string
  type: string
  make: string
  model: string
  year: number
  serialNumber: string
  category: "Internal" | "External"
  currentOperator: string | null
  status: "Active" | "Available" | "In Maintenance" | "Offline"
  location: string
  lastService: string
  nextService: string
  serviceDue: number
  hours: number
  utilisationRate: number
  registrationExpiry: string
  insuranceExpiry: string
  alerts: string[]
}

const mockMachinery: Machinery[] = [
  {
    id: "EXC-001",
    machineryId: "EXC-001",
    type: "Excavator",
    make: "Caterpillar",
    model: "320",
    year: 2021,
    serialNumber: "CAT320-2021-001",
    category: "Internal",
    currentOperator: "Robert Thompson",
    status: "Active",
    location: "Site Alpha - Construction Zone",
    lastService: "2024-01-05",
    nextService: "2024-04-05",
    serviceDue: 35,
    hours: 2450,
    utilisationRate: 85,
    registrationExpiry: "2024-11-15",
    insuranceExpiry: "2024-10-30",
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
    category: "Internal",
    currentOperator: "Jennifer Lee",
    status: "Active",
    location: "Site Beta - Industrial Park",
    lastService: "2023-12-20",
    nextService: "2024-03-20",
    serviceDue: 20,
    hours: 1890,
    utilisationRate: 78,
    registrationExpiry: "2025-02-28",
    insuranceExpiry: "2024-12-15",
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
    category: "Internal",
    currentOperator: "Michael Chen",
    status: "Available",
    location: "Depot A - Sunshine",
    lastService: "2024-01-15",
    nextService: "2024-04-15",
    serviceDue: 45,
    hours: 3200,
    utilisationRate: 65,
    registrationExpiry: "2024-09-10",
    insuranceExpiry: "2024-08-20",
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
    category: "Internal",
    currentOperator: null,
    status: "Available",
    location: "Depot B - Dandenong",
    lastService: "2024-01-10",
    nextService: "2024-04-10",
    serviceDue: 40,
    hours: 4120,
    utilisationRate: 72,
    registrationExpiry: "2025-01-20",
    insuranceExpiry: "2024-11-30",
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
    category: "Internal",
    currentOperator: "Sarah Martinez",
    status: "Active",
    location: "Site Gamma - Road Works",
    lastService: "2023-12-01",
    nextService: "2024-03-01",
    serviceDue: 1,
    hours: 2780,
    utilisationRate: 88,
    registrationExpiry: "2024-12-05",
    insuranceExpiry: "2024-10-15",
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
    category: "Internal",
    currentOperator: "David Wilson",
    status: "In Maintenance",
    location: "Service Center - Parramatta",
    lastService: "2024-01-20",
    nextService: "2024-04-20",
    serviceDue: 50,
    hours: 1560,
    utilisationRate: 0,
    registrationExpiry: "2025-03-15",
    insuranceExpiry: "2025-01-10",
    alerts: [],
  },
]

const statusColors = {
  Active: "default",
  Available: "secondary",
  "In Maintenance": "outline",
  Offline: "destructive",
} as const

export function AdminMachineryTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")

  const filteredMachinery = mockMachinery.filter((machine) => {
    const matchesSearch =
      machine.machineryId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      machine.currentOperator?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || machine.status === filterStatus
    const matchesType = filterType === "all" || machine.type === filterType

    return matchesSearch && matchesStatus && matchesType
  })

  const machineTypes = [...new Set(mockMachinery.map((m) => m.type))].sort()

  return (
    <div className="space-y-6">
      <AdminMachineryStats machinery={mockMachinery} />

      {/* Search and Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search machinery, operators, serial numbers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-muted/50"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px] bg-muted/50">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Available">Available</SelectItem>
            <SelectItem value="In Maintenance">In Maintenance</SelectItem>
            <SelectItem value="Offline">Offline</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px] bg-muted/50">
            <SelectValue placeholder="All Types" />
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

      {/* Machinery Table */}
      <div className="border border-border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Machinery Details</TableHead>
              <TableHead>Type & Specifications</TableHead>
              <TableHead>Current Operator</TableHead>
              <TableHead>Status & Location</TableHead>
              <TableHead>Service Schedule</TableHead>
              <TableHead>Utilisation</TableHead>
              <TableHead>Alerts & Expiries</TableHead>
              <TableHead className="w-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMachinery.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No machinery found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredMachinery.map((machine) => (
                <TableRow key={machine.id}>
                  {/* Machinery Details */}
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-semibold text-foreground">{machine.machineryId}</div>
                      <div className="text-sm text-muted-foreground">{machine.serialNumber}</div>
                      <Badge variant="outline" className="text-xs">
                        {machine.category}
                      </Badge>
                    </div>
                  </TableCell>

                  {/* Type & Specifications */}
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-foreground">{machine.type}</div>
                      <div className="text-sm text-muted-foreground">
                        {machine.make} {machine.model}
                      </div>
                      <div className="text-xs text-muted-foreground">Year: {machine.year}</div>
                      <div className="text-xs text-muted-foreground">{machine.hours.toLocaleString()} hours</div>
                    </div>
                  </TableCell>

                  {/* Current Operator */}
                  <TableCell>
                    {machine.currentOperator ? (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{machine.currentOperator}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Unassigned</span>
                    )}
                  </TableCell>

                  {/* Status & Location */}
                  <TableCell>
                    <div className="space-y-2">
                      <Badge variant={statusColors[machine.status]}>{machine.status}</Badge>
                      <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                        <span>{machine.location}</span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Service Schedule */}
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">Last: {machine.lastService}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span
                          className={
                            machine.serviceDue <= 0
                              ? "text-red-600 font-medium"
                              : machine.serviceDue <= 30
                                ? "text-orange-600 font-medium"
                                : "text-muted-foreground"
                          }
                        >
                          Next: {machine.nextService}
                          {machine.serviceDue <= 0 && " (Overdue)"}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Utilisation */}
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-semibold text-foreground">{machine.utilisationRate}%</div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            machine.utilisationRate >= 80
                              ? "bg-green-500"
                              : machine.utilisationRate >= 60
                                ? "bg-blue-500"
                                : machine.utilisationRate >= 40
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                          }`}
                          style={{ width: `${machine.utilisationRate}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>

                  {/* Alerts & Expiries */}
                  <TableCell>
                    {machine.alerts.length > 0 ? (
                      <div className="space-y-1">
                        {machine.alerts.slice(0, 2).map((alert, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-xs">
                            <AlertTriangle className="h-3.5 w-3.5 text-red-600" />
                            <span className="text-red-600">{alert}</span>
                          </div>
                        ))}
                        {machine.alerts.length > 2 && (
                          <div className="text-xs text-muted-foreground">+{machine.alerts.length - 2} more</div>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">No alerts</span>
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Machinery</DropdownMenuItem>
                        <DropdownMenuItem>View Documents</DropdownMenuItem>
                        <DropdownMenuItem>Assign Operator</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Service History</DropdownMenuItem>
                        <DropdownMenuItem>Machinery Settings</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
