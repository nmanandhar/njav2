"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Container, Wrench, FileText, Save } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface VehicleSettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vehicle: any
}

export function VehicleSettingsDialog({ open, onOpenChange, vehicle }: VehicleSettingsDialogProps) {
  // Truck Configuration State
  const [truckType, setTruckType] = useState("prime-mover")
  const [axleConfiguration, setAxleConfiguration] = useState("6x4")
  const [suspensionType, setSuspensionType] = useState("air-suspension")
  const [fifthWheelHeight, setFifthWheelHeight] = useState("1250")
  const [gvm, setGvm] = useState("26000")
  const [gcm, setGcm] = useState("68000")

  // Trailer Configuration State
  const [trailerType, setTrailerType] = useState("flat-top")
  const [trailerLength, setTrailerLength] = useState("13.6")
  const [trailerAxles, setTrailerAxles] = useState("3")
  const [trailerGvm, setTrailerGvm] = useState("42000")
  const [trailerSuspension, setTrailerSuspension] = useState("air-suspension")
  const [trailerBrakes, setTrailerBrakes] = useState("abs-ebs")

  // Equipment & Accessories State
  const [tailgate, setTailgate] = useState("hydraulic-lifter")
  const [loadSecurement, setLoadSecurement] = useState("curtainsider")
  const [refrigeration, setRefrigeration] = useState("none")
  const [containerTwistLocks, setContainerTwistLocks] = useState("yes")
  const [loadingDocks, setLoadingDocks] = useState("2")
  const [additionalEquipment, setAdditionalEquipment] = useState("")

  // Dimensions & Capacity State
  const [deckHeight, setDeckHeight] = useState("1400")
  const [internalHeight, setInternalHeight] = useState("2700")
  const [internalWidth, setInternalWidth] = useState("2450")
  const [payloadCapacity, setPayloadCapacity] = useState("28000")
  const [volumeCapacity, setVolumeCapacity] = useState("100")
  const [numberOfPallets, setNumberOfPallets] = useState("26")

  // Specifications State
  const [engineType, setEngineType] = useState("d13-500hp")
  const [transmissionType, setTransmissionType] = useState("automated-12-speed")
  const [fuelTankCapacity, setFuelTankCapacity] = useState("600")
  const [adBlueCapacity, setAdBlueCapacity] = useState("80")
  const [tyreSizeFront, setTyreSizeFront] = useState("315/80R22.5")
  const [tyreSizeRear, setTyreSizeRear] = useState("315/80R22.5")

  const handleSave = () => {
    console.log("[v0] Saving vehicle configuration", {
      vehicleId: vehicle?.id,
      truck: { truckType, axleConfiguration, suspensionType, gvm, gcm },
      trailer: { trailerType, trailerLength, trailerAxles, trailerGvm },
      equipment: { tailgate, loadSecurement, refrigeration },
      dimensions: { deckHeight, payloadCapacity, volumeCapacity },
      specifications: { engineType, transmissionType, fuelTankCapacity },
    })
    onOpenChange(false)
  }

  if (!vehicle) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Vehicle Configuration</DialogTitle>
          <DialogDescription>
            Configure truck, trailer, and equipment specifications for {vehicle.id} - {vehicle.vehicle}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="truck" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="truck" className="text-xs">
              <Truck className="h-3 w-3 mr-1" />
              Truck Setup
            </TabsTrigger>
            <TabsTrigger value="trailer" className="text-xs">
              <Container className="h-3 w-3 mr-1" />
              Trailer Config
            </TabsTrigger>
            <TabsTrigger value="equipment" className="text-xs">
              <Wrench className="h-3 w-3 mr-1" />
              Equipment
            </TabsTrigger>
            <TabsTrigger value="specs" className="text-xs">
              <FileText className="h-3 w-3 mr-1" />
              Specifications
            </TabsTrigger>
          </TabsList>

          {/* Truck Setup Tab */}
          <TabsContent value="truck" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Prime Mover Configuration</CardTitle>
                <CardDescription>Configure the truck (bogie) specifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="truck-type">Truck Type</Label>
                    <Select value={truckType} onValueChange={setTruckType}>
                      <SelectTrigger id="truck-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prime-mover">Prime Mover</SelectItem>
                        <SelectItem value="rigid-truck">Rigid Truck</SelectItem>
                        <SelectItem value="truck-and-dog">Truck and Dog</SelectItem>
                        <SelectItem value="b-double">B-Double Prime Mover</SelectItem>
                        <SelectItem value="road-train">Road Train Prime Mover</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="axle-config">Axle Configuration</Label>
                    <Select value={axleConfiguration} onValueChange={setAxleConfiguration}>
                      <SelectTrigger id="axle-config">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4x2">4x2 (Single Drive Axle)</SelectItem>
                        <SelectItem value="6x2">6x2 (Tag Axle)</SelectItem>
                        <SelectItem value="6x4">6x4 (Tandem Drive)</SelectItem>
                        <SelectItem value="8x4">8x4 (Tri-Drive)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="suspension">Suspension Type</Label>
                    <Select value={suspensionType} onValueChange={setSuspensionType}>
                      <SelectTrigger id="suspension">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="air-suspension">Air Suspension</SelectItem>
                        <SelectItem value="leaf-spring">Leaf Spring</SelectItem>
                        <SelectItem value="parabolic-spring">Parabolic Spring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fifth-wheel">Fifth Wheel Height (mm)</Label>
                    <Input
                      id="fifth-wheel"
                      type="number"
                      value={fifthWheelHeight}
                      onChange={(e) => setFifthWheelHeight(e.target.value)}
                      placeholder="1250"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Weight Ratings</CardTitle>
                <CardDescription>Gross Vehicle Mass and Combination Mass</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gvm">GVM - Gross Vehicle Mass (kg)</Label>
                    <Input
                      id="gvm"
                      type="number"
                      value={gvm}
                      onChange={(e) => setGvm(e.target.value)}
                      placeholder="26000"
                    />
                    <p className="text-xs text-muted-foreground">Maximum laden weight of truck only</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gcm">GCM - Gross Combination Mass (kg)</Label>
                    <Input
                      id="gcm"
                      type="number"
                      value={gcm}
                      onChange={(e) => setGcm(e.target.value)}
                      placeholder="68000"
                    />
                    <p className="text-xs text-muted-foreground">Maximum laden weight of truck + trailer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trailer Configuration Tab */}
          <TabsContent value="trailer" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Trailer Setup</CardTitle>
                <CardDescription>Configure trailer attached to the prime mover</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="trailer-type">Trailer Type</Label>
                    <Select value={trailerType} onValueChange={setTrailerType}>
                      <SelectTrigger id="trailer-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flat-top">Flat Top Semi-Trailer</SelectItem>
                        <SelectItem value="curtainsider">Curtainsider Semi-Trailer</SelectItem>
                        <SelectItem value="drop-deck">Drop Deck / Step Deck</SelectItem>
                        <SelectItem value="low-loader">Low Loader</SelectItem>
                        <SelectItem value="extendable">Extendable Semi-Trailer</SelectItem>
                        <SelectItem value="tipper">Tipper Trailer</SelectItem>
                        <SelectItem value="container-chassis">Container Chassis</SelectItem>
                        <SelectItem value="refrigerated">Refrigerated Van</SelectItem>
                        <SelectItem value="flatbed">Flatbed Semi-Trailer</SelectItem>
                        <SelectItem value="tanker">Tanker Trailer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="trailer-length">Trailer Length (metres)</Label>
                    <Select value={trailerLength} onValueChange={setTrailerLength}>
                      <SelectTrigger id="trailer-length">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12.5">12.5m (Standard Semi)</SelectItem>
                        <SelectItem value="13.6">13.6m (Extended Semi)</SelectItem>
                        <SelectItem value="14.6">14.6m (Extendable)</SelectItem>
                        <SelectItem value="16.5">16.5m (B-Double Lead)</SelectItem>
                        <SelectItem value="19.0">19.0m (Road Train)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="trailer-axles">Number of Axles</Label>
                    <Select value={trailerAxles} onValueChange={setTrailerAxles}>
                      <SelectTrigger id="trailer-axles">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 Axles (Tandem)</SelectItem>
                        <SelectItem value="3">3 Axles (Tri-Axle)</SelectItem>
                        <SelectItem value="4">4 Axles (Quad-Axle)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="trailer-gvm">Trailer GVM (kg)</Label>
                    <Input
                      id="trailer-gvm"
                      type="number"
                      value={trailerGvm}
                      onChange={(e) => setTrailerGvm(e.target.value)}
                      placeholder="42000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="trailer-suspension">Trailer Suspension</Label>
                    <Select value={trailerSuspension} onValueChange={setTrailerSuspension}>
                      <SelectTrigger id="trailer-suspension">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="air-suspension">Air Suspension</SelectItem>
                        <SelectItem value="mechanical-spring">Mechanical Spring</SelectItem>
                        <SelectItem value="walking-beam">Walking Beam</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="trailer-brakes">Braking System</Label>
                    <Select value={trailerBrakes} onValueChange={setTrailerBrakes}>
                      <SelectTrigger id="trailer-brakes">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="abs-ebs">ABS with EBS (Electronic Braking)</SelectItem>
                        <SelectItem value="abs">ABS (Anti-lock Braking)</SelectItem>
                        <SelectItem value="standard">Standard Air Brakes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Dimensions & Capacity</CardTitle>
                <CardDescription>Trailer cargo space and load capacity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="deck-height">Deck Height (mm)</Label>
                    <Input
                      id="deck-height"
                      type="number"
                      value={deckHeight}
                      onChange={(e) => setDeckHeight(e.target.value)}
                      placeholder="1400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="internal-height">Internal Height (mm)</Label>
                    <Input
                      id="internal-height"
                      type="number"
                      value={internalHeight}
                      onChange={(e) => setInternalHeight(e.target.value)}
                      placeholder="2700"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="internal-width">Internal Width (mm)</Label>
                    <Input
                      id="internal-width"
                      type="number"
                      value={internalWidth}
                      onChange={(e) => setInternalWidth(e.target.value)}
                      placeholder="2450"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payload">Payload Capacity (kg)</Label>
                    <Input
                      id="payload"
                      type="number"
                      value={payloadCapacity}
                      onChange={(e) => setPayloadCapacity(e.target.value)}
                      placeholder="28000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="volume">Volume Capacity (m³)</Label>
                    <Input
                      id="volume"
                      type="number"
                      value={volumeCapacity}
                      onChange={(e) => setVolumeCapacity(e.target.value)}
                      placeholder="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pallets">Pallet Capacity</Label>
                    <Input
                      id="pallets"
                      type="number"
                      value={numberOfPallets}
                      onChange={(e) => setNumberOfPallets(e.target.value)}
                      placeholder="26"
                    />
                    <p className="text-xs text-muted-foreground">Standard Australian pallets</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Equipment & Accessories Tab */}
          <TabsContent value="equipment" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Loading Equipment</CardTitle>
                <CardDescription>Tailgates, ramps, and loading accessories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tailgate">Tailgate / Rear Equipment</Label>
                    <Select value={tailgate} onValueChange={setTailgate}>
                      <SelectTrigger id="tailgate">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="barn-doors">Barn Doors</SelectItem>
                        <SelectItem value="roller-door">Roller Door</SelectItem>
                        <SelectItem value="hydraulic-lifter">Hydraulic Tail Lifter</SelectItem>
                        <SelectItem value="ramp">Loading Ramp</SelectItem>
                        <SelectItem value="swing-door">Swing Door</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="load-securement">Load Securement System</Label>
                    <Select value={loadSecurement} onValueChange={setLoadSecurement}>
                      <SelectTrigger id="load-securement">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="curtainsider">Curtainsider System</SelectItem>
                        <SelectItem value="straps">Ratchet Straps</SelectItem>
                        <SelectItem value="chains">Load Chains</SelectItem>
                        <SelectItem value="gates">Side Gates</SelectItem>
                        <SelectItem value="integrated">Integrated Track System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="refrigeration">Refrigeration Unit</Label>
                    <Select value={refrigeration} onValueChange={setRefrigeration}>
                      <SelectTrigger id="refrigeration">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="single-temp">Single Temperature (-20°C to +20°C)</SelectItem>
                        <SelectItem value="multi-temp">Multi-Temperature Zones</SelectItem>
                        <SelectItem value="deep-freeze">Deep Freeze (-40°C)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twist-locks">Container Twist Locks</Label>
                    <Select value={containerTwistLocks} onValueChange={setContainerTwistLocks}>
                      <SelectTrigger id="twist-locks">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">Not Equipped</SelectItem>
                        <SelectItem value="yes">Equipped (20ft / 40ft capable)</SelectItem>
                        <SelectItem value="auto">Automatic Twist Locks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Additional Equipment</CardTitle>
                <CardDescription>Side loading, special equipment, and accessories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="loading-docks">Number of Side Loading Points</Label>
                  <Select value={loadingDocks} onValueChange={setLoadingDocks}>
                    <SelectTrigger id="loading-docks">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No Side Loading</SelectItem>
                      <SelectItem value="2">2 Points (Mid-section)</SelectItem>
                      <SelectItem value="4">4 Points (Front & Rear)</SelectItem>
                      <SelectItem value="full">Full Side Access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional-equipment">Other Equipment & Accessories</Label>
                  <Textarea
                    id="additional-equipment"
                    value={additionalEquipment}
                    onChange={(e) => setAdditionalEquipment(e.target.value)}
                    placeholder="E.g., winch system, crane, specialized mounting points, reinforced floor, livestock crates, car carrier deck..."
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Describe any specialized equipment, modifications, or accessories
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Specifications Tab */}
          <TabsContent value="specs" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Engine & Drivetrain</CardTitle>
                <CardDescription>Mechanical specifications and performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="engine-type">Engine Type</Label>
                    <Select value={engineType} onValueChange={setEngineType}>
                      <SelectTrigger id="engine-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="d11-450hp">D11 - 450hp (11L)</SelectItem>
                        <SelectItem value="d13-500hp">D13 - 500hp (13L)</SelectItem>
                        <SelectItem value="d16-550hp">D16 - 550hp (16L)</SelectItem>
                        <SelectItem value="isx15-600hp">ISX15 - 600hp (15L)</SelectItem>
                        <SelectItem value="om471-480hp">OM471 - 480hp (12.8L)</SelectItem>
                        <SelectItem value="custom">Custom / Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transmission">Transmission Type</Label>
                    <Select value={transmissionType} onValueChange={setTransmissionType}>
                      <SelectTrigger id="transmission">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual-13-speed">Manual 13-Speed</SelectItem>
                        <SelectItem value="manual-18-speed">Manual 18-Speed (Road Ranger)</SelectItem>
                        <SelectItem value="automated-12-speed">Automated 12-Speed (I-Shift)</SelectItem>
                        <SelectItem value="automated-16-speed">Automated 16-Speed</SelectItem>
                        <SelectItem value="powershift">PowerShift Automatic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Fluid Capacities</CardTitle>
                <CardDescription>Fuel, AdBlue, and fluid specifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fuel-capacity">Fuel Tank Capacity (litres)</Label>
                    <Input
                      id="fuel-capacity"
                      type="number"
                      value={fuelTankCapacity}
                      onChange={(e) => setFuelTankCapacity(e.target.value)}
                      placeholder="600"
                    />
                    <p className="text-xs text-muted-foreground">Total capacity (all tanks)</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adblue-capacity">AdBlue Capacity (litres)</Label>
                    <Input
                      id="adblue-capacity"
                      type="number"
                      value={adBlueCapacity}
                      onChange={(e) => setAdBlueCapacity(e.target.value)}
                      placeholder="80"
                    />
                    <p className="text-xs text-muted-foreground">DEF/AdBlue tank capacity</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tyres & Wheels</CardTitle>
                <CardDescription>Tyre specifications and configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tyre-front">Front Tyre Size</Label>
                    <Select value={tyreSizeFront} onValueChange={setTyreSizeFront}>
                      <SelectTrigger id="tyre-front">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="295/80R22.5">295/80R22.5</SelectItem>
                        <SelectItem value="315/80R22.5">315/80R22.5</SelectItem>
                        <SelectItem value="385/65R22.5">385/65R22.5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tyre-rear">Rear/Drive Tyre Size</Label>
                    <Select value={tyreSizeRear} onValueChange={setTyreSizeRear}>
                      <SelectTrigger id="tyre-rear">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="295/80R22.5">295/80R22.5</SelectItem>
                        <SelectItem value="315/80R22.5">315/80R22.5</SelectItem>
                        <SelectItem value="12R22.5">12R22.5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Configuration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
