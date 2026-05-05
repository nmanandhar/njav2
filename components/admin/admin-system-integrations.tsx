"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Globe, Settings, CheckCircle, AlertTriangle, XCircle } from "lucide-react"
import { useState } from "react"

export function AdminSystemIntegrations() {
  const [integrations, setIntegrations] = useState([
    { id: "stripe", name: "Stripe Payments", status: "connected", enabled: true, description: "Payment processing" },
    { id: "xero", name: "Xero Accounting", status: "connected", enabled: true, description: "Financial management" },
    { id: "twilio", name: "Twilio SMS", status: "connected", enabled: false, description: "SMS notifications" },
    { id: "mailgun", name: "Mailgun Email", status: "connected", enabled: true, description: "Email delivery" },
    { id: "google", name: "Google Maps", status: "connected", enabled: true, description: "Location services" },
    { id: "slack", name: "Slack Notifications", status: "error", enabled: false, description: "Team communication" },
    {
      id: "zapier",
      name: "Zapier Automation",
      status: "disconnected",
      enabled: false,
      description: "Workflow automation",
    },
    { id: "aws", name: "AWS Storage", status: "connected", enabled: true, description: "File storage" },
  ])

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id ? { ...integration, enabled: !integration.enabled } : integration,
      ),
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "disconnected":
        return <XCircle className="h-4 w-4 text-gray-400" />
      default:
        return <Globe className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Badge variant="default" className="text-xs">
            Connected
          </Badge>
        )
      case "error":
        return (
          <Badge variant="destructive" className="text-xs">
            Error
          </Badge>
        )
      case "disconnected":
        return (
          <Badge variant="outline" className="text-xs">
            Disconnected
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            Unknown
          </Badge>
        )
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground flex items-center space-x-2">
          <Globe className="h-5 w-5" />
          <span>Integrations</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">Manage third-party service connections</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50"
            >
              <div className="flex items-center space-x-3">
                {getStatusIcon(integration.status)}
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-foreground">{integration.name}</p>
                    {getStatusBadge(integration.status)}
                  </div>
                  <p className="text-xs text-muted-foreground">{integration.description}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={integration.enabled}
                  onCheckedChange={() => toggleIntegration(integration.id)}
                  disabled={integration.status === "disconnected" || integration.status === "error"}
                />
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t">
          <Button variant="outline" className="w-full bg-transparent">
            <Globe className="h-4 w-4 mr-2" />
            Add New Integration
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
