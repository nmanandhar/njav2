"use client"

import type React from "react"
import { Upload, Clock } from "lucide-react" // Import the Upload and Clock component

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Download, FileText, Eye, Edit, Phone, Mail, AlertCircle, Check, X } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { CRMHeader } from "@/components/admin/crm-header"

const mockContracts = [
  {
    id: "CID-001",
    clientName: "ABC Construction Ltd",
    location: "123 Industrial Drive, Sydney NSW 2000",
    status: "Active" as const,
    dateAdded: "2024-01-15 09:30 AM",
    addedBy: "John Smith",
    files: 3,
    fileList: [
      { name: "Service_Agreement_2024.pdf", size: "2.4 MB" },
      { name: "Insurance_Certificate.pdf", size: "1.1 MB" },
      { name: "Safety_Compliance_Doc.pdf", size: "856 KB" },
    ],
    clientPhone: "+61 2 9555 1234",
    clientEmail: "contracts@abcconstruction.com.au",
    contactPerson: "Sarah Williams",
    contactPhone: "+61 412 345 678",
    contactEmail: "sarah.williams@abcconstruction.com.au",
    gstApproved: true,
    managementApproval: "approved" as const,
    creditTerms: "NET 30",
    creditScore: 85,
    reviewStatus: "approved" as const,
  },
  {
    id: "CID-002",
    clientName: "Metro Waste Solutions",
    location: "45 Warehouse Road, Melbourne VIC 3000",
    status: "Active" as const,
    dateAdded: "2024-01-10 02:15 PM",
    addedBy: "Emma Davis",
    files: 2,
    fileList: [
      { name: "Master_Service_Agreement.pdf", size: "3.2 MB" },
      { name: "Rate_Schedule_2024.pdf", size: "445 KB" },
    ],
    clientPhone: "+61 3 9888 5678",
    clientEmail: "admin@metrowaste.com.au",
    contactPerson: "Michael Chen",
    contactPhone: "+61 423 456 789",
    contactEmail: "michael.chen@metrowaste.com.au",
    gstApproved: false,
    managementApproval: "pending" as const,
    creditTerms: "COD",
    creditScore: 0,
    reviewStatus: "pending" as const,
  },
  {
    id: "CID-003",
    clientName: "Brisbane Logistics Co",
    location: "78 Transport Avenue, Brisbane QLD 4000",
    status: "Expired" as const,
    dateAdded: "2023-06-20 11:45 AM",
    addedBy: "John Smith",
    files: 1,
    fileList: [{ name: "Contract_Agreement_2023.pdf", size: "1.8 MB" }],
    clientPhone: "+61 7 3333 9876",
    clientEmail: "info@brisbanelogistics.com.au",
    contactPerson: "Lisa Anderson",
    contactPhone: "+61 434 567 890",
    contactEmail: "lisa.anderson@brisbanelogistics.com.au",
    gstApproved: true,
    managementApproval: "approved" as const,
    creditTerms: "NET 14",
    creditScore: 72,
    reviewStatus: "approved" as const,
  },
  {
    id: "CID-004",
    clientName: "Perth Industrial Services",
    location: "92 Factory Lane, Perth WA 6000",
    status: "Active" as const,
    dateAdded: "2024-02-01 08:00 AM",
    addedBy: "Emma Davis",
    files: 4,
    fileList: [
      { name: "Service_Contract_Main.pdf", size: "2.9 MB" },
      { name: "Addendum_A.pdf", size: "678 KB" },
      { name: "Liability_Waiver.pdf", size: "1.3 MB" },
      { name: "Payment_Terms.pdf", size: "512 KB" },
    ],
    clientPhone: "+61 8 9444 3210",
    clientEmail: "contracts@perthindustrial.com.au",
    contactPerson: "David Thompson",
    contactPhone: "+61 445 678 901",
    contactEmail: "david.thompson@perthindustrial.com.au",
    gstApproved: true,
    managementApproval: "approved" as const,
    creditTerms: "NET 45",
    creditScore: 92,
    reviewStatus: "approved" as const,
  },
  {
    id: "CID-005",
    clientName: "Adelaide Transport Group",
    location: "156 Distribution Street, Adelaide SA 5000",
    status: "Expired" as const,
    dateAdded: "2023-03-12 03:30 PM",
    addedBy: "John Smith",
    files: 2,
    fileList: [
      { name: "Transport_Agreement.pdf", size: "2.1 MB" },
      { name: "Insurance_Docs.pdf", size: "1.5 MB" },
    ],
    clientPhone: "+61 8 8555 6789",
    clientEmail: "admin@adelaidetransport.com.au",
    contactPerson: "Rachel Green",
    contactPhone: "+61 456 789 012",
    contactEmail: "rachel.green@adelaidetransport.com.au",
    gstApproved: false,
    managementApproval: "pending" as const,
    creditTerms: "COD",
    creditScore: 0,
    reviewStatus: "pending" as const,
  },
]

