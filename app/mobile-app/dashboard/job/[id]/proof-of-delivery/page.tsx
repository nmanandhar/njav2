"use client"
import { useState, useRef, useEffect } from "react"
import type React from "react"

import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, FileText, PenTool, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ProofOfDeliveryPage() {
  const params = useParams()
  const jobId = params.id as string

  const [recipientName, setRecipientName] = useState("")
  const [deliveryNotes, setDeliveryNotes] = useState("")
  const [isDrawing, setIsDrawing] = useState(false)
  const [showSignature, setShowSignature] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Initialize canvas for signature
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
  }, [])

  // Handle drawing on canvas
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const handleCaptureSignature = () => {
    setShowSignature(true)
  }

  const handleTakePhoto = () => {
    // Implement photo capture functionality
    alert("Photo capture feature coming soon!")
  }

  const handleCompleteDelivery = () => {
    // Implement delivery completion
    alert("Delivery completed successfully!")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center gap-3 p-4">
          <Link href={`/mobile-app/dashboard/job/${jobId}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold text-foreground">Proof of Delivery</h1>
            <p className="text-xs text-muted-foreground">{jobId}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6 max-w-4xl mx-auto pb-8">
        <Card className="bg-gradient-to-r from-teal-50 to-teal-100/50 border-teal-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-teal-900">
              <FileText className="h-5 w-5" />
              Proof of Delivery
            </CardTitle>
            <p className="text-sm text-teal-700">Capture signature and photos</p>
          </CardHeader>
        </Card>

        {/* Recipient Information */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient-name">Recipient Name</Label>
              <Input
                id="recipient-name"
                placeholder="Enter recipient name"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="delivery-notes">Delivery Notes</Label>
              <Textarea
                id="delivery-notes"
                placeholder="Add any delivery notes..."
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                rows={4}
                className="bg-background resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Capture Signature */}
        <Card>
          <CardContent className="pt-6">
            {!showSignature ? (
              <Button
                variant="outline"
                size="lg"
                className="w-full gap-2 bg-transparent justify-start"
                onClick={handleCaptureSignature}
              >
                <PenTool className="h-5 w-5" />
                Capture Signature
              </Button>
            ) : (
              <div className="space-y-3">
                <Label>Signature</Label>
                <div className="border-2 border-dashed border-border rounded-lg bg-white">
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={200}
                    className="w-full h-[200px] touch-none cursor-crosshair"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                  />
                </div>
                <Button variant="ghost" size="sm" onClick={clearSignature} className="text-red-600 hover:text-red-700">
                  Clear Signature
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Take Photo */}
        <Card>
          <CardContent className="pt-6">
            <Button
              variant="outline"
              size="lg"
              className="w-full gap-2 bg-transparent justify-start"
              onClick={handleTakePhoto}
            >
              <Camera className="h-5 w-5" />
              Take Photo
            </Button>
          </CardContent>
        </Card>

        {/* Complete Delivery Button */}
        <Button size="lg" className="w-full bg-teal-700 hover:bg-teal-800" onClick={handleCompleteDelivery}>
          Complete Delivery
        </Button>
      </main>
    </div>
  )
}
