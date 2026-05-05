"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Mail,
  Phone,
  Truck,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Smartphone,
  KeyRound,
  Pencil,
} from "lucide-react"
import { useState } from "react"
import { EditDriverDialog } from "./edit-driver-dialog"

interface DriverDetailsProps {
  driver: {
    driverId: string
    name: string
    email: string
    phone: string
    licenseNumber: string
    licenseClass: string
    licenseExpiry: string
    type: string
    status: string
    currentVehicle: string | null
    lastMedical: string
    medicalExpiry: string
    inductionStatus: string
    whiteCard: string
    safetyRating: number
    hourlyRate: { weekday: number; weekend: number }
    nightRate: { weekday: number; weekend: number }
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ViewDriverDetailsDialog({ driver, open, onOpenChange }: DriverDetailsProps) {
  const [firstName, ...lastNameParts] = driver.name.split(" ")
  const lastName = lastNameParts.join(" ")

  const [editDriverOpen, setEditDriverOpen] = useState(false)

  const getExpiryStatus = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntilExpiry <= 0) return { status: "Expired", color: "text-red-600", icon: XCircle }
    if (daysUntilExpiry <= 30) return { status: "Expiring Soon", color: "text-orange-600", icon: AlertTriangle }
    return { status: "Valid", color: "text-green-600", icon: CheckCircle }
  }

  const vehicleRegistration = driver.currentVehicle ? driver.currentVehicle.split(" ")[0] : "N/A"
  const vehicleModel = driver.currentVehicle ? driver.currentVehicle.split(" (")[1]?.replace(")", "") : "N/A"

  const licenseStatus = getExpiryStatus(driver.licenseExpiry)
  const medicalStatus = getExpiryStatus(driver.medicalExpiry)
  const whiteCardStatus = getExpiryStatus(driver.whiteCard)

  const handlePasswordReset = () => {
    // TODO: Implement password reset email functionality
    alert(`Password reset email will be sent to ${driver.email}`)
  }

  const handleEdit = () => {
    setEditDriverOpen(true)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="!max-w-[95vw] w-full sm:!max-w-[95vw] md:!max-w-[1800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl">Driver Details</DialogTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={handleEdit}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Driver
                </Button>
                <Button variant="link" className="text-blue-600 hover:text-blue-800" onClick={handlePasswordReset}>
                  <KeyRound className="h-4 w-4 mr-2" />
                  Send Password Reset
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Personal Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <div className="h-8 w-1 bg-primary mr-3" />
                Personal Details
              </h3>
              <div className="grid grid-cols-2 gap-4 pl-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">First Name</label>
                  <p className="text-base font-medium">{firstName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                  <p className="text-base font-medium">{lastName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p className="text-base">{driver.email}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="text-base">{driver.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Mobile App Access */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <div className="h-8 w-1 bg-primary mr-3" />
                Mobile App Access
              </h3>
              <div className="grid grid-cols-2 gap-4 pl-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Username</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p className="text-base">{driver.email}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Password</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <KeyRound className="h-4 w-4 text-muted-foreground" />
                    <p className="text-base">••••••••••</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">App Access Status</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <Badge variant="default" className="bg-green-600">
                      Active
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Login</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="text-base">2024-01-15 14:23</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Vehicle */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <div className="h-8 w-1 bg-primary mr-3" />
                Vehicle
              </h3>
              <div className="grid grid-cols-2 gap-4 pl-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Registration</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <p className="text-base font-medium">{vehicleRegistration}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Expiry Date</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="text-base">2025-12-31</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Year/Make/Model</label>
                  <p className="text-base">2022 {vehicleModel}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="mt-1">
                    <Badge variant={driver.status === "Active" ? "default" : "secondary"}>{driver.status}</Badge>
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">Driver Type</label>
                  <div className="mt-1">
                    <Badge variant="outline">{driver.type}</Badge>
                  </div>
                </div>
                <div className="col-span-2 pt-4 border-t">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Heavy Vehicle License</p>
                        <p className="text-sm text-muted-foreground">
                          Class {driver.licenseClass} - {driver.licenseNumber}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Expires: {driver.licenseExpiry} -{" "}
                          <span className={licenseStatus.color}>{licenseStatus.status}</span>
                        </p>
                      </div>
                    </div>
                    <licenseStatus.icon className={`h-5 w-5 ${licenseStatus.color}`} />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Competency and Qualifications */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <div className="h-8 w-1 bg-primary mr-3" />
                Competency and Qualifications
              </h3>
              <div className="space-y-4 pl-4">
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">NJA Driver Induction</p>
                      <p className="text-sm text-muted-foreground">
                        Status:{" "}
                        <span className={driver.inductionStatus === "Valid" ? "text-green-600" : "text-red-600"}>
                          {driver.inductionStatus}
                        </span>
                      </p>
                    </div>
                  </div>
                  {driver.inductionStatus === "Valid" ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Site Specific Inductions</p>
                      <p className="text-sm text-muted-foreground">3 sites completed</p>
                    </div>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Construction Industry Induction Card (White Card)</p>
                      <p className="text-sm text-muted-foreground">
                        Expires: {driver.whiteCard} -{" "}
                        <span className={whiteCardStatus.color}>{whiteCardStatus.status}</span>
                      </p>
                    </div>
                  </div>
                  <whiteCardStatus.icon className={`h-5 w-5 ${whiteCardStatus.color}`} />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">VOC Driving Assessment</p>
                      <p className="text-sm text-muted-foreground">Score: {driver.safetyRating}%</p>
                    </div>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Online Fatigue Management Awareness Training</p>
                      <p className="text-sm text-muted-foreground">Last Medical: {driver.lastMedical}</p>
                      <p className="text-sm text-muted-foreground">
                        Expires: {driver.medicalExpiry} -{" "}
                        <span className={medicalStatus.color}>{medicalStatus.status}</span>
                      </p>
                    </div>
                  </div>
                  <medicalStatus.icon className={`h-5 w-5 ${medicalStatus.color}`} />
                </div>
              </div>
            </div>

            <Separator />

            {/* Rates */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <div className="h-8 w-1 bg-primary mr-3" />
                Rates
              </h3>
              <div className="grid grid-cols-2 gap-6 pl-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Hourly Rate (Weekday)</label>
                    <p className="text-2xl font-bold mt-1">${driver.hourlyRate.weekday}/hr</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Hourly Rate (Weekend)</label>
                    <p className="text-2xl font-bold mt-1">${driver.hourlyRate.weekend}/hr</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Night Rate (Weekday)</label>
                    <p className="text-2xl font-bold mt-1">${driver.nightRate.weekday}/hr</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Night Rate (Weekend)</label>
                    <p className="text-2xl font-bold mt-1">${driver.nightRate.weekend}/hr</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <EditDriverDialog driver={driver} open={editDriverOpen} onOpenChange={setEditDriverOpen} />
    </>
  )
}
