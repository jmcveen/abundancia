'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animation'
import { Modal } from '@/components/ui/Modal'
import { ArrowRight, Award, Building2, TreePine, Handshake, ExternalLink } from 'lucide-react'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'

// ═══════════════════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════════════════

const TRACK_RECORD = [
  {
    target: 755,
    prefix: '$',
    suffix: 'M+',
    label: 'Raised for RE Projects',
    detail: 'Over $755 million raised across institutional real estate funds, private syndications, and development joint ventures. Our capital markets experience spans multifamily, mixed-use, hospitality, and purpose-built communities across Texas, the Southwest, and beyond.',
    breakdown: [
      'Institutional fund raises — LP/GP structures, Reg D 506(b) and 506(c)',
      'Development JVs — equity + debt structuring for ground-up projects',
      'Geographies — Texas, Colorado, Arizona, California, Pacific Northwest',
      'Fund types — value-add, opportunistic, impact, and regenerative',
    ],
    dataRoomLink: '/data-room/view/investment/executive-summary',
  },
  {
    target: 200,
    suffix: '+',
    label: 'Successful Transactions',
    detail: 'Our collective team has closed over 200 real estate transactions including acquisitions, dispositions, refinancings, and development closings. This depth of transactional experience means we know how to navigate complex deal structures, title issues, and regulatory hurdles.',
    breakdown: [
      'Acquisitions and dispositions across all asset classes',
      'Land assemblages and entitlements',
      'Construction loan closings and permanent financing',
      'Tax credit and incentive program structuring',
    ],
    dataRoomLink: '/data-room/view/investment/executive-summary',
  },
  {
    target: 70,
    suffix: '+',
    label: 'Eco Communities Analyzed',
    detail: 'Our research spans 70+ intentional and eco-communities worldwide — from Findhorn in Scotland to Auroville in India. We have studied what works, what fails, and why. Abundancia incorporates the best practices while avoiding the pitfalls that derail most community projects.',
    breakdown: [
      'Governance models — sociocracy, holacracy, consensus, hybrid',
      'Revenue engines — real estate sales, hospitality, agriculture, education',
      'Failure patterns — undercapitalization, governance collapse, market disconnect',
      'Success factors — financial sustainability, clear structure, phased growth',
    ],
    dataRoomLink: '/data-room/view/research/market-research-report',
  },
  {
    target: 21,
    label: 'Sustainable Projects',
    detail: 'Twenty-one completed or in-progress sustainable development projects, ranging from LEED-certified multifamily buildings to net-zero energy communities. Each project has informed our approach to regenerative design, construction, and community operations.',
    breakdown: [
      'LEED and Living Building Challenge certified projects',
      'Net-zero energy and water communities',
      'Permaculture-integrated residential developments',
      'Regenerative agriculture + housing hybrid models',
    ],
    dataRoomLink: '/data-room/view/investment/investor-presentation',
  },
]

