"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Search, Settings, Plus, FileText } from "lucide-react"

export function InvoicesHeader() {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by Finance Number, Job Number, Driver Name, Location..."
              className="pl-10 w-96 bg-input border-border"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" className="border-border text-foreground hover:bg-accent bg-transparent">
            <FileText className="h-4 w-4 mr-2" />
            Reports
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Create Finance Record
          </Button>
          <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent">
            <Settings className="h-4 w-4" />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground">AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
