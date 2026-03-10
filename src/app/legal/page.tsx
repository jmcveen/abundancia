'use client'

import Link from 'next/link'
import { FadeIn } from '@/components/animation'
import { ArrowLeft, Shield, FileText, Eye, Scale, Mail } from 'lucide-react'

export default function LegalPage() {
  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-canvas" />
        <div className="relative section-container">
          <FadeIn>
            <span className="eyebrow mb-4 block">Legal</span>
            <h1 className="font-display text-5xl md:text-6xl text-neutral-900 mb-6 max-w-4xl">
              Legal Notices & Privacy
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl leading-relaxed">
              Important legal information regarding the Abundancia Austin investment offering, website usage, and data privacy practices.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ DISCLAIMERS ═══ */}
      <section className="py-16 md:py-24 bg-canvas">
        <div className="section-container">
          <div className="max-w-3xl mx-auto space-y-12">
            <FadeIn>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                    <Scale className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="font-display text-2xl text-neutral-900">Securities Disclaimer</h2>
                </div>
                <div className="space-y-4 text-neutral-600 leading-relaxed">
                  <p>
                    The information presented on this website is for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any securities. Any such offer or solicitation will be made only by means of the Confidential Private Placement Memorandum (PPM) and related subscription documents, and only to qualified investors who meet the applicable investor suitability requirements.
                  </p>
                  <p>
                    Securities offered through this opportunity are exempt from registration under Regulation D, Rule 506(c) of the Securities Act of 1933, as amended, and are being offered exclusively to verified accredited investors as defined in Rule 501(a) of Regulation D.
                  </p>
                  <p>
                    <strong className="text-primary-800">Investing in real estate involves substantial risk, including the potential loss of principal.</strong> Past performance is not indicative of future results. Projections, forecasts, and estimates contained herein are forward-looking statements based on assumptions that the issuer believes to be reasonable but are inherently uncertain and subject to change.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="font-display text-2xl text-neutral-900">Forward-Looking Statements</h2>
                </div>
                <div className="space-y-4 text-neutral-600 leading-relaxed">
                  <p>
                    This website contains forward-looking statements, including projected returns (IRR, equity multiples), revenue forecasts, construction timelines, and market projections. These statements are based on current expectations and assumptions and are subject to risks and uncertainties that could cause actual results to differ materially.
                  </p>
                  <p>
                    Key risk factors include but are not limited to: construction cost increases, market conditions, regulatory changes, environmental factors, absorption rates, interest rate fluctuations, and general economic conditions. A complete discussion of risk factors is available in the Private Placement Memorandum.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="font-display text-2xl text-neutral-900">Confidentiality</h2>
                </div>
                <div className="space-y-4 text-neutral-600 leading-relaxed">
                  <p>
                    Certain areas of this website, including the Investor Data Room and financial models, contain confidential and proprietary information subject to Non-Disclosure Agreements. By accessing these sections, you acknowledge and agree to the following:
                  </p>
                  <ul className="space-y-2 ml-4">
                    {[
                      'Materials are for your personal evaluation and may not be distributed, copied, or shared without prior written consent from Abundancia Austin LLC.',
                      'You may share materials with your legal and financial advisors who are bound by professional confidentiality obligations.',
                      'Any reproduction, redistribution, or unauthorized use of these materials is strictly prohibited.',
                      'Your access to confidential materials may be revoked at any time at the sole discretion of the managing member.',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div id="privacy">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="font-display text-2xl text-neutral-900">Privacy Policy</h2>
                </div>
                <div className="space-y-4 text-neutral-600 leading-relaxed">
                  <h3 className="font-accent text-base font-semibold text-neutral-900">Information We Collect</h3>
                  <p>
                    We collect information you voluntarily provide through our waitlist and investor application forms, including: name, email address, phone number, accreditation status, and investment preferences. We also collect standard website analytics data (page views, session duration, referral source) through privacy-respecting analytics tools.
                  </p>

                  <h3 className="font-accent text-base font-semibold text-neutral-900">How We Use Your Information</h3>
                  <p>
                    Your information is used solely for the purpose of evaluating your interest in the Abundancia Austin opportunity, communicating investment-related updates, and responding to your inquiries. We do not sell, rent, or share your personal information with third parties for marketing purposes.
                  </p>

                  <h3 className="font-accent text-base font-semibold text-neutral-900">Data Security</h3>
                  <p>
                    We implement industry-standard security measures to protect your personal information. All data transmissions are encrypted via TLS/SSL. Access to personal data is limited to authorized personnel who require it for legitimate business purposes.
                  </p>

                  <h3 className="font-accent text-base font-semibold text-neutral-900">Your Rights</h3>
                  <p>
                    You may request access to, correction of, or deletion of your personal information at any time by contacting us at the email address below. You may also opt out of marketing communications by following the unsubscribe instructions in any email we send.
                  </p>

                  <h3 className="font-accent text-base font-semibold text-neutral-900">Cookies</h3>
                  <p>
                    This website uses essential cookies required for site functionality (such as the data room access code). We do not use third-party advertising or tracking cookies.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="font-display text-2xl text-neutral-900">Contact</h2>
                </div>
                <div className="space-y-4 text-neutral-600 leading-relaxed">
                  <p>
                    For legal inquiries, privacy requests, or questions about this offering:
                  </p>
                  <div className="card p-5">
                    <p className="font-accent text-sm font-semibold text-neutral-900">Abundancia Austin LLC</p>
                    <p className="text-sm text-neutral-600 mt-1">Managed by Light Brands Consulting LLC</p>
                    <a href="mailto:nicholas@lightbrands.ai" className="text-sm text-primary-600 hover:text-primary-800 transition-colors mt-2 block">
                      nicholas@lightbrands.ai
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ BACK LINK ═══ */}
      <section className="py-12 bg-canvas-subtle">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-neutral-600 hover:text-primary-800 transition-colors font-accent text-sm"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