const CORE_TEAM = [
  {
    name: 'Kelly Krezek',
    photo: '/images/team/kelly-krezek.jpg',
    role: 'CEO, New Earth Development',
    bio: 'Visionary leader driving the regenerative development movement. Deep expertise in sustainable community design, investor relations, and project management across multiple eco-development projects.',
    expertise: ['Regenerative Development', 'Investor Relations', 'Community Design', 'Project Management'],
    achievements: [
      'Founded New Earth Development to pioneer regenerative community models',
      'Assembled and leads the cross-disciplinary team bringing Abundancia to life',
    ],
    linkedIn: '',
    projectLink: { label: 'New Earth Development', href: '/team#new-earth-development' },
  },
  {
    name: 'Joe McVeen',
    photo: '/images/team/joe-mcveen.jpg',
    role: 'Marketing & Community',
    bio: 'Brand strategist and community builder with experience in purpose-driven marketing. Leads Abundancia\'s narrative and investor communications.',
    expertise: ['Brand Strategy', 'Community Building', 'Investor Communications', 'Digital Marketing'],
    achievements: [
      'Built Abundancia\'s full investor marketing platform and brand identity',
      'Leads community engagement and SXSW 2026 investor outreach',
    ],
    linkedIn: '',
  },
  {
    name: 'Gloria Merrick',
    photo: '/images/team/gloria-merrick.png',
    role: 'Tiny Home Builder',
    bio: 'Specialist in compact, efficient living spaces. Brings hands-on construction experience and deep knowledge of tiny home design, materials, and Texas building codes.',
    expertise: ['Tiny Home Design', 'Efficient Construction', 'Texas Building Codes', 'Material Sourcing'],
    achievements: [
      'Designed and built multiple tiny home communities in Central Texas',
      'Developed Abundancia\'s tiny home and dome product line specifications',
    ],
    linkedIn: '',
  },
  {
    name: 'Rohan Guyot-Sutherland',
    photo: '/images/team/rohan-guyot-sutherland.jpg',
    role: 'Regenerative Systems',
    bio: 'Expert in permaculture design, renewable energy systems, and ecological restoration. Leads the integration of regenerative infrastructure across the community.',
    expertise: ['Permaculture Design', 'Renewable Energy', 'Ecological Restoration', 'Water Systems'],
    achievements: [
      'Designed regenerative infrastructure plans for 380-acre site',
      'Leads integration of food forests, solar arrays, and water harvesting systems',
    ],
    linkedIn: '',
    projectLink: { label: 'Regenerative Systems', href: '/story/regeneration' },
  },
  {
    name: 'Angele Miller',
    photo: '/images/team/angele-miller.jpg',
    role: 'Glamping & Retreat Operations',
    bio: 'Experienced hospitality operator specializing in nature-based retreat experiences. Manages Abundancia\'s Phase 1 retreat center revenue engine.',
    expertise: ['Retreat Operations', 'Hospitality Management', 'Nature-Based Experiences', 'Revenue Strategy'],
    achievements: [
      'Designed the Phase 1 retreat center operating model generating early revenue',
      'Brings extensive hospitality background in nature-based luxury experiences',
    ],
    linkedIn: '',
  },
  {
    name: 'Fred Haas PE',
    photo: '/images/team/fred-haas.png',
    role: 'Civil Engineer',
    bio: 'Licensed professional engineer with extensive experience in land development, site infrastructure, utility systems, and regulatory compliance in Texas.',
    expertise: ['Civil Engineering', 'Land Development', 'Utility Systems', 'Regulatory Compliance'],
    achievements: [
      'Licensed PE with decades of Texas land development experience',
      'Leads site infrastructure and MUD formation engineering for Abundancia',
    ],
    linkedIn: '',
  },
  {
    name: 'Lancelot Stukaloff',
    photo: '/images/team/lancelot-stukaloff.png',
    role: 'Capital Markets',
    bio: 'Capital markets specialist with deep experience structuring real estate investment vehicles, investor relations, and fund management.',
    expertise: ['Capital Markets', 'Fund Structuring', 'Investor Relations', 'Real Estate Finance'],
    achievements: [
      'Structured the $12.5M Reg D 506(c) offering with LP-favorable waterfall',
      'Manages the investor pipeline, due diligence process, and capital deployment',
    ],
    linkedIn: '',
    projectLink: { label: 'Investment Details', href: '/invest' },
  },
]

