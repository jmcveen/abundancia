'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useInvestTransition } from '@/lib/context/invest-transition-context'

export function InvestTransitionOverlay() {
  const { isTransitioning } = useInvestTransition()

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
          aria-live="polite"
          aria-busy="true"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.15, duration: 0.4, ease: 'easeOut' }}
            className="flex flex-col items-center gap-8"
          >
            <Image
              src="/Abundancia Logo - words.png"
              alt="Abundancia"
              width={200}
              height={40}
              className="h-8 w-auto"
              style={{ filter: 'invert(1)' }}
              priority
            />
            <div className="w-48 h-px bg-black/10 overflow-hidden">
              <motion.div
                className="h-full bg-black"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
