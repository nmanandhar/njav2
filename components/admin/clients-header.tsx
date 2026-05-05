import { Button } from "@/components/ui/button"
import { Plus, Download } from "lucide-react"

export function ClientsHeader() {
  return (
    <div className="px-6 py-4 border-b bg-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Clients</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your client database and relationships</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>
      </div>
    </div>
  )
}
