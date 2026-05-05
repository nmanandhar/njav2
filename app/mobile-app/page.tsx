"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Smartphone, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function MobileAppLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("driver@njashton.com")
  const [password, setPassword] = useState("driver123")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      if (email === "driver@njashton.com" && password === "driver123") {
        router.push("/mobile-app/dashboard")
      } else {
        alert("Invalid credentials. Please use the demo credentials provided.")
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portal Selection
          </Link>
        </div>

        <div className="border border-border rounded-lg p-8 bg-card">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-xl bg-chart-3/10 flex items-center justify-center">
              <Smartphone className="h-8 w-8 text-chart-3" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-foreground mb-2">Driver Mobile App</h1>
          <p className="text-center text-muted-foreground mb-8">Sign in to access your dashboard</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="driver@njashton.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
            <p className="text-sm font-medium text-foreground mb-2">Demo Credentials:</p>
            <p className="text-sm text-muted-foreground font-mono">driver@njashton.com</p>
            <p className="text-sm text-muted-foreground font-mono">driver123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
