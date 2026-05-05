"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MoreVertical, Eye, Edit, Trash2, Phone, Mail, FileText, Upload } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { CRMHeader } from "@/components/admin/crm-header"

// Helper function to generate Tip ID from company name
function generateTipId(companyName: string, sequence: number): string {
  const words = companyName
    .replace(/\b(Pty Ltd|Ltd|PTY LTD|pty ltd|Proprietary Limited|Limited)\b/gi, "")
    .trim()
    .split(/\s+/)
  const initials = words
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .slice(0, 3)
  return `TIP-${initials}-${sequence.toString().padStart(3, "0")}`
}

const mockTippers = [
  {
    id: generateTipId("Blue Mountains Earthmoving", 1),
    name: "Blue Mountains Earthmoving",
    abn: "12 345 678 901",
    address: "45 Valley Road, Katoomba NSW 2780",
    phone: "+61 2 4782 1234",
    email: "operations@bluemountainsearthmoving.com.au",
    contactName: "David Chen",
    hourlyRate: "$165",
    travelHours: "1.5 hours",
    perTonneRate: "$45",
    loadRate: "$850",
    status: "Active",
    contractId: "CONT-2024-089",
    dateAdded: "2024-01-15 09:30 AM",
    addedBy: "Sarah Johnson",
    files: 8,
    notes: "Reliable tip site with good access roads. Accepts clean fill and excavation materials. Operating hours 6am-4pm weekdays.",
  },
  {
    id: generateTipId("Metro Haulage Solutions", 2),
    name: "Metro Haulage Solutions",
    abn: "98 765 432 109",
    address: "12 Industrial Drive, Blacktown NSW 2148",
    phone: "+61 2 9621 5678",
    email: "info@metrohaulage.com.au",
    contactName: "Maria Santos",
    hourlyRate: "$180",
    travelHours: "0.5 hours",
    perTonneRate: "$52",
    loadRate: "$920",
    status: "Active",
    contractId: "CONT-2024-112",
    dateAdded: "2024-02-03 14:15 PM",
    addedBy: "James Wilson",
    files: 12,
    notes: "",
  },
  {
    id: generateTipId("Coastal Transport Co", 3),
    name: "Coastal Transport Co",
    abn: "45 678 901 234",
    address: "78 Beach Road, Wollongong NSW 2500",
    phone: "+61 2 4228 9876",
    email: "dispatch@coastaltransport.com.au",
    contactName: "Peter Wong",
    hourlyRate: "$155",
    travelHours: "2 hours",
    perTonneRate: "",
    loadRate: "$780",
    status: "Pending",
    contractId: "CONT-2024-145",
    dateAdded: "2024-03-10 11:45 AM",
    addedBy: "Emma Davis",
    files: 5,
    notes: "",
  },
  {
    id: generateTipId("Western Sydney Logistics", 4),
    name: "Western Sydney Logistics",
    abn: "23 456 789 012",
    address: "156 Main Street, Penrith NSW 2750",
    phone: "+61 2 4721 3456",
    email: "bookings@wsllogistics.com.au",
    contactName: "Robert Lee",
    hourlyRate: "$170",
    travelHours: "1 hour",
    perTonneRate: "$48",
    loadRate: "",
    status: "Active",
    contractId: "CONT-2024-098",
    dateAdded: "2024-01-28 10:20 AM",
    addedBy: "Michael Brown",
    files: 15,
    notes: "",
  },
]

