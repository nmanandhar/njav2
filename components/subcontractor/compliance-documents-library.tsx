"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Eye, FileText, Plus, Upload, X, Download } from "lucide-react"
import { ViewComplianceDocumentDialog } from "@/components/admin/view-compliance-document-dialog"

interface ComplianceDocument {
  id: string
  name: string
  description: string
  complianceCategories: string[]
  dateAdded: string
  fileName: string
}

const COMPLIANCE_CATEGORIES = [
  "Vehicle & Fleet Compliance",
  "Driver Compliance",
  "Safety & Workplace Compliance",
  "Dangerous Goods & Specialised Freight Compliance",
  "Chain of Responsibility (CoR) Compliance",
  "Environmental & Operational Compliance",
  "Insurance & Legal",
]

const mockDocuments: ComplianceDocument[] = [
  {
    id: "CD-001",
    name: "Safe Work Method Statements (SWMS)",
    description: "Standard safety inspection form for all vehicle types",
    complianceCategories: ["Vehicle & Fleet Compliance", "Safety & Workplace Compliance"],
    dateAdded: "2024-01-15",
    fileName: "safety-inspection-checklist.pdf",
  },
  {
    id: "CD-002",
    name: "Maintenance & Pre-Start Inspection Logs",
    description: "Required documentation for heavy vehicle maintenance records",
    complianceCategories: ["Vehicle & Fleet Compliance", "Chain of Responsibility (CoR) Compliance"],
    dateAdded: "2024-01-22",
    fileName: "heavy-vehicle-maintenance-log.pdf",
  },
  {
    id: "CD-003",
    name: "EPA Waste Transport Permits",
    description: "Emissions and environmental compliance documentation",
    complianceCategories: ["Environmental & Operational Compliance", "Vehicle & Fleet Compliance"],
    dateAdded: "2024-02-10",
    fileName: "environmental-compliance-report.pdf",
  },
]

export function ComplianceDocumentsLibrary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<ComplianceDocument | null>(null)

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch =
      doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type === "application/pdf") {
        setUploadedFile(file)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type === "application/pdf") {
        setUploadedFile(file)
      }
    }
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleViewDocument = (document: ComplianceDocument) => {
    setSelectedDocument(document)
    setIsViewDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header with count and add button */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {filteredDocuments.length} compliance document
          {filteredDocuments.length !== 1 ? "s" : ""}
        </div>
        <Button className="bg-green-600 hover:bg-green-700" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Document
        </Button>
      </div>

      {/* Search bar */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Compliance Document ID or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Documents table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Compliance Document ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Compliance Categories</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.map((document) => (
              <TableRow key={document.id}>
                <TableCell className="font-medium">{document.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-red-600" />
                    <span className="font-medium">{document.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground max-w-md">{document.description}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {document.complianceCategories.map((category, index) => (
                      <Badge key={index} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(document.dateAdded).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDocument(document)}
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Document Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Compliance Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="document-name">Document Name</Label>
              <Input id="document-name" placeholder="Enter document name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter document description" rows={3} />
            </div>

            <div className="space-y-2">
              <Label>Compliance Categories</Label>
              <div className="flex flex-wrap gap-2">
                {COMPLIANCE_CATEGORIES.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategories.includes(category) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Click to select one or more categories</p>
            </div>

            <div className="space-y-2">
              <Label>Upload PDF Document</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? "border-primary bg-primary/5" : "border-border"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {uploadedFile ? (
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-red-600" />
                      <div className="text-left">
                        <p className="font-medium">{uploadedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUploadedFile(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm font-medium mb-1">Drag and drop your PDF here</p>
                    <p className="text-xs text-muted-foreground mb-4">or</p>
                    <label htmlFor="file-upload">
                      <Button variant="outline" size="sm" asChild>
                        <span>Browse Files</span>
                      </Button>
                    </label>
                    <input id="file-upload" type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
                    <p className="text-xs text-muted-foreground mt-4">PDF files only, max 10MB</p>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">Upload Document</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Document Dialog */}
      <ViewComplianceDocumentDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        document={selectedDocument}
      />
    </div>
  )
}
