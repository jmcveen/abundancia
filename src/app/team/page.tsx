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
      'Institutional fund raises - LP/GP structures, Reg D 506(b) and 506(c)',
      'Development JVs - equity + debt structuring for ground-up projects',
      'Geographies - Texas, Colorado, Arizona, California, Pacific Northwest',
      'Fund types - value-add, opportunistic, impact, and regenerative',
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
    detail: 'Our research spans 70+ intentional and eco-communities worldwide - from Findhorn in Scotland to Auroville in India. We have studied what works, what fails, and why. Abundancia incorporates the best practices while avoiding the pitfalls that derail most community projects.',
    breakdown: [
      'Governance models - sociocracy, holacracy, consensus, hybrid',
      'Revenue engines - real estate sales, hospitality, agriculture, education',
      'Failure patterns - undercapitalization, governance collapse, market disconnect',
      'Success factors - financial sustainability, clear structure, phased growth',
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
    bio: '12 years in project management, finance, and real estate investing across 10 regenerative community development projects worldwide. Provides sustainability consulting for real estate companies with $100B in AUM. Kelly is the visionary and operating force behind Abundancia — bringing together the finest regenerative designers, engineers, and capital partners in Texas.',
    expertise: ['Regenerative Development', 'Project Management', 'Real Estate Finance', 'Sustainability Consulting'],
    achievements: [
      '10 regenerative community development projects completed or in progress',
      'Sustainability consulting for real estate portfolios with $100B+ AUM',
      'Founded New Earth Development to build the global model for regenerative communities',
    ],
    linkedIn: '',
    projectLink: { label: 'New Earth Development', href: '/team#new-earth-development' },
  },
  {
    name: 'Joe McVeen',
    photo: '/images/team/joe-mcveen.jpg',
    role: 'Marketing & AI Systems',
    bio: '10 years engineering business systems for scale. CEO of Viral Purpose Media, launching purpose-driven brands to a 400M+ influencer network. Automated webinar funnel expert driving Abundancia\'s investor marketing platform and AI-powered community growth strategy.',
    expertise: ['Brand Strategy', 'AI Systems', 'Influencer Marketing', 'Business Development'],
    achievements: [
      'CEO of Viral Purpose Media — 400M+ influencer network reach',
      'Built Abundancia\'s full investor marketing platform and brand identity',
      'Automated webinar and funnel systems scaled to thousands of leads',
    ],
    linkedIn: '',
  },
  {
    name: 'Lancelot Stukaloff',
    photo: '/images/team/lancelot-stukaloff.png',
    role: 'Capital Markets',
    bio: '10+ years as a real estate investor and capital markets advisor. Has arranged over $750M in equity and debt financing for real estate developments and projects nationwide. Lancelot structures Abundancia\'s investment vehicles, manages the investor pipeline, and drives capital deployment.',
    expertise: ['Capital Markets', 'Equity Structuring', 'Debt Financing', 'Investor Relations'],
    achievements: [
      '$750M+ in equity and debt arranged for real estate nationally',
      'Structured the $12.5M Reg D 506(c) offering with LP-favorable waterfall',
      'Manages investor pipeline, due diligence process, and capital deployment',
    ],
    linkedIn: '',
    projectLink: { label: 'Investment Details', href: '/invest' },
  },
  {
    name: 'Chelsae Zirna',
    photo: '/images/team/chelsae-zirna.jpg',
    role: 'Community Director',
    bio: 'Chelsae Zirna is a retreat facilitator devoted to liberating love. She has been an experience designer and community builder for over a decade — from inside IBM to her company Chrysalis. Chelsae leads the intentional design of Abundancia\'s retreat experiences, weaving transformative programming into the land itself.',
    shortBio: 'Retreat facilitator and experience designer devoted to liberating love, with a decade of work spanning IBM to founding Chrysalis.',
    expertise: ['Retreat Facilitation', 'Experience Design', 'Community Building', 'Transformative Programming'],
    achievements: [
      'Over a decade of experience design and community building',
      'Led transformative initiatives from inside IBM to founding Chrysalis',
      'Steward of intentional retreat experiences rooted in love and liberation',
    ],
    linkedIn: '',
  },
  {
    name: 'Jared Gossett',
    photo: '/images/team/jared-gossett.png',
    role: 'Luxury Home Builder',
    bio: "Austin's #1 luxury builder by volume with 170+ homes built and 2X Austin Custom Home Builder of the Year. Creator of the Legacy Living™ wellness-home program, integrating masterful craftsmanship with health-forward design principles aligned with Abundancia's vision for exceptional residential living.",
    shortBio: "Austin's #1 luxury builder by volume — 170+ homes, 2X Custom Home Builder of the Year, and creator of the Legacy Living™ wellness-home program.",
    expertise: ['Luxury Home Building', 'Wellness Design', 'Custom Homes', 'Construction Management'],
    achievements: [
      "Austin's #1 luxury builder by volume with 170+ homes built",
      '2X Austin Custom Home Builder of the Year',
      'Creator of the Legacy Living™ wellness-home program',
    ],
    linkedIn: '',
  },
  {
    name: 'Amanda Williams',
    photo: '/images/team/amanda-williams.jpg',
    role: 'Wellness Program Coordinator',
    shortBio: 'eXp Realty Top 1% STR/MTR specialist and CEO of Carolina Furnished Rentals, with 15+ years in real estate investing, hospitality, and wellness experience design.',
    bio: 'eXp Realty Top 1% STR/MTR specialist and CEO of Carolina Furnished Rentals, with 15+ years in real estate investing, flipping, rental operations, and hospitality. Leads Abundancia\'s wellness programming and high-touch guest journey development — from retreat offerings to biohacking experiences and strategic wellness partnerships.',
    expertise: ['Wellness Programming', 'Short-Term Rentals', 'Hospitality Design', 'Real Estate Investing'],
    achievements: [
      'eXp Realty Top 1% STR/MTR specialist nationwide',
      'CEO of Carolina Furnished Rentals',
      '15+ years across real estate investing, flipping, and hospitality operations',
    ],
    linkedIn: '',
  },
  {
    name: 'Fred Haas PE',
    photo: '/images/team/fred-haas.jpg',
    role: 'Civil Engineer',
    bio: '40+ year civil engineer and 20+ year owner of Sustainable Land Strategies. Specializes in land development, drainage studies, waste system design, entitlements, and permits for eco projects. Fred is the licensed PE leading all site infrastructure and MUD formation engineering for Abundancia.',
    expertise: ['Civil Engineering', 'Land Development', 'Drainage & Waste Design', 'Eco Project Permitting'],
    achievements: [
      '40+ years civil engineering experience',
      '20+ years as owner of Sustainable Land Strategies',
      'Leads site infrastructure and MUD formation engineering for Abundancia',
    ],
    linkedIn: '',
  },
  {
    name: 'Gloria Merrick',
    photo: '/images/team/gloria-merrick.png',
    role: 'Tiny Home Builder & Design',
    bio: '11 years in construction, marketing, interior design, and real estate investing. Specializes in eco-friendly alternative housing and has built over 16 unique tiny and off-grid living spaces. Gloria brings hands-on expertise in every phase from design concept to final build.',
    expertise: ['Tiny Home Design', 'Eco-Friendly Construction', 'Interior Design', 'Off-Grid Systems'],
    achievements: [
      '16+ unique tiny and off-grid living spaces built',
      'Developed Abundancia\'s tiny home and dome product line specifications',
      '11 years spanning construction, marketing, interior design, and real estate',
    ],
    linkedIn: '',
  },
  {
    name: 'Angele Miller',
    photo: '/images/team/angele-miller.jpg',
    role: 'Glamping Operations Partner',
    bio: 'Co-Founder of Creekside RNR Glamping and its franchise network. Founder of Abundant by Design. Visionary investor and board member recognized as a 2023 Rural Leader Award winner and featured on Dragon\'s Den E4 Season 18. Angele leads Abundancia\'s Phase 1 retreat center and glamping revenue engine.',
    expertise: ['Glamping Operations', 'Franchise Development', 'Hospitality Management', 'Rural Leadership'],
    achievements: [
      'Co-Founded Creekside RNR Glamping and launched its franchise model',
      '2023 Rural Leader Award winner',
      'Featured on Dragon\'s Den E4 Season 18',
    ],
    linkedIn: '',
  },
]

