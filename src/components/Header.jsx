import { useState } from 'react'
import { motion } from 'framer-motion'
import { NAV_LINKS } from '../data/content'
import MagneticButton from './MagneticButton'
import BrandLogo from './BrandLogo'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-base-950 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#top"
          className="focus-ring"
          aria-label="NavSolutions"
        >
          <BrandLogo />
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative font-sans text-sm text-white/70 transition-colors hover:text-white focus-ring"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent-light transition-all duration-300 ease-premium group-hover:w-full" />
            </a>
          ))}
        </nav>

        <MagneticButton
          as="a"
          href="#contacto"
          className="hidden rounded-full border border-white/15 px-5 py-2.5 font-sans text-sm text-white/90 transition-colors hover:border-accent-light/60 hover:text-accent-light md:inline-flex focus-ring"
        >
          Cuéntanos tu idea
        </MagneticButton>

        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden focus-ring"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          <span className={`h-px w-6 bg-white transition-transform ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
          <span className={`h-px w-6 bg-white transition-transform ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-1 border-t border-white/10 bg-base-950/95 px-6 pb-6 pt-4 md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 font-sans text-base text-white/80"
            >
              {link.label}
            </a>
          ))}
          <a href="#contacto" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-accent-blue py-3 text-center font-sans text-sm font-medium text-white">
            Cuéntanos tu idea
          </a>
        </motion.nav>
      )}
    </motion.header>
  )
}
