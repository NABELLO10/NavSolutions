import { useEffect, useState } from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

export default function ScrollToggleButton() {
  const [goDown, setGoDown] = useState(true)

  useEffect(() => {
    const updateDirection = () => {
      setGoDown(window.scrollY < window.innerHeight * 0.35)
    }

    updateDirection()
    window.addEventListener('scroll', updateDirection, { passive: true })
    window.addEventListener('resize', updateDirection)

    return () => {
      window.removeEventListener('scroll', updateDirection)
      window.removeEventListener('resize', updateDirection)
    }
  }, [])

  const handleClick = () => {
    window.scrollTo({
      top: goDown ? document.documentElement.scrollHeight : 0,
      behavior: 'smooth',
    })
  }

  const Icon = goDown ? FaArrowDown : FaArrowUp
  const label = goDown ? 'Ir abajo' : 'Ir arriba'

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className="group fixed bottom-[5.25rem] right-6 z-40 flex items-center gap-0 overflow-hidden rounded-full border border-white/10 bg-base-900/90 py-3.5 pl-3.5 pr-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 ease-premium hover:pr-5 focus-ring md:bottom-[5.75rem] md:right-8"
    >
      <Icon className="h-5 w-5 shrink-0 text-accent-light" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-sans text-sm text-white opacity-0 transition-all duration-300 ease-premium group-hover:ml-2 group-hover:max-w-[100px] group-hover:opacity-100">
        {label}
      </span>
    </button>
  )
}