const PARTNERS = [
  {
    name: 'Rohan Guyot-Sutherland',
    photo: '/images/team/rohan-guyot-sutherland.jpg',
    org: 'Independent',
    focus: 'Regenerative Systems Design',
    detail: '15 years as a regenerative designer, builder, teacher, and global advocate. Has led 20+ projects in sustainability, biomimicry, self-sufficiency, and climate change adaptation. Rohan leads the integration of food forests, solar arrays, water harvesting systems, and living infrastructure across the Abundancia site.',
    role: 'Regenerative systems advisor — food forests, water harvesting, solar integration, and ecological living infrastructure.',
  },
  {
    name: 'Eduardo Esparza',
    photo: '/images/team/eduardo-esparza.jpg',
    org: 'RECODE Fund / Blue Dot',
    focus: 'Impact Investment',
    detail: '10+ years in SaaS and angel investing. Blue Dot Founder leading $30M in regenerative finance initiatives. Advisor to Mex30x30 Conservation. Keynote speaker at COP16, SXSW, and Davos. Eduardo connects Abundancia with mission-aligned impact capital and ESG-focused institutional investors.',
    role: 'Advises on impact investment structuring and connects the project with regenerative finance sources at the global level.',
  },
  {
    name: 'Jeff Hall',
    photo: '/images/team/jeff-hall.jpg',
    org: 'Paragon Development',
    focus: 'Development Advisory',
    detail: '$6 billion in hospitality, medical, industrial, education, and mixed-use projects in the US and internationally, with a focus on efficiency, transparency, collaboration, and creativity. Jeff brings proven playbooks for phased development execution, construction management, and risk mitigation in Texas.',
    role: 'Development strategy advisor — phased construction planning, contractor relationships, and cost management.',
  },
  {
    name: 'Jodie & Can',
    photo: '/images/team/jodie-and-can.jpg',
    org: 'Inphinity Design Architects',
    focus: 'Biophilic Architecture',
    detail: '10 years in sacred geometry and biophilic architecture design, 3D modeling, and project management. Inphinity Design creates symbiotic relationships between humans and their built environment — ensuring every structure at Abundancia embodies Living Building Challenge principles and natural systems integration.',
    role: 'Lead architects — master plan design, hempcrete home templates, commercial and community buildings.',
  },
  {
    name: 'Angie Gonzales',
    photo: '/images/team/angie-gonzales.jpg',
    org: 'Independent',
    focus: 'Permaculture Design',
    detail: 'Founder of Eco Rainbow Goddesses Non-Profit. Expert in permaculture design, yoga therapy, healing arts, shamanism, health and wellness, and regenerative lifestyle design. Angie leads the design of Abundancia\'s integrated food production landscape — from community gardens to perennial food forests.',
    role: 'Permaculture systems design — food forests, water harvesting, soil regeneration, and growing zone planning.',
  },
  {
    name: 'Kacee Jackson',
    photo: '/images/team/kacee-jackson.jpg',
    org: '360 Company',
    focus: 'Development Advisory',
    detail: '25 years and 400+ Texas real estate projects. Currently leading Stonebrush — an 817-home Bastrop master-planned community with $52M in MUD bond reimbursements. Kacee brings unmatched expertise in MUD bond financing, builder attraction, and Bastrop County permitting directly applicable to Abundancia.',
    role: 'Development advisor on MUD bond financing, builder attraction, county permitting, and large-scale project structuring.',
  },
  {
    name: 'Adelle York',
    photo: '/images/team/adelle-york.jpg',
    org: 'Plural Office',
    focus: 'Passive House Architecture',
    detail: 'Harvard GSD-trained and PHIUS-certified for passive house design, with active projects across 6+ US states. Adelle specializes in creating ecological single-family and mixed-use projects that meet the most rigorous energy performance standards while remaining beautiful and livable.',
    role: 'Passive design and energy efficiency architecture for Abundancia residential units.',
  },
  {
    name: 'Adam Russell',
    photo: '/images/team/adam-russell.jpg',
    org: 'Symbiosis TX',
    focus: 'Regenerative Land Design',
    detail: 'Founder and lead designer at Symbiosis TX — Central Texas\'s premier regenerative land planning firm. Specializes in watershed science, keyline earthworks, drone mapping, and full design-to-build execution across thousands of acres from homesteads to large conservation ranches. Adam leads Abundancia\'s master site planning, conservation corridors, habitat enhancement, and LPHCP compliance.',
    role: 'Master site planning — land use, regenerative systems, conservation corridors, and ecological land design.',
  },
  {
    name: 'Mary Mandel',
    photo: '/images/team/mary-mandel.jpg',
    org: 'Olympus Foundation',
    focus: 'Development Advisory',
    detail: '2x successful exits with a career spanning private equity, angel investing, and LP positions in top-tier funds. Co-founder of Sanctuary. Founder of the Olympus Foundation. Mary brings a rare combination of capital markets sophistication and values-aligned investing to Abundancia.',
    role: 'Investor and development advisor with deep private equity and regenerative fund experience.',
  },
  {
    name: 'Nico Scegiel',
    photo: '/images/team/nico-scegiel.jpg',
    org: 'Santé / Marché Market ATX',
    focus: 'Regenerative Food Systems',
    detail: 'Founder of Santé organic fine-dining restaurant and Marché Market ATX. Stanford-certified health coaching credentials and a lifelong commitment to hospitality and food systems. Nico leads Abundancia\'s farm-to-table dining and wellness food programming.',
    role: 'Food systems and hospitality advisor — farm-to-table dining, community market, and wellness nutrition programming.',
  },
  {
    name: 'Eric Amyot',
    photo: '/images/team/eric-amyot.jpg',
    org: 'Oliizoi / RegenEarth Studio',
    focus: 'Regenerative Development',
    detail: 'Founder of the Keystone Species ecosystem — Oliizoi (regenerative real estate), issho (modular housing), and RegenEarth Studio. Leads a team with nearly 200 years of combined experience in regenerative development, capital, and media.',
    role: 'Regenerative development advisor and capital partner bringing global ecosystem connections to Abundancia.',
  },
  {
    name: 'Tony Cho',
    photo: '/images/team/tony-cho.jpg',
    org: 'Metro 1 / Future of Cities',
    focus: 'Retreat Center Advisory',
    detail: 'Founder of Metro 1 ($3.5B in real estate), the Wynwood Art District, Future of Cities, and Magic City Innovation District in Miami. Urban Land Institute Young Leader of the Year. Tony brings world-class placemaking and destination development expertise to Abundancia\'s retreat center vision.',
    role: 'Retreat center and destination advisory — placemaking, mixed-use programming, and experience design.',
  },
  {
    name: 'Gayle Borst',
    photo: '/images/team/gayle-borst.jpg',
    org: 'Independent',
    focus: 'Regenerative Design Architecture',
    detail: 'Regenerative design architect integrating ecological systems thinking, biophilic principles, and sustainable materials into built environments. Gayle brings a holistic approach to architecture that honors the relationship between structures and the living systems that surround them.',
    role: 'Regenerative architectural design — ensuring community structures are in harmony with the land and its ecology.',
  },
  {
    name: 'Jean-Marc La Flamme',
    photo: '/images/team/jean-marc-la-flamme.jpg',
    org: 'Geoship',
    focus: 'Crowdfunding & Capital Strategy',
    detail: 'Crowdfunding strategist with $30M+ raised through platforms like DealMaker and WeFunder. Co-founder at Geoship, bringing deep expertise in community-funded real estate and regenerative project finance. Jean-Marc helps Abundancia access a new generation of values-aligned investors through equity crowdfunding.',
    role: 'Crowdfunding strategy and DealMaker platform advisor — expanding Abundancia\'s investor base beyond accredited investors.',
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
    detail: 'Our team brings a combined track record of $755M+ raised across real estate funds and development projects, over 200 successful transactions, and 21 sustainable projects delivered. This is not a first project by first-time developers - it is a proven team applying decades of experience to a generational opportunity.',
    link: '/data-room/view/investment/investor-presentation',
    linkLabel: 'View Investor Presentation',
  },
  {
    icon: Award,
    title: 'Living Building Challenge',
    description: 'Building to the world\'s most rigorous green building certification standard.',
    detail: 'The Living Building Challenge is the most ambitious green building standard in the world - requiring net-positive energy, net-positive water, non-toxic materials, and measurable ecological benefit. Abundancia is designed to meet these standards, creating homes that produce more energy and clean water than they consume while sequestering carbon through hempcrete construction.',
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
      <div className="font-display text-2xl sm:text-3xl font-bold text-white mb-1 group-hover:text-secondary-400 transition-colors">
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
            <span className="eyebrow mb-4 block">Team &amp; Partners</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-6xl text-neutral-900 mb-6 max-w-4xl">
              The Team Behind the Vision
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl leading-relaxed">
              A multidisciplinary team of developers, builders, designers, engineers, and capital markets professionals - united by the conviction that regenerative development is the future.
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
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-4">
                Team &amp; Partners
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_TEAM.map((member) => (
              <StaggerItem key={member.name}>
                <button
                  onClick={() => setActiveTeamMember(member)}
                  className="card h-full text-center w-full cursor-pointer hover:shadow-lg hover:border-primary-200 transition-all duration-200 group"
                >
                  {/* Circular photo — matches slides 33 & 34 style */}
                  <div className="pt-8 px-6 flex justify-center">
                    {member.photo ? (
                      <div className="relative w-36 h-36 rounded-full overflow-hidden ring-4 ring-primary-100 group-hover:ring-primary-300 transition-all duration-300 shadow-md">
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="w-36 h-36 rounded-full bg-primary-100 flex items-center justify-center ring-4 ring-primary-100 group-hover:bg-primary-200 transition-colors shadow-md">
                        <span className="font-display text-4xl font-bold text-primary-400">
                          {member.name.split(' ').map((n) => n[0]).join('')}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Card content */}
                  <div className="p-6 pt-4">
                    <h3 className="font-accent text-base font-semibold text-neutral-900 mb-1 group-hover:text-primary-700 transition-colors">
                      {member.name}
                    </h3>
                    <p className="font-accent text-xs text-primary-600 mb-3">{member.role}</p>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {'shortBio' in member ? member.shortBio : member.bio}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
                      {member.expertise.slice(0, 2).map((tag) => (
                        <span key={tag} className="font-accent text-xs px-2 py-0.5 rounded-full bg-primary-50 text-primary-600">
                          {tag}
                        </span>
                      ))}
                      {member.expertise.length > 2 && (
                        <span className="font-accent text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500">
                          +{member.expertise.length - 2}
                        </span>
                      )}
                    </div>
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
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-4">
                Strategic Partners
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {PARTNERS.map((partner) => (
              <StaggerItem key={partner.name}>
                <button
                  onClick={() => setActivePartner(partner)}
                  className="card text-center w-full cursor-pointer hover:shadow-lg hover:border-primary-200 transition-all duration-200 group h-full"
                >
                  {/* Circular photo — matches slides 33 & 34 style */}
                  <div className="pt-6 px-5 flex justify-center">
                    {partner.photo ? (
                      <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-primary-50 group-hover:ring-primary-200 transition-all duration-300 shadow-sm">
                        <Image
                          src={partner.photo}
                          alt={partner.name}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="w-28 h-28 rounded-full bg-primary-50 flex items-center justify-center ring-4 ring-primary-50 group-hover:bg-primary-100 transition-colors shadow-sm">
                        <span className="font-display text-2xl font-bold text-primary-300">
                          {partner.name.split(' ').map((n) => n[0]).join('').slice(0, 3)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5 pt-4">
                    <h3 className="font-accent text-base font-semibold text-neutral-900 mb-0.5 group-hover:text-primary-700 transition-colors">
                      {partner.name}
                    </h3>
                    <p className="font-accent text-xs text-primary-600 mb-2">{partner.org}</p>
                    <p className="text-sm text-neutral-600">{partner.focus}</p>
                  </div>
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
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-6">
                  New Earth Development
                </h2>
                <p className="text-lg text-white/70 leading-relaxed mb-6">
                  We are here to bring about revolutionary societal change through regenerative culture and built environments. Recognizing the cutting-edge technology and abundant natural resources available on Earth today, we are creating the models to eradicate poverty, homelessness, hunger, disease, war, and crime.
                </p>
                <p className="text-lg text-white/70 leading-relaxed">
                  Our passion is to develop a new society in which all beings are free to thrive in unity and peace. Abundancia Austin is our flagship project - the proof of concept for a global movement.
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
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-neutral-900 mb-6">
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
              <div className="relative w-28 h-28 rounded-full overflow-hidden mb-4 ring-4 ring-primary-100 shadow-md">
                <Image src={activeTeamMember.photo} alt={activeTeamMember.name} fill className="object-cover object-center" />
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
              {'projectLink' in activeTeamMember && activeTeamMember.projectLink && (
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
            {activePartner.photo ? (
              <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 ring-4 ring-primary-100 shadow-md">
                <Image src={activePartner.photo} alt={activePartner.name} fill className="object-cover object-center" />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary-50 flex items-center justify-center mb-4 ring-4 ring-primary-100">
                <span className="font-display text-2xl font-bold text-primary-300">
                  {activePartner.name.split(' ').map((n) => n[0]).join('').slice(0, 3)}
                </span>
              </div>
            )}
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
        title={activeStat ? `${activeStat.prefix || ''}${activeStat.target.toLocaleString()}${activeStat.suffix || ''} - ${activeStat.label}` : ''}
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
