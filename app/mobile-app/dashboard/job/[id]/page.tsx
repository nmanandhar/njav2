"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"
import {
  ArrowLeft,
  MapPin,
  FileText,
  Package,
  User,
  Phone,
  Building2,
  Calendar,
  Clock,
  Info,
  ShieldAlert,
  Upload,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Navigation,
  Camera,
  Ban,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function JobDetailsPage() {
  const params = useParams()
  const jobId = params.id as string
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [cancellationReason, setCancellationReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCancelJob = async () => {
    if (!cancellationReason.trim()) return
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsCancelModalOpen(false)
    setCancellationReason("")
    // In a real app, would redirect or update job status
  }

  const jobData: Record<string, any> = {
    "JOB-2024-001": {
      id: "JOB-2024-001",
      jobNumber: "JOB-2024-001",
      client: "ABC Manufacturing",
      clientPO: "PO-2024-ABC-1234",
      deliveryDate: "14/01/2024",
      deliveryTime: "8:00 AM",
      pickupAddress: "123 Industrial Ave, Sydney NSW 2000",
      tipClient: "Coastal Transport Co",
      tipAddress: "456 Commerce St, Parramatta NSW 2150",
      trucksAssigned: ["GHI-789"],
      tonnageRate: "140",
      loadingTime: "7:00 AM",
      trucksLoadingAtTime: "2",
      njaContactOnApproach: "James",
      njaContactPhone: "0412 987 654",
      stagingLocation: "East side loading zone",
      loadingInstructions: "Use designated loading bay 1. Ensure all materials are properly secured before departure.",
      additionalInfo: "First time client - please call dispatch upon arrival",
      ppeRequirements:
        "Long sleeve shirts, hard hats, eye protection, gloves, steel cap boots, long pants - all PPE must be worn",
      status: "Awaiting Response",
      priority: "High",
      isNew: true,
      hasStarted: false,
    },
    "JOB-2024-003": {
      id: "JOB-2024-003",
      jobNumber: "JOB-2024-003",
      client: "XYZ Logistics",
      clientPO: "PO-2024-XYZ-8821",
      deliveryDate: "16/01/2024",
      deliveryTime: "10:00 AM",
      pickupAddress: "789 Warehouse Rd, Sydney NSW 2000",
      tipClient: "Sand Transport Co",
      tipAddress: "321 Delivery Ln, Parramatta NSW 2150",
      trucksAssigned: ["GHI-002"],
      tonnageRate: "160",
      loadingTime: "8:30 AM",
      trucksLoadingAtTime: "3",
      njaContactOnApproach: "Sarah",
      njaContactPhone: "0412345678",
      stagingLocation: "North side parking area",
      loadingInstructions: "Use designated loading bay 3. Ensure all materials are properly secured before departure.",
      additionalInfo: "Contact dispatch before leaving site",
      ppeRequirements:
        "Long sleeve shirts, hard hats, eye protection, gloves, steel cap boots, long pants - all PPE must be worn",
      status: "In Progress",
      priority: "Normal",
      isNew: false,
      hasStarted: false,
    },
    "JOB-2024-004": {
      id: "JOB-2024-004",
      jobNumber: "JOB-2024-004",
      client: "Infrastructure Co",
      clientPO: "PO-2024-IC-5432",
      deliveryDate: "13/01/2024",
      deliveryTime: "9:00 AM",
      pickupAddress: "321 Highway Rd, Perth WA",
      tipClient: "Rock Transport Co",
      tipAddress: "21 Quarry St, Mandurah WA 6210",
      trucksAssigned: ["JKL-890"],
      tonnageRate: "135",
      loadingTime: "8:00 AM",
      trucksLoadingAtTime: "4",
      njaContactOnApproach: "David",
      njaContactPhone: "0423456789",
      stagingLocation: "West entrance parking",
      loadingInstructions: "Use loading bay 5. Materials must be covered with tarps.",
      additionalInfo: "Long haul delivery - check fuel levels before departure",
      ppeRequirements:
        "Long sleeve shirts, hard hats, eye protection, gloves, steel cap boots, long pants - all PPE must be worn",
      status: "Started",
      priority: "Normal",
      isNew: false,
      hasStarted: true,
      readyToStart: false,
    },
    "JOB-2024-010": {
      id: "JOB-2024-010",
      jobNumber: "JOB-2024-010",
      client: "Westfield Development",
      clientPO: "PO-2024-WD-7654",
      deliveryDate: "15/01/2024",
      deliveryTime: "9:00 AM",
      pickupAddress: "88 Cement Works, Auburn NSW 2144",
      tipClient: "Westfield Construction",
      tipAddress: "Westfield Site, Parramatta NSW 2150",
      trucksAssigned: ["SUB-003"],
      tonnageRate: "165",
      loadingTime: "8:30 AM",
      trucksLoadingAtTime: "2",
      njaContactOnApproach: "Mike",
      njaContactPhone: "0412 654 321",
      stagingLocation: "Main entrance loading dock",
      loadingInstructions: "Use loading bay 2. Coordinate with site supervisor on arrival.",
      additionalInfo: "Second job today - Pre-start already completed on SUB-003 at 06:30 AM (JOB-2024-003)",
      ppeRequirements:
        "Long sleeve shirts, hard hats, eye protection, gloves, steel cap boots, long pants - all PPE must be worn",
      status: "Accepted",
      priority: "Normal",
      isNew: false,
      hasStarted: false,
      readyToStart: true,
      preStartInfo: { completedAt: "06:30 AM", fromJob: "JOB-2024-003", vehicle: "SUB-003" },
    },
  }

  const job = jobData[jobId] || jobData["JOB-2024-003"]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center gap-3 p-4">
          <Link href="/mobile-app/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold text-foreground">Despatch Notice</h1>
            <p className="text-xs text-muted-foreground">{job.jobNumber}</p>
          </div>
          <Badge variant={job.priority === "High" ? "destructive" : "secondary"}>{job.priority}</Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6 max-w-4xl mx-auto pb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Job Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Job Number and Delivery Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Job Number</p>
                <p className="font-semibold text-foreground">{job.jobNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Delivery Date
                </p>
                <p className="font-semibold text-foreground">{job.deliveryDate}</p>
              </div>
            </div>

            {/* Delivery Time */}
            <div>
              <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                Delivery Time
              </p>
              <p className="font-semibold text-foreground">{job.deliveryTime}</p>
            </div>

            <Separator />

            {/* Trucks Assigned */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">Trucks Assigned</p>
              <div className="flex flex-wrap gap-2">
                {job.trucksAssigned.map((truck: string) => (
                  <Badge key={truck} variant="outline" className="font-mono">
                    {truck}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Client and Tonnage Rate */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Client</p>
                <p className="font-semibold text-foreground">{job.client}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tonnage Rate</p>
                <p className="font-semibold text-foreground">${job.tonnageRate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Despatch Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Despatch Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Loading Time and Trucks Loading */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Loading Time</p>
                <p className="font-semibold text-foreground">{job.loadingTime}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1"># Trucks Loading at a Time</p>
                <p className="font-semibold text-foreground">{job.trucksLoadingAtTime}</p>
              </div>
            </div>

            <Separator />

            {/* NJA Contact */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  NJA Contact on Approach
                </p>
                <p className="font-semibold text-foreground">{job.njaContactOnApproach}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" />
                  NJA Contact Phone
                </p>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-foreground">{job.njaContactPhone}</p>
                  <Button variant="ghost" size="sm" className="h-7 px-2" asChild>
                    <a href={`tel:${job.njaContactPhone}`}>
                      <Phone className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Staging Location */}
            <div>
              <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                Staging Location
              </p>
              <p className="text-foreground">{job.stagingLocation}</p>
            </div>

            <Separator />

            {/* Loading Instructions */}
            <div>
              <p className="text-sm text-muted-foreground mb-1">Loading Instructions</p>
              <p className="text-foreground text-sm leading-relaxed">{job.loadingInstructions}</p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Additional Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">{job.additionalInfo}</p>
          </CardContent>
        </Card>

        {/* PPE Equipment Requirements */}
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <ShieldAlert className="h-5 w-5" />
              PPE Equipment Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-amber-900 leading-relaxed">{job.ppeRequirements}</p>
          </CardContent>
        </Card>

        {!job.isNew && (
          <Card className="bg-blue-50/50 border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Attachments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                {/* Site Access Permit */}
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">Site Access Permit</p>
                      <p className="text-xs text-muted-foreground">PDF • 245 KB</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Vehicle Management Plan */}
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded">
                      <FileText className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">Vehicle Management Plan (VMP)</p>
                      <p className="text-xs text-muted-foreground">PDF • 1.2 MB</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Site Map */}
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded">
                      <MapPin className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">Site Map - Loading Bay 3</p>
                      <p className="text-xs text-muted-foreground">PNG • 890 KB</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Delivery Docket */}
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded">
                      <Package className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">Delivery Docket Template</p>
                      <p className="text-xs text-muted-foreground">PDF • 156 KB</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-dashed border-border">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Upload className="h-4 w-4" />
                  Upload Files
                </Button>
                <p className="text-sm text-muted-foreground">Upload additional documents or photos</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Location Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Location Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-chart-1 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">Pickup Location</p>
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <p className="font-semibold text-foreground">{job.client}</p>
                  </div>
                  <p className="text-foreground text-sm">{job.pickupAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-chart-2 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">Tip Location</p>
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <p className="font-semibold text-foreground">{job.tipClient}</p>
                  </div>
                  <p className="text-foreground text-sm">{job.tipAddress}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {job.isNew ? (
          // Show Accept/Reject buttons for new jobs awaiting response
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="lg"
              className="w-full gap-2 border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
            >
              <XCircle className="h-5 w-5" />
              Reject Job
            </Button>
            <Button size="lg" className="w-full gap-2 bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-5 w-5" />
              Accept Job
            </Button>
          </div>
        ) : job.hasStarted || job.readyToStart ? (
          // Show Route Optimisation and Proof of Delivery for started jobs or jobs with pre-start already completed
          <div className="space-y-3">
            {job.readyToStart && job.preStartInfo && (
              <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg">
                <p className="text-sm font-medium text-teal-700">
                  Pre-start completed at {job.preStartInfo.completedAt} on {job.preStartInfo.vehicle} ({job.preStartInfo.fromJob})
                </p>
              </div>
            )}
            <Button
              variant="outline"
              size="lg"
              className="w-full gap-2 border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
              onClick={() => setIsCancelModalOpen(true)}
            >
              <Ban className="h-5 w-5" />
              Cancel Job
            </Button>
            <Button size="lg" className="w-full gap-2 bg-teal-700 hover:bg-teal-800" asChild>
              <Link href={`/mobile-app/dashboard/job/${job.jobNumber}/route-optimisation`}>
                <Navigation className="h-5 w-5" />
                Route Optimisation
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full gap-2 bg-transparent" asChild>
              <Link href={`/mobile-app/dashboard/job/${job.jobNumber}/proof-of-delivery`}>
                <Camera className="h-5 w-5" />
                Proof of Delivery
              </Link>
            </Button>
          </div>
        ) : (
          // Show Contact Dispatch and Start Pre-Start Checklist for accepted jobs
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="lg" className="w-full bg-transparent gap-2" asChild>
              <a href={`tel:${job.njaContactPhone}`}>
                <Phone className="h-4 w-4" />
                Contact Dispatch
              </a>
            </Button>
            <Button size="lg" className="w-full gap-2" asChild>
              <Link href={`/mobile-app/dashboard/job/${job.jobNumber}/prestart`}>
                <MapPin className="h-4 w-4" />
                Start Pre-Start Checklist
              </Link>
            </Button>
          </div>
        )}

        {/* Cancel Job Modal */}
        <Dialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-600">
                <Ban className="h-5 w-5" />
                Cancel Job
              </DialogTitle>
              <DialogDescription>
                Please provide a reason for cancelling this job. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="cancellationReason">Cancellation Reason</Label>
                <Textarea
                  id="cancellationReason"
                  placeholder="Enter the reason for cancellation..."
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCancelModalOpen(false)
                    setCancellationReason("")
                  }}
                  className="bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCancelJob}
                  disabled={isSubmitting || !cancellationReason.trim()}
                  className="bg-red-600 hover:bg-red-700 gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
