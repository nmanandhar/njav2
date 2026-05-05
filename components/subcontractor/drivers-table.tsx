"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Edit,
  Trash2,
  MoreHorizontal,
  Search,
  Filter,
  Download,
  Plus,
  Truck,
  FileText,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  Smartphone,
} from "lucide-react"

interface Driver {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  vehicle: string
  type: "Internal" | "Subcontractor"
  status: "Active" | "Inactive"
  licenseNumber: string
  licenseClass: string
  licenseExpiry: string
  njaInduction: "Valid" | "Expired"
  siteInductions: number
  whiteCardStatus: "Valid" | "Expired" | "Expiring Soon"
  medicalExpiry: string
  vocScore: number
  fatigueStatus: "Valid" | "Expired"
  safetyRating: number
  hourlyRateWeekday: string
  hourlyRateWeekend: string
  nightRateWeekday: string
  nightRateWeekend: string
  mobileAppAccess: boolean
  lastLogin: string
  alerts: string[]
}

const mockDrivers: Driver[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+61 412 345 678",
    vehicle: "FL-001 (Volvo FH16)",
    type: "Internal",
    status: "Active",
    licenseNumber: "LIC-12345",
    licenseClass: "HC",
    licenseExpiry: "2025-06-15",
    njaInduction: "Valid",
    siteInductions: 3,
    whiteCardStatus: "Valid",
    medicalExpiry: "2025-03-20",
    vocScore: 95,
    fatigueStatus: "Valid",
    safetyRating: 95,
    hourlyRateWeekday: "$55/hr",
    hourlyRateWeekend: "$68/hr",
    nightRateWeekday: "$65/hr",
    nightRateWeekend: "$75/hr",
    mobileAppAccess: true,
    lastLogin: "2024-01-15 09:30",
    alerts: [],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+61 423 456 789",
    vehicle: "FL-002 (Scania R500)",
    type: "Internal",
    status: "Active",
    licenseNumber: "LIC-23456",
    licenseClass: "HC",
    licenseExpiry: "2026-03-20",
    njaInduction: "Valid",
    siteInductions: 5,
    whiteCardStatus: "Valid",
    medicalExpiry: "2024-12-10",
    vocScore: 88,
    fatigueStatus: "Valid",
    safetyRating: 88,
    hourlyRateWeekday: "$58/hr",
    hourlyRateWeekend: "$70/hr",
    nightRateWeekday: "$68/hr",
    nightRateWeekend: "$78/hr",
    mobileAppAccess: true,
    lastLogin: "2024-01-14 16:45",
    alerts: [],
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike.chen@example.com",
    phone: "+61 434 567 890",
    vehicle: "Unassigned",
    type: "Internal",
    status: "Inactive",
    licenseNumber: "LIC-34567",
    licenseClass: "MC",
    licenseExpiry: "2024-02-28",
    njaInduction: "Expired",
    siteInductions: 1,
    whiteCardStatus: "Expired",
    medicalExpiry: "2023-11-15",
    vocScore: 65,
    fatigueStatus: "Expired",
    safetyRating: 72,
    hourlyRateWeekday: "$52/hr",
    hourlyRateWeekend: "$65/hr",
    nightRateWeekday: "$62/hr",
    nightRateWeekend: "$75/hr",
    mobileAppAccess: false,
    lastLogin: "2024-01-10 11:20",
    alerts: ["License expiring soon"],
  },
]

const statusColors = {
  Active: "default" as const,
  Inactive: "secondary" as const,
}

