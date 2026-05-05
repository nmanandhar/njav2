"use client"

import { Button } from "@/components/ui/button"
import { Plus, Download, Upload } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface ProcurementHeaderProps {
  onAddSupplier?: () => void
  onAddProduct?: () => void
}

export function ProcurementHeader({ onAddSupplier, onAddProduct }: ProcurementHeaderProps) {
  const pathname = usePathname()
  const isSuppliersPage = pathname?.includes("/suppliers")
  const isProductsPage = pathname?.includes("/products")

  const handleDownloadTemplate = () => {
    // TODO: Implement template download logic
    console.log("Downloading import template...")
  }

  const handleUploadProducts = () => {
    // TODO: Implement file upload logic
    console.log("Opening file upload dialog...")
  }

  const handleAddClick = () => {
    if (isSuppliersPage && onAddSupplier) {
      onAddSupplier()
    } else if (isProductsPage && onAddProduct) {
      onAddProduct()
    }
  }

  return (
    <div className="bg-card border-b border-border">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Procurement Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage suppliers, products, and procurement operations</p>
        </div>
        <div className="flex items-center gap-2">
          {isProductsPage && (
            <>
              <Button variant="outline" onClick={handleDownloadTemplate}>
                <Download className="h-4 w-4 mr-2" />
                Download Upload Template
              </Button>
              <Button variant="outline" onClick={handleUploadProducts}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Products
              </Button>
            </>
          )}
          <Button onClick={handleAddClick}>
            <Plus className="h-4 w-4 mr-2" />
            {isSuppliersPage ? "Add Supplier" : "Add Product"}
          </Button>
        </div>
      </div>

      <div className="px-6 border-t border-border">
        <nav className="flex space-x-6 -mb-px">
          <Link
            href="/admin-portal/procurement/suppliers"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isSuppliersPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Suppliers
          </Link>
          <Link
            href="/admin-portal/procurement/products"
            className={`border-b-2 py-3 px-1 text-sm font-medium ${
              isProductsPage
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            Products
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default ProcurementHeader
