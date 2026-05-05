"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, FileText, Plus, Download } from "lucide-react"
import { AddTemplateDialog } from "@/components/admin/add-template-dialog"
import { ViewTemplateDialog } from "@/components/admin/view-template-dialog"

interface WorkOrderTemplate {
  id: string
  name: string
  description: string
  serviceCategories: string[]
  dateAdded: string
}

const mockTemplates: WorkOrderTemplate[] = [
  {
    id: "WOT-001",
    name: "Standard Vehicle Service",
    description: "Comprehensive routine maintenance checklist for all vehicle types",
    serviceCategories: ["Minor Service (A)", "Engine Oil & Filters"],
    dateAdded: "2024-01-15",
  },
  {
    id: "WOT-002",
    name: "Heavy Vehicle Major Service",
    description: "Extended service protocol for heavy vehicles and trucks",
    serviceCategories: ["Major Service (B)", "Brake Inspection", "Engine Oil & Filters"],
    dateAdded: "2024-01-20",
  },
  {
    id: "WOT-003",
    name: "Compliance & Safety Inspection",
    description: "Full compliance and roadworthy inspection template",
    serviceCategories: ["Compliance Roadworthy", "Brake Inspection"],
    dateAdded: "2024-02-05",
  },
]

export function WorkOrderTemplates() {
  const [searchTerm, setSearchTerm] = useState("")
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("all")
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState("all")
  const [isAddTemplateOpen, setIsAddTemplateOpen] = useState(false)
  const [isViewTemplateOpen, setIsViewTemplateOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<WorkOrderTemplate | null>(null)

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesSearch =
      template.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      serviceCategoryFilter === "all" ||
      template.serviceCategories.some((cat) => cat.toLowerCase().includes(serviceCategoryFilter.toLowerCase()))

    return matchesSearch && matchesCategory
  })

  const handleViewTemplate = (template: WorkOrderTemplate) => {
    setSelectedTemplate(template)
    setIsViewTemplateOpen(true)
  }

  const handleDownloadTemplate = (template: WorkOrderTemplate) => {
    console.log("Downloading template:", template.id)
    // In production, this would trigger actual PDF download
  }

  return (
    <div className="space-y-6">
      {/* Header with count and add button */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {filteredTemplates.length} work order template
          {filteredTemplates.length !== 1 ? "s" : ""}
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setIsAddTemplateOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Template
        </Button>
      </div>

      {/* Search and filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Work Order Document ID, Name, or Description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={vehicleTypeFilter} onValueChange={setVehicleTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Vehicle Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Vehicle Types</SelectItem>
            <SelectItem value="sedan">Sedan</SelectItem>
            <SelectItem value="suv">SUV</SelectItem>
            <SelectItem value="truck">Truck</SelectItem>
            <SelectItem value="van">Van</SelectItem>
          </SelectContent>
        </Select>
        <Select value={serviceCategoryFilter} onValueChange={setServiceCategoryFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Service Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="minor">Minor Service (A)</SelectItem>
            <SelectItem value="major">Major Service (B)</SelectItem>
            <SelectItem value="brake">Brake Inspection</SelectItem>
            <SelectItem value="compliance">Compliance Roadworthy</SelectItem>
            <SelectItem value="engine">Engine Oil & Filters</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Templates table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Work Order Document ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Service Categories</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTemplates.map((template) => (
              <TableRow key={template.id}>
                <TableCell className="font-medium">{template.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{template.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground max-w-md">{template.description}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {template.serviceCategories.map((category, index) => (
                      <Badge key={index} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(template.dateAdded).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      onClick={() => handleViewTemplate(template)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDownloadTemplate(template)}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AddTemplateDialog open={isAddTemplateOpen} onOpenChange={setIsAddTemplateOpen} />
      <ViewTemplateDialog open={isViewTemplateOpen} onOpenChange={setIsViewTemplateOpen} template={selectedTemplate} />
    </div>
  )
}