const PARTNERS = [
  {
    name: 'Eduardo Esparza',
    org: 'RECODE Fund',
    focus: 'Impact Investment',
    detail: 'Eduardo brings deep impact investment expertise through the RECODE Fund, connecting Abundancia with mission-aligned capital sources. His fund focuses on regenerative real estate and community development projects that deliver both financial returns and measurable environmental impact.',
    role: 'Advises on impact investment structuring and connects the project with ESG-focused institutional investors.',
  },
  {
    name: 'Jeff Hall',
    photo: '/images/team/jeff-hall.jpg',
    org: 'Paragon Development',
    focus: 'Development Advisory',
    detail: 'Jeff Hall of Paragon Development provides strategic advisory on phased development execution, construction management, and risk mitigation. His experience with large-scale residential and mixed-use developments in Texas gives Abundancia access to proven playbooks.',
    role: 'Development strategy advisor — phased construction planning, contractor relationships, and cost management.',
  },
  {
    name: 'Jodie & Can',
    photo: '/images/team/jodie-and-can.jpg',
    org: 'Inphinity Design Architects',
    focus: 'Biophilic Architecture',
    detail: 'Inphinity Design Architects specialize in biophilic architecture — designing buildings that integrate natural systems, light, air, and living materials. They lead Abundancia\'s architectural vision, ensuring every structure embodies the Living Building Challenge principles.',
    role: 'Lead architects — master plan design, hempcrete home templates, commercial and community buildings.',
  },
  {
    name: 'Angie Gonzales',
    photo: '/images/team/angie-gonzales.jpg',
    org: 'Independent',
    focus: 'Permaculture Design',
    detail: 'Angie is a certified permaculture designer who has planned food forests and agricultural systems across Central Texas. She leads the design of Abundancia\'s integrated food production landscape — from community gardens to perennial food forests.',
    role: 'Permaculture systems design — food forests, water harvesting, soil regeneration, and growing zone planning.',
  },
  {
    name: 'Kacee Jackson',
    org: 'Independent',
    focus: 'Development Advisory',
    detail: 'Kacee Jackson provides independent development advisory services with a focus on community-centered real estate. Her expertise in stakeholder alignment and project governance helps ensure Abundancia serves both investors and future residents.',
    role: 'Independent advisor on community governance, stakeholder alignment, and development strategy.',
  },
  {
    name: 'Symbiosis TX',
    org: 'Symbiosis TX',
    focus: 'Regenerative Land Planning',
    detail: 'Symbiosis TX is a regenerative land planning firm that designs development projects in harmony with native ecosystems. They lead Abundancia\'s master site planning, ensuring Houston toad habitat compliance, conservation easements, and ecological enhancement.',
    role: 'Master site planning — land use, conservation corridors, habitat enhancement, and LPHCP compliance.',
  },
]

