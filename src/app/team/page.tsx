'use client'

import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import { ArrowRight, Award, Building2, TreePine, Handshake } from 'lucide-react'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'

// ═══════════════════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════════════════

const TRACK_RECORD = [
  { target: 755, prefix: '$', suffix: 'M+', label: 'Raised for RE Projects' },
  { target: 200, suffix: '+', label: 'Successful Transactions' },
  { target: 70, suffix: '+', label: 'Eco Communities Analyzed' },
  { target: 21, label: 'Sustainable Projects' },
]

const CORE_TEAM = [
  {
    name: 'Kelly Krezek',
    role: 'CEO, New Earth Development',
    bio: 'Visionary leader driving the regenerative development movement. Deep expertise in sustainable community design, investor relations, and project management across multiple eco-development projects.',
  },
  {
    name: 'Joe McVeen',
    role: 'Marketing & Community',
    bio: 'Brand strategist and community builder with experience in purpose-driven marketing. Leads Abundancia\'s narrative and investor communications.',
  },
  {
    name: 'Gloria Merrick',
    role: 'Tiny Home Builder',
    bio: 'Specialist in compact, efficient living spaces. Brings hands-on construction experience and deep knowledge of tiny home design, materials, and Texas building codes.',
  },
  {
    name: 'Rohan Guyot-Sutherland',
    role: 'Regenerative Systems',
    bio: 'Expert in permaculture design, renewable energy systems, and ecological restoration. Leads the integration of regenerative infrastructure across the community.',
  },
  {
    name: 'Angele Miller',
    role: 'Glamping & Retreat Operations',
    bio: 'Experienced hospitality operator specializing in nature-based retreat experiences. Manages Abundancia\'s Phase 1 retreat center revenue engine.',
  },
  {
    name: 'Fred Haas PE',
    role: 'Civil Engineer',
    bio: 'Licensed professional engineer with extensive experience in land development, site infrastructure, utility systems, and regulatory compliance in Texas.',
  },
  {
    name: 'Paul Merrick',
    role: 'Construction',
    bio: 'Construction management professional with expertise in natural building materials, hempcrete construction techniques, and project delivery.',
  },
  {
    name: 'Lancelot Stukaloff',
    role: 'Capital Markets',
    bio: 'Capital markets specialist with deep experience structuring real estate investment vehicles, investor relations, and fund management.',
  },
]

const PARTNERS = [
  {
    name: 'Eduardo Esparza',
    org: 'RECODE Fund',
    focus: 'Impact Investment',
  },
  {
    name: 'Jeff Hall',
    org: 'Paragon Development',
    focus: 'Development Advisory',
  },
  {
    name: 'Jodie & Can',
    org: 'Inphinity Design Architects',
    focus: 'Biophilic Architecture',
  },
  {
    name: 'Angie Gonzales',
    org: 'Independent',
    focus: 'Permaculture Design',
  },
  {
    name: 'Kacee Jackson',
    org: 'Independent',
    focus: 'Development Advisory',
  },
  {
    name: 'Symbiosis TX',
    org: 'Symbiosis TX',
    focus: 'Regenerative Land Planning',
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// Animated Stat
// ═══════════════════════════════════════════════════════════════════════════

function AnimatedStat({ target, suffix, prefix, label }: {
  target: number
  suffix?: string
  prefix?: string
  label: string
}) {
  const { count, ref } = useAnimatedCounter({ target })

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl sm:text-4xl font-bold text-white mb-1">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="font-accent text-sm text-white/70 uppercase tracking-wider">
        {label}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

export default function TeamPage() {
  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-canvas" />
        <div className="relative section-container">
          <FadeIn>
            <span className="eyebrow mb-4 block">Leadership</span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-neutral-900 mb-6 max-w-4xl">
              The Team Behind the Vision
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl leading-relaxed">
              A multidisciplinary team of developers, builders, designers, engineers, and capital markets professionals — united by the conviction that regenerative development is the future.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ TRACK RECORD BAR ═══ */}
      <section className="bg-primary-900 py-12 md:py-16">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {TRACK_RECORD.map((stat) => (
              <AnimatedStat
                key={stat.label}
                target={stat.target}
                prefix={stat.prefix}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CORE TEAM ═══ */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">
                <Award className="w-4 h-4 inline mr-2 -mt-0.5" />
                Core Team
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Leadership
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_TEAM.map((member) => (
              <StaggerItem key={member.name}>
                <div className="card p-6 h-full">
                  <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                    <span className="font-display text-xl font-bold text-primary-700">
                      {member.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-accent text-base font-semibold text-neutral-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="font-accent text-xs text-primary-600 mb-3">{member.role}</p>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ PARTNERS & ADVISORS ═══ */}
      <section className="py-20 md:py-28 bg-canvas-subtle">
        <div className="section-container">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow mb-3 block">
                <Handshake className="w-4 h-4 inline mr-2 -mt-0.5" />
                Partners & Advisors
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-4">
                Strategic Partners
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {PARTNERS.map((partner) => (
              <StaggerItem key={partner.name}>
                <div className="card p-5">
                  <h3 className="font-accent text-base font-semibold text-neutral-900 mb-0.5">
                    {partner.name}
                  </h3>
                  <p className="font-accent text-xs text-primary-600 mb-2">{partner.org}</p>
                  <p className="text-sm text-neutral-600">{partner.focus}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ NEW EARTH DEVELOPMENT ═══ */}
      <section className="py-20 md:py-28 bg-primary-900 text-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div>
                <span className="font-accent text-sm font-semibold uppercase tracking-widest text-secondary-400 mb-3 block">
                  <Building2 className="w-4 h-4 inline mr-2 -mt-0.5" />
                  Development Company
                </span>
                <h2 className="font-display text-4xl md:text-5xl mb-6">
                  New Earth Development
                </h2>
                <p className="text-lg text-white/70 leading-relaxed mb-6">
                  We are here to bring about revolutionary societal change through regenerative culture and built environments. Recognizing the cutting-edge technology and abundant natural resources available on Earth today, we are creating the models to eradicate poverty, homelessness, hunger, disease, war, and crime.
                </p>
                <p className="text-lg text-white/70 leading-relaxed">
                  Our passion is to develop a new society in which all beings are free to thrive in unity and peace. Abundancia Austin is our flagship project — the proof of concept for a global movement.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-4">
                {[
                  { icon: TreePine, title: 'Regenerative First', description: 'Every project is designed to leave the land better than we found it.' },
                  { icon: Building2, title: 'Proven Track Record', description: '$755M+ raised, 200+ successful transactions, 21 sustainable development projects.' },
                  { icon: Award, title: 'Living Building Challenge', description: 'Building to the world\'s most rigorous green building certification standard.' },
                ].map((item) => (
                  <div key={item.title} className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary-500/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-secondary-400" />
                    </div>
                    <div>
                      <h3 className="font-accent text-sm font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-canvas py-20 md:py-28">
        <div className="section-container text-center">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl text-neutral-900 mb-6">
              Ready to Learn More?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-10">
              Explore the executive summary or apply to join the investor waitlist.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/invest/apply" className="btn-accent btn-lg rounded-2xl text-base">
                Join Investor Waitlist
              </Link>
              <Link href="/overview" className="btn-secondary btn-lg rounded-2xl text-base group">
                Read Executive Summary
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