export function DriversTable() {
  const [drivers] = useState<Driver[]>(mockDrivers)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [typeFilter, setTypeFilter] = useState("All Types")

  const getExpiryColor = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntilExpiry < 0) return "text-red-500"
    if (daysUntilExpiry < 30) return "text-orange-500"
    return "text-foreground"
  }

  const getStatusIcon = (status: string) => {
    if (status === "Active") return <CheckCircle className="h-4 w-4 text-green-500" />
    return <XCircle className="h-4 w-4 text-muted-foreground" />
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-card-foreground">Driver Overview</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Monitor and manage driver information and compliance</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Driver
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search drivers, license, certifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Status">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Types">All Types</SelectItem>
              <SelectItem value="Internal">Internal</SelectItem>
              <SelectItem value="Subcontractor">Subcontractor</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="All Drivers">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Drivers">All Drivers</SelectItem>
              <SelectItem value="With Alerts">With Alerts</SelectItem>
              <SelectItem value="Expiring Soon">Expiring Soon</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border border-border overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Driver Details</TableHead>
                <TableHead className="text-muted-foreground">Vehicle & Status</TableHead>
                <TableHead className="text-muted-foreground">License & Compliance</TableHead>
                <TableHead className="text-muted-foreground">Safety & Performance</TableHead>
                <TableHead className="text-muted-foreground">Rates</TableHead>
                <TableHead className="text-muted-foreground">Mobile App Access</TableHead>
                <TableHead className="text-muted-foreground">Alerts & Expiries</TableHead>
                <TableHead className="text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow key={driver.id} className="border-border">
                  {/* Driver Details */}
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={driver.avatar || "/placeholder.svg"} alt={driver.name} />
                        <AvatarFallback className="bg-teal-100 text-teal-700">
                          {driver.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{driver.name}</div>
                        <div className="text-sm text-foreground">{driver.email}</div>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                          <Mail className="h-3 w-3" />
                          <span>{driver.phone}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Vehicle & Status */}
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
                        <Badge variant={statusColors[driver.status]} className="text-xs">
                          {driver.status}
                        </Badge>
                      </div>
                      {/* License info */}
                      <div className="pt-2 border-t border-border space-y-1">
                        <div className="flex items-center space-x-1">
                          <FileText className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-foreground">{driver.licenseNumber}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Class {driver.licenseClass}
                        </Badge>
                        <div className={`text-xs ${getExpiryColor(driver.licenseExpiry)}`}>
                          Exp: {driver.licenseExpiry}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* License & Compliance */}
                  <TableCell>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <FileText className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs font-medium">NJA Induction</span>
                        <Badge
                          variant={driver.njaInduction === "Valid" ? "default" : "destructive"}
                          className="text-xs"
                        >
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
                            driver.medicalExpiry && new Date(driver.medicalExpiry) < new Date()
                              ? "destructive"
                              : "default"
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
                        <Badge
                          variant={driver.fatigueStatus === "Valid" ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {driver.fatigueStatus}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>

                  {/* Safety & Performance */}
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-xs text-foreground">Safety Score</div>
                      <div className="text-lg font-bold text-foreground">{driver.safetyRating}%</div>
                      <Progress value={driver.safetyRating} className="h-1 w-24" />
                    </div>
                  </TableCell>

                  {/* Rates */}
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

                  {/* Mobile App Access */}
                  <TableCell>
                    <div className="space-y-2">
                      {driver.mobileAppAccess ? (
                        <div className="flex items-center gap-1.5">
                          <Smartphone className="h-4 w-4 text-teal-600" />
                          <Badge variant="default" className="text-xs bg-teal-600">
                            Active
                          </Badge>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <Smartphone className="h-4 w-4 text-muted-foreground" />
                          <Badge variant="secondary" className="text-xs">
                            Inactive
                          </Badge>
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground">
                        <div>Last Login:</div>
                        <div>{driver.lastLogin}</div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Alerts & Expiries */}
                  <TableCell>
                    <div className="space-y-1">
                      {driver.alerts.length > 0 ? (
                        driver.alerts.map((alert, index) => (
                          <div key={index} className="flex items-center gap-1 text-orange-500">
                            <AlertCircle className="h-3 w-3" />
                            <span className="text-xs">{alert}</span>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center gap-1 text-green-500">
                          <CheckCircle className="h-3 w-3" />
                          <span className="text-xs">No alerts</span>
                        </div>
                      )}
                    </div>
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
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
