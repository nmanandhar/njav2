"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Clock, Truck, Users } from "lucide-react"

interface Driver {
  name: string
  type: "Internal" | "Subcontractor"
  truck: string
  phone: string
  status: string
}

interface Message {
  id: string
  sender: string
  senderType: "driver" | "admin"
  driverTruck?: string
  recipientType?: "single" | "all"
  recipientName?: string
  message: string
  timestamp: Date
}

interface JobMessagesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  jobId: string
  jobTitle: string
  drivers: Driver[]
  messages: Message[]
}

export function JobMessagesModal({ open, onOpenChange, jobId, jobTitle, drivers, messages }: JobMessagesModalProps) {
  const [replyText, setReplyText] = useState("")
  const [selectedRecipient, setSelectedRecipient] = useState<string>("all")

  const handleSendMessage = () => {
    if (replyText.trim()) {
      const recipientInfo =
        selectedRecipient === "all"
          ? "all drivers"
          : drivers.find((d) => d.name === selectedRecipient)?.name || "unknown"

      console.log("[v0] Sending message for job:", jobId, "to:", recipientInfo, "message:", replyText)
      setReplyText("")
      // In production, this would call an API to save the message to the database
      // The message would be associated with the job and recipient
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            Messages - {jobId}: {jobTitle}
          </DialogTitle>
          <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t">
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Truck className="h-4 w-4" />
              Drivers on this job:
            </div>
            {drivers.map((driver, idx) => (
              <Badge key={idx} variant="secondary" className="gap-1">
                {driver.name} ({driver.truck})
              </Badge>
            ))}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <div className="text-sm">No messages yet</div>
              <div className="text-xs mt-1">Start a conversation with the driver(s)</div>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.senderType === "admin" ? "flex-row-reverse" : ""}`}>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {msg.sender
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex-1 ${msg.senderType === "admin" ? "text-right" : ""}`}>
                  <div className={`flex items-center gap-2 mb-1 ${msg.senderType === "admin" ? "justify-end" : ""}`}>
                    <span className="text-sm font-semibold">
                      {msg.sender}
                      {msg.senderType === "driver" && msg.driverTruck && (
                        <span className="text-muted-foreground font-normal"> ({msg.driverTruck})</span>
                      )}
                    </span>
                    <Badge variant="outline" className="h-5 text-xs">
                      {msg.senderType === "driver" ? "Driver" : "Admin"}
                    </Badge>
                    {msg.senderType === "admin" && msg.recipientType && (
                      <Badge variant="secondary" className="h-5 text-xs gap-1">
                        {msg.recipientType === "all" ? (
                          <>
                            <Users className="h-3 w-3" />
                            To: All Drivers
                          </>
                        ) : (
                          <>To: {msg.recipientName}</>
                        )}
                      </Badge>
                    )}
                  </div>
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      msg.senderType === "admin"
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-accent-foreground"
                    }`}
                  >
                    {msg.message}
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {msg.timestamp.toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t pt-4 space-y-3">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium whitespace-nowrap">Send to:</label>
            <Select value={selectedRecipient} onValueChange={setSelectedRecipient}>
              <SelectTrigger className="w-[250px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    All Drivers ({drivers.length})
                  </div>
                </SelectItem>
                {drivers.map((driver, idx) => (
                  <SelectItem key={idx} value={driver.name}>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      {driver.name} ({driver.truck})
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Textarea
            placeholder={
              selectedRecipient === "all"
                ? "Type your message to all drivers..."
                : `Type your message to ${selectedRecipient}...`
            }
            rows={3}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button onClick={handleSendMessage} className="gap-2" disabled={!replyText.trim()}>
              <Send className="h-4 w-4" />
              {selectedRecipient === "all" ? "Send to All" : "Send Message"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
