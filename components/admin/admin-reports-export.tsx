"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Settings } from "lucide-react"
import { useState } from "react"

export function AdminReportsExport() {
  const [selectedReports, setSelectedReports] = useState<string[]>([])
  const [exportFormat, setExportFormat] = useState("pdf")
  const [isExporting, setIsExporting] = useState(false)

  const availableReports = [
    {
      id: "financial",
      name: "Financial Summary",
      description: "Revenue, expenses, and profit analysis",
      size: "2.4 MB",
    },
    {
      id: "operational",
      name: "Operational Report",
      description: "Job completion rates and efficiency metrics",
      size: "1.8 MB",
    },
    {
      id: "compliance",
      name: "Compliance Audit",
      description: "ISO 9001 compliance status and certifications",
      size: "3.1 MB",
    },
    {
      id: "fleet",
      name: "Fleet Performance",
      description: "Vehicle utilisation and maintenance records",
      size: "2.7 MB",
    },
    {
      id: "client",
      name: "Client Analytics",
      description: "Customer satisfaction and retention metrics",
      size: "1.5 MB",
    },
    { id: "safety", name: "Safety Report", description: "Incident reports and safety compliance", size: "2.2 MB" },
  ]

  const handleReportToggle = (reportId: string) => {
    setSelectedReports((prev) => (prev.includes(reportId) ? prev.filter((id) => id !== reportId) : [...prev, reportId]))
  }

  const handleExport = async () => {
    setIsExporting(true)
    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsExporting(false)
    // In real implementation, this would trigger the actual export
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground flex items-center space-x-2">
          <Download className="h-5 w-5" />
          <span>Export Reports</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">Generate and download comprehensive business reports</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Selection */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-foreground">Select Reports</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedReports(availableReports.map((r) => r.id))}
                className="bg-transparent"
              >
                Select All
              </Button>
            </div>

            <div className="space-y-3">
              {availableReports.map((report) => (
                <div key={report.id} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50">
                  <Checkbox
                    id={report.id}
                    checked={selectedReports.includes(report.id)}
                    onCheckedChange={() => handleReportToggle(report.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <label htmlFor={report.id} className="text-sm font-medium text-foreground cursor-pointer">
                        {report.name}
                      </label>
                      <Badge variant="outline" className="text-xs">
                        {report.size}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{report.description}</p>
                  </div>
                  <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                </div>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Export Options</h4>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground">Format</label>
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                    <SelectItem value="csv">CSV Data</SelectItem>
                    <SelectItem value="json">JSON Data</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Include</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="charts" defaultChecked />
                    <label htmlFor="charts" className="text-xs">
                      Charts & Graphs
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="raw-data" />
                    <label htmlFor="raw-data" className="text-xs">
                      Raw Data Tables
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="summary" defaultChecked />
                    <label htmlFor="summary" className="text-xs">
                      Executive Summary
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <Button
                  onClick={handleExport}
                  disabled={selectedReports.length === 0 || isExporting}
                  className="w-full"
                >
                  {isExporting ? (
                    <>
                      <Settings className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Export {selectedReports.length} Report{selectedReports.length !== 1 ? "s" : ""}
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    {selectedReports.length} of {availableReports.length} reports selected
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
