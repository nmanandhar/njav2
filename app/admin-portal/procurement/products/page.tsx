"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Edit, Package, AlertTriangle, TrendingUp, Plus, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProcurementHeader from "@/components/admin/procurement-header"
import AddProductDialog, { type ProductFormData } from "@/components/admin/add-product-dialog"

interface ProductSupplier {
  supplierId: string
  supplierName: string
  location: string
  unitPrice: string
  stockLevel: number
  minStock: number
  leadTime: string
  isPrimary: boolean
}

interface ProductLocation {
  location: string
  stockQuantity: number
}

interface Product {
  id: string
  sku: string
  name: string
  description?: string
  category: string
  unit: string
  price: string
  minStock: number
  maxStock: number
  locations: ProductLocation[]
  lastRestocked: string
  suppliers: ProductSupplier[]
  availability: "In Stock" | "Low Stock" | "Out of Stock"
}

const initialProducts: Product[] = [
  {
    id: "1",
    sku: "HYD-OIL-20L",
    name: "Hydraulic Oil - Premium Grade",
    description: "High-performance hydraulic oil for heavy equipment",
    category: "Fluids & Lubricants",
    unit: "Per Tonne",
    price: "$85.00",
    minStock: 10,
    maxStock: 100,
    locations: [{ location: "Warehouse A - Bay 3", stockQuantity: 100 }],
    lastRestocked: "2024-01-12",
    availability: "In Stock",
    suppliers: [
      {
        supplierId: "SUP-002",
        supplierName: "Fuel Direct Australia",
        location: "Brisbane QLD",
        unitPrice: "$85.00",
        stockLevel: 100,
        minStock: 30,
        leadTime: "2-3 days",
        isPrimary: true,
      },
      {
        supplierId: "SUP-005",
        supplierName: "Oil & Lubricants Co",
        location: "Sydney NSW",
        unitPrice: "$88.50",
        stockLevel: 45,
        minStock: 20,
        leadTime: "5-7 days",
        isPrimary: false,
      },
    ],
  },
  {
    id: "2",
    sku: "AIR-FLT-HD-001",
    name: "Heavy Duty Air Filter",
    description: "Industrial air filter for heavy-duty machinery",
    category: "Parts & Components",
    unit: "Hourly",
    price: "$125.00",
    minStock: 5,
    maxStock: 50,
    locations: [{ location: "Warehouse A - Bay 5", stockQuantity: 8 }],
    lastRestocked: "2024-01-15",
    availability: "Low Stock",
    suppliers: [
      {
        supplierId: "SUP-003",
        supplierName: "Industrial Parts Warehouse",
        location: "Melbourne VIC",
        unitPrice: "$125.00",
        stockLevel: 8,
        minStock: 15,
        leadTime: "3-5 days",
        isPrimary: true,
      },
    ],
  },
  {
    id: "3",
    sku: "SAFE-VEST-HV-XL",
    name: "Safety Vest - High Visibility",
    description: "ANSI-compliant high-visibility safety vest",
    category: "Safety & PPE",
    unit: "Load Rate",
    price: "$780.00",
    minStock: 20,
    maxStock: 200,
    locations: [{ location: "Warehouse B - Bay 1", stockQuantity: 150 }],
    lastRestocked: "2024-01-10",
    availability: "In Stock",
    suppliers: [
      {
        supplierId: "SUP-004",
        supplierName: "Safety Equipment Solutions",
        location: "Perth WA",
        unitPrice: "$780.00",
        stockLevel: 5,
        minStock: 20,
        leadTime: "2-3 days",
        isPrimary: true,
      },
    ],
  },
  {
    id: "4",
    sku: "TRK-TIRE-HD-22",
    name: "Heavy Duty Truck Tire - 22.5 inch",
    description: "Commercial grade truck tire for heavy loads",
    category: "Parts & Components",
    unit: "Per Unit",
    price: "$450.00",
    minStock: 8,
    maxStock: 40,
    locations: [
      { location: "Warehouse A - Bay 2", stockQuantity: 12 },
      { location: "Warehouse B - Bay 3", stockQuantity: 8 },
    ],
    lastRestocked: "2024-01-08",
    availability: "Low Stock",
    suppliers: [
      {
        supplierId: "SUP-003",
        supplierName: "Industrial Parts Warehouse",
        location: "Melbourne VIC",
        unitPrice: "$450.00",
        stockLevel: 12,
        minStock: 8,
        leadTime: "7-10 days",
        isPrimary: true,
      },
    ],
  },
  {
    id: "5",
    sku: "ENG-OIL-SYN-5L",
    name: "Synthetic Engine Oil - 5L",
    description: "Premium synthetic engine oil for diesel engines",
    category: "Fluids & Lubricants",
    unit: "Per Litre",
    price: "$65.00",
    minStock: 15,
    maxStock: 120,
    locations: [{ location: "Warehouse A - Bay 3", stockQuantity: 10 }],
    lastRestocked: "2024-01-14",
    availability: "Low Stock",
    suppliers: [
      {
        supplierId: "SUP-001",
        supplierName: "Heavy Equipment Supplies Pty Ltd",
        location: "Warehouse A - Bay 3",
        unitPrice: "$65.00",
        stockLevel: 10,
        minStock: 15,
        leadTime: "3-5 days",
        isPrimary: true,
      },
    ],
  },
  {
    id: "6",
    sku: "BAT-HD-12V-150",
    name: "Heavy Duty Battery - 12V 150Ah",
    description: "Heavy-duty 12V battery for commercial vehicles",
    category: "Parts & Components",
    unit: "Per Unit",
    price: "$320.00",
    minStock: 6,
    maxStock: 30,
    locations: [{ location: "Warehouse B - Bay 4", stockQuantity: 0 }],
    lastRestocked: "2024-01-05",
    availability: "Out of Stock",
    suppliers: [
      {
        supplierId: "SUP-001",
        supplierName: "Heavy Equipment Supplies Pty Ltd",
        location: "Warehouse B - Bay 4",
        unitPrice: "$320.00",
        stockLevel: 0,
        minStock: 6,
        leadTime: "3-5 days",
        isPrimary: true,
      },
    ],
  },
]

