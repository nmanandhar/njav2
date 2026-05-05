"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send, MessageSquare, Clock, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock messages data - aligned with Admin Portal job messaging
const mockMessages = [
  {
    id: "1",
    jobId: "JOB-2024-001",
    jobTitle: "ABC Manufacturing - Industrial Delivery",
    threadId: "thread-1",
    lastMessage: "Please confirm ETA for pickup at 123 Industrial Ave",
    lastMessageFrom: "Admin",
    timestamp: new Date("2025-01-06T09:30:00"),
    unread: true,
    messages: [
      {
        id: "msg-1",
        sender: "Admin",
        senderType: "admin" as const,
        message: "Good morning! Please confirm your ETA for pickup at 123 Industrial Ave",
        timestamp: new Date("2025-01-06T09:30:00"),
      },
      {
        id: "msg-2",
        sender: "John Driver",
        senderType: "driver" as const,
        truckRego: "GHI-789",
        message: "Morning! ETA is 10:15 AM. Traffic is clear.",
        timestamp: new Date("2025-01-06T09:35:00"),
      },
      {
        id: "msg-3",
        sender: "Admin",
        senderType: "admin" as const,
        message: "Perfect, thanks for the update.",
        timestamp: new Date("2025-01-06T09:36:00"),
      },
    ],
  },
  {
    id: "2",
    jobId: "JOB-2024-003",
    jobTitle: "XYZ Logistics - Warehouse Transfer",
    threadId: "thread-2",
    lastMessage: "Any issues with the pickup location?",
    lastMessageFrom: "Admin",
    timestamp: new Date("2025-01-06T08:15:00"),
    unread: true,
    messages: [
      {
        id: "msg-4",
        sender: "Admin",
        senderType: "admin" as const,
        message: "Any issues with the pickup location?",
        timestamp: new Date("2025-01-06T08:15:00"),
      },
    ],
  },
  {
    id: "3",
    jobId: "JOB-2024-004",
    jobTitle: "Infrastructure Co - Highway Materials",
    threadId: "thread-3",
    lastMessage: "Delivery completed. POD signed by site manager.",
    lastMessageFrom: "John Driver",
    timestamp: new Date("2025-01-05T16:45:00"),
    unread: false,
    messages: [
      {
        id: "msg-5",
        sender: "Admin",
        senderType: "admin" as const,
        message: "Please send POD photo when delivery is complete",
        timestamp: new Date("2025-01-05T14:20:00"),
      },
      {
        id: "msg-6",
        sender: "John Driver",
        senderType: "driver" as const,
        truckRego: "GHI-789",
        message: "Delivery completed. POD signed by site manager.",
        timestamp: new Date("2025-01-05T16:45:00"),
      },
    ],
  },
]

export default function DriverMessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  const [filterUnread, setFilterUnread] = useState("all")

  const filteredMessages = mockMessages.filter((msg) => {
    if (filterUnread === "unread") return msg.unread
    return true
  })

  const unreadCount = mockMessages.filter((m) => m.unread).length
  const selectedConversation = mockMessages.find((m) => m.id === selectedMessage)

  const handleSendMessage = () => {
    if (replyText.trim() && selectedConversation) {
      console.log("[v0] Sending message for job:", selectedConversation.jobId, "message:", replyText)
      // In production, this would call an API to send the message
      setReplyText("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center gap-3 p-4">
          <Link href="/mobile-app/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold text-foreground">Messages</h1>
            <p className="text-xs text-muted-foreground">Chat with dispatch team</p>
          </div>
          {unreadCount > 0 && (
            <Badge variant="default" className="h-6">
              {unreadCount} New
            </Badge>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-4 max-w-4xl mx-auto">
        {/* Filter */}
        <div className="flex gap-2">
          <Select value={filterUnread} onValueChange={setFilterUnread}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Messages</SelectItem>
              <SelectItem value="unread">Unread Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {!selectedMessage ? (
          /* Message List */
          <div className="space-y-3">
            {filteredMessages.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No messages found</p>
                </CardContent>
              </Card>
            ) : (
              filteredMessages.map((msg) => (
                <Card
                  key={msg.id}
                  className={`cursor-pointer transition-colors ${
                    msg.unread ? "bg-green-600 hover:bg-green-700 border-green-600" : "hover:bg-accent/50"
                  }`}
                  onClick={() => setSelectedMessage(msg.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback
                          className={msg.unread ? "bg-white text-green-600" : "bg-chart-3/10 text-chart-3"}
                        >
                          <MessageSquare className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className={`font-semibold text-sm ${msg.unread ? "text-white" : ""}`}>{msg.jobId}</p>
                              {msg.unread && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                            </div>
                            <p
                              className={`text-xs line-clamp-1 ${msg.unread ? "text-green-100" : "text-muted-foreground"}`}
                            >
                              {msg.jobTitle}
                            </p>
                          </div>
                          <div
                            className={`flex items-center gap-1 text-xs whitespace-nowrap ${msg.unread ? "text-green-100" : "text-muted-foreground"}`}
                          >
                            <Clock className="h-3 w-3" />
                            {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>
                        <div className="flex items-start gap-1 text-sm">
                          <span className={`text-xs ${msg.unread ? "text-green-100" : "text-muted-foreground"}`}>
                            {msg.lastMessageFrom}:
                          </span>
                          <p
                            className={`line-clamp-2 text-xs ${msg.unread ? "text-white font-medium" : "text-foreground"}`}
                          >
                            {msg.lastMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        ) : (
          /* Conversation View */
          <div className="space-y-4">
            {/* Job Info Card */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base">{selectedConversation?.jobId}</CardTitle>
                    <CardDescription className="text-xs">{selectedConversation?.jobTitle}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedMessage(null)}>
                    Close
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* Messages */}
            <Card>
              <CardContent className="p-4 space-y-4 max-h-[50vh] overflow-y-auto">
                {selectedConversation?.messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 ${msg.senderType === "driver" ? "flex-row-reverse" : ""}`}>
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback
                        className={msg.senderType === "driver" ? "bg-chart-3/10 text-chart-3" : "bg-primary/10"}
                      >
                        {msg.senderType === "driver" ? <Truck className="h-4 w-4" /> : "A"}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`flex-1 ${msg.senderType === "driver" ? "text-right" : ""}`}>
                      <div
                        className={`inline-block max-w-[85%] p-3 rounded-lg ${
                          msg.senderType === "driver" ? "bg-chart-3 text-white" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                      <div
                        className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${
                          msg.senderType === "driver" ? "justify-end" : ""
                        }`}
                      >
                        <span className="font-medium">{msg.sender}</span>
                        <span>•</span>
                        <Clock className="h-3 w-3" />
                        {msg.timestamp.toLocaleString([], {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reply Section */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <Textarea
                  placeholder="Type your message to dispatch..."
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="resize-none"
                />
                <Button onClick={handleSendMessage} disabled={!replyText.trim()} className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
