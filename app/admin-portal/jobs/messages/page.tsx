"use client"

import { useState } from "react"
import { AdminJobsHeaderNav } from "@/components/admin/admin-jobs-header-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Search, Send, MessageSquare, Clock, Truck } from "lucide-react"

// Mock message data
const mockMessages = [
  {
    id: "1",
    jobId: "J-001",
    jobTitle: "Main Street Construction",
    sender: "John Smith",
    senderType: "driver" as const,
    truckRego: "GHI-789",
    message: "Arrived at the site. Ready to start loading.",
    timestamp: new Date("2025-01-06T08:30:00"),
    unread: true,
  },
  {
    id: "2",
    jobId: "J-002",
    jobTitle: "Highway Bridge Repair",
    sender: "Mike Johnson",
    senderType: "driver" as const,
    truckRego: "DEF-456",
    message: "Delivery completed. POD signed by site manager.",
    timestamp: new Date("2025-01-06T07:45:00"),
    unread: true,
  },
  {
    id: "3",
    jobId: "J-001",
    jobTitle: "Main Street Construction",
    sender: "Admin",
    senderType: "admin" as const,
    message: "Please confirm ETA for second load",
    timestamp: new Date("2025-01-06T07:00:00"),
    unread: false,
  },
  {
    id: "4",
    jobId: "J-003",
    jobTitle: "Downtown Office Building",
    sender: "Sarah Williams",
    senderType: "driver" as const,
    truckRego: "ABC-123",
    message: "Traffic delay on M1. Will be 20 minutes late.",
    timestamp: new Date("2025-01-05T16:30:00"),
    unread: false,
  },
  {
    id: "5",
    jobId: "J-005",
    jobTitle: "Warehouse Expansion",
    sender: "Tom Brown",
    senderType: "driver" as const,
    truckRego: "SUB-001",
    message: "Equipment issue with truck. Need replacement vehicle.",
    timestamp: new Date("2025-01-05T14:15:00"),
    unread: true,
  },
]
// </CHANGE>

export default function JobMessagesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterJob, setFilterJob] = useState("all")
  const [filterSender, setFilterSender] = useState("all")
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")

  const filteredMessages = mockMessages.filter((msg) => {
    const matchesSearch =
      msg.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.sender.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesJob = filterJob === "all" || msg.jobId === filterJob
    const matchesSender = filterSender === "all" || msg.senderType === filterSender
    return matchesSearch && matchesJob && matchesSender
  })

  const unreadCount = mockMessages.filter((m) => m.unread).length
  const selectedMsg = mockMessages.find((m) => m.id === selectedMessage)

  const handleSendReply = () => {
    if (replyText.trim()) {
      console.log("[v0] Sending reply:", replyText, "to message:", selectedMessage)
      setReplyText("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background border-b border-border px-6 py-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-orange-500 font-medium">Jobs</span>
          <span className="text-muted-foreground">›</span>
          <span className="text-foreground">Messages</span>
        </div>
      </div>

      <AdminJobsHeaderNav />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockMessages.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Unread Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{unreadCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>
        </div>

        {/* Messages Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <div className="mt-4 space-y-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search messages..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Filters */}
                <div className="flex gap-2">
                  <Select value={filterJob} onValueChange={setFilterJob}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="All Jobs" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Jobs</SelectItem>
                      <SelectItem value="J-001">J-001</SelectItem>
                      <SelectItem value="J-002">J-002</SelectItem>
                      <SelectItem value="J-003">J-003</SelectItem>
                      <SelectItem value="J-005">J-005</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterSender} onValueChange={setFilterSender}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="All Senders" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Senders</SelectItem>
                      <SelectItem value="driver">Drivers</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg.id)}
                    className={`p-4 cursor-pointer hover:bg-accent transition-colors ${
                      selectedMessage === msg.id ? "bg-accent" : ""
                    } ${msg.unread ? "bg-blue-50/50 dark:bg-blue-950/20" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {msg.sender
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="font-semibold text-sm truncate">
                            {msg.sender}
                            {msg.senderType === "driver" && msg.truckRego && (
                              <span className="text-muted-foreground font-normal text-xs ml-1">({msg.truckRego})</span>
                            )}
                          </div>
                          {/* </CHANGE> */}
                          {msg.unread && (
                            <Badge variant="default" className="h-5 text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mb-1">
                          Job: {msg.jobId} - {msg.jobTitle}
                        </div>
                        <div className="text-sm text-muted-foreground truncate">{msg.message}</div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {msg.timestamp.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Message Detail / Reply */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Conversation</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedMsg ? (
                <div className="space-y-6">
                  {/* Message Thread */}
                  <div className="space-y-4">
                    <div className="bg-accent p-4 rounded-lg">
                      <div className="flex items-start gap-3 mb-3">
                        <Avatar>
                          <AvatarFallback>
                            {selectedMsg.sender
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-semibold">
                            {selectedMsg.sender}
                            {selectedMsg.senderType === "driver" && selectedMsg.truckRego && (
                              <span className="text-muted-foreground font-normal text-sm ml-1">
                                ({selectedMsg.truckRego})
                              </span>
                            )}
                          </div>
                          {/* </CHANGE> */}
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            {selectedMsg.senderType === "driver" ? (
                              <>
                                <Truck className="h-3 w-3" />
                                Driver
                              </>
                            ) : (
                              "Admin"
                            )}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">{selectedMsg.timestamp.toLocaleString()}</div>
                      </div>
                      <div className="bg-card p-3 rounded-md">
                        <div className="text-xs text-muted-foreground mb-2">
                          Job: {selectedMsg.jobId} - {selectedMsg.jobTitle}
                        </div>
                        <div>{selectedMsg.message}</div>
                      </div>
                    </div>
                  </div>

                  {/* Reply Section */}
                  <div className="border-t pt-4">
                    <div className="text-sm font-medium mb-2">Send Reply</div>
                    <div className="space-y-3">
                      <Textarea
                        placeholder="Type your message..."
                        rows={4}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <div className="flex justify-end">
                        <Button onClick={handleSendReply} className="gap-2">
                          <Send className="h-4 w-4" />
                          Send Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mb-4" />
                  <div className="text-lg font-medium">No message selected</div>
                  <div className="text-sm">Select a message from the list to view and reply</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
