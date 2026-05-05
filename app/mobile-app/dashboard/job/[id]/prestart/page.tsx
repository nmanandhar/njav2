"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, Camera, CalendarIcon, Check, X } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

export default function PreStartChecklistPage() {
  const [kilometres, setKilometres] = useState("47,582")
  const [location, setLocation] = useState("789 Warehouse Rd, Sydney NSW")
  const [declarationChecked, setDeclarationChecked] = useState(true)
  const [signatureDate, setSignatureDate] = useState<Date>(new Date())
  const [signature, setSignature] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  // Auto-populated fields based on job/driver assignment
  const jobNumber = "JOB-2024-003"
  const registration = "GHI-002"
  const completedBy = "John Smith"

  const checklistItems = [
    {
      section: "Kilometres",
      question: "PLEASE TAKE A PHOTO OF THE ODOMETER\nPLEASE MAKE SURE THE KMS ARE CORRECT",
      requiresPhoto: true,
    },
    {
      section: "Pre-Start Inspection",
      question: "CHECK LEVELS - FUEL/OIL/COOLANT",
    },
    {
      section: "Pre-Start Inspection",
      question: "BRAKE PRESSURE GAUGES AND FAILURE INDICATORS",
    },
    {
      section: "Pre-Start Inspection",
      question: "MAXI ALARM OPERATION AND REVERSE WARNING",
    },
    {
      section: "Pre-Start Inspection",
      question: "MIRRORS/WINDSCREEN - SECURE, NO GRIME OR DAMAGE",
    },
    {
      section: "Pre-Start Inspection",
      question: "WINDSCREEN WIPERS OPERATING EFFECTIVELY",
    },
    {
      section: "Pre-Start Inspection",
      question: "INDICATORS/HORN/SEAT BELT/SEAT",
    },
    {
      section: "Pre-Start Inspection",
      question: "LIGHTS, REFLECTORS, LENSES FITTED AND OPERATING",
    },
    {
      section: "Pre-Start Inspection",
      question: "TYRES - TREAD, PRESSURE, CONDITION",
    },
    {
      section: "Pre-Start Inspection",
      question: "WHEEL NUTS AND WHEEL SECURITY",
    },
    {
      section: "Pre-Start Inspection",
      question: "CHECK FOR FUEL/OIL/COOLANT/AIR LEAKS",
    },
    {
      section: "Pre-Start Inspection",
      question: "DRAIN AIR TANKS",
    },
    {
      section: "Pre-Start Inspection",
      question: "STRUCTURE/BODYWORK FREE OF DAMAGE OR CRACKS",
    },
    {
      section: "Pre-Start Inspection",
      question: "MUDGUARDS AND MUDFLAPS",
    },
    {
      section: "Pre-Start Inspection",
      question: "DRAWBAR AND TOW COUPLINGS INSPECTED FOR SECURITY AND INTEGRITY",
    },
    {
      section: "Pre-Start Inspection",
      question: "TRAILER HOSES AND FITTINGS",
    },
    {
      section: "Pre-Start Inspection",
      question: "TUG TEST TO ENSURE SECURE TRUCK/TRAILER CONNECTION",
    },
    {
      section: "Pre-Start Inspection",
      question: "TARPS AND TAILGATES",
    },
    {
      section: "Pre-Start Inspection",
      question: "TRIANGLES, FIRE EXTINGUISHERS, FIRST AID KIT",
    },
    {
      section: "Pre-Start Inspection",
      question: "NHVAS LABEL NOT OBSCURED/DAMAGED AND INTERCEPT BOOK IN TRUCK",
    },
    {
      section: "Final Check",
      question: "PLEASE MAKE SURE YOU ENTER THE CORRECT AND CURRENT KILOMETRES",
    },
  ]

  const [checklistResponses, setChecklistResponses] = useState<Record<number, { passFail: string; notes: string }>>({
    0: { passFail: "pass", notes: "Odometer photo taken" },
    1: { passFail: "pass", notes: "All levels checked and topped up" },
    2: { passFail: "pass", notes: "" },
    3: { passFail: "pass", notes: "" },
    4: { passFail: "pass", notes: "" },
    5: { passFail: "pass", notes: "" },
    6: { passFail: "pass", notes: "" },
    7: { passFail: "pass", notes: "" },
    8: { passFail: "pass", notes: "Front left tire slightly worn, monitor" },
    9: { passFail: "pass", notes: "" },
    10: { passFail: "pass", notes: "" },
    11: { passFail: "pass", notes: "" },
    12: { passFail: "pass", notes: "" },
    13: { passFail: "pass", notes: "" },
    14: { passFail: "pass", notes: "" },
    15: { passFail: "pass", notes: "" },
    16: { passFail: "pass", notes: "" },
    17: { passFail: "pass", notes: "" },
    18: { passFail: "pass", notes: "" },
    19: { passFail: "pass", notes: "" },
    20: { passFail: "pass", notes: "" },
  })

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    setIsDrawing(true)
    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let x, y
    if ("touches" in e) {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }

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

    let x, y
    if ("touches" in e) {
      e.preventDefault()
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }

    ctx.lineTo(x, y)
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false)
      const canvas = canvasRef.current
      if (canvas) {
        setSignature(canvas.toDataURL())
      }
    }
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setSignature("")
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Initialize with white background
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.fillStyle = "#fff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = "#000"
      ctx.lineWidth = 2
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      // Draw a simple signature - "John Smith"
      ctx.beginPath()
      // J
      ctx.moveTo(40, 80)
      ctx.lineTo(40, 100)
      ctx.lineTo(45, 105)
      ctx.stroke()

      ctx.beginPath()
      // o
      ctx.arc(60, 95, 8, 0, Math.PI * 2)
      ctx.stroke()

      ctx.beginPath()
      // h
      ctx.moveTo(80, 75)
      ctx.lineTo(80, 105)
      ctx.moveTo(80, 90)
      ctx.quadraticCurveTo(85, 85, 90, 90)
      ctx.lineTo(90, 105)
      ctx.stroke()

      ctx.beginPath()
      // n
      ctx.moveTo(105, 90)
      ctx.lineTo(105, 105)
      ctx.moveTo(105, 90)
      ctx.quadraticCurveTo(110, 85, 115, 90)
      ctx.lineTo(115, 105)
      ctx.stroke()

      ctx.beginPath()
      // S
      ctx.moveTo(145, 85)
      ctx.quadraticCurveTo(135, 85, 135, 92)
      ctx.quadraticCurveTo(135, 98, 145, 98)
      ctx.quadraticCurveTo(155, 98, 155, 105)
      ctx.stroke()

      ctx.beginPath()
      // m
      ctx.moveTo(170, 90)
      ctx.lineTo(170, 105)
      ctx.moveTo(170, 92)
      ctx.lineTo(175, 88)
      ctx.lineTo(180, 92)
      ctx.lineTo(180, 105)
      ctx.moveTo(180, 92)
      ctx.lineTo(185, 88)
      ctx.lineTo(190, 92)
      ctx.lineTo(190, 105)
      ctx.stroke()

      ctx.beginPath()
      // i
      ctx.moveTo(205, 90)
      ctx.lineTo(205, 105)
      ctx.moveTo(205, 82)
      ctx.arc(205, 82, 1, 0, Math.PI * 2)
      ctx.stroke()

      ctx.beginPath()
      // t
      ctx.moveTo(215, 80)
      ctx.lineTo(215, 103)
      ctx.lineTo(220, 105)
      ctx.moveTo(210, 90)
      ctx.lineTo(220, 90)
      ctx.stroke()

      ctx.beginPath()
      // h
      ctx.moveTo(230, 75)
      ctx.lineTo(230, 105)
      ctx.moveTo(230, 90)
      ctx.quadraticCurveTo(235, 85, 240, 90)
      ctx.lineTo(240, 105)
      ctx.stroke()

      // Add an underline flourish
      ctx.beginPath()
      ctx.moveTo(40, 115)
      ctx.quadraticCurveTo(140, 120, 240, 110)
      ctx.stroke()

      // Set the signature data
      setSignature(canvas.toDataURL())
    }
  }, [])

  const handlePassFailChange = (index: number, value: string) => {
    setChecklistResponses((prev) => ({
      ...prev,
      [index]: { ...prev[index], passFail: value, notes: prev[index]?.notes || "" },
    }))
  }

  const handleNotesChange = (index: number, value: string) => {
    setChecklistResponses((prev) => ({
      ...prev,
      [index]: { ...prev[index], notes: value, passFail: prev[index]?.passFail || "" },
    }))
  }

  const handleSubmit = () => {
    console.log("Pre-Start Checklist submitted", {
      jobNumber,
      kilometres,
      registration,
      completedBy,
      location,
      responses: checklistResponses,
      declaration: declarationChecked,
      signature,
      date: signatureDate,
    })
    alert("Pre-Start Checklist submitted successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3 p-4">
          <Link href="/mobile-app/dashboard/job/JOB-2024-003">
            <Button variant="ghost" size="icon" className="text-white hover:bg-teal-500/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-semibold">Pre-Start Checklist</h1>
            <p className="text-sm text-teal-100">Truck And Trailer Pre-Start</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Header Information Card */}
        <Card className="p-4 border-l-4 border-l-teal-600">
          <h2 className="font-semibold mb-4 text-lg text-teal-700">Vehicle & Driver Details</h2>
          <div className="space-y-3">
            <div>
              <Label htmlFor="jobNumber" className="text-xs text-gray-600">
                JOB #
              </Label>
              <Input id="jobNumber" value={jobNumber} disabled className="bg-gray-100 mt-1" />
            </div>
            <div>
              <Label htmlFor="kilometres" className="text-xs text-gray-600">
                Kilometres *
              </Label>
              <Input
                id="kilometres"
                type="number"
                placeholder="Enter kilometres"
                value={kilometres}
                onChange={(e) => setKilometres(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="registration" className="text-xs text-gray-600">
                Registration
              </Label>
              <Input id="registration" value={registration} disabled className="bg-gray-100 mt-1" />
            </div>
            <div>
              <Label htmlFor="completedBy" className="text-xs text-gray-600">
                Completed By
              </Label>
              <Input id="completedBy" value={completedBy} disabled className="bg-gray-100 mt-1" />
            </div>
            <div>
              <Label htmlFor="location" className="text-xs text-gray-600">
                Location *
              </Label>
              <Input
                id="location"
                placeholder="Enter current location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </Card>

        {/* Checklist Items */}
        <Card className="p-4 border-l-4 border-l-blue-600">
          <h2 className="font-semibold mb-4 text-lg text-blue-700">Inspection Checklist</h2>
          <div className="space-y-4">
            {checklistItems.map((item, index) => (
              <div key={index} className="border rounded-lg p-3 bg-white shadow-sm">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="font-medium text-sm leading-relaxed">{item.question}</p>
                  </div>

                  {item.requiresPhoto && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo of Odometer
                    </Button>
                  )}

                  <div className="space-y-2">
                    <div>
                      <Label className="text-xs text-gray-600">Pass/Fail *</Label>
                      <Select
                        value={checklistResponses[index]?.passFail || ""}
                        onValueChange={(value) => handlePassFailChange(index, value)}
                      >
                        <SelectTrigger className="mt-1 w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pass">
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-600" />
                              <span>Pass</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="fail">
                            <div className="flex items-center gap-2">
                              <X className="h-4 w-4 text-red-600" />
                              <span>Fail</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Notes</Label>
                      <Input
                        placeholder="Add notes (optional)"
                        value={checklistResponses[index]?.notes || ""}
                        onChange={(e) => handleNotesChange(index, e.target.value)}
                        className="mt-1 w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Declaration */}
        <Card className="p-4 border-l-4 border-l-purple-600">
          <h2 className="font-semibold mb-4 text-lg text-purple-700">Declaration</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <Checkbox
                id="declaration"
                checked={declarationChecked}
                onCheckedChange={(checked) => setDeclarationChecked(checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="declaration" className="text-sm leading-relaxed cursor-pointer text-gray-700">
                I have checked all of these items to the limit of the inspection
              </label>
            </div>

            <div>
              <Label className="text-xs text-gray-600">Digital Signature *</Label>
              <div className="mt-2 space-y-2">
                <div
                  className="border-2 border-dashed border-purple-300 rounded-lg bg-white relative"
                  style={{ touchAction: "none" }}
                >
                  <canvas
                    ref={canvasRef}
                    className="w-full h-40 cursor-crosshair rounded-lg"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                  />
                  {!signature && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <p className="text-sm text-purple-400">Sign here with your finger or stylus</p>
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={clearSignature}
                  disabled={!signature}
                  className="w-full bg-transparent border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  Clear Signature
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Draw your signature above. This constitutes a legal signature.
              </p>
            </div>

            <div>
              <Label className="text-xs text-gray-600">Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal mt-1 ${
                      !signatureDate && "text-muted-foreground"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {signatureDate ? format(signatureDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={signatureDate} onSelect={setSignatureDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={
            !kilometres ||
            !location ||
            !declarationChecked ||
            !signature ||
            !signatureDate ||
            Object.keys(checklistResponses).length !== checklistItems.length ||
            Object.values(checklistResponses).some((r) => !r.passFail)
          }
          className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
          size="lg"
        >
          Submit Pre-Start Checklist
        </Button>
      </div>
    </div>
  )
}
