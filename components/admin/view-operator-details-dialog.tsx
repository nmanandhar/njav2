"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Mail,
  Phone,
  Construction,
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
import { EditOperatorDialog } from "./edit-operator-dialog"

interface OperatorDetailsProps {
  operator: {
    operatorId: string
    name: string
    email: string
    phone: string
    licenseNumber: string
    licenseClass: string
    licenseExpiry: string
    type: string
    status: string
    machinery: string
    lastMedical: string
    medicalExpiry: string
    inductionStatus: string
    whiteCard: string
    vocScore: number
    hourlyRateWeekday: string
    hourlyRateWeekend: string
    nightRateWeekday: string
    nightRateWeekend: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ViewOperatorDetailsDialog({ operator, open, onOpenChange }: OperatorDetailsProps) {
  const [firstName, ...lastNameParts] = operator.name.split(" ")
  const lastName = lastNameParts.join(" ")

  const [editOperatorOpen, setEditOperatorOpen] = useState(false)

  const getExpiryStatus = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntilExpiry <= 0) return { status: "Expired", color: "text-red-600", icon: XCircle }
    if (daysUntilExpiry <= 30) return { status: "Expiring Soon", color: "text-orange-600", icon: AlertTriangle }
    return { status: "Valid", color: "text-green-600", icon: CheckCircle }
  }

  const licenseStatus = getExpiryStatus(operator.licenseExpiry)
  const medicalStatus = getExpiryStatus(operator.medicalExpiry)
  const whiteCardStatus = getExpiryStatus(operator.whiteCard)

  const handlePasswordReset = () => {
    // TODO: Implement password reset email functionality
    alert(`Password reset email will be sent to ${operator.email}`)
  }

  const handleEdit = () => {
    setEditOperatorOpen(true)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="!max-w-[95vw] w-full sm:!max-w-[95vw] md:!max-w-[1800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl">Operator Details</DialogTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={handleEdit}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Operator
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
                    <p className="text-base">{operator.email}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="text-base">{operator.phone}</p>
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
                    <p className="text-base">{operator.email}</p>
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

            {/* Machinery & License */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <div className="h-8 w-1 bg-primary mr-3" />
                Machinery & License
              </h3>
              <div className="grid grid-cols-2 gap-4 pl-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Assigned Machinery</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Construction className="h-4 w-4 text-muted-foreground" />
                    <p className="text-base font-medium">{operator.machinery}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="mt-1">
                    <Badge variant={operator.status === "Active" ? "default" : "secondary"}>{operator.status}</Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Operator Type</label>
                  <div className="mt-1">
                    <Badge variant="outline">{operator.type}</Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">License Class</label>
                  <p className="text-base font-medium">{operator.licenseClass}</p>
                </div>
                <div className="col-span-2 pt-4 border-t">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Machinery License</p>
                        <p className="text-sm text-muted-foreground">
                          {operator.licenseClass} - {operator.licenseNumber}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Expires: {operator.licenseExpiry} -{" "}
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
                      <p className="font-medium">NJA Operator Induction</p>
                      <p className="text-sm text-muted-foreground">
                        Status:{" "}
                        <span className={operator.inductionStatus === "Valid" ? "text-green-600" : "text-red-600"}>
                          {operator.inductionStatus}
                        </span>
                      </p>
                    </div>
                  </div>
                  {operator.inductionStatus === "Valid" ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Construction Industry Induction Card (White Card)</p>
                      <p className="text-sm text-muted-foreground">
                        Expires: {operator.whiteCard} -{" "}
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
                      <p className="font-medium">VOC Assessment</p>
                      <p className="text-sm text-muted-foreground">Score: {operator.vocScore}%</p>
                    </div>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Medical Certificate & Fatigue Management</p>
                      <p className="text-sm text-muted-foreground">Last Medical: {operator.lastMedical}</p>
                      <p className="text-sm text-muted-foreground">
                        Expires: {operator.medicalExpiry} -{" "}
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
                    <p className="text-2xl font-bold mt-1">{operator.hourlyRateWeekday}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Hourly Rate (Weekend)</label>
                    <p className="text-2xl font-bold mt-1">{operator.hourlyRateWeekend}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Night Rate (Weekday)</label>
                    <p className="text-2xl font-bold mt-1">{operator.nightRateWeekday}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Night Rate (Weekend)</label>
                    <p className="text-2xl font-bold mt-1">{operator.nightRateWeekend}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <EditOperatorDialog operator={operator} open={editOperatorOpen} onOpenChange={setEditOperatorOpen} />
    </>
  )
}
