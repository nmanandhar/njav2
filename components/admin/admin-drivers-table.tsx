"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  MoreVertical,
  Eye,
  Settings,
  Truck,
  FileText,
  AlertTriangle,
  User,
  CheckCircle,
  Clock,
  Mail,
  Smartphone,
  Pencil,
  Calendar,
} from "lucide-react"
import { ViewDriverDetailsDialog } from "./view-driver-details-dialog"
import { DriverSettingsDialog } from "./driver-settings-dialog"
import { EditDriverDialog } from "./edit-driver-dialog"
import { AssignVehicleDialog } from "./assign-vehicle-dialog"
import { DriverDocumentsDialog } from "./driver-documents-dialog"
import { DriverScheduleDialog } from "./driver-schedule-dialog"

function calculateDriverAlerts(driver: any) {
  const alerts: { type: string; message: string; severity: "critical" | "warning" }[] = []
  const today = new Date()

  // Check license expiry
  if (driver.licenseExpiry) {
    const expiry = new Date(driver.licenseExpiry)
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntilExpiry <= 0) {
      alerts.push({ type: "license", message: "License expired", severity: "critical" })
    } else if (daysUntilExpiry <= 30) {
      alerts.push({ type: "license", message: "License expiring soon", severity: "warning" })
    }
  }

  // Check medical expiry
  if (driver.medicalExpiry) {
    const expiry = new Date(driver.medicalExpiry)
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntilExpiry <= 0) {
      alerts.push({ type: "medical", message: "Medical expired", severity: "critical" })
    } else if (daysUntilExpiry <= 30) {
      alerts.push({ type: "medical", message: "Medical expiring soon", severity: "warning" })
    }
  }

  // Check white card status and expiry
  if (driver.whiteCardStatus === "Expired") {
    alerts.push({ type: "whitecard", message: "White Card expired", severity: "critical" })
  } else if (driver.whiteCardExpiry) {
    const expiry = new Date(driver.whiteCardExpiry)
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntilExpiry > 0 && daysUntilExpiry <= 30) {
      alerts.push({ type: "whitecard", message: "White Card expiring soon", severity: "warning" })
    }
  }

  // Check fatigue management status and expiry
  if (driver.fatigueStatus === "Expired") {
    alerts.push({ type: "fatigue", message: "Fatigue Mgmt expired", severity: "critical" })
  } else if (driver.fatigueExpiry) {
    const expiry = new Date(driver.fatigueExpiry)
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntilExpiry > 0 && daysUntilExpiry <= 30) {
      alerts.push({ type: "fatigue", message: "Fatigue Mgmt expiring soon", severity: "warning" })
    }
  }

  // Check NJA Induction
  if (driver.njaInduction === "Expired") {
    alerts.push({ type: "induction", message: "NJA Induction expired", severity: "critical" })
  }

  // Check vehicle rego expiry (if assigned to vehicle)
  if (driver.vehicleRegoExpiry && driver.vehicleId) {
    const expiry = new Date(driver.vehicleRegoExpiry)
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntilExpiry <= 0) {
      alerts.push({ type: "rego", message: "Vehicle rego expired", severity: "critical" })
    } else if (daysUntilExpiry <= 30) {
      alerts.push({ type: "rego", message: "Vehicle rego expiring soon", severity: "warning" })
    }
  }

  return alerts
}

