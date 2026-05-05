"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Download, Upload } from "lucide-react"
import { AddOperatorDialog } from "./add-operator-dialog"

export function AdminOperatorsHeader() {
  const [isAddOperatorOpen, setIsAddOperatorOpen] = useState(false)

  return (
    <>
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search operators, license, certifications..."
              className="pl-10 w-96 bg-input border-border"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" className="text-foreground hover:bg-accent bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export Operator Data
            </Button>
            <Button variant="outline" className="text-foreground hover:bg-accent bg-transparent">
              <Upload className="h-4 w-4 mr-2" />
              Import Operators
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => setIsAddOperatorOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Operator
            </Button>
          </div>
        </div>
      </header>

      <AddOperatorDialog open={isAddOperatorOpen} onOpenChange={setIsAddOperatorOpen} />
    </>
  )
}
