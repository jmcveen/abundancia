import Link from 'next/link'
import { Leaf } from 'lucide-react'

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
    <footer className="bg-primary-900 text-white">
      <div className="section-container py-16 md:py-20">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-secondary-400" />
              </div>
              <div>
                <div className="font-heading text-lg font-bold">Abundancia</div>
                <div className="text-xs text-white/60 font-accent">Austin, TX</div>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              Regenerative living in harmony with nature. A 376-acre community proving that profitable development and ecological regeneration amplify each other.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h4 className="font-accent font-semibold text-sm text-white/90 mb-4 uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200 font-accent"
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
        <div className="h-px bg-white/10 my-10" />

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/40 font-accent">
            &copy; {new Date().getFullYear()} New Earth Development. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/legal" className="text-xs text-white/40 hover:text-white/70 transition-colors font-accent">
              Legal
            </Link>
            <Link href="/legal" className="text-xs text-white/40 hover:text-white/70 transition-colors font-accent">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
