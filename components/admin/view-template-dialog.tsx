"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Calendar, Tag } from "lucide-react"

interface ViewTemplateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  template: {
    id: string
    name: string
    description: string
    serviceCategories: string[]
    dateAdded: string
    fileName?: string
    fileSize?: string
    pdfUrl?: string
  } | null
}

export function ViewTemplateDialog({ open, onOpenChange, template }: ViewTemplateDialogProps) {
  if (!template) return null

  const handleDownload = () => {
    // In production, this would download the actual PDF
    console.log("Downloading template:", template.id)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600" />
            {template.name}
          </DialogTitle>
          <DialogDescription>{template.id}</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6 py-4">
          {/* Template Details */}
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium mb-1">Description</h3>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Service Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {template.serviceCategories.map((category, index) => (
                    <Badge key={index} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date Added
                </h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(template.dateAdded).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {template.fileName && (
              <div>
                <h3 className="text-sm font-medium mb-2">File Information</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>{template.fileName}</span>
                  {template.fileSize && <span className="text-xs">({template.fileSize})</span>}
                </div>
              </div>
            )}
          </div>

          {/* PDF Preview */}
          <div className="border rounded-lg overflow-hidden bg-muted">
            <div className="aspect-[8.5/11] flex items-center justify-center bg-white">
              {template.pdfUrl ? (
                <iframe src={template.pdfUrl} className="w-full h-full" title="Template Preview" />
              ) : (
                <div className="text-center p-8">
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">PDF Preview</p>
                  <p className="text-xs text-muted-foreground">{template.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="flex-row justify-between sm:justify-between">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
