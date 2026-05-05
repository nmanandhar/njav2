"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import {
  FileText,
  Download,
  Eye,
  Upload,
  Calendar,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Search,
  Shield,
  X,
} from "lucide-react"

interface DriverDocument {
  id: string
  name: string
  type: "PDF" | "JPG" | "PNG"
  category: string
  dateUploaded: string
  size: string
  expiryDate?: string
  status: "Valid" | "Expiring Soon" | "Expired"
}

interface DriverDocumentsDialogProps {
  driver: {
    id: string
    name: string
    email: string
    licenseNumber: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock driver documents data
const mockDocuments: DriverDocument[] = [
  {
    id: "DOC-D001",
    name: "Driver License (Heavy Combination)",
    type: "PDF",
    category: "License",
    dateUploaded: "2024-01-15",
    size: "185 KB",
    expiryDate: "2025-06-15",
    status: "Valid",
  },
  {
    id: "DOC-D002",
    name: "Medical Fitness Certificate",
    type: "PDF",
    category: "Medical",
    dateUploaded: "2024-01-10",
    size: "220 KB",
    expiryDate: "2024-02-28",
    status: "Expiring Soon",
  },
  {
    id: "DOC-D003",
    name: "White Card Construction Induction",
    type: "PDF",
    category: "Certifications",
    dateUploaded: "2023-06-15",
    size: "310 KB",
    expiryDate: "2023-12-31",
    status: "Expired",
  },
  {
    id: "DOC-D004",
    name: "VOC Assessment Report",
    type: "PDF",
    category: "Certifications",
    dateUploaded: "2024-01-05",
    size: "280 KB",
    status: "Valid",
  },
  {
    id: "DOC-D005",
    name: "Fatigue Management Training",
    type: "PDF",
    category: "Training",
    dateUploaded: "2023-08-20",
    size: "425 KB",
    expiryDate: "2023-12-31",
    status: "Expired",
  },
  {
    id: "DOC-D006",
    name: "National Police Check",
    type: "PDF",
    category: "Compliance",
    dateUploaded: "2023-11-15",
    size: "195 KB",
    expiryDate: "2024-11-15",
    status: "Valid",
  },
  {
    id: "DOC-D007",
    name: "Working with Children Check",
    type: "PDF",
    category: "Compliance",
    dateUploaded: "2023-09-10",
    size: "165 KB",
    expiryDate: "2026-09-10",
    status: "Valid",
  },
  {
    id: "DOC-D008",
    name: "Driver Profile Photo",
    type: "JPG",
    category: "Identity",
    dateUploaded: "2024-01-15",
    size: "1.2 MB",
    status: "Valid",
  },
  {
    id: "DOC-D009",
    name: "Proof of Address - Utility Bill",
    type: "PDF",
    category: "Identity",
    dateUploaded: "2024-01-05",
    size: "350 KB",
    status: "Valid",
  },
  {
    id: "DOC-D010",
    name: "Employment Contract Signed",
    type: "PDF",
    category: "Other",
    dateUploaded: "2023-05-20",
    size: "540 KB",
    status: "Valid",
  },
]

export function DriverDocumentsDialog({ driver, open, onOpenChange }: DriverDocumentsDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isUploadMode, setIsUploadMode] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [uploadCategory, setUploadCategory] = useState("")

  const categories = ["all", "License", "Medical", "Certifications", "Training", "Compliance", "Identity", "Other"]

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Valid":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Expiring Soon":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case "Expired":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Valid":
        return (
          <Badge variant="default" className="bg-green-600">
            Valid
          </Badge>
        )
      case "Expiring Soon":
        return (
          <Badge variant="destructive" className="bg-orange-600">
            Expiring Soon
          </Badge>
        )
      case "Expired":
        return <Badge variant="destructive">Expired</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getFileIcon = (type: string) => {
    return type === "PDF" ? (
      <FileText className="h-5 w-5 text-red-600" />
    ) : (
      <FileText className="h-5 w-5 text-blue-600" />
    )
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedFiles([...uploadedFiles, ...files])
  }

  const removeUploadedFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  const handleUploadSubmit = () => {
    console.log("Uploading documents:", uploadedFiles, "Category:", uploadCategory)
    // Reset upload state
    setUploadedFiles([])
    setUploadCategory("")
    setIsUploadMode(false)
  }

  const documentsByCategory = categories
    .filter((cat) => cat !== "all")
    .map((category) => ({
      category,
      documents: mockDocuments.filter((doc) => doc.category === category),
      count: mockDocuments.filter((doc) => doc.category === category).length,
    }))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[95vw] w-full sm:!max-w-[95vw] md:!max-w-[1800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">Driver Documents</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {driver.name} - {driver.licenseNumber}
              </p>
            </div>
            <Button onClick={() => setIsUploadMode(!isUploadMode)} className="bg-primary">
              <Upload className="h-4 w-4 mr-2" />
              {isUploadMode ? "Cancel Upload" : "Upload Documents"}
            </Button>
          </div>
        </DialogHeader>

        {/* Upload Mode */}
        {isUploadMode && (
          <div className="bg-muted/50 rounded-lg p-6 space-y-4 mb-6">
            <h3 className="text-lg font-semibold">Upload New Documents</h3>

            <div className="space-y-2">
              <Label htmlFor="upload-category">Document Category</Label>
              <select
                id="upload-category"
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value)}
                className="w-full p-2 border border-border rounded-md bg-background"
              >
                <option value="">Select category...</option>
                {categories
                  .filter((cat) => cat !== "all")
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Upload Files</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm font-medium mb-1">Drag and drop files here</p>
                <p className="text-xs text-muted-foreground mb-3">or</p>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Label htmlFor="file-upload">
                  <Button variant="outline" size="sm" asChild>
                    <span>Browse Files</span>
                  </Button>
                </Label>
                <p className="text-xs text-muted-foreground mt-3">PDF, JPG, PNG (max 10MB per file)</p>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2 mt-4">
                  <p className="text-sm font-medium">{uploadedFiles.length} file(s) selected:</p>
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-background border border-border rounded-md"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeUploadedFile(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsUploadMode(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleUploadSubmit}
                disabled={uploadedFiles.length === 0 || !uploadCategory}
                className="bg-primary"
              >
                Upload {uploadedFiles.length} Document(s)
              </Button>
            </div>
          </div>
        )}

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="all">All ({mockDocuments.length})</TabsTrigger>
            <TabsTrigger value="License">License ({documentsByCategory[0]?.count || 0})</TabsTrigger>
            <TabsTrigger value="Medical">Medical ({documentsByCategory[1]?.count || 0})</TabsTrigger>
            <TabsTrigger value="Certifications">Certifications ({documentsByCategory[2]?.count || 0})</TabsTrigger>
            <TabsTrigger value="Training">Training ({documentsByCategory[3]?.count || 0})</TabsTrigger>
            <TabsTrigger value="Compliance">Compliance ({documentsByCategory[4]?.count || 0})</TabsTrigger>
            <TabsTrigger value="Identity">Identity ({documentsByCategory[5]?.count || 0})</TabsTrigger>
            <TabsTrigger value="Other">Other ({documentsByCategory[6]?.count || 0})</TabsTrigger>
          </TabsList>

          {/* Search Bar */}
          <div className="mt-6 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <TabsContent value="all" className="space-y-4 mt-6">
            {/* Document Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Valid Documents</span>
                </div>
                <p className="text-2xl font-bold">{mockDocuments.filter((d) => d.status === "Valid").length}</p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium">Expiring Soon</span>
                </div>
                <p className="text-2xl font-bold">{mockDocuments.filter((d) => d.status === "Expiring Soon").length}</p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Total Documents</span>
                </div>
                <p className="text-2xl font-bold">{mockDocuments.length}</p>
              </div>
            </div>

            <Separator />

            {/* Documents List */}
            <div className="space-y-3">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {getFileIcon(doc.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{doc.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {doc.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {doc.type} • {doc.size}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Uploaded: {new Date(doc.dateUploaded).toLocaleDateString()}
                        </span>
                        {doc.expiryDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(doc.status)}
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No documents found</p>
              </div>
            )}
          </TabsContent>

          {/* Category Tabs */}
          {categories
            .filter((cat) => cat !== "all")
            .map((category) => (
              <TabsContent key={category} value={category} className="space-y-3 mt-6">
                {mockDocuments
                  .filter((doc) => doc.category === category)
                  .map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        {getFileIcon(doc.type)}
                        <div className="flex-1">
                          <h4 className="font-medium">{doc.name}</h4>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              {doc.type} • {doc.size}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Uploaded: {new Date(doc.dateUploaded).toLocaleDateString()}
                            </span>
                            {doc.expiryDate && (
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(doc.status)}
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                {mockDocuments.filter((doc) => doc.category === category).length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No {category.toLowerCase()} documents</p>
                  </div>
                )}
              </TabsContent>
            ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
