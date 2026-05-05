"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, DollarSign, Calendar, AlertTriangle, CheckCircle } from "lucide-react"

const monthlyData = [
  { month: "Jan", revenue: 98500, invoices: 42, paid: 38, outstanding: 4 },
  { month: "Feb", revenue: 127450, invoices: 57, paid: 52, outstanding: 5 },
  { month: "Mar", revenue: 145200, invoices: 63, paid: 58, outstanding: 5 },
]

const clientAnalytics = [
  { name: "Metro Construction Ltd", totalValue: 45200, invoices: 12, paidOnTime: 92 },
  { name: "BuildCorp Pty Ltd", totalValue: 38750, invoices: 10, paidOnTime: 88 },
  { name: "Urban Developments", totalValue: 32100, invoices: 8, paidOnTime: 75 },
  { name: "Infrastructure Co", totalValue: 28900, invoices: 7, paidOnTime: 95 },
]

const paymentTrends = [
  { period: "0-30 days", amount: 85600, percentage: 67, color: "bg-green-500" },
  { period: "31-60 days", amount: 28400, percentage: 22, color: "bg-yellow-500" },
  { period: "61-90 days", amount: 9800, percentage: 8, color: "bg-orange-500" },
  { period: "90+ days", amount: 3850, percentage: 3, color: "bg-red-500" },
]

export function AdminFinanceAnalytics() {
  const currentMonth = monthlyData[monthlyData.length - 1]
  const previousMonth = monthlyData[monthlyData.length - 2]
  const revenueGrowth = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Trends */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Revenue Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Monthly Growth</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold">{revenueGrowth.toFixed(1)}%</span>
                {revenueGrowth > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold">${currentMonth.revenue.toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-3">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium w-8">{data.month}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>{data.invoices} invoices</span>
                      <span>${data.revenue.toLocaleString()}</span>
                    </div>
                    <Progress value={(data.paid / data.invoices) * 100} className="h-2" />
                  </div>
                </div>
                <Badge variant={index === monthlyData.length - 1 ? "default" : "secondary"} className="text-xs">
                  {data.paid}/{data.invoices}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Analysis */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Payment Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-muted-foreground">On Time</span>
              </div>
              <p className="text-2xl font-bold">87%</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm text-muted-foreground">Overdue</span>
              </div>
              <p className="text-2xl font-bold">13%</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Outstanding by Age</h4>
            {paymentTrends.map((trend) => (
              <div key={trend.period} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{trend.period}</span>
                  <span className="font-medium">${trend.amount.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div className={`h-2 rounded-full ${trend.color}`} style={{ width: `${trend.percentage}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground w-8">{trend.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Clients */}
      <Card className="bg-card border-border lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Top Clients by Revenue</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clientAnalytics.map((client, index) => (
              <div key={client.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{client.name}</p>
                    <p className="text-sm text-muted-foreground">{client.invoices} invoices</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">${client.totalValue.toLocaleString()}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">On-time:</span>
                    <Badge
                      variant={
                        client.paidOnTime >= 90 ? "default" : client.paidOnTime >= 80 ? "secondary" : "destructive"
                      }
                      className="text-xs"
                    >
                      {client.paidOnTime}%
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
