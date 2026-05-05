"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Download, Upload, Filter, Calendar, MapPin, User, Phone, FileText, Search, Check } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"

const mockClients = [
  {
    id: "SMC-001",
    name: "Sydney Metro Construction",
    contactName: "James Wilson",
    email: "james.wilson@sydneymetro.com.au",
    phone: "+61 2 9876 5432",
  },
  {
    id: "BC-001",
    name: "BuildCorp Pty Ltd",
    contactName: "Sarah Chen",
    email: "sarah.chen@buildcorp.com.au",
    phone: "+61 2 8765 4321",
  },
  {
    id: "UD-001",
    name: "Urban Developments",
    contactName: "David Brown",
    email: "david.brown@urbandev.com.au",
    phone: "+61 3 9012 3456",
  },
  {
    id: "IC-001",
    name: "Infrastructure Co",
    contactName: "Emma Thompson",
    email: "emma.thompson@infraco.com.au",
    phone: "+61 8 6789 0123",
  },
]

const mockTippers = [
  { id: "TIP-BME-001", name: "Blue Mountains Earthmoving" },
  { id: "TIP-MHS-002", name: "Metro Haulage Solutions" },
  { id: "TIP-CT-003", name: "Coastal Transport Co" },
  { id: "TIP-WSL-004", name: "Western Sydney Logistics" },
]

const mockSubcontractors = [
  { id: "SUB-RT-001", name: "Regional Transport Services" },
  { id: "SUB-CH-001", name: "Coastal Haulage Pty Ltd" },
  { id: "SUB-AL-001", name: "Alliance Logistics Group" },
  { id: "SUB-ET-001", name: "Express Transport Solutions" },
]

const mockMaterials = [
  { id: "PRD-001", name: "Hydraulic Oil - Premium Grade", unit: "Per Tonne" },
  { id: "PRD-004", name: "VENM / Clay", unit: "Per Tonne" },
  { id: "PRD-005", name: "VENM / Shale", unit: "Per Tonne" },
  { id: "PRD-006", name: "VENM / Sandstone", unit: "Per Tonne" },
]

const mockVehicles = [
  {
    id: "FL-001",
    registration: "ABC-123",
    make: "Volvo",
    model: "FH16",
    type: "Internal" as const,
    company: null,
    status: "Available",
    driver: {
      name: "John Smith",
      phone: "+61 412 345 678",
      licenseClass: "HC",
      licenseExpiry: "2025-06-15",
      njaInduction: "Valid",
      whiteCard: "Expired",
      vocScore: 95,
    },
  },
  {
    id: "FL-002",
    registration: "DEF-456",
    make: "Scania",
    model: "R450",
    type: "Internal" as const,
    company: null,
    status: "Available",
    driver: {
      name: "Sarah Johnson",
      phone: "+61 423 456 789",
      licenseClass: "HC",
      licenseExpiry: "2026-03-20",
      njaInduction: "Valid",
      whiteCard: "Valid",
      vocScore: 88,
    },
  },
  {
    id: "FL-003",
    registration: "GHI-789",
    make: "Mercedes",
    model: "Actros",
    type: "Internal" as const,
    company: null,
    status: "Available",
    driver: {
      name: "Emma Wilson",
      phone: "+61 445 678 901",
      licenseClass: "HC",
      licenseExpiry: "2027-08-25",
      njaInduction: "Valid",
      whiteCard: "Valid",
      vocScore: 91,
    },
  },
  {
    id: "SUB-001",
    registration: "SUB-001",
    make: "Volvo",
    model: "FM",
    type: "Subcontractor" as const,
    company: "Regional Transport Services",
    status: "Available",
    driver: {
      name: "Michael Brown",
      phone: "+61 411 223 344",
      licenseClass: "MC",
      licenseExpiry: "2026-09-10",
      njaInduction: "Valid",
      whiteCard: "Valid",
      vocScore: 82,
    },
  },
  {
    id: "SUB-002",
    registration: "SUB-002",
    make: "Scania",
    model: "P450",
    type: "Subcontractor" as const,
    company: "Coastal Haulage Pty Ltd",
    status: "Available",
    driver: {
      name: "Peter Davidson",
      phone: "+61 422 334 455",
      licenseClass: "HC",
      licenseExpiry: "2025-11-30",
      njaInduction: "Valid",
      whiteCard: "Expiring Soon",
      vocScore: 87,
    },
  },
  {
    id: "SUB-003",
    registration: "SUB-003",
    make: "Isuzu",
    model: "FVZ",
    type: "Subcontractor" as const,
    company: "Regional Transport Services",
    status: "Available",
    driver: {
      name: "James Cooper",
      phone: "+61 433 445 566",
      licenseClass: "HC",
      licenseExpiry: "2026-04-15",
      njaInduction: "Valid",
      whiteCard: "Valid",
      vocScore: 90,
    },
  },
  {
    id: "SUB-004",
    registration: "SUB-004",
    make: "DAF",
    model: "CF",
    type: "Subcontractor" as const,
    company: "Express Transport Solutions",
    status: "Available",
    driver: {
      name: "Robert Clarke",
      phone: "+61 444 556 677",
      licenseClass: "MC",
      licenseExpiry: "2025-07-20",
      njaInduction: "Expired",
      whiteCard: "Valid",
      vocScore: 78,
    },
  },
  {
    id: "FL-004",
    registration: "JKL-012",
    make: "DAF",
    model: "XF",
    type: "Internal" as const,
    company: null,
    status: "Available",
    driver: {
      name: "David Martinez",
      phone: "+61 456 789 012",
      licenseClass: "MC",
      licenseExpiry: "2026-11-15",
      njaInduction: "Valid",
      whiteCard: "Expiring Soon",
      vocScore: 86,
    },
  },
  {
    id: "SUB-005",
    registration: "SUB-005",
    make: "Mercedes",
    model: "Arocs",
    type: "Subcontractor" as const,
    company: "Alliance Logistics Group",
    status: "Available",
    driver: {
      name: "Anthony Richards",
      phone: "+61 467 890 123",
      licenseClass: "HC",
      licenseExpiry: "2027-01-25",
      njaInduction: "Valid",
      whiteCard: "Valid",
      vocScore: 93,
    },
  },
]

