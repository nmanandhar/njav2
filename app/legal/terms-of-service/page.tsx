"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsOfServicePage() {
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
          <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
          <p className="text-muted-foreground mt-2">Last updated: January 15, 2024</p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          {/* Agreement */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">1. Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed mt-4">
              These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User&quot;, &quot;you&quot;, or &quot;your&quot;) and SmartProcess Pty Ltd (ABN XX XXX XXX XXX) (&quot;SmartProcess&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) governing your access to and use of the SmartProcess mobile application, web portals, and related services (collectively, the &quot;Services&quot;).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use our Services.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If you are using our Services on behalf of an organisation, you represent and warrant that you have the authority to bind that organisation to these Terms.
            </p>
          </section>

          {/* Description of Services */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">2. Description of Services</h2>
            <p className="text-muted-foreground leading-relaxed mt-4">
              SmartProcess provides a cloud-based logistics and fleet management platform designed for the transport and haulage industry. Our Services include:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li><strong>Driver Mobile Application:</strong> Job management, pre-start checklists, timesheet recording, proof of delivery capture, and communication tools</li>
              <li><strong>Admin Portal:</strong> Dispatch operations, fleet management, driver management, invoicing, and reporting</li>
              <li><strong>Client Portal:</strong> Job requests, delivery tracking, and document access</li>
              <li><strong>Subcontractor Portal:</strong> Job acceptance, availability management, and compliance documentation</li>
            </ul>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">3. User Accounts</h2>
            
            <h3 className="text-xl font-medium text-foreground mt-6">3.1 Account Creation</h3>
            <p className="text-muted-foreground leading-relaxed">
              To access our Services, you must create an account or be provided with account credentials by an authorised administrator. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate.
            </p>

            <h3 className="text-xl font-medium text-foreground mt-6">3.2 Account Security</h3>
            <p className="text-muted-foreground leading-relaxed">You are responsible for:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorised access or security breach</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-2">
              We reserve the right to suspend or terminate your account if we suspect unauthorised use or security violations.
            </p>

            <h3 className="text-xl font-medium text-foreground mt-6">3.3 Account Types</h3>
            <p className="text-muted-foreground leading-relaxed">
              Different account types have different access levels and permissions. Your access is determined by the account type assigned to you and the permissions granted by your organisation&apos;s administrator.
            </p>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">4. User Responsibilities</h2>
            
            <h3 className="text-xl font-medium text-foreground mt-6">4.1 Lawful Use</h3>
            <p className="text-muted-foreground leading-relaxed">You agree to use our Services only for lawful purposes and in compliance with:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>All applicable laws and regulations</li>
              <li>The Heavy Vehicle National Law (HVNL)</li>
              <li>Chain of Responsibility obligations</li>
              <li>Work Health and Safety legislation</li>
              <li>Fair Work Act and relevant industrial instruments</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mt-6">4.2 Accurate Information</h3>
            <p className="text-muted-foreground leading-relaxed">You agree to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Provide truthful and accurate information in all submissions</li>
              <li>Accurately record timesheets, job completions, and pre-start checklists</li>
              <li>Not falsify delivery records, signatures, or compliance documentation</li>
              <li>Keep your licence, certification, and compliance information up to date</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mt-6">4.3 Location Services</h3>
            <p className="text-muted-foreground leading-relaxed">
              By using our driver mobile application, you consent to the collection of location data as described in our Privacy Policy. This data is essential for dispatch operations, delivery verification, and regulatory compliance.
            </p>
          </section>

          {/* Prohibited Activities */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">5. Prohibited Activities</h2>
            <p className="text-muted-foreground leading-relaxed mt-4">You agree NOT to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Use the Services for any unlawful purpose</li>
              <li>Falsify or manipulate any data, records, or documentation</li>
              <li>Attempt to gain unauthorised access to any part of the Services</li>
              <li>Interfere with or disrupt the integrity or performance of the Services</li>
              <li>Reverse engineer, decompile, or disassemble any part of the Services</li>
              <li>Use automated systems (bots, scrapers) to access the Services</li>
              <li>Share your account credentials with others</li>
              <li>Impersonate another user or entity</li>
              <li>Upload malicious code, viruses, or harmful content</li>
              <li>Circumvent any security measures or access controls</li>
              <li>Use the Services to harass, abuse, or harm others</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">6. Intellectual Property</h2>
            
            <h3 className="text-xl font-medium text-foreground mt-6">6.1 Our Intellectual Property</h3>
            <p className="text-muted-foreground leading-relaxed">
              The Services, including all content, features, and functionality (including but not limited to software, text, graphics, logos, icons, images, and audio), are owned by SmartProcess or our licensors and are protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-2">
              We grant you a limited, non-exclusive, non-transferable, revocable licence to use the Services for their intended purpose in accordance with these Terms.
            </p>

            <h3 className="text-xl font-medium text-foreground mt-6">6.2 Your Content</h3>
            <p className="text-muted-foreground leading-relaxed">
              You retain ownership of any content you upload to the Services (such as photos, documents, and data). By uploading content, you grant us a worldwide, royalty-free licence to use, store, and process that content solely for the purpose of providing and improving our Services.
            </p>

            <h3 className="text-xl font-medium text-foreground mt-6">6.3 Feedback</h3>
            <p className="text-muted-foreground leading-relaxed">
              If you provide feedback, suggestions, or ideas about our Services, you grant us the right to use such feedback without restriction or compensation to you.
            </p>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">7. Payment Terms</h2>
            
            <h3 className="text-xl font-medium text-foreground mt-6">7.1 Subscription Fees</h3>
            <p className="text-muted-foreground leading-relaxed">
              Access to our Services may require payment of subscription fees. Fees are determined by your subscription plan and are subject to change with notice.
            </p>

            <h3 className="text-xl font-medium text-foreground mt-6">7.2 Billing</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Subscription fees are billed in advance on a monthly or annual basis</li>
              <li>All fees are quoted in Australian Dollars (AUD) and are exclusive of GST unless stated otherwise</li>
              <li>Fees are non-refundable except as required by law</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mt-6">7.3 Late Payment</h3>
            <p className="text-muted-foreground leading-relaxed">
              If payment is not received by the due date, we reserve the right to suspend access to the Services and charge interest on overdue amounts at the rate prescribed under the Penalty Interest Rates Act 1983 (Vic).
            </p>
          </section>

          {/* Service Availability */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">8. Service Availability and Modifications</h2>
            
            <h3 className="text-xl font-medium text-foreground mt-6">8.1 Availability</h3>
            <p className="text-muted-foreground leading-relaxed">
              We strive to maintain high availability of our Services but do not guarantee uninterrupted access. The Services may be temporarily unavailable due to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Scheduled maintenance (we will provide advance notice where practicable)</li>
              <li>Emergency maintenance or repairs</li>
              <li>Factors beyond our reasonable control (e.g., internet outages, natural disasters)</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mt-6">8.2 Modifications</h3>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify, update, or discontinue any aspect of the Services at any time. We will provide reasonable notice of material changes that affect your use of the Services.
            </p>
          </section>

          {/* Data and Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">9. Data and Privacy</h2>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Your use of the Services is also governed by our <Link href="/legal/privacy-policy" className="text-teal-600 hover:underline">Privacy Policy</Link>, which describes how we collect, use, and protect your personal information. By using our Services, you consent to our data practices as described in the Privacy Policy.
            </p>
          </section>

          {/* Disclaimer of Warranties */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">10. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed mt-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Implied warranties of merchantability, fitness for a particular purpose, and non-infringement</li>
              <li>Warranties that the Services will be uninterrupted, error-free, or secure</li>
              <li>Warranties regarding the accuracy, reliability, or completeness of any content</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Nothing in these Terms excludes, restricts, or modifies any consumer guarantee, right, or remedy conferred by the Australian Consumer Law that cannot be excluded, restricted, or modified by agreement.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">11. Limitation of Liability</h2>
            
            <h3 className="text-xl font-medium text-foreground mt-6">11.1 Exclusion of Certain Damages</h3>
            <p className="text-muted-foreground leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, SMARTPROCESS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Loss of profits, revenue, or business</li>
              <li>Loss of data or data corruption</li>
              <li>Business interruption</li>
              <li>Loss of goodwill or reputation</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mt-6">11.2 Cap on Liability</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our total liability for all claims arising out of or relating to these Terms or your use of the Services shall not exceed the greater of: (a) the total fees paid by you in the 12 months preceding the claim; or (b) $1,000 AUD.
            </p>

            <h3 className="text-xl font-medium text-foreground mt-6">11.3 Essential Purpose</h3>
            <p className="text-muted-foreground leading-relaxed">
              The limitations in this section apply regardless of the form of action, whether in contract, tort, negligence, strict liability, or otherwise, and even if we have been advised of the possibility of such damages.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">12. Indemnification</h2>
            <p className="text-muted-foreground leading-relaxed mt-4">
              You agree to indemnify, defend, and hold harmless SmartProcess, its officers, directors, employees, agents, and affiliates from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising out of or relating to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Your use of the Services</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any applicable laws or regulations</li>
              <li>Your violation of any third-party rights</li>
              <li>Any content you upload or submit to the Services</li>
            </ul>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">13. Termination</h2>
            
            <h3 className="text-xl font-medium text-foreground mt-6">13.1 Termination by You</h3>
            <p className="text-muted-foreground leading-relaxed">
              You may terminate your account at any time by contacting us. Your organisation&apos;s administrator may also deactivate your account.
            </p>

            <h3 className="text-xl font-medium text-foreground mt-6">13.2 Termination by Us</h3>
            <p className="text-muted-foreground leading-relaxed">We may suspend or terminate your access to the Services:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>For breach of these Terms</li>
              <li>For non-payment of fees</li>
              <li>If required by law</li>
              <li>If we discontinue the Services</li>
              <li>For any other reason with 30 days&apos; notice</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mt-6">13.3 Effect of Termination</h3>
            <p className="text-muted-foreground leading-relaxed">Upon termination:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Your right to access the Services will cease immediately</li>
              <li>We may retain data as required by law or for legitimate business purposes</li>
              <li>Provisions that by their nature should survive termination will remain in effect</li>
            </ul>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">14. Dispute Resolution</h2>
            
            <h3 className="text-xl font-medium text-foreground mt-6">14.1 Informal Resolution</h3>
            <p className="text-muted-foreground leading-relaxed">
              Before initiating any formal dispute resolution, you agree to contact us first to attempt to resolve the dispute informally. Most disputes can be resolved quickly through good faith discussion.
            </p>

            <h3 className="text-xl font-medium text-foreground mt-6">14.2 Mediation</h3>
            <p className="text-muted-foreground leading-relaxed">
              If informal resolution fails, any dispute shall be submitted to mediation administered by the Australian Disputes Centre in accordance with its mediation rules before proceeding to litigation.
            </p>

            <h3 className="text-xl font-medium text-foreground mt-6">14.3 Governing Law and Jurisdiction</h3>
            <p className="text-muted-foreground leading-relaxed">
              These Terms are governed by the laws of New South Wales, Australia. You agree to submit to the exclusive jurisdiction of the courts of New South Wales for the resolution of any disputes.
            </p>
          </section>

          {/* General Provisions */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">15. General Provisions</h2>
            
            <h3 className="text-xl font-medium text-foreground mt-6">15.1 Entire Agreement</h3>
            <p className="text-muted-foreground leading-relaxed">
              These Terms, together with the Privacy Policy and any other agreements referenced herein, constitute the entire agreement between you and SmartProcess regarding the Services.
            </p>

            <h3 className="text-xl font-medium text-foreground mt-6">15.2 Severability</h3>
            <p className="text-muted-foreground leading-relaxed">
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.
            </p>

            <h3 className="text-xl font-medium text-foreground mt-6">15.3 Waiver</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our failure to enforce any provision of these Terms shall not constitute a waiver of that provision or any other provision.
            </p>

            <h3 className="text-xl font-medium text-foreground mt-6">15.4 Assignment</h3>
            <p className="text-muted-foreground leading-relaxed">
              You may not assign or transfer your rights or obligations under these Terms without our prior written consent. We may assign our rights and obligations without restriction.
            </p>

            <h3 className="text-xl font-medium text-foreground mt-6">15.5 Force Majeure</h3>
            <p className="text-muted-foreground leading-relaxed">
              We shall not be liable for any failure to perform our obligations where such failure results from circumstances beyond our reasonable control, including but not limited to natural disasters, war, terrorism, strikes, government actions, or internet outages.
            </p>

            <h3 className="text-xl font-medium text-foreground mt-6">15.6 Notices</h3>
            <p className="text-muted-foreground leading-relaxed">
              We may provide notices to you through the Services, via email, or by other means. You agree that electronic notices satisfy any legal requirement that notices be in writing.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">16. Changes to These Terms</h2>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We reserve the right to modify these Terms at any time. We will provide notice of material changes by:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-2">
              <li>Posting the updated Terms on our website and app</li>
              <li>Sending you a notification through the Services or via email</li>
              <li>Updating the &quot;Last updated&quot; date at the top of these Terms</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Your continued use of the Services after the effective date of any changes constitutes your acceptance of the revised Terms.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b pb-2">17. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mt-4">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-muted/50 p-6 rounded-lg mt-4">
              <p className="text-foreground font-medium">SmartProcess Pty Ltd</p>
              <p className="text-muted-foreground mt-2">
                Email: legal@smartprocess.com.au<br />
                Phone: 1300 XXX XXX<br />
                Address: [Your Business Address]<br />
                Sydney, NSW, Australia
              </p>
            </div>
          </section>

          {/* Acknowledgement */}
          <section className="bg-muted/30 p-6 rounded-lg border">
            <h2 className="text-xl font-semibold text-foreground">Acknowledgement</h2>
            <p className="text-muted-foreground leading-relaxed mt-4">
              BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE, UNDERSTOOD THEM, AND AGREE TO BE BOUND BY THEM. IF YOU DO NOT AGREE TO THESE TERMS, YOU ARE NOT AUTHORISED TO USE THE SERVICES.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SmartProcess Pty Ltd. All rights reserved.
          </p>
          <Link href="/legal/privacy-policy" className="text-sm text-teal-600 hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  )
}
