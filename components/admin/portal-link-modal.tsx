"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Link2, 
  Copy, 
  Check, 
  RefreshCw, 
  Shield, 
  Clock, 
  Eye, 
  Trash2, 
  Mail, 
  ExternalLink,
  AlertCircle,
  ArrowLeft,
  MapPin,
  Truck,
  Calendar,
  ChevronRight,
  Package,
  User,
  FileText,
  Download
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface PortalLinkModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  entityType: "client" | "subcontractor"
  entityId: string
  entityName: string
  existingLink?: {
    token: string
    createdAt: string
    expiresAt: string | null
    pinProtected: boolean
    lastAccessed: string | null
    accessCount: number
    isActive: boolean
  } | null
}

function generateToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 24; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function PortalLinkModal({ 
  open, 
  onOpenChange, 
  entityType, 
  entityId, 
  entityName,
  existingLink: initialExistingLink 
}: PortalLinkModalProps) {
  const [copied, setCopied] = useState(false)
  const [expiryOption, setExpiryOption] = useState<string>("30")
  const [pinProtection, setPinProtection] = useState(false)
  const [pin, setPin] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [existingLink, setExistingLink] = useState(initialExistingLink)
  const [showPreview, setShowPreview] = useState(false)
  
  // Generate mock link data
  const [linkData, setLinkData] = useState<{
    token: string
    createdAt: string
    expiresAt: string | null
    pinProtected: boolean
    lastAccessed: string | null
    accessCount: number
    isActive: boolean
  } | null>(initialExistingLink || null)

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const portalUrl = linkData ? `${baseUrl}/portal/view/${linkData.token}` : ''

  const handleCopyLink = async () => {
    if (portalUrl) {
      await navigator.clipboard.writeText(portalUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleGenerateLink = () => {
    setIsGenerating(true)
    
    // Simulate API call
    setTimeout(() => {
      const now = new Date()
      const expiryDate = expiryOption === "never" 
        ? null 
        : new Date(now.getTime() + parseInt(expiryOption) * 24 * 60 * 60 * 1000)
      
      const newLinkData = {
        token: generateToken(),
        createdAt: now.toISOString(),
        expiresAt: expiryDate?.toISOString() || null,
        pinProtected: pinProtection,
        lastAccessed: null,
        accessCount: 0,
        isActive: true
      }
      
      setLinkData(newLinkData)
      setExistingLink(newLinkData)
      setIsGenerating(false)
    }, 1000)
  }

  const handleRegenerateLink = () => {
    setLinkData(null)
    handleGenerateLink()
  }

  const handleRevokeLink = () => {
    setLinkData(null)
    setExistingLink(null)
  }

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Your Job Portal Access - ${entityName}`)
    const body = encodeURIComponent(
      `Hello,\n\nYou can access your job tracking portal using the following link:\n\n${portalUrl}\n\n${
        linkData?.pinProtected ? `PIN: ${pin}\n\n` : ''
      }This link ${linkData?.expiresAt ? `expires on ${new Date(linkData.expiresAt).toLocaleDateString()}` : 'does not expire'}.\n\nBest regards,\nNJ Ashton Transport`
    )
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Mock jobs for preview
  const previewJobs = [
    {
      id: "JOB-2024-001",
      status: "in-transit",
      pickup: "Boral Quarry, Maroota",
      delivery: "Sydney Metro Site, CBD",
      scheduledDate: "2024-01-15",
      eta: "10:30 AM",
      driver: "Mike Johnson",
      vehicle: "TRK-001",
      progress: 65
    },
    {
      id: "JOB-2024-002", 
      status: "scheduled",
      pickup: "Hanson Concrete, Silverwater",
      delivery: "Westfield Construction, Parramatta",
      scheduledDate: "2024-01-15",
      eta: "2:00 PM",
      driver: "Sarah Wilson",
      vehicle: "TRK-003",
      progress: 0
    },
    {
      id: "JOB-2024-003",
      status: "completed",
      pickup: "Holcim Plant, Berrima",
      delivery: "Residential Site, Campbelltown",
      scheduledDate: "2024-01-14",
      eta: "Delivered",
      driver: "Tom Anderson",
      vehicle: "TRK-002",
      progress: 100
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-transit": return "bg-blue-100 text-blue-700 border-blue-200"
      case "scheduled": return "bg-amber-100 text-amber-700 border-amber-200"
      case "completed": return "bg-green-100 text-green-700 border-green-200"
      default: return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "in-transit": return "In Transit"
      case "scheduled": return "Scheduled"
      case "completed": return "Completed"
      default: return status
    }
  }

  // Preview Modal Content
  if (showPreview) {
    return (
      <Dialog open={open} onOpenChange={(isOpen) => {
        if (!isOpen) {
          setShowPreview(false)
        }
        onOpenChange(isOpen)
      }}>
        <DialogContent className="max-w-md p-0 gap-0 overflow-hidden">
          {/* Mobile Preview Frame */}
          <div className="bg-gray-900 px-4 py-2 flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/10 gap-2 -ml-2"
              onClick={() => setShowPreview(false)}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <span className="text-white/70 text-xs">Mobile Preview</span>
            <div className="w-16" />
          </div>

          {/* Mobile Screen Content */}
          <ScrollArea className="h-[500px] bg-gray-50">
            <div className="p-4 space-y-4">
              {/* Header */}
              <div className="text-center space-y-1 pb-4 border-b">
                <div className="h-12 w-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h2 className="font-bold text-lg">{entityName}</h2>
                <p className="text-sm text-muted-foreground">Job Tracking Portal</p>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2">
                <Badge variant="default" className="cursor-pointer">All (3)</Badge>
                <Badge variant="outline" className="cursor-pointer bg-transparent">Active (2)</Badge>
                <Badge variant="outline" className="cursor-pointer bg-transparent">Completed (1)</Badge>
              </div>

              {/* Jobs List */}
              <div className="space-y-3">
                {previewJobs.map((job) => (
                  <Card key={job.id} className="overflow-hidden">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-sm">{job.id}</p>
                          <Badge 
                            variant="outline" 
                            className={`mt-1 text-xs ${getStatusColor(job.status)}`}
                          >
                            {getStatusLabel(job.status)}
                          </Badge>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">Pickup</p>
                            <p className="font-medium">{job.pickup}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">Delivery</p>
                            <p className="font-medium">{job.delivery}</p>
                          </div>
                        </div>
                      </div>

                      {job.status === "in-transit" && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{job.progress}%</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full transition-all"
                              style={{ width: `${job.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {job.scheduledDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {job.eta}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Footer */}
              <div className="text-center pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  Powered by NJ Ashton Transport
                </p>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-primary" />
            Portal Link Management
          </DialogTitle>
          <DialogDescription>
            Generate a secure link for <span className="font-medium text-foreground">{entityName}</span> to view their jobs
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Existing Link Status */}
          {linkData && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium">Active Link</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {linkData.accessCount} views
                  </Badge>
                </div>

                {/* Link URL */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Portal URL</Label>
                  <div className="flex gap-2">
                    <Input 
                      readOnly 
                      value={portalUrl} 
                      className="text-xs font-mono bg-background"
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={handleCopyLink}
                      className="shrink-0 bg-transparent"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Link Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Created</p>
                    <p className="font-medium">{formatDate(linkData.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Expires</p>
                    <p className="font-medium">
                      {linkData.expiresAt 
                        ? formatDate(linkData.expiresAt)
                        : 'Never'
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Last Accessed</p>
                    <p className="font-medium">
                      {linkData.lastAccessed 
                        ? formatDate(linkData.lastAccessed)
                        : 'Never'
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Security</p>
                    <p className="font-medium flex items-center gap-1">
                      {linkData.pinProtected ? (
                        <>
                          <Shield className="h-3 w-3 text-green-600" />
                          PIN Protected
                        </>
                      ) : (
                        'Open Access'
                      )}
                    </p>
                  </div>
                </div>

                {/* Share Actions */}
                <div className="flex gap-2 pt-2 border-t">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 gap-2 bg-transparent"
                    onClick={handleSendEmail}
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 gap-2 bg-transparent"
                    onClick={() => setShowPreview(true)}
                  >
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                </div>

                {/* Link Actions */}
                <div className="flex gap-2 pt-2 border-t">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 gap-2 bg-transparent"
                    onClick={handleRegenerateLink}
                  >
                    <RefreshCw className="h-4 w-4" />
                    Regenerate
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="flex-1 gap-2"
                    onClick={handleRevokeLink}
                  >
                    <Trash2 className="h-4 w-4" />
                    Revoke Access
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Generate New Link */}
          {!linkData && (
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg border border-dashed">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Link2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">No Active Portal Link</p>
                    <p className="text-sm text-muted-foreground">Generate a link to share job tracking access</p>
                  </div>
                </div>

                {/* Link Settings */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Link Expiry</Label>
                    <Select value={expiryOption} onValueChange={setExpiryOption}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="never">Never expires</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>PIN Protection</Label>
                      <p className="text-xs text-muted-foreground">Require a PIN to access the portal</p>
                    </div>
                    <Switch 
                      checked={pinProtection} 
                      onCheckedChange={setPinProtection}
                    />
                  </div>

                  {pinProtection && (
                    <div className="space-y-2">
                      <Label>Set PIN (4-6 digits)</Label>
                      <Input 
                        type="text"
                        maxLength={6}
                        placeholder="Enter PIN"
                        value={pin}
                        onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="font-mono tracking-widest"
                      />
                    </div>
                  )}
                </div>
              </div>

              <Button 
                className="w-full gap-2" 
                onClick={handleGenerateLink}
                disabled={isGenerating || (pinProtection && pin.length < 4)}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Link2 className="h-4 w-4" />
                    Generate Portal Link
                  </>
                )}
              </Button>
            </div>
          )}

          {/* What They Can See */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              What they can see
            </Label>
            <div className="p-3 bg-muted/50 rounded-lg space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Jobs list and status</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Delivery details and ETAs</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Driver and vehicle information</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>Proof of delivery documents</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <AlertCircle className="h-4 w-4" />
                <span>No financial or rate information</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
