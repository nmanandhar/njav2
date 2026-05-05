"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, FileText } from "lucide-react"

export function InvoicesHeader() {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by Invoice Number, Job Number, Driver Name..."
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
            Create Invoice
          </Button>
        </div>
      </div>
    </header>
  )
}
