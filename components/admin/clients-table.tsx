"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Check, X, Clock, Link2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

interface Client {
  id: string
  name: string
  contactName: string
  email: string
  phone: string
  address: string
  abn: string
  status: "Active" | "Pending" | "Expired"
  projects: number
  totalRevenue: string
  lastActivity: string
  hourlyRate: string
  travelHours: string
  perTonneRate: string
  loadRate: string
  gstApproved: "Approved" | "Pending Review" | "Rejected"
  creditTerms: string
  creditScore: number
  reviewStatus: "Approved" | "Pending Review" | "Rejected"
  managementApproval: "approved" | "pending" | "rejected"
}

interface ClientsTableProps {
  clients: Client[]
  handleViewClient: (client: Client) => void
  handleEditClient: (client: Client) => void
  handleGenerateLink?: (client: Client) => void
}

export function ClientsTable({ clients, handleViewClient, handleEditClient, handleGenerateLink }: ClientsTableProps) {
  return (
    <table className="w-full">
      <thead className="bg-muted/50">
        <tr>
          <th className="text-left p-4 font-medium text-sm">Client ID</th>
          <th className="text-left p-4 font-medium text-sm">Client Name</th>
          <th className="text-left p-4 font-medium text-sm">Location</th>
          <th className="text-left p-4 font-medium text-sm">Contact</th>
          <th className="text-left p-4 font-medium text-sm">GST Approved</th>
          <th className="text-left p-4 font-medium text-sm">Credit Terms</th>
          <th className="text-left p-4 font-medium text-sm">Credit Score</th>
          <th className="text-left p-4 font-medium text-sm">Management Approval</th>
          <th className="text-left p-4 font-medium text-sm">Projects</th>
          <th className="text-left p-4 font-medium text-sm">Revenue</th>
          <th className="text-left p-4 font-medium text-sm">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {clients.map((client) => (
          <tr key={client.id} className="hover:bg-muted/50">
            <td className="p-4">
              <span className="font-mono text-sm font-medium">{client.id}</span>
            </td>
            <td className="p-4">
              <div>
                <div className="font-medium">{client.name}</div>
                <div className="text-sm text-muted-foreground">ABN: {client.abn}</div>
              </div>
            </td>
            <td className="p-4">
              <div className="text-sm">{client.address}</div>
            </td>
            <td className="p-4">
              <div>
                <div className="text-sm font-medium">{client.contactName}</div>
                <div className="text-xs text-muted-foreground">{client.email}</div>
                <div className="text-xs text-muted-foreground">{client.phone}</div>
              </div>
            </td>
            <td className="p-4">
              {client.gstApproved === "Approved" ? (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                  <Check className="h-4 w-4 text-green-700" />
                </div>
              ) : (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                  <X className="h-4 w-4 text-red-700" />
                </div>
              )}
            </td>
            <td className="p-4">
              <Badge
                variant="outline"
                className={
                  client.creditTerms === "COD"
                    ? "border-amber-300 bg-amber-50 text-amber-800"
                    : "border-blue-300 bg-blue-50 text-blue-800"
                }
              >
                {client.creditTerms}
              </Badge>
            </td>
            <td className="p-4">
              {client.creditScore > 0 ? (
                <div className="flex items-center gap-2">
                  <div className="flex-1 max-w-[80px]">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          client.creditScore >= 80
                            ? "bg-green-500"
                            : client.creditScore >= 60
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${client.creditScore}%` }}
                      />
                    </div>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      client.creditScore >= 80
                        ? "text-green-700"
                        : client.creditScore >= 60
                          ? "text-amber-700"
                          : "text-red-700"
                    }`}
                  >
                    {client.creditScore}
                  </span>
                </div>
              ) : (
                <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                  Not Rated
                </Badge>
              )}
            </td>
            <td className="p-4">
              {client.managementApproval === "approved" ? (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                  <Check className="h-4 w-4 text-green-700" />
                </div>
              ) : client.managementApproval === "pending" ? (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100">
                  <Clock className="h-4 w-4 text-amber-700" />
                </div>
              ) : (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                  <X className="h-4 w-4 text-red-700" />
                </div>
              )}
            </td>
            <td className="p-4">
              <div className="text-sm">{client.projects}</div>
            </td>
            <td className="p-4">
              <div className="text-sm font-medium">{client.totalRevenue}</div>
            </td>
            <td className="p-4">
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => handleViewClient(client)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleEditClient(client)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleViewClient(client)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditClient(client)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Client
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => handleGenerateLink?.(client)}
                      className="text-primary"
                    >
                      <Link2 className="h-4 w-4 mr-2" />
                      Portal Link
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
