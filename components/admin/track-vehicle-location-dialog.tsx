"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { MapPin, Navigation, Truck, Clock, Activity, Radio, RefreshCw } from "lucide-react"
import { format } from "date-fns"

interface LocationPoint {
  lat: number
  lng: number
  timestamp: string
  address: string
  status: "current" | "previous"
  activity: string
}

interface TrackVehicleLocationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vehicle: any
}

export function TrackVehicleLocationDialog({ open, onOpenChange, vehicle }: TrackVehicleLocationDialogProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  if (!vehicle) return null

  // Mock location history - current location + last 5 locations
  const locationHistory: LocationPoint[] = [
    {
      lat: -33.8688,
      lng: 151.2093,
      timestamp: new Date().toISOString(),
      address: "123 George St, Sydney NSW 2000",
      status: "current",
      activity: "En Route",
    },
    {
      lat: -33.8685,
      lng: 151.2095,
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
      address: "456 Park Ave, Sydney NSW 2000",
      status: "previous",
      activity: "En Route",
    },
    {
      lat: -33.869,
      lng: 151.2091,
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
      address: "789 Kent St, Sydney NSW 2000",
      status: "previous",
      activity: "Stopped",
    },
    {
      lat: -33.8687,
      lng: 151.2094,
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
      address: "321 Sussex St, Sydney NSW 2000",
      status: "previous",
      activity: "En Route",
    },
    {
      lat: -33.8689,
      lng: 151.2092,
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
      address: "654 Clarence St, Sydney NSW 2000",
      status: "previous",
      activity: "Stopped",
    },
    {
      lat: -33.8686,
      lng: 151.2096,
      timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(), // 1.5 hours ago
      address: "987 York St, Sydney NSW 2000",
      status: "previous",
      activity: "En Route",
    },
  ]

  const currentLocation = locationHistory[0]
  const previousLocations = locationHistory.slice(1)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return {
      date: format(date, "dd/MM/yyyy"),
      time: format(date, "HH:mm:ss"),
      relative: getRelativeTime(date),
    }
  }

  const getRelativeTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`

    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`

    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[95vw] w-full sm:!max-w-[95vw] md:!max-w-[1800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl flex items-center gap-2">
                <Navigation className="h-6 w-6 text-primary" />
                Track Vehicle Location
              </DialogTitle>
              <DialogDescription className="text-base mt-1">
                {vehicle.id} • {vehicle.registration} • {vehicle.make} {vehicle.model}
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-emerald-500 text-emerald-500 flex items-center gap-1">
                <Radio className="h-3 w-3" />
                GPS Online
              </Badge>
              <Badge>{vehicle.gpsActivity}</Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 mt-4">
          {/* Map Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Live Location Map
              </h3>
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>

            {/* Map Placeholder - Integrate with Google Maps/Mapbox */}
            <div className="relative h-[500px] bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg overflow-hidden border">
              {/* Current Location Marker */}
              <div
                className="absolute flex flex-col items-center gap-1 animate-pulse z-10"
                style={{
                  left: "50%",
                  top: "40%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="bg-emerald-500 text-white rounded-full p-3 shadow-lg border-4 border-white animate-ping absolute" />
                <div className="bg-emerald-500 text-white rounded-full p-3 shadow-lg border-4 border-white relative">
                  <Truck className="h-6 w-6" />
                </div>
                <Badge variant="default" className="bg-emerald-500 font-mono text-xs mt-2">
                  {vehicle.registration}
                </Badge>
                <div className="text-xs text-center bg-white/95 backdrop-blur-sm px-2 py-1 rounded shadow-md mt-1">
                  <div className="font-semibold text-emerald-600">Current Location</div>
                  <div className="text-muted-foreground">{formatTimestamp(currentLocation.timestamp).relative}</div>
                </div>
              </div>

              {/* Previous Location Markers */}
              {previousLocations.slice(0, 4).map((location, index) => (
                <div
                  key={index}
                  className="absolute flex flex-col items-center gap-1"
                  style={{
                    left: `${35 + Math.random() * 30}%`,
                    top: `${30 + Math.random() * 40}%`,
                  }}
                >
                  <div className="bg-gray-400 text-white rounded-full p-2 shadow-md border-2 border-white opacity-60">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <Badge variant="outline" className="text-xs opacity-70">
                    {index + 1}
                  </Badge>
                </div>
              ))}

              {/* Map Integration Notice */}
              <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border">
                <p className="text-xs text-muted-foreground">
                  Integration with Map Provider (Google Maps, Mapbox, etc.)
                </p>
              </div>

              {/* GPS Coordinates Display */}
              <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm p-3 rounded-lg shadow-lg border">
                <p className="text-xs text-muted-foreground mb-1">Current GPS Coordinates</p>
                <p className="text-sm font-mono font-semibold text-primary">
                  {currentLocation.lat.toFixed(6)}°, {currentLocation.lng.toFixed(6)}°
                </p>
              </div>
            </div>

            {/* Current Location Details */}
            <Card className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
              <div className="flex items-start gap-3">
                <div className="bg-emerald-500 text-white rounded-full p-2 mt-1">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-emerald-900 dark:text-emerald-100">Current Location</h4>
                    <Badge className="bg-emerald-500">Live</Badge>
                  </div>
                  <p className="text-sm font-medium mb-2">{currentLocation.address}</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="font-medium">{formatTimestamp(currentLocation.timestamp).date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Time</p>
                      <p className="font-medium">{formatTimestamp(currentLocation.timestamp).time}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Activity</p>
                      <Badge variant="outline">{currentLocation.activity}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Card>

          {/* Location History Sidebar */}
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-primary" />
                Location History
                <Badge variant="secondary" className="ml-auto">
                  Last 5 Locations
                </Badge>
              </h3>

              <div className="space-y-3">
                {previousLocations.map((location, index) => {
                  const timestamp = formatTimestamp(location.timestamp)
                  return (
                    <div
                      key={index}
                      className="p-3 border border-border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <div className="bg-gray-400 text-white rounded-full p-2">
                            <MapPin className="h-4 w-4" />
                          </div>
                          <div className="text-center mt-1">
                            <Badge variant="outline" className="text-xs">
                              {index + 1}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium mb-1 break-words">{location.address}</p>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 flex-shrink-0" />
                              <span className="font-medium text-primary">{timestamp.relative}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-muted-foreground">Date:</span>
                              <span className="font-mono">{timestamp.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-muted-foreground">Time:</span>
                              <span className="font-mono">{timestamp.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-muted-foreground">GPS:</span>
                              <span className="font-mono text-blue-600 dark:text-blue-400">
                                {location.lat.toFixed(4)}°, {location.lng.toFixed(4)}°
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs mt-2">
                              <Activity className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                              <Badge variant="outline" className="text-xs">
                                {location.activity}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Vehicle Status Card */}
            <Card className="p-4">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" />
                Vehicle Status
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Driver:</span>
                  <span className="font-medium">{vehicle.driver}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Job:</span>
                  <span className="font-medium">{vehicle.job || "No active job"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant={vehicle.status === "Active" ? "default" : "secondary"}>{vehicle.status}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GPS Status:</span>
                  <Badge variant="outline" className="border-emerald-500 text-emerald-500">
                    {vehicle.gpsStatus}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Activity:</span>
                  <Badge variant="outline">{vehicle.gpsActivity}</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>
            <Navigation className="h-4 w-4 mr-2" />
            Open in Live Map
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
