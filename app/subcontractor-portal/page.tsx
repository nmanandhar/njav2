import { LoginForm } from "@/components/auth/login-form-subcontractor"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function SubcontractorPortalPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 w-4" />
            Back to Portal Selection
          </Link>
        </div>

        <div className="flex justify-center mb-6">
          <Image
            src="/images/nj-ashton-logo.avif"
            alt="NJ Ashton Logo"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Sub-Contractor Portal</h1>
          <p className="text-muted-foreground">Sign in to access your dashboard</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
