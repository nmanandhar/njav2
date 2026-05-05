"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, MapPin, Truck, User, FileText, Camera, ArrowLeft } from "lucide-react"

interface JobDetailsProps {
  jobId: string
}

export function JobDetails({ jobId }: JobDetailsProps) {
  // Mock data - replace with actual API call
  const job = {
    jobNumber: "JOB-2024-015",
    status: "In Progress",
    driverName: "Tom Brown",
    location: "567 Industrial Blvd, City",
    material: "Gravel",
    truckAllocation: "TRUCK-SC-001",
    createdAt: "2024-01-18",
    photos: 2,
    dockets: 1,
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{job.jobNumber}</h1>
            <p className="text-muted-foreground">Job Details</p>
          </div>
          <Badge variant="secondary">{job.status}</Badge>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Job Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Driver</p>
                  <p className="text-sm font-medium text-foreground">{job.driverName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="text-sm font-medium text-foreground">{job.createdAt}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground">{job.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Truck</p>
                  <p className="text-sm font-medium text-foreground">{job.truckAllocation}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Material</p>
              <p className="text-sm font-medium text-foreground">{job.material}</p>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Camera className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{job.photos} Photos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{job.dockets} Dockets</span>
                </div>
              </div>
              <Button variant="outline">View Files</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
