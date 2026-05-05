"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Save,
  Calendar,
  MapPin,
  Truck,
  User,
  FileText,
  Camera,
  Clock,
  AlertCircle,
  Package,
} from "lucide-react"

// Mock job data - in production this would come from an API
const mockJobData = {
  "2024-001": {
    id: "2024-001",
    jobNumber: "JOB-2024-001",
    clientName: "Metro Construction Ltd",
    clientPO: "PO-2024-MC-1578",
    drivers: [
      { name: "John Smith", type: "Internal" },
      { name: "Tom Brown", type: "Subcontractor" },
    ],
    location: "123 Construction Ave, Sydney NSW",
    material: "Concrete Mix - 20m³",
    truckAllocation: "FL-001",
    stagePoint: "Depot A - Parramatta",
    dropSite: "Site Alpha - Construction Zone",
    tipSite: "Tip Point 1 - Blacktown",
    status: "In Progress",
    priority: "High",
    createdAt: "2024-01-15",
    scheduledDate: "2024-01-15",
    photos: 3,
    dockets: 2,
    invoiceNumber: null,
    preStartChecklist: "Completed",
    estimatedDuration: "4 hours",
    actualDuration: "2.5 hours",
    notes: "Customer requested early delivery",
  },
  "2024-002": {
    id: "2024-002",
    jobNumber: "JOB-2024-02",
    clientName: "BuildCorp Pty Ltd",
    clientPO: "PO-2024-BC-2341",
    drivers: [
      { name: "Sarah Johnson", type: "Internal" },
      { name: "David Lee", type: "Subcontractor" },
    ],
    location: "456 Industrial Rd, Melbourne VIC",
    material: "Gravel - 15m³",
    truckAllocation: "FL-003",
    stagePoint: "Depot B - Dandenong",
    dropSite: "Site Beta - Industrial Park",
    tipSite: "Tip Point 2 - Clayton",
    status: "Completed",
    priority: "Normal",
    createdAt: "2024-01-14",
    scheduledDate: "2024-01-14",
    photos: 5,
    dockets: 1,
    invoiceNumber: "INV-2024-0015",
    preStartChecklist: "Completed",
    estimatedDuration: "3 hours",
    actualDuration: "3.2 hours",
    notes: "Job completed successfully",
  },
  "2024-003": {
    id: "2024-003",
    jobNumber: "JOB-2024-003",
    clientName: "Urban Developments",
    clientPO: "PO-2024-UD-9876",
    drivers: [{ name: "Mike Wilson", type: "Internal" }],
    location: "789 Development St, Brisbane QLD",
    material: "Sand - 25m³",
    truckAllocation: "FL-002",
    stagePoint: "Depot A - Parramatta",
    dropSite: "Site Gamma - Residential",
    tipSite: "Tip Point 1 - Blacktown",
    status: "Pending",
    priority: "Normal",
    createdAt: "2024-01-16",
    scheduledDate: "2024-01-17",
    photos: 0,
    dockets: 0,
    invoiceNumber: null,
    preStartChecklist: "Pending",
    estimatedDuration: "5 hours",
    actualDuration: null,
    notes: "Awaiting driver assignment",
  },
  "2024-004": {
    id: "2024-004",
    jobNumber: "JOB-2024-004",
    clientName: "Infrastructure Co",
    clientPO: "PO-2024-IC-5432",
    drivers: [{ name: "Emma Davis", type: "Internal" }],
    location: "321 Highway Rd, Perth WA",
    material: "Crushed Rock - 30m³",
    truckAllocation: "FL-005",
    stagePoint: "Depot C - Fremantle",
    dropSite: "Site Delta - Highway Project",
    tipSite: "Tip Point 3 - Rockingham",
    status: "Maintenance Required",
    priority: "High",
    createdAt: "2024-01-13",
    scheduledDate: "2024-01-13",
    photos: 2,
    dockets: 1,
    invoiceNumber: null,
    preStartChecklist: "Completed",
    estimatedDuration: "6 hours",
    actualDuration: "1 hour",
    notes: "Truck breakdown - maintenance required",
  },
}

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const jobId = params.id
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({})
  const [job, setJob] = useState(null)

  useEffect(() => {
    if (jobId === "new") {
      router.replace("/admin-portal/jobs/new")
      return
    }

    const jobData = mockJobData[jobId as keyof typeof mockJobData]
    setJob(jobData)
    setFormData(jobData || {})
  }, [jobId, router])

  if (!job) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
              <p className="text-muted-foreground mb-4">The job you're looking for doesn't exist.</p>
              <Button asChild>
                <Link href="/admin-portal/jobs">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Jobs
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const handleSave = () => {
    // In production, this would save to an API
    console.log("[v0] Saving job data:", formData)
    setIsEditing(false)
    // Show success message
    alert("Job updated successfully!")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: typeof job) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin-portal/jobs" target="_blank">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Jobs
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{job.jobNumber}</h1>
              <p className="text-muted-foreground">Created on {job.createdAt}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Job</Button>
            )}
          </div>
        </div>

        {/* Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Job Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Status</Label>
                {isEditing ? (
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Maintenance Required">Maintenance Required</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant="secondary" className="text-sm">
                    {job.status}
                  </Badge>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Priority</Label>
                {isEditing ? (
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant={job.priority === "High" ? "destructive" : "secondary"} className="text-sm">
                    {job.priority}
                  </Badge>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Pre-Start Checklist</Label>
                <Badge variant={job.preStartChecklist === "Completed" ? "default" : "destructive"} className="text-sm">
                  {job.preStartChecklist}
                </Badge>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Invoice</Label>
                {job.invoiceNumber ? (
                  <Badge variant="default" className="text-sm">
                    {job.invoiceNumber}
                  </Badge>
                ) : (
                  <span className="text-sm text-muted-foreground">Not Generated</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-6">
          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                {isEditing ? (
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => handleInputChange("clientName", e.target.value)}
                  />
                ) : (
                  <p className="text-foreground font-medium">{job.clientName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientPO">Client PO #</Label>
                {isEditing ? (
                  <Input
                    id="clientPO"
                    value={formData.clientPO}
                    onChange={(e) => handleInputChange("clientPO", e.target.value)}
                    placeholder="PO-2024-XXX-XXXX"
                  />
                ) : (
                  <p className="text-foreground font-medium">{job.clientPO}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                {isEditing ? (
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  />
                ) : (
                  <p className="text-foreground flex items-start">
                    <MapPin className="mr-2 h-4 w-4 mt-1 text-muted-foreground" />
                    {job.location}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Driver Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Driver Assignment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {job.drivers.map((driver, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{driver.name}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {driver.type}
                    </Badge>
                  </div>
                  {isEditing && (
                    <Button variant="ghost" size="sm">
                      Change
                    </Button>
                  )}
                </div>
              ))}
              {isEditing && (
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Add Driver
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Material & Logistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Material & Logistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="material">Material</Label>
                {isEditing ? (
                  <Input
                    id="material"
                    value={formData.material}
                    onChange={(e) => handleInputChange("material", e.target.value)}
                  />
                ) : (
                  <p className="text-foreground font-medium">{job.material}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="truckAllocation">Truck Allocation</Label>
                {isEditing ? (
                  <Input
                    id="truckAllocation"
                    value={formData.truckAllocation}
                    onChange={(e) => handleInputChange("truckAllocation", e.target.value)}
                  />
                ) : (
                  <p className="text-foreground font-medium flex items-center">
                    <Truck className="mr-2 h-4 w-4 text-muted-foreground" />
                    {job.truckAllocation}
                  </p>
                )}
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stagePoint">Stage Point</Label>
                {isEditing ? (
                  <Input
                    id="stagePoint"
                    value={formData.stagePoint}
                    onChange={(e) => handleInputChange("stagePoint", e.target.value)}
                  />
                ) : (
                  <p className="text-foreground">{job.stagePoint}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="dropSite">Drop Site</Label>
                {isEditing ? (
                  <Input
                    id="dropSite"
                    value={formData.dropSite}
                    onChange={(e) => handleInputChange("dropSite", e.target.value)}
                  />
                ) : (
                  <p className="text-foreground">{job.dropSite}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipSite">Tip Site</Label>
                {isEditing ? (
                  <Input
                    id="tipSite"
                    value={formData.tipSite}
                    onChange={(e) => handleInputChange("tipSite", e.target.value)}
                  />
                ) : (
                  <p className="text-foreground">{job.tipSite}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule & Duration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Schedule & Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="scheduledDate">Scheduled Date</Label>
                {isEditing ? (
                  <Input
                    id="scheduledDate"
                    type="date"
                    value={formData.scheduledDate}
                    onChange={(e) => handleInputChange("scheduledDate", e.target.value)}
                  />
                ) : (
                  <p className="text-foreground flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    {job.scheduledDate}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Estimated Duration</Label>
                <p className="text-foreground font-medium">{job.estimatedDuration}</p>
              </div>
              <div className="space-y-2">
                <Label>Actual Duration</Label>
                <p className="text-foreground font-medium">{job.actualDuration || "In Progress"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Files & Documentation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Files & Documentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Camera className="mr-2 h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Photos</span>
                  </div>
                  <Badge>{job.photos}</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View Photos
                </Button>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Dockets</span>
                  </div>
                  <Badge>{job.dockets}</Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View Dockets
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={4}
                placeholder="Add notes about this job..."
              />
            ) : (
              <p className="text-foreground">{job.notes}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
