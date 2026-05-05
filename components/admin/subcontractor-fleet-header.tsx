"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Download, Filter } from "lucide-react"
import { AddSubcontractorVehicleDialog } from "./add-subcontractor-vehicle-dialog"

export function SubcontractorFleetHeader() {
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Subcontractor Fleet</h2>
          <p className="text-muted-foreground mt-1">Monitor and manage all subcontractor vehicles</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={() => setIsAddVehicleOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Vehicle
          </Button>
        </div>
      </div>

      <AddSubcontractorVehicleDialog open={isAddVehicleOpen} onOpenChange={setIsAddVehicleOpen} />
    </>
  )
}
