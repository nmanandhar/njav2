"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText, Shield } from "lucide-react"

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-foreground">Legal</h1>
          <p className="text-muted-foreground mt-2">
            Review our legal documents and policies
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/legal/privacy-policy">
            <Card className="h-full hover:border-teal-500 transition-colors cursor-pointer">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-teal-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle>Privacy Policy</CardTitle>
                <CardDescription>
                  Learn how we collect, use, and protect your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our Privacy Policy explains what data we collect, how we use it, who we share it with, and your rights regarding your personal information.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/legal/terms-of-service">
            <Card className="h-full hover:border-teal-500 transition-colors cursor-pointer">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Terms of Service</CardTitle>
                <CardDescription>
                  The rules and guidelines for using our services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our Terms of Service outline the rules, responsibilities, and agreements that govern your use of SmartProcess.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t">
          <h2 className="text-xl font-semibold text-foreground mb-4">Questions?</h2>
          <p className="text-muted-foreground">
            If you have any questions about our legal documents or policies, please contact us at{" "}
            <a href="mailto:legal@smartprocess.com.au" className="text-teal-600 hover:underline">
              legal@smartprocess.com.au
            </a>
          </p>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} SmartProcess Pty Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