const availableSuppliers = [
  { id: "SUP-001", name: "Heavy Equipment Supplies Pty Ltd" },
  { id: "SUP-002", name: "Fuel Direct Australia" },
  { id: "SUP-003", name: "Industrial Parts Warehouse" },
  { id: "SUP-004", name: "Safety Equipment Solutions" },
  { id: "SUP-005", name: "Oil & Lubricants Co" },
  { id: "SUP-006", name: "Welding Supplies Pro" },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [selectedItem, setSelectedItem] = useState<Product | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editFormData, setEditFormData] = useState<Product | null>(null)
  const [activeTab, setActiveTab] = useState("details")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)

  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" // Assuming status filter is not applicable here
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const totalItems = products.length
  const lowStockItems = products.filter((item) => item.suppliers.some((s) => s.stockLevel < s.minStock)).length
  const outOfStockItems = products.filter((item) => item.suppliers.every((s) => s.stockLevel === 0)).length

  const handleViewItem = (item: Product) => {
    setSelectedItem(item)
    setEditFormData(item)
    setIsViewModalOpen(true)
    setIsEditMode(false)
    setActiveTab("details")
  }

  const handleEditItem = (item: Product) => {
    setSelectedItem(item)
    setEditFormData(item)
    setIsViewModalOpen(true)
    setIsEditMode(true)
    setActiveTab("details")
  }

  const handleSave = () => {
    console.log("Saving item:", editFormData)
    setIsEditMode(false)
    setIsViewModalOpen(false)
  }

  const handleCancel = () => {
    setEditFormData(selectedItem)
    setIsEditMode(false)
  }

  const handleAddSupplier = () => {
    if (!editFormData) return
    const newSupplier: ProductSupplier = {
      supplierId: "",
      supplierName: "",
      location: "",
      unitPrice: "$0.00",
      stockLevel: 0,
      minStock: 0,
      leadTime: "",
      isPrimary: editFormData.suppliers.length === 0,
    }
    setEditFormData({
      ...editFormData,
      suppliers: [...editFormData.suppliers, newSupplier],
    })
  }

  const handleRemoveSupplier = (index: number) => {
    if (!editFormData) return
    const updatedSuppliers = editFormData.suppliers.filter((_, i) => i !== index)
    setEditFormData({
      ...editFormData,
      suppliers: updatedSuppliers,
    })
  }

  const handleSupplierChange = (index: number, field: keyof ProductSupplier, value: any) => {
    if (!editFormData) return
    const updatedSuppliers = [...editFormData.suppliers]
    updatedSuppliers[index] = { ...updatedSuppliers[index], [field]: value }

    // If setting as primary, unset others
    if (field === "isPrimary" && value === true) {
      updatedSuppliers.forEach((s, i) => {
        if (i !== index) s.isPrimary = false
      })
    }

    setEditFormData({
      ...editFormData,
      suppliers: updatedSuppliers,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "in stock":
        return "bg-green-500/10 text-green-700 border-green-200"
      case "low stock":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200"
      case "out of stock":
        return "bg-red-500/10 text-red-700 border-red-200"
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200"
    }
  }

  const handleAddProduct = (productData: ProductFormData) => {
    const newProduct: Product = {
      id: `PROD-${Date.now()}`,
      sku: productData.sku,
      name: productData.name,
      description: productData.description,
      category: productData.category,
      unit: productData.unitType,
      price: `$${productData.unitPrice}`,
      minStock: Number.parseInt(productData.reorderLevel),
      maxStock: Number.parseInt(productData.reorderLevel) * 10,
      locations: productData.locations.map((loc) => ({
        location: loc.location,
        stockQuantity: Number.parseInt(loc.stockQuantity) || 0,
      })),
      lastRestocked: new Date().toISOString().split("T")[0],
      availability: productData.availability,
      suppliers: [
        {
          supplierId: "SUP-001",
          supplierName: "Default Supplier",
          location: productData.locations[0]?.location || "Unknown",
          unitPrice: productData.unitPrice,
          stockLevel:
            productData.availability === "Out of Stock" ? 0 : productData.availability === "Low Stock" ? 5 : 20,
          minStock: Number.parseInt(productData.reorderLevel) || 0,
          leadTime: "3-5 days",
          isPrimary: true,
        },
      ],
    }

    setProducts([newProduct, ...products])
    setIsAddProductOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* AdminTopNav moved to layout */}

      <div className="bg-white border-b px-6 py-3">
        <div className="flex items-center gap-2 text-sm">
          <Link
            href="/admin-portal/procurement/suppliers"
            className="text-orange-600 hover:text-orange-700 transition-colors"
          >
            Procurement
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-gray-900">Products</span>
        </div>
      </div>

      <ProcurementHeader onAddProduct={() => setIsAddProductOpen(true)} />

      <main className="mx-auto px-6 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold mt-1">{totalItems}</p>
              </div>
              <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold mt-1">{lowStockItems}</p>
              </div>
              <div className="h-12 w-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
                <p className="text-2xl font-bold mt-1">{outOfStockItems}</p>
              </div>
              <div className="h-12 w-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by item name, SKU, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in stock">In Stock</SelectItem>
                <SelectItem value="low stock">Low Stock</SelectItem>
                <SelectItem value="out of stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Equipment">Equipment</SelectItem>
                <SelectItem value="Fluids & Lubricants">Fluids & Lubricants</SelectItem>
                <SelectItem value="Parts & Components">Parts & Components</SelectItem>
                <SelectItem value="Safety & PPE">Safety & PPE</SelectItem>
                <SelectItem value="Materials">Materials</SelectItem>
                <SelectItem value="Tools & Equipment">Tools & Equipment</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" style={{ minWidth: "1400px" }}>
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-medium text-sm" style={{ width: "120px" }}>
                    Product Images
                  </th>
                  <th className="text-left p-4 font-medium text-sm" style={{ width: "140px" }}>
                    Product Code
                  </th>
                  <th className="text-left p-4 font-medium text-sm" style={{ width: "200px" }}>
                    Product Name
                  </th>
                  <th className="text-left p-4 font-medium text-sm" style={{ width: "250px" }}>
                    Product Description
                  </th>
                  <th className="text-left p-4 font-medium text-sm" style={{ width: "180px" }}>
                    Category
                  </th>
                  <th className="text-left p-4 font-medium text-sm" style={{ width: "120px" }}>
                    Unit & Price
                  </th>
                  <th className="text-left p-4 font-medium text-sm" style={{ width: "130px" }}>
                    Availability
                  </th>
                  <th className="text-left p-4 font-medium text-sm" style={{ width: "180px" }}>
                    Suppliers
                  </th>
                  <th className="text-left p-4 font-medium text-sm" style={{ width: "150px" }}>
                    Location
                  </th>
                  <th className="text-left p-4 font-medium text-sm" style={{ width: "100px" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProducts.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/50">
                    <td className="p-4">
                      <div className="h-16 w-16 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                        <img
                          src={`/.jpg?key=m3mw0&height=64&width=64&query=${encodeURIComponent(item.name)}`}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-muted-foreground">{item.sku}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{item.name}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-muted-foreground">{item.description || "-"}</div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{item.category}</Badge>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="text-sm font-medium">{item.unit}</div>
                        <div className="text-sm text-muted-foreground">{item.price}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          item.availability === "In Stock"
                            ? "default"
                            : item.availability === "Low Stock"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {item.availability}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="text-sm font-medium">
                          {item.suppliers.length} Supplier{item.suppliers.length !== 1 ? "s" : ""}
                        </div>
                        {item.suppliers.find((s) => s.isPrimary) && (
                          <div className="text-xs text-muted-foreground">
                            Primary: {item.suppliers.find((s) => s.isPrimary)?.supplierName}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      {item.locations.length === 1 ? (
                        <div className="text-sm">
                          <div className="font-medium">{item.locations[0].location}</div>
                          <div className="text-xs text-muted-foreground">
                            Stock: {item.locations[0].stockQuantity} units
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {item.locations.map((loc, idx) => (
                            <div key={idx} className="text-sm">
                              <div className="font-medium">{loc.location}</div>
                              <div className="text-xs text-muted-foreground">Stock: {loc.stockQuantity} units</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleViewItem(item)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEditItem(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <AddProductDialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen} onAdd={handleAddProduct} />

      {/* View/Edit Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto" style={{ width: "95vw", maxWidth: "95vw" }}>
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Product" : "Product Details"}</DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update product information and manage suppliers"
                : "View detailed information about this product"}
            </DialogDescription>
          </DialogHeader>

          {editFormData && (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Product Details</TabsTrigger>
                <TabsTrigger value="suppliers">Suppliers ({editFormData.suppliers.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                {/* Item Information */}
                <div>
                  <h3 className="text-sm font-semibold mb-4">Item Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Item ID</Label>
                      <Input value={editFormData.id} disabled className="mt-1" />
                    </div>
                    <div>
                      <Label>Item Name</Label>
                      <Input
                        value={editFormData.name}
                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                        disabled={!isEditMode}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>SKU</Label>
                      <Input
                        value={editFormData.sku}
                        onChange={(e) => setEditFormData({ ...editFormData, sku: e.target.value })}
                        disabled={!isEditMode}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Category</Label>
                      {isEditMode ? (
                        <Select
                          value={editFormData.category}
                          onValueChange={(value) => setEditFormData({ ...editFormData, category: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Equipment">Equipment</SelectItem>
                            <SelectItem value="Fluids & Lubricants">Fluids & Lubricants</SelectItem>
                            <SelectItem value="Parts & Components">Parts & Components</SelectItem>
                            <SelectItem value="Safety & PPE">Safety & PPE</SelectItem>
                            <SelectItem value="Materials">Materials</SelectItem>
                            <SelectItem value="Tools & Equipment">Tools & Equipment</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input value={editFormData.category} disabled className="mt-1" />
                      )}
                    </div>
                    <div>
                      <Label>Unit</Label>
                      {isEditMode ? (
                        <Select
                          value={editFormData.unit}
                          onValueChange={(value) => setEditFormData({ ...editFormData, unit: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Hourly">Hourly</SelectItem>
                            <SelectItem value="Per Tonne">Per Tonne</SelectItem>
                            <SelectItem value="Load Rate">Load Rate</SelectItem>
                            <SelectItem value="Per Unit">Per Unit</SelectItem>
                            <SelectItem value="Per Box">Per Box</SelectItem>
                            <SelectItem value="Per Set">Per Set</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input value={editFormData.unit} disabled className="mt-1" />
                      )}
                    </div>
                    <div>
                      <Label>Price</Label>
                      {isEditMode ? (
                        <Input
                          value={editFormData.price}
                          onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                          disabled={!isEditMode}
                          className="mt-1"
                        />
                      ) : (
                        <Input value={editFormData.price} disabled className="mt-1" />
                      )}
                    </div>
                    <div className="col-span-2">
                      <Label>Description</Label>
                      {isEditMode ? (
                        <Input
                          value={editFormData.description || ""}
                          onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                          disabled={!isEditMode}
                          className="mt-1"
                        />
                      ) : (
                        <Input value={editFormData.description || "-"} disabled className="mt-1" />
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-4">Locations</h3>
                  {isEditMode ? (
                    <div className="space-y-3">
                      {editFormData.locations.map((loc, index) => (
                        <div key={index} className="grid grid-cols-[1fr_150px_40px] gap-3 items-end">
                          <div>
                            <Label className="text-sm">Location</Label>
                            <Input
                              value={loc.location}
                              onChange={(e) => {
                                const updatedLocations = [...editFormData.locations]
                                updatedLocations[index] = { ...updatedLocations[index], location: e.target.value }
                                setEditFormData({ ...editFormData, locations: updatedLocations })
                              }}
                              placeholder="e.g., Warehouse A - Bay 3"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Stock Quantity</Label>
                            <Input
                              type="number"
                              value={loc.stockQuantity}
                              onChange={(e) => {
                                const updatedLocations = [...editFormData.locations]
                                updatedLocations[index] = {
                                  ...updatedLocations[index],
                                  stockQuantity: Number.parseInt(e.target.value) || 0,
                                }
                                setEditFormData({ ...editFormData, locations: updatedLocations })
                              }}
                              placeholder="0"
                              className="mt-1"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const updatedLocations = editFormData.locations.filter((_, i) => i !== index)
                              setEditFormData({ ...editFormData, locations: updatedLocations })
                            }}
                            disabled={editFormData.locations.length === 1}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        onClick={() =>
                          setEditFormData({
                            ...editFormData,
                            locations: [...editFormData.locations, { location: "", stockQuantity: 0 }],
                          })
                        }
                        variant="outline"
                        size="sm"
                        className="mt-2"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Location
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {editFormData.locations.map((loc, index) => (
                        <div key={index} className="flex justify-between items-center py-2 px-3 bg-muted/50 rounded-md">
                          <span className="font-medium">{loc.location}</span>
                          <span className="text-sm text-muted-foreground">Stock: {loc.stockQuantity} units</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="suppliers" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant={editFormData.suppliers[0]?.isPrimary ? "default" : "secondary"}>
                      {editFormData.suppliers[0]?.isPrimary ? "Primary Supplier" : "Alternative Supplier"}
                    </Badge>
                    <span className="text-sm font-medium">Supplier 1</span>
                  </div>
                  {isEditMode && (
                    <Button onClick={handleAddSupplier} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Supplier
                    </Button>
                  )}
                </div>

                {editFormData.suppliers.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground border border-dashed rounded-lg">
                    No suppliers added yet. Click "Add Supplier" to get started.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {editFormData.suppliers.map((supplier, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant={supplier.isPrimary ? "default" : "secondary"}>
                              {supplier.isPrimary ? "Primary Supplier" : "Alternative Supplier"}
                            </Badge>
                            <span className="text-sm font-medium">Supplier {index + 1}</span>
                          </div>
                          {isEditMode && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveSupplier(index)}
                              disabled={editFormData.suppliers.length === 1}
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Supplier Name</Label>
                            {isEditMode ? (
                              <Select
                                value={supplier.supplierId}
                                onValueChange={(value) => {
                                  const selectedSupplier = availableSuppliers.find((s) => s.id === value)
                                  handleSupplierChange(index, "supplierId", value)
                                  handleSupplierChange(index, "supplierName", selectedSupplier?.name || "")
                                }}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Select supplier" />
                                </SelectTrigger>
                                <SelectContent>
                                  {availableSuppliers.map((s) => (
                                    <SelectItem key={s.id} value={s.id}>
                                      {s.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input value={supplier.supplierName} disabled className="mt-1" />
                            )}
                          </div>
                          <div>
                            <Label>Location</Label>
                            <Input
                              value={supplier.location}
                              onChange={(e) => handleSupplierChange(index, "location", e.target.value)}
                              disabled={!isEditMode}
                              placeholder="e.g., Brisbane QLD"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Unit Price</Label>
                            <Input
                              value={supplier.unitPrice}
                              onChange={(e) => handleSupplierChange(index, "unitPrice", e.target.value)}
                              disabled={!isEditMode}
                              placeholder="e.g., $85.00"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Stock Level</Label>
                            <Input
                              type="number"
                              value={supplier.stockLevel}
                              onChange={(e) =>
                                handleSupplierChange(index, "stockLevel", Number.parseInt(e.target.value) || 0)
                              }
                              disabled={!isEditMode}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Minimum Stock</Label>
                            <Input
                              type="number"
                              value={supplier.minStock}
                              onChange={(e) =>
                                handleSupplierChange(index, "minStock", Number.parseInt(e.target.value) || 0)
                              }
                              disabled={!isEditMode}
                              className="mt-1"
                            />
                          </div>
                        </div>

                        {isEditMode && (
                          <div className="flex items-center gap-2 pt-2">
                            <input
                              type="checkbox"
                              id={`primary-${index}`}
                              checked={supplier.isPrimary}
                              onChange={(e) => handleSupplierChange(index, "isPrimary", e.target.checked)}
                              className="h-4 w-4 rounded border-gray-300"
                            />
                            <Label htmlFor={`primary-${index}`} className="text-sm cursor-pointer">
                              Set as primary supplier
                            </Label>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            {isEditMode ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => setIsEditMode(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Product
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