export default function CRMContractsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedContract, setSelectedContract] = useState<(typeof mockContracts)[0] | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editFormData, setEditFormData] = useState<(typeof mockContracts)[0] | null>(null)

  const [reviewFilter, setReviewFilter] = useState<string>("all")

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newContractData, setNewContractData] = useState({
    clientName: "",
    location: "",
    phone: "",
    email: "",
    gstApproved: "pending" as "pending" | "approved" | "not-approved",
    creditTerms: "NET 30 Days",
    creditScore: 0,
    status: "pending" as "pending" | "active" | "expired",
    managementApproval: "pending" as "approved" | "pending" | "rejected",
  })

  const filteredContracts = mockContracts.filter((contract) => {
    const matchesSearch =
      contract.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || contract.status.toLowerCase() === statusFilter.toLowerCase()

    const matchesReview = reviewFilter === "all" || contract.reviewStatus === reviewFilter

    return matchesSearch && matchesStatus && matchesReview
  })

  const pendingReviewCount = mockContracts.filter((c) => c.reviewStatus === "pending").length

  const handleViewContract = (contract: (typeof mockContracts)[0]) => {
    setSelectedContract(contract)
    setIsViewModalOpen(true)
    setIsEditMode(false)
  }

  const handleEditContract = (contract: (typeof mockContracts)[0]) => {
    setSelectedContract(contract)
    setEditFormData({ ...contract })
    setIsEditMode(true)
    setIsViewModalOpen(true)
  }

  const handleSwitchToEdit = () => {
    if (selectedContract) {
      setEditFormData({ ...selectedContract })
      setIsEditMode(true)
    }
  }

  const handleFieldChange = (field: keyof typeof editFormData | keyof (typeof mockContracts)[0], value: any) => {
    setEditFormData((prevData) => {
      if (!prevData) return null
      return { ...prevData, [field]: value }
    })
  }

  const handleSaveChanges = () => {
    console.log("[v0] Saving contract changes:", editFormData)
    setIsEditMode(false)
    setIsViewModalOpen(false)
    if (editFormData) {
      setSelectedContract(editFormData)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      console.log(
        "[v0] Files selected for upload:",
        Array.from(files).map((f) => f.name),
      )
      // Handle file upload logic here
    }
  }

  const handleCreateContract = () => {
    setIsCreateModalOpen(true)
  }

  const handleSaveNewContract = () => {
    console.log("Creating new contract:", newContractData)
    // TODO: Add API call to create contract
    setIsCreateModalOpen(false)
    // Reset form
    setNewContractData({
      clientName: "",
      location: "",
      phone: "",
      email: "",
      gstApproved: "pending",
      creditTerms: "NET 30 Days",
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
          <Link href="/admin-portal/crm" className="text-primary hover:underline">
            CRM
          </Link>
          <span className="text-muted-foreground">›</span>
          <span className="text-gray-900">Contracts</span>
        </div>
      </div>

      <CRMHeader onAddClick={handleCreateContract} />

      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            {pendingReviewCount > 0 && (
              <div className="mb-6 rounded-lg bg-amber-50 border border-amber-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-amber-800">Contracts Awaiting Review</h3>
                    <div className="mt-1 text-sm text-amber-700">
                      {pendingReviewCount} contract{pendingReviewCount !== 1 ? "s" : ""} require GST approval, credit
                      terms, and credit score review before activation.
                    </div>
                  </div>
                </div>
              </div>
            )}

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
                  </SelectContent>
                </Select>
                <Select value={reviewFilter} onValueChange={setReviewFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Review Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Reviews</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Contracts Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contract ID</TableHead>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Location (Address)</TableHead>
                    <TableHead>Client Contact</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>GST Approved</TableHead>
                    <TableHead>Credit Terms</TableHead>
                    <TableHead>Credit Score</TableHead>
                    <TableHead>Management Approval</TableHead>
                    <TableHead>Contract Status</TableHead>
                    <TableHead>Date/Time Added</TableHead>
                    <TableHead>Added by</TableHead>
                    <TableHead>Files</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContracts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={14} className="text-center text-muted-foreground">
                        No contracts found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredContracts.map((contract) => (
                      <TableRow
                        key={contract.id}
                        className={contract.reviewStatus === "pending" ? "bg-amber-50/50" : ""}
                      >
                        <TableCell className="font-mono text-sm font-medium">
                          <div className="flex items-center gap-2">
                            {contract.reviewStatus === "pending" && (
                              <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                            )}
                            {contract.id}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{contract.clientName}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{contract.location}</TableCell>
                        <TableCell>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              {contract.clientPhone}
                            </div>
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              {contract.clientEmail}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-sm">
                            <div className="font-medium">{contract.contactPerson}</div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {contract.contactPhone}
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              {contract.contactEmail}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {contract.gstApproved ? (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                              <Check className="h-4 w-4 text-green-700" />
                            </div>
                          ) : (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                              <X className="h-4 w-4 text-red-700" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              contract.creditTerms === "COD"
                                ? "border-amber-300 bg-amber-50 text-amber-800"
                                : "border-blue-300 bg-blue-50 text-blue-800"
                            }
                          >
                            {contract.creditTerms}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {contract.creditScore > 0 ? (
                            <div className="flex items-center gap-2">
                              <div className="flex-1 max-w-[80px]">
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full ${
                                      contract.creditScore >= 80
                                        ? "bg-green-500"
                                        : contract.creditScore >= 60
                                          ? "bg-amber-500"
                                          : "bg-red-500"
                                    }`}
                                    style={{ width: `${contract.creditScore}%` }}
                                  />
                                </div>
                              </div>
                              <span
                                className={`text-sm font-medium ${
                                  contract.creditScore >= 80
                                    ? "text-green-700"
                                    : contract.creditScore >= 60
                                      ? "text-amber-700"
                                      : "text-red-700"
                                }`}
                              >
                                {contract.creditScore}
                              </span>
                            </div>
                          ) : (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                              Not Rated
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {contract.managementApproval === "approved" ? (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                              <Check className="h-4 w-4 text-green-700" />
                            </div>
                          ) : contract.managementApproval === "pending" ? (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100">
                              <Clock className="h-4 w-4 text-amber-700" />
                            </div>
                          ) : (
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                              <X className="h-4 w-4 text-red-700" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={contract.status === "Active" ? "default" : "secondary"}
                            className={
                              contract.status === "Active"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                            }
                          >
                            {contract.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{contract.dateAdded}</TableCell>
                        <TableCell className="text-sm">{contract.addedBy}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <FileText className="h-4 w-4" />
                            <span>
                              {contract.files} file{contract.files !== 1 ? "s" : ""}
                            </span>
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleViewContract(contract)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleEditContract(contract)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
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
              Showing {filteredContracts.length} of {mockContracts.length} contracts
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="!max-w-[calc(100vw-4rem)] w-[calc(100vw-4rem)] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              {isEditMode ? "Edit Contract" : "Contract Details"}
            </DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update the contract information below"
                : `Complete information for ${selectedContract?.clientName}`}
            </DialogDescription>
          </DialogHeader>

          {selectedContract && (
            <div className="space-y-6 py-4">
              {selectedContract.reviewStatus === "pending" && (
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-amber-800">Contract Awaiting Review</h3>
                      <div className="mt-1 text-sm text-amber-700">
                        This contract requires GST approval, credit terms setup, and credit score assessment before it
                        can be fully approved for active use.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contract ID */}
              <div className="grid grid-cols-3 gap-4 pb-4 border-b">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Contract ID</p>
                  <p className="font-mono text-lg font-semibold">{selectedContract.id}</p>
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
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge
                      variant={selectedContract.status === "Active" ? "default" : "secondary"}
                      className={
                        selectedContract.status === "Active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100 mt-1"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100 mt-1"
                      }
                    >
                      {selectedContract.status}
                    </Badge>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Files</p>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">
                      {selectedContract.files} file{selectedContract.files !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold">Financial Review</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-1">GST Approved</Label>
                    {isEditMode && editFormData ? (
                      <Select
                        value={editFormData.gstApproved ? "true" : "false"}
                        onValueChange={(value) => handleFieldChange("gstApproved", value === "true")}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Approved</SelectItem>
                          <SelectItem value="false">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                        {selectedContract.gstApproved ? (
                          <Check className="h-4 w-4 text-green-700" />
                        ) : (
                          <X className="h-4 w-4 text-red-700" />
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-1">Management Approval</Label>
                    {isEditMode && editFormData ? (
                      <Select
                        value={editFormData.managementApproval}
                        onValueChange={(value) => handleFieldChange("managementApproval", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div>
                        {selectedContract.managementApproval === "approved" ? (
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                            <Check className="h-4 w-4 text-green-700" />
                          </div>
                        ) : selectedContract.managementApproval === "pending" ? (
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100">
                            <Clock className="h-4 w-4 text-amber-700" />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                            <X className="h-4 w-4 text-red-700" />
                          </div>
                        )}
                      </div>
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
                      <SelectItem value="NET 7">NET 7 Days</SelectItem>
                      <SelectItem value="NET 14">NET 14 Days</SelectItem>
                      <SelectItem value="NET 30">NET 30 Days</SelectItem>
                      <SelectItem value="NET 45">NET 45 Days</SelectItem>
                      <SelectItem value="NET 60">NET 60 Days</SelectItem>
                      <SelectItem value="EOM 45">EOM 45</SelectItem>
                    </SelectContent>
                      </Select>
                    ) : (
                      <Badge
                        variant="outline"
                        className={
                          selectedContract.creditTerms === "COD"
                            ? "border-amber-300 bg-amber-50 text-amber-800 mt-1"
                            : "border-blue-300 bg-blue-50 text-blue-800 mt-1"
                        }
                      >
                        {selectedContract.creditTerms}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-1">Credit Score</Label>
                    {isEditMode && editFormData ? (
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={editFormData.creditScore}
                        onChange={(e) => handleFieldChange("creditScore", Number.parseInt(e.target.value, 10))}
                        className="mt-1"
                      />
                    ) : selectedContract.creditScore > 0 ? (
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                selectedContract.creditScore >= 80
                                  ? "bg-green-500"
                                  : selectedContract.creditScore >= 60
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                              }`}
                              style={{ width: `${selectedContract.creditScore}%` }}
                            />
                          </div>
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            selectedContract.creditScore >= 80
                              ? "text-green-700"
                              : selectedContract.creditScore >= 60
                                ? "text-amber-700"
                                : "text-red-700"
                          }`}
                        >
                          {selectedContract.creditScore}
                        </span>
                      </div>
                    ) : (
                      <Badge variant="secondary" className="bg-gray-100 text-gray-600 mt-1">
                        Not Rated
                      </Badge>
                    )}
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
                        value={editFormData.clientName}
                        onChange={(e) => handleFieldChange("clientName", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-medium mt-1">{selectedContract.clientName}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-1">Location</Label>
                    {isEditMode && editFormData ? (
                      <Input
                        value={editFormData.location}
                        onChange={(e) => handleFieldChange("location", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-sm mt-1">{selectedContract.location}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-1">Client Phone</Label>
                    {isEditMode && editFormData ? (
                      <Input
                        value={editFormData.clientPhone}
                        onChange={(e) => handleFieldChange("clientPhone", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedContract.clientPhone}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-1">Client Email</Label>
                    {isEditMode && editFormData ? (
                      <Input
                        value={editFormData.clientEmail}
                        onChange={(e) => handleFieldChange("clientEmail", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedContract.clientEmail}</span>
                      </div>
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
                        value={editFormData.contactPerson}
                        onChange={(e) => handleFieldChange("contactPerson", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-medium mt-1">{selectedContract.contactPerson}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-1">Phone</Label>
                    {isEditMode && editFormData ? (
                      <Input
                        value={editFormData.contactPhone}
                        onChange={(e) => handleFieldChange("contactPhone", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedContract.contactPhone}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground mb-1">Email</Label>
                    {isEditMode && editFormData ? (
                      <Input
                        value={editFormData.contactEmail}
                        onChange={(e) => handleFieldChange("contactEmail", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedContract.contactEmail}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Administrative Information */}
              <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Date/Time Added</p>
                  <p className="font-medium">{selectedContract.dateAdded}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Added By</p>
                  <p className="font-medium">{selectedContract.addedBy}</p>
                </div>
              </div>

              {/* Contract Files */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold">Contract Files</h3>

                <div className="space-y-2">
                  {selectedContract.fileList?.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 rounded border bg-muted/30">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm flex-1">{file.name}</span>
                      <span className="text-sm text-muted-foreground">{file.size}</span>
                      <Button variant="ghost" size="sm" className="h-8 gap-1">
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Download className="h-4 w-4" />
                    Download All Files ({selectedContract.files})
                  </Button>
                  {isEditMode && (
                    <div>
                      <Input type="file" multiple onChange={handleFileUpload} className="hidden" id="file-upload" />
                      <Button variant="outline" className="gap-2 bg-transparent" asChild>
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Upload className="h-4 w-4" />
                          Upload Files
                        </label>
                      </Button>
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
                    <Button onClick={handleSwitchToEdit}>Edit Contract</Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="!max-w-[calc(100vw-4rem)] w-[calc(100vw-4rem)] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Add New Contract</DialogTitle>
            <DialogDescription>Fill in the contract information to create a new record</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Client Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Client Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Client Name *</label>
                  <Input
                    placeholder="e.g., ABC Construction Ltd"
                    value={newContractData.clientName}
                    onChange={(e) => setNewContractData({ ...newContractData, clientName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Location *</label>
                  <Input
                    placeholder="123 Industrial Drive, Sydney NSW"
                    value={newContractData.location}
                    onChange={(e) => setNewContractData({ ...newContractData, location: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone *</label>
                  <Input
                    placeholder="+61 2 9555 1234"
                    value={newContractData.phone}
                    onChange={(e) => setNewContractData({ ...newContractData, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email *</label>
                  <Input
                    placeholder="contracts@company.com"
                    type="email"
                    value={newContractData.email}
                    onChange={(e) => setNewContractData({ ...newContractData, email: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Financial Review */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Financial Review</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">GST Approved</label>
                  <Select
                    value={newContractData.gstApproved}
                    onValueChange={(value) =>
                      setNewContractData({
                        ...newContractData,
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
                  <label className="text-sm font-medium">Management Approval</label>
                  <Select
                    value={
                      newContractData.managementApproval === undefined ? "pending" : newContractData.managementApproval
                    }
                    onValueChange={(value) =>
                      setNewContractData({
                        ...newContractData,
                        managementApproval: value as "approved" | "pending" | "rejected",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Credit Terms</label>
                  <Select
                    value={newContractData.creditTerms}
                    onValueChange={(value) => setNewContractData({ ...newContractData, creditTerms: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NET 7 Days">NET 7 Days</SelectItem>
                      <SelectItem value="NET 14 Days">NET 14 Days</SelectItem>
                      <SelectItem value="NET 30 Days">NET 30 Days</SelectItem>
                      <SelectItem value="NET 45 Days">NET 45 Days</SelectItem>
                      <SelectItem value="NET 60 Days">NET 60 Days</SelectItem>
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
                    value={newContractData.creditScore || ""}
                    onChange={(e) =>
                      setNewContractData({ ...newContractData, creditScore: Number.parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Contract Status */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contract Status</h3>
              <div className="space-y-2">
                <label className="text-sm font-medium">Initial Status</label>
                <Select
                  value={newContractData.status}
                  onValueChange={(value) =>
                    setNewContractData({ ...newContractData, status: value as "pending" | "active" | "expired" })
                  }
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending Review</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
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
            <Button onClick={handleSaveNewContract}>Create Contract</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
