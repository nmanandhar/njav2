"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"

interface POTemplateEditorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function POTemplateEditor({ open, onOpenChange }: POTemplateEditorProps) {
  const [template, setTemplate] = useState({
    // Company Details
    companyName: "ABC Construction Ltd",
    addressLine1: "123 Business Street",
    addressLine2: "Sydney NSW 2000",
    phone: "+61 2 9876 5432",
    email: "accounts@abcconstruction.com.au",
    website: "www.abcconstruction.com.au",
    abn: "12 345 678 901",

    // PO Header Fields
    poNumberPrefix: "CLT",
    orderedByDefault: "Site Manager",

    // Vendor Details
    vendorName: "N J ASHTON PTY LTD",
    vendorAddress: "MARULAN NSW 2579",
    vendorCountry: "AUSTRALIA",

    // Pickup and Delivery Address Templates
    defaultPickupName: "Main Depot",
    defaultPickupAddress1: "123 Warehouse Road",
    defaultPickupAddress2: "Sydney NSW 2000",
    defaultDeliveryName: "Site Office",
    defaultDeliveryAddress1: "456 Construction Site",
    defaultDeliveryAddress2: "Sydney NSW 2000",

    // Order Information Defaults
    defaultTruckType: "10 Wheeler",
    defaultQuarryCode: "SMIX1",
    defaultUOM: "T",
    defaultDirect: "DIRECT",

    // Default Settings
    defaultDisclaimer:
      "This Purchase Order is subject to our standard terms and conditions. Payment terms are Net 30 days from date of invoice.",
    defaultInstructions: "Please ensure all safety requirements are met and contact site manager upon arrival.",

    // Tax Settings
    gstRate: "10",
  })

