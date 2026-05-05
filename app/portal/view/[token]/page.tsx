"use client"

import React from "react"

import { useState, useEffect, use } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Truck, 
  MapPin, 
  Clock, 
  Package, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight,
  Phone,
  FileText,
  Calendar,
  User,
  Building,
  RefreshCw,
  Lock,
  Eye,
  EyeOff,
  ArrowRight
} from "lucide-react"

// Mock data for portal validation
const mockPortalData: Record<string, {
  entityType: "client" | "subcontractor"
  entityId: string
  entityName: string
  pinProtected: boolean
  pin: string | null
  expiresAt: string | null
  isActive: boolean
}> = {
  // Example tokens
  "abc123xyz": {
    entityType: "client",
    entityId: "SMC-001",
    entityName: "Sydney Metro Construction",
    pinProtected: false,
    pin: null,
    expiresAt: null,
    isActive: true
  },
  "def456uvw": {
    entityType: "subcontractor",
    entityId: "SUB-RT-001",
    entityName: "Regional Transport Services",
    pinProtected: true,
    pin: "1234",
    expiresAt: "2024-03-01T00:00:00Z",
    isActive: true
  }
}

// Default portal data for dynamically generated tokens (preview mode)
const getDefaultPortalData = (token: string) => ({
  entityType: "client" as const,
  entityId: "PREVIEW",
  entityName: "Preview Mode - Sample Client",
  pinProtected: false,
  pin: null,
  expiresAt: null,
  isActive: true
})

