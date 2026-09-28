import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV_LINKS, CONTACT } from '../data/content'
import BrandLogo from './BrandLogo'

const EASE = [0.16, 1, 0.3, 1]

const panel = {
  hidden: { opacity: 0, height: 0 },
  show: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.34, ease: EASE, staggerChildren: 0.045, delayChildren: 0.06 },
  },
  exit: { opacity: 0, height: 0, transition: { duration: 0.22, ease: EASE } },
}

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: EASE } },
  exit: { opacity: 0, y: 6, transition: { duration: 0.14 } },
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [hovered, setHovered] = useState('')

  // Compact the bar once the hero is behind us, and track which section
  // the reader is in (the last anchor above 40% of the viewport). Kept in
  // a rAF so the scroll listener never does layout work on the scroll thread.
  useEffect(() => {
    let frame = 0
    let current = false
    let currentActive = ''

    const update = () => {
      frame = 0
      const next = window.scrollY > 24
      if (next !== current) {
        current = next
        setScrolled(next)
      }

      const line = window.innerHeight * 0.4
      let found = ''
      for (const link of NAV_LINKS) {
        const anchor = document.getElementById(link.href.slice(1))
        if (anchor && anchor.getBoundingClientRect().top <= line) found = link.href
      }
      if (found !== currentActive) {
        currentActive = found
        setActive(found)
      }
    }

    const request = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', request, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', request)
    }
  }, [])

  // While the sheet is open the page underneath must not scroll —
  // both the native scroller and Lenis, or the two fight each other.
  useEffect(() => {
    const root = document.documentElement
    if (open) {
      root.classList.add('menu-open')
      window.lenis?.stop()
    } else {
      root.classList.remove('menu-open')
      window.lenis?.start()
    }

    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false)
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      root.classList.remove('menu-open')
      window.lenis?.start()
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.15, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-premium ${
        scrolled || open
          ? 'bg-base-950/80 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl'
          : 'bg-base-950/50 backdrop-blur-md'
      }`}
      style={{ paddingLeft: 'var(--safe-l)', paddingRight: 'var(--safe-r)' }}
    >
      <div
        className={`container-page flex items-center justify-between gap-4 transition-[padding] duration-300 ease-premium ${
          scrolled ? 'py-3 md:py-3.5' : 'py-4 md:py-5'
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent transition-opacity duration-500 ${
            scrolled || open ? 'opacity-100' : 'opacity-40'
          }`}
        />

        <a href="#top" className="focus-ring -m-1 p-1" aria-label="NavSolutions" onClick={() => setOpen(false)}>
          <BrandLogo compactBar={scrolled} />
        </a>

        <nav className="hidden items-center gap-1 md:flex lg:gap-3" onMouseLeave={() => setHovered('')}>
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href
            // One glowing bar slides under whichever link is hovered and
            // settles back on the current section.
            const hasBar = (hovered || active) === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                onFocus={() => setHovered(link.href)}
                onBlur={() => setHovered('')}
                aria-current={isActive ? 'location' : undefined}
                className={`relative shrink-0 px-2.5 py-2.5 font-sans text-[13px] font-medium tracking-[0.01em] transition-colors duration-200 focus-ring lg:px-3 lg:text-sm ${
                  hasBar || isActive ? 'text-white' : 'text-white/55'
                }`}
              >
                {link.label}
                {hasBar && (
                  <motion.span
                    layoutId="nav-bar"
                    className="absolute inset-x-2.5 -bottom-px h-[2px] rounded-full bg-gradient-to-r from-accent-light to-accent-blue shadow-[0_0_10px_rgba(77,255,0,0.7)] lg:inset-x-3"
                    transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                  />
                )}
              </a>
            )
          })}
        </nav>

        {/* Deliberately static (no magnetic pull): it stands out through
            colour and glow, not movement. */}
        <a
          href="#contacto"
          className="group hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 font-sans text-sm font-semibold text-base-950 shadow-[0_0_0_1px_rgba(215,255,47,0.35),0_0_22px_rgba(77,255,0,0.3)] transition-[box-shadow,filter] duration-300 hover:shadow-[0_0_0_1px_rgba(215,255,47,0.6),0_0_34px_rgba(77,255,0,0.55)] hover:brightness-110 focus-ring lg:inline-flex"
          style={{ background: 'linear-gradient(90deg, #D7FF2F 0%, #4DFF00 55%, #00B93E 100%)' }}
        >
          Cuéntanos tu idea
          <span aria-hidden="true">→</span>
        </a>

        <button
          className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full md:hidden focus-ring"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <span
            className={`h-[1.5px] w-6 rounded-full bg-white transition-transform duration-300 ease-premium ${
              open ? 'translate-y-[6.5px] rotate-45' : ''
            }`}
          />
          <span
            className={`h-[1.5px] w-6 rounded-full bg-white transition-opacity duration-200 ${
              open ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`h-[1.5px] w-6 rounded-full bg-white transition-transform duration-300 ease-premium ${
              open ? '-translate-y-[6.5px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-nav"
            key="mobile-nav"
            variants={panel}
            initial="hidden"
            animate="show"
            exit="exit"
            className="relative overflow-hidden bg-base-950/95 backdrop-blur-xl md:hidden"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 top-6 h-72 w-72 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(77,255,0,0.14) 0%, rgba(77,255,0,0) 70%)' }}
            />
            <div
              className="container-page relative flex flex-col pt-3"
              // Fills the screen under the bar so the sheet reads as its own view.
              style={{
                minHeight: 'calc(100svh - var(--nav-h))',
                paddingBottom: 'calc(1.5rem + var(--safe-b))',
              }}
            >
              {NAV_LINKS.map((link, index) => {
                const isActive = active === link.href
                return (
                  <motion.a
                    key={link.href}
                    variants={item}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? 'location' : undefined}
                    className="group flex items-baseline gap-4 border-b border-white/[0.06] py-4 focus-ring"
                  >
                    <span className="w-6 font-sans text-xs font-medium tabular-nums text-accent-light/70">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-display text-[1.75rem] font-bold leading-none tracking-tight transition-colors group-active:text-accent-light ${
                        isActive ? 'text-accent-light' : 'text-white'
                      }`}
                    >
                      {link.label}
                    </span>
                    <span className="ml-auto self-center text-lg text-white/25 transition-transform group-active:translate-x-1">→</span>
                  </motion.a>
                )
              })}

              <div className="flex-1" />

              <motion.a
                variants={item}
                href="#contacto"
                onClick={() => setOpen(false)}
                className="mt-8 rounded-full py-4 text-center font-sans text-base font-semibold text-base-950 shadow-[0_0_28px_rgba(77,255,0,0.25)] focus-ring"
                style={{ background: 'linear-gradient(90deg, #D7FF2F 0%, #4DFF00 54%, #00B93E 100%)' }}
              >
                Cuéntanos tu idea
              </motion.a>

              <motion.a
                variants={item}
                href={`mailto:${CONTACT.email}`}
                className="mt-3 text-center font-sans text-xs text-white/35 focus-ring"
              >
                {CONTACT.email}
              </motion.a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
