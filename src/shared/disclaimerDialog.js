"use client";
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AlertCircle, Database, FileText, Lock, Phone, Share2, UserCheck } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DialogDescription } from '@radix-ui/react-dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function DisclaimerDialog({ open, onClose, onAccept }) {

    const [agreed, setAgreed] = useState(false);

    const handleAccept = () => {
        if (onAccept) {
            onAccept();
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="lg:max-w-7xl sm:max-w-3xl max-h-[90vh] flex flex-col overflow-hidden [&>button]:cursor-pointer [&>button]:opacity-100 [&>button]:focus:ring-0 [&>button]:focus:ring-transparent [&>button]:focus:ring-offset-0 p-0 px-6 pt-3 pb-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-black text-center">DISCLAIMER & CONSENT NOTICE</DialogTitle>
                    <DialogDescription className="text-base font-semibold text-black">
                        Effective Date: [Date] | Version: 1.0
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-1 lg:px-3 px-1 overflow-auto block">
                    <div className="space-y-6 py-0">
                        {/* Section 1 */}
                        <section>
                            <div className="flex items-center gap-2 mb-3">
                                <FileText className="w-5 h-5 text-blue-600" />
                                <h3 className="text-lg font-bold text-black">1. Purpose of This App</h3>
                            </div>
                            <div className="px-3 space-y-3 text-sm text-black">
                                <p>
                                    <strong>[Your App Name]</strong> (&quot;We,&quot; &quot;Us,&quot; or &quot;Our&quot;) is a <strong>Personal Health Record (PHR) application</strong> compliant with the <strong>Ayushman Bharat Digital Mission (ABDM)</strong> standards. This App enables you to:
                                </p>
                                <ol className="list-decimal list-inside space-y-2 ml-4">
                                    <li>Create and manage your <strong>Health records, Interpret the records</strong> using AI and OCR technologies and manage and access <strong>Ayushman Bharat Health Account (ABHA)</strong>.</li>
                                    <li>Digitally store, access, and share your health records (e.g., prescriptions, lab reports) with healthcare providers.</li>
                                    <li>Utilize features like OCR-based prescription reading and regional language translation for your personal use.</li>
                                </ol>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section className="border-t pt-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Lock className="w-5 h-5 text-green-600" />
                                <h3 className="text-lg font-bold text-black">2. Compliance with DPDP Act, 2023</h3>
                            </div>
                            <p className="px-3 text-sm text-black">
                                We process your personal data in strict compliance with the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and the <strong>ABDM Health Data Management Policy</strong>.
                            </p>
                            <p className="px-3 text-sm text-black">
                                We act as a <strong>Data Fiduciary</strong> responsible for safeguarding your information.
                            </p>
                        </section>

                        {/* Section 3 */}
                        <section className="border-t pt-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Database className="w-5 h-5 text-purple-600" />
                                <h3 className="text-lg font-bold text-black">3. Data Collection</h3>
                            </div>
                            <div className="px-3 space-y-3 text-sm text-black">
                                <p>We collect the following personal data by using listed below method:</p>
                                <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <div className="flex gap-2">
                                        <span className="font-semibold min-w-fit">•</span>
                                        <div><strong>Camera:</strong> Strictly to scan physical documents. We do not access your other photos.</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="font-semibold min-w-fit">•</span>
                                        <div><strong>Storage:</strong> To save the digitized PDF reports to your phone so you can print them.</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="font-semibold min-w-fit">•</span>
                                        <div><strong>Microphone:</strong> If you use voice commands to search your records (e.g., &quot;Show me my last blood test&quot;).</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 4 */}
                        <section className="border-t pt-6">
                            <div className="flex items-center gap-2 mb-3">
                                <UserCheck className="w-5 h-5 text-indigo-600" />
                                <h3 className="text-lg font-bold text-black">4. Your Rights (Data Principal Rights)</h3>
                            </div>
                            <div className="px-3 space-y-3 text-sm text-black">
                                <p>Under the DPDP Act, you have the right to:</p>
                                <div className="space-y-3">
                                    <div className="flex gap-2">
                                        <span className="font-semibold min-w-fit">•</span>
                                        <div><strong>Access:</strong> Request a summary of your personal data stored with us.</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="font-semibold min-w-fit">•</span>
                                        <div><strong>Correction:</strong> Request correction or update of inaccurate personal data.</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="font-semibold min-w-fit">•</span>
                                        <div><strong>Withdraw Consent:</strong> You can withdraw your consent for data processing at any time via the Settings &gt; Privacy menu. Note: Withdrawal does not affect the legality of processing done prior to withdrawal.</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="font-semibold min-w-fit">•</span>
                                        <div><strong>Grievance Redressal:</strong> Contact our Grievance Officer for any data privacy concerns.</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 5 */}
                        <section className="border-t pt-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Share2 className="w-5 h-5 text-teal-600" />
                                <h3 className="text-lg font-bold text-black">5. Data Sharing & Disclosure</h3>
                            </div>
                            <div className="px-3 space-y-3 text-sm text-black">
                                <div className="flex gap-2">
                                    <span className="font-semibold min-w-fit">•</span>
                                    <div><strong>Consent-Based Sharing:</strong> Your health records are shared with Healthcare Professionals (doctors/hospitals) <strong>ONLY</strong> when you grant explicit consent via the App (e.g., &quot;Scan &amp; Share&quot; or &quot;Consent Request&quot;).</div>
                                </div>
                                <div className="flex gap-2">
                                    <span className="font-semibold min-w-fit">•</span>
                                    <div><strong>No Third-Party Sale:</strong> We <strong>DO NOT</strong> sell your personal data to advertisers, insurance companies, or third parties for commercial gain.</div>
                                </div>
                                <div className="flex gap-2">
                                    <span className="font-semibold min-w-fit">•</span>
                                    <div><strong>Legal Obligation:</strong> We may disclose data if required by law or a court order.</div>
                                </div>
                            </div>
                        </section>

                        {/* Section 6 */}
                        <section className="border-t pt-6">
                            <div className="flex items-center gap-2 mb-3">
                                <AlertCircle className="w-5 h-5 text-red-600" />
                                <h3 className="text-lg font-bold text-red-700">6. Medical Disclaimer</h3>
                            </div>
                            <div className="px-3 space-y-3 text-sm text-black bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                                <div className="flex gap-2">
                                    <span className="font-semibold min-w-fit">•</span>
                                    <div><strong>Not Medical Advice:</strong> The AI-based features (e.g., prescription explanation, health insights) are for <strong>informational purposes only</strong> and do not constitute professional medical advice, diagnosis, or treatment.</div>
                                </div>
                                <div className="flex gap-2">
                                    <span className="font-semibold min-w-fit">•</span>
                                    <div><strong>Consult a Doctor:</strong> Always seek the advice of a qualified physician with any questions regarding a medical condition. Never disregard professional medical advice or delay seeking it because of something you have read on this App.</div>
                                </div>
                            </div>
                        </section>

                        {/* Section 7 */}
                        <section className="border-t pt-6 mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Phone className="w-5 h-5 text-orange-600" />
                                <h3 className="text-lg font-bold text-black">7. Grievance Redressal</h3>
                            </div>
                            <div className="px-3 text-sm text-black">
                                <p className="mb-3">For any questions, privacy concerns, or to exercise your rights, please contact our Data Protection Officer (DPO):</p>
                                <div className="space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <div className="flex gap-2">
                                        <span className="font-semibold min-w-fit">•</span>
                                        <div><strong>Name:</strong> [Name of DPO]</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="font-semibold min-w-fit">•</span>
                                        <div><strong>Email:</strong> privacy@yourdomain.com</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="font-semibold min-w-fit">•</span>
                                        <div><strong>Phone:</strong> [Phone Number]</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* References Section */}
                        <section className="border-t pt-6 mb-4">
                            <h3 className="text-lg font-bold text-black mb-4">REFERENCES</h3>
                            <div className="space-y-4 text-sm text-black">

                                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                    <h4 className="font-bold text-blue-700 mb-2">1. ABDM Health Data Management Policy (HDMP)</h4>
                                    <p className="mb-2"><strong>Why it is #1:</strong> This is the &quot;Bible&quot; for digital health compliance. Your disclaimer must explicitly reference Clause 26.3 and Clause 32 of this policy. It covers how you must handle consent, data minimization, and grievance redressal.</p>
                                    <p className="text-xs"><strong>Link:</strong> <a href="https://abdm.gov.in/publications/policies_regulations/health_data_management_policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 break-all">https://abdm.gov.in/publications/policies_regulations/health_data_management_policy</a></p>
                                </div>

                                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                    <h4 className="font-bold text-blue-700 mb-2">2. ABHA (PHR) App Privacy Policy</h4>
                                    <p className="mb-2"><strong>Why it is important:</strong> This is the &quot;Gold Standard&quot; template. Since you are building a PHR (Personal Health Record) app, you should model your disclaimer on the official government app policy to ensure you are not missing any standard clauses.</p>
                                    <p className="text-xs"><strong>Link:</strong> <a href="https://abdm.gov.in/uploads/ABDM_ABHA_mobile_application_privacy_policy_bf59567bfa.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 break-all">https://abdm.gov.in/uploads/ABDM_ABHA_mobile_application_privacy_policy_bf59567bfa.pdf</a></p>
                                </div>

                                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                    <h4 className="font-bold text-blue-700 mb-2">3. Model Data Privacy Notice (ABDM Template)</h4>
                                    <p className="mb-2"><strong>Why it is important:</strong> The National Health Authority (NHA) released this specifically for &quot;Data Fiduciaries&quot; (that is you). It gives you the exact legal language they expect you to use when asking users for data.</p>
                                    <p className="text-xs"><strong>Link:</strong> <a href="https://abdm.gov.in:8081/uploads/model_privacy_notice_7ee5198211.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 break-all">https://abdm.gov.in:8081/uploads/model_privacy_notice_7ee5198211.pdf</a></p>
                                </div>

                                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                    <h4 className="font-bold text-blue-700 mb-2">4. ABDM Sandbox Guidelines (Integration & Privacy)</h4>
                                    <p className="mb-2"><strong>Why it is important:</strong> Before you can go live, you must pass the Sandbox exit. These guidelines detail the specific privacy checks (like &quot;Consent Log Maintenance&quot;) your disclaimer must promise to uphold.</p>
                                    <p className="text-xs"><strong>Link:</strong> <a href="https://abdm.gov.in:8081/uploads/sandbox_guidelines_b39bcce23e.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 break-all">https://abdm.gov.in:8081/uploads/sandbox_guidelines_b39bcce23e.pdf</a></p>
                                </div>

                                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                    <h4 className="font-bold text-blue-700 mb-2">5. Consent Management Guidelines (HIE-CM)</h4>
                                    <p className="mb-2"><strong>Why it is important:</strong> Since your app deals with &quot;sharing&quot; records (from doctor to patient), you fall under &quot;Health Information Exchange&quot; rules. This document explains the legal flow of &quot;Granting&quot; and &quot;Revoking&quot; consent, which your disclaimer must mention.</p>
                                    <p className="text-xs"><strong>Link:</strong> <a href="https://abdm.gov.in:8081/uploads/HIP_HIU_Guidelines_f85df336ec.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 break-all">https://abdm.gov.in:8081/uploads/HIP_HIU_Guidelines_f85df336ec.pdf</a></p>
                                </div>

                            </div>
                        </section>

                        
                        {/* Consent Declaration */}
                        <section className="border-t pt-6 mb-4">
                            <h3 className="text-lg font-bold text-black mb-4 text-center">CONSENT DECLARATION</h3>
                            <div className="text-sm text-black space-y-3 bg-blue-50 p-5 rounded-lg border-2 border-blue-300">
                                <p className="font-semibold">By clicking <strong>&quot;I Agree&quot;</strong> or <strong>&quot;Proceed&quot;</strong>, I hereby:</p>
                                <ol className="list-decimal list-inside space-y-2 ml-4">
                                    <li>Confirm that I have read and understood the <strong>Privacy Notice</strong> and <strong>Disclaimer</strong> above.</li>
                                    <li>Give my <strong>explicit, free, specific, and informed consent</strong> to <strong>[Your App Name]</strong> to collect and process my personal data for the purposes stated above.</li>
                                    <li>Understand that I can <strong>withdraw my consent</strong> at any time through the App settings.</li>
                                </ol>
                            </div>
                        </section>

                        {/* Consent Checkbox */}
                        <div className="flex items-center gap-3">
                            <Checkbox id="consent" className='cursor-pointer border-black' checked={agreed} onCheckedChange={(checked) => setAgreed(checked)} />
                            <Label htmlFor="consent" className="text-black text-sm font-bold cursor-pointer">I Agree to the Terms & Privacy Policy</Label>
                        </div>
                    </div>
                </div>
                <DialogFooter className='mt-4 flex gap-3 justify-end'>
                    <Button
                        variant='outline'
                        type="submit"
                        size={'lg'}
                        className="cursor-pointer bg-transparent hover:bg-transparent text-brand-dark-green hover:text-brand-dark-green font-bold text-sm py-2 px-4 rounded-md border-brand-dark-green shadow-none"
                        onClick={onClose}
                    >
                        Close
                    </Button>
                    <Button
                        type="submit"
                        size={'lg'}
                        disabled={!agreed}
                        className="cursor-pointer bg-brand-dark-green text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-brand-dark-green-hover disabled:opacity-50"
                        onClick={handleAccept}
                    >
                        Accept
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
