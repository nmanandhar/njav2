"use client"

import type React from "react"

import { useState } from "react"
import { DashboardTopNav } from "@/components/dashboard/dashboard-topnav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowLeft, Plus, MapPin, MoreVertical, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

type LocationType = "stage-point" | "drop-site" | "tip-site"

type SubLocation = {
  id: string
  name: string
  address: string
  type: LocationType
}

type Location = {
  id: string
  companyName: string
  address: string
  contactPerson: string
  phoneNumber: string
  source: "head-office" | "client"
  subLocations: SubLocation[]
}

export default function AddressBookPage() {
  const [pickupLocations, setPickupLocations] = useState<Location[]>([
    {
      id: "1",
      companyName: "Construction Materials Ltd",
      address: "123 Construction Ave, City",
      contactPerson: "John Wilson",
      phoneNumber: "+61 2 1234 5678",
      source: "head-office",
      subLocations: [
        { id: "s1", name: "Main Yard", address: "123 Construction Ave, City", type: "stage-point" },
        { id: "s2", name: "North Depot", address: "45 Industrial Rd, City", type: "stage-point" },
      ],
    },
    {
      id: "2",
      companyName: "ABC Quarry",
      address: "456 Industrial Rd, City",
      contactPerson: "Sarah Mitchell",
      phoneNumber: "+61 2 9876 5432",
      source: "head-office",
      subLocations: [],
    },
  ])

  const [deliveryLocations, setDeliveryLocations] = useState<Location[]>([
    {
      id: "3",
      companyName: "789 Development St Site",
      address: "789 Development St, City",
      contactPerson: "Mike Brown",
      phoneNumber: "+61 2 5555 1234",
      source: "client",
      subLocations: [
        { id: "d1", name: "Loading Bay A", address: "789 Development St, City", type: "drop-site" },
        { id: "d2", name: "Waste Area", address: "789 Development St, City", type: "tip-site" },
      ],
    },
    {
      id: "4",
      companyName: "City Council Landfill",
      address: "100 Waste Management Rd, City",
      contactPerson: "Tom Johnson",
      phoneNumber: "+61 2 7777 8888",
      source: "head-office",
      subLocations: [],
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isAddSubLocationDialogOpen, setIsAddSubLocationDialogOpen] = useState(false)
  const [currentLocationType, setCurrentLocationType] = useState<"pickup" | "delivery">("pickup")
  const [selectedLocationId, setSelectedLocationId] = useState<string>("")

  const handleAddLocation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newLocation: Location = {
      id: Date.now().toString(),
      companyName: formData.get("companyName") as string,
      address: formData.get("address") as string,
      contactPerson: formData.get("contactPerson") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      source: "client",
      subLocations: [],
    }

    if (currentLocationType === "pickup") {
      setPickupLocations([...pickupLocations, newLocation])
    } else {
      setDeliveryLocations([...deliveryLocations, newLocation])
    }

    setIsAddDialogOpen(false)
    e.currentTarget.reset()
  }

  const handleAddSubLocation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newSubLocation: SubLocation = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      address: formData.get("address") as string,
      type: formData.get("type") as LocationType,
    }

    const updateLocations = (locations: Location[]) =>
      locations.map((loc) =>
        loc.id === selectedLocationId ? { ...loc, subLocations: [...loc.subLocations, newSubLocation] } : loc,
      )

    if (currentLocationType === "pickup") {
      setPickupLocations(updateLocations(pickupLocations))
    } else {
      setDeliveryLocations(updateLocations(deliveryLocations))
    }

    setIsAddSubLocationDialogOpen(false)
    e.currentTarget.reset()
  }

  const openAddSubLocationDialog = (locationId: string, locationType: "pickup" | "delivery") => {
    setSelectedLocationId(locationId)
    setCurrentLocationType(locationType)
    setIsAddSubLocationDialogOpen(true)
  }

  const getSubLocationTypeLabel = (type: LocationType) => {
    switch (type) {
      case "stage-point":
        return "Stage Point"
      case "drop-site":
        return "Drop Site"
      case "tip-site":
        return "Tip Site"
    }
  }

  const renderLocationCard = (location: Location, type: "pickup" | "delivery") => (
    <Card key={location.id} className="border-border">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-lg">{location.companyName}</CardTitle>
              <Badge variant={location.source === "head-office" ? "secondary" : "default"}>
                {location.source === "head-office" ? "Head Office" : "Client Added"}
              </Badge>
            </div>
            <CardDescription className="flex items-center gap-1 text-sm">
              <MapPin className="h-3 w-3" />
              {location.address}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Pencil className="h-4 w-4 mr-2" />
                Edit Location
              </DropdownMenuItem>
              {location.source === "client" && (
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Location
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Contact Person</p>
              <p className="font-medium">{location.contactPerson}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Phone Number</p>
              <p className="font-medium">{location.phoneNumber}</p>
            </div>
          </div>

          {location.subLocations.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold">Sub-Locations</h4>
              </div>
              <div className="space-y-2">
                {location.subLocations.map((subLoc) => (
                  <div key={subLoc.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{subLoc.name}</p>
                        <Badge variant="outline" className="text-xs">
                          {getSubLocationTypeLabel(subLoc.type)}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{subLoc.address}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            className="w-full mt-2 bg-transparent"
            onClick={() => openAddSubLocationDialog(location.id, type)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Sub-Location
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      <DashboardTopNav />
      <div className="flex-1">
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard/jobs">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Jobs
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Address Book</h1>
            <p className="text-muted-foreground">Manage pickup and delivery locations with detailed sub-locations</p>
          </div>

          <Tabs defaultValue="pickup" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="pickup">Pickup Locations</TabsTrigger>
              <TabsTrigger value="delivery">Delivery Locations</TabsTrigger>
            </TabsList>

            <TabsContent value="pickup" className="mt-6">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">{pickupLocations.length} pickup location(s)</p>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setCurrentLocationType("pickup")} className="bg-primary hover:bg-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Pickup Location
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <form onSubmit={handleAddLocation}>
                      <DialogHeader>
                        <DialogTitle>Add New Pickup Location</DialogTitle>
                        <DialogDescription>
                          Add a new pickup location to your address book. This will sync with Head Office.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="companyName">Company Name</Label>
                          <Input id="companyName" name="companyName" required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" name="address" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="contactPerson">Contact Person</Label>
                            <Input id="contactPerson" name="contactPerson" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input id="phoneNumber" name="phoneNumber" required />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">Add Location</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pickupLocations.map((location) => renderLocationCard(location, "pickup"))}
              </div>
            </TabsContent>

            <TabsContent value="delivery" className="mt-6">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">{deliveryLocations.length} delivery location(s)</p>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setCurrentLocationType("delivery")}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Delivery Location
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <form onSubmit={handleAddLocation}>
                      <DialogHeader>
                        <DialogTitle>Add New Delivery Location</DialogTitle>
                        <DialogDescription>
                          Add a new delivery location to your address book. This will sync with Head Office.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="companyName">Company Name</Label>
                          <Input id="companyName" name="companyName" required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" name="address" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="contactPerson">Contact Person</Label>
                            <Input id="contactPerson" name="contactPerson" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input id="phoneNumber" name="phoneNumber" required />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">Add Location</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {deliveryLocations.map((location) => renderLocationCard(location, "delivery"))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Dialog for adding sub-locations */}
          <Dialog open={isAddSubLocationDialogOpen} onOpenChange={setIsAddSubLocationDialogOpen}>
            <DialogContent>
              <form onSubmit={handleAddSubLocation}>
                <DialogHeader>
                  <DialogTitle>Add Sub-Location</DialogTitle>
                  <DialogDescription>Add a stage point, drop site, or tip site to this location.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Sub-Location Name</Label>
                    <Input id="name" name="name" placeholder="e.g., Main Yard, Loading Bay A" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="subAddress">Address</Label>
                    <Input id="subAddress" name="address" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type</Label>
                    <select
                      id="type"
                      name="type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      required
                    >
                      <option value="stage-point">Stage Point</option>
                      <option value="drop-site">Drop Site</option>
                      <option value="tip-site">Tip Site</option>
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddSubLocationDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Sub-Location</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  )
}
