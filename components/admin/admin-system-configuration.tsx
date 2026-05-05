"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Settings, Save } from "lucide-react"
import { useState } from "react"

export function AdminSystemConfiguration() {
  const [config, setConfig] = useState({
    companyName: "NJ Ashton Business Operations",
    timezone: "Australia/Sydney",
    currency: "AUD",
    dateFormat: "DD/MM/YYYY",
    autoBackup: true,
    maintenanceMode: false,
    debugMode: false,
    apiRateLimit: "1000",
    sessionTimeout: "30",
    maxFileSize: "10",
    notificationEmail: "admin@njashton.com.au",
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>System Configuration</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">Core system settings and preferences</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={config.companyName}
              onChange={(e) => setConfig((prev) => ({ ...prev, companyName: e.target.value }))}
              className="bg-background"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={config.timezone}
                onValueChange={(value) => setConfig((prev) => ({ ...prev, timezone: value }))}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Australia/Sydney">Australia/Sydney</SelectItem>
                  <SelectItem value="Australia/Melbourne">Australia/Melbourne</SelectItem>
                  <SelectItem value="Australia/Brisbane">Australia/Brisbane</SelectItem>
                  <SelectItem value="Australia/Perth">Australia/Perth</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={config.currency}
                onValueChange={(value) => setConfig((prev) => ({ ...prev, currency: value }))}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">System Preferences</h4>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoBackup">Automatic Backups</Label>
                  <p className="text-xs text-muted-foreground">Daily system backups at 2:00 AM</p>
                </div>
                <Switch
                  id="autoBackup"
                  checked={config.autoBackup}
                  onCheckedChange={(checked) => setConfig((prev) => ({ ...prev, autoBackup: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                  <p className="text-xs text-muted-foreground">Restrict system access for maintenance</p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={config.maintenanceMode}
                  onCheckedChange={(checked) => setConfig((prev) => ({ ...prev, maintenanceMode: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="debugMode">Debug Mode</Label>
                  <p className="text-xs text-muted-foreground">Enable detailed error logging</p>
                </div>
                <Switch
                  id="debugMode"
                  checked={config.debugMode}
                  onCheckedChange={(checked) => setConfig((prev) => ({ ...prev, debugMode: checked }))}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="apiRateLimit">API Rate Limit</Label>
              <Input
                id="apiRateLimit"
                value={config.apiRateLimit}
                onChange={(e) => setConfig((prev) => ({ ...prev, apiRateLimit: e.target.value }))}
                className="bg-background"
                placeholder="1000"
              />
              <p className="text-xs text-muted-foreground">Requests per hour</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout</Label>
              <Input
                id="sessionTimeout"
                value={config.sessionTimeout}
                onChange={(e) => setConfig((prev) => ({ ...prev, sessionTimeout: e.target.value }))}
                className="bg-background"
                placeholder="30"
              />
              <p className="text-xs text-muted-foreground">Minutes</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxFileSize">Max File Size</Label>
              <Input
                id="maxFileSize"
                value={config.maxFileSize}
                onChange={(e) => setConfig((prev) => ({ ...prev, maxFileSize: e.target.value }))}
                className="bg-background"
                placeholder="10"
              />
              <p className="text-xs text-muted-foreground">MB</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <Button onClick={handleSave} disabled={isSaving} className="w-full">
            {isSaving ? (
              <>
                <Settings className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Configuration
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
