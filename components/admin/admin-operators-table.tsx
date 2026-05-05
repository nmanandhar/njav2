"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { MoreVertical } from "lucide-react"
import { ViewOperatorDetailsDialog } from "./view-operator-details-dialog"
import { EditOperatorDialog } from "./edit-operator-dialog"
import { OperatorDocumentsDialog } from "./operator-documents-dialog"
import { AssignMachineryDialog } from "./assign-machinery-dialog"
import { OperatorScheduleDialog } from "./operator-schedule-dialog"
import { OperatorSettingsDialog } from "./operator-settings-dialog"
import { Mail, Eye, Edit, FileText, Settings, Smartphone, Construction, AlertTriangle, Calendar } from "lucide-react"

function calculateOperatorAlerts(operator: any) {
  const alerts: { type: string; message: string; severity: "critical" | "warning" }[] = []
  const today = new Date()

  // Check license expiry (from Machinery & License column)
  if (operator.licenseExpiry) {
    const expiry = new Date(operator.licenseExpiry)
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntilExpiry <= 0) {
      alerts.push({ type: "license", message: "License expired", severity: "critical" })
    } else if (daysUntilExpiry <= 30) {
      alerts.push({ type: "license", message: "License expiring soon", severity: "warning" })
    }
  }

  // Check medical expiry (from Compliance column)
  if (operator.medicalExpiry) {
    const expiry = new Date(operator.medicalExpiry)
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntilExpiry <= 0) {
      alerts.push({ type: "medical", message: "Medical expired", severity: "critical" })
    } else if (daysUntilExpiry <= 30) {
      alerts.push({ type: "medical", message: "Medical expiring soon", severity: "warning" })
    }
  }

  // Check white card status and expiry (from Compliance column)
  if (operator.whiteCardStatus === "Expired") {
    alerts.push({ type: "whitecard", message: "White Card expired", severity: "critical" })
  } else if (operator.whiteCardExpiry) {
    const expiry = new Date(operator.whiteCardExpiry)
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntilExpiry > 0 && daysUntilExpiry <= 30) {
      alerts.push({ type: "whitecard", message: "White Card expiring soon", severity: "warning" })
    }
  }

  // Check fatigue management status and expiry (from Compliance column)
  if (operator.fatigueStatus === "Expired") {
    alerts.push({ type: "fatigue", message: "Fatigue Mgmt expired", severity: "critical" })
  } else if (operator.fatigueExpiry) {
    const expiry = new Date(operator.fatigueExpiry)
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntilExpiry > 0 && daysUntilExpiry <= 30) {
      alerts.push({ type: "fatigue", message: "Fatigue Mgmt expiring soon", severity: "warning" })
    }
  }

  // Check NJA Induction (from Compliance column)
  if (operator.njaInduction === "Expired") {
    alerts.push({ type: "induction", message: "NJA Induction expired", severity: "critical" })
  }

  return alerts
}

