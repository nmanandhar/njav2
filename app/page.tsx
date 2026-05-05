import Link from "next/link"
import Image from "next/image"
import { Building2, Users, Smartphone, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PortalSelectionPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-center">
            <Image
              src="/images/67ad5fb6f57e721d4e2191c8-nj-ashton-logo-no-bkg.avif"
              alt="NJ Ashton Logo"
              width={280}
              height={80}
              className="h-20 w-auto"
              priority
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Business Operations Platform
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Your complete toolkit for managing fleet operations, jobs, compliance, and business workflows.
            </p>
          </div>

          {/* Portal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Head Office Portal */}
            <Link href="/admin-portal" className="group">
              <div className="relative h-full border border-slate-800 rounded-lg p-8 bg-slate-900 hover:bg-slate-800/50 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 flex flex-col">
                <div className="flex flex-col items-center text-center flex-1">
                  <div className="h-16 w-16 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Building2 className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="mt-4 flex-1 flex flex-col">
                    <h2 className="text-2xl font-semibold text-white mb-2">Head Office</h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      Comprehensive admin dashboard for fleet operations and compliance management
                    </p>
                  </div>
                  <Button
                    className="w-full bg-transparent border-slate-700 hover:bg-slate-800 hover:border-blue-500 text-white mt-auto"
                    variant="outline"
                  >
                    Access Portal
                  </Button>
                </div>
              </div>
            </Link>

            {/* Client Portal */}
            <Link href="/client-portal" className="group">
              <div className="relative h-full border border-slate-800 rounded-lg p-8 bg-slate-900 hover:bg-slate-800/50 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 flex flex-col">
                <div className="flex flex-col items-center text-center flex-1">
                  <div className="h-16 w-16 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <Users className="h-8 w-8 text-emerald-500" />
                  </div>
                  <div className="mt-4 flex-1 flex flex-col">
                    <h2 className="text-2xl font-semibold text-white mb-2">Client Portal</h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      Real-time job tracking with live driver locations and delivery updates
                    </p>
                  </div>
                  <Button
                    className="w-full bg-transparent border-slate-700 hover:bg-slate-800 hover:border-emerald-500 text-white mt-auto"
                    variant="outline"
                  >
                    Access Portal
                  </Button>
                </div>
              </div>
            </Link>

            {/* Sub-Contractor Portal */}
            <Link href="/subcontractor-portal" className="group">
              <div className="relative h-full border border-slate-800 rounded-lg p-8 bg-slate-900 hover:bg-slate-800/50 transition-all duration-300 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 flex flex-col">
                <div className="flex flex-col items-center text-center flex-1">
                  <div className="h-16 w-16 rounded-xl bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                    <Truck className="h-8 w-8 text-orange-500" />
                  </div>
                  <div className="mt-4 flex-1 flex flex-col">
                    <h2 className="text-2xl font-semibold text-white mb-2">Sub-Contractor</h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      Complete job management system with driver scheduling and invoicing tools
                    </p>
                  </div>
                  <Button
                    className="w-full bg-transparent border-slate-700 hover:bg-slate-800 hover:border-orange-500 text-white mt-auto"
                    variant="outline"
                  >
                    Access Portal
                  </Button>
                </div>
              </div>
            </Link>

            {/* Mobile App */}
            <Link href="/mobile-app" className="group">
              <div className="relative h-full border border-slate-800 rounded-lg p-8 bg-slate-900 hover:bg-slate-800/50 transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 flex flex-col">
                <div className="flex flex-col items-center text-center flex-1">
                  <div className="h-16 w-16 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <Smartphone className="h-8 w-8 text-purple-500" />
                  </div>
                  <div className="mt-4 flex-1 flex flex-col">
                    <h2 className="text-2xl font-semibold text-white mb-2">Mobile App</h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      Driver-focused mobile app for on-the-go job management and navigation
                    </p>
                  </div>
                  <Button
                    className="w-full bg-transparent border-slate-700 hover:bg-slate-800 hover:border-purple-500 text-white mt-auto"
                    variant="outline"
                  >
                    Access App
                  </Button>
                </div>
              </div>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-slate-800">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-slate-400">System Availability</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">Real-time</div>
              <div className="text-sm text-slate-400">Fleet Tracking</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">Secure</div>
              <div className="text-sm text-slate-400">Data Protection</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">Cloud</div>
              <div className="text-sm text-slate-400">Based Platform</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6">
        <div className="container mx-auto px-6 text-center text-sm text-slate-500">
          © 2025 NJ Ashton Business Operations. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
