'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  threshold?: number
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export default function ScrollReveal({
  children,
  className = '',
  threshold = 0.1,
  delay = 0,
  direction = 'up',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (delay > 0) {
      el.style.transitionDelay = `${delay}ms`
    }
    if (direction !== 'up') {
      el.dataset.revealDir = direction
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, delay, direction])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
