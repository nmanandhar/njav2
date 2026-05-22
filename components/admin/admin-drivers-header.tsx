"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Download, Upload, Calendar } from "lucide-react"
import { AddDriverDialog } from "./add-driver-dialog"

export function AdminDriversHeader() {
  const [isAddDriverOpen, setIsAddDriverOpen] = useState(false)

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search drivers, license, certifications..."
              className="pl-10 w-96 bg-input border-border"
            />
          </div>
          <Link href="/admin-portal/fleet/drivers/leave-calendar">
            <Button variant="outline" className="text-foreground hover:bg-accent bg-transparent gap-2">
              <Calendar className="h-4 w-4" />
              Holiday/Leave Calendar
            </Button>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" className="text-foreground hover:bg-accent bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export Driver Data
          </Button>
          <Button variant="outline" className="text-foreground hover:bg-accent bg-transparent">
            <Upload className="h-4 w-4 mr-2" />
            Import Drivers
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => setIsAddDriverOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Driver
          </Button>
        </div>
      </div>

      <AddDriverDialog open={isAddDriverOpen} onOpenChange={setIsAddDriverOpen} />
    </header>
  )
}
