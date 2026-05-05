"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Eye, Download, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { useState } from "react"

export function AdminSystemSecurity() {
  const [auditLogs] = useState([
    {
      id: "1",
      timestamp: "2024-01-15 14:32:15",
      user: "admin@njashton.com.au",
      action: "User Login",
      resource: "Admin Portal",
      status: "success",
      ip: "203.123.45.67",
      details: "Successful authentication",
    },
    {
      id: "2",
      timestamp: "2024-01-15 14:28:42",
      user: "sarah.johnson@company.com",
      action: "Invoice Created",
      resource: "INV-2024-156",
      status: "success",
      ip: "192.168.1.45",
      details: "New invoice generated",
    },
    {
      id: "3",
      timestamp: "2024-01-15 14:15:33",
      user: "system",
      action: "Backup Completed",
      resource: "Database",
      status: "success",
      ip: "127.0.0.1",
      details: "Automated daily backup",
    },
    {
      id: "4",
      timestamp: "2024-01-15 13:45:21",
      user: "unknown",
      action: "Failed Login",
      resource: "Admin Portal",
      status: "failed",
      ip: "45.123.67.89",
      details: "Invalid credentials - 3 attempts",
    },
    {
      id: "5",
      timestamp: "2024-01-15 13:22:18",
      user: "mike.wilson@company.com",
      action: "Job Updated",
      resource: "JOB-2024-089",
      status: "success",
      ip: "192.168.1.78",
      details: "Status changed to completed",
    },
  ])

  const securityMetrics = [
    { label: "Failed Login Attempts", value: "12", status: "warning", period: "Last 24h" },
    { label: "Active Sessions", value: "28", status: "normal", period: "Current" },
    { label: "Security Alerts", value: "2", status: "warning", period: "This week" },
    { label: "Last Security Scan", value: "2h ago", status: "normal", period: "Automated" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge variant="default" className="text-xs">
            Success
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="destructive" className="text-xs">
            Failed
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            Pending
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Security Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {securityMetrics.map((metric) => (
              <div key={metric.label} className="p-4 rounded-lg border bg-muted/20">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-foreground">{metric.label}</p>
                  <Badge variant={metric.status === "warning" ? "destructive" : "default"} className="text-xs">
                    {metric.status}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                <p className="text-xs text-muted-foreground">{metric.period}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-card-foreground flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Audit Logs</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">System activity and security events</p>
          </div>
          <Button variant="outline" size="sm" className="bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                  <TableCell className="text-sm">{log.user}</TableCell>
                  <TableCell className="text-sm">{log.action}</TableCell>
                  <TableCell className="text-sm font-mono">{log.resource}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(log.status)}
                      {getStatusBadge(log.status)}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{log.ip}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{log.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
