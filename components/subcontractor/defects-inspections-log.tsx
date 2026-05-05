"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, ExternalLink, Eye, Pencil } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const defectsData = [
  {
    truckId: "TRK-001",
    registration: "ABC123",
    make: "Isuzu FVR 1000",
    year: "2021",
    capacity: "10,000 kg",
    severity: "Minor Fault",
    utilisation: "85%",
    maintenanceHistory: "/maintenance/history/TRK-001",
    logDateTime: "2024-01-15 09:30",
    inspectionNotes:
      "Minor oil leak detected from rear differential. Requires immediate attention before next scheduled run.",
    submittedBy: "John Smith",
    status: "Under Review",
  },
  {
    truckId: "TRK-002",
    registration: "XYZ789",
    make: "Hino 500 Series",
    year: "2020",
    capacity: "12,500 kg",
    severity: "Major or Safety-Related Fault",
    utilisation: "92%",
    maintenanceHistory: "/maintenance/history/TRK-002",
    logDateTime: "2024-01-14 14:45",
    inspectionNotes:
      "Brake pad wear exceeds acceptable limits. Scheduled for replacement. Front left tire showing uneven wear pattern.",
    submittedBy: "Sarah Johnson",
    status: "Repair In Progress",
  },
  {
    truckId: "TRK-003",
    registration: "DEF456",
    make: "Fuso Fighter",
    year: "2022",
    capacity: "8,000 kg",
    severity: "Condition to be Monitored",
    utilisation: "78%",
    maintenanceHistory: "/maintenance/history/TRK-003",
    logDateTime: "2024-01-16 11:20",
    inspectionNotes:
      "Routine inspection flagged potential issues with air filter. Visual check required before approval.",
    submittedBy: "Mike Chen",
    status: "New",
  },
  {
    truckId: "TRK-004",
    registration: "GHI101",
    make: "UD Trucks Quon",
    year: "2019",
    capacity: "15,000 kg",
    severity: "Minor Fault",
    utilisation: "88%",
    maintenanceHistory: "/maintenance/history/TRK-004",
    logDateTime: "2024-01-10 08:15",
    inspectionNotes: "Exhaust system repairs completed successfully. All safety checks passed. Ready for service.",
    submittedBy: "David Wong",
    status: "Completed",
  },
  {
    truckId: "TRK-005",
    registration: "JKL202",
    make: "Isuzu Giga",
    year: "2023",
    capacity: "11,000 kg",
    severity: "Major or Safety-Related Fault",
    utilisation: "95%",
    maintenanceHistory: "/maintenance/history/TRK-005",
    logDateTime: "2024-01-13 16:00",
    inspectionNotes:
      "Unusual noise from transmission during test drive. Currently under diagnostic assessment by service vendor.",
    submittedBy: "Emily Rodriguez",
    status: "Assessing",
  },
]

export function DefectsInspectionsLog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [isAddDefectOpen, setIsAddDefectOpen] = useState(false)

  const filteredDefects = defectsData.filter((defect) => {
    const matchesSearch =
      defect.truckId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      defect.registration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      defect.make.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || defect.status === statusFilter

    const matchesSeverity = severityFilter === "all" || defect.severity === severityFilter

    return matchesSearch && matchesStatus && matchesSeverity
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Assessing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Under Review":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "Repair In Progress":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Minor Fault":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Major or Safety-Related Fault":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "Condition to be Monitored":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header with Add Defects button */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {defectsData.length} Fault{defectsData.length !== 1 ? "s" : ""} Logged
        </h2>
        <Button onClick={() => setIsAddDefectOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Defects
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Registration, Make & Model, Year, Capacity, Utilisation, Maintenance History"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Assessing">Assessing</SelectItem>
            <SelectItem value="Under Review">Under Review</SelectItem>
            <SelectItem value="Repair In Progress">Repair In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="Minor Fault">Minor Fault</SelectItem>
            <SelectItem value="Major or Safety-Related Fault">Major or Safety-Related Fault</SelectItem>
            <SelectItem value="Condition to be Monitored">Condition to be Monitored</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Defects Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Truck ID</TableHead>
              <TableHead>Registration</TableHead>
              <TableHead>Make & Model</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Log Date/Time</TableHead>
              <TableHead>Inspection Notes</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Utilisation</TableHead>
              <TableHead>Maintenance History</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDefects.map((defect) => (
              <TableRow key={defect.truckId}>
                <TableCell className="font-medium">{defect.truckId}</TableCell>
                <TableCell>{defect.registration}</TableCell>
                <TableCell>{defect.make}</TableCell>
                <TableCell>{defect.year}</TableCell>
                <TableCell>{defect.capacity}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getSeverityColor(defect.severity)}>
                    {defect.severity}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{defect.logDateTime}</TableCell>
                <TableCell className="max-w-xs">
                  <p className="text-sm text-muted-foreground truncate" title={defect.inspectionNotes}>
                    {defect.inspectionNotes}
                  </p>
                </TableCell>
                <TableCell className="text-sm">{defect.submittedBy}</TableCell>
                <TableCell>{defect.utilisation}</TableCell>
                <TableCell>
                  <Button variant="link" className="p-0 h-auto text-primary" asChild>
                    <a href={defect.maintenanceHistory} className="flex items-center gap-1">
                      View History
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getStatusColor(defect.status)}>
                    {defect.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => console.log("View", defect.truckId)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => console.log("Edit", defect.truckId)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Defect Dialog */}
      <Dialog open={isAddDefectOpen} onOpenChange={setIsAddDefectOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Defect or Inspection</DialogTitle>
            <DialogDescription>
              Record a new defect or inspection finding for a vehicle in your fleet.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="truck-id">Truck ID</Label>
                <Input id="truck-id" placeholder="e.g., TRK-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registration">Registration</Label>
                <Input id="registration" placeholder="e.g., ABC123" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="make">Make & Model</Label>
                <Input id="make" placeholder="e.g., Isuzu FVR 1000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input id="year" placeholder="e.g., 2021" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="defect-description">Defect Description</Label>
              <Textarea id="defect-description" placeholder="Describe the defect or inspection finding..." rows={4} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inspection-notes">Inspection Notes</Label>
              <Textarea
                id="inspection-notes"
                placeholder="Add detailed notes about the inspection or assessment..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="New">
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Assessing">Assessing</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Repair In Progress">Repair In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="severity">Severity</Label>
                <Select defaultValue="Minor Fault">
                  <SelectTrigger id="severity">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Minor Fault">Minor Fault</SelectItem>
                    <SelectItem value="Major or Safety-Related Fault">Major or Safety-Related Fault</SelectItem>
                    <SelectItem value="Condition to be Monitored">Condition to be Monitored</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDefectOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddDefectOpen(false)}>Add Defect</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
