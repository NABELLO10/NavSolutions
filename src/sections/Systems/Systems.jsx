import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FiArrowLeft,
  FiArrowRight,
  FiBarChart2,
  FiBox,
  FiMapPin,
  FiPieChart,
  FiSmartphone,
  FiUsers,
} from 'react-icons/fi'
import { SYSTEM_SCREENS } from '../../data/content'
import RevealText from '../../components/RevealText'
import MockScreen from './MockScreen'

const SCREEN_DETAILS = {
  dashboard: {
    icon: FiBarChart2,
    kicker: 'Decisiones en tiempo real',
    description: 'Indicadores claros para entender qué está pasando y actuar a tiempo.',
    color: 'text-lime-300',
    active: 'border-lime-300/35 bg-lime-300/[0.08] text-lime-100',
    tag: 'border-lime-300/20 bg-lime-300/[0.06] text-lime-100/70',
    line: 'from-lime-300 via-emerald-300 to-green-500',
    tags: ['Indicadores', 'Alertas', 'Tiempo real', 'Decisiones'],
    background:
      'radial-gradient(circle at 72% 42%, rgba(190,242,100,0.18), transparent 30%), radial-gradient(circle at 12% 80%, rgba(34,197,94,0.13), transparent 35%)',
  },
  inventario: {
    icon: FiBox,
    kicker: 'Stock siempre visible',
    description: 'Productos, movimientos y alertas reunidos en una sola operación.',
    color: 'text-amber-300',
    active: 'border-amber-300/35 bg-amber-300/[0.08] text-amber-100',
    tag: 'border-amber-300/20 bg-amber-300/[0.06] text-amber-100/70',
    line: 'from-amber-300 via-orange-400 to-rose-400',
    tags: ['Stock', 'Movimientos', 'Productos', 'Bodegas'],
    background:
      'radial-gradient(circle at 74% 40%, rgba(251,191,36,0.18), transparent 29%), radial-gradient(circle at 12% 80%, rgba(249,115,22,0.13), transparent 35%)',
  },
  personas: {
    icon: FiUsers,
    kicker: 'Equipos coordinados',
    description: 'Información, responsabilidades y estados disponibles para cada persona.',
    color: 'text-emerald-300',
    active: 'border-emerald-300/35 bg-emerald-300/[0.08] text-emerald-100',
    tag: 'border-emerald-300/20 bg-emerald-300/[0.06] text-emerald-100/70',
    line: 'from-emerald-400 via-green-400 to-lime-400',
    tags: ['Personas', 'Roles', 'Estados', 'Documentos'],
    background:
      'radial-gradient(circle at 72% 43%, rgba(52,211,153,0.18), transparent 30%), radial-gradient(circle at 14% 80%, rgba(20,184,166,0.13), transparent 35%)',
  },
  mapa: {
    icon: FiMapPin,
    kicker: 'Operación en terreno',
    description: 'Ubicaciones, activos y estados representados en su contexto real.',
    color: 'text-green-300',
    active: 'border-green-300/35 bg-green-300/[0.08] text-green-100',
    tag: 'border-green-300/20 bg-green-300/[0.06] text-green-100/70',
    line: 'from-green-300 via-emerald-400 to-lime-300',
    tags: ['Mapa', 'Activos', 'Terreno', 'Estados'],
    background:
      'radial-gradient(circle at 73% 42%, rgba(134,239,172,0.17), transparent 30%), radial-gradient(circle at 13% 80%, rgba(22,163,74,0.12), transparent 35%)',
  },
  reportes: {
    icon: FiPieChart,
    kicker: 'Resultados que se entienden',
    description: 'Reportes vivos que reemplazan horas de consolidación manual.',
    color: 'text-rose-300',
    active: 'border-rose-300/35 bg-rose-300/[0.08] text-rose-100',
    tag: 'border-rose-300/20 bg-rose-300/[0.06] text-rose-100/70',
    line: 'from-rose-300 via-pink-400 to-orange-300',
    tags: ['Reportes', 'Tendencias', 'Exportación', 'Control'],
    background:
      'radial-gradient(circle at 74% 42%, rgba(251,113,133,0.18), transparent 30%), radial-gradient(circle at 13% 80%, rgba(244,114,182,0.12), transparent 35%)',
  },
  movil: {
    icon: FiSmartphone,
    kicker: 'Trabajo desde cualquier lugar',
    description: 'La misma operación, adaptada a las personas que trabajan en movimiento.',
    color: 'text-green-300',
    active: 'border-green-300/35 bg-green-300/[0.08] text-green-100',
    tag: 'border-green-300/20 bg-green-300/[0.06] text-green-100/70',
    line: 'from-green-300 via-emerald-400 to-lime-400',
    tags: ['Móvil', 'Terreno', 'Sincronización', 'Acceso rápido'],
    background:
      'radial-gradient(circle at 73% 42%, rgba(74,222,128,0.12), transparent 30%), radial-gradient(circle at 13% 80%, rgba(22,163,74,0.1), transparent 35%)',
  },
}