  const handleSave = () => {
    // Save template logic here
    console.log("[v0] Saving PO template:", template)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[95vw] h-[95vh] max-w-none max-h-none overflow-hidden flex flex-col p-6"
        style={{ width: "95vw", maxWidth: "none" }}
      >
        <div className="flex items-start justify-between mb-4">
          <DialogHeader>
            <DialogTitle>Purchase Order Template Settings</DialogTitle>
            <DialogDescription>
              Customize your purchase order template with your company details and default settings
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Template</Button>
          </DialogFooter>
        </div>

        <Tabs defaultValue="company" className="mt-4 flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="company">Company Details</TabsTrigger>
            <TabsTrigger value="poheader">PO Header</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="defaults">Settings</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto mt-4 pr-2">
            <TabsContent value="company" className="space-y-4 mt-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={template.companyName}
                    onChange={(e) => setTemplate({ ...template, companyName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="abn">ABN</Label>
                  <Input
                    id="abn"
                    value={template.abn}
                    onChange={(e) => setTemplate({ ...template, abn: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input
                  id="addressLine1"
                  value={template.addressLine1}
                  onChange={(e) => setTemplate({ ...template, addressLine1: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input
                  id="addressLine2"
                  value={template.addressLine2}
                  onChange={(e) => setTemplate({ ...template, addressLine2: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={template.phone}
                    onChange={(e) => setTemplate({ ...template, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={template.email}
                    onChange={(e) => setTemplate({ ...template, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={template.website}
                  onChange={(e) => setTemplate({ ...template, website: e.target.value })}
                />
              </div>
            </TabsContent>

            <TabsContent value="poheader" className="space-y-4 mt-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="poNumberPrefix">PO Number Prefix</Label>
                  <Input
                    id="poNumberPrefix"
                    value={template.poNumberPrefix}
                    onChange={(e) => setTemplate({ ...template, poNumberPrefix: e.target.value })}
                    placeholder="e.g., CLT"
                  />
                  <p className="text-xs text-muted-foreground">Will generate PO numbers like CLT-001, CLT-002</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orderedByDefault">Default Ordered By</Label>
                  <Input
                    id="orderedByDefault"
                    value={template.orderedByDefault}
                    onChange={(e) => setTemplate({ ...template, orderedByDefault: e.target.value })}
                    placeholder="Default contact person"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="addresses" className="space-y-6 mt-0">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Default Pickup Address</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultPickupName">Location Name</Label>
                    <Input
                      id="defaultPickupName"
                      value={template.defaultPickupName}
                      onChange={(e) => setTemplate({ ...template, defaultPickupName: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultPickupAddress1">Address Line 1</Label>
                  <Input
                    id="defaultPickupAddress1"
                    value={template.defaultPickupAddress1}
                    onChange={(e) => setTemplate({ ...template, defaultPickupAddress1: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultPickupAddress2">Address Line 2</Label>
                  <Input
                    id="defaultPickupAddress2"
                    value={template.defaultPickupAddress2}
                    onChange={(e) => setTemplate({ ...template, defaultPickupAddress2: e.target.value })}
                  />
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <h3 className="font-semibold text-lg">Default Delivery Address</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultDeliveryName">Location Name</Label>
                    <Input
                      id="defaultDeliveryName"
                      value={template.defaultDeliveryName}
                      onChange={(e) => setTemplate({ ...template, defaultDeliveryName: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultDeliveryAddress1">Address Line 1</Label>
                  <Input
                    id="defaultDeliveryAddress1"
                    value={template.defaultDeliveryAddress1}
                    onChange={(e) => setTemplate({ ...template, defaultDeliveryAddress1: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultDeliveryAddress2">Address Line 2</Label>
                  <Input
                    id="defaultDeliveryAddress2"
                    value={template.defaultDeliveryAddress2}
                    onChange={(e) => setTemplate({ ...template, defaultDeliveryAddress2: e.target.value })}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="defaults" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="gstRate">GST Rate (%)</Label>
                <Input
                  id="gstRate"
                  type="number"
                  value={template.gstRate}
                  onChange={(e) => setTemplate({ ...template, gstRate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultDisclaimer">Default PO Disclaimer</Label>
                <Textarea
                  id="defaultDisclaimer"
                  rows={4}
                  value={template.defaultDisclaimer}
                  onChange={(e) => setTemplate({ ...template, defaultDisclaimer: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultInstructions">Default Instructions</Label>
                <Textarea
                  id="defaultInstructions"
                  rows={4}
                  value={template.defaultInstructions}
                  onChange={(e) => setTemplate({ ...template, defaultInstructions: e.target.value })}
                />
              </div>
            </TabsContent>

            <TabsContent value="preview" className="mt-0">
              <Card className="p-8 bg-white">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="font-bold text-lg">{template.companyName}</div>
                      <div className="text-sm text-muted-foreground">{template.addressLine1}</div>
                      <div className="text-sm text-muted-foreground">{template.addressLine2}</div>
                      <div className="text-sm text-muted-foreground">{template.phone}</div>
                      <div className="text-sm text-muted-foreground">{template.email}</div>
                      <div className="text-sm text-muted-foreground">{template.website}</div>
                      <div className="text-sm text-muted-foreground">ABN: {template.abn}</div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-2xl font-bold">Purchase Order</div>
                      <div className="text-sm">
                        <div>
                          <span className="font-semibold">PO NUMBER:</span> {template.poNumberPrefix}-012
                        </div>
                        <div>
                          <span className="font-semibold">DATE:</span> 22/12/2025
                        </div>
                        <div>
                          <span className="font-semibold">ORDERED BY:</span> {template.orderedByDefault}
                        </div>
                        <div>
                          <span className="font-semibold">EMAIL:</span> {template.email}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vendor Section */}
                  <div className="border-t pt-4">
                    <div className="font-semibold mb-2">VENDOR</div>
                    <div className="text-sm">{template.vendorName}</div>
                    <div className="text-sm">{template.vendorAddress}</div>
                    <div className="text-sm">{template.vendorCountry}</div>
                  </div>

                  {/* Pickup and Delivery Addresses */}
                  <div className="grid grid-cols-2 gap-6 border-t pt-4">
                    <div>
                      <div className="font-semibold mb-2">Pick Up {template.defaultPickupName}</div>
                      <div className="text-sm">{template.defaultPickupAddress1}</div>
                      <div className="text-sm">{template.defaultPickupAddress2}</div>
                    </div>
                    <div>
                      <div className="font-semibold mb-2">Delivery Address {template.defaultDeliveryName}</div>
                      <div className="text-sm">{template.defaultDeliveryAddress1}</div>
                      <div className="text-sm">{template.defaultDeliveryAddress2}</div>
                    </div>
                  </div>

                  {/* Delivery Date/Time */}
                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div>
                      <span className="font-semibold">DELIVERY DATE:</span> [DD/MM/YYYY]
                    </div>
                    <div>
                      <span className="font-semibold">DELIVERY TIME:</span> [HH:MM]
                    </div>
                  </div>

                  {/* Order Information Table */}
                  {/* Removed Order Information Table section */}

                  {/* Totals */}
                  <div className="flex justify-end border-t pt-4">
                    <div className="w-80 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">TOTAL Ex. GST</span>
                        <span>$3,000.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">{template.gstRate}% GST</span>
                        <span>$300.00</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>TOTAL Inc. GST</span>
                        <span>$3,300.00</span>
                      </div>
                    </div>
                  </div>

                  {/* Instructions and Disclaimer */}
                  <div className="border-t pt-4 space-y-3">
                    <div className="text-sm">
                      <span className="font-semibold">Instructions: </span>
                      {template.defaultInstructions}
                    </div>
                    <div className="text-xs text-muted-foreground">{template.defaultDisclaimer}</div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