const mockDriversBase = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+61 412 345 678",
    vehicle: "FL-001 (Volvo FH16)",
    vehicleId: "FL-001",
    vehicleMake: "Volvo FH16",
    vehicleYear: "2022",
    vehicleRego: "ABC-123",
    vehicleRegoExpiry: "2025-03-15",
    status: "Active",
    type: "Internal",
    location: "Site Alpha - Construction Zone",
    job: "JOB-2024-001",
    utilisation: 87,
    lastService: "2024-01-10",
    nextService: "45d",
    licenseNumber: "LIC-12345",
    licenseClass: "HC",
    licenseExpiry: "2025-06-15",
    hourlyRateWeekday: "$55/hr",
    hourlyRateWeekend: "$68/hr",
    nightRateWeekday: "$65/hr",
    nightRateWeekend: "$75/hr",
    appAccess: "Active",
    lastLogin: "2024-01-15 09:30",
    lastMedical: "2024-01-10",
    medicalExpiry: "2024-01-10", // Expired
    njaInduction: "Valid",
    siteInductions: 3,
    whiteCardExpiry: "2023-08-20", // Expired
    whiteCardStatus: "Expired",
    vocScore: 95,
    fatigueExpiry: "2024-01-10", // Expired
    fatigueStatus: "Expired",
    safetyRating: 95,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+61 423 456 789",
    vehicle: "FL-002 (Scania R500)",
    vehicleId: "FL-002",
    vehicleMake: "Scania R500",
    vehicleYear: "2021",
    vehicleRego: "XYZ-789",
    vehicleRegoExpiry: "2025-05-20",
    status: "Active",
    type: "Internal",
    location: "Site Beta - Warehouse District",
    job: "JOB-2024-002",
    utilisation: 92,
    lastService: "2024-01-05",
    nextService: "60d",
    licenseNumber: "LIC-23456",
    licenseClass: "HC",
    licenseExpiry: "2026-03-20",
    hourlyRateWeekday: "$58/hr",
    hourlyRateWeekend: "$70/hr",
    nightRateWeekday: "$68/hr",
    nightRateWeekend: "$78/hr",
    appAccess: "Active",
    lastLogin: "2024-01-14 16:45",
    lastMedical: "2024-02-15",
    medicalExpiry: "2025-02-15",
    njaInduction: "Valid",
    siteInductions: 5,
    whiteCardExpiry: "2026-11-30",
    whiteCardStatus: "Valid",
    vocScore: 88,
    fatigueExpiry: "2026-03-15",
    fatigueStatus: "Valid",
    safetyRating: 88,
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike.chen@example.com",
    phone: "+61 434 567 890",
    vehicle: "Unassigned",
    vehicleId: "",
    vehicleMake: "",
    vehicleYear: "",
    vehicleRego: "",
    vehicleRegoExpiry: "",
    status: "Inactive",
    type: "Subcontractor",
    location: "-",
    job: "-",
    utilisation: 0,
    lastService: "-",
    nextService: "-",
    licenseNumber: "LIC-34567",
    licenseClass: "MC",
    licenseExpiry: "2025-12-10",
    hourlyRateWeekday: "$52/hr",
    hourlyRateWeekend: "$65/hr",
    nightRateWeekday: "$62/hr",
    nightRateWeekend: "$72/hr",
    appAccess: "Inactive",
    lastLogin: "2023-12-20 11:15",
    lastMedical: "2023-11-20",
    medicalExpiry: "2024-11-20",
    njaInduction: "Expired",
    siteInductions: 1,
    whiteCardExpiry: "2024-05-15",
    whiteCardStatus: "Expired",
    vocScore: 72,
    fatigueExpiry: "2024-08-30",
    fatigueStatus: "Expired",
    safetyRating: 72,
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "+61 445 678 901",
    vehicle: "FL-004 (MAN TGX)",
    vehicleId: "FL-004",
    vehicleMake: "MAN TGX",
    vehicleYear: "2023",
    vehicleRego: "GHI-101",
    vehicleRegoExpiry: "2025-07-10",
    status: "Active",
    type: "Internal",
    location: "Site Gamma - Port Area",
    job: "JOB-2024-004",
    utilisation: 78,
    lastService: "2024-01-12",
    nextService: "30d",
    licenseNumber: "LIC-45678",
    licenseClass: "HC",
    licenseExpiry: "2027-08-25",
    hourlyRateWeekday: "$60/hr",
    hourlyRateWeekend: "$72/hr",
    nightRateWeekday: "$70/hr",
    nightRateWeekend: "$80/hr",
    appAccess: "Active",
    lastLogin: "2024-01-15 08:20",
    lastMedical: "2024-03-05",
    medicalExpiry: "2025-03-05",
    njaInduction: "Valid",
    siteInductions: 4,
    whiteCardExpiry: "2027-02-28",
    whiteCardStatus: "Valid",
    vocScore: 91,
    fatigueExpiry: "2026-12-20",
    fatigueStatus: "Valid",
    safetyRating: 91,
  },
  {
    id: "5",
    name: "David Martinez",
    email: "david.martinez@example.com",
    phone: "+61 456 789 012",
    vehicle: "FL-005 (Mercedes Actros)",
    vehicleId: "FL-005",
    vehicleMake: "Mercedes Actros",
    vehicleYear: "2022",
    vehicleRego: "JKL-202",
    vehicleRegoExpiry: "2025-09-25",
    status: "Active",
    type: "Subcontractor",
    location: "Site Delta - Industrial Park",
    job: "JOB-2024-005",
    utilisation: 95,
    lastService: "2024-01-08",
    nextService: "55d",
    licenseNumber: "LIC-56789",
    licenseClass: "MC",
    licenseExpiry: "2026-11-15",
    hourlyRateWeekday: "$57/hr",
    hourlyRateWeekend: "$69/hr",
    nightRateWeekday: "$67/hr",
    nightRateWeekend: "$77/hr",
    appAccess: "Active",
    lastLogin: "2024-01-15 07:45",
    lastMedical: "2024-01-20",
    medicalExpiry: "2025-01-20",
    njaInduction: "Valid",
    siteInductions: 2,
    whiteCardExpiry: "2025-02-28",
    whiteCardStatus: "Expiring Soon",
    vocScore: 86,
    fatigueExpiry: "2025-04-10",
    fatigueStatus: "Valid",
    safetyRating: 86,
  },
]

