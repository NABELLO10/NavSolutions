import { useEffect, useState } from 'react'
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

    window.scrollTo({ top: goDown ? document.documentElement.scrollHeight : 0 })
  }

  const Icon = goDown ? FaArrowDown : FaArrowUp
  const label = goDown ? 'Ir abajo' : 'Ir arriba'

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className="group fixed bottom-[5.25rem] right-6 z-40 flex items-center gap-0 overflow-hidden rounded-full border border-white/10 bg-base-900/95 py-3.5 pl-3.5 pr-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 ease-premium hover:pr-5 focus-ring md:bottom-[5.75rem] md:right-8"
    >
      <Icon className="h-5 w-5 shrink-0 text-accent-light" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-sans text-sm text-white opacity-0 transition-all duration-300 ease-premium group-hover:ml-2 group-hover:max-w-[100px] group-hover:opacity-100">
        {label}
      </span>
    </button>
  )
}
