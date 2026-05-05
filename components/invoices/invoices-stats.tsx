import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, DollarSign, Clock, CheckCircle } from "lucide-react"

const invoiceStats = [
  {
    title: "Total Invoices",
    value: "89",
    change: "+5 this week",
    changeType: "positive" as const,
    icon: FileText,
    description: "All time",
  },
  {
    title: "Outstanding Amount",
    value: "$24,580",
    change: "8 invoices",
    changeType: "warning" as const,
    icon: Clock,
    description: "Awaiting payment",
  },
  {
    title: "Paid This Month",
    value: "$67,340",
    change: "+$7,200 vs last month",
    changeType: "positive" as const,
    icon: CheckCircle,
    description: "Successfully collected",
  },
  {
    title: "Average Invoice",
    value: "$2,450",
    change: "+$180 increase",
    changeType: "positive" as const,
    icon: DollarSign,
    description: "Per invoice value",
  },
]

export function InvoicesStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {invoiceStats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Badge
                  variant={
                    stat.changeType === "positive"
                      ? "default"
                      : stat.changeType === "warning"
                        ? "destructive"
                        : "secondary"
                  }
                  className="text-xs"
                >
                  {stat.change}
                </Badge>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
