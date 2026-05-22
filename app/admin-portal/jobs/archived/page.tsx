"use client"

import { AdminJobsHeaderNav } from "@/components/admin/admin-jobs-header-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Archive, RotateCcw, Trash2, Calendar, MapPin, Truck } from "lucide-react"
import { useState } from "react"

// Mock archived jobs data
const archivedJobs = [
  {
    id: "2024-A001",
    jobNumber: "JOB-2024-A001",
    clientName: "Metro Construction Group",
    clientPO: "PO-2024-MG-4521",
    pickupAddress: "45 Industrial Ave, Auburn NSW 2144",
    tipAddress: "12 Quarry Rd, Penrith NSW 2750",
    archivedDate: "2024-01-10",
    originalStatus: "Completed",
    material: "Concrete Mix - 18m³",
    trucksAssigned: 3,
  },
  {
    id: "2024-A002",
    jobNumber: "JOB-2024-A002",
    clientName: "Harbour Developments",
    clientPO: "PO-2024-HD-7832",
    pickupAddress: "78 Wharf St, Pyrmont NSW 2009",
    tipAddress: "34 Recycling Way, Wetherill Park NSW 2164",
    archivedDate: "2024-01-08",
    originalStatus: "Completed",
    material: "Demolition Waste - 25m³",
    trucksAssigned: 5,
  },
  {
    id: "2024-A003",
    jobNumber: "JOB-2024-A003",
    clientName: "Westfield Projects",
    clientPO: "PO-2024-WP-1234",
    pickupAddress: "100 George St, Sydney NSW 2000",
    tipAddress: "56 Tip Site Rd, Eastern Creek NSW 2766",
    archivedDate: "2024-01-05",
    originalStatus: "Cancelled",
    material: "Excavation Material - 30m³",
    trucksAssigned: 4,
  },
]

export default function ArchivedJobsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredJobs = archivedJobs.filter(
    (job) =>
      job.jobNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.clientPO.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <AdminJobsHeaderNav />

      <div className="p-6 space-y-6">
        {/* Header with search */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Archive className="h-6 w-6 text-muted-foreground" />
            <div>
              <h2 className="text-xl font-semibold">Archived Jobs</h2>
              <p className="text-sm text-muted-foreground">
                {archivedJobs.length} jobs archived
              </p>
            </div>
          </div>
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search archived jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Archived jobs list */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="border-l-4 border-l-gray-400">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CardTitle className="text-lg font-mono">{job.jobNumber}</CardTitle>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                      <Archive className="h-3 w-3 mr-1" />
                      Archived
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        job.originalStatus === "Completed"
                          ? "border-green-300 text-green-600"
                          : "border-red-300 text-red-600"
                      }
                    >
                      Was: {job.originalStatus}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <RotateCcw className="h-4 w-4" />
                      Restore
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                      Delete Permanently
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-6 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Client</p>
                    <p className="font-medium">{job.clientName}</p>
                    <p className="text-muted-foreground text-xs">{job.clientPO}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> Pickup
                    </p>
                    <p className="font-medium">{job.pickupAddress}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> Tip
                    </p>
                    <p className="font-medium">{job.tipAddress}</p>
                  </div>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-muted-foreground mb-1 flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Archived
                      </p>
                      <p className="font-medium">{job.archivedDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1 flex items-center gap-1">
                        <Truck className="h-3 w-3" /> Trucks
                      </p>
                      <p className="font-medium">{job.trucksAssigned}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <Archive className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No archived jobs found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
