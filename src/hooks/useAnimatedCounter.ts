'use client'

import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4)
}

interface UseAnimatedCounterOptions {
  target: number
  duration?: number
  decimals?: number
}

export function useAnimatedCounter({
  target,
  duration = 2000,
  decimals = 0,
}: UseAnimatedCounterOptions) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutQuart(progress)
      const current = easedProgress * target

      setCount(Number(current.toFixed(decimals)))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, target, duration, decimals])

  return { count, ref }
}
