"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Download } from "lucide-react"
import Link from "next/link"

export function JobsHeader() {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by Job Number, Driver Name, Location, Material..."
              className="pl-10 w-96 bg-input border-border"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button asChild variant="outline" className="border-border hover:bg-accent bg-transparent">
            <Link href="/dashboard/jobs/address-book">
              <BookOpen className="h-4 w-4 mr-2" />
              Address Book
            </Link>
          </Button>
          <Button variant="outline" className="border-border hover:bg-accent bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </header>
  )
}
