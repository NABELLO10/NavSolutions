import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoClose } from 'react-icons/io5'
import MockScreen from '../Systems/MockScreen'

const SCREEN_MAP = {
  ops: 'kanban',
  works: 'progress',
  inventory: 'inventario',
  bookings: 'calendar',
  enterprise: 'enterprise',
}

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-base-950/90 backdrop-blur-md" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/10 bg-base-900 p-6 md:p-10"
          >
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:text-white focus-ring"
            >
              <IoClose size={20} />
            </button>

            <span className="font-sans text-xs uppercase tracking-[0.3em] text-accent-light/70">
              Proyecto {project.id}
            </span>
            <h3 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
              {project.title}
            </h3>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 px-3 py-1.5 font-sans text-xs text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <MockScreen id={SCREEN_MAP[project.screen] || 'dashboard'} title={project.title} />
            </div>

            <a
              href="#contacto"
              onClick={onClose}
              className="mt-8 inline-flex items-center gap-2 font-sans text-sm font-medium text-accent-light"
            >
              Quiero algo así →
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
