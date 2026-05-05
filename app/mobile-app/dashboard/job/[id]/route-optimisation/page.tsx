"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Navigation, MapPin, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function RouteOptimisationPage() {
  const params = useParams()
  const jobId = params.id as string

  const handlePreviewNavigation = () => {
    alert("Opening navigation preview...")
  }

  const handleStartNavigation = () => {
    alert("Starting navigation...")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center gap-3 p-4">
          <Link href={`/mobile-app/dashboard/job/${jobId}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold text-foreground">Route Optimisation</h1>
            <p className="text-xs text-muted-foreground">{jobId}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6 max-w-4xl mx-auto pb-8">
        <Card className="bg-gradient-to-r from-teal-50 to-teal-100/50 border-teal-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-teal-900">
              <Navigation className="h-5 w-5" />
              Route Optimisation
            </CardTitle>
            <p className="text-sm text-teal-700">Optimised route for efficient delivery</p>
          </CardHeader>
        </Card>

        {/* Route Display */}
        <Card>
          <CardContent className="pt-6 space-y-6">
            {/* Pickup Location */}
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-700 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Pickup Location</p>
                  <p className="font-semibold text-foreground mb-1">Infrastructure Co</p>
                  <p className="text-sm text-muted-foreground">321 Highway Rd, Perth WA</p>
                </div>
              </div>

              {/* Route Line */}
              <div className="absolute left-6 top-12 w-0.5 h-16 bg-gradient-to-b from-teal-400 to-teal-600 flex flex-col items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-teal-500 my-1" />
                <div className="w-2 h-2 rounded-full bg-teal-500 my-1" />
                <div className="w-2 h-2 rounded-full bg-teal-500 my-1" />
              </div>
            </div>

            {/* Dropoff Location */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-700 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 bg-gray-50 rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Dropoff Location</p>
                <p className="font-semibold text-foreground mb-1">Rock Transport Co</p>
                <p className="text-sm text-muted-foreground">21 Quarry St, Mandurah WA 6210</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Route Information */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <p className="text-sm text-muted-foreground">Route Status</p>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                  Optimised
                </Badge>
              </div>
              <div className="flex items-center justify-between py-2">
                <p className="text-sm text-muted-foreground">Traffic Conditions</p>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300">
                  Moderate
                </Badge>
              </div>
              <div className="flex items-center justify-between py-2">
                <p className="text-sm text-muted-foreground">Fuel Efficiency</p>
                <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-300">
                  High
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="space-y-3">
          <Button variant="outline" size="lg" className="w-full gap-2 bg-transparent" onClick={handlePreviewNavigation}>
            <Eye className="h-5 w-5" />
            Preview Navigation
          </Button>
          <Button size="lg" className="w-full gap-2 bg-teal-700 hover:bg-teal-800" onClick={handleStartNavigation}>
            <Navigation className="h-5 w-5" />
            Start Navigation
          </Button>
        </div>
      </main>
    </div>
  )
}
