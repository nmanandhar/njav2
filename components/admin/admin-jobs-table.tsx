"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertTriangle,
  Wrench,
  User,
  Phone,
  FileText,
  Upload,
  X,
  Info,
  Map,
  MessageSquare,
  Copy,
  Download,
  Image,
  Video,
  Truck,
  File,
  Archive,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Popover, // Imported Popover components
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { JobMessagesModal } from "@/components/admin/job-messages-modal" // Imported JobMessagesModal

// Enhanced mock job data with all scope features
const mockJobs = [
  {
    id: "2024-001",
    jobNumber: "JOB-2024-001",
    clientName: "Sydney Metro Construction",
    clientPO: "PO-2024-MC-1578",
    createdBy: "Sarah Mitchell",
    trucksAllocatedBy: "John Anderson",
    // </CHANGE>
    clientContact: "John Williams",
    clientPhone: "+61 2 9555 0123",
    clientEmail: "john.williams@sydneymetro.com.au",
    pickupAddress: "123 George St, Sydney NSW 2000",
    tipClient: "Coastal Transport Co",
    tipAddress: "78 Beach Road, Wollongong NSW 2500",
    entryDateTime: "2024-01-14 08:00",
    deliveryDateTime: "2024-01-15 08:00",
    rates: [
      { type: "Client", price: 140, unit: "Per Tonne" },
      { type: "Client", price: 85, unit: "Hourly" },
      { type: "Client", price: 320, unit: "Per Load" },
      { type: "Subcontractor", price: 140, unit: "Hourly" },
      { type: "Tip", price: 870, unit: "Per Load" },
    ],
    trucks: [
      { registration: "GHI-789", type: "Internal", status: "active" },
      { registration: "SUB-001", type: "Subcontractor", status: "warning" },
      { registration: "ABC-123", type: "Internal", status: "alert" },
      { registration: "DEF-456", type: "Internal", status: "active" },
      { registration: "SUB-002", type: "Subcontractor", status: "active" },
      { registration: "JKL-890", type: "Internal", status: "warning" },
      { registration: "SUB-003", type: "Subcontractor", status: "alert" },
      { registration: "MNO-234", type: "Internal", status: "active" },
      { registration: "SUB-004", type: "Subcontractor", status: "warning" },
      { registration: "PQR-567", type: "Internal", status: "active" },
    ],
    drivers: [
      { name: "John Smith", type: "Internal", truck: "GHI-789", phone: "0412 345 678", status: "accepted" },
      { name: "Tom Brown", type: "Subcontractor", truck: "SUB-001", phone: "0423 456 789", status: "pending" },
      { name: "Sarah Johnson", type: "Internal", truck: "ABC-123", phone: "0434 567 890", status: "accepted" },
      { name: "David Lee", type: "Internal", truck: "DEF-456", phone: "0445 678 901", status: "pending" },
      { name: "Michael Chen", type: "Subcontractor", truck: "SUB-002", phone: "0456 789 012", status: "accepted" },
      { name: "Emma Wilson", type: "Internal", truck: "JKL-890", phone: "0467 890 123", status: "pending" },
      { name: "James Parker", type: "Subcontractor", truck: "SUB-003", phone: "0478 901 234", status: "rejected" },
      { name: "Lisa Anderson", type: "Internal", truck: "MNO-234", phone: "0489 012 345", status: "accepted" },
      { name: "Robert Taylor", type: "Subcontractor", truck: "SUB-004", phone: "0490 123 456", status: "pending" },
      { name: "Jennifer White", type: "Internal", truck: "PQR-567", phone: "0401 234 567", status: "accepted" },
    ],
    location: "123 Construction Ave, Sydney NSW",
    material: "Concrete Mix - 20m³",
    truckAllocation: "FL-001",
    stagePoint: "Depot A - Parramatta",
    dropSite: "Site Alpha - Construction Zone",
    tipSite: "Tip Point 1 - Blacktown",
    status: "New",
    priority: "High",
    createdAt: "2024-01-15",
    scheduledDate: "2024-01-15",
    photos: 3,
    dockets: 2,
    invoiceNumber: null,
    preStartChecklist: "Completed",
    estimatedDuration: "4 hours",
    actualDuration: "2.5 hours",
    notes: "Customer requested early delivery",
    tollOneWay: 12.5,
    tollReturn: 25.0,
    tollMetadata: {
      oneWay: {
        route: "M7 Motorway",
        apiProvider: "TfNSW",
        timestamp: "2024-01-15T08:00:00Z",
      },
      return: {
        route: "M7 Motorway",
        apiProvider: "TfNSW",
        timestamp: "2024-01-15T08:00:00Z",
      },
    },
    // </CHANGE>
    pickupLatitude: -33.8688,
    pickupLongitude: 151.2093,
    tipLatitude: -34.4278,
    tipLongitude: 150.8931,
    // </CHANGE>
  },
  {
    id: "2024-002",
    jobNumber: "JOB-2024-002",
    clientName: "BuildCorp Pty Ltd",
    clientPO: "PO-2024-BC-2341",
    createdBy: "James Thompson",
    trucksAllocatedBy: "Emily Roberts",
    // </CHANGE>
    clientContact: "Emma Thompson",
    clientPhone: "+61 2 9666 0456",
    clientEmail: "emma.t@buildcorp.com.au",
    pickupAddress: "456 Park Avenue, Parramatta NSW 2150",
    tipClient: "Metro Materials",
    tipAddress: "12 Industrial Drive, Blacktown NSW 2148",
    entryDateTime: "2024-01-13 10:00",
    deliveryDateTime: "2024-01-14 10:00",
    rates: [
      { type: "Client", price: 130, unit: "Per Tonne" },
      { type: "Subcontractor", price: 135, unit: "Hourly" },
      { type: "Tip", price: 850, unit: "Per Load" },
    ],
    trucks: [
      { registration: "DEF-456", type: "Internal", status: "active" },
      { registration: "SUB-002", type: "Subcontractor", status: "warning" },
    ],
    drivers: [
      { name: "Sarah Johnson", type: "Internal", truck: "DEF-456", phone: "0423 456 789", status: "accepted" },
      { name: "David Lee", type: "Subcontractor", truck: "SUB-002", phone: "0434 567 890", status: "pending" },
    ],
    location: "456 Industrial Rd, Melbourne VIC",
    material: "Gravel - 15m³",
    truckAllocation: "FL-003",
    stagePoint: "Depot B - Dandenong",
    dropSite: "Site Beta - Industrial Park",
    tipSite: "Tip Point 2 - Clayton",
    status: "Completed",
    priority: "Normal",
    createdAt: "2024-01-14",
    scheduledDate: "2024-01-14",
    photos: 5,
    dockets: 1,
    invoiceNumber: "INV-2024-0015",
    preStartChecklist: "Completed",
    estimatedDuration: "3 hours",
    actualDuration: "3.2 hours",
    notes: "Job completed successfully",
    tollOneWay: 8.75,
    tollReturn: 17.5,
    tollMetadata: {
      oneWay: {
        route: "CityLink",
        apiProvider: "TfNSW",
        timestamp: "2024-01-14T10:00:00Z",
      },
      return: {
        route: "CityLink",
        apiProvider: "TfNSW",
        timestamp: "2024-01-14T10:00:00Z",
      },
    },
    // </CHANGE>
    pickupLatitude: -33.8151,
    pickupLongitude: 151.0017,
    tipLatitude: -33.7687,
    tipLongitude: 150.9059,
    // </CHANGE>
  },
  {
    id: "2024-003",
    jobNumber: "JOB-2024-003",
    clientName: "Urban Developments",
    clientPO: "PO-2024-UD-9876",
    createdBy: "Emma Rodriguez",
    trucksAllocatedBy: "Michael Chen",
    // </CHANGE>
    clientContact: "Robert Davis",
    clientPhone: "+61 2 9777 0789",
    clientEmail: "r.davis@abcconstruction.com",
    pickupAddress: "789 Warehouse Rd, Sydney NSW 2000",
    tipClient: "Sand Transport Co",
    tipAddress: "321 Delivery Ln, Parramatta NSW 2150",
    entryDateTime: "2024-01-15 14:00",
    deliveryDateTime: "2024-01-16 14:00",
    rates: [
      { type: "Client", price: 150, unit: "Per Tonne" },
      { type: "Subcontractor", price: 160, unit: "Hourly" },
      { type: "Tip", price: 900, unit: "Per Load" },
    ],
    trucks: [{ registration: "GHI-002", type: "Internal", status: "alert" }],
    drivers: [{ name: "Mike Wilson", type: "Internal", truck: "GHI-002", phone: "0445 678 901", status: "accepted" }],
    location: "789 Development St, Brisbane QLD",
    material: "Sand - 25m³",
    truckAllocation: "FL-002",
    stagePoint: "Depot A - Parramatta",
    dropSite: "Site Gamma - Residential",
    tipSite: "Tip Point 1 - Blacktown",
    status: "In Progress",
    priority: "Normal",
    createdAt: "2024-01-16",
    scheduledDate: "2024-01-17",
    photos: 0,
    dockets: 0,
    invoiceNumber: null,
    preStartChecklist: "Pending",
    estimatedDuration: "5 hours",
    actualDuration: null,
    notes: "Awaiting driver assignment",
    tollOneWay: 15.0,
    tollReturn: 30.0,
    tollMetadata: {
      oneWay: {
        route: "Gateway Motorway",
        apiProvider: "TfNSW",
        timestamp: "2024-01-16T14:00:00Z",
      },
      return: {
        route: "Gateway Motorway",
        apiProvider: "TfNSW",
        timestamp: "2024-01-16T14:00:00Z",
      },
    },
    // </CHANGE>
    pickupLatitude: -33.8765,
    pickupLongitude: 151.2112,
    tipLatitude: -33.8089,
    tipLongitude: 151.0045,
    // </CHANGE>
  },
  {
    id: "2024-004",
    jobNumber: "JOB-2024-004",
    clientName: "Infrastructure Co",
    clientPO: "PO-2024-IC-5432",
    createdBy: "Michael O'Brien",
    trucksAllocatedBy: "Sarah Mitchell",
    // </CHANGE>
    clientContact: "Michael O'Brien",
    clientPhone: "+61 8 9123 4567",
    clientEmail: "michael.obrien@infraco.com.au",
    pickupAddress: "321 Highway Rd, Perth WA",
    tipClient: "Rock Transport Co",
    tipAddress: "21 Quarry St, Mandurah WA 6210",
    entryDateTime: "2024-01-12 09:00",
    deliveryDateTime: "2024-01-13 09:00",
    rates: [
      { type: "Client", price: 135, unit: "Per Tonne" },
      { type: "Subcontractor", price: 145, unit: "Hourly" },
      { type: "Tip", price: 880, unit: "Per Load" },
    ],
    trucks: [
      { registration: "JKL-890", type: "Internal", status: "warning" },
      { registration: "MNO-345", type: "Internal", status: "success" },
      { registration: "PQR-678", type: "Subcontractor", status: "success" },
      { registration: "STU-901", type: "Internal", status: "success" },
      { registration: "VWX-234", type: "Subcontractor", status: "warning" },
      { registration: "YZA-567", type: "Internal", status: "success" },
    ],
    drivers: [
      { name: "Emma Davis", type: "Internal", truck: "JKL-890", phone: "0456 789 012", status: "accepted" },
      { name: "Oliver Brown", type: "Internal", truck: "MNO-345", phone: "0467 890 123", status: "accepted" },
      { name: "Sophie White", type: "Subcontractor", truck: "PQR-678", phone: "0478 901 234", status: "accepted" },
      { name: "Jack Martin", type: "Internal", truck: "STU-901", phone: "0489 012 345", status: "accepted" },
      { name: "Isabella Garcia", type: "Subcontractor", truck: "VWX-234", phone: "0490 123 456", status: "pending" },
      { name: "Liam Thompson", type: "Internal", truck: "YZA-567", phone: "0401 234 567", status: "accepted" },
    ],
    location: "321 Highway Rd, Perth WA",
    material: "Crushed Rock - 30m³",
    truckAllocation: "FL-005",
    stagePoint: "Depot C - Fremantle",
    dropSite: "Site Delta - Highway Project",
    tipSite: "Tip Point 3 - Rockingham",
    status: "In Progress",
    priority: "High",
    createdAt: "2024-01-13",
    scheduledDate: "2024-01-13",
    photos: 2,
    dockets: 1,
    invoiceNumber: null,
    preStartChecklist: "Completed",
    estimatedDuration: "6 hours",
    actualDuration: "1 hour",
    notes: "Truck breakdown - maintenance required",
    tollOneWay: 10.0,
    tollReturn: 20.0,
    tollMetadata: {
      oneWay: {
        route: "Mitchell Freeway",
        apiProvider: "TfNSW",
        timestamp: "2024-01-13T09:00:00Z",
      },
      return: {
        route: "Mitchell Freeway",
        apiProvider: "TfNSW",
        timestamp: "2024-01-13T09:00:00Z",
      },
    },
    // </CHANGE>
  },
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
  // Added mock vehicles for remaining trucks
  {
    id: "FL-004",
    registration: "MNO-234",
    make: "MAN",
    model: "TGX",
    type: "Internal" as const,
    company: null,
    status: "Available",
    driver: {
      name: "Lisa Anderson",
      phone: "+61 489 012 345",
      licenseClass: "HC",
      licenseExpiry: "2026-05-10",
      njaInduction: "Valid",
      whiteCard: "Valid",
      vocScore: 89,
    },
  },
  {
    id: "FL-005",
    registration: "PQR-567",
    make: "Scania",
    model: "G410",
    type: "Internal" as const,
    company: null,
    status: "Available",
    driver: {
      name: "Jennifer White",
      phone: "+61 401 234 567",
      licenseClass: "HC",
      licenseExpiry: "2027-01-15",
      njaInduction: "Valid",
      whiteCard: "Valid",
      vocScore: 92,
    },
  },
  {
    id: "SUB-005", // Assuming a new ID for the 5th subcontractor truck
    registration: "SUB-005", // This registration needs to match a truck in mockJobs if it's a real assignment
    make: "Volvo",
    model: "FH16",
    type: "Subcontractor" as const,
    company: "Global Logistics Pty Ltd",
    status: "Available",
    driver: {
      name: "Mark Johnson",
      phone: "+61 455 667 788",
      licenseClass: "MC",
      licenseExpiry: "2025-08-22",
      njaInduction: "Valid",
      whiteCard: "Valid",
      vocScore: 85,
    },
  },
  // Added mock vehicles for the new trucks in JOB-2024-004
  {
    id: "FL-006",
    registration: "MNO-345",
    make: "MAN",
    model: "TGX",
    type: "Internal" as const,
    company: null,
    status: "Available",
    driver: {
      name: "Oliver Brown",
      phone: "+61 467 890 123",
      licenseClass: "HC",
      licenseExpiry: "2026-05-10",
      njaInduction: "Valid",
      whiteCard: "Valid",
      vocScore: 89,
    },
  },
  {
    id: "SUB-006",
    registration: "PQR-678",
    make: "Scania",
    model: "G410",
    type: "Subcontractor" as const,
    company: "Sydney Freight Services",
    status: "Available",
    driver: {
      name: "Sophie White",
      phone: "+61 478 901 234",
      licenseClass: "HC",
      licenseExpiry: "2027-01-15",
      njaInduction: "Valid",
      whiteCard: "Valid",
      vocScore: 92,
    },
  },
  {
    id: "FL-007",
    registration: "STU-901",
    make: "Isuzu",
    model: "FTR",
    type: "Internal" as const,
    company: null,
    status: "Available",
    driver: {
      name: "Jack Martin",
      phone: "+61 489 012 345",
      licenseClass: "HC",
      licenseExpiry: "2026-07-01",
      njaInduction: "Valid",
      whiteCard: "Valid",
      vocScore: 90,
    },
  },
  {
    id: "SUB-007",
    registration: "VWX-234",
    make: "Volvo",
    model: "FM",
    type: "Subcontractor" as const,
    company: "Coastal Haulage Pty Ltd",
    status: "Available",
    driver: {
      name: "Isabella Garcia",
      phone: "+61 490 123 456",
      licenseClass: "HC",
      licenseExpiry: "2025-11-30",
      njaInduction: "Valid",
      whiteCard: "Expiring Soon",
      vocScore: 87,
    },
  },
  {
    id: "FL-008",
    registration: "YZA-567",
    make: "Mercedes",
    model: "Actros",
    type: "Internal" as const,
    company: null,
    status: "Available",
    driver: {
      name: "Liam Thompson",
      phone: "+61 401 234 567",
      licenseClass: "HC",
      licenseExpiry: "2027-08-25",
      njaInduction: "Valid",
      whiteCard: "Valid",
      vocScore: 91,
    },
  },
]

