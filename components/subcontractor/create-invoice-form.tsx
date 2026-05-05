import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CreateInvoiceForm() {
  return (
    <div className="min-h-screen bg-background p-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Create Invoice</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Invoice creation form for sub-contractors</p>
        </CardContent>
      </Card>
    </div>
  )
}
