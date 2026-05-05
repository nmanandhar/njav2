"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Shield, MessageSquare, Smartphone, Save } from "lucide-react"

interface OperatorSettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  operator: {
    id: string
    name: string
    email: string
    phone: string
  }
}

export function OperatorSettingsDialog({ open, onOpenChange, operator }: OperatorSettingsDialogProps) {
  // Notification Preferences State
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [jobAssignmentAlerts, setJobAssignmentAlerts] = useState(true)
  const [scheduleChangeAlerts, setScheduleChangeAlerts] = useState(true)
  const [machineryAlerts, setMachineryAlerts] = useState(true)
  const [complianceReminders, setComplianceReminders] = useState(true)

  // Access Permissions State
  const [portalAccess, setPortalAccess] = useState(true)
  const [mobileAppAccess, setMobileAppAccess] = useState(true)
  const [viewDocuments, setViewDocuments] = useState(true)
  const [submitTimesheets, setSubmitTimesheets] = useState(true)
  const [viewPayslips, setViewPayslips] = useState(true)
  const [logDefects, setLogDefects] = useState(true)

  // Communication Settings State
  const [preferredContact, setPreferredContact] = useState("email")
  const [emergencyContact, setEmergencyContact] = useState("+61 412 345 678")
  const [emergencyContactName, setEmergencyContactName] = useState("Jane Smith")
  const [availability, setAvailability] = useState("full-time")

  // Device Configuration State
  const [gpsTracking, setGpsTracking] = useState(true)
  const [autoCheckIn, setAutoCheckIn] = useState(true)
  const [offlineMode, setOfflineMode] = useState(true)
  const [dataSyncFrequency, setDataSyncFrequency] = useState("15min")

  const handleSave = () => {
    // Save settings logic would go here
    console.log("[v0] Saving operator settings", {
      operatorId: operator.id,
      notifications: {
        email: emailNotifications,
        sms: smsNotifications,
        push: pushNotifications,
      },
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Operator Settings</DialogTitle>
          <DialogDescription>
            Configure settings and preferences for {operator.name} ({operator.id})
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="notifications" className="text-xs">
              <Bell className="h-3 w-3 mr-1" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="permissions" className="text-xs">
              <Shield className="h-3 w-3 mr-1" />
              Permissions
            </TabsTrigger>
            <TabsTrigger value="communication" className="text-xs">
              <MessageSquare className="h-3 w-3 mr-1" />
              Communication
            </TabsTrigger>
            <TabsTrigger value="devices" className="text-xs">
              <Smartphone className="h-3 w-3 mr-1" />
              Devices
            </TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Notification Channels</CardTitle>
                <CardDescription>Choose how the operator receives notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send notifications to {operator.email}</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send SMS to {operator.phone}</p>
                  </div>
                  <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send push notifications to mobile app</p>
                  </div>
                  <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Alert Types</CardTitle>
                <CardDescription>Configure which alerts the operator should receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="job-alerts">Job Assignment Alerts</Label>
                    <p className="text-sm text-muted-foreground">New jobs and site updates</p>
                  </div>
                  <Switch id="job-alerts" checked={jobAssignmentAlerts} onCheckedChange={setJobAssignmentAlerts} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="schedule-alerts">Schedule Change Alerts</Label>
                    <p className="text-sm text-muted-foreground">Shift changes and roster updates</p>
                  </div>
                  <Switch
                    id="schedule-alerts"
                    checked={scheduleChangeAlerts}
                    onCheckedChange={setScheduleChangeAlerts}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="machinery-alerts">Machinery Maintenance Alerts</Label>
                    <p className="text-sm text-muted-foreground">Service schedules and machinery issues</p>
                  </div>
                  <Switch id="machinery-alerts" checked={machineryAlerts} onCheckedChange={setMachineryAlerts} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="compliance-alerts">Compliance Reminders</Label>
                    <p className="text-sm text-muted-foreground">License expiry, medical checks, certifications</p>
                  </div>
                  <Switch
                    id="compliance-alerts"
                    checked={complianceReminders}
                    onCheckedChange={setComplianceReminders}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Permissions Tab */}
          <TabsContent value="permissions" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">System Access</CardTitle>
                <CardDescription>Control what features and data the operator can access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="portal-access">Operator Portal Access</Label>
                    <p className="text-sm text-muted-foreground">Access to web-based operator portal</p>
                  </div>
                  <Switch id="portal-access" checked={portalAccess} onCheckedChange={setPortalAccess} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="mobile-access">Mobile App Access</Label>
                    <p className="text-sm text-muted-foreground">Access to mobile application</p>
                  </div>
                  <Switch id="mobile-access" checked={mobileAppAccess} onCheckedChange={setMobileAppAccess} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Feature Permissions</CardTitle>
                <CardDescription>Enable or disable specific features for this operator</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="view-documents">View Documents</Label>
                    <p className="text-sm text-muted-foreground">Access personal documents and certifications</p>
                  </div>
                  <Switch id="view-documents" checked={viewDocuments} onCheckedChange={setViewDocuments} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="submit-timesheets">Submit Timesheets</Label>
                    <p className="text-sm text-muted-foreground">Log hours and submit timesheet entries</p>
                  </div>
                  <Switch id="submit-timesheets" checked={submitTimesheets} onCheckedChange={setSubmitTimesheets} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="view-payslips">View Payslips</Label>
                    <p className="text-sm text-muted-foreground">Access payment history and payslips</p>
                  </div>
                  <Switch id="view-payslips" checked={viewPayslips} onCheckedChange={setViewPayslips} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="log-defects">Log Machinery Defects</Label>
                    <p className="text-sm text-muted-foreground">Report machinery issues and defects</p>
                  </div>
                  <Switch id="log-defects" checked={logDefects} onCheckedChange={setLogDefects} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Communication Tab */}
          <TabsContent value="communication" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Contact Preferences</CardTitle>
                <CardDescription>Configure how to best reach this operator</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="preferred-contact">Preferred Contact Method</Label>
                  <Select value={preferredContact} onValueChange={setPreferredContact}>
                    <SelectTrigger id="preferred-contact">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="app">Mobile App</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Work Availability</Label>
                  <Select value={availability} onValueChange={setAvailability}>
                    <SelectTrigger id="availability">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="on-call">On-call</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Emergency Contact</CardTitle>
                <CardDescription>Primary contact for emergencies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emergency-name">Emergency Contact Name</Label>
                  <Input
                    id="emergency-name"
                    value={emergencyContactName}
                    onChange={(e) => setEmergencyContactName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency-phone">Emergency Contact Phone</Label>
                  <Input
                    id="emergency-phone"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Devices Tab */}
          <TabsContent value="devices" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Mobile App Configuration</CardTitle>
                <CardDescription>Settings for the operator's mobile application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="gps-tracking">GPS Tracking</Label>
                    <p className="text-sm text-muted-foreground">Enable location tracking during shifts</p>
                  </div>
                  <Switch id="gps-tracking" checked={gpsTracking} onCheckedChange={setGpsTracking} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-checkin">Automatic Check-in</Label>
                    <p className="text-sm text-muted-foreground">Auto check-in when arriving at job sites</p>
                  </div>
                  <Switch id="auto-checkin" checked={autoCheckIn} onCheckedChange={setAutoCheckIn} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="offline-mode">Offline Mode</Label>
                    <p className="text-sm text-muted-foreground">Allow app to work without internet connection</p>
                  </div>
                  <Switch id="offline-mode" checked={offlineMode} onCheckedChange={setOfflineMode} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sync-frequency">Data Sync Frequency</Label>
                  <Select value={dataSyncFrequency} onValueChange={setDataSyncFrequency}>
                    <SelectTrigger id="sync-frequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="5min">Every 5 minutes</SelectItem>
                      <SelectItem value="15min">Every 15 minutes</SelectItem>
                      <SelectItem value="30min">Every 30 minutes</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Connected Devices</CardTitle>
                <CardDescription>Devices currently linked to this operator</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">Samsung Galaxy S23</p>
                      <p className="text-xs text-muted-foreground">Last active: 1 hour ago</p>
                    </div>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">iPad Pro</p>
                      <p className="text-xs text-muted-foreground">Last active: 5 days ago</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Inactive</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