const mockOperatorsBase = [
  {
    id: "1",
    name: "Robert Thompson",
    email: "robert.thompson@example.com",
    phone: "+61 412 987 654",
    machinery: "EXC-001 (Caterpillar 320)",
    machineryId: "EXC-001",
    machineryType: "Excavator",
    machineryMake: "Caterpillar 320",
    machineryYear: "2022",
    status: "Active",
    type: "Internal",
    licenseNumber: "LIC-87654",
    licenseClass: "RII",
    licenseExpiry: "2025-08-15",
    hourlyRateWeekday: "$65/hr",
    hourlyRateWeekend: "$78/hr",
    nightRateWeekday: "$75/hr",
    nightRateWeekend: "$85/hr",
    appAccess: "Active",
    lastLogin: "2024-01-15 10:15",
    lastMedical: "2024-02-01",
    medicalExpiry: "2025-02-01",
    njaInduction: "Valid",
    siteInductions: 4,
    whiteCardExpiry: "2026-05-20",
    whiteCardStatus: "Valid",
    vocScore: 92,
    fatigueExpiry: "2026-01-15",
    fatigueStatus: "Valid",
    safetyRating: 92,
  },
  {
    id: "2",
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    phone: "+61 423 876 543",
    machinery: "EXC-002 (Komatsu PC200)",
    machineryId: "EXC-002",
    machineryType: "Excavator",
    machineryMake: "Komatsu PC200",
    machineryYear: "2021",
    status: "Active",
    type: "Internal",
    licenseNumber: "LIC-98765",
    licenseClass: "RII",
    licenseExpiry: "2026-04-10",
    hourlyRateWeekday: "$68/hr",
    hourlyRateWeekend: "$80/hr",
    nightRateWeekday: "$78/hr",
    nightRateWeekend: "$88/hr",
    appAccess: "Active",
    lastLogin: "2024-01-14 15:30",
    lastMedical: "2024-03-15",
    medicalExpiry: "2025-03-15",
    njaInduction: "Valid",
    siteInductions: 6,
    whiteCardExpiry: "2027-02-28",
    whiteCardStatus: "Valid",
    vocScore: 89,
    fatigueExpiry: "2026-06-20",
    fatigueStatus: "Valid",
    safetyRating: 89,
  },
  {
    id: "3",
    name: "Marcus Brown",
    email: "marcus.brown@example.com",
    phone: "+61 434 765 432",
    machinery: "Unassigned",
    machineryId: "",
    machineryType: "",
    machineryMake: "",
    machineryYear: "",
    status: "Inactive",
    type: "Subcontractor",
    licenseNumber: "LIC-76543",
    licenseClass: "RII",
    licenseExpiry: "2025-11-30",
    hourlyRateWeekday: "$62/hr",
    hourlyRateWeekend: "$75/hr",
    nightRateWeekday: "$72/hr",
    nightRateWeekend: "$82/hr",
    appAccess: "Inactive",
    lastLogin: "2023-12-10 09:45",
    lastMedical: "2023-10-20",
    medicalExpiry: "2024-10-20",
    njaInduction: "Expired",
    siteInductions: 2,
    whiteCardExpiry: "2024-03-15",
    whiteCardStatus: "Expired",
    vocScore: 75,
    fatigueExpiry: "2024-07-10",
    fatigueStatus: "Expired",
    safetyRating: 75,
  },
  {
    id: "4",
    name: "Amy Chen",
    email: "amy.chen@example.com",
    phone: "+61 445 654 321",
    machinery: "EXC-004 (Hitachi ZX350)",
    machineryId: "EXC-004",
    machineryType: "Excavator",
    machineryMake: "Hitachi ZX350",
    machineryYear: "2023",
    status: "Active",
    type: "Internal",
    licenseNumber: "LIC-65432",
    licenseClass: "RII",
    licenseExpiry: "2027-09-25",
    hourlyRateWeekday: "$70/hr",
    hourlyRateWeekend: "$82/hr",
    nightRateWeekday: "$80/hr",
    nightRateWeekend: "$90/hr",
    appAccess: "Active",
    lastLogin: "2024-01-15 08:00",
    lastMedical: "2024-04-05",
    medicalExpiry: "2025-04-05",
    njaInduction: "Valid",
    siteInductions: 5,
    whiteCardExpiry: "2027-08-15",
    whiteCardStatus: "Valid",
    vocScore: 94,
    fatigueExpiry: "2027-01-20",
    fatigueStatus: "Valid",
    safetyRating: 94,
  },
  {
    id: "5",
    name: "Daniel Foster",
    email: "daniel.foster@example.com",
    phone: "+61 456 543 210",
    machinery: "BLD-001 (CAT D6T)",
    machineryId: "BLD-001",
    machineryType: "Bulldozer",
    machineryMake: "CAT D6T",
    machineryYear: "2022",
    status: "Active",
    type: "Subcontractor",
    licenseNumber: "LIC-54321",
    licenseClass: "RII",
    licenseExpiry: "2026-12-15",
    hourlyRateWeekday: "$67/hr",
    hourlyRateWeekend: "$79/hr",
    nightRateWeekday: "$77/hr",
    nightRateWeekend: "$87/hr",
    appAccess: "Active",
    lastLogin: "2024-01-15 07:20",
    lastMedical: "2024-01-25",
    medicalExpiry: "2025-01-25",
    njaInduction: "Valid",
    siteInductions: 3,
    whiteCardExpiry: "2025-03-10",
    whiteCardStatus: "Expiring Soon",
    vocScore: 87,
    fatigueExpiry: "2025-05-15",
    fatigueStatus: "Valid",
    safetyRating: 87,
  },
]

