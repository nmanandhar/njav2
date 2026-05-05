import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface InvoiceDetailsProps {
  invoiceId: string
}

export function InvoiceDetails({ invoiceId }: InvoiceDetailsProps) {
  return (
    <div className="min-h-screen bg-background p-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Invoice Details: {invoiceId}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Invoice details view for sub-contractors</p>
        </CardContent>
      </Card>
    </div>
  )
}
