"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
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
          <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
          <p className="text-muted-foreground mt-2">Last updated: January 15, 2024</p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed mt-4">
              SmartProcess Pty Ltd (ABN XX XXX XXX XXX) (&quot;SmartProcess&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting the privacy of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application, web portals, and related services (collectively, the &quot;Services&quot;).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We comply with the Australian Privacy Principles (&quot;APPs&quot;) contained in the Privacy Act 1988 (Cth) (&quot;Privacy Act&quot;) and, where applicable, the General Data Protection Regulation (&quot;GDPR&quot;).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By using our Services, you consent to the collection and use of information in accordance with this Privacy Policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">2. Information We Collect</h2>
            
            <h3 className="text-xl font-medium text-foreground mt-6">2.1 Personal Information</h3>
            <p className="text-muted-foreground leading-relaxed">We may collect the following personal information:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li><strong>Identity Information:</strong> Full name, date of birth, driver&apos;s licence number, licence class and expiry date, and employee/contractor identification numbers</li>
              <li><strong>Contact Information:</strong> Email address, phone number, residential address, and emergency contact details</li>
              <li><strong>Employment Information:</strong> Employment status, employer details, certifications, qualifications, and training records</li>
              <li><strong>Financial Information:</strong> Bank account details (for payment purposes), ABN (for contractors), and tax file numbers where legally required</li>
              <li><strong>Vehicle Information:</strong> Vehicle registration, make, model, VIN, and compliance documentation</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mt-6">2.2 Location Data</h3>
            <p className="text-muted-foreground leading-relaxed">We collect precise location data when you:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Clock in or clock out of shifts</li>
              <li>Complete job pickups and deliveries</li>
              <li>Use navigation features within the app</li>
              <li>Complete pre-start checklists</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-2">
              Location tracking is used solely for operational purposes including dispatch, job verification, and compliance with Chain of Responsibility obligations under the Heavy Vehicle National Law.
            </p>

            <h3 className="text-xl font-medium text-foreground mt-6">2.3 Usage Data</h3>
            <p className="text-muted-foreground leading-relaxed">We automatically collect:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Device information (device type, operating system, unique device identifiers)</li>
              <li>App usage statistics and interaction data</li>
              <li>Login timestamps and session duration</li>
              <li>Feature usage patterns</li>
              <li>Error logs and crash reports</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mt-6">2.4 Media and Documents</h3>
            <p className="text-muted-foreground leading-relaxed">We collect photos, videos, and documents that you upload, including:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Proof of delivery photos and signatures</li>
              <li>Pre-start checklist evidence</li>
              <li>Delivery dockets and weighbridge tickets</li>
              <li>Incident or damage documentation</li>
              <li>Licence and certification copies</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mt-4">We use the collected information for the following purposes:</p>
            
            <h3 className="text-xl font-medium text-foreground mt-6">3.1 Service Delivery</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Managing job assignments and dispatch operations</li>
              <li>Processing timesheets and calculating payments</li>
              <li>Tracking deliveries and providing real-time status updates</li>
              <li>Facilitating communication between drivers, dispatch, and clients</li>
              <li>Managing holiday and leave requests</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mt-6">3.2 Compliance and Safety</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Ensuring compliance with Heavy Vehicle National Law and Chain of Responsibility requirements</li>
              <li>Maintaining fatigue management records</li>
              <li>Recording pre-start safety checklists</li>
              <li>Monitoring driver certification and licence validity</li>
              <li>Investigating incidents and complaints</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mt-6">3.3 Business Operations</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Generating invoices and processing payments</li>
              <li>Producing operational reports and analytics</li>
              <li>Improving our Services and developing new features</li>
              <li>Providing customer support</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">4. Data Sharing and Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed mt-4">We may share your information with:</p>
            
            <h3 className="text-xl font-medium text-foreground mt-6">4.1 Within the Platform</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li><strong>Employers/Operators:</strong> Your employer or the transport operator you work for will have access to your job-related data, timesheets, and compliance records</li>
              <li><strong>Clients:</strong> Limited information necessary for delivery coordination (driver name, vehicle details, ETA)</li>
              <li><strong>Subcontractors:</strong> Where relevant to job coordination</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mt-6">4.2 Third-Party Service Providers</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Cloud hosting providers (data storage)</li>
              <li>Payment processors (financial transactions)</li>
              <li>Mapping and navigation services</li>
              <li>Analytics providers (anonymised usage data)</li>
              <li>Communication services (SMS, email notifications)</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mt-6">4.3 Legal Requirements</h3>
            <p className="text-muted-foreground leading-relaxed">We may disclose information when required by law, including:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>To comply with legal process or government requests</li>
              <li>To respond to regulatory investigations (e.g., NHVR, SafeWork)</li>
              <li>To protect our rights, privacy, safety, or property</li>
              <li>In connection with a merger, acquisition, or sale of assets</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mt-6">4.4 What We Do NOT Do</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>We do NOT sell your personal information to third parties</li>
              <li>We do NOT use your data for third-party advertising</li>
              <li>We do NOT share your data with unrelated businesses for marketing purposes</li>
            </ul>
          </section>

          {/* Data Storage and Security */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">5. Data Storage and Security</h2>
            
            <h3 className="text-xl font-medium text-foreground mt-6">5.1 Data Storage</h3>
            <p className="text-muted-foreground leading-relaxed">
              Your data is stored on secure servers located in Australia. Where data is transferred internationally (e.g., to cloud service providers), we ensure appropriate safeguards are in place in accordance with the Privacy Act.
            </p>

            <h3 className="text-xl font-medium text-foreground mt-6">5.2 Security Measures</h3>
            <p className="text-muted-foreground leading-relaxed">We implement industry-standard security measures including:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Encryption of data in transit (TLS/SSL) and at rest</li>
              <li>Secure authentication and access controls</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Employee training on data protection</li>
              <li>Incident response procedures</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mt-6">5.3 Data Retention</h3>
            <p className="text-muted-foreground leading-relaxed">We retain your data for:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li><strong>Active accounts:</strong> For the duration of your use of our Services</li>
              <li><strong>Compliance records:</strong> As required by law (typically 7 years for financial records, 3 years for work diary records)</li>
              <li><strong>Inactive accounts:</strong> Deleted or anonymised after 2 years of inactivity, unless retention is required by law</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">6. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mt-4">Under Australian Privacy Law, you have the right to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Complaint:</strong> Lodge a complaint if you believe we have breached the Privacy Act</li>
            </ul>
            
            <p className="text-muted-foreground leading-relaxed mt-4">If you are located in the EU/EEA, you may also have rights under GDPR including:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mt-4">
              To exercise these rights, please contact us using the details in Section 10.
            </p>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">7. Cookies and Tracking Technologies</h2>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Our web portals use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Maintain your session and authentication</li>
              <li>Remember your preferences</li>
              <li>Analyse usage patterns to improve our Services</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              You can control cookies through your browser settings, but disabling cookies may affect the functionality of our Services.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">8. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">9. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Posting the updated policy on our website and app</li>
              <li>Sending you a notification through the app or via email</li>
              <li>Updating the &quot;Last updated&quot; date at the top of this policy</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Your continued use of our Services after any changes indicates your acceptance of the updated Privacy Policy.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">10. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mt-4">
              If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:
            </p>
            <div className="bg-muted/50 p-6 rounded-lg mt-4">
              <p className="text-foreground font-medium">SmartProcess Pty Ltd</p>
              <p className="text-muted-foreground mt-2">
                <strong>Privacy Officer</strong><br />
                Email: privacy@smartprocess.com.au<br />
                Phone: 1300 XXX XXX<br />
                Address: [Your Business Address]<br />
                Sydney, NSW, Australia
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed mt-4">
              If you are not satisfied with our response to a privacy complaint, you may contact the Office of the Australian Information Commissioner (OAIC):
            </p>
            <div className="bg-muted/50 p-6 rounded-lg mt-4">
              <p className="text-foreground font-medium">Office of the Australian Information Commissioner</p>
              <p className="text-muted-foreground mt-2">
                Website: www.oaic.gov.au<br />
                Phone: 1300 363 992<br />
                Email: enquiries@oaic.gov.au
              </p>
            </div>
          </section>

          {/* Definitions */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">11. Definitions</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li><strong>&quot;Personal Information&quot;</strong> means information or an opinion about an identified individual, or an individual who is reasonably identifiable.</li>
              <li><strong>&quot;Services&quot;</strong> means the SmartProcess mobile application, web portals (Admin Portal, Client Portal, Subcontractor Portal, Driver Portal), and all related services.</li>
              <li><strong>&quot;You&quot;</strong> or <strong>&quot;User&quot;</strong> means any individual who accesses or uses our Services.</li>
            </ul>
          </section>
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
