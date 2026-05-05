"use client"

import { useState } from "react"
import { AdminTopNav } from "@/components/admin/admin-topnav"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Download, Phone, Mail } from "lucide-react"

const mockContracts = [
  {
    id: "CID-001",
    clientName: "ABC Manufacturing Ltd",
    location: "123 Industrial Drive, Sydney NSW 2000",
    status: "Active",
    dateAdded: "2024-01-15 10:30 AM",
    addedBy: "John Smith",
    files: 3,
    clientPhone: "+61 2 9123 4567",
    clientEmail: "contact@abcmanufacturing.com.au",
    contactPerson: "Jennifer Brown",
    contactPhone: "+61 412 345 678",
    contactEmail: "j.brown@abcmanufacturing.com.au",
  },
  {
    id: "CID-002",
    clientName: "XYZ Logistics Co",
    location: "456 Transport Road, Melbourne VIC 3000",
    status: "Active",
    dateAdded: "2024-02-20 2:15 PM",
    addedBy: "Sarah Johnson",
    files: 2,
    clientPhone: "+61 3 8456 7890",
    clientEmail: "info@xyzlogistics.com.au",
    contactPerson: "Robert Taylor",
    contactPhone: "+61 423 456 789",
    contactEmail: "r.taylor@xyzlogistics.com.au",
  },
  {
    id: "CID-003",
    clientName: "Global Freight Solutions",
    location: "789 Cargo Street, Brisbane QLD 4000",
    status: "Expired",
    dateAdded: "2023-06-10 9:00 AM",
    addedBy: "Michael Chen",
    files: 5,
    clientPhone: "+61 7 3789 0123",
    clientEmail: "admin@globalfreight.com.au",
    contactPerson: "Lisa Anderson",
    contactPhone: "+61 434 567 890",
    contactEmail: "l.anderson@globalfreight.com.au",
  },
  {
    id: "CID-004",
    clientName: "Metro Distribution Services",
    location: "321 Warehouse Lane, Perth WA 6000",
    status: "Active",
    dateAdded: "2024-03-05 11:45 AM",
    addedBy: "Emma Wilson",
    files: 1,
    clientPhone: "+61 8 9234 5678",
    clientEmail: "service@metrodist.com.au",
    contactPerson: "David Martinez",
    contactPhone: "+61 445 678 901",
    contactEmail: "d.martinez@metrodist.com.au",
  },
  {
    id: "CID-005",
    clientName: "Coastal Transport Group",
    location: "654 Port Avenue, Adelaide SA 5000",
    status: "Expired",
    dateAdded: "2023-12-18 3:30 PM",
    addedBy: "David Brown",
    files: 4,
    clientPhone: "+61 8 8345 6789",
    clientEmail: "contact@coastaltransport.com.au",
    contactPerson: "Michelle Lee",
    contactPhone: "+61 456 789 012",
    contactEmail: "m.lee@coastaltransport.com.au",
  },
]

export default function AdminContractsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredContracts = mockContracts.filter((contract) => {
    const matchesSearch =
      contract.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || contract.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-background">
      <AdminTopNav />

      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Contracts</h1>
          <p className="text-muted-foreground">Client contract management</p>
        </div>

        <Card>
          <CardContent className="p-6">
            {/* Search and Filters */}
            <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by Client Name, Location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Filter by:</span>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Active or Expired" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Contracts Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contract ID</TableHead>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Location (Address)</TableHead>
                    <TableHead>Client Contact</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Contract Status</TableHead>
                    <TableHead>Date/Time Added</TableHead>
                    <TableHead>Added by</TableHead>
                    <TableHead>Files</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContracts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center text-muted-foreground">
                        No contracts found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredContracts.map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell className="font-mono text-sm font-medium">{contract.id}</TableCell>
                        <TableCell className="font-medium">{contract.clientName}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{contract.location}</TableCell>
                        <TableCell>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              {contract.clientPhone}
                            </div>
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              {contract.clientEmail}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-sm">
                            <div className="font-medium">{contract.contactPerson}</div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {contract.contactPhone}
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              {contract.contactEmail}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={contract.status === "Active" ? "default" : "secondary"}
                            className={
                              contract.status === "Active"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                            }
                          >
                            {contract.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{contract.dateAdded}</TableCell>
                        <TableCell className="text-sm">{contract.addedBy}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <FileText className="h-4 w-4" />
                            <span>
                              {contract.files} file{contract.files !== 1 ? "s" : ""}
                            </span>
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredContracts.length} of {mockContracts.length} contracts
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
