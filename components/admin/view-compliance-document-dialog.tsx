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
import { FileText, Download, Calendar, Tag } from "lucide-react"

interface ComplianceDocument {
  id: string
  name: string
  description: string
  complianceCategories: string[]
  dateAdded: string
  fileName: string
}

interface ViewComplianceDocumentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  document: ComplianceDocument | null
}

export function ViewComplianceDocumentDialog({ open, onOpenChange, document }: ViewComplianceDocumentDialogProps) {
  if (!document) return null

  const handleDownload = () => {
    console.log("[v0] Downloading document:", document.fileName)
    // In production, this would trigger actual file download
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600" />
            <DialogTitle>{document.name}</DialogTitle>
          </div>
          <DialogDescription>{document.id}</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto space-y-6 py-4">
          {/* Document Details */}
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Description</h3>
              <p className="text-sm text-muted-foreground">{document.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Tag className="h-4 w-4" />
                  Compliance Categories
                </div>
                <div className="flex flex-wrap gap-2">
                  {document.complianceCategories.map((category, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Calendar className="h-4 w-4" />
                  Date Added
                </div>
                <p className="text-sm text-muted-foreground">{new Date(document.dateAdded).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* PDF Preview */}
          <div className="border-2 border-border rounded-lg p-8 bg-muted/30 flex flex-col items-center justify-center min-h-[400px]">
            <FileText className="h-24 w-24 text-muted-foreground mb-4" />
            <p className="text-sm font-medium text-muted-foreground mb-2">PDF Preview</p>
            <p className="text-xs text-muted-foreground">{document.fileName}</p>
          </div>
        </div>

        <DialogFooter className="flex items-center justify-between">
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
