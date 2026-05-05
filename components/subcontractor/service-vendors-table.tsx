"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, Pencil, MoreVertical, MapPin, Phone, Mail, FileText, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { AddServiceVendorDialog } from "./add-service-vendor-dialog"

// Mock data for service vendors
const vendors = [
  {
    id: "SV-001",
    companyName: "Quick Fix Auto Service",
    complianceDocuments: [
      "Business License.pdf",
      "Insurance Certificate.pdf",
      "Safety Compliance.pdf",
      "Vehicle Inspection License.pdf",
    ],
    locations: [{ address: "123 Main St, Sydney NSW 2000" }, { address: "456 Queen St, Melbourne VIC 3000" }],
    phone: "+61 2 9876 5432",
    email: "service@quickfix.com.au",
    contactPerson: "John Smith",
    contactPhone: "+61 412 345 678",
    contactEmail: "john.smith@quickfix.com.au",
    servicesHistory: 48,
  },
  {
    id: "SV-002",
    companyName: "Premium Fleet Services",
    complianceDocuments: ["Business Registration.pdf", "Liability Insurance.pdf", "Trade Certification.pdf"],
    locations: [{ address: "789 Fleet Rd, Brisbane QLD 4000" }],
    phone: "+61 7 3456 7890",
    email: "contact@premiumfleet.com.au",
    contactPerson: "Sarah Williams",
    contactPhone: "+61 423 456 789",
    contactEmail: "sarah.w@premiumfleet.com.au",
    servicesHistory: 35,
  },
  {
    id: "SV-003",
    companyName: "Express Maintenance Co",
    complianceDocuments: ["ABN Registration.pdf", "WorkCover Insurance.pdf"],
    locations: [
      { address: "321 Service Ave, Perth WA 6000" },
      { address: "654 Workshop St, Adelaide SA 5000" },
      { address: "987 Garage Ln, Hobart TAS 7000" },
    ],
    phone: "+61 8 9123 4567",
    email: "admin@expressmaint.com.au",
    contactPerson: "Michael Chen",
    contactPhone: "+61 434 567 890",
    contactEmail: "m.chen@expressmaint.com.au",
    servicesHistory: 22,
  },
]

export function ServiceVendorsTable() {
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">{vendors.length} service vendors</div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-orange-600 hover:bg-orange-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Service Vendor
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor ID</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Compliance Documents</TableHead>
              <TableHead>Locations</TableHead>
              <TableHead>Vendor Contact</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Service History</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell className="font-medium">{vendor.id}</TableCell>
                <TableCell className="font-medium">{vendor.companyName}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {vendor.complianceDocuments.map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-1 text-sm text-muted-foreground">
                        <FileText className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{doc}</span>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-start gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="space-y-1">
                      {vendor.locations.map((loc, idx) => (
                        <div key={idx} className="text-sm">
                          {loc.address}
                        </div>
                      ))}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      {vendor.phone}
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      {vendor.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-sm">
                    <div className="font-medium">{vendor.contactPerson}</div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {vendor.contactPhone}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {vendor.contactEmail}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium">{vendor.servicesHistory} services</span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit Vendor
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <AddServiceVendorDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  )
}