export default function Systems() {
  const [activeIndex, setActiveIndex] = useState(0)

  const activeScreen = SYSTEM_SCREENS[activeIndex]
  const detail = SCREEN_DETAILS[activeScreen.id]

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + SYSTEM_SCREENS.length) % SYSTEM_SCREENS.length)
  }

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % SYSTEM_SCREENS.length)
  }

  return (
    <section id="proyectos" className="relative isolate overflow-hidden px-6 py-28 md:px-10 md:py-36">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeScreen.id}
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: detail.background }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55 }}
          aria-hidden="true"
        />
      </AnimatePresence>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.82fr] lg:items-end">
          <RevealText
            as="h2"
            text="Sistemas pensados para trabajar contigo."
            className="max-w-3xl text-balance font-display text-big font-bold leading-tight text-white"
          />
          <p className="max-w-xl font-sans text-base leading-relaxed text-white/50 lg:justify-self-end">
            Explora cómo una misma base tecnológica puede adaptarse a distintas áreas, equipos y
            decisiones del mundo real.
          </p>
        </div>

        <div className="systems-browser-grid mt-14 grid gap-10 lg:gap-12">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-white/38">
                Soluciones
              </p>
              <span className="font-sans text-[10px] text-white/28">
                {String(activeIndex + 1).padStart(2, '0')} / 06
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 lg:grid-cols-1" role="tablist" aria-label="Tipos de sistemas">
              {SYSTEM_SCREENS.map((screen, index) => {
                const item = SCREEN_DETAILS[screen.id]
                const Icon = item.icon
                const selected = index === activeIndex

                return (
                  <button
                    key={screen.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveIndex(index)}
                    className={`focus-ring group grid min-h-[66px] grid-cols-[32px_1fr] items-center gap-3 rounded-md border px-3.5 text-left transition-all duration-300 lg:grid-cols-[32px_1fr_18px] ${
                      selected
                        ? item.active
                        : 'border-white/[0.07] bg-black/10 text-white/48 hover:border-white/15 hover:bg-white/[0.04] hover:text-white/78'
                    }`}
                  >
                    <span className={`grid h-8 w-8 place-items-center rounded-md bg-white/[0.045] ${selected ? item.color : 'text-white/34'}`}>
                      <Icon size={15} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-sans text-[9px] uppercase tracking-[0.14em] opacity-50">
                        Sistema {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="mt-1 block font-sans text-xs font-semibold leading-snug">
                        {screen.label}
                      </span>
                    </span>
                    <FiArrowRight className="hidden justify-self-end opacity-30 transition-transform group-hover:translate-x-0.5 lg:block" size={13} />
                  </button>
                )
              })}
            </div>
          </div>

          <div className="relative min-w-0">
            <div className="pointer-events-none absolute -right-8 -top-24 hidden select-none font-display text-[13rem] font-extrabold leading-none text-white/[0.025] lg:block" aria-hidden="true">
              {String(activeIndex + 1).padStart(2, '0')}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeScreen.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                role="tabpanel"
              >
                <div className="relative mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className={`font-sans text-[11px] font-bold uppercase tracking-[0.22em] ${detail.color}`}>
                      {detail.kicker}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-extrabold text-white md:text-3xl">
                      {activeScreen.label}
                    </h3>
                    <p className="mt-2 max-w-xl font-sans text-sm leading-relaxed text-white/52">
                      {detail.description}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={showPrevious}
                      className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-white/10 text-white/50 transition-colors hover:border-white/20 hover:text-white"
                      title="Sistema anterior"
                      aria-label="Sistema anterior"
                    >
                      <FiArrowLeft size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={showNext}
                      className="focus-ring grid h-9 w-9 place-items-center rounded-md border border-white/10 text-white/50 transition-colors hover:border-white/20 hover:text-white"
                      title="Sistema siguiente"
                      aria-label="Sistema siguiente"
                    >
                      <FiArrowRight size={15} />
                    </button>
                  </div>
                </div>

                <div className={`h-px bg-gradient-to-r ${detail.line}`} />
                <MockScreen id={activeScreen.id} title={activeScreen.label} featured />

                <div className="mt-5 flex flex-wrap gap-2">
                  {detail.tags.map((tag) => (
                    <span key={tag} className={`rounded-full border px-3 py-1 font-sans text-[10px] ${detail.tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
