'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInvestTransition } from '@/lib/context/invest-transition-context'

export function InvestTransitionOverlay() {
  const { isTransitioning, transitionMode } = useInvestTransition()

  const isDark = transitionMode === 'to-dark'

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed inset-0 z-[100] flex items-center justify-center ${
            isDark ? 'bg-primary-950' : 'bg-canvas'
          }`}
          aria-live="polite"
          aria-busy="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <span className={`font-display text-2xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-primary-800'
            }`}>
              Abundancia Austin
            </span>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${isDark ? 'bg-secondary-400' : 'bg-primary-500'}`}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.25,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