const mockOperators = mockOperatorsBase.map((operator) => ({
  ...operator,
  alerts: calculateOperatorAlerts(operator),
}))

const statusColors = {
  Active: "default",
  "Off Duty": "secondary",
  "On Leave": "secondary",
  Suspended: "destructive",
} as const

export function AdminOperatorsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedOperatorForDetails, setSelectedOperatorForDetails] = useState<(typeof mockOperators)[0] | null>(null)
  const [selectedOperatorForEdit, setSelectedOperatorForEdit] = useState<(typeof mockOperators)[0] | null>(null)
  const [selectedOperatorForDocuments, setSelectedOperatorForDocuments] = useState<(typeof mockOperators)[0] | null>(
    null,
  )
  const [selectedOperatorForMachinery, setSelectedOperatorForMachinery] = useState<(typeof mockOperators)[0] | null>(
    null,
  )
  const [selectedOperatorForSchedule, setSelectedOperatorForSchedule] = useState<(typeof mockOperators)[0] | null>(null)
  const [selectedOperatorForSettings, setSelectedOperatorForSettings] = useState<(typeof mockOperators)[0] | null>(null)
  const [viewScheduleOpen, setViewScheduleOpen] = useState(false)
  const [assignMachineryOpen, setAssignMachineryOpen] = useState(false)
  const [operatorSettingsOpen, setOperatorSettingsOpen] = useState(false)

  const filteredOperators = mockOperators.filter((operator) => {
    const matchesSearch =
      operator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operator.machinery.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || operator.status === statusFilter
    const matchesType = typeFilter === "all" || operator.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const handleViewDetails = (operator: (typeof mockOperators)[0]) => {
    setSelectedOperatorForDetails(operator)
  }

  const handleEditOperator = (operator: (typeof mockOperators)[0]) => {
    setSelectedOperatorForEdit(operator)
  }

  const handleViewDocuments = (operator: (typeof mockOperators)[0]) => {
    setSelectedOperatorForDocuments(operator)
  }

  const handleAssignMachinery = (operator: (typeof mockOperators)[0]) => {
    setSelectedOperatorForMachinery(operator)
    setAssignMachineryOpen(true)
  }

  const handleViewSchedule = (operator: (typeof mockOperators)[0]) => {
    setSelectedOperatorForSchedule(operator)
    setViewScheduleOpen(true)
  }

  const handleOperatorSettings = (operator: (typeof mockOperators)[0]) => {
    setSelectedOperatorForSettings(operator)
    setOperatorSettingsOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-lg">
        <div className="p-4 border-b border-border">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search operators, machinery, licenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-input border-border">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Filter by Status</SelectLabel>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48 bg-input border-border">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Filter by Type</SelectLabel>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Internal">Internal</SelectItem>
                  <SelectItem value="Subcontractor">Subcontractor</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Operator Details</TableHead>
                <TableHead className="text-muted-foreground">Machinery & License</TableHead>
                <TableHead className="text-muted-foreground">Compliance</TableHead>
                <TableHead className="text-muted-foreground">Safety & Performance</TableHead>
                <TableHead className="text-muted-foreground">Rates</TableHead>
                <TableHead className="text-muted-foreground">Mobile App Access</TableHead>
                <TableHead className="text-muted-foreground">Alerts & Expiries</TableHead>
                <TableHead className="text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOperators.map((operator) => (
                <TableRow key={operator.id} className="border-border">
                  <TableCell className="font-medium text-foreground">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {operator.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{operator.name}</div>
                        <div className="text-sm text-foreground">{operator.email}</div>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                          <Mail className="h-3 w-3" />
                          <span>{operator.phone}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      {operator.machinery !== "Unassigned" ? (
                        <div className="flex items-center space-x-2">
                          <Construction className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="text-xs font-medium text-foreground">{operator.machinery}</div>
                            <Badge variant="outline" className="text-xs mt-1">
                              {operator.type}
                            </Badge>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Construction className="h-4 w-4" />
                          <span className="text-xs">No machinery assigned</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <FileText className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs font-medium">NJA Induction</span>
                        <Badge
                          variant={operator.njaInduction === "Valid" ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {operator.njaInduction}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FileText className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs font-medium">Site Inductions</span>
                        <Badge variant="outline" className="text-xs">
                          {operator.siteInductions} {operator.siteInductions === 1 ? "site" : "sites"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FileText className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs font-medium">White Card</span>
                        <Badge
                          variant={
                            operator.whiteCardStatus === "Valid"
                              ? "default"
                              : operator.whiteCardStatus === "Expiring Soon"
                                ? "secondary"
                                : "destructive"
                          }
                          className="text-xs"
                        >
                          {operator.whiteCardStatus}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FileText className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs font-medium">Medical</span>
                        <Badge
                          variant={
                            operator.medicalExpiry && new Date(operator.medicalExpiry) < new Date()
                              ? "destructive"
                              : "default"
                          }
                          className="text-xs"
                        >
                          {operator.medicalExpiry && new Date(operator.medicalExpiry) < new Date()
                            ? "Expired"
                            : "Valid"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FileText className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs font-medium">VOC Assessment</span>
                        <Badge variant="outline" className="text-xs">
                          {operator.vocScore}%
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FileText className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs font-medium">Fatigue Mgmt</span>
                        <Badge
                          variant={operator.fatigueStatus === "Valid" ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {operator.fatigueStatus}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-xs text-foreground">Safety Score</div>
                      <div className="text-lg font-bold text-foreground">{operator.safetyRating}%</div>
                      <Progress value={operator.safetyRating} className="h-1 w-24" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div>
                        <div className="text-xs font-medium text-foreground mb-1">Hourly Rate</div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            WD: {operator.hourlyRateWeekday}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            WE: {operator.hourlyRateWeekend}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-foreground mb-1">Night Rate</div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            WD: {operator.nightRateWeekday}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            WE: {operator.nightRateWeekend}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                        <Badge variant={operator.appAccess === "Active" ? "default" : "secondary"} className="text-xs">
                          {operator.appAccess}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <div className="font-medium">Last Login:</div>
                        <div>{operator.lastLogin}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {operator.alerts.length > 0 ? (
                        <div className="space-y-1">
                          {operator.alerts.slice(0, 2).map((alert, index) => (
                            <div key={index} className="flex items-center space-x-1">
                              <AlertTriangle
                                className={`h-3 w-3 ${alert.severity === "critical" ? "text-red-600" : "text-orange-600"}`}
                              />
                              <span
                                className={`text-xs ${alert.severity === "critical" ? "text-red-600" : "text-orange-600"}`}
                              >
                                {alert.message}
                              </span>
                            </div>
                          ))}
                          {operator.alerts.length > 2 && (
                            <div className="text-xs text-muted-foreground">+{operator.alerts.length - 2} more</div>
                          )}
                        </div>
                      ) : (
                        <div className="text-xs text-green-600">No alerts</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(operator)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditOperator(operator)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Operator
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewSchedule(operator)}>
                          <Calendar className="mr-2 h-4 w-4" />
                          View Schedule
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewDocuments(operator)}>
                          <FileText className="mr-2 h-4 w-4" />
                          View Documents
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAssignMachinery(operator)}>
                          <Construction className="mr-2 h-4 w-4" />
                          Assign Machinery
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleOperatorSettings(operator)}>
                          <Settings className="mr-2 h-4 w-4" />
                          Operator Settings
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {selectedOperatorForDetails && (
        <ViewOperatorDetailsDialog
          operator={{
            id: selectedOperatorForDetails.id,
            name: selectedOperatorForDetails.name,
            email: selectedOperatorForDetails.email,
            phone: selectedOperatorForDetails.phone,
            machinery: selectedOperatorForDetails.machinery,
            machineryId: selectedOperatorForDetails.machineryId,
            machineryType: selectedOperatorForDetails.machineryType,
            machineryMake: selectedOperatorForDetails.machineryMake,
            machineryYear: selectedOperatorForDetails.machineryYear,
            status: selectedOperatorForDetails.status,
            type: selectedOperatorForDetails.type,
            licenseNumber: selectedOperatorForDetails.licenseNumber,
            licenseClass: selectedOperatorForDetails.licenseClass,
            licenseExpiry: selectedOperatorForDetails.licenseExpiry,
            hourlyRateWeekday: selectedOperatorForDetails.hourlyRateWeekday,
            hourlyRateWeekend: selectedOperatorForDetails.hourlyRateWeekend,
            nightRateWeekday: selectedOperatorForDetails.nightRateWeekday,
            nightRateWeekend: selectedOperatorForDetails.nightRateWeekend,
            appAccess: selectedOperatorForDetails.appAccess,
            lastLogin: selectedOperatorForDetails.lastLogin,
            lastMedical: selectedOperatorForDetails.lastMedical,
            medicalExpiry: selectedOperatorForDetails.medicalExpiry,
            njaInduction: selectedOperatorForDetails.njaInduction,
            siteInductions: selectedOperatorForDetails.siteInductions,
            whiteCardExpiry: selectedOperatorForDetails.whiteCardExpiry,
            whiteCardStatus: selectedOperatorForDetails.whiteCardStatus,
            vocScore: selectedOperatorForDetails.vocScore,
            fatigueExpiry: selectedOperatorForDetails.fatigueExpiry,
            fatigueStatus: selectedOperatorForDetails.fatigueStatus,
            safetyRating: selectedOperatorForDetails.safetyRating,
          }}
          open={!!selectedOperatorForDetails}
          onOpenChange={(open) => {
            if (!open) setSelectedOperatorForDetails(null)
          }}
        />
      )}

      {selectedOperatorForEdit && (
        <EditOperatorDialog
          operator={{
            id: selectedOperatorForEdit.id,
            name: selectedOperatorForEdit.name,
            email: selectedOperatorForEdit.email,
            phone: selectedOperatorForEdit.phone,
            machinery: selectedOperatorForEdit.machinery,
            machineryId: selectedOperatorForEdit.machineryId,
            machineryType: selectedOperatorForEdit.machineryType,
            machineryMake: selectedOperatorForEdit.machineryMake,
            machineryYear: selectedOperatorForEdit.machineryYear,
            status: selectedOperatorForEdit.status,
            type: selectedOperatorForEdit.type,
            licenseNumber: selectedOperatorForEdit.licenseNumber,
            licenseClass: selectedOperatorForEdit.licenseClass,
            licenseExpiry: selectedOperatorForEdit.licenseExpiry,
            hourlyRateWeekday: selectedOperatorForEdit.hourlyRateWeekday,
            hourlyRateWeekend: selectedOperatorForEdit.hourlyRateWeekend,
            nightRateWeekday: selectedOperatorForEdit.nightRateWeekday,
            nightRateWeekend: selectedOperatorForEdit.nightRateWeekend,
            appAccess: selectedOperatorForEdit.appAccess,
            lastLogin: selectedOperatorForEdit.lastLogin,
            lastMedical: selectedOperatorForEdit.lastMedical,
            medicalExpiry: selectedOperatorForEdit.medicalExpiry,
            njaInduction: selectedOperatorForEdit.njaInduction,
            siteInductions: selectedOperatorForEdit.siteInductions,
            whiteCardExpiry: selectedOperatorForEdit.whiteCardExpiry,
            whiteCardStatus: selectedOperatorForEdit.whiteCardStatus,
            vocScore: selectedOperatorForEdit.vocScore,
            fatigueExpiry: selectedOperatorForEdit.fatigueExpiry,
            fatigueStatus: selectedOperatorForEdit.fatigueStatus,
            safetyRating: selectedOperatorForEdit.safetyRating,
          }}
          open={!!selectedOperatorForEdit}
          onOpenChange={(open) => {
            if (!open) setSelectedOperatorForEdit(null)
          }}
        />
      )}

      {selectedOperatorForDocuments && (
        <OperatorDocumentsDialog
          operator={{
            id: selectedOperatorForDocuments.id,
            name: selectedOperatorForDocuments.name,
            email: selectedOperatorForDocuments.email,
            licenseNumber: selectedOperatorForDocuments.licenseNumber,
          }}
          open={!!selectedOperatorForDocuments}
          onOpenChange={(open) => {
            if (!open) setSelectedOperatorForDocuments(null)
          }}
        />
      )}

      {selectedOperatorForMachinery && (
        <AssignMachineryDialog
          open={assignMachineryOpen}
          onOpenChange={setAssignMachineryOpen}
          operatorId={selectedOperatorForMachinery.id}
          operatorName={selectedOperatorForMachinery.name}
          currentMachinery={
            selectedOperatorForMachinery.machinery !== "Unassigned" ? selectedOperatorForMachinery.machinery : undefined
          }
        />
      )}

      {selectedOperatorForSchedule && (
        <OperatorScheduleDialog
          open={viewScheduleOpen}
          onOpenChange={setViewScheduleOpen}
          operator={{
            name: selectedOperatorForSchedule.name,
            email: selectedOperatorForSchedule.email,
            phone: selectedOperatorForSchedule.phone,
            machinery:
              selectedOperatorForSchedule.machinery !== "Unassigned"
                ? {
                    id: selectedOperatorForSchedule.machineryId,
                    model: selectedOperatorForSchedule.machineryMake,
                  }
                : undefined,
            licenseType: selectedOperatorForSchedule.licenseClass,
          }}
        />
      )}

      {selectedOperatorForSettings && (
        <OperatorSettingsDialog
          open={operatorSettingsOpen}
          onOpenChange={setOperatorSettingsOpen}
          operator={{
            id: selectedOperatorForSettings.id,
            name: selectedOperatorForSettings.name,
            email: selectedOperatorForSettings.email,
            phone: selectedOperatorForSettings.phone,
            machinery: selectedOperatorForSettings.machinery,
            machineryId: selectedOperatorForSettings.machineryId,
            machineryType: selectedOperatorForSettings.machineryType,
            machineryMake: selectedOperatorForSettings.machineryMake,
            machineryYear: selectedOperatorForSettings.machineryYear,
            status: selectedOperatorForSettings.status,
            type: selectedOperatorForSettings.type,
            licenseNumber: selectedOperatorForSettings.licenseNumber,
            licenseClass: selectedOperatorForSettings.licenseClass,
            licenseExpiry: selectedOperatorForSettings.licenseExpiry,
            hourlyRateWeekday: selectedOperatorForSettings.hourlyRateWeekday,
            hourlyRateWeekend: selectedOperatorForSettings.hourlyRateWeekend,
            nightRateWeekday: selectedOperatorForSettings.nightRateWeekday,
            nightRateWeekend: selectedOperatorForSettings.nightRateWeekend,
            appAccess: selectedOperatorForSettings.appAccess,
            lastLogin: selectedOperatorForSettings.lastLogin,
            lastMedical: selectedOperatorForSettings.lastMedical,
            medicalExpiry: selectedOperatorForSettings.medicalExpiry,
            njaInduction: selectedOperatorForSettings.njaInduction,
            siteInductions: selectedOperatorForSettings.siteInductions,
            whiteCardExpiry: selectedOperatorForSettings.whiteCardExpiry,
            whiteCardStatus: selectedOperatorForSettings.whiteCardStatus,
            vocScore: selectedOperatorForSettings.vocScore,
            fatigueExpiry: selectedOperatorForSettings.fatigueExpiry,
            fatigueStatus: selectedOperatorForSettings.fatigueStatus,
            safetyRating: selectedOperatorForSettings.safetyRating,
          }}
        />
      )}
    </div>
  )
}
