'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Lock, Leaf } from 'lucide-react'

interface NavLink {
  name: string
  href: string
  locked?: boolean
}

interface NavSection {
  title: string
  links: NavLink[]
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Story',
    links: [
      { name: 'Vision', href: '/' },
      { name: 'Our Vision', href: '/story/vision' },
      { name: 'The Land', href: '/story/land' },
      { name: 'The Community', href: '/story/community' },
      { name: 'Regeneration', href: '/story/regeneration' },
    ],
  },
  {
    title: 'Opportunity',
    links: [
      { name: 'Market', href: '/market' },
      { name: 'Model', href: '/model' },
      { name: 'Expansion', href: '/expansion' },
    ],
  },
  {
    title: 'Assets',
    links: [
      { name: 'Team', href: '/team' },
      { name: 'Timeline', href: '/timeline' },
    ],
  },
  {
    title: 'Investors',
    links: [
      { name: 'Investor Overview', href: '/invest' },
      { name: 'Financials', href: '/financials', locked: true },
      { name: 'Data Room', href: '/data-room', locked: true },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Summary', href: '/overview' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Legal', href: '/legal' },
    ],
  },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [expandedMobileSections, setExpandedMobileSections] = useState<Set<string>>(new Set(['Story']))
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()

  const toggleMobileSection = (title: string) => {
    setExpandedMobileSections(prev =>
      prev.has(title) ? new Set() : new Set([title])
    )
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const handleMouseEnter = (title: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(title)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 pt-4 md:pt-5 flex justify-center"
      >
        <nav className={`
          w-[calc(100%-2rem)] sm:w-[85vw] xl:w-[75vw] 2xl:w-[70vw]
          max-w-7xl
          flex items-center justify-between
          px-4 sm:px-6 xl:px-8 py-3.5
          bg-white/80 backdrop-blur-xl
          rounded-2xl
          border border-white/50
          shadow-lg shadow-neutral-900/5
          transition-all duration-500
          ${isScrolled ? 'bg-white/90 shadow-xl shadow-neutral-900/10' : ''}
        `}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary-800 flex items-center justify-center group-hover:bg-primary-700 transition-colors">
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-sm sm:text-base font-bold text-neutral-900 leading-tight">
                Abundancia
              </span>
              <span className="text-[10px] sm:text-xs text-neutral-500 font-accent leading-tight hidden sm:block">
                Austin, TX
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_SECTIONS.map((section) => (
              <div
                key={section.title}
                className="relative"
                onMouseEnter={() => handleMouseEnter(section.title)}
                onMouseLeave={handleMouseLeave}
              >
                <button className={`
                  flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-accent font-medium
                  transition-all duration-200
                  ${activeDropdown === section.title
                    ? 'text-primary-800 bg-primary-50'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }
                `}>
                  {section.title}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === section.title ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {activeDropdown === section.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-xl shadow-neutral-900/10 border border-neutral-100 overflow-hidden"
                      onMouseEnter={() => handleMouseEnter(section.title)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="py-2">
                        {section.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className={`
                              flex items-center justify-between px-4 py-2.5 text-sm font-accent
                              transition-colors duration-150
                              ${pathname === link.href
                                ? 'text-primary-800 bg-primary-50 font-semibold'
                                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                              }
                            `}
                          >
                            <span>{link.name}</span>
                            {link.locked && <Lock className="w-3.5 h-3.5 text-neutral-400" />}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* CTA Button */}
            <Link
              href="/waitlist"
              className="ml-2 btn-primary btn-sm rounded-xl text-sm"
            >
              Get Involved
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-24 mx-4 bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden max-h-[70vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                {NAV_SECTIONS.map((section) => (
                  <div key={section.title} className="mb-2">
                    <button
                      onClick={() => toggleMobileSection(section.title)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-accent font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors"
                    >
                      {section.title}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedMobileSections.has(section.title) ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {expandedMobileSections.has(section.title) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 py-1">
                            {section.links.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className={`
                                  flex items-center justify-between px-3 py-2 rounded-lg text-sm font-accent
                                  ${pathname === link.href
                                    ? 'text-primary-800 bg-primary-50 font-semibold'
                                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                                  }
                                `}
                              >
                                <span>{link.name}</span>
                                {link.locked && <Lock className="w-3.5 h-3.5 text-neutral-400" />}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <div className="pt-2 border-t border-neutral-100 mt-2">
                  <Link href="/waitlist" className="btn-primary btn-md w-full rounded-xl text-sm">
                    Get Involved
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
