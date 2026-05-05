"use client"

import type React from "react"

import { useState } from "react"
import { ClientsTable } from "@/components/admin/clients-table"
import { CRMHeader } from "@/components/admin/crm-header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Download, Phone, Mail, Upload, DollarSign, AlertCircle, CheckCircle, Clock, History, User, Edit, FilePlus, CreditCard } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PortalLinkModal } from "@/components/admin/portal-link-modal"

function generateClientId(name: string, count = 1): string {
  // Extract words and filter out common suffixes
  const words = name
    .replace(
      /\b(Pty|Ltd|Limited|Inc|Corporation|Corp|Group|Solutions|Construction|Earthworks|Infrastructure|Mining|Metro)\b/gi,
      "",
    )
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0)

  // Get initials (first letter of each word, uppercase)
  const initials = words.map((word) => word[0].toUpperCase()).join("")

  // Format the number with leading zeros (3 digits)
  const number = count.toString().padStart(3, "0")

  return `${initials}-${number}`
}

const mockClients = [
  {
    id: "SMC-001", // Sydney Metro Construction
    name: "Sydney Metro Construction",
    contactName: "James Wilson",
    email: "james.wilson@sydneymetro.com.au",
    phone: "+61 2 9876 5432",
    address: "123 George St, Sydney NSW 2000",
    abn: "12 345 678 901",
    status: "Active" as const,
    projects: 5,
    totalRevenue: "$2.4M",
    lastActivity: "2024-01-15",
    hourlyRate: "125",
    travelHours: "2",
    perTonneRate: "45",
    loadRate: "850",
    gstApproved: "Approved" as const,
    creditTerms: "Net 30",
    creditScore: 85,
    reviewStatus: "Approved" as const,
    managementApproval: "approved" as const,
    notes: "Key client for large infrastructure projects. Preferred payment via EFT. Contact James for urgent matters.",
  },
  {
    id: "BE-001", // Brisbane Earthworks
    name: "Brisbane Earthworks Pty Ltd",
    contactName: "Sarah Chen",
    email: "sarah.chen@brisbaneearth.com.au",
    phone: "+61 7 3456 7890",
    address: "456 Queen St, Brisbane QLD 4000",
    abn: "23 456 789 012",
    status: "Active" as const,
    projects: 3,
    totalRevenue: "$1.8M",
    lastActivity: "2024-01-14",
    hourlyRate: "135",
    travelHours: "1.5",
    perTonneRate: "",
    loadRate: "900",
    gstApproved: "Approved" as const,
    creditTerms: "Net 60",
    creditScore: 92,
    reviewStatus: "Approved" as const,
    managementApproval: "approved" as const,
    notes: "",
  },
  {
    id: "MI-001", // Melbourne Infrastructure
    name: "Melbourne Infrastructure Group",
    contactName: "David Brown",
    email: "david.brown@melbinfra.com.au",
    phone: "+61 3 9012 3456",
    address: "789 Collins St, Melbourne VIC 3000",
    abn: "34 567 890 123",
    status: "Pending" as const,
    projects: 1,
    totalRevenue: "$450K",
    lastActivity: "2024-01-13",
    hourlyRate: "",
    travelHours: "",
    perTonneRate: "52",
    loadRate: "",
    gstApproved: "Pending Review" as const,
    creditTerms: "COD",
    creditScore: 65,
    reviewStatus: "Pending Review" as const,
    managementApproval: "pending" as const,
    notes: "",
  },
  {
    id: "PM-001", // Perth Mining
    name: "Perth Mining Solutions",
    contactName: "Emma Thompson",
    email: "emma.thompson@perthmining.com.au",
    phone: "+61 8 6789 0123",
    address: "321 Murray St, Perth WA 6000",
    abn: "45 678 901 234",
    status: "Active" as const,
    projects: 8,
    totalRevenue: "$3.2M",
    lastActivity: "2024-01-16",
    hourlyRate: "140",
    travelHours: "3",
    perTonneRate: "48",
    loadRate: "875",
    gstApproved: "Approved" as const,
    creditTerms: "Net 45",
    creditScore: 88,
    reviewStatus: "Approved" as const,
    managementApproval: "approved" as const,
    notes: "",
  },
  {
    id: "AC-001",
    name: "Adelaide Constructions Pty Ltd",
    contactName: "Michael Roberts",
    email: "michael.roberts@adelaideconstructions.com.au",
    phone: "+61 8 8765 4321",
    address: "654 King William St, Adelaide SA 5000",
    abn: "56 789 012 345",
    status: "Pending" as const,
    projects: 0,
    totalRevenue: "$0",
    lastActivity: "2024-01-18",
    hourlyRate: "",
    travelHours: "",
    perTonneRate: "",
    loadRate: "",
    gstApproved: "Pending Review" as const,
    creditTerms: "COD",
    creditScore: 0,
    reviewStatus: "Pending Review" as const,
    managementApproval: "pending" as const,
    notes: "",
  },
]

