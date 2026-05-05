"use client"
import { useState } from "react"
import { ProcurementHeader } from "@/components/admin/procurement-header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Download,
  Phone,
  Mail,
  ChevronRight,
  Eye,
  Pencil,
  Upload,
  Settings,
  Plus,
  Check,
  X,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { AddSupplierDialog, type SupplierFormData } from "@/components/admin/add-supplier-dialog"

const mockSuppliers = [
  {
    id: "SUP-001",
    name: "Heavy Equipment Supplies Pty Ltd",
    contactName: "Michael Roberts",
    email: "michael.roberts@heavyequip.com.au",
    orderEmail: "orders@heavyequip.com.au",
    phone: "+61 2 9876 1234",
    address: "45 Industrial Drive, Sydney NSW 2000",
    abn: "56 789 012 345",
    status: "Active" as const,
    category: "Equipment",
    paymentTerms: "Net 30",
    totalSpend: "$450K",
    lastOrder: "2024-01-12",
  },
  {
    id: "SUP-002",
    name: "Fuel Direct Australia",
    contactName: "Sarah Mitchell",
    email: "sarah.mitchell@fueldirect.com.au",
    orderEmail: "purchasing@fueldirect.com.au",
    phone: "+61 7 3456 7891",
    address: "78 Port Road, Brisbane QLD 4000",
    abn: "67 890 123 456",
    status: "Active" as const,
    category: "Fuel & Lubricants",
    paymentTerms: "Net 14",
    totalSpend: "$780K",
    lastOrder: "2024-01-15",
  },
  {
    id: "SUP-003",
    name: "Industrial Parts Warehouse",
    contactName: "James Chen",
    email: "james.chen@partswarehouse.com.au",
    orderEmail: "sales@partswarehouse.com.au",
    phone: "+61 3 9012 3457",
    address: "123 Warehouse Ave, Melbourne VIC 3000",
    abn: "78 901 234 567",
    status: "Active" as const,
    category: "Parts & Components",
    paymentTerms: "Net 30",
    totalSpend: "$320K",
    lastOrder: "2024-01-10",
  },
  {
    id: "SUP-004",
    name: "Safety Equipment Solutions",
    contactName: "Emma Wilson",
    email: "emma.wilson@safetyequip.com.au",
    orderEmail: "",
    phone: "+61 8 6789 0124",
    address: "56 Safety Street, Perth WA 6000",
    abn: "89 012 345 678",
    status: "Pending" as const,
    category: "Safety & PPE",
    paymentTerms: "Net 45",
    totalSpend: "$125K",
    lastOrder: "2024-01-05",
  },
]

