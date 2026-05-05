"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function JobsHeaderClient() {
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Jobs Management</h1>
          <p className="text-muted-foreground">View and track your job lifecycle and status</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </div>
  )
}