const mockDrivers = mockDriversBase.map((driver) => ({
  ...driver,
  alerts: calculateDriverAlerts(driver),
}))

const statusColors = {
  Active: "default",
  "Off Duty": "secondary",
  "On Leave": "secondary",
  Suspended: "destructive",
} as const

export function AdminDriversTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [alertFilter, setAlertFilter] = useState("all")
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState<(typeof mockDrivers)[0] | null>(null)
  const [driverSettingsOpen, setDriverSettingsOpen] = useState(false)
  const [editDriverOpen, setEditDriverOpen] = useState(false)
  const [assignVehicleOpen, setAssignVehicleOpen] = useState(false)
  const [selectedDriverForAssignment, setSelectedDriverForAssignment] = useState<any | null>(null)
  const [selectedDriverForDocuments, setSelectedDriverForDocuments] = useState<(typeof mockDrivers)[0] | null>(null)
  const [viewScheduleOpen, setViewScheduleOpen] = useState(false)
  const [selectedDriverForSchedule, setSelectedDriverForSchedule] = useState<(typeof mockDrivers)[0] | null>(null)

  const filteredDrivers = mockDrivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || driver.status === statusFilter
    const matchesType = typeFilter === "all" || driver.type === typeFilter
    const matchesAlert = alertFilter === "all" || (alertFilter === "alerts" && driver.alerts.length > 0)

    return matchesSearch && matchesStatus && matchesType && matchesAlert
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="h-3 w-3 text-green-600" />
      case "Off Duty":
        return <Clock className="h-3 w-3 text-blue-600" />
      case "On Leave":
        return <Clock className="h-3 w-3 text-gray-600" />
      default:
        return <AlertTriangle className="h-3 w-3 text-red-600" />
    }
  }

  const getExpiryColor = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntilExpiry <= 0) return "text-red-600"
    if (daysUntilExpiry <= 30) return "text-orange-600"
    if (daysUntilExpiry <= 90) return "text-yellow-600"
    return "text-green-600"
  }

  const handleViewDetails = (driver: (typeof mockDrivers)[0]) => {
    setSelectedDriver(driver)
    setViewDetailsOpen(true)
  }

  const handleDriverSettings = (driver: (typeof mockDrivers)[0]) => {
    setSelectedDriver(driver)
    setDriverSettingsOpen(true)
  }

  const handleEditDriver = (driver: (typeof mockDrivers)[0]) => {
    setSelectedDriver(driver)
    setEditDriverOpen(true)
  }

  const handleAssignVehicle = (driver: any) => {
    setSelectedDriverForAssignment(driver)
    setAssignVehicleOpen(true)
  }

  const handleViewDocuments = (driver: (typeof mockDrivers)[0]) => {
    setSelectedDriverForDocuments(driver)
  }

  const handleViewSchedule = (driver: (typeof mockDrivers)[0]) => {
    setSelectedDriverForSchedule(driver)
    setViewScheduleOpen(true)
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow className="border-border">
            <TableHead className="text-muted-foreground">Driver Details</TableHead>
            <TableHead className="text-muted-foreground">Vehicle & Driver License</TableHead>
            <TableHead className="text-muted-foreground">Compliance</TableHead>
            <TableHead className="text-muted-foreground">Safety & Performance</TableHead>
            <TableHead className="text-muted-foreground">Rates</TableHead>
            <TableHead className="text-muted-foreground">Mobile App Access</TableHead>
            <TableHead className="text-muted-foreground">Alerts & Expiries</TableHead>
            <TableHead className="text-muted-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDrivers.map((driver) => (
            <TableRow key={driver.id} className="border-border">
              <TableCell className="font-medium text-foreground">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-semibold">{driver.name}</div>
                      <div className="text-sm text-foreground">{driver.email}</div>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                        <Mail className="h-3 w-3" />
                        <span>{driver.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  {driver.vehicle !== "Unassigned" ? (
                    <div className="flex items-center space-x-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-xs font-medium text-foreground">{driver.vehicle}</div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {driver.type}
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Truck className="h-4 w-4" />
                      <span className="text-xs">No vehicle assigned</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(driver.status)}
                    <Badge variant={statusColors[driver.status as keyof typeof statusColors]} className="text-xs">
                      {driver.status}
                    </Badge>
                  </div>
                  {/* Heavy Vehicle License info */}
                  <div className="pt-2 border-t border-border space-y-1">
                    <div className="flex items-center space-x-1">
                      <FileText className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-foreground">{driver.licenseNumber}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Class {driver.licenseClass}
                    </Badge>
                    <div className={`text-xs ${getExpiryColor(driver.licenseExpiry)}`}>Exp: {driver.licenseExpiry}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <FileText className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs font-medium">NJA Induction</span>
                    <Badge variant={driver.njaInduction === "Valid" ? "default" : "destructive"} className="text-xs">
                      {driver.njaInduction}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FileText className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs font-medium">Site Inductions</span>
                    <Badge variant="outline" className="text-xs">
                      {driver.siteInductions} {driver.siteInductions === 1 ? "site" : "sites"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FileText className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs font-medium">White Card</span>
                    <Badge
                      variant={
                        driver.whiteCardStatus === "Valid"
                          ? "default"
                          : driver.whiteCardStatus === "Expiring Soon"
                            ? "secondary"
                            : "destructive"
                      }
                      className="text-xs"
                    >
                      {driver.whiteCardStatus}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FileText className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs font-medium">Medical</span>
                    <Badge
                      variant={
                        driver.medicalExpiry && new Date(driver.medicalExpiry) < new Date() ? "destructive" : "default"
                      }
                      className="text-xs"
                    >
                      {driver.medicalExpiry && new Date(driver.medicalExpiry) < new Date() ? "Expired" : "Valid"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FileText className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs font-medium">VOC Assessment</span>
                    <Badge variant="outline" className="text-xs">
                      {driver.vocScore}%
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FileText className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs font-medium">Fatigue Mgmt</span>
                    <Badge variant={driver.fatigueStatus === "Valid" ? "default" : "destructive"} className="text-xs">
                      {driver.fatigueStatus}
                    </Badge>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-xs text-foreground">Safety Score</div>
                  <div className="text-lg font-bold text-foreground">{driver.safetyRating}%</div>
                  {/* <Progress value={driver.safetyRating} className="h-1 w-24" /> */}
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  <div>
                    <div className="text-xs font-medium text-foreground mb-1">Hourly Rate</div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        WD: {driver.hourlyRateWeekday}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        WE: {driver.hourlyRateWeekend}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-foreground mb-1">Night Rate</div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        WD: {driver.nightRateWeekday}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        WE: {driver.nightRateWeekend}
                      </Badge>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <Badge variant={driver.appAccess === "Active" ? "default" : "secondary"} className="text-xs">
                      {driver.appAccess}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <div className="font-medium">Last Login:</div>
                    <div>{driver.lastLogin}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  {driver.alerts.length > 0 ? (
                    <div className="space-y-1">
                      {driver.alerts.slice(0, 2).map((alert, index) => (
                        <div key={index} className="flex items-center space-x-1">
                          <AlertTriangle className="h-3 w-3 text-orange-600" />
                          <span className="text-xs text-orange-600">{alert.message}</span>
                        </div>
                      ))}
                      {driver.alerts.length > 2 && (
                        <div className="text-xs text-muted-foreground">+{driver.alerts.length - 2} more</div>
                      )}
                    </div>
                  ) : (
                    <div className="text-xs text-green-600">No alerts</div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleViewDetails(driver)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditDriver(driver)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit Driver
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleViewSchedule(driver)}>
                      <Calendar className="mr-2 h-4 w-4" />
                      View Schedule
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleViewDocuments(driver)}>
                      <FileText className="mr-2 h-4 w-4" />
                      View Documents
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAssignVehicle(driver)}>
                      <Truck className="mr-2 h-4 w-4" />
                      Assign Vehicle
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDriverSettings(driver)}>
                      <Settings className="mr-2 h-4 w-4" />
                      Driver Settings
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredDrivers.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No drivers found matching your criteria.</p>
        </div>
      )}

      {selectedDriver && (
        <>
          <ViewDriverDetailsDialog
            driver={{
              driverId: selectedDriver.id,
              name: selectedDriver.name,
              email: selectedDriver.email,
              phone: selectedDriver.phone,
              licenseNumber: selectedDriver.licenseNumber,
              licenseClass: selectedDriver.licenseClass,
              licenseExpiry: selectedDriver.licenseExpiry,
              type: selectedDriver.type,
              status: selectedDriver.status,
              currentVehicle: selectedDriver.vehicle,
              lastMedical: "2023-08-15",
              medicalExpiry: selectedDriver.medicalExpiry,
              inductionStatus: selectedDriver.njaInduction,
              whiteCard: selectedDriver.whiteCardStatus === "Valid" ? "2026-12-31" : "2024-01-15",
              safetyRating: selectedDriver.safetyRating,
              hourlyRate: {
                weekday: Number.parseInt(selectedDriver.hourlyRateWeekday.replace(/\D/g, "")),
                weekend: Number.parseInt(selectedDriver.hourlyRateWeekend.replace(/\D/g, "")),
              },
              nightRate: {
                weekday: Number.parseInt(selectedDriver.nightRateWeekday.replace(/\D/g, "")),
                weekend: Number.parseInt(selectedDriver.nightRateWeekend.replace(/\D/g, "")),
              },
            }}
            open={viewDetailsOpen}
            onOpenChange={setViewDetailsOpen}
          />
          <EditDriverDialog driver={selectedDriver} open={editDriverOpen} onOpenChange={setEditDriverOpen} />
          <DriverSettingsDialog
            driver={{
              id: selectedDriver.id,
              name: selectedDriver.name,
              email: selectedDriver.email,
              phone: selectedDriver.phone,
            }}
            open={driverSettingsOpen}
            onOpenChange={setDriverSettingsOpen}
          />
        </>
      )}

      {selectedDriverForAssignment && (
        <AssignVehicleDialog
          open={assignVehicleOpen}
          onOpenChange={setAssignVehicleOpen}
          driverId={selectedDriverForAssignment.id}
          driverName={selectedDriverForAssignment.name}
          currentVehicle={selectedDriverForAssignment.assignedVehicles?.[0] || undefined}
        />
      )}

      {selectedDriverForDocuments && (
        <DriverDocumentsDialog
          driver={{
            id: selectedDriverForDocuments.id,
            name: selectedDriverForDocuments.name,
            email: selectedDriverForDocuments.email,
            licenseNumber: selectedDriverForDocuments.licenseNumber,
          }}
          open={!!selectedDriverForDocuments}
          onOpenChange={(open) => {
            if (!open) setSelectedDriverForDocuments(null)
          }}
        />
      )}

      {selectedDriverForSchedule && (
        <DriverScheduleDialog
          open={viewScheduleOpen}
          onOpenChange={setViewScheduleOpen}
          driver={selectedDriverForSchedule}
        />
      )}
    </div>
  )
}