export default function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [selectedSupplier, setSelectedSupplier] = useState<(typeof mockSuppliers)[0] | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editFormData, setEditFormData] = useState<(typeof mockSuppliers)[0] | null>(null)

  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false)
  const [suppliers, setSuppliers] = useState(mockSuppliers)

  const [categories, setCategories] = useState<string[]>([
    "Equipment",
    "Fuel & Lubricants",
    "Parts & Components",
    "Safety & PPE",
  ])
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [editingCategoryIndex, setEditingCategoryIndex] = useState<number | null>(null)
  const [editingCategoryName, setEditingCategoryName] = useState("")

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || supplier.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesCategory = categoryFilter === "all" || supplier.category.toLowerCase() === categoryFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleAddSupplier = (formData: SupplierFormData) => {
    const newSupplier = {
      id: `SUP-${String(suppliers.length + 1).padStart(3, "0")}`,
      name: formData.name,
      contactName: formData.contactName,
      email: formData.email,
      orderEmail: formData.orderEmail,
      phone: formData.phone,
      address: formData.address,
      abn: formData.abn,
      status: formData.status,
      category: formData.category,
      paymentTerms: formData.paymentTerms,
      totalSpend: "$0",
      lastOrder: new Date().toISOString().split("T")[0],
    }

    setSuppliers([...suppliers, newSupplier])
  }

  const handleViewSupplier = (supplier: (typeof mockSuppliers)[0]) => {
    setSelectedSupplier(supplier)
    setIsViewModalOpen(true)
    setIsEditMode(false)
  }

  const handleEditSupplier = (supplier: (typeof mockSuppliers)[0]) => {
    setSelectedSupplier(supplier)
    setEditFormData({ ...supplier })
    setIsEditMode(true)
    setIsViewModalOpen(true)
  }

  const handleSwitchToEdit = () => {
    if (selectedSupplier) {
      setEditFormData({ ...selectedSupplier })
      setIsEditMode(true)
    }
  }

  const handleFieldChange = (field: keyof typeof editFormData, value: string) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, [field]: value })
    }
  }

  const handleSaveChanges = () => {
    if (editFormData) {
      alert("Supplier changes saved!")
      setIsEditMode(false)
      setSelectedSupplier(editFormData)
    }
  }

  const handleAddCategory = () => {
    if (newCategoryName.trim() && !categories.includes(newCategoryName.trim())) {
      setCategories([...categories, newCategoryName.trim()])
      setNewCategoryName("")
    }
  }

  const handleDeleteCategory = (index: number) => {
    const updatedCategories = categories.filter((_, i) => i !== index)
    setCategories(updatedCategories)
  }

  const handleStartEditCategory = (index: number) => {
    setEditingCategoryIndex(index)
    setEditingCategoryName(categories[index])
  }

  const handleSaveEditCategory = () => {
    if (editingCategoryIndex !== null && editingCategoryName.trim()) {
      const updatedCategories = [...categories]
      updatedCategories[editingCategoryIndex] = editingCategoryName.trim()
      setCategories(updatedCategories)
      setEditingCategoryIndex(null)
      setEditingCategoryName("")
    }
  }

  const handleCancelEditCategory = () => {
    setEditingCategoryIndex(null)
    setEditingCategoryName("")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* <AdminTopNav /> */}

      <div className="bg-white border-b px-6 py-3">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/admin-portal/dashboard" className="text-orange-600 hover:text-orange-700 transition-colors">
            Procurement
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900">Suppliers</span>
        </div>
      </div>

      <ProcurementHeader onAddSupplier={() => setIsAddSupplierOpen(true)} />

      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            {/* Search and Filters */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by Supplier Name, Location, Category"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button className="gap-2">
                    <Download className="h-4 w-4" />
                    Export Suppliers
                  </Button>
                  <Button className="gap-2 bg-transparent" variant="outline">
                    <Upload className="h-4 w-4" />
                    Import Suppliers
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Filter by:</span>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Suppliers Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier ID</TableHead>
                    <TableHead>Supplier Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Contact Details</TableHead>
                    <TableHead>Payment Terms</TableHead>
                    <TableHead>Total Spend</TableHead>
                    <TableHead>Last Order</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSuppliers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={11} className="text-center py-8 text-muted-foreground">
                        No suppliers found matching your search criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSuppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell className="font-medium">{supplier.id}</TableCell>
                        <TableCell>
                          <div className="font-medium">{supplier.name}</div>
                          <div className="text-xs text-muted-foreground">ABN: {supplier.abn}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{supplier.category}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">{supplier.address}</TableCell>
                        <TableCell className="font-medium">{supplier.contactName}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1 text-xs">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              <span>{supplier.phone}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              <span className="truncate max-w-[150px]">{supplier.email}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{supplier.paymentTerms}</Badge>
                        </TableCell>
                        <TableCell className="font-semibold">{supplier.totalSpend}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{supplier.lastOrder}</TableCell>
                        <TableCell>
                          <Badge variant={supplier.status === "Active" ? "default" : "secondary"}>
                            {supplier.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleViewSupplier(supplier)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEditSupplier(supplier)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </div>
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

      <AddSupplierDialog
        open={isAddSupplierOpen}
        onOpenChange={setIsAddSupplierOpen}
        onAdd={handleAddSupplier}
        categories={categories}
        onManageCategories={() => {
          setIsAddSupplierOpen(false)
          setIsCategoryManagerOpen(true)
        }}
      />

      {/* View/Edit Supplier Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto" style={{ width: "95vw", maxWidth: "95vw" }}>
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Supplier" : "Supplier Details"}</DialogTitle>
            <DialogDescription>
              {isEditMode ? "Update supplier information and contact details" : "View detailed supplier information"}
            </DialogDescription>
          </DialogHeader>

          {selectedSupplier && (
            <div className="space-y-6">
              {/* Supplier Information */}
              <div>
                <h3 className="text-sm font-semibold mb-3 pb-2 border-b">Supplier Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Supplier ID</Label>
                    <p className="text-sm font-medium mt-1">{selectedSupplier.id}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Supplier Name</Label>
                    {isEditMode ? (
                      <Input
                        value={editFormData?.name}
                        onChange={(e) => handleFieldChange("name", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-sm font-medium mt-1">{selectedSupplier.name}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Category</Label>
                    {isEditMode ? (
                      <div className="flex gap-2 mt-1">
                        <Select
                          value={editFormData?.category}
                          onValueChange={(value) => handleFieldChange("category", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setIsCategoryManagerOpen(true)}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <p className="text-sm font-medium mt-1">{selectedSupplier.category}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">ABN</Label>
                    {isEditMode ? (
                      <Input
                        value={editFormData?.abn}
                        onChange={(e) => handleFieldChange("abn", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-sm font-medium mt-1">{selectedSupplier.abn}</p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <Label className="text-xs text-muted-foreground">Address</Label>
                    {isEditMode ? (
                      <Input
                        value={editFormData?.address}
                        onChange={(e) => handleFieldChange("address", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-sm font-medium mt-1">{selectedSupplier.address}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-sm font-semibold mb-3 pb-2 border-b">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Contact Person</Label>
                    {isEditMode ? (
                      <Input
                        value={editFormData?.contactName}
                        onChange={(e) => handleFieldChange("contactName", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-sm font-medium mt-1">{selectedSupplier.contactName}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Phone</Label>
                    {isEditMode ? (
                      <Input
                        value={editFormData?.phone}
                        onChange={(e) => handleFieldChange("phone", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-sm font-medium mt-1">{selectedSupplier.phone}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Contact Email</Label>
                    {isEditMode ? (
                      <Input
                        type="email"
                        value={editFormData?.email}
                        onChange={(e) => handleFieldChange("email", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-sm font-medium mt-1">{selectedSupplier.email}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Order Email</Label>
                    {isEditMode ? (
                      <Input
                        type="email"
                        value={editFormData?.orderEmail || ""}
                        onChange={(e) => handleFieldChange("orderEmail", e.target.value)}
                        placeholder="orders@supplier.com.au"
                      />
                    ) : (
                      <p className="text-sm font-medium mt-1">
                        {selectedSupplier.orderEmail || <span className="text-muted-foreground italic">Not set (uses contact email)</span>}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment & Business Terms */}
              <div>
                <h3 className="text-sm font-semibold mb-3 pb-2 border-b">Payment & Business Terms</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Payment Terms</Label>
                    {isEditMode ? (
                      <Select
                        value={editFormData?.paymentTerms}
                        onValueChange={(value) => handleFieldChange("paymentTerms", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Net 7">Net 7</SelectItem>
                          <SelectItem value="Net 14">Net 14</SelectItem>
                          <SelectItem value="Net 30">Net 30</SelectItem>
                          <SelectItem value="Net 45">Net 45</SelectItem>
                          <SelectItem value="Net 60">Net 60</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-sm font-medium mt-1">{selectedSupplier.paymentTerms}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Status</Label>
                    {isEditMode ? (
                      <Select
                        value={editFormData?.status}
                        onValueChange={(value) =>
                          handleFieldChange("status", value as "Active" | "Pending" | "Inactive")
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge variant={selectedSupplier.status === "Active" ? "default" : "secondary"} className="mt-1">
                        {selectedSupplier.status}
                      </Badge>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Total Spend (YTD)</Label>
                    <p className="text-sm font-medium mt-1">{selectedSupplier.totalSpend}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Last Order Date</Label>
                    <p className="text-sm font-medium mt-1">{selectedSupplier.lastOrder}</p>
                  </div>
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
                    <Button onClick={handleSwitchToEdit}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit Supplier
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isCategoryManagerOpen} onOpenChange={setIsCategoryManagerOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Categories</DialogTitle>
            <DialogDescription>Add, edit, or remove supplier categories</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Add New Category */}
            <div className="flex gap-2">
              <Input
                placeholder="New category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddCategory()
                  }
                }}
              />
              <Button onClick={handleAddCategory} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>

            {/* Category List */}
            <div className="border rounded-lg divide-y">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3">
                  {editingCategoryIndex === index ? (
                    <>
                      <Input
                        value={editingCategoryName}
                        onChange={(e) => setEditingCategoryName(e.target.value)}
                        className="flex-1 mr-2"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSaveEditCategory()
                          }
                          if (e.key === "Escape") {
                            handleCancelEditCategory()
                          }
                        }}
                        autoFocus
                      />
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={handleSaveEditCategory}>
                          <Check className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleCancelEditCategory}>
                          <X className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-sm font-medium">{category}</span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => handleStartEditCategory(index)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteCategory(index)}>
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsCategoryManagerOpen(false)}>
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