// Mock activity log data for clients
const mockActivityLogs: Record<string, Array<{
  id: string
  type: "created" | "edited" | "note" | "file" | "status" | "rate" | "credit"
  description: string
  user: string
  timestamp: string
}>> = {
  "SMC-001": [
    { id: "act-001", type: "rate", description: "Updated hourly rate from $120 to $125", user: "Admin User", timestamp: "2024-01-15 14:30" },
    { id: "act-002", type: "file", description: "Uploaded contract document 'SMC-Contract-2024.pdf'", user: "Admin User", timestamp: "2024-01-14 11:15" },
    { id: "act-003", type: "note", description: "Added note about preferred payment method", user: "Sarah Manager", timestamp: "2024-01-12 09:45" },
    { id: "act-004", type: "credit", description: "Credit score updated from 82 to 85", user: "Finance Team", timestamp: "2024-01-10 16:20" },
    { id: "act-005", type: "status", description: "Status changed from Pending to Active", user: "Admin User", timestamp: "2024-01-08 10:00" },
    { id: "act-006", type: "edited", description: "Updated contact email address", user: "Admin User", timestamp: "2024-01-05 13:30" },
    { id: "act-007", type: "file", description: "Uploaded insurance certificate", user: "Sarah Manager", timestamp: "2024-01-03 15:45" },
    { id: "act-008", type: "created", description: "Client record created", user: "Admin User", timestamp: "2024-01-02 09:00" },
  ],
  "BE-001": [
    { id: "act-009", type: "rate", description: "Updated load rate from $880 to $900", user: "Admin User", timestamp: "2024-01-14 10:30" },
    { id: "act-010", type: "credit", description: "Credit terms changed to Net 60", user: "Finance Team", timestamp: "2024-01-10 14:00" },
    { id: "act-011", type: "status", description: "Status changed from Pending to Active", user: "Admin User", timestamp: "2024-01-05 11:30" },
    { id: "act-012", type: "created", description: "Client record created", user: "Admin User", timestamp: "2024-01-04 08:45" },
  ],
  "MI-001": [
    { id: "act-013", type: "edited", description: "Updated contact phone number", user: "Admin User", timestamp: "2024-01-13 16:00" },
    { id: "act-014", type: "created", description: "Client record created", user: "Admin User", timestamp: "2024-01-10 10:30" },
  ],
  "PM-001": [
    { id: "act-015", type: "file", description: "Uploaded WHS compliance documents", user: "Sarah Manager", timestamp: "2024-01-16 09:15" },
    { id: "act-016", type: "rate", description: "Added per tonne rate of $48", user: "Admin User", timestamp: "2024-01-12 14:45" },
    { id: "act-017", type: "credit", description: "Credit score updated to 88", user: "Finance Team", timestamp: "2024-01-08 11:30" },
    { id: "act-018", type: "status", description: "Status changed from Pending to Active", user: "Admin User", timestamp: "2024-01-06 09:00" },
    { id: "act-019", type: "note", description: "Added note about site access requirements", user: "Admin User", timestamp: "2024-01-04 15:00" },
    { id: "act-020", type: "created", description: "Client record created", user: "Admin User", timestamp: "2024-01-03 10:00" },
  ],
  "AC-001": [
    { id: "act-021", type: "created", description: "Client record created", user: "Admin User", timestamp: "2024-01-18 09:30" },
  ],
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case "created": return <FilePlus className="h-4 w-4 text-green-600" />
    case "edited": return <Edit className="h-4 w-4 text-blue-600" />
    case "note": return <FileText className="h-4 w-4 text-purple-600" />
    case "file": return <Upload className="h-4 w-4 text-teal-600" />
    case "status": return <CheckCircle className="h-4 w-4 text-amber-600" />
    case "rate": return <DollarSign className="h-4 w-4 text-green-600" />
    case "credit": return <CreditCard className="h-4 w-4 text-indigo-600" />
    default: return <Clock className="h-4 w-4 text-gray-600" />
  }
}

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedClient, setSelectedClient] = useState<(typeof mockClients)[0] | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editFormData, setEditFormData] = useState<(typeof mockClients)[0] | null>(null)

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isPortalLinkModalOpen, setIsPortalLinkModalOpen] = useState(false)
  const [isActivityLogModalOpen, setIsActivityLogModalOpen] = useState(false)
  const [portalLinkClient, setPortalLinkClient] = useState<(typeof mockClients)[0] | null>(null)
  const [newClientData, setNewClientData] = useState({
    name: "",
    contactName: "",
    abn: "",
    address: "",
    phone: "",
    email: "",
    gstApproved: "pending" as "pending" | "approved" | "not-approved",
    creditTerms: "Net 30",
    creditScore: 0,
    status: "pending" as "pending" | "active" | "inactive",
    managementApproval: "pending" as "pending" | "approved" | "not-approved",
  })

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.address.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || client.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const handleViewClient = (client: (typeof mockClients)[0]) => {
    setSelectedClient(client)
    setIsViewModalOpen(true)
    setIsEditMode(false)
  }

  const handleEditClient = (client: (typeof mockClients)[0]) => {
    setSelectedClient(client)
    setEditFormData({ ...client })
    setIsEditMode(true)
    setIsViewModalOpen(true)
  }

  const handleGenerateLink = (client: (typeof mockClients)[0]) => {
    setPortalLinkClient(client)
    setIsPortalLinkModalOpen(true)
  }

  const handleSwitchToEdit = () => {
    if (selectedClient) {
      setEditFormData({ ...selectedClient })
      setIsEditMode(true)
    }
  }

  const handleFieldChange = (field: keyof typeof editFormData, value: string | number) => {
    if (editFormData) {
      // Ensure numerical fields are stored as numbers if the value is valid
      if (
        field === "creditScore" ||
        field === "hourlyRate" ||
        field === "travelHours" ||
        field === "perTonneRate" ||
        field === "loadRate"
      ) {
        const numericValue = Number(value)
        setEditFormData({ ...editFormData, [field]: isNaN(numericValue) ? "" : numericValue })
      } else {
        setEditFormData({ ...editFormData, [field]: value })
      }
    }
  }

  const handleSaveChanges = () => {
    console.log("[v0] Saving client changes:", editFormData)
    setIsEditMode(false)
    // Close the modal after saving
    setIsViewModalOpen(false)
    if (editFormData && selectedClient) {
      // Find the index of the client and update it in the mockClients array
      const clientIndex = mockClients.findIndex((c) => c.id === selectedClient.id)
      if (clientIndex !== -1) {
        // Create a new array with the updated client
        const updatedMockClients = [...mockClients]
        updatedMockClients[clientIndex] = { ...selectedClient, ...editFormData }
        // Note: In a real application, you would typically send this to an API
        // For this mock, we can simulate an update if needed, but for now,
        // just updating the state locally and closing the modal is sufficient.
        // setSelectedClient(updatedMockClients[clientIndex]); // Update selectedClient if needed for immediate UI refresh
      }
      setSelectedClient(editFormData) // Update selectedClient for immediate display in the dialog
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

  const handleCreateClient = () => {
    setIsCreateModalOpen(true)
  }

  const handleSaveNewClient = () => {
    console.log("Creating new client:", newClientData)
    // TODO: Add API call to create client
    setIsCreateModalOpen(false)
    // Reset form
    setNewClientData({
      name: "",
      contactName: "",
      abn: "",
      address: "",
      phone: "",
      email: "",
      gstApproved: "pending",
      creditTerms: "Net 30",
      creditScore: 0,
      status: "pending",
      managementApproval: "pending",
    })
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="px-6 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/admin-portal/crm/clients" className="text-primary hover:underline">
            CRM
          </Link>
          <span className="text-muted-foreground">›</span>
          <span className="text-gray-900">Clients</span>
        </div>
      </div>

      <CRMHeader onAddClick={handleCreateClient} />

      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            {/* Search and Filters */}
            <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by Client Name, Location"
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

            <div className="mb-6 flex items-center gap-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-900">
                  {mockClients.filter((c) => c.reviewStatus === "Pending Review").length} client(s) require review and
                  approval
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  GST status, credit terms, and credit scores must be reviewed before full activation
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-amber-300 text-amber-900 hover:bg-amber-100 bg-transparent"
              >
                Review Pending
              </Button>
            </div>

            {/* Clients Table */}
            <div className="rounded-md border">
              <ClientsTable
                clients={filteredClients}
                handleViewClient={handleViewClient}
                handleEditClient={handleEditClient}
                handleGenerateLink={handleGenerateLink}
              />
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredClients.length} of {mockClients.length} clients
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="!max-w-[calc(100vw-4rem)] w-[calc(100vw-4rem)] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Add New Client</DialogTitle>
            <DialogDescription>Fill in the client information to create a new record</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Client Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Client Information</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Client Name *</label>
                  <Input
                    placeholder="e.g., Sydney Metro Construction"
                    value={newClientData.name}
                    onChange={(e) => setNewClientData({ ...newClientData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">ABN *</label>
                  <Input
                    placeholder="12 345 678 901"
                    value={newClientData.abn}
                    onChange={(e) => setNewClientData({ ...newClientData, abn: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact Name *</label>
                  <Input
                    placeholder="e.g., John Smith"
                    value={newClientData.contactName}
                    onChange={(e) => setNewClientData({ ...newClientData, contactName: e.target.value })}
                  />
                </div>

                <div className="space-y-2 col-span-3">
                  <label className="text-sm font-medium">Address *</label>
                  <Input
                    placeholder="123 George St, Sydney NSW 2000"
                    value={newClientData.address}
                    onChange={(e) => setNewClientData({ ...newClientData, address: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone *</label>
                  <Input
                    placeholder="+61 2 9876 5432"
                    value={newClientData.phone}
                    onChange={(e) => setNewClientData({ ...newClientData, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email *</label>
                  <Input
                    placeholder="contact@company.com"
                    type="email"
                    value={newClientData.email}
                    onChange={(e) => setNewClientData({ ...newClientData, email: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Financial & Credit Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Financial & Credit Information</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">GST Approved</label>
                  <Select
                    value={newClientData.gstApproved}
                    onValueChange={(value) =>
                      setNewClientData({
                        ...newClientData,
                        gstApproved: value as "pending" | "approved" | "not-approved",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="not-approved">Not Approved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Credit Terms</label>
                  <Select
                    value={newClientData.creditTerms}
                    onValueChange={(value) => setNewClientData({ ...newClientData, creditTerms: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Net 7">Net 7</SelectItem>
                      <SelectItem value="Net 14">Net 14</SelectItem>
                      <SelectItem value="Net 30">Net 30</SelectItem>
                      <SelectItem value="Net 45">Net 45</SelectItem>
                      <SelectItem value="Net 60">Net 60</SelectItem>
                      <SelectItem value="EOM 45">EOM 45</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Credit Score</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="85"
                    value={newClientData.creditScore || ""}
                    onChange={(e) =>
                      setNewClientData({ ...newClientData, creditScore: Number.parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Status */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Client Status</h3>
              <div className="space-y-2">
                <label className="text-sm font-medium">Initial Status</label>
                <Select
                  value={newClientData.status}
                  onValueChange={(value) =>
                    setNewClientData({ ...newClientData, status: value as "pending" | "active" | "inactive" })
                  }
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending Review</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNewClient}>Create Client</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="!max-w-[calc(100vw-4rem)] w-[calc(100vw-4rem)] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              {isEditMode ? "Edit Client" : "Client Details"}
            </DialogTitle>
            <DialogDescription>
              {isEditMode ? "Update the client information below" : `Complete information for ${selectedClient?.name}`}
            </DialogDescription>
          </DialogHeader>

          {selectedClient && (
            <div className="space-y-6 py-4">
              {selectedClient.reviewStatus === "Pending Review" && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-amber-900 mb-1">Client Requires Review</h4>
                      <p className="text-xs text-amber-800 mb-3">
                        This client needs GST approval, credit terms, and credit score review before they can be fully
                        approved as an active client.
                      </p>
                      {isEditMode && (
                        <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                          Complete Review & Approve
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Client ID */}
              <div className="grid grid-cols-3 gap-4 pb-4 border-b">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Client ID</p>
                  <p className="font-mono text-lg font-semibold">{selectedClient.id}</p>
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
                        selectedClient.status === "Active"
                          ? "default"
                          : selectedClient.status === "Pending"
                            ? "warning"
                            : "secondary"
                      }
                      className={
                        selectedClient.status === "Active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100 mt-1"
                          : selectedClient.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 mt-1"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100 mt-1"
                      }
                    >
                      {selectedClient.status}
                    </Badge>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Files</p>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {selectedClient.projects} project{selectedClient.projects !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>

              {/* Client Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Client Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-1">Client Name</Label>
                    {isEditMode && editFormData ? (
                      <Input
                        value={editFormData.name}
                        onChange={(e) => handleFieldChange("name", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-medium mt-1">{selectedClient.name}</p>
                    )}
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
                      <p className="text-sm mt-1">{selectedClient.address}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-1">Client Phone</Label>
                    {isEditMode && editFormData ? (
                      <Input
                        value={editFormData.phone}
                        onChange={(e) => handleFieldChange("phone", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedClient.phone}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-1">Client Email</Label>
                    {isEditMode && editFormData ? (
                      <Input
                        value={editFormData.email}
                        onChange={(e) => handleFieldChange("email", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedClient.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold">Financial & Credit Information</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-1">GST Approved</Label>
                    {isEditMode && editFormData ? (
                      <Select
                        value={editFormData.gstApproved}
                        onValueChange={(value) => handleFieldChange("gstApproved", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Approved">Approved</SelectItem>
                          <SelectItem value="Pending Review">Pending Review</SelectItem>
                          <SelectItem value="Rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge
                        variant={selectedClient.gstApproved === "Approved" ? "default" : "warning"}
                        className={
                          selectedClient.gstApproved === "Approved"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 mt-1"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-100 mt-1"
                        }
                      >
                        {selectedClient.gstApproved === "Approved" ? (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Approved
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {selectedClient.gstApproved}
                          </div>
                        )}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-1">Credit Terms</Label>
                    {isEditMode && editFormData ? (
                      <Select
                        value={editFormData.creditTerms}
                        onValueChange={(value) => handleFieldChange("creditTerms", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="COD">COD (Cash on Delivery)</SelectItem>
                          <SelectItem value="Net 7">Net 7</SelectItem>
                        <SelectItem value="Net 14">Net 14</SelectItem>
                        <SelectItem value="Net 30">Net 30</SelectItem>
                        <SelectItem value="Net 45">Net 45</SelectItem>
                        <SelectItem value="Net 60">Net 60</SelectItem>
                        <SelectItem value="Net 90">Net 90</SelectItem>
                        <SelectItem value="EOM 45">EOM 45</SelectItem>
                      </SelectContent>
                      </Select>
                    ) : (
                      <Badge
                        variant="outline"
                        className={
                          selectedClient.creditTerms === "COD"
                            ? "border-amber-300 bg-amber-50 text-amber-800 mt-1"
                            : "border-blue-300 bg-blue-50 text-blue-800 mt-1"
                        }
                      >
                        {selectedClient.creditTerms}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-1">Credit Score</Label>
                    {isEditMode && editFormData ? (
                      <div className="space-y-2 mt-1">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={editFormData.creditScore}
                          onChange={(e) => handleFieldChange("creditScore", e.target.value)}
                        />
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div
                            className={`h-full rounded-full transition-all ${
                              Number(editFormData.creditScore) >= 80
                                ? "bg-green-500"
                                : Number(editFormData.creditScore) >= 60
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${editFormData.creditScore}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="mt-1">
                        <div className="text-2xl font-bold mb-2">
                          {selectedClient.creditScore > 0 ? selectedClient.creditScore : "Not Set"}
                        </div>
                        {selectedClient.creditScore > 0 && (
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div
                              className={`h-full rounded-full ${
                                selectedClient.creditScore >= 80
                                  ? "bg-green-500"
                                  : selectedClient.creditScore >= 60
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                              }`}
                              style={{ width: `${selectedClient.creditScore}%` }}
                            />
                          </div>
                        )}
                        {selectedClient.creditScore >= 80 && (
                          <p className="text-xs text-green-700 mt-1">Excellent Credit</p>
                        )}
                        {selectedClient.creditScore >= 60 && selectedClient.creditScore < 80 && (
                          <p className="text-xs text-amber-700 mt-1">Good Credit</p>
                        )}
                        {selectedClient.creditScore > 0 && selectedClient.creditScore < 60 && (
                          <p className="text-xs text-red-700 mt-1">Poor Credit - Requires Review</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold">
                  <DollarSign className="h-5 w-5 inline-block mr-2" />
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
                            placeholder="125"
                          />
                        ) : (
                          <p className="text-sm font-medium mt-1">
                            {selectedClient.hourlyRate ? `$${selectedClient.hourlyRate}/hr` : "Not set"}
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
                            placeholder="2"
                          />
                        ) : (
                          <p className="text-sm mt-1">
                            {selectedClient.travelHours ? `${selectedClient.travelHours} hours` : "Not set"}
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
                        placeholder="45"
                      />
                    ) : (
                      <p className="text-sm font-medium mt-1">
                        {selectedClient.perTonneRate ? `$${selectedClient.perTonneRate}/tonne` : "Not set"}
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
                        placeholder="850"
                      />
                    ) : (
                      <p className="text-sm font-medium mt-1">
                        {selectedClient.loadRate ? `$${selectedClient.loadRate}/load` : "Not set"}
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
                      <p className="font-medium mt-1">{selectedClient.contactName}</p>
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
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedClient.phone}</span>
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
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedClient.email}</span>
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
                    <p className="text-sm mt-1">{selectedClient.lastActivity}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Added By</p>
                    <p className="text-sm mt-1">John Smith</p>
                  </div>
                </div>
              </div>

              {/* Client Files */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Client Files</h3>
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
                  Download All Files ({selectedClient.projects})
                </Button>
              </div>

              {/* Notes */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold">Notes</h3>
                {isEditMode ? (
                  <Textarea
                    placeholder="Add notes about this client..."
                    className="min-h-[120px] resize-none"
                    value={editFormData?.notes || ""}
                    onChange={(e) => handleFieldChange("notes" as keyof typeof editFormData, e.target.value)}
                  />
                ) : (
                  <div className="p-3 bg-muted/50 rounded-lg min-h-[80px]">
                    <p className="text-sm text-muted-foreground">
                      {selectedClient.notes || "No notes available for this client."}
                    </p>
                  </div>
                )}
              </div>

              {/* Activity Log */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <History className="h-5 w-5 text-muted-foreground" />
                    Activity Log
                  </h3>
                  {(mockActivityLogs[selectedClient.id]?.length || 0) > 5 && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 bg-transparent"
                      onClick={() => setIsActivityLogModalOpen(true)}
                    >
                      View All ({mockActivityLogs[selectedClient.id]?.length || 0})
                    </Button>
                  )}
                </div>
                <div className="space-y-3">
                  {(mockActivityLogs[selectedClient.id] || []).slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="mt-0.5">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{activity.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {activity.user}
                          </span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {activity.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {(!mockActivityLogs[selectedClient.id] || mockActivityLogs[selectedClient.id].length === 0) && (
                    <div className="p-4 text-center text-muted-foreground text-sm">
                      No activity recorded for this client yet.
                    </div>
                  )}
                </div>
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
                    <Button onClick={handleSwitchToEdit}>Edit Client</Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Portal Link Modal */}
      {portalLinkClient && (
        <PortalLinkModal
          open={isPortalLinkModalOpen}
          onOpenChange={setIsPortalLinkModalOpen}
          entityType="client"
          entityId={portalLinkClient.id}
          entityName={portalLinkClient.name}
        />
      )}

      {/* Activity Log Modal - View All */}
      <Dialog open={isActivityLogModalOpen} onOpenChange={setIsActivityLogModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-teal-600" />
              Activity Log - {selectedClient?.name}
            </DialogTitle>
            <DialogDescription>
              Complete activity history for this client
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1 -mx-6 px-6">
            <div className="space-y-3 py-4">
              {selectedClient && (mockActivityLogs[selectedClient.id] || []).map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border">
                  <div className="mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {activity.user}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex justify-end pt-4 border-t">
            <Button variant="outline" onClick={() => setIsActivityLogModalOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
