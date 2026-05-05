"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Plus, Download, Upload, CheckCircle, AlertTriangle, ArrowLeft } from "lucide-react"
import { AddVehicleDialog } from "./add-vehicle-dialog"
import { useRouter } from "next/navigation"

export function AdminFleetHeader() {
  const [addVehicleOpen, setAddVehicleOpen] = useState(false)
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

      <div className="space-y-6 mt-6">
        {/* Fleet Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Fleet</CardTitle>
              <ArrowLeft className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">35</div>
              <div className="flex items-center gap-2 flex-wrap mt-2">
                <Badge variant="default" className="text-xs bg-teal-600">
                  +3 this month
                </Badge>
                <p className="text-xs text-muted-foreground">Active vehicles</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <div className="flex items-center gap-2 flex-wrap mt-2">
                <Badge variant="secondary" className="text-xs bg-orange-500 text-white">
                  80% utilisation
                </Badge>
                <p className="text-xs text-muted-foreground">Currently operational</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <div className="flex items-center gap-2 flex-wrap mt-2">
                <Badge variant="destructive" className="text-xs">
                  2 overdue
                </Badge>
                <p className="text-xs text-muted-foreground">In service/repair</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <div className="flex items-center gap-2 flex-wrap mt-2">
                <Badge variant="destructive" className="text-xs">
                  3 critical
                </Badge>
                <p className="text-xs text-muted-foreground">Require attention</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <AddVehicleDialog open={isAddVehicleOpen} onOpenChange={setIsAddVehicleOpen} />
      </div>
    </>
  )
}