// Mock truck documents data - documents submitted by drivers via Mobile App
const mockTruckDocuments: Record<string, Record<string, Array<{
  id: string
  name: string
  type: "docket" | "image" | "video" | "document"
  fileName: string
  size: string
  uploadedAt: string
  uploadedBy: string
  previewUrl: string
}>>> = {
  "2024-001": {
    "GHI-789": [
      { id: "doc-001", name: "Delivery Docket #1", type: "docket", fileName: "docket-001.pdf", size: "245 KB", uploadedAt: "2024-01-15 08:30", uploadedBy: "John Smith", previewUrl: "/placeholder.svg?height=600&width=400" },
      { id: "doc-002", name: "Load Photo - Front", type: "image", fileName: "load-front.jpg", size: "1.2 MB", uploadedAt: "2024-01-15 08:35", uploadedBy: "John Smith", previewUrl: "/placeholder.svg?height=600&width=800" },
      { id: "doc-003", name: "Load Photo - Side", type: "image", fileName: "load-side.jpg", size: "980 KB", uploadedAt: "2024-01-15 08:36", uploadedBy: "John Smith", previewUrl: "/placeholder.svg?height=600&width=800" },
      { id: "doc-004", name: "Site Entry Video", type: "video", fileName: "site-entry.mp4", size: "15.3 MB", uploadedAt: "2024-01-15 09:00", uploadedBy: "John Smith", previewUrl: "/placeholder.svg?height=400&width=600" },
    ],
    "SUB-001": [
      { id: "doc-005", name: "Weighbridge Ticket", type: "docket", fileName: "weighbridge-001.pdf", size: "156 KB", uploadedAt: "2024-01-15 09:15", uploadedBy: "Tom Brown", previewUrl: "/placeholder.svg?height=600&width=400" },
      { id: "doc-006", name: "Unloading Photo", type: "image", fileName: "unload-001.jpg", size: "1.5 MB", uploadedAt: "2024-01-15 10:00", uploadedBy: "Tom Brown", previewUrl: "/placeholder.svg?height=600&width=800" },
    ],
    "ABC-123": [
      { id: "doc-007", name: "Delivery Docket #2", type: "docket", fileName: "docket-002.pdf", size: "198 KB", uploadedAt: "2024-01-15 11:00", uploadedBy: "Sarah Johnson", previewUrl: "/placeholder.svg?height=600&width=400" },
      { id: "doc-008", name: "POD Signature", type: "image", fileName: "pod-signature.jpg", size: "450 KB", uploadedAt: "2024-01-15 11:30", uploadedBy: "Sarah Johnson", previewUrl: "/placeholder.svg?height=600&width=800" },
      { id: "doc-009", name: "Tip Site Photo", type: "image", fileName: "tip-site.jpg", size: "1.1 MB", uploadedAt: "2024-01-15 12:00", uploadedBy: "Sarah Johnson", previewUrl: "/placeholder.svg?height=600&width=800" },
    ],
    "DEF-456": [],
    "SUB-002": [
      { id: "doc-010", name: "Delivery Receipt", type: "document", fileName: "receipt-001.pdf", size: "89 KB", uploadedAt: "2024-01-15 13:00", uploadedBy: "Michael Chen", previewUrl: "/placeholder.svg?height=600&width=400" },
    ],
    "JKL-890": [],
    "SUB-003": [],
    "MNO-234": [
      { id: "doc-011", name: "Load Manifest", type: "docket", fileName: "manifest-001.pdf", size: "312 KB", uploadedAt: "2024-01-15 14:00", uploadedBy: "Lisa Anderson", previewUrl: "/placeholder.svg?height=600&width=400" },
      { id: "doc-012", name: "Vehicle Inspection", type: "image", fileName: "inspection.jpg", size: "890 KB", uploadedAt: "2024-01-15 07:00", uploadedBy: "Lisa Anderson", previewUrl: "/placeholder.svg?height=600&width=800" },
    ],
    "SUB-004": [],
    "PQR-567": [
      { id: "doc-013", name: "Final Docket", type: "docket", fileName: "final-docket.pdf", size: "267 KB", uploadedAt: "2024-01-15 15:30", uploadedBy: "Jennifer White", previewUrl: "/placeholder.svg?height=600&width=400" },
      { id: "doc-014", name: "Completion Photo", type: "image", fileName: "completion.jpg", size: "1.3 MB", uploadedAt: "2024-01-15 15:45", uploadedBy: "Jennifer White", previewUrl: "/placeholder.svg?height=600&width=800" },
      { id: "doc-015", name: "Site Exit Video", type: "video", fileName: "site-exit.mp4", size: "22.1 MB", uploadedAt: "2024-01-15 16:00", uploadedBy: "Jennifer White", previewUrl: "/placeholder.svg?height=400&width=600" },
    ],
  },
  "2024-002": {
    "DEF-456": [
      { id: "doc-016", name: "Delivery Docket", type: "docket", fileName: "docket-003.pdf", size: "234 KB", uploadedAt: "2024-01-14 10:30", uploadedBy: "Sarah Johnson", previewUrl: "/placeholder.svg?height=600&width=400" },
      { id: "doc-017", name: "Site Photo", type: "image", fileName: "site-photo.jpg", size: "1.8 MB", uploadedAt: "2024-01-14 11:00", uploadedBy: "Sarah Johnson", previewUrl: "/placeholder.svg?height=600&width=800" },
    ],
    "SUB-002": [
      { id: "doc-018", name: "Weighbridge Receipt", type: "docket", fileName: "weighbridge-002.pdf", size: "145 KB", uploadedAt: "2024-01-14 12:00", uploadedBy: "David Lee", previewUrl: "/placeholder.svg?height=600&width=400" },
    ],
  },
  "2024-003": {
    "GHI-002": [],
  },
  "2024-004": {
    "JKL-890": [
      { id: "doc-019", name: "Pre-Start Checklist", type: "document", fileName: "prestart.pdf", size: "178 KB", uploadedAt: "2024-01-13 09:15", uploadedBy: "Emma Davis", previewUrl: "/placeholder.svg?height=600&width=400" },
    ],
    "MNO-345": [
      { id: "doc-020", name: "Load Photo", type: "image", fileName: "load-photo.jpg", size: "1.4 MB", uploadedAt: "2024-01-13 10:00", uploadedBy: "Oliver Brown", previewUrl: "/placeholder.svg?height=600&width=800" },
    ],
    "PQR-678": [],
    "STU-901": [
      { id: "doc-021", name: "Delivery Confirmation", type: "docket", fileName: "delivery-confirm.pdf", size: "210 KB", uploadedAt: "2024-01-13 11:30", uploadedBy: "Jack Martin", previewUrl: "/placeholder.svg?height=600&width=400" },
    ],
    "VWX-234": [],
    "YZA-567": [
      { id: "doc-022", name: "Final Report", type: "document", fileName: "final-report.pdf", size: "345 KB", uploadedAt: "2024-01-13 14:00", uploadedBy: "Liam Thompson", previewUrl: "/placeholder.svg?height=600&width=400" },
      { id: "doc-023", name: "Completion Video", type: "video", fileName: "completion.mp4", size: "18.7 MB", uploadedAt: "2024-01-13 14:30", uploadedBy: "Liam Thompson", previewUrl: "/placeholder.svg?height=400&width=600" },
    ],
  },
}

