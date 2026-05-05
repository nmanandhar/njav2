"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Download, Upload, Wrench } from "lucide-react"
import { AddVehicleDialog } from "./add-vehicle-dialog"
import { useRouter } from "next/navigation"

export function FleetHeader() {
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vehicles, drivers, registration..."
              className="pl-10 w-96 bg-input border-border"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
              onClick={() => router.push("/subcontractor-dashboard/fleet/maintenance")}
            >
              <Wrench className="h-4 w-4 mr-2" />
              Vehicle Maintenance
            </Button>
            <Button variant="outline" className="text-foreground hover:bg-accent bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export Fleet Data
            </Button>
            <Button variant="outline" className="text-foreground hover:bg-accent bg-transparent">
              <Upload className="h-4 w-4 mr-2" />
              Import Vehicles
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => setIsAddVehicleOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Vehicle
            </Button>
          </div>
        </div>
      </header>

      <AddVehicleDialog open={isAddVehicleOpen} onOpenChange={setIsAddVehicleOpen} />
    </>
  )
}