export function AdminJobsHeader() {
  const [isNewJobOpen, setIsNewJobOpen] = useState(false)
  const [selectedTrucks, setSelectedTrucks] = useState<string[]>([])
  const [formData, setFormData] = useState({
    client: "",
    clientPO: "",
    clientContactName: "",
    clientContactPhone: "",
    clientContactEmail: "",
    pickupAddress: "",
    tipClient: "",
    tipAddress: "",
    entryDate: "", // Store in DD/MM/YYYY format directly
    entryTime: "",
    deliveryDate: "", // Store in DD/MM/YYYY format directly
    deliveryTime: "",
    material: "",
    quantity: "",
    quantityUnit: "Tonnes",
    siteLocation: "",
    loadingPoint: "",
    clientRate1: "",
    clientRate1Unit: "Per Tonne",
    clientRate2: "",
    clientRate2Unit: "Hourly",
    clientRate3: "",
    clientRate3Unit: "Per Load",
    subcontractorRate: "",
    subcontractorRateUnit: "Hourly",
    tipperRate: "",
    tipperRateUnit: "Per Load",
    assignedTrucks: [] as string[],
    priority: "Medium",
    notes: "",
  })
  const [truckFilter, setTruckFilter] = useState<"internal" | "subcontractor">("internal")
  const [materialSearchOpen, setMaterialSearchOpen] = useState(false)

  const addTruck = (truckId: string) => {
    if (!selectedTrucks.includes(truckId)) {
      setSelectedTrucks([...selectedTrucks, truckId])
    }
  }

  const removeTruck = (truckId: string) => {
    setSelectedTrucks(selectedTrucks.filter((id) => id !== truckId))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] New job data:", { ...formData, trucks: selectedTrucks })
    setIsNewJobOpen(false)
  }

  const filteredVehicles = mockVehicles.filter((vehicle) => {
    if (truckFilter === "internal") return vehicle.type === "Internal"
    if (truckFilter === "subcontractor") return vehicle.type === "Subcontractor"
    return true
  })

  const handleDateInput = (value: string, field: "entryDate" | "deliveryDate") => {
    // Remove non-numeric and non-slash characters
    let cleaned = value.replace(/[^\d/]/g, "")

    // Auto-insert slashes
    if (cleaned.length >= 2 && !cleaned.includes("/")) {
      cleaned = cleaned.slice(0, 2) + "/" + cleaned.slice(2)
    }
    if (cleaned.length >= 5) {
      const parts = cleaned.split("/")
      if (parts.length === 2) {
        cleaned = parts[0] + "/" + parts[1] + "/" + cleaned.slice(5)
      }
    }

    // Limit to DD/MM/YYYY length
    if (cleaned.length <= 10) {
      setFormData({ ...formData, [field]: cleaned })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Dialog open={isNewJobOpen} onOpenChange={setIsNewJobOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal-700 hover:bg-teal-800">
                <Plus className="h-4 w-4 mr-2" />
                New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="!max-w-[95vw] w-full sm:!max-w-[95vw] md:!max-w-[1800px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Job</DialogTitle>
                <DialogDescription>Fill in the details to create a new job assignment</DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Client Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Client Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="client">Client</Label>
                          <Select
                            value={formData.client}
                            onValueChange={(value) => {
                              const selectedClient = mockClients.find((c) => c.id === value)
                              setFormData({
                                ...formData,
                                client: value,
                                clientContactName: selectedClient?.contactName || "",
                                clientContactPhone: selectedClient?.phone || "",
                                clientContactEmail: selectedClient?.email || "",
                              })
                            }}
                          >
                            <SelectTrigger id="client">
                              <SelectValue placeholder="Select client" />
                            </SelectTrigger>
                            <SelectContent>
                              {mockClients.map((client) => (
                                <SelectItem key={client.id} value={client.id}>
                                  {client.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="clientPO">Client PO #</Label>
                          <Input
                            id="clientPO"
                            placeholder="Enter client PO number"
                            value={formData.clientPO}
                            onChange={(e) => setFormData({ ...formData, clientPO: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Client Contact</Label>
                        {formData.client ? (
                          <div className="grid grid-cols-3 gap-2">
                            <Input
                              placeholder="Contact name"
                              value={formData.clientContactName || ""}
                              onChange={(e) => setFormData({ ...formData, clientContactName: e.target.value })}
                            />
                            <Input
                              placeholder="Phone number"
                              value={formData.clientContactPhone || ""}
                              onChange={(e) => setFormData({ ...formData, clientContactPhone: e.target.value })}
                            />
                            <Input
                              placeholder="Email address"
                              type="email"
                              value={formData.clientContactEmail || ""}
                              onChange={(e) => setFormData({ ...formData, clientContactEmail: e.target.value })}
                            />
                          </div>
                        ) : (
                          <div className="border rounded-lg p-3 bg-muted/20 text-muted-foreground text-sm">
                            Select a client to add contact
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pickupAddress">Pickup Address</Label>
                        <Input
                          id="pickupAddress"
                          placeholder="Enter pickup address"
                          value={formData.pickupAddress}
                          onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tipClient">Tip Client</Label>
                        <Select
                          value={formData.tipClient}
                          onValueChange={(value) => setFormData({ ...formData, tipClient: value })}
                        >
                          <SelectTrigger id="tipClient">
                            <SelectValue placeholder="Select tip client" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockTippers.map((tipper) => (
                              <SelectItem key={tipper.id} value={tipper.id}>
                                {tipper.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tipAddress">Tip Address</Label>
                        <Input
                          id="tipAddress"
                          placeholder="Enter tip address"
                          value={formData.tipAddress}
                          onChange={(e) => setFormData({ ...formData, tipAddress: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Schedule</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="entryDate">Entry Date</Label>
                          <Input
                            id="entryDate"
                            type="text"
                            placeholder="DD/MM/YYYY"
                            value={formData.entryDate}
                            onChange={(e) => handleDateInput(e.target.value, "entryDate")}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="entryTime">Entry Time</Label>
                          <Input
                            id="entryTime"
                            type="time"
                            value={formData.entryTime}
                            onChange={(e) => setFormData({ ...formData, entryTime: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="deliveryDate">Delivery Date</Label>
                          <Input
                            id="deliveryDate"
                            type="text"
                            placeholder="DD/MM/YYYY"
                            value={formData.deliveryDate}
                            onChange={(e) => handleDateInput(e.target.value, "deliveryDate")}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="deliveryTime">Delivery Time</Label>
                          <Input
                            id="deliveryTime"
                            type="time"
                            value={formData.deliveryTime}
                            onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Material */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Material</h3>
                      <div className="space-y-2">
                        <Label htmlFor="material">Material</Label>
                        <Popover open={materialSearchOpen} onOpenChange={setMaterialSearchOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={materialSearchOpen}
                              className="w-full justify-between bg-transparent font-normal"
                            >
                              {formData.material
                                ? mockMaterials.find((m) => m.id === formData.material)?.name
                                : "Search and select material..."}
                              <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[400px] p-0" align="start">
                            <Command>
                              <CommandInput placeholder="Type to search materials..." />
                              <CommandList>
                                <CommandEmpty>No material found.</CommandEmpty>
                                <CommandGroup>
                                  {mockMaterials.map((material) => (
                                    <CommandItem
                                      key={material.id}
                                      value={material.name}
                                      onSelect={() => {
                                        setFormData({ ...formData, material: material.id })
                                        setMaterialSearchOpen(false)
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          formData.material === material.id ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      <div className="flex flex-col">
                                        <span>{material.name}</span>
                                        <span className="text-xs text-muted-foreground">{material.unit}</span>
                                      </div>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="quantity">Quantity</Label>
                          <Input
                            id="quantity"
                            type="number"
                            placeholder="Enter quantity"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="quantityUnit">Unit</Label>
                          <Select
                            value={formData.quantityUnit}
                            onValueChange={(value) => setFormData({ ...formData, quantityUnit: value })}
                          >
                            <SelectTrigger id="quantityUnit">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Tonnes">Tonnes</SelectItem>
                              <SelectItem value="Loads">Loads</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Rates */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Rates</h3>
                      
                      {/* Client Rates - 3 rows */}
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Client Rates</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="clientRate1" className="text-xs text-muted-foreground">Rate 1</Label>
                            <Input
                              id="clientRate1"
                              type="number"
                              placeholder="$0.00"
                              value={formData.clientRate1}
                              onChange={(e) => setFormData({ ...formData, clientRate1: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="clientRate1Unit" className="text-xs text-muted-foreground">Unit</Label>
                            <Select
                              value={formData.clientRate1Unit}
                              onValueChange={(value) => setFormData({ ...formData, clientRate1Unit: value })}
                            >
                              <SelectTrigger id="clientRate1Unit">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Hourly">Hourly</SelectItem>
                                <SelectItem value="Per Tonne">Per Tonne</SelectItem>
                                <SelectItem value="Per Load">Per Load</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="clientRate2" className="text-xs text-muted-foreground">Rate 2</Label>
                            <Input
                              id="clientRate2"
                              type="number"
                              placeholder="$0.00"
                              value={formData.clientRate2}
                              onChange={(e) => setFormData({ ...formData, clientRate2: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="clientRate2Unit" className="text-xs text-muted-foreground">Unit</Label>
                            <Select
                              value={formData.clientRate2Unit}
                              onValueChange={(value) => setFormData({ ...formData, clientRate2Unit: value })}
                            >
                              <SelectTrigger id="clientRate2Unit">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Hourly">Hourly</SelectItem>
                                <SelectItem value="Per Tonne">Per Tonne</SelectItem>
                                <SelectItem value="Per Load">Per Load</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="clientRate3" className="text-xs text-muted-foreground">Rate 3</Label>
                            <Input
                              id="clientRate3"
                              type="number"
                              placeholder="$0.00"
                              value={formData.clientRate3}
                              onChange={(e) => setFormData({ ...formData, clientRate3: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="clientRate3Unit" className="text-xs text-muted-foreground">Unit</Label>
                            <Select
                              value={formData.clientRate3Unit}
                              onValueChange={(value) => setFormData({ ...formData, clientRate3Unit: value })}
                            >
                              <SelectTrigger id="clientRate3Unit">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Hourly">Hourly</SelectItem>
                                <SelectItem value="Per Tonne">Per Tonne</SelectItem>
                                <SelectItem value="Per Load">Per Load</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="subcontractorRate">Subcontractor Rate</Label>
                          <Input
                            id="subcontractorRate"
                            type="number"
                            placeholder="$0.00"
                            value={formData.subcontractorRate}
                            onChange={(e) => setFormData({ ...formData, subcontractorRate: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subcontractorRateUnit">Unit</Label>
                          <Select
                            value={formData.subcontractorRateUnit}
                            onValueChange={(value) => setFormData({ ...formData, subcontractorRateUnit: value })}
                          >
                            <SelectTrigger id="subcontractorRateUnit">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Hourly">Hourly</SelectItem>
                              <SelectItem value="Per Tonne">Per Tonne</SelectItem>
                              <SelectItem value="Per Load">Per Load</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="tipperRate">Tip Rate</Label>
                          <Input
                            id="tipperRate"
                            type="number"
                            placeholder="$0.00"
                            value={formData.tipperRate}
                            onChange={(e) => setFormData({ ...formData, tipperRate: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tipperRateUnit">Unit</Label>
                          <Select
                            value={formData.tipperRateUnit}
                            onValueChange={(value) => setFormData({ ...formData, tipperRateUnit: value })}
                          >
                            <SelectTrigger id="tipperRateUnit">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Hourly">Hourly</SelectItem>
                              <SelectItem value="Per Tonne">Per Tonne</SelectItem>
                              <SelectItem value="Per Load">Per Load</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Truck Assignment */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Truck Assignment</h3>

                    <div className="flex gap-2 border-b border-border pb-3">
                      <Button
                        type="button"
                        variant={truckFilter === "internal" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTruckFilter("internal")}
                      >
                        Internal
                      </Button>
                      <Button
                        type="button"
                        variant={truckFilter === "subcontractor" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTruckFilter("subcontractor")}
                      >
                        Subcontractor
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4 space-y-4 max-h-[600px] overflow-y-auto">
                      <div className="space-y-2">
                        <Label>Available Vehicles</Label>
                        <div className="grid gap-2">
                          {filteredVehicles.map((vehicle) => (
                            <Card
                              key={vehicle.id}
                              className={`cursor-pointer transition-all ${
                                selectedTrucks.includes(vehicle.id)
                                  ? "border-primary bg-primary/5"
                                  : "hover:border-primary/50"
                              }`}
                              onClick={() =>
                                selectedTrucks.includes(vehicle.id) ? removeTruck(vehicle.id) : addTruck(vehicle.id)
                              }
                            >
                              <CardContent className="p-3">
                                <div className="space-y-3">
                                  {/* Vehicle Info */}
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <div className="font-semibold font-mono">{vehicle.registration}</div>
                                      <div className="text-sm text-muted-foreground">
                                        {vehicle.make} {vehicle.model}
                                      </div>
                                      <div className="flex items-center gap-2 mt-1">
                                        <Badge
                                          variant={vehicle.type === "Internal" ? "default" : "secondary"}
                                          className="text-xs"
                                        >
                                          {vehicle.type}
                                        </Badge>
                                        {vehicle.type === "Subcontractor" && vehicle.company && (
                                          <span className="text-xs text-muted-foreground">{vehicle.company}</span>
                                        )}
                                      </div>
                                    </div>
                                    {selectedTrucks.includes(vehicle.id) && <Badge variant="default">Selected</Badge>}
                                  </div>

                                  {/* Driver Info */}
                                  {vehicle.driver && (
                                    <div className="border-t pt-2 space-y-2">
                                      <div className="text-xs font-medium text-muted-foreground">Driver Details</div>
                                      <div className="space-y-1">
                                        <div className="flex items-center gap-1.5">
                                          <User className="h-3 w-3 text-muted-foreground" />
                                          <span className="text-sm font-medium">{vehicle.driver.name}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                          <Phone className="h-3 w-3 text-muted-foreground" />
                                          <span className="text-xs text-muted-foreground">{vehicle.driver.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                          <FileText className="h-3 w-3 text-muted-foreground" />
                                          <span className="text-xs text-muted-foreground">
                                            {vehicle.driver.licenseClass} License (Exp: {vehicle.driver.licenseExpiry})
                                          </span>
                                        </div>
                                      </div>

                                      {/* License & Compliance */}
                                      <div className="space-y-1">
                                        <div className="text-xs font-medium text-muted-foreground">
                                          License & Compliance
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                          <Badge
                                            variant={
                                              vehicle.driver.njaInduction === "Valid" ? "default" : "destructive"
                                            }
                                            className="text-xs"
                                          >
                                            NJA Induction: {vehicle.driver.njaInduction}
                                          </Badge>
                                          <Badge
                                            variant={
                                              vehicle.driver.whiteCard === "Valid"
                                                ? "default"
                                                : vehicle.driver.whiteCard === "Expiring Soon"
                                                  ? "secondary"
                                                  : "destructive"
                                            }
                                            className="text-xs"
                                          >
                                            White Card: {vehicle.driver.whiteCard}
                                          </Badge>
                                          <Badge variant="outline" className="text-xs">
                                            VOC: {vehicle.driver.vocScore}%
                                          </Badge>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>

                      {selectedTrucks.length > 0 && (
                        <div className="space-y-2">
                          <Label>Selected Trucks ({selectedTrucks.length})</Label>
                          <div className="flex flex-wrap gap-2">
                            {selectedTrucks.map((truckId) => {
                              const vehicle = mockVehicles.find((v) => v.id === truckId)
                              return (
                                <Badge key={truckId} variant="default" className="px-3 py-1">
                                  {vehicle?.registration}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      removeTruck(truckId)
                                    }}
                                    className="ml-2 hover:text-destructive"
                                  >
                                    ×
                                  </button>
                                </Badge>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Additional Information</h3>
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                          value={formData.priority}
                          onValueChange={(value) => setFormData({ ...formData, priority: value })}
                        >
                          <SelectTrigger id="priority">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                          id="notes"
                          placeholder="Add any additional notes or special instructions"
                          rows={4}
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsNewJobOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Job</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+12 from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">Currently in progress</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Jobs</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Awaiting assignment</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <Badge variant="default" className="text-xs">
              Today
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Ready for invoicing</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
