"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, Calendar, ClipboardList, FileText, Wrench, Package, CalendarClock, Info } from "lucide-react"

interface SubcontractorMaintenanceHistoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vehicle: any
}

export function SubcontractorMaintenanceHistoryDialog({
  open,
  onOpenChange,
  vehicle,
}: SubcontractorMaintenanceHistoryDialogProps) {
  if (!vehicle) return null

  // Mock maintenance history data
  const maintenanceRecords = [
    {
      id: 1,
      type: "Scheduled Service",
      status: "Completed",
      date: "2024-01-12",
      description: "10,000 km service - Oil change, filter replacement, brake inspection, tire rotation",
      vendor: "Premium Auto Care",
      invoice: "INV-2024-001",
      nextDue: "2024-04-12",
      partsUsed: "Engine Oil, Oil Filter, Air Filter, Brake Pads",
    },
    {
      id: 2,
      type: "Repair",
      status: "Completed",
      date: "2023-10-10",
      description: "Air conditioning system regas and compressor replacement",
      vendor: "Climate Control Specialists",
      invoice: "INV-2023-052",
      partsUsed: "AC Compressor, Refrigerant R134a, AC Belt",
    },
    {
      id: 3,
      type: "Inspection",
      status: "Completed",
      date: "2023-09-15",
      description: "Annual safety inspection and compliance check",
      vendor: "Certified Inspections Pty Ltd",
      invoice: "INV-2023-089",
    },
    {
      id: 4,
      type: "Repair",
      status: "Completed",
      date: "2023-06-15",
      description: "Suspension repair - replaced worn shock absorbers and bushings",
      vendor: "Suspension Specialists",
      invoice: "INV-2023-112",
      partsUsed: "Front Shock Absorbers, Rear Shock Absorbers, Control Arm Bushings",
    },
    {
      id: 5,
      type: "Scheduled Service",
      status: "Completed",
      date: "2023-05-08",
      description: "5,000 km service - basic maintenance and inspection",
      vendor: "Premium Auto Care",
      invoice: "INV-2023-145",
      nextDue: "2023-09-05",
      partsUsed: "Engine Oil, Oil Filter",
    },
    {
      id: 6,
      type: "Repair",
      status: "Completed",
      date: "2023-03-22",
      description: "Battery replacement and electrical system check",
      vendor: "Auto Electric Services",
      invoice: "INV-2023-178",
      partsUsed: "Heavy Duty Battery, Battery Terminals",
    },
  ]

  const totalRecords = maintenanceRecords.length
  const lastService = maintenanceRecords[0].date
  const nextDue = maintenanceRecords[0].nextDue || "TBA"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto p-6" style={{ width: "95vw", maxWidth: "95vw" }}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Wrench className="h-6 w-6" />
            Maintenance History - {vehicle.registration}
          </DialogTitle>
          <p className="text-muted-foreground">
            View complete maintenance records submitted by{" "}
            {vehicle.subcontractorName || "Heavy Equipment Supplies Pty Ltd"}
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Vehicle Information */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Vehicle</p>
              <p className="text-sm font-semibold">
                {vehicle.make} {vehicle.model}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Registration</p>
              <p className="text-sm font-semibold">{vehicle.registration}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                Subcontractor
              </p>
              <p className="text-sm font-semibold">{vehicle.subcontractorName || "Heavy Equipment Supplies Pty Ltd"}</p>
            </div>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-6 border border-border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <ClipboardList className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-sm text-muted-foreground">Total Records</p>
              </div>
              <p className="text-3xl font-bold">{totalRecords}</p>
            </div>

            <div className="p-6 border border-border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-emerald-500" />
                </div>
                <p className="text-sm text-muted-foreground">Last Service</p>
              </div>
              <p className="text-3xl font-bold">{lastService}</p>
            </div>

            <div className="p-6 border border-border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <CalendarClock className="h-5 w-5 text-orange-500" />
                </div>
                <p className="text-sm text-muted-foreground">Next Due</p>
              </div>
              <p className="text-3xl font-bold">{nextDue}</p>
            </div>
          </div>

          {/* Maintenance Records */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Maintenance Records
            </h3>

            <div className="space-y-4">
              {maintenanceRecords.map((record) => (
                <div key={record.id} className="border border-border rounded-lg p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            record.type === "Scheduled Service"
                              ? "default"
                              : record.type === "Repair"
                                ? "secondary"
                                : "outline"
                          }
                          className="font-medium"
                        >
                          {record.type}
                        </Badge>
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          {record.status}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground ml-2">
                          <Calendar className="h-3 w-3" />
                          <span>{record.date}</span>
                        </div>
                      </div>
                      <p className="text-base font-medium">{record.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-start gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Vendor</p>
                        <p className="font-medium">{record.vendor}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Invoice</p>
                        <p className="font-medium">{record.invoice}</p>
                      </div>
                    </div>

                    {record.nextDue && (
                      <div className="flex items-start gap-2">
                        <CalendarClock className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Next Due</p>
                          <p className="font-medium text-orange-600">{record.nextDue}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {record.partsUsed && (
                    <div className="pt-3 border-t border-border">
                      <div className="flex items-start gap-2">
                        <Package className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Parts Used</p>
                          <p className="text-sm">{record.partsUsed}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Read-Only Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900 mb-1">Read-Only View</p>
                <p className="text-sm text-blue-700">
                  This maintenance history is managed by the subcontractor through their portal. Contact{" "}
                  {vehicle.subcontractorName || "Heavy Equipment Supplies Pty Ltd"} for any updates or corrections to
                  these records.
                </p>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-end pt-4">
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
