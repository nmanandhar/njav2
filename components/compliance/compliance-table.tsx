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
  Download,
  Calendar,
  Shield,
  AlertTriangle,
  CheckCircle,
  FileText,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock compliance data based on the scope document
const mockComplianceRecords = [
  {
    id: "COMP-001",
    recordId: "COMP-001",
    type: "Vehicle Certification",
    title: "Heavy Vehicle License - TRUCK-001",
    description: "Annual heavy vehicle certification for Volvo FH16",
    vehicleId: "TRUCK-001",
    driverName: "John Smith",
    status: "Valid",
    issueDate: "2024-01-15",
    expiryDate: "2025-01-15",
    authority: "Transport Authority",
    documentUrl: "/docs/cert-001.pdf",
    lastAudit: "2024-01-10",
    nextAudit: "2024-07-10",
  },
  {
    id: "COMP-002",
    recordId: "COMP-002",
    type: "Driver License",
    title: "Commercial Driver License - John Smith",
    description: "Heavy combination vehicle license",
    vehicleId: null,
    driverName: "John Smith",
    status: "Valid",
    issueDate: "2023-06-20",
    expiryDate: "2025-06-20",
    authority: "Road Transport Authority",
    documentUrl: "/docs/license-001.pdf",
    lastAudit: "2024-01-05",
    nextAudit: "2024-07-05",
  },
  {
    id: "COMP-003",
    recordId: "COMP-003",
    type: "Safety Training",
    title: "Workplace Safety Certification - Sarah Johnson",
    description: "Annual workplace safety and hazard awareness training",
    vehicleId: null,
    driverName: "Sarah Johnson",
    status: "Expiring Soon",
    issueDate: "2023-02-10",
    expiryDate: "2024-02-10",
    authority: "Safety Training Institute",
    documentUrl: "/docs/safety-001.pdf",
    lastAudit: "2023-12-15",
    nextAudit: "2024-06-15",
  },
  {
    id: "COMP-004",
    recordId: "COMP-004",
    type: "Environmental Permit",
    title: "Waste Transport Permit",
    description: "Authorization for hazardous material transport",
    vehicleId: "TRUCK-002",
    driverName: "Mike Wilson",
    status: "Overdue",
    issueDate: "2023-01-20",
    expiryDate: "2024-01-20",
    authority: "Environmental Protection Agency",
    documentUrl: "/docs/permit-001.pdf",
    lastAudit: "2023-11-30",
    nextAudit: "2024-05-30",
  },
]

const statusColors = {
  Valid: "default",
  "Expiring Soon": "destructive",
  Overdue: "destructive",
  Suspended: "destructive",
  "Under Review": "secondary",
} as const

const typeColors = {
  "Vehicle Certification": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "Driver License": "bg-green-500/10 text-green-500 border-green-500/20",
  "Safety Training": "bg-orange-500/10 text-orange-500 border-orange-500/20",
  "Environmental Permit": "bg-purple-500/10 text-purple-500 border-purple-500/20",
  "Insurance Policy": "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
} as const

export function ComplianceTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredRecords = mockComplianceRecords.filter((record) => {
    const matchesSearch =
      record.recordId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (record.vehicleId && record.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || record.status === statusFilter
    const matchesType = typeFilter === "all" || record.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Valid":
        return <CheckCircle className="h-3 w-3 text-green-500" />
      case "Expiring Soon":
        return <AlertTriangle className="h-3 w-3 text-orange-500" />
      case "Overdue":
        return <AlertTriangle className="h-3 w-3 text-red-500" />
      default:
        return <Shield className="h-3 w-3 text-gray-500" />
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-card-foreground">Compliance Records</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search compliance records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 bg-input border-border"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-input border-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Valid">Valid</SelectItem>
                <SelectItem value="Expiring Soon">Expiring Soon</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48 bg-input border-border">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Vehicle Certification">Vehicle Certification</SelectItem>
                <SelectItem value="Driver License">Driver License</SelectItem>
                <SelectItem value="Safety Training">Safety Training</SelectItem>
                <SelectItem value="Environmental Permit">Environmental Permit</SelectItem>
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
                <TableHead className="text-muted-foreground">Record ID</TableHead>
                <TableHead className="text-muted-foreground">Type & Title</TableHead>
                <TableHead className="text-muted-foreground">Personnel/Vehicle</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Validity Period</TableHead>
                <TableHead className="text-muted-foreground">Authority</TableHead>
                <TableHead className="text-muted-foreground">Next Audit</TableHead>
                <TableHead className="text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id} className="border-border">
                  <TableCell className="font-medium text-foreground">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(record.status)}
                      <span className="font-semibold">{record.recordId}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge variant="outline" className={typeColors[record.type as keyof typeof typeColors]}>
                        {record.type}
                      </Badge>
                      <div className="font-medium text-foreground">{record.title}</div>
                      <div className="text-xs text-muted-foreground">{record.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {record.driverName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">{record.driverName}</div>
                        {record.vehicleId && <div className="text-xs text-muted-foreground">{record.vehicleId}</div>}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[record.status as keyof typeof statusColors]}>{record.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Issued: {record.issueDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Expires: {record.expiryDate}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-foreground">{record.authority}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm text-foreground">{record.nextAudit}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Download className="h-3 w-3" />
                      </Button>
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
                            Edit Record
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download Document
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Schedule Audit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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
