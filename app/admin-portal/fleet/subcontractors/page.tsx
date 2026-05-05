"use client"

import type React from "react"

import { useState } from "react"
import { FleetManagementHeader } from "@/components/admin/fleet-management-header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Pencil, Upload, DollarSignIcon, Link2, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { EyeIcon, FileTextIcon, MailIcon, PhoneIcon, SearchIcon, LucideComponent as TruckIconComponent } from "lucide-react"
import { AddSubcontractorDialog } from "@/components/admin/add-subcontractor-dialog"
import { PortalLinkModal } from "@/components/admin/portal-link-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function generateSubcontractorId(name: string, count = 1): string {
  // Extract words and filter out common suffixes
  const words = name
    .replace(/\b(Pty|Ltd|Limited|Inc|Corporation|Corp|Group|Solutions|Transport|Haulage|Logistics|Services)\b/gi, "")
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0)

  // Get initials (first letter of each word, uppercase)
  const initials = words.map((word) => word[0].toUpperCase()).join("")

  // Format the number with leading zeros (3 digits)
  const number = count.toString().padStart(3, "0")

  return `SUB-${initials}-${number}`
}

const mockSubcontractors = [
  {
    id: "SUB-RT-001", // Regional Transport
    name: "Regional Transport Services",
    contactName: "Michael Roberts",
    email: "michael@regionaltransport.com.au",
    phone: "+61 2 9876 1234",
    address: "45 Industrial Dr, Penrith NSW 2750",
    abn: "87 654 321 098",
    status: "Active" as const,
    vehicles: 12,
    totalRevenue: "$1.2M",
    lastActivity: "2024-01-16",
    hourlyRate: "115",
    travelHours: "1.5",
    perTonneRate: "42",
    loadRate: "780",
  },
  {
    id: "SUB-CH-001", // Coastal Haulage
    name: "Coastal Haulage Pty Ltd",
    contactName: "Jennifer Lee",
    email: "jennifer@coastalhaulage.com.au",
    phone: "+61 7 5555 6789",
    address: "128 Pacific Hwy, Coffs Harbour NSW 2450",
    abn: "76 543 210 987",
    status: "Active" as const,
    vehicles: 8,
    totalRevenue: "$850K",
    lastActivity: "2024-01-15",
    hourlyRate: "120",
    travelHours: "2",
    perTonneRate: "",
    loadRate: "800",
  },
  {
    id: "SUB-AL-001", // Alliance Logistics
    name: "Alliance Logistics Group",
    contactName: "Peter Thompson",
    email: "peter@alliancelogistics.com.au",
    phone: "+61 3 8765 4321",
    address: "67 Freight Rd, Dandenong VIC 3175",
    abn: "65 432 109 876",
    status: "Pending" as const,
    vehicles: 5,
    totalRevenue: "$320K",
    lastActivity: "2024-01-12",
    hourlyRate: "",
    travelHours: "",
    perTonneRate: "38",
    loadRate: "",
  },
  {
    id: "SUB-ET-001", // Express Transport
    name: "Express Transport Solutions",
    contactName: "Rachel Green",
    email: "rachel@expresstransport.com.au",
    phone: "+61 8 9012 3456",
    address: "234 Main St, Joondalup WA 6027",
    abn: "54 321 098 765",
    status: "Active" as const,
    vehicles: 15,
    totalRevenue: "$1.8M",
    lastActivity: "2024-01-17",
    hourlyRate: "125",
    travelHours: "2.5",
    perTonneRate: "44",
    loadRate: "820",
  },
]

