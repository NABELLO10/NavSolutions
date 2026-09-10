import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV_LINKS, CONTACT } from '../data/content'
import MagneticButton from './MagneticButton'
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

  // Compact the bar once the hero is behind us. Kept in a rAF so the
  // scroll listener never does layout work on the scroll thread.
  useEffect(() => {
    let frame = 0
    let current = false

    const update = () => {
      frame = 0
      const next = window.scrollY > 24
      if (next === current) return
      current = next
      setScrolled(next)
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
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-premium ${
        scrolled || open
          ? 'border-white/10 bg-base-950/85 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl'
          : 'border-white/[0.06] bg-base-950/60 backdrop-blur-md'
      }`}
      style={{ paddingLeft: 'var(--safe-l)', paddingRight: 'var(--safe-r)' }}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 transition-[padding] duration-300 ease-premium sm:px-6 lg:px-10 ${
          scrolled ? 'py-3 md:py-3.5' : 'py-4 md:py-5'
        }`}
      >
        <a href="#top" className="focus-ring -m-1 p-1" aria-label="NavSolutions" onClick={() => setOpen(false)}>
          <BrandLogo compactBar={scrolled} />
        </a>

        <nav className="hidden items-center gap-5 md:flex lg:gap-9">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative shrink-0 py-2.5 font-sans text-[13px] text-white/70 transition-colors hover:text-white focus-ring lg:text-sm"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent-light transition-all duration-300 ease-premium group-hover:w-full" />
            </a>
          ))}
        </nav>

        <MagneticButton
          as="a"
          href="#contacto"
          className="hidden shrink-0 whitespace-nowrap rounded-full border border-white/15 px-4 py-2 font-sans text-[13px] text-white/90 transition-colors hover:border-accent-light/60 hover:text-accent-light md:inline-flex focus-ring lg:px-5 lg:py-2.5 lg:text-sm"
        >
          Cuéntanos tu idea
        </MagneticButton>

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
            className="overflow-hidden border-t border-white/10 bg-base-950/95 backdrop-blur-xl md:hidden"
          >
            <div
              className="flex flex-col px-5 pt-2 sm:px-6"
              style={{ paddingBottom: 'calc(1.5rem + var(--safe-b))' }}
            >
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.href}
                  variants={item}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-white/[0.06] py-4 font-sans text-base text-white/80 transition-colors active:text-accent-light focus-ring"
                >
                  {link.label}
                  <span className="text-white/25">→</span>
                </motion.a>
              ))}

              <motion.a
                variants={item}
                href="#contacto"
                onClick={() => setOpen(false)}
                className="mt-5 rounded-full py-3.5 text-center font-sans text-sm font-semibold text-base-950 focus-ring"
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
