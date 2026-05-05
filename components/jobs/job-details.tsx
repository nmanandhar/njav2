"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, MapPin, Truck, Calendar, User, Package, FileText, Clock, CheckCircle2, Upload } from "lucide-react"

interface JobDetailsProps {
  jobId: string
}

// Mock job detail data
const mockJobDetail = {
  id: "2024-001",
  jobNumber: "JOB-2024-001",
  status: "In Progress",
  createdAt: "2024-01-15T08:00:00Z",
  updatedAt: "2024-01-15T14:30:00Z",
  driver: {
    name: "John Smith",
    type: "Internal",
    phone: "+1 (555) 123-4567",
    avatar: "JS",
  },
  location: {
    pickup: "Depot A - 123 Industrial Way",
    delivery: "Construction Site Alpha - 456 Development Ave",
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  material: {
    type: "Concrete Mix",
    quantity: "15 cubic yards",
    specifications: "High-strength concrete, 4000 PSI",
  },
  truck: {
    id: "TRUCK-001",
    model: "Volvo FH16",
    capacity: "20 cubic yards",
  },
  timeline: [
    { time: "08:00", event: "Job created", status: "completed" },
    { time: "08:15", event: "Driver assigned", status: "completed" },
    { time: "09:30", event: "Material loaded", status: "completed" },
    { time: "10:45", event: "En route to site", status: "completed" },
    { time: "11:30", event: "Arrived at site", status: "completed" },
    { time: "12:00", event: "Delivery in progress", status: "current" },
    { time: "TBD", event: "Delivery completed", status: "pending" },
  ],
  photos: [
    { id: 1, url: "/construction-site.png", caption: "Site arrival" },
    { id: 2, url: "/concrete-truck.jpg", caption: "Material loading" },
    { id: 3, url: "/delivery-progress.jpg", caption: "Delivery progress" },
  ],
  dockets: [
    { id: 1, name: "Delivery Docket #001", type: "PDF", size: "245 KB" },
    { id: 2, name: "Material Certificate", type: "PDF", size: "180 KB" },
  ],
}

export function JobDetails({ jobId }: JobDetailsProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{mockJobDetail.jobNumber}</h1>
              <p className="text-muted-foreground">Job Details & Progress</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={mockJobDetail.status === "In Progress" ? "secondary" : "default"}>
              {mockJobDetail.status}
            </Badge>
            <Button variant="outline">Edit Job</Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Overview */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Job Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Driver</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {mockJobDetail.driver.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">{mockJobDetail.driver.name}</div>
                        <div className="text-xs text-muted-foreground">{mockJobDetail.driver.type}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Vehicle</span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{mockJobDetail.truck.id}</div>
                      <div className="text-xs text-muted-foreground">{mockJobDetail.truck.model}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Material</span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{mockJobDetail.material.type}</div>
                      <div className="text-xs text-muted-foreground">{mockJobDetail.material.quantity}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Created</span>
                    </div>
                    <div className="text-sm text-foreground">
                      {new Date(mockJobDetail.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Pickup Location</div>
                      <div className="text-sm text-muted-foreground">{mockJobDetail.location.pickup}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-accent mt-1" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Delivery Location</div>
                      <div className="text-sm text-muted-foreground">{mockJobDetail.location.delivery}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Photos */}
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-card-foreground">Photos ({mockJobDetail.photos.length})</CardTitle>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mockJobDetail.photos.map((photo) => (
                    <div key={photo.id} className="space-y-2">
                      <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                        <img
                          src={photo.url || "/placeholder.svg"}
                          alt={photo.caption}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">{photo.caption}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Timeline */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Job Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockJobDetail.timeline.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {item.status === "completed" ? (
                          <CheckCircle2 className="h-4 w-4 text-accent" />
                        ) : item.status === "current" ? (
                          <Clock className="h-4 w-4 text-primary" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground">{item.event}</div>
                        <div className="text-xs text-muted-foreground">{item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-card-foreground">Documents</CardTitle>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockJobDetail.dockets.map((doc) => (
                    <div key={doc.id} className="flex items-center space-x-3 p-2 rounded-lg border border-border">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground">{doc.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {doc.type} • {doc.size}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
