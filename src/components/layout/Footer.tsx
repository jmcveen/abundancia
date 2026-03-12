import Link from 'next/link'
import Image from 'next/image'

const FOOTER_LINKS = [
  {
    title: 'Explore',
    links: [
      { name: 'Vision', href: '/story/vision' },
      { name: 'The Land', href: '/story/land' },
      { name: 'Community', href: '/story/community' },
      { name: 'Regeneration', href: '/story/regeneration' },
    ],
  },
  {
    title: 'Invest',
    links: [
      { name: 'Market Opportunity', href: '/market' },
      { name: 'Business Model', href: '/model' },
      { name: 'Team', href: '/team' },
      { name: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Get Involved',
    links: [
      { name: 'Join Waitlist', href: '/waitlist' },
      { name: 'Investor Application', href: '/invest/apply' },
      { name: 'Executive Summary', href: '/overview' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-white">
      <div className="section-container py-20 md:py-24">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Image
                src="/Abundancia Logo - words.png"
                alt="Abundancia"
                width={160}
                height={28}
                className="h-6 w-auto"
              />
            </div>
            <p className="text-sm text-white/30 leading-relaxed max-w-xs font-body font-light">
              Regenerative living in harmony with nature. A 376-acre community proving that profitable development and ecological regeneration amplify each other.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h4 className="font-accent text-xs text-white/50 mb-5 uppercase tracking-[0.2em]">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/30 hover:text-[#ceb78e] transition-colors duration-300 font-accent"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] my-12" />

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/20 font-accent tracking-wider">
            &copy; {new Date().getFullYear()} New Earth Development. All rights reserved.
          </div>
          <div className="flex items-center gap-8">
            <Link href="/legal" className="text-xs text-white/20 hover:text-white/40 transition-colors font-accent tracking-wider">
              Legal
            </Link>
            <Link href="/legal#privacy" className="text-xs text-white/20 hover:text-white/40 transition-colors font-accent tracking-wider">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
