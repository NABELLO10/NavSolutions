import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

export default function ScrollToggleButton() {
  const [goDown, setGoDown] = useState(true)

  useEffect(() => {
    let frame = 0
    let current = true

    const updateDirection = () => {
      const next = window.scrollY < window.innerHeight * 0.35
      if (next === current) return
      current = next
      setGoDown(next)
    }

    const requestUpdate = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        updateDirection()
      })
    }

    updateDirection()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  const handleClick = () => {
    const target = goDown ? 'bottom' : 'top'

    if (window.lenis) {
      window.lenis.scrollTo(target, {
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
      return
    }

    window.scrollTo({
      top: goDown ? document.documentElement.scrollHeight : 0,
      behavior: 'smooth',
    })
  }

  const Icon = goDown ? FaArrowDown : FaArrowUp
  const label = goDown ? 'Ir abajo' : 'Ir arriba'

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label={label}
      initial={{ opacity: 0, scale: 0.7, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.42, delay: 1.08, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.92 }}
      className="group fixed z-40 flex items-center gap-0 overflow-hidden rounded-full border border-white/10 bg-base-900/95 p-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur transition-[padding] duration-300 ease-premium hover:pr-5 focus-ring"
      style={{
        right: 'calc(1rem + var(--safe-r))',
        // Stacked directly above the WhatsApp pill: 1rem base inset +
        // that pill's 48px height + a 12px gap.
        bottom: 'calc(4.75rem + var(--safe-b))',
      }}
    >
      <span className="relative grid h-5 w-5 shrink-0 place-items-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={label}
            initial={{ opacity: 0, y: goDown ? -8 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: goDown ? 8 : -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 grid place-items-center"
          >
            <Icon className="h-5 w-5 text-accent-light" />
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="hover-reveal max-w-0 overflow-hidden whitespace-nowrap font-sans text-sm text-white opacity-0 transition-all duration-300 ease-premium group-hover:ml-2 group-hover:max-w-[100px] group-hover:opacity-100">
        {label}
      </span>
    </motion.button>
  )
}