export default function FleetSubcontractorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedSubcontractor, setSelectedSubcontractor] = useState<(typeof mockSubcontractors)[0] | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editFormData, setEditFormData] = useState<(typeof mockSubcontractors)[0] | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isPortalLinkModalOpen, setIsPortalLinkModalOpen] = useState(false)
  const [portalLinkSubcontractor, setPortalLinkSubcontractor] = useState<(typeof mockSubcontractors)[0] | null>(null)

  const filteredSubcontractors = mockSubcontractors.filter((subcontractor) => {
    const matchesSearch =
      subcontractor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subcontractor.address.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || subcontractor.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const handleViewSubcontractor = (subcontractor: (typeof mockSubcontractors)[0]) => {
    setSelectedSubcontractor(subcontractor)
    setIsViewModalOpen(true)
    setIsEditMode(false)
  }

  const handleEditSubcontractor = (subcontractor: (typeof mockSubcontractors)[0]) => {
    setSelectedSubcontractor(subcontractor)
    setEditFormData({ ...subcontractor })
    setIsEditMode(true)
    setIsViewModalOpen(true)
  }

  const handleGenerateLink = (subcontractor: (typeof mockSubcontractors)[0]) => {
    setPortalLinkSubcontractor(subcontractor)
    setIsPortalLinkModalOpen(true)
  }

  const handleSwitchToEdit = () => {
    if (selectedSubcontractor) {
      setEditFormData({ ...selectedSubcontractor })
      setIsEditMode(true)
    }
  }

  const handleFieldChange = (field: keyof typeof editFormData, value: string) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, [field]: value })
    }
  }

  const handleSaveChanges = () => {
    console.log("[v0] Saving subcontractor changes:", editFormData)
    setIsEditMode(false)
    setIsViewModalOpen(false)
    if (editFormData) {
      setSelectedSubcontractor(editFormData)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      console.log(
        "[v0] Files selected for upload:",
        Array.from(files).map((f) => f.name),
      )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-white border-b px-6 py-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/admin-portal" className="hover:text-foreground">
            Dashboard
          </Link>
          <span>/</span>
          <Link href="/admin-portal/fleet" className="hover:text-foreground">
            Fleet Management
          </Link>
          <span>/</span>
          <span className="text-gray-900">Subcontractors</span>
        </div>
      </div>

      <FleetManagementHeader />

      <div className="p-6">
        <div className="bg-white rounded-lg border border-border p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold">Subcontractors</h1>
                <p className="text-muted-foreground">Manage external transport and haulage contractors</p>
              </div>
              <Button className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
                <TruckIconComponent className="h-4 w-4" />
                Add Subcontractor
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                {/* Header with Add Button */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">Subcontractor Directory</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Manage external transport and haulage contractors
                    </p>
                  </div>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
                  <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search by Subcontractor Name, Location"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">Filter by:</span>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Active or Expired" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Subcontractors Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subcontractor ID</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Location (Address)</TableHead>
                        <TableHead>Company Contact</TableHead>
                        <TableHead>Contact Person</TableHead>
                        <TableHead>Rates</TableHead>
                        <TableHead>Contract Status</TableHead>
                        <TableHead>Vehicle Count</TableHead>
                        <TableHead>Date/Time Added</TableHead>
                        <TableHead>Added by</TableHead>
                        <TableHead>Files</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSubcontractors.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={12} className="text-center text-muted-foreground">
                            No subcontractors found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredSubcontractors.map((subcontractor) => (
                          <TableRow key={subcontractor.id}>
                            <TableCell className="font-mono text-sm font-medium">{subcontractor.id}</TableCell>
                            <TableCell className="font-medium">{subcontractor.name}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{subcontractor.address}</TableCell>
                            <TableCell>
                              <div className="space-y-1 text-sm">
                                <div className="flex items-center gap-1">
                                  <PhoneIcon className="h-3 w-3 text-muted-foreground" />
                                  {subcontractor.phone}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MailIcon className="h-3 w-3 text-muted-foreground" />
                                  {subcontractor.email}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1 text-sm">
                                <div className="font-medium">{subcontractor.contactName}</div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <PhoneIcon className="h-3 w-3" />
                                  {subcontractor.phone}
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <MailIcon className="h-3 w-3" />
                                  {subcontractor.email}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-1.5">
                                {subcontractor.hourlyRate && (
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="font-normal text-xs">
                                      Hourly
                                    </Badge>
                                    <div className="flex items-center gap-1">
                                      <span className="text-sm font-medium">${subcontractor.hourlyRate}/hr</span>
                                      {subcontractor.travelHours && (
                                        <span className="text-xs text-muted-foreground">
                                          • Travel: {subcontractor.travelHours}hrs
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}
                                {subcontractor.perTonneRate && (
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="font-normal text-xs">
                                      Per Tonne
                                    </Badge>
                                    <span className="text-sm font-medium">${subcontractor.perTonneRate}/tonne</span>
                                  </div>
                                )}
                                {subcontractor.loadRate && (
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="font-normal text-xs">
                                      Load Rate
                                    </Badge>
                                    <span className="text-sm font-medium">${subcontractor.loadRate}/load</span>
                                  </div>
                                )}
                                {!subcontractor.hourlyRate &&
                                  !subcontractor.perTonneRate &&
                                  !subcontractor.loadRate && (
                                    <span className="text-sm text-muted-foreground">No rates set</span>
                                  )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  subcontractor.status === "Active"
                                    ? "default"
                                    : subcontractor.status === "Pending"
                                      ? "warning"
                                      : "secondary"
                                }
                                className={
                                  subcontractor.status === "Active"
                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                    : subcontractor.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                      : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                }
                              >
                                {subcontractor.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <TruckIconComponent className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{subcontractor.vehicles}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">{subcontractor.lastActivity}</TableCell>
                            <TableCell className="text-sm">Admin User</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" className="gap-2">
                                <FileTextIcon className="h-4 w-4" />
                                <span>View</span>
                                <Download className="h-4 w-4" />
                              </Button>
                            </TableCell>
<TableCell>
                                              <div className="flex items-center gap-1">
                                                <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  className="h-8 w-8"
                                                  onClick={() => handleViewSubcontractor(subcontractor)}
                                                >
                                                  <EyeIcon className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  className="h-8 w-8"
                                                  onClick={() => handleEditSubcontractor(subcontractor)}
                                                >
                                                  <Pencil className="h-4 w-4" />
                                                </Button>
                                                <DropdownMenu>
                                                  <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                      <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                  </DropdownMenuTrigger>
                                                  <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleViewSubcontractor(subcontractor)}>
                                                      <EyeIcon className="h-4 w-4 mr-2" />
                                                      View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleEditSubcontractor(subcontractor)}>
                                                      <Pencil className="h-4 w-4 mr-2" />
                                                      Edit Subcontractor
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem 
                                                      onClick={() => handleGenerateLink(subcontractor)}
                                                      className="text-primary"
                                                    >
                                                      <Link2 className="h-4 w-4 mr-2" />
                                                      Portal Link
                                                    </DropdownMenuItem>
                                                  </DropdownMenuContent>
                                                </DropdownMenu>
                                              </div>
                                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Results Count */}
                <div className="mt-4 text-sm text-muted-foreground">
                  Showing {filteredSubcontractors.length} of {mockSubcontractors.length} subcontractors
                </div>
              </CardContent>
            </Card>

            <AddSubcontractorDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />

            {/* Portal Link Modal */}
            {portalLinkSubcontractor && (
              <PortalLinkModal
                open={isPortalLinkModalOpen}
                onOpenChange={setIsPortalLinkModalOpen}
                entityType="subcontractor"
                entityId={portalLinkSubcontractor.id}
                entityName={portalLinkSubcontractor.name}
              />
            )}
          </div>
        </div>
      </div>

      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="!max-w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              {isEditMode ? "Edit Subcontractor" : "Subcontractor Details"}
            </DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update the subcontractor information below"
                : `Complete information for ${selectedSubcontractor?.name}`}
            </DialogDescription>
          </DialogHeader>

          {selectedSubcontractor && (
            <div className="space-y-6 py-4">
              {/* Subcontractor ID */}
              <div className="grid grid-cols-3 gap-4 pb-4 border-b">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Subcontractor ID</p>
                  <p className="font-mono text-lg font-semibold">{selectedSubcontractor.id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground mb-1">Status</Label>
                  {isEditMode && editFormData ? (
                    <Select value={editFormData.status} onValueChange={(value) => handleFieldChange("status", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Expired">Expired</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge
                      variant={
                        selectedSubcontractor.status === "Active"
                          ? "default"
                          : selectedSubcontractor.status === "Pending"
                            ? "warning"
                            : "secondary"
                      }
                      className={
                        selectedSubcontractor.status === "Active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100 mt-1"
                          : selectedSubcontractor.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 mt-1"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100 mt-1"
                      }
                    >
                      {selectedSubcontractor.status}
                    </Badge>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Vehicle Count</p>
                  <div className="flex items-center gap-2">
                    <TruckIconComponent className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{selectedSubcontractor.vehicles} vehicles</span>
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Company Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-1">Company Name</Label>
                    {isEditMode && editFormData ? (
                      <Input
                        value={editFormData.name}
                        onChange={(e) => handleFieldChange("name", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-medium mt-1">{selectedSubcontractor.name}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-1">ABN</Label>
                    {isEditMode && editFormData ? (
                      <Input
                        value={editFormData.abn}
                        onChange={(e) => handleFieldChange("abn", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-sm mt-1">{selectedSubcontractor.abn}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground mb-1">Location</Label>
                  {isEditMode && editFormData ? (
                    <Input
                      value={editFormData.address}
                      onChange={(e) => handleFieldChange("address", e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-sm mt-1">{selectedSubcontractor.address}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-1">Company Phone</Label>
                    {isEditMode && editFormData ? (
                      <Input
                        value={editFormData.phone}
                        onChange={(e) => handleFieldChange("phone", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedSubcontractor.phone}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-1">Company Email</Label>
                    {isEditMode && editFormData ? (
                      <Input
                        value={editFormData.email}
                        onChange={(e) => handleFieldChange("email", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <MailIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedSubcontractor.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <DollarSignIcon className="h-5 w-5" />
                  Rates
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-1">Hourly Rate</Label>
                    <div className="grid grid-cols-2 gap-4 mt-1">
                      <div>
                        <Label className="text-xs text-muted-foreground mb-1">Rate ($/hr)</Label>
                        {isEditMode && editFormData ? (
                          <Input
                            type="number"
                            value={editFormData.hourlyRate}
                            onChange={(e) => handleFieldChange("hourlyRate", e.target.value)}
                            className="mt-1"
                            placeholder="115"
                          />
                        ) : (
                          <p className="text-sm font-medium mt-1">
                            {selectedSubcontractor.hourlyRate ? `$${selectedSubcontractor.hourlyRate}/hr` : "Not set"}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground mb-1">Travel Hours</Label>
                        {isEditMode && editFormData ? (
                          <Input
                            type="number"
                            step="0.5"
                            value={editFormData.travelHours}
                            onChange={(e) => handleFieldChange("travelHours", e.target.value)}
                            className="mt-1"
                            placeholder="1.5"
                          />
                        ) : (
                          <p className="text-sm mt-1">
                            {selectedSubcontractor.travelHours
                              ? `${selectedSubcontractor.travelHours} hours`
                              : "Not set"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-1">Per Tonne Rate ($/tonne)</Label>
                    {isEditMode && editFormData ? (
                      <Input
                        type="number"
                        value={editFormData.perTonneRate}
                        onChange={(e) => handleFieldChange("perTonneRate", e.target.value)}
                        className="mt-1"
                        placeholder="42"
                      />
                    ) : (
                      <p className="text-sm font-medium mt-1">
                        {selectedSubcontractor.perTonneRate
                          ? `$${selectedSubcontractor.perTonneRate}/tonne`
                          : "Not set"}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-1">Load Rate ($/load)</Label>
                    {isEditMode && editFormData ? (
                      <Input
                        type="number"
                        value={editFormData.loadRate}
                        onChange={(e) => handleFieldChange("loadRate", e.target.value)}
                        className="mt-1"
                        placeholder="780"
                      />
                    ) : (
                      <p className="text-sm font-medium mt-1">
                        {selectedSubcontractor.loadRate ? `$${selectedSubcontractor.loadRate}/load` : "Not set"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Person */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold">Contact Person</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-1">Name</Label>
                    {isEditMode && editFormData ? (
                      <Input
                        value={editFormData.contactName}
                        onChange={(e) => handleFieldChange("contactName", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-medium mt-1">{selectedSubcontractor.contactName}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-1">Phone</Label>
                    {isEditMode && editFormData ? (
                      <Input
                        value={editFormData.phone}
                        onChange={(e) => handleFieldChange("phone", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedSubcontractor.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground mb-1">Email</Label>
                  {isEditMode && editFormData ? (
                    <Input
                      value={editFormData.email}
                      onChange={(e) => handleFieldChange("email", e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <div className="flex items-center gap-2 mt-1">
                      <MailIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedSubcontractor.email}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Administrative Information */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold">Administrative Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Date Added</p>
                    <p className="text-sm mt-1">{selectedSubcontractor.lastActivity}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Added By</p>
                    <p className="text-sm mt-1">Admin User</p>
                  </div>
                </div>
              </div>

              {/* Subcontractor Files */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Subcontractor Files</h3>
                  {isEditMode && (
                    <div>
                      <input
                        type="file"
                        id="file-upload"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <label htmlFor="file-upload">
                        <Button variant="outline" size="sm" className="gap-2 cursor-pointer bg-transparent" asChild>
                          <span>
                            <Upload className="h-4 w-4" />
                            Upload Files
                          </span>
                        </Button>
                      </label>
                    </div>
                  )}
                </div>

                {/* Files List */}
                <div className="space-y-2">{/* Placeholder for files list */}</div>

                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Download All Files
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                {isEditMode ? (
                  <>
                    <Button variant="outline" onClick={() => setIsEditMode(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                      Close
                    </Button>
                    <Button onClick={handleSwitchToEdit}>Edit Subcontractor</Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
