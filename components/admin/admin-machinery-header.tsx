"use client"

import { Button } from "@/components/ui/button"
import { Plus, FileText, Settings, Download } from "lucide-react"

export function AdminMachineryHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-foreground">Machinery Inventory</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your heavy machinery, equipment, and maintenance schedules
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button variant="outline" size="sm">
          <FileText className="h-4 w-4 mr-2" />
          Reports
        </Button>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Machinery
        </Button>
      </div>
    </div>
  )
}