export default function TipPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedTipper, setSelectedTipper] = useState<(typeof mockTippers)[0] | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editFormData, setEditFormData] = useState<(typeof mockTippers)[0] | null>(null)

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newTipData, setNewTipData] = useState({
    name: "",
    abn: "",
    address: "",
    contractStatus: "pending" as "pending" | "active" | "expired",
  })

  const filteredTippers = mockTippers.filter((tipper) => {
    const matchesSearch =
      tipper.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tipper.address.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || tipper.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const handleViewTipper = (tipper: (typeof mockTippers)[0]) => {
    setSelectedTipper(tipper)
    setIsViewModalOpen(true)
    setIsEditMode(false)
  }

  const handleEditTipper = (tipper: (typeof mockTippers)[0]) => {
    setSelectedTipper(tipper)
    setEditFormData({ ...tipper })
    setIsEditMode(true)
    setIsViewModalOpen(true)
  }

  const handleSwitchToEdit = () => {
    if (selectedTipper) {
      setEditFormData({ ...selectedTipper })
      setIsEditMode(true)
    }
  }

  const handleFieldChange = (field: keyof typeof editFormData, value: string) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, [field]: value })
    }
  }

  const handleSaveChanges = () => {
    setIsEditMode(false)
    setIsViewModalOpen(false)
    if (editFormData) {
      setSelectedTipper(editFormData)
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

  const handleCreateTip = () => {
    setIsCreateModalOpen(true)
  }

  const handleSaveNewTip = () => {
    console.log("Creating new tip:", newTipData)
    // TODO: Add API call to create tip
    setIsCreateModalOpen(false)
    // Reset form
    setNewTipData({
      name: "",
      abn: "",
      address: "",
      contractStatus: "pending",
    })
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="px-6 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/admin-portal/crm" className="text-primary hover:underline">
            CRM
          </Link>
          <span className="text-muted-foreground">›</span>
          <span className="text-gray-900">Tipper</span>
        </div>
      </div>

      <CRMHeader onAddClick={handleCreateTip} />

      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            {/* Search and Filters */}
            <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by Tipper Name, Location"
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

            {/* Tippers Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tip ID</TableHead>
                    <TableHead>Tipper Name</TableHead>
                    <TableHead>Location (Address)</TableHead>
                    <TableHead>Tipper Contact</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Rates</TableHead>
                    <TableHead>Contract Status</TableHead>
                    <TableHead>Contract ID</TableHead>
                    <TableHead>Date/Time Added</TableHead>
                    <TableHead>Added by</TableHead>
                    <TableHead>Files</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTippers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={12} className="text-center text-muted-foreground">
                        No tippers found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTippers.map((tipper) => (
                      <TableRow key={tipper.id}>
                        <TableCell className="font-mono text-sm font-medium">{tipper.id}</TableCell>
                        <TableCell className="font-medium">{tipper.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{tipper.address}</TableCell>
                        <TableCell>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              {tipper.phone}
                            </div>
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              {tipper.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-sm">
                            <div className="font-medium">{tipper.contactName}</div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {tipper.phone}
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              {tipper.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1.5">
                            {tipper.hourlyRate && (
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  Hourly
                                </Badge>
                                <span className="text-sm font-medium">{tipper.hourlyRate}</span>
                                {tipper.travelHours && (
                                  <span className="text-xs text-muted-foreground">+ {tipper.travelHours}</span>
                                )}
                              </div>
                            )}
                            {tipper.perTonneRate && (
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  Per Tonne
                                </Badge>
                                <span className="text-sm font-medium">{tipper.perTonneRate}</span>
                              </div>
                            )}
                            {tipper.loadRate && (
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  Load
                                </Badge>
                                <span className="text-sm font-medium">{tipper.loadRate}</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              tipper.status === "Active"
                                ? "default"
                                : tipper.status === "Pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {tipper.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{tipper.contractId}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{tipper.dateAdded}</TableCell>
                        <TableCell className="text-sm">{tipper.addedBy}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{tipper.files}</span>
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
                              <DropdownMenuItem onClick={() => handleViewTipper(tipper)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditTipper(tipper)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View/Edit Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="!max-w-[calc(100vw-4rem)] w-[calc(100vw-4rem)] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>{isEditMode ? "Edit Tip" : "Tipper Details"}</DialogTitle>
            </div>
            {!isEditMode && <p className="text-sm text-muted-foreground">View and manage tipper information</p>}
            {isEditMode && (
              <p className="text-sm text-muted-foreground">Update tipper information and contact details</p>
            )}
          </DialogHeader>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="rates">Rates</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tip ID</Label>
                  <Input value={isEditMode ? editFormData?.id : selectedTipper?.id} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Tipper Name</Label>
                  {isEditMode ? (
                    <Input value={editFormData?.name} onChange={(e) => handleFieldChange("name", e.target.value)} />
                  ) : (
                    <Input value={selectedTipper?.name} disabled />
                  )}
                </div>
                <div className="space-y-2">
                  <Label>ABN</Label>
                  {isEditMode ? (
                    <Input value={editFormData?.abn} onChange={(e) => handleFieldChange("abn", e.target.value)} />
                  ) : (
                    <Input value={selectedTipper?.abn} disabled />
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Contract ID</Label>
                  <Input
                    value={isEditMode ? editFormData?.contractId : selectedTipper?.contractId}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Address</Label>
                  {isEditMode ? (
                    <Textarea
                      value={editFormData?.address}
                      onChange={(e) => handleFieldChange("address", e.target.value)}
                      rows={2}
                    />
                  ) : (
                    <Textarea value={selectedTipper?.address} disabled rows={2} />
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Contract Status</Label>
                  {isEditMode ? (
                    <Select value={editFormData?.status} onValueChange={(value) => handleFieldChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Expired">Expired</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input value={selectedTipper?.status} disabled />
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Added By</Label>
                  <Input
                    value={isEditMode ? editFormData?.addedBy : selectedTipper?.addedBy}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contacts" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Contact Person</Label>
                  {isEditMode ? (
                    <Input
                      value={editFormData?.contactName}
                      onChange={(e) => handleFieldChange("contactName", e.target.value)}
                    />
                  ) : (
                    <Input value={selectedTipper?.contactName} disabled />
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  {isEditMode ? (
                    <Input value={editFormData?.phone} onChange={(e) => handleFieldChange("phone", e.target.value)} />
                  ) : (
                    <Input value={selectedTipper?.phone} disabled />
                  )}
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Email</Label>
                  {isEditMode ? (
                    <Input value={editFormData?.email} onChange={(e) => handleFieldChange("email", e.target.value)} />
                  ) : (
                    <Input value={selectedTipper?.email} disabled />
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="files" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {isEditMode ? editFormData?.files : selectedTipper?.files} file(s) uploaded
                  </p>
                  {isEditMode && (
                    <Button size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload File
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleFileUpload}
                        multiple
                      />
                    </Button>
                  )}
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground text-center">No files to display</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rates" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Hourly Rate</Label>
                  {isEditMode ? (
                    <Input
                      value={editFormData?.hourlyRate}
                      onChange={(e) => handleFieldChange("hourlyRate", e.target.value)}
                      placeholder="e.g., $165"
                    />
                  ) : (
                    <Input value={selectedTipper?.hourlyRate || "Not set"} disabled />
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Travel Hours</Label>
                  {isEditMode ? (
                    <Input
                      value={editFormData?.travelHours}
                      onChange={(e) => handleFieldChange("travelHours", e.target.value)}
                      placeholder="e.g., 1.5 hours"
                    />
                  ) : (
                    <Input value={selectedTipper?.travelHours || "Not set"} disabled />
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Per Tonne Rate</Label>
                  {isEditMode ? (
                    <Input
                      value={editFormData?.perTonneRate}
                      onChange={(e) => handleFieldChange("perTonneRate", e.target.value)}
                      placeholder="e.g., $45"
                    />
                  ) : (
                    <Input value={selectedTipper?.perTonneRate || "Not set"} disabled />
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Load Rate</Label>
                  {isEditMode ? (
                    <Input
                      value={editFormData?.loadRate}
                      onChange={(e) => handleFieldChange("loadRate", e.target.value)}
                      placeholder="e.g., $850"
                    />
                  ) : (
                    <Input value={selectedTipper?.loadRate || "Not set"} disabled />
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4 mt-4">
              <div className="space-y-4">
                <Label className="text-base font-semibold">Notes</Label>
                {isEditMode ? (
                  <Textarea
                    placeholder="Add notes about this tip site..."
                    className="min-h-[200px] resize-none"
                    value={editFormData?.notes || ""}
                    onChange={(e) => handleFieldChange("notes", e.target.value)}
                  />
                ) : (
                  <div className="p-4 bg-muted/50 rounded-lg min-h-[150px]">
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {selectedTipper?.notes || "No notes available for this tip site."}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {selectedTipper && (
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
                  <Button onClick={handleSwitchToEdit}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="!max-w-[calc(100vw-4rem)] w-[calc(100vw-4rem)] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Add New Tip</DialogTitle>
            <DialogDescription>Fill in the tip company information to create a new record</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Company Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium">Tip Company Name *</label>
                  <Input
                    placeholder="e.g., Blue Mountains Earthmoving"
                    value={newTipData.name}
                    onChange={(e) => setNewTipData({ ...newTipData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">ABN *</label>
                  <Input
                    placeholder="12 345 678 901"
                    value={newTipData.abn}
                    onChange={(e) => setNewTipData({ ...newTipData, abn: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Contract Status</label>
                  <Select
                    value={newTipData.contractStatus}
                    onValueChange={(value) =>
                      setNewTipData({ ...newTipData, contractStatus: value as "pending" | "active" | "expired" })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium">Address *</label>
                  <Input
                    placeholder="45 Valley Road, Katoomba NSW 2780"
                    value={newTipData.address}
                    onChange={(e) => setNewTipData({ ...newTipData, address: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Info Message */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                After creating the tip company, you can add contact persons, rates, and upload files from the detail
                view.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNewTip}>Create Tip</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