const NEW_EARTH_CARDS = [
  {
    icon: TreePine,
    title: 'Regenerative First',
    description: 'Every project is designed to leave the land better than we found it.',
    detail: 'Our regenerative-first philosophy means development enhances ecological function rather than degrading it. At Abundancia, over 90% of the 380 acres will be conserved as native habitat, food forests, and ecological corridors. Hempcrete construction sequesters carbon. Water systems restore aquifer health. The land will be measurably healthier 10 years after development than it is today.',
    link: '/story/regeneration',
    linkLabel: 'Explore Regenerative Vision',
  },
  {
    icon: Building2,
    title: 'Proven Track Record',
    description: '$755M+ raised, 200+ successful transactions, 21 sustainable development projects.',
    detail: 'Our team brings a combined track record of $755M+ raised across real estate funds and development projects, over 200 successful transactions, and 21 sustainable projects delivered. This is not a first project by first-time developers — it is a proven team applying decades of experience to a generational opportunity.',
    link: '/data-room/view/investment/investor-presentation',
    linkLabel: 'View Investor Presentation',
  },
  {
    icon: Award,
    title: 'Living Building Challenge',
    description: 'Building to the world\'s most rigorous green building certification standard.',
    detail: 'The Living Building Challenge is the most ambitious green building standard in the world — requiring net-positive energy, net-positive water, non-toxic materials, and measurable ecological benefit. Abundancia is designed to meet these standards, creating homes that produce more energy and clean water than they consume while sequestering carbon through hempcrete construction.',
    link: '/story/regeneration',
    linkLabel: 'Learn About Our Standards',
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// Animated Stat
// ═══════════════════════════════════════════════════════════════════════════

function AnimatedStat({ target, suffix, prefix, label, onClick }: {
  target: number
  suffix?: string
  prefix?: string
  label: string
  onClick: () => void
}) {
  const { count, ref } = useAnimatedCounter({ target })

  return (
    <button ref={ref} className="text-center cursor-pointer group" onClick={onClick}>
      <div className="font-display text-3xl sm:text-4xl font-bold text-white mb-1 group-hover:text-secondary-400 transition-colors">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="font-accent text-sm text-white/70 uppercase tracking-wider group-hover:text-white/90 transition-colors">
        {label}
      </div>
    </button>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════

export default function TeamPage() {
  const [activeTeamMember, setActiveTeamMember] = useState<typeof CORE_TEAM[number] | null>(null)
  const [activePartner, setActivePartner] = useState<typeof PARTNERS[number] | null>(null)
  const [activeStat, setActiveStat] = useState<typeof TRACK_RECORD[number] | null>(null)
  const [activeNewEarth, setActiveNewEarth] = useState<typeof NEW_EARTH_CARDS[number] | null>(null)

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
                onClick={() => setActiveStat(stat)}
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
                <button
                  onClick={() => setActiveTeamMember(member)}
                  className="card p-6 h-full text-left w-full cursor-pointer hover:shadow-lg hover:border-primary-200 transition-all duration-200 group"
                >
                  {member.photo ? (
                    <div className="w-16 h-16 rounded-xl overflow-hidden mb-4 ring-2 ring-primary-100 group-hover:ring-primary-300 transition-all">
                      <Image src={member.photo} alt={member.name} width={64} height={64} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-primary-100 flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                      <span className="font-display text-xl font-bold text-primary-700">
                        {member.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                    </div>
                  )}
                  <h3 className="font-accent text-base font-semibold text-neutral-900 mb-1 group-hover:text-primary-700 transition-colors">
                    {member.name}
                  </h3>
                  <p className="font-accent text-xs text-primary-600 mb-3">{member.role}</p>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {member.expertise.slice(0, 2).map((tag) => (
                      <span key={tag} className="font-accent text-[10px] px-2 py-0.5 rounded-full bg-primary-50 text-primary-600">
                        {tag}
                      </span>
                    ))}
                    {member.expertise.length > 2 && (
                      <span className="font-accent text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500">
                        +{member.expertise.length - 2}
                      </span>
                    )}
                  </div>
                </button>
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
                <button
                  onClick={() => setActivePartner(partner)}
                  className="card p-5 text-left w-full cursor-pointer hover:shadow-lg hover:border-primary-200 transition-all duration-200 group"
                >
                  <h3 className="font-accent text-base font-semibold text-neutral-900 mb-0.5 group-hover:text-primary-700 transition-colors">
                    {partner.name}
                  </h3>
                  <p className="font-accent text-xs text-primary-600 mb-2">{partner.org}</p>
                  <p className="text-sm text-neutral-600">{partner.focus}</p>
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ NEW EARTH DEVELOPMENT ═══ */}
      <section id="new-earth-development" className="py-20 md:py-28 bg-primary-900 text-white">
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
                {NEW_EARTH_CARDS.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => setActiveNewEarth(item)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-5 flex items-start gap-4 text-left cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-secondary-500/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-secondary-400" />
                    </div>
                    <div>
                      <h3 className="font-accent text-sm font-semibold text-white mb-1 group-hover:text-secondary-400 transition-colors">{item.title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
                    </div>
                  </button>
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

      {/* ═══ MODALS ═══ */}

      {/* Team Member Modal */}
      <Modal
        open={!!activeTeamMember}
        onClose={() => setActiveTeamMember(null)}
        title={activeTeamMember?.name}
        size="md"
      >
        {activeTeamMember && (
          <div>
            {activeTeamMember.photo && (
              <div className="w-24 h-24 rounded-xl overflow-hidden mb-4 ring-2 ring-primary-100">
                <Image src={activeTeamMember.photo} alt={activeTeamMember.name} width={96} height={96} className="w-full h-full object-cover" />
              </div>
            )}
            <p className="font-accent text-sm font-semibold text-primary-600 mb-4">{activeTeamMember.role}</p>
            <p className="text-neutral-600 leading-relaxed mb-6">{activeTeamMember.bio}</p>

            <div className="mb-6">
              <h4 className="font-accent text-sm font-semibold text-neutral-900 mb-3">Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {activeTeamMember.expertise.map((tag) => (
                  <span key={tag} className="font-accent text-xs px-3 py-1 rounded-full bg-primary-50 text-primary-700 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-accent text-sm font-semibold text-neutral-900 mb-3">Key Achievements</h4>
              <ul className="space-y-2">
                {activeTeamMember.achievements.map((a) => (
                  <li key={a} className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-secondary-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-600">{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t border-neutral-100">
              <button
                disabled
                className="font-accent text-sm px-4 py-2 rounded-lg bg-neutral-100 text-neutral-400 cursor-not-allowed"
              >
                Connect on LinkedIn
              </button>
              {activeTeamMember.projectLink && (
                <Link
                  href={activeTeamMember.projectLink.href}
                  className="font-accent text-sm px-4 py-2 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors flex items-center gap-1.5"
                  onClick={() => setActiveTeamMember(null)}
                >
                  {activeTeamMember.projectLink.label}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Partner Modal */}
      <Modal
        open={!!activePartner}
        onClose={() => setActivePartner(null)}
        title={activePartner?.name}
        size="md"
      >
        {activePartner && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-accent text-sm font-semibold text-primary-600">{activePartner.org}</span>
              <span className="text-neutral-300">|</span>
              <span className="font-accent text-sm text-neutral-500">{activePartner.focus}</span>
            </div>
            <p className="text-neutral-600 leading-relaxed mb-6">{activePartner.detail}</p>
            <div className="bg-primary-50 rounded-xl p-4">
              <h4 className="font-accent text-sm font-semibold text-primary-800 mb-1">Role in Abundancia</h4>
              <p className="text-sm text-primary-700">{activePartner.role}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Track Record Stat Modal */}
      <Modal
        open={!!activeStat}
        onClose={() => setActiveStat(null)}
        title={activeStat ? `${activeStat.prefix || ''}${activeStat.target.toLocaleString()}${activeStat.suffix || ''} — ${activeStat.label}` : ''}
        size="md"
      >
        {activeStat && (
          <div>
            <p className="text-neutral-600 leading-relaxed mb-6">{activeStat.detail}</p>
            <div className="mb-6">
              <h4 className="font-accent text-sm font-semibold text-neutral-900 mb-3">Breakdown</h4>
              <ul className="space-y-2">
                {activeStat.breakdown.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                    <span className="text-sm text-neutral-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={activeStat.dataRoomLink}
              className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
              onClick={() => setActiveStat(null)}
            >
              <ExternalLink className="w-4 h-4" />
              View in Data Room
            </Link>
          </div>
        )}
      </Modal>

      {/* New Earth Development Card Modal */}
      <Modal
        open={!!activeNewEarth}
        onClose={() => setActiveNewEarth(null)}
        title={activeNewEarth?.title}
        size="md"
      >
        {activeNewEarth && (
          <div>
            <p className="text-neutral-600 leading-relaxed mb-6">{activeNewEarth.detail}</p>
            <Link
              href={activeNewEarth.link}
              className="inline-flex items-center gap-2 font-accent text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
              onClick={() => setActiveNewEarth(null)}
            >
              {activeNewEarth.linkLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </Modal>
    </div>
  )
}