// Mock jobs data
const mockJobs = [
  {
    id: "JOB-2024-001",
    status: "In Transit",
    pickupLocation: "Boral Quarry, Maroota NSW",
    deliveryLocation: "George St Site, Sydney CBD",
    scheduledDate: "2024-01-20",
    scheduledTime: "08:00 - 12:00",
    product: "20mm Aggregate",
    quantity: "30 tonnes",
    driver: "John Smith",
    vehicle: "TRUCK-001",
    eta: "10:45 AM",
    lastUpdate: "5 mins ago",
    progress: 65,
    podAvailable: false
  },
  {
    id: "JOB-2024-002",
    status: "Delivered",
    pickupLocation: "Hanson Concrete, Erskine Park",
    deliveryLocation: "Parramatta Square Development",
    scheduledDate: "2024-01-19",
    scheduledTime: "06:00 - 10:00",
    product: "Concrete Mix 32MPa",
    quantity: "8 m³",
    driver: "Mike Wilson",
    vehicle: "TRUCK-003",
    eta: null,
    lastUpdate: "Yesterday",
    progress: 100,
    podAvailable: true
  },
  {
    id: "JOB-2024-003",
    status: "Scheduled",
    pickupLocation: "Holcim Quarry, Penrith",
    deliveryLocation: "Westmead Hospital Expansion",
    scheduledDate: "2024-01-21",
    scheduledTime: "07:00 - 11:00",
    product: "Road Base",
    quantity: "25 tonnes",
    driver: "Pending Assignment",
    vehicle: "TBA",
    eta: null,
    lastUpdate: "2 hours ago",
    progress: 0,
    podAvailable: false
  },
  {
    id: "JOB-2024-004",
    status: "Loading",
    pickupLocation: "Adelaide Brighton, Mascot",
    deliveryLocation: "Barangaroo Site B",
    scheduledDate: "2024-01-20",
    scheduledTime: "09:00 - 13:00",
    product: "Sand - Washed",
    quantity: "18 tonnes",
    driver: "Sarah Chen",
    vehicle: "TRUCK-007",
    eta: "11:30 AM",
    lastUpdate: "2 mins ago",
    progress: 25,
    podAvailable: false
  },
  {
    id: "JOB-2024-005",
    status: "Completed",
    pickupLocation: "Boral Asphalt, Wetherill Park",
    deliveryLocation: "M4 Motorway Extension",
    scheduledDate: "2024-01-18",
    scheduledTime: "05:00 - 09:00",
    product: "Hot Mix Asphalt",
    quantity: "22 tonnes",
    driver: "David Brown",
    vehicle: "TRUCK-005",
    eta: null,
    lastUpdate: "2 days ago",
    progress: 100,
    podAvailable: true
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
    case "Completed":
      return "bg-green-100 text-green-800 border-green-200"
    case "In Transit":
    case "Loading":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Scheduled":
      return "bg-gray-100 text-gray-800 border-gray-200"
    case "Delayed":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Delivered":
    case "Completed":
      return <CheckCircle2 className="h-4 w-4" />
    case "In Transit":
      return <Truck className="h-4 w-4" />
    case "Loading":
      return <Package className="h-4 w-4" />
    case "Scheduled":
      return <Clock className="h-4 w-4" />
    case "Delayed":
      return <AlertCircle className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

export default function SharedPortalPage({ params }: { params: Promise<{ token: string }> }) {
  const resolvedParams = use(params)
  const { token } = resolvedParams
  
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [portalData, setPortalData] = useState<typeof mockPortalData[string] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pin, setPin] = useState("")
  const [showPin, setShowPin] = useState(false)
  const [pinError, setPinError] = useState(false)
  const [selectedJob, setSelectedJob] = useState<typeof mockJobs[0] | null>(null)
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    // Simulate API call to validate token
    const timer = setTimeout(() => {
      // Check for known mock tokens first, then use preview mode for any other token
      const data = mockPortalData[token] || getDefaultPortalData(token)
      
      if (data && data.isActive) {
        setPortalData(data)
        if (!data.pinProtected) {
          setIsAuthenticated(true)
        }
      } else {
        setError("This link is invalid or has expired.")
      }
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [token])

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (portalData && pin === portalData.pin) {
      setIsAuthenticated(true)
      setPinError(false)
    } else {
      setPinError(true)
      setPin("")
    }
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const filteredJobs = mockJobs.filter(job => {
    if (filter === "active") {
      return ["In Transit", "Loading", "Scheduled"].includes(job.status)
    }
    if (filter === "completed") {
      return ["Delivered", "Completed"].includes(job.status)
    }
    return true
  })

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <Image
              src="/nj-ashton-logo.png"
              alt="NJ Ashton Transport"
              fill
              className="object-contain"
            />
          </div>
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Loading portal...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-xl font-bold mb-2">Link Invalid or Expired</h1>
            <p className="text-muted-foreground mb-4">
              This portal link is no longer valid. Please contact the dispatch team for a new link.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>1300 XXX XXX</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // PIN entry state
  if (portalData && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <Image
                src="/nj-ashton-logo.png"
                alt="NJ Ashton Transport"
                fill
                className="object-contain"
              />
            </div>
            <CardTitle>Job Tracking Portal</CardTitle>
            <CardDescription>
              Enter your PIN to access job tracking for<br />
              <span className="font-medium text-foreground">{portalData.entityName}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPin ? "text" : "password"}
                    placeholder="Enter PIN"
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value.replace(/\D/g, '').slice(0, 6))
                      setPinError(false)
                    }}
                    className={`pl-10 pr-10 text-center text-2xl tracking-[0.5em] font-mono ${pinError ? 'border-red-500' : ''}`}
                    maxLength={6}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {pinError && (
                  <p className="text-sm text-red-600 text-center">Incorrect PIN. Please try again.</p>
                )}
              </div>
              <Button type="submit" className="w-full gap-2" disabled={pin.length < 4}>
                Access Portal
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Main portal view - Job list
  if (!selectedJob) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-primary text-white sticky top-0 z-10">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg p-1 relative">
                  <Image
                    src="/nj-ashton-logo.png"
                    alt="NJ Ashton Transport"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h1 className="font-bold text-lg">Job Tracking</h1>
                  <p className="text-sm text-white/80">{portalData?.entityName}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20"
                onClick={handleRefresh}
              >
                <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
          
          {/* Filter tabs */}
          <div className="flex border-t border-white/20">
            {[
              { value: "all", label: "All Jobs" },
              { value: "active", label: "Active" },
              { value: "completed", label: "Completed" }
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value as typeof filter)}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  filter === tab.value 
                    ? 'bg-white/10 border-b-2 border-white' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        {/* Job List */}
        <main className="p-4 space-y-3 pb-20">
          {filteredJobs.length === 0 ? (
            <Card className="p-8 text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="font-medium">No jobs found</p>
              <p className="text-sm text-muted-foreground">
                {filter === "active" ? "No active jobs at the moment" : "No completed jobs yet"}
              </p>
            </Card>
          ) : (
            filteredJobs.map((job) => (
              <Card 
                key={job.id} 
                className="overflow-hidden active:scale-[0.98] transition-transform cursor-pointer"
                onClick={() => setSelectedJob(job)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-mono text-sm text-muted-foreground">{job.id}</p>
                      <p className="font-semibold">{job.product}</p>
                    </div>
                    <Badge className={`${getStatusColor(job.status)} flex items-center gap-1`}>
                      {getStatusIcon(job.status)}
                      {job.status}
                    </Badge>
                  </div>

                  {/* Progress bar for active jobs */}
                  {["In Transit", "Loading"].includes(job.status) && (
                    <div className="mb-3">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${job.progress}%` }}
                        />
                      </div>
                      {job.eta && (
                        <p className="text-sm text-primary font-medium mt-1">
                          ETA: {job.eta}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground line-clamp-1">{job.pickupLocation}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground line-clamp-1">{job.deliveryLocation}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t text-sm">
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {job.scheduledDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Package className="h-3.5 w-3.5" />
                        {job.quantity}
                      </span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </main>

        {/* Footer */}
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 text-center text-xs text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()} • Powered by NJ Ashton Transport
        </footer>
      </div>
    )
  }

  // Job detail view
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSelectedJob(null)}
              className="p-2 -ml-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronRight className="h-5 w-5 rotate-180" />
            </button>
            <div>
              <p className="text-sm text-white/80">{selectedJob.id}</p>
              <h1 className="font-bold">{selectedJob.product}</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-4 pb-20">
        {/* Status Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Badge className={`${getStatusColor(selectedJob.status)} flex items-center gap-1 text-sm px-3 py-1`}>
                {getStatusIcon(selectedJob.status)}
                {selectedJob.status}
              </Badge>
              <span className="text-sm text-muted-foreground">Updated {selectedJob.lastUpdate}</span>
            </div>

            {/* Progress bar */}
            {["In Transit", "Loading"].includes(selectedJob.status) && (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Delivery Progress</span>
                  <span className="font-medium">{selectedJob.progress}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${selectedJob.progress}%` }}
                  />
                </div>
                {selectedJob.eta && (
                  <p className="text-lg text-primary font-bold mt-2">
                    ETA: {selectedJob.eta}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Locations */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Locations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-green-600" />
                </div>
                <div className="w-0.5 h-8 bg-gray-200 my-1" />
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-red-600" />
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Pickup</p>
                  <p className="font-medium">{selectedJob.pickupLocation}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Delivery</p>
                  <p className="font-medium">{selectedJob.deliveryLocation}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule & Details */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Delivery Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Date</p>
                <p className="font-medium flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {selectedJob.scheduledDate}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Time Window</p>
                <p className="font-medium flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {selectedJob.scheduledTime}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Product</p>
                <p className="font-medium flex items-center gap-1">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  {selectedJob.product}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Quantity</p>
                <p className="font-medium">{selectedJob.quantity}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Driver & Vehicle */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Driver & Vehicle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Driver</p>
                <p className="font-medium flex items-center gap-1">
                  <User className="h-4 w-4 text-muted-foreground" />
                  {selectedJob.driver}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Vehicle</p>
                <p className="font-medium flex items-center gap-1">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  {selectedJob.vehicle}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* POD Section */}
        {selectedJob.podAvailable && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Proof of Delivery</p>
                    <p className="text-sm text-muted-foreground">Document available</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="gap-2 bg-white">
                  <FileText className="h-4 w-4" />
                  View POD
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Support */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Need Help?</p>
                  <p className="text-sm text-muted-foreground">Contact dispatch team</p>
                </div>
              </div>
              <Button size="sm" className="gap-2">
                <Phone className="h-4 w-4" />
                Call
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 text-center text-xs text-muted-foreground">
        Last updated: {new Date().toLocaleTimeString()} • Powered by NJ Ashton Transport
      </footer>
    </div>
  )
}
