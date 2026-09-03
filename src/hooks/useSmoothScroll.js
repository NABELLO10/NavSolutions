import { useEffect } from 'react'
import Lenis from 'lenis'

const smoothEasing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

export function useSmoothScroll({ disabled }) {
  useEffect(() => {
    if (disabled) return undefined

    const lenis = new Lenis({
      lerp: 0.065,
      smoothWheel: true,
      wheelMultiplier: 0.72,
      touchMultiplier: 1.1,
      anchors: {
        offset: -84,
        duration: 1.1,
        easing: smoothEasing,
      },
      overscroll: false,
    })

    let scrollTimeout
    lenis.on('scroll', () => {
      if (!document.documentElement.classList.contains('is-scrolling')) {
        document.documentElement.classList.add('is-scrolling')
        window.dispatchEvent(new CustomEvent('nav-scroll-start'))
      }
      window.clearTimeout(scrollTimeout)
      scrollTimeout = window.setTimeout(() => {
        document.documentElement.classList.remove('is-scrolling')
        window.dispatchEvent(new CustomEvent('nav-scroll-stop'))
      }, 140)
    })
    window.lenis = lenis

    const update = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(update)
    }

    let active = true
    const refresh = () => {
      if (!active) return
      lenis.resize()
    }

    window.addEventListener('load', refresh)
    window.addEventListener('resize', refresh)
    document.fonts?.ready.then(refresh)

    const initialRefresh = requestAnimationFrame(refresh)
    let frame = requestAnimationFrame(update)

    return () => {
      active = false
      cancelAnimationFrame(initialRefresh)
      cancelAnimationFrame(frame)
      window.clearTimeout(scrollTimeout)
      document.documentElement.classList.remove('is-scrolling')
      window.removeEventListener('load', refresh)
      window.removeEventListener('resize', refresh)
      if (window.lenis === lenis) {
        delete window.lenis
      }
      lenis.destroy()
    }
  }, [disabled])
}
