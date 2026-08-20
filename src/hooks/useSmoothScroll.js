import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, setupGsap } from '../config/gsap'

// Bridges Lenis smooth scroll with GSAP ScrollTrigger so pinned /
// scrubbed animations stay in sync with the eased scroll position.
export function useSmoothScroll({ disabled }) {
  useEffect(() => {
    setupGsap()
    document.documentElement.classList.add('has-lenis')

    if (disabled) return undefined

    const lenis = new Lenis({
      duration: 0.5,
      easing: (t) => 1 - Math.pow(1 - t, 2.2),
      smoothWheel: true,
      wheelMultiplier: 1.35,
      touchMultiplier: 1.6,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const update = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(update)
      document.documentElement.classList.remove('has-lenis')
    }
  }, [disabled])
}