const statusColors = {
  Completed: "default",
  "In Progress": "secondary",
  "Maintenance Required": "destructive",
  New: "outline",
} as const

const priorityColors = {
  High: "destructive",
  Normal: "secondary",
  Low: "outline",
} as const

const truckStatusColors = {
  active: "bg-green-500",
  warning: "bg-yellow-500",
  alert: "bg-red-500",
  success: "bg-green-500", // Added for the new status
} as const

const formatDateDisplay = (dateTimeStr: string) => {
  const [datePart, timePart] = dateTimeStr.split(" ")
  const [year, month, day] = datePart.split("-")
  return `${day}/${month}/${year} ${timePart}`
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Completed":
      return "default"
    case "In Progress":
      return "secondary"
    case "Maintenance Required":
      return "destructive"
    case "New":
      return "outline"
    default:
      return "secondary"
  }
}

export function AdminJobsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [driverTypeFilter, setDriverTypeFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [jobStatuses, setJobStatuses] = useState<Record<string, string>>(
    Object.fromEntries(mockJobs.map((job) => [job.id, job.status])),
  )

  const [viewDetailsJob, setViewDetailsJob] = useState<(typeof mockJobs)[0] | null>(null)
  const [editJobData, setEditJobData] = useState<(typeof mockJobs)[0] | null>(null)
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false)
  const [isEditJobOpen, setIsEditJobOpen] = useState(false)

  const [viewTruckFilter, setViewTruckFilter] = useState<"internal" | "subcontractor">("internal")
  const [editTruckFilter, setEditTruckFilter] = useState<"internal" | "subcontractor">("internal")

  const [despatchNoticeJob, setDespatchNoticeJob] = useState<(typeof mockJobs)[0] | null>(null)
  const [despatchNoticeData, setDespatchNoticeData] = useState({
    loadingTime: "7:00 AM",
    trucksLoadingAtTime: "5",
    njaContact: "Brady",
    njaContactPhone: "0459266198",
    stagingLocation: "",
    loadingInstructions: "",
    tipLocation: "",
    additionalInfo: "",
    tonnageRate: "",
    ppeRequirements:
      "Long sleeve shirts, hard hats, eye protection, gloves, steel cap boots, long pants - all PPE must be worn",
    attachments: [] as string[],
    additionalNotes: "", // Added for the update
  })

  // State for the messages modal
  const [messagesJob, setMessagesJob] = useState<(typeof mockJobs)[0] | null>(null)
  const [isMessagesModalOpen, setIsMessagesModalOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<(typeof mockJobs)[0] | null>(null)

  // State for View Documents modal
  const [isViewDocumentsOpen, setIsViewDocumentsOpen] = useState(false)
  const [viewDocumentsJob, setViewDocumentsJob] = useState<(typeof mockJobs)[0] | null>(null)
  const [selectedTruckForDocs, setSelectedTruckForDocs] = useState<string | null>(null)
  const [selectedDocument, setSelectedDocument] = useState<{
    id: string
    name: string
    type: "docket" | "image" | "video" | "document"
    fileName: string
    size: string
    uploadedAt: string
    uploadedBy: string
    previewUrl: string
  } | null>(null)

  const handleViewDocuments = (job: typeof mockJobs[0]) => {
    setViewDocumentsJob(job)
    // Get accepted trucks for this job
    const acceptedDrivers = job.drivers.filter(d => d.status === "accepted")
    const firstAcceptedTruck = acceptedDrivers.length > 0 ? acceptedDrivers[0].truck : null
    setSelectedTruckForDocs(firstAcceptedTruck)
    setSelectedDocument(null)
    setIsViewDocumentsOpen(true)
  }

  const getAcceptedTrucksWithDocs = (job: typeof mockJobs[0]) => {
    const acceptedDrivers = job.drivers.filter(d => d.status === "accepted")
    return acceptedDrivers.map(driver => {
      const truck = job.trucks.find(t => t.registration === driver.truck)
      const docs = mockTruckDocuments[job.id]?.[driver.truck] || []
      return {
        registration: driver.truck,
        driverName: driver.name,
        driverType: driver.type,
        truckType: truck?.type || "Internal",
        status: truck?.status || "active",
        documentsCount: docs.length,
      }
    })
  }

  const getTruckDocuments = (jobId: string, truckReg: string) => {
    return mockTruckDocuments[jobId]?.[truckReg] || []
  }

  const getDocumentIcon = (type: "docket" | "image" | "video" | "document") => {
    switch (type) {
      case "docket": return <FileText className="h-4 w-4" />
      case "image": return <Image className="h-4 w-4" />
      case "video": return <Video className="h-4 w-4" />
      case "document": return <File className="h-4 w-4" />
    }
  }

  const handleDownload = (doc: { fileName: string; previewUrl: string }) => {
    // In production, this would trigger an actual file download
    const link = document.createElement("a")
    link.href = doc.previewUrl
    link.download = doc.fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDownloadAll = (jobId: string, truckReg: string) => {
    const docs = getTruckDocuments(jobId, truckReg)
    // In production, this would create a zip file or download all files
    alert(`Downloading ${docs.length} files from truck ${truckReg}`)
  }

  const getJobMessages = (jobId: string) => {
    const mockJobMessages: Record<string, any[]> = {
      "2024-001": [
        // Corrected Job ID to match mockJobs
        {
          id: "1",
          sender: "John Smith",
          senderType: "driver",
          message: "Arrived at the site. Ready to start loading.",
          timestamp: new Date("2025-01-06T08:30:00"),
        },
        {
          id: "2",
          sender: "Admin",
          senderType: "admin",
          message: "Please confirm ETA for second load",
          timestamp: new Date("2025-01-06T07:00:00"),
        },
      ],
      "2024-002": [
        // Corrected Job ID to match mockJobs
        {
          id: "3",
          sender: "Mike Johnson",
          senderType: "driver",
          message: "Delivery completed. POD signed by site manager.",
          timestamp: new Date("2025-01-06T07:45:00"),
        },
      ],
    }
    return mockJobMessages[jobId] || []
  }

  const getUnreadCount = (jobId: string) => {
    // Mock unread counts
    const unreadCounts: Record<string, number> = {
      "2024-001": 2, // Corrected Job ID
      "2024-002": 1, // Corrected Job ID
      "2024-005": 1, // This ID doesn't exist in mockJobs, assuming it's a typo or placeholder
    }
    return unreadCounts[jobId] || 0
  }

  const handleStatusChange = (jobId: string, newStatus: string) => {
    setJobStatuses((prev) => ({
      ...prev,
      [jobId]: newStatus,
    }))
  }

  const filteredJobs = mockJobs
    .filter((job) => {
      const matchesSearch =
        job.jobNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.drivers.some((driver) => driver.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.material.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || job.status === statusFilter
      const matchesDriverType =
        driverTypeFilter === "all" || job.drivers.some((driver) => driver.type === driverTypeFilter)
      const matchesPriority = priorityFilter === "all" || job.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesDriverType && matchesPriority
    })
    .sort((a, b) => {
      if (a.status === "Completed" && b.status !== "Completed") return 1
      if (a.status !== "Completed" && b.status === "Completed") return -1
      return 0
    })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-3 w-3 text-green-600" />
      case "In Progress":
        return <Clock className="h-3 w-3 text-blue-600" />
      case "Maintenance Required":
        return <Wrench className="h-3 w-3 text-red-600" />
      case "New":
        return <AlertTriangle className="h-3 w-3 text-orange-600" />
      default:
        return <AlertTriangle className="h-3 w-3 text-orange-600" />
    }
  }

  const handleViewDetails = (job: (typeof mockJobs)[0]) => {
    setViewDetailsJob(job)
    setIsViewDetailsOpen(true)
  }

  const handleEditJob = (job: (typeof mockJobs)[0]) => {
    setEditJobData({ ...job })
    setIsEditJobOpen(true)
  }

  const handleSaveEdit = () => {
    console.log("[v0] Saving job edits:", editJobData)
    // In production, this would save to an API
    setIsEditJobOpen(false)
    // Show success message
    alert("Job updated successfully!")
  }

  const handleEditInputChange = (field: string, value: any) => {
    setEditJobData((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  // Added handleSaveDespatchNotice and related handlers
  const handleSaveDespatchNotice = () => {
    console.log("Saving despatch notice:", despatchNoticeData)
    // In real implementation, this would save to backend
    setDespatchNoticeJob(null)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const fileNames = Array.from(files).map((file) => file.name)
      setDespatchNoticeData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...fileNames],
      }))
    }
  }

  const removeAttachment = (index: number) => {
    setDespatchNoticeData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-card-foreground">Jobs Management</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs, clients, drivers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80 bg-input border-border"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 bg-input border-border">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Maintenance Required">Maintenance</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-32 bg-input border-border">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={driverTypeFilter} onValueChange={setDriverTypeFilter}>
                <SelectTrigger className="w-40 bg-input border-border">
                  <SelectValue placeholder="Driver Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Drivers</SelectItem>
                  <SelectItem value="Internal">Internal</SelectItem>
                  <SelectItem value="Subcontractor">Subcontractor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredJobs.map((job) => {
              const sortedTrucks = [...(job.trucks || [])].sort((a, b) => {
                const statusOrder = { active: 0, warning: 1, alert: 2, success: 0 } // Added 'success' to order
                return (statusOrder[a.status] ?? 3) - (statusOrder[b.status] ?? 3) // Default to 3 for unknown statuses
              })

              const trucksPerColumn = 5
              const truckColumns: (typeof job.trucks)[] = []

              if (sortedTrucks && sortedTrucks.length > 0) {
                for (let i = 0; i < sortedTrucks.length; i += trucksPerColumn) {
                  truckColumns.push(sortedTrucks.slice(i, i + trucksPerColumn))
                }
              }

              const currentStatus = jobStatuses[job.id] || job.status

              return (
                // Removed border-b from grid to eliminate gap between content and footer
                <Card key={job.id} className="border border-border p-0 overflow-hidden">
                  <div className="grid grid-cols-[280px_300px_1fr_50px]">
                    <div className="p-4 border-r border-border bg-blue-50 dark:bg-blue-950/20">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="text-primary font-semibold text-base">{job.jobNumber}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex gap-2">
                            <span className="text-xs text-muted-foreground font-medium min-w-[100px]">Client:</span>
                            <span className="text-sm font-medium text-primary">{job.clientName}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-xs text-muted-foreground font-medium min-w-[100px]">
                              Client PO #:
                            </span>
                            <span className="text-sm">{job.clientPO}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-xs text-muted-foreground font-medium min-w-[100px]">
                              Pickup Address:
                            </span>
                            <span className="text-sm">{job.pickupAddress}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-xs text-muted-foreground font-medium min-w-[100px]">Tip Client:</span>
                            <span className="text-sm">{job.tipClient}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-xs text-muted-foreground font-medium min-w-[100px]">
                              Tip Address:
                            </span>
                            <span className="text-sm">{job.tipAddress}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-xs text-muted-foreground font-medium min-w-[100px]">
                              Job Created by:
                            </span>
                            <span className="text-sm">{job.createdBy}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-xs text-muted-foreground font-medium min-w-[100px]">
                              Trucks allocated by:
                            </span>
                            <span className="text-sm">{job.trucksAllocatedBy}</span>
                          </div>
                          {/* </CHANGE> */}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-r border-border bg-amber-50/50 dark:bg-amber-950/10">
                      <div className="font-semibold text-sm mb-2 text-amber-900 dark:text-amber-100">Rates</div>
                      <div className="space-y-1">
                        {job.rates?.map((rate, idx) => (
                          <div key={idx} className="flex items-center gap-4 text-sm">
                            <span className="text-muted-foreground min-w-[100px]">{rate.type}</span>
                            <span className="font-semibold min-w-[60px] text-green-700 dark:text-green-400">
                              ${rate.price}
                            </span>
                            <span className="min-w-[80px] text-xs">{rate.unit}</span>
                          </div>
                        ))}

                        <div className="border-t border-amber-200 dark:border-amber-800 pt-3 mt-3">
                          <div className="font-semibold text-sm mb-2 text-amber-900 dark:text-amber-100">Tolls</div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">One Way</span>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-green-700 dark:text-green-400">
                                  ${job.tollOneWay?.toFixed(2)}
                                </span>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                                      <Info className="h-3 w-3 text-muted-foreground" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-[400px]">
                                    <div className="space-y-3">
                                      <h4 className="font-semibold text-sm">Additional Info</h4>
                                      <div className="space-y-2 text-xs">
                                        <div>
                                          <div className="font-medium text-muted-foreground">Source</div>
                                          <a
                                            href="https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline"
                                          >
                                            https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api
                                          </a>
                                        </div>
                                        <div>
                                          <div className="font-medium text-muted-foreground">Maintainer</div>
                                          <a
                                            href="https://opendata.transport.nsw.gov.au"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline"
                                          >
                                            TfNSW Open Data Hub and Developer Portal
                                          </a>
                                        </div>
                                        <div>
                                          <div className="font-medium text-muted-foreground">Last Updated</div>
                                          <div>August 21, 2023, 7:06 PM (UTC+10:00)</div>
                                        </div>
                                        <div>
                                          <div className="font-medium text-muted-foreground">Created</div>
                                          <div>October 5, 2017, 1:00 PM (UTC+11:00)</div>
                                        </div>
                                      </div>
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Return</span>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-green-700 dark:text-green-400">
                                  ${job.tollReturn?.toFixed(2)}
                                </span>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                                      <Info className="h-3 w-3 text-muted-foreground" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-[400px]">
                                    <div className="space-y-3">
                                      <h4 className="font-semibold text-sm">Additional Info</h4>
                                      <div className="space-y-2 text-xs">
                                        <div>
                                          <div className="font-medium text-muted-foreground">Source</div>
                                          <a
                                            href="https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline"
                                          >
                                            https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api
                                          </a>
                                        </div>
                                        <div>
                                          <div className="font-medium text-muted-foreground">Maintainer</div>
                                          <a
                                            href="https://opendata.transport.nsw.gov.au"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline"
                                          >
                                            TfNSW Open Data Hub and Developer Portal
                                          </a>
                                        </div>
                                        <div>
                                          <div className="font-medium text-muted-foreground">Last Updated</div>
                                          <div>August 21, 2023, 7:06 PM (UTC+10:00)</div>
                                        </div>
                                        <div>
                                          <div className="font-medium text-muted-foreground">Created</div>
                                          <div>October 5, 2017, 1:00 PM (UTC+11:00)</div>
                                        </div>
                                      </div>
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-r border-border bg-background">
                      <div className="font-semibold text-sm mb-2">Trucks</div>
                      <div className="flex gap-8">
                        {truckColumns.map((column, colIdx) => (
                          <div key={colIdx} className="space-y-1.5 min-w-[180px]">
                            {column.map((truck, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <div className={`h-2 w-2 rounded-full ${truckStatusColors[truck.status]}`} />
                                <div>
                                  <div className="text-sm font-medium font-mono">{truck.registration}</div>
                                  <div className="text-xs text-muted-foreground">{truck.type}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 flex flex-col items-center justify-start gap-2 bg-background">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(job)}>View Details</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditJob(job)}>Edit Job</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewDocuments(job)}>View Documents</DropdownMenuItem>
                          <DropdownMenuItem>Track Job on Live View</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Cancel Job</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        title="Duplicate Job"
                        onClick={() => {
                          // Create a duplicate job with a new ID
                          const newJobId = `JOB-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900) + 100).padStart(3, "0")}`
                          alert(`Job duplicated! New Job ID: ${newJobId}\n\nIn production, this would open the Add New Job form pre-filled with data from ${job.id}`)
                        }}
                      >
                        <span className="sr-only">Duplicate Job</span>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        title="Archive Job"
                        onClick={() => {
                          handleStatusChange(job.id, "Archived")
                          alert(`Job ${job.jobNumber} has been archived.`)
                        }}
                      >
                        <span className="sr-only">Archive Job</span>
                        <Archive className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-slate-900 px-6 py-3 text-white gap-4 -mt-6">
                    {/* Job Status */}
                    <div className="flex items-center gap-4">
                      <span className="text-sm">Job Status:</span>
                      <Select value={currentStatus} onValueChange={(value) => handleStatusChange(job.id, value)}>
                        <SelectTrigger
                          className={`w-[150px] h-8 border-none font-semibold ${
                            currentStatus === "New"
                              ? "bg-blue-600 text-white"
                              : currentStatus === "In Progress"
                                ? "bg-amber-500 text-white"
                                : currentStatus === "Completed"
                                  ? "bg-green-600 text-white"
                                  : currentStatus === "Archived"
                                    ? "bg-gray-500 text-white"
                                    : "bg-slate-800 text-white"
                          }`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="New" className="font-semibold text-blue-600">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-blue-600" />
                              New
                            </div>
                          </SelectItem>
                          <SelectItem value="In Progress" className="font-semibold text-amber-600">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-amber-500" />
                              In Progress
                            </div>
                          </SelectItem>
                          <SelectItem value="Completed" className="font-semibold text-green-600">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-600" />
                              Completed
                            </div>
                          </SelectItem>
                          <SelectItem value="Pending" className="font-semibold text-red-600">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-red-600" />
                              Pending
                            </div>
                          </SelectItem>
                          <SelectItem value="Archived" className="font-semibold text-gray-500">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-gray-500" />
                              Archived
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Entry/Delivery Date Times */}
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Entry Date / Time:</span>
                        <span className="font-medium">{formatDateDisplay(job.entryDateTime)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Delivery Date / Time:</span>
                        <span className="font-medium">{formatDateDisplay(job.deliveryDateTime)}</span>
                      </div>
                    </div>

                    {/* Messages Button */}
                    {job.drivers && job.drivers.length > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-white text-slate-900 hover:bg-slate-100 relative"
                        onClick={() => {
                          setSelectedJob(job)
                          setIsMessagesModalOpen(true)
                        }}
                      >
                        <MessageSquare className="h-4 w-4" />
                        Messages
                        {getUnreadCount(job.id) > 0 && (
                          <Badge
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                          >
                            {getUnreadCount(job.id)}
                          </Badge>
                        )}
                      </Button>
                    )}

                    {/* Despatch Notice Button */}
                    <div className="flex items-center gap-3 ml-auto">
                      <span className="text-sm text-white">Despatch Notice:</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 bg-white text-slate-900 hover:bg-teal-500 hover:text-white"
                        onClick={() => {
                          setDespatchNoticeJob(job)
                          setDespatchNoticeData({
                            loadingTime: "7:00 AM",
                            trucksLoadingAtTime: "5",
                            njaContact: "Brady",
                            njaContactPhone: "0459266198",
                            stagingLocation: "",
                            loadingInstructions: "",
                            tipLocation: job.tipAddress,
                            additionalInfo: "",
                            tonnageRate: job.rates.find((r) => r.type === "Client")?.price.toString() || "",
                            ppeRequirements:
                              "Long sleeve shirts, hard hats, eye protection, gloves, steel cap boots, long pants - all PPE must be worn",
                            attachments: [],
                            additionalNotes: job.notes || "", // Pre-fill with job notes if available
                          })
                        }}
                      >
                        Manage
                      </Button>
                    </div>
                    <div className="col-span-full flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-transparent"
                        onClick={() => {
                          window.open(`/admin-portal/live-view?job=${job.jobNumber}`, "_blank")
                        }}
                      >
                        <Map className="h-4 w-4" />
                        View on Live Map
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
          {filteredJobs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No jobs found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="!max-w-[95vw] w-full sm:!max-w-[95vw] md:!max-w-[1800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{viewDetailsJob?.jobNumber} - Job Details</DialogTitle>
            <DialogDescription>Complete information for this job</DialogDescription>
          </DialogHeader>

          {viewDetailsJob && (
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Client Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Client Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Client</Label>
                      <p className="font-medium">{viewDetailsJob.clientName}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Client Contact</Label>
                      <p className="font-medium">{viewDetailsJob.clientContact}</p>
                      <p className="text-sm text-muted-foreground">{viewDetailsJob.clientPhone}</p>
                      <p className="text-sm text-muted-foreground">{viewDetailsJob.clientEmail}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Pickup Address</Label>
                    <p className="font-medium">{viewDetailsJob.pickupAddress}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Tip Client</Label>
                    <p className="font-medium">{viewDetailsJob.tipClient}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Tip Address</Label>
                    <p className="font-medium">{viewDetailsJob.tipAddress}</p>
                  </div>
                  {/* </CHANGE> */}
                  <div className="flex gap-2">
                    <span className="text-xs text-muted-foreground font-medium min-w-[100px]">Job Created by:</span>
                    <span className="text-sm font-medium text-primary">{viewDetailsJob.createdBy}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs text-muted-foreground font-medium min-w-[100px]">
                      Trucks allocated by:
                    </span>
                    <span className="text-sm font-medium text-primary">{viewDetailsJob.trucksAllocatedBy}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Location Coordinates</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Pickup Latitude</Label>
                      <p className="font-mono text-sm">{viewDetailsJob.pickupLatitude?.toFixed(6)}°</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Pickup Longitude</Label>
                      <p className="font-mono text-sm">{viewDetailsJob.pickupLongitude?.toFixed(6)}°</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Tip Latitude</Label>
                      <p className="font-mono text-sm">{viewDetailsJob.tipLatitude?.toFixed(6)}°</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Tip Longitude</Label>
                      <p className="font-mono text-sm">{viewDetailsJob.tipLongitude?.toFixed(6)}°</p>
                    </div>
                  </div>
                </div>

                {/* Toll Estimate */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Toll Estimate</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-muted-foreground">One Way</Label>
                        <p className="font-medium text-lg text-green-600">${viewDetailsJob.tollOneWay?.toFixed(2)}</p>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="text-muted-foreground hover:text-foreground transition-colors">
                            <Info className="h-4 w-4" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px]">
                          <div className="space-y-3">
                            <h4 className="font-semibold">Additional Info</h4>
                            <div className="space-y-2">
                              <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                <span className="font-medium">Source</span>
                                <a
                                  href="https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline break-all"
                                >
                                  https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api
                                </a>
                              </div>
                              <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                <span className="font-medium">Maintainer</span>
                                <a
                                  href="https://opendata.transport.nsw.gov.au"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline"
                                >
                                  TfNSW Open Data Hub and Developer Portal
                                </a>
                              </div>
                              <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                <span className="font-medium">Last Updated</span>
                                <span>August 21, 2023, 7:06 PM (UTC+10:00)</span>
                              </div>
                              <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                <span className="font-medium">Created</span>
                                <span>October 5, 2017, 1:00 PM (UTC+11:00)</span>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-muted-foreground">Return</Label>
                        <p className="font-medium text-lg text-green-600">${viewDetailsJob.tollReturn?.toFixed(2)}</p>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="text-muted-foreground hover:text-foreground transition-colors">
                            <Info className="h-4 w-4" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px]">
                          <div className="space-y-3">
                            <h4 className="font-semibold">Additional Info</h4>
                            <div className="space-y-2">
                              <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                <span className="font-medium">Source</span>
                                <a
                                  href="https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline break-all"
                                >
                                  https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api
                                </a>
                              </div>
                              <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                <span className="font-medium">Maintainer</span>
                                <a
                                  href="https://opendata.transport.nsw.gov.au"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline"
                                >
                                  TfNSW Open Data Hub and Developer Portal
                                </a>
                              </div>
                              <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                <span className="font-medium">Last Updated</span>
                                <span>August 21, 2023, 7:06 PM (UTC+10:00)</span>
                              </div>
                              <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                <span className="font-medium">Created</span>
                                <span>October 5, 2017, 1:00 PM (UTC+11:00)</span>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>

                {/* Schedule */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Schedule</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Entry Date</Label>
                      <p className="font-medium">{viewDetailsJob.entryDateTime.split(" ")[0]}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Entry Time</Label>
                      <p className="font-medium">{viewDetailsJob.entryDateTime.split(" ")[1]}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Delivery Date</Label>
                      <p className="font-medium">{viewDetailsJob.deliveryDateTime.split(" ")[0]}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Delivery Time</Label>
                      <p className="font-medium">{viewDetailsJob.deliveryDateTime.split(" ")[1]}</p>
                    </div>
                  </div>
                </div>

                {/* Material */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Material</h3>
                  <div>
                    <Label className="text-muted-foreground">Material</Label>
                    <p className="font-medium">{viewDetailsJob.material}</p>
                  </div>
                </div>

                {/* Rates */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Rates</h3>
                  {viewDetailsJob.rates.map((rate, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground">{rate.type} Rate</Label>
                        <p className="font-medium">${rate.price}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Unit</Label>
                        <p className="font-medium">{rate.unit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Truck Assignment */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Truck Assignment</h3>

                  <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                    <div className="text-sm font-medium">Driver Responses</div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-sm">
                          <span className="font-semibold">6</span> Accepted
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-amber-500" />
                        <span className="text-sm">
                          <span className="font-semibold">2</span> Pending
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500" />
                        <span className="text-sm">
                          <span className="font-semibold">2</span> Rejected
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 space-y-4 max-h-[600px] overflow-y-auto">
                    <div className="space-y-2">
                      <Label>Assigned Vehicles ({viewDetailsJob.trucks.length})</Label>
                      <div className="grid gap-2">
                        {viewDetailsJob.trucks.map((truck, index) => {
                          const vehicleDetails = mockVehicles.find((v) => v.registration === truck.registration)
                          return (
                            <Card key={index}>
                              <CardContent className="p-3">
                                <div className="space-y-3">
                                  {/* Vehicle Info */}
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <div className="font-semibold font-mono">{truck.registration}</div>
                                      {vehicleDetails && (
                                        <>
                                          <div className="text-sm text-muted-foreground">
                                            {vehicleDetails.make} {vehicleDetails.model}
                                          </div>
                                          <div className="flex items-center gap-2 mt-1">
                                            <Badge
                                              variant={truck.type === "Internal" ? "default" : "secondary"}
                                              className="text-xs"
                                            >
                                              {truck.type}
                                            </Badge>
                                            {truck.type === "Subcontractor" && vehicleDetails.company && (
                                              <span className="text-xs text-muted-foreground">
                                                {vehicleDetails.company}
                                              </span>
                                            )}
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </div>

                                  {/* Driver Info */}
                                  {vehicleDetails?.driver && (
                                    <div className="border-t pt-2 space-y-2">
                                      <div className="text-xs font-medium text-muted-foreground">Driver Details</div>
                                      <div className="space-y-1">
                                        <div className="flex items-center gap-1.5">
                                          <User className="h-3 w-3 text-muted-foreground" />
                                          <span className="text-sm font-medium">{vehicleDetails.driver.name}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                          <Phone className="h-3 w-3 text-muted-foreground" />
                                          <span className="text-xs text-muted-foreground">
                                            {vehicleDetails.driver.phone}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                          <FileText className="h-3 w-3 text-muted-foreground" />
                                          <span className="text-xs text-muted-foreground">
                                            {vehicleDetails.driver.licenseClass} License (Exp:{" "}
                                            {vehicleDetails.driver.licenseExpiry})
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
                                              vehicleDetails.driver.njaInduction === "Valid" ? "default" : "destructive"
                                            }
                                            className="text-xs"
                                          >
                                            NJA Induction: {vehicleDetails.driver.njaInduction}
                                          </Badge>
                                          <Badge
                                            variant={
                                              vehicleDetails.driver.whiteCard === "Valid"
                                                ? "default"
                                                : vehicleDetails.driver.whiteCard === "Expiring Soon"
                                                  ? "secondary"
                                                  : "destructive"
                                            }
                                            className="text-xs"
                                          >
                                            White Card: {vehicleDetails.driver.whiteCard}
                                          </Badge>
                                          <Badge variant="outline" className="text-xs">
                                            VOC: {vehicleDetails.driver.vocScore}%
                                          </Badge>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Additional Information</h3>
                  <div>
                    <Label className="text-muted-foreground">Priority</Label>
                    <p className="font-medium">{viewDetailsJob.priority}</p>
                  </div>
                  {viewDetailsJob.notes && (
                    <div>
                      <Label className="text-muted-foreground">Notes</Label>
                      <p className="font-medium text-sm">{viewDetailsJob.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditJobOpen} onOpenChange={setIsEditJobOpen}>
        <DialogContent className="!max-w-[95vw] w-full sm:!max-w-[95vw] md:!max-w-[1800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Job - {editJobData?.jobNumber}</DialogTitle>
            <DialogDescription>Update job information and truck assignments</DialogDescription>
          </DialogHeader>

          {editJobData && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSaveEdit()
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Client Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Client Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-client">Client</Label>
                        <Input
                          id="edit-client"
                          value={editJobData.clientName}
                          onChange={(e) => handleEditInputChange("clientName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-clientContact">Client Contact</Label>
                        <Input
                          id="edit-clientContact"
                          value={editJobData.clientContact}
                          onChange={(e) => handleEditInputChange("clientContact", e.target.value)}
                        />
                        <Input
                          id="edit-clientPhone"
                          placeholder="Phone"
                          value={editJobData.clientPhone}
                          onChange={(e) => handleEditInputChange("clientPhone", e.target.value)}
                          className="mt-2"
                        />
                        <Input
                          id="edit-clientEmail"
                          placeholder="Email"
                          type="email"
                          value={editJobData.clientEmail}
                          onChange={(e) => handleEditInputChange("clientEmail", e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-pickupAddress">Pickup Address</Label>
                      <Input
                        id="edit-pickupAddress"
                        value={editJobData.pickupAddress}
                        onChange={(e) => handleEditInputChange("pickupAddress", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-tipClient">Tip Client</Label>
                      <Input
                        id="edit-tipClient"
                        value={editJobData.tipClient}
                        onChange={(e) => handleEditInputChange("tipClient", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-tipAddress">Tip Address</Label>
                      <Input
                        id="edit-tipAddress"
                        value={editJobData.tipAddress}
                        onChange={(e) => handleEditInputChange("tipAddress", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-createdBy">Job Created By</Label>
                        <Input
                          id="edit-createdBy"
                          value={editJobData.createdBy}
                          onChange={(e) => handleEditInputChange("createdBy", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-trucksAllocatedBy">Trucks Allocated By</Label>
                        <Input
                          id="edit-trucksAllocatedBy"
                          value={editJobData.trucksAllocatedBy}
                          onChange={(e) => handleEditInputChange("trucksAllocatedBy", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Toll Estimate */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Toll Estimate</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-muted-foreground">One Way</Label>
                          <p className="font-medium text-lg text-green-600">$12.50</p>
                        </div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="text-muted-foreground hover:text-foreground transition-colors">
                              <Info className="h-4 w-4" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[400px]">
                            <div className="space-y-3">
                              <h4 className="font-semibold">Additional Info</h4>
                              <div className="space-y-2">
                                <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                  <span className="font-medium">Source</span>
                                  <a
                                    href="https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline break-all"
                                  >
                                    https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api
                                  </a>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                  <span className="font-medium">Maintainer</span>
                                  <a
                                    href="https://opendata.transport.nsw.gov.au"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                  >
                                    TfNSW Open Data Hub and Developer Portal
                                  </a>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                  <span className="font-medium">Last Updated</span>
                                  <span>August 21, 2023, 7:06 PM (UTC+10:00)</span>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                  <span className="font-medium">Created</span>
                                  <span>October 5, 2017, 1:00 PM (UTC+11:00)</span>
                                </div>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-muted-foreground">Return</Label>
                          <p className="font-medium text-lg text-green-600">$25.00</p>
                        </div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="text-muted-foreground hover:text-foreground transition-colors">
                              <Info className="h-4 w-4" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[400px]">
                            <div className="space-y-3">
                              <h4 className="font-semibold">Additional Info</h4>
                              <div className="space-y-2">
                                <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                  <span className="font-medium">Source</span>
                                  <a
                                    href="https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline break-all"
                                  >
                                    https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api
                                  </a>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                  <span className="font-medium">Maintainer</span>
                                  <a
                                    href="https://opendata.transport.nsw.gov.au"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                  >
                                    TfNSW Open Data Hub and Developer Portal
                                  </a>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                  <span className="font-medium">Last Updated</span>
                                  <span>August 21, 2023, 7:06 PM (UTC+10:00)</span>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                                  <span className="font-medium">Created</span>
                                  <span>October 5, 2017, 1:00 PM (UTC+11:00)</span>
                                </div>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Schedule</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-entryDate">Entry Date</Label>
                        <Input
                          id="edit-entryDate"
                          type="text"
                          placeholder="DD/MM/YYYY"
                          value={editJobData.entryDateTime.split(" ")[0]}
                          onChange={(e) =>
                            handleEditInputChange(
                              "entryDateTime",
                              `${e.target.value} ${editJobData.entryDateTime.split(" ")[1]}`,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-entryTime">Entry Time</Label>
                        <Input
                          id="edit-entryTime"
                          type="time"
                          value={editJobData.entryDateTime.split(" ")[1]}
                          onChange={(e) =>
                            handleEditInputChange(
                              "entryDateTime",
                              `${editJobData.entryDateTime.split(" ")[0]} ${e.target.value}`,
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-deliveryDate">Delivery Date</Label>
                        <Input
                          id="edit-deliveryDate"
                          type="text"
                          placeholder="DD/MM/YYYY"
                          value={editJobData.deliveryDateTime.split(" ")[0]}
                          onChange={(e) =>
                            handleEditInputChange(
                              "deliveryDateTime",
                              `${e.target.value} ${editJobData.deliveryDateTime.split(" ")[1]}`,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-deliveryTime">Delivery Time</Label>
                        <Input
                          id="edit-deliveryTime"
                          type="time"
                          value={editJobData.deliveryDateTime.split(" ")[1]}
                          onChange={(e) =>
                            handleEditInputChange(
                              "deliveryDateTime",
                              `${editJobData.deliveryDateTime.split(" ")[0]} ${e.target.value}`,
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Material */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Material</h3>
                    <div className="space-y-2">
                      <Label htmlFor="edit-material">Material</Label>
                      <Input
                        id="edit-material"
                        value={editJobData.material}
                        onChange={(e) => handleEditInputChange("material", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Rates */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Rates</h3>
                    {editJobData.rates.map((rate, index) => (
                      <div key={index} className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>{rate.type} Rate</Label>
                          <Input
                            type="number"
                            placeholder="$0.00"
                            value={rate.price}
                            onChange={(e) => {
                              const newRates = [...editJobData.rates]
                              newRates[index].price = Number.parseFloat(e.target.value)
                              handleEditInputChange("rates", newRates)
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Unit</Label>
                          <Select
                            value={rate.unit}
                            onValueChange={(value) => {
                              const newRates = [...editJobData.rates]
                              newRates[index].unit = value
                              handleEditInputChange("rates", newRates)
                            }}
                          >
                            <SelectTrigger>
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
                    ))}
                  </div>
                </div>

                {/* Right Column - Truck Assignment */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Truck Assignment</h3>

                  <div className="flex gap-2 border-b border-border pb-3">
                    <Button
                      type="button"
                      variant={editTruckFilter === "internal" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setEditTruckFilter("internal")}
                    >
                      Internal
                    </Button>
                    <Button
                      type="button"
                      variant={editTruckFilter === "subcontractor" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setEditTruckFilter("subcontractor")}
                    >
                      Subcontractor
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4 space-y-4 max-h-[600px] overflow-y-auto">
                    <div className="space-y-2">
                      <Label>Available Vehicles</Label>
                      <div className="grid gap-2">
                        {mockVehicles
                          .filter((vehicle) => {
                            if (editTruckFilter === "internal") return vehicle.type === "Internal"
                            if (editTruckFilter === "subcontractor") return vehicle.type === "Subcontractor"
                            return true
                          })
                          .map((vehicle) => {
                            const isSelected = editJobData.trucks.some((t) => t.registration === vehicle.registration)
                            return (
                              <Card
                                key={vehicle.id}
                                className={`cursor-pointer transition-all ${
                                  isSelected ? "border-primary bg-primary/5" : "hover:border-primary/50"
                                }`}
                                onClick={() => {
                                  if (isSelected) {
                                    // Remove truck
                                    handleEditInputChange(
                                      "trucks",
                                      editJobData.trucks.filter((t) => t.registration !== vehicle.registration),
                                    )
                                  } else {
                                    // Add truck
                                    handleEditInputChange("trucks", [
                                      ...editJobData.trucks,
                                      {
                                        registration: vehicle.registration,
                                        type: vehicle.type,
                                        status: "active", // Default status, can be adjusted
                                      },
                                    ])
                                  }
                                }}
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
                                      {isSelected && <Badge variant="default">Selected</Badge>}
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
                                            <span className="text-xs text-muted-foreground">
                                              {vehicle.driver.phone}
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-1.5">
                                            <FileText className="h-3 w-3 text-muted-foreground" />
                                            <span className="text-xs text-muted-foreground">
                                              {vehicle.driver.licenseClass} License (Exp: {vehicle.driver.licenseExpiry}
                                              )
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
                            )
                          })}
                      </div>
                    </div>

                    {editJobData.trucks.length > 0 && (
                      <div className="space-y-2">
                        <Label>Selected Trucks ({editJobData.trucks.length})</Label>
                        <div className="flex flex-wrap gap-2">
                          {editJobData.trucks.map((truck, index) => (
                            <Badge key={index} variant="default" className="px-3 py-1">
                              {truck.registration}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleEditInputChange(
                                    "trucks",
                                    editJobData.trucks.filter((t) => t.registration !== truck.registration),
                                  )
                                }}
                                className="ml-2 hover:text-destructive"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Additional Information</h3>
                    <div className="space-y-2">
                      <Label htmlFor="edit-priority">Priority</Label>
                      <Select
                        value={editJobData.priority}
                        onValueChange={(value) => handleEditInputChange("priority", value)}
                      >
                        <SelectTrigger id="edit-priority">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Normal">Normal</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-notes">Notes</Label>
                      <Textarea
                        id="edit-notes"
                        placeholder="Add any additional notes or special instructions"
                        rows={4}
                        value={editJobData.notes || ""}
                        onChange={(e) => handleEditInputChange("notes", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditJobOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!despatchNoticeJob} onOpenChange={() => setDespatchNoticeJob(null)}>
        <DialogContent className="!max-w-[95vw] md:!max-w-[1200px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Manage Despatch Notice</DialogTitle>
            <DialogDescription>
              View and edit despatch notice details for {despatchNoticeJob?.jobNumber}. Green fields are auto-populated
              from job data and can be modified as needed.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Fixed Job Information (Green - Auto-populated from Job) */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Job Information</h3>
              <div className="grid grid-cols-2 gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <Label className="text-sm font-medium">Job Number</Label>
                  <Input value={despatchNoticeJob?.jobNumber || ""} disabled className="bg-white mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-medium">Delivery Date</Label>
                  <Input
                    type="date"
                    value={despatchNoticeJob?.deliveryDateTime.split(" ")[0] || ""}
                    onChange={(e) => {
                      // Update delivery date
                      const newDeliveryDateTime = `${e.target.value} ${despatchNoticeJob?.deliveryDateTime.split(" ")[1] || ""}`
                      setDespatchNoticeJob((prev) => (prev ? { ...prev, deliveryDateTime: newDeliveryDateTime } : null))
                    }}
                    className="bg-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Delivery Time</Label>
                  <Input
                    type="time"
                    value={despatchNoticeJob?.deliveryDateTime.split(" ")[1] || ""}
                    onChange={(e) => {
                      // Update delivery time
                      const newDeliveryDateTime = `${despatchNoticeJob?.deliveryDateTime.split(" ")[0] || ""} ${e.target.value}`
                      setDespatchNoticeJob((prev) => (prev ? { ...prev, deliveryDateTime: newDeliveryDateTime } : null))
                    }}
                    className="bg-white mt-1"
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-sm font-medium">Trucks Assigned</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {despatchNoticeJob?.trucks.map((truck, idx) => (
                      <Badge key={idx} variant="outline" className="bg-gray-100 text-gray-800">
                        {truck.registration}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Client</Label>
                  <Input value={despatchNoticeJob?.clientName || ""} disabled className="bg-white mt-1" />
                </div>
                <div className="col-span-2 border-t border-green-300 pt-4 mt-2">
                  <Label className="text-sm font-medium mb-3 block">Client Rates</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {despatchNoticeJob?.rates
                      .filter((r) => r.type === "Client")
                      .map((rate, index) => {
                        const globalIndex = despatchNoticeJob.rates.findIndex(
                          (r, i) => r.type === "Client" && despatchNoticeJob.rates.filter((x, j) => j < i && x.type === "Client").length === index
                        )
                        return (
                          <div key={index} className="space-y-2">
                            <Label className="text-xs text-muted-foreground">{rate.unit} Rate</Label>
                            <Input
                              type="number"
                              value={rate.price.toString()}
                              onChange={(e) => {
                                const newRateValue = Number.parseFloat(e.target.value)
                                if (!isNaN(newRateValue) && despatchNoticeJob) {
                                  const updatedRates = [...despatchNoticeJob.rates]
                                  updatedRates[globalIndex].price = newRateValue
                                  setDespatchNoticeJob((prev) => (prev ? { ...prev, rates: updatedRates } : null))
                                }
                              }}
                              className="bg-white"
                              placeholder="$0.00"
                            />
                          </div>
                        )
                      })}
                  </div>
                </div>
                <div className="col-span-2 border-t border-green-300 pt-4 mt-2">
                  <Label className="text-sm font-medium mb-3 block">Toll Estimate</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">One Way</span>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-green-600">
                            ${despatchNoticeJob?.tollOneWay?.toFixed(2)}
                          </span>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                                <Info className="h-4 w-4 text-blue-500" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[400px]">
                              <div className="space-y-3">
                                <h4 className="font-semibold text-sm">Additional Info</h4>
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <span className="font-medium">Source:</span>{" "}
                                    <a
                                      href="https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline"
                                    >
                                      TfNSW Toll Calculator API
                                    </a>
                                  </div>
                                  <div>
                                    <span className="font-medium">Maintainer:</span>{" "}
                                    <a
                                      href="https://opendata.transport.nsw.gov.au"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline"
                                    >
                                      TfNSW Open Data Hub and Developer Portal
                                    </a>
                                  </div>
                                  <div>
                                    <span className="font-medium">Last Updated:</span> August 21, 2023, 7:06 PM
                                    (UTC+10:00)
                                  </div>
                                  <div>
                                    <span className="font-medium">Created:</span> October 5, 2017, 1:00 PM (UTC+11:00)
                                  </div>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Return</span>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-green-600">
                            ${despatchNoticeJob?.tollReturn?.toFixed(2)}
                          </span>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                                <Info className="h-4 w-4 text-blue-500" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[400px]">
                              <div className="space-y-3">
                                <h4 className="font-semibold text-sm">Additional Info</h4>
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <span className="font-medium">Source:</span>{" "}
                                    <a
                                      href="https://opendata.transport.nsw.gov.au/dataset/toll-calculator-api"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline"
                                    >
                                      TfNSW Toll Calculator API
                                    </a>
                                  </div>
                                  <div>
                                    <span className="font-medium">Maintainer:</span>{" "}
                                    <a
                                      href="https://opendata.transport.nsw.gov.au"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline"
                                    >
                                      TfNSW Open Data Hub and Developer Portal
                                    </a>
                                  </div>
                                  <div>
                                    <span className="font-medium">Last Updated:</span> August 21, 2023, 7:06 PM
                                    (UTC+10:00)
                                  </div>
                                  <div>
                                    <span className="font-medium">Created:</span> October 5, 2017, 1:00 PM (UTC+11:00)
                                  </div>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Editable Fields (Amber - Flexible Information) */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Despatch Details</h3>
              <div className="grid grid-cols-2 gap-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div>
                  <Label htmlFor="loadingTime" className="text-sm font-medium">
                    Loading Time
                  </Label>
                  <Input
                    id="loadingTime"
                    value={despatchNoticeData.loadingTime}
                    onChange={(e) => setDespatchNoticeData((prev) => ({ ...prev, loadingTime: e.target.value }))}
                    placeholder="e.g., 7:00 AM"
                    className="bg-white mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="trucksLoadingAtTime" className="text-sm font-medium">
                    # Trucks Loading at a Time
                  </Label>
                  <Input
                    id="trucksLoadingAtTime"
                    type="number"
                    value={despatchNoticeData.trucksLoadingAtTime}
                    onChange={(e) =>
                      setDespatchNoticeData((prev) => ({ ...prev, trucksLoadingAtTime: e.target.value }))
                    }
                    placeholder="e.g., 5"
                    className="bg-white mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="njaContact" className="text-sm font-medium">
                    NJA Contact on Approach
                  </Label>
                  <Input
                    id="njaContact"
                    value={despatchNoticeData.njaContact}
                    onChange={(e) => setDespatchNoticeData((prev) => ({ ...prev, njaContact: e.target.value }))}
                    placeholder="Contact name"
                    className="bg-white mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="njaContactPhone" className="text-sm font-medium">
                    NJA Contact Phone
                  </Label>
                  <Input
                    id="njaContactPhone"
                    value={despatchNoticeData.njaContactPhone}
                    onChange={(e) => setDespatchNoticeData((prev) => ({ ...prev, njaContactPhone: e.target.value }))}
                    placeholder="Phone number"
                    className="bg-white mt-1"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="stagingLocation" className="text-sm font-medium">
                    Staging Location
                  </Label>
                  <Textarea
                    id="stagingLocation"
                    value={despatchNoticeData.stagingLocation}
                    onChange={(e) => setDespatchNoticeData((prev) => ({ ...prev, stagingLocation: e.target.value }))}
                    placeholder="e.g., Mt Ousley road. On both sides"
                    rows={2}
                    className="bg-white mt-1"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="loadingInstructions" className="text-sm font-medium">
                    Loading Instructions
                  </Label>
                  <Textarea
                    id="loadingInstructions"
                    value={despatchNoticeData.loadingInstructions}
                    onChange={(e) =>
                      setDespatchNoticeData((prev) => ({ ...prev, loadingInstructions: e.target.value }))
                    }
                    placeholder="Please follow the VMP attached for loading. Include paperwork requirements..."
                    rows={3}
                    className="bg-white mt-1"
                  />
                </div>

                {/* Additional Information Section */}
                <div className="space-y-4 col-span-2">
                  <h3 className="font-semibold text-lg">Additional Information</h3>
                  <Textarea
                    placeholder="Add any additional notes, special instructions, or important information for this despatch notice..."
                    value={despatchNoticeData.additionalNotes || ""}
                    onChange={(e) =>
                      setDespatchNoticeData({
                        ...despatchNoticeData,
                        additionalNotes: e.target.value,
                      })
                    }
                    className="min-h-[120px] bg-white"
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="ppeRequirements" className="text-sm font-medium">
                    PPE Equipment Requirements
                  </Label>
                  <Textarea
                    id="ppeRequirements"
                    value={despatchNoticeData.ppeRequirements}
                    onChange={(e) => setDespatchNoticeData((prev) => ({ ...prev, ppeRequirements: e.target.value }))}
                    placeholder="Long sleeve shirts, hard hats, eye protection, gloves, steel cap boots, long pants..."
                    rows={3}
                    className="bg-white mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Attachments Section */}
            <div className="space-y-4 p-6 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-lg">Attachments</h3>
              <div className="p-4 bg-white border border-slate-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <Input id="file-upload" type="file" multiple onChange={handleFileUpload} className="hidden" />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Upload VMP, site maps, or other relevant documents
                  </span>
                </div>
                {despatchNoticeData.attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {despatchNoticeData.attachments.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                        <span className="text-sm">{file}</span>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeAttachment(idx)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Driver Response Status */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Driver Responses</h3>
              <div className="p-4 border border-slate-200 rounded-lg">
                <div className="grid grid-cols-2 gap-3">
                  {despatchNoticeJob?.drivers.map((driver, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 ${
                          driver.status === "accepted"
                            ? "bg-green-500"
                            : driver.status === "pending"
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium text-sm">{driver.truck}</p>
                        <p className="text-xs text-slate-500">{driver.name}</p>
                        <p className="text-xs text-slate-500">{driver.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Drivers will receive this despatch notice via the Driver App and can Accept or Reject the job.
                </p>
              </div>
            </div>

            {/* Activity Log */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Activity Log</h3>
              <div className="p-4 border border-slate-200 rounded-lg bg-slate-50/50">
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {/* Mock activity log entries - in production, these would come from database */}
                  <div className="flex items-start gap-3 text-sm p-3 bg-white rounded border border-slate-100">
                    <Clock className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-slate-700">
                        <span className="font-medium">Staging Location</span> updated by{" "}
                        <span className="font-medium">Sarah Johnson</span>
                      </p>
                      <p className="text-slate-500 text-xs mt-1">15/01/2024 at 14:32</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm p-3 bg-white rounded border border-slate-100">
                    <Clock className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-slate-700">
                        <span className="font-medium">Loading Time</span> updated by{" "}
                        <span className="font-medium">Michael Chen</span>
                      </p>
                      <p className="text-slate-500 text-xs mt-1">15/01/2024 at 13:15</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm p-3 bg-white rounded border border-slate-100">
                    <Clock className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-slate-700">
                        <span className="font-medium">Despatch Notice</span> created by{" "}
                        <span className="font-medium">Sarah Johnson</span>
                      </p>
                      <p className="text-slate-500 text-xs mt-1">14/01/2024 at 16:45</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDespatchNoticeJob(null)}>
              Cancel
            </Button>
            <Button variant="outline" onClick={handleSaveDespatchNotice}>
              Save & Exit
            </Button>
            <Button onClick={handleSaveDespatchNotice} className="bg-teal-600 hover:bg-teal-700">
              Save & Send Update to Drivers
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Job Messages Modal */}
      {selectedJob && (
        <JobMessagesModal
          open={isMessagesModalOpen}
          onOpenChange={(open) => {
            setIsMessagesModalOpen(open)
            if (!open) setSelectedJob(null) // Clear selectedJob when modal closes
          }}
          jobId={selectedJob.id}
          jobTitle={selectedJob.jobNumber} // Use jobNumber for jobTitle as it's more specific
          drivers={selectedJob.drivers || []} // Pass the drivers array
          messages={[
            // Mock messages - these would ideally be fetched or managed dynamically
            {
              id: "msg1",
              sender: selectedJob.drivers?.[0]?.name || "System",
              senderType: selectedJob.drivers?.[0]?.name ? "driver" : "admin",
              driverTruck: selectedJob.drivers?.[0]?.truck,
              message: "En route to pickup. ETA 20 minutes.",
              timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
            },
            {
              id: "msg2",
              sender: "Admin",
              senderType: "admin",
              recipientType: "single", // Assuming messages can be sent to specific drivers
              recipientName: selectedJob.drivers?.[0]?.name,
              message: "Acknowledged. Please update status upon arrival.",
              timestamp: new Date(Date.now() - 35 * 60 * 1000), // 35 minutes ago
            },
            {
              id: "msg3",
              sender: selectedJob.drivers?.[0]?.name || "System",
              senderType: selectedJob.drivers?.[0]?.name ? "driver" : "admin",
              driverTruck: selectedJob.drivers?.[0]?.truck,
              message: "Arrived at pickup location. Commencing loading.",
              timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
            },
]}
          />
        )}

        {/* View Documents Modal - Full Screen 3-Column Layout */}
        <Dialog open={isViewDocumentsOpen} onOpenChange={setIsViewDocumentsOpen}>
          <DialogContent className="!max-w-[98vw] w-full !h-[95vh] max-h-[95vh] p-0 gap-0 flex flex-col">
            <DialogHeader className="px-6 py-4 border-b shrink-0">
              <DialogTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-teal-600" />
                  <span>Job Documents - {viewDocumentsJob?.jobNumber}</span>
                </div>
                <Badge variant="outline" className="ml-4">
                  {viewDocumentsJob?.clientName}
                </Badge>
              </DialogTitle>
              <DialogDescription>
                View dockets, images, videos, and attachments submitted by drivers via the Mobile App.
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 grid grid-cols-[280px_1fr_1fr] divide-x divide-border overflow-hidden">
              {/* Column 1: Trucks List */}
              <div className="flex flex-col bg-muted/30">
                <div className="px-4 py-3 border-b bg-muted/50 shrink-0">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Accepted Trucks
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {viewDocumentsJob && getAcceptedTrucksWithDocs(viewDocumentsJob).length} trucks with accepted status
                  </p>
                </div>
                <ScrollArea className="flex-1">
                  <div className="p-2 space-y-1">
                    {viewDocumentsJob && getAcceptedTrucksWithDocs(viewDocumentsJob).map((truck) => (
                      <button
                        key={truck.registration}
                        onClick={() => {
                          setSelectedTruckForDocs(truck.registration)
                          setSelectedDocument(null)
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedTruckForDocs === truck.registration
                            ? "bg-teal-100 border border-teal-300"
                            : "hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full ${truckStatusColors[truck.status as keyof typeof truckStatusColors] || "bg-gray-400"}`} />
                            <span className="font-mono font-medium text-sm">{truck.registration}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {truck.documentsCount}
                          </Badge>
                        </div>
                        <div className="mt-1.5 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {truck.driverName}
                          </div>
                          <div className="mt-0.5 capitalize">{truck.truckType}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Column 2: Documents List */}
              <div className="flex flex-col">
                <div className="px-4 py-3 border-b bg-muted/50 shrink-0 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Documents & Attachments
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {selectedTruckForDocs && viewDocumentsJob
                        ? `${getTruckDocuments(viewDocumentsJob.id, selectedTruckForDocs).length} files from ${selectedTruckForDocs}`
                        : "Select a truck to view documents"}
                    </p>
                  </div>
                  {selectedTruckForDocs && viewDocumentsJob && getTruckDocuments(viewDocumentsJob.id, selectedTruckForDocs).length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => handleDownloadAll(viewDocumentsJob.id, selectedTruckForDocs)}
                    >
                      <Download className="h-3 w-3" />
                      Download All
                    </Button>
                  )}
                </div>
                <ScrollArea className="flex-1">
                  {selectedTruckForDocs && viewDocumentsJob ? (
                    getTruckDocuments(viewDocumentsJob.id, selectedTruckForDocs).length > 0 ? (
                      <div className="p-3 space-y-2">
                        {getTruckDocuments(viewDocumentsJob.id, selectedTruckForDocs).map((doc) => (
                          <button
                            key={doc.id}
                            onClick={() => setSelectedDocument(doc)}
                            className={`w-full text-left p-3 rounded-lg border transition-colors ${
                              selectedDocument?.id === doc.id
                                ? "bg-teal-50 border-teal-300"
                                : "bg-background hover:bg-muted border-border"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg ${
                                doc.type === "docket" ? "bg-blue-100 text-blue-600" :
                                doc.type === "image" ? "bg-green-100 text-green-600" :
                                doc.type === "video" ? "bg-purple-100 text-purple-600" :
                                "bg-gray-100 text-gray-600"
                              }`}>
                                {getDocumentIcon(doc.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm truncate">{doc.name}</div>
                                <div className="text-xs text-muted-foreground mt-0.5">{doc.fileName}</div>
                                <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                                  <span>{doc.size}</span>
                                  <span>{doc.uploadedAt}</span>
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                        <FileText className="h-12 w-12 text-muted-foreground/30 mb-3" />
                        <p className="text-sm text-muted-foreground">No documents uploaded yet</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Documents will appear here once the driver submits them via the Mobile App
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                      <Truck className="h-12 w-12 text-muted-foreground/30 mb-3" />
                      <p className="text-sm text-muted-foreground">Select a truck from the list</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        View all dockets and attachments submitted by the driver
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </div>

              {/* Column 3: Preview */}
              <div className="flex flex-col bg-muted/20 overflow-hidden">
                <div className="px-4 py-3 border-b bg-muted/50 shrink-0 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-sm">Preview</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {selectedDocument ? selectedDocument.name : "Select a document to preview"}
                    </p>
                  </div>
                  {selectedDocument && (
                    <Button
                      variant="default"
                      size="sm"
                      className="gap-1 bg-teal-600 hover:bg-teal-700"
                      onClick={() => handleDownload(selectedDocument)}
                    >
                      <Download className="h-3 w-3" />
                      Download
                    </Button>
                  )}
                </div>
                <ScrollArea className="flex-1">
                  <div className="p-4">
                  {selectedDocument ? (
                    <div className="w-full flex flex-col gap-4">
                      {/* Preview Content */}
                      <div className="flex items-center justify-center bg-white rounded-lg border shadow-sm overflow-hidden" style={{ minHeight: "300px", maxHeight: "400px" }}>
                        {selectedDocument.type === "image" ? (
                          <img
                            src={selectedDocument.previewUrl}
                            alt={selectedDocument.name}
                            className="max-w-full max-h-[400px] object-contain"
                          />
                        ) : selectedDocument.type === "video" ? (
                          <div className="flex flex-col items-center justify-center p-8">
                            <Video className="h-16 w-16 text-purple-400 mb-4" />
                            <p className="text-sm font-medium">{selectedDocument.fileName}</p>
                            <p className="text-xs text-muted-foreground mt-1">{selectedDocument.size}</p>
                            <Button
                              className="mt-4 gap-2"
                              variant="outline"
                              onClick={() => handleDownload(selectedDocument)}
                            >
                              <Download className="h-4 w-4" />
                              Download to View
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-8">
                            <FileText className="h-16 w-16 text-blue-400 mb-4" />
                            <p className="text-sm font-medium">{selectedDocument.fileName}</p>
                            <p className="text-xs text-muted-foreground mt-1">{selectedDocument.size}</p>
                            <Button
                              className="mt-4 gap-2"
                              variant="outline"
                              onClick={() => handleDownload(selectedDocument)}
                            >
                              <Download className="h-4 w-4" />
                              Download to View
                            </Button>
                          </div>
                        )}
                      </div>
                      {/* Document Details */}
                      <div className="p-4 bg-background rounded-lg border">
                        <h4 className="font-medium text-sm mb-3">Document Details</h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground text-xs">File Name</span>
                            <p className="font-medium">{selectedDocument.fileName}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground text-xs">File Size</span>
                            <p className="font-medium">{selectedDocument.size}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground text-xs">Uploaded By</span>
                            <p className="font-medium">{selectedDocument.uploadedBy}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground text-xs">Upload Date</span>
                            <p className="font-medium">{selectedDocument.uploadedAt}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-20">
                      <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
                        <FileText className="h-10 w-10 text-muted-foreground/50" />
                      </div>
                      <p className="text-sm text-muted-foreground">No document selected</p>
                      <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">
                        Click on a document from the list to preview it here
                      </p>
                    </div>
                  )}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
