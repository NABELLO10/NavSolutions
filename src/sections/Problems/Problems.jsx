import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FiActivity,
  FiArrowRight,
  FiBarChart2,
  FiCheck,
  FiDatabase,
  FiInbox,
  FiLayers,
  FiRefreshCw,
  FiRotateCcw,
  FiZap,
} from 'react-icons/fi'
import RevealText from '../../components/RevealText'

const FLOW = [
  { id: 'capture', label: 'Captura', detail: 'Reúne la información', icon: FiInbox, tone: 'text-amber-300' },
  { id: 'centralize', label: 'Centraliza', detail: 'Conecta cada fuente', icon: FiLayers, tone: 'text-sky-300' },
  { id: 'automate', label: 'Automatiza', detail: 'Elimina tareas manuales', icon: FiZap, tone: 'text-violet-300' },
  { id: 'measure', label: 'Mide', detail: 'Convierte datos en decisiones', icon: FiBarChart2, tone: 'text-emerald-300' },
]

const OPTIONS = [FLOW[2], FLOW[0], FLOW[3], FLOW[1]]

const RESULTS = [
  { label: 'Datos sincronizados', value: '100%', pending: 'En espera' },
  { label: 'Flujos automatizados', value: 'Activos', pending: 'Pendiente' },
  { label: 'Alertas críticas', value: '0', pending: 'Pendiente' },
]

const METRICS = [
  { value: '-70%', label: 'tareas repetitivas' },
  { value: '1', label: 'fuente de verdad' },
  { value: '24/7', label: 'visibilidad operativa' },
]

const CHART = [30, 48, 40, 65, 54, 78, 69, 92, 82, 100]
const ease = [0.16, 1, 0.3, 1]

export default function Problems() {
  const [sequence, setSequence] = useState([])
  const [wrongStep, setWrongStep] = useState(null)

  const completion = sequence.length / FLOW.length
  const isComplete = sequence.length === FLOW.length
  const nextStep = FLOW[sequence.length]
  const displayedSteps = isComplete ? FLOW : OPTIONS

  const chooseStep = (stepId) => {
    if (isComplete || sequence.includes(stepId)) return

    if (stepId !== nextStep.id) {
      setWrongStep(stepId)
      return
    }

    setWrongStep(null)
    setSequence((current) => [...current, stepId])
  }

  const resetFlow = () => {
    setSequence([])
    setWrongStep(null)
  }

  return (
    <section className="relative overflow-hidden px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.24em] text-accent-light/80">
          Menos fricción. Más control.
        </p>
        <RevealText
          as="h2"
          text="Descubre cómo se construye una operación inteligente."
          className="text-balance font-display text-big font-bold leading-tight text-white"
        />
        <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/52">
          Ordena las etapas y activa el sistema. Cada paso conecta la información hasta convertirla
          en una operación visible, automática y fácil de gestionar.
        </p>
      </div>

      <motion.div
        className="relative mx-auto mt-14 max-w-6xl overflow-hidden rounded-lg border border-white/10 bg-[#08111c] shadow-[0_34px_110px_rgba(0,0,0,0.38)]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.16 }}
        transition={{ duration: 0.55, ease }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_48%_48%,rgba(20,125,255,0.16),transparent_32%),radial-gradient(circle_at_92%_8%,rgba(45,212,191,0.08),transparent_26%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.45)_1px,transparent_1px)] [background-size:56px_56px]" />

        <div className="relative flex min-h-16 items-center justify-between border-b border-white/10 px-5 md:px-7">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-md border border-accent-light/20 bg-accent-light/10 text-accent-light">
              <FiZap size={15} />
            </span>
            <div>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-white/76">
                Experiencia interactiva
              </p>
              <p className="mt-0.5 hidden font-sans text-[11px] text-white/36 sm:block">
                Construye el flujo correcto
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 font-sans text-[11px] font-semibold ${isComplete ? 'text-emerald-300/90' : 'text-accent-light/80'}`}>
              <span className="relative flex h-2 w-2">
                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-40 ${isComplete ? 'bg-emerald-300' : 'bg-accent-light'}`} />
                <span className={`relative inline-flex h-2 w-2 rounded-full ${isComplete ? 'bg-emerald-300' : 'bg-accent-light'}`} />
              </span>
              <span className="sm:hidden">{isComplete ? 'Listo' : `${sequence.length}/4`}</span>
              <span className="hidden sm:inline">
                {isComplete ? 'Flujo listo' : `${sequence.length}/4 pasos`}
              </span>
            </div>
            {sequence.length > 0 && (
              <button
                type="button"
                onClick={resetFlow}
                className="focus-ring grid h-8 w-8 place-items-center rounded-md border border-white/10 text-white/45 transition-colors hover:border-white/20 hover:text-white"
                title="Reiniciar flujo"
                aria-label="Reiniciar flujo"
              >
                <FiRotateCcw size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="relative grid gap-10 px-5 py-10 md:px-8 lg:min-h-[520px] lg:grid-cols-[240px_1fr_270px] lg:items-center lg:gap-5 lg:px-9 lg:py-8">
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            viewBox="0 0 1000 520"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="flow-in" x1="0" x2="1">
                <stop offset="0" stopColor="#55D6FF" stopOpacity="0.2" />
                <stop offset="0.65" stopColor="#55D6FF" stopOpacity="0.8" />
                <stop offset="1" stopColor="#147DFF" stopOpacity="0.42" />
              </linearGradient>
              <linearGradient id="flow-out" x1="0" x2="1">
                <stop offset="0" stopColor="#147DFF" stopOpacity="0.6" />
                <stop offset="1" stopColor="#6EE7B7" stopOpacity="0.82" />
              </linearGradient>
            </defs>
            {[125, 215, 305, 395].map((y, index) => {
              const option = displayedSteps[index]
              const active = sequence.includes(option.id)
              return (
                <motion.path
                  key={option.id}
                  d={`M 225 ${y} C 300 ${y}, 310 260, 410 260`}
                  fill="none"
                  stroke="url(#flow-in)"
                  strokeWidth="1.2"
                  strokeDasharray="4 8"
                  vectorEffect="non-scaling-stroke"
                  initial={false}
                  animate={{ pathLength: active ? 1 : 0.08, opacity: active ? 1 : 0.14 }}
                  transition={{ duration: 0.55, ease }}
                />
              )
            })}
            <motion.path
              d="M 600 260 C 655 260, 686 260, 756 260"
              fill="none"
              stroke="url(#flow-out)"
              strokeWidth="1.4"
              strokeDasharray="5 8"
              vectorEffect="non-scaling-stroke"
              initial={false}
              animate={{ pathLength: isComplete ? 1 : 0.08, opacity: isComplete ? 1 : 0.12 }}
              transition={{ duration: 0.65, ease }}
            />
          </svg>

          <div className="relative z-10">
            <div className="mb-4 min-h-[44px]">
              <div className="flex items-center justify-between">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-white/46">
                  Ordena el flujo
                </p>
                <span className="font-sans text-[10px] text-white/30">Haz clic</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={isComplete ? 'complete' : nextStep.id}
                  className={`mt-2 font-sans text-xs ${isComplete ? 'text-emerald-300/80' : 'text-accent-light/72'}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  aria-live="polite"
                >
                  {isComplete ? 'Perfecto. El sistema está activo.' : `Siguiente paso: ${nextStep.label}`}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {displayedSteps.map((step, index) => {
                const Icon = step.icon
                const order = sequence.indexOf(step.id)
                const selected = order >= 0
                const wrong = wrongStep === step.id

                return (
                  <motion.button
                    key={step.id}
                    layout
                    type="button"
                    onClick={() => chooseStep(step.id)}
                    disabled={selected || isComplete}
                    className={`focus-ring group flex min-h-[72px] w-full items-center gap-3 rounded-lg border px-3.5 py-2 text-left transition-colors duration-300 ${
                      selected
                        ? 'border-emerald-300/30 bg-emerald-300/[0.07]'
                        : wrong
                          ? 'border-rose-300/50 bg-rose-300/[0.06]'
                          : 'border-white/10 bg-black/20 hover:border-accent-light/30 hover:bg-white/[0.045]'
                    }`}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    animate={wrong ? { x: [0, -5, 5, -3, 3, 0] } : {}}
                    onAnimationComplete={() => {
                      if (wrongStep === step.id) setWrongStep(null)
                    }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.34, delay: 0.08 + index * 0.05, ease }}
                    aria-pressed={selected}
                  >
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-md bg-white/[0.05] ${selected ? 'text-emerald-300' : step.tone}`}>
                      {selected ? <span className="font-sans text-xs font-bold">{order + 1}</span> : <Icon size={16} />}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-sans text-sm font-bold text-white/86">{step.label}</span>
                      <span className="mt-1 block font-sans text-[11px] leading-snug text-white/36">{step.detail}</span>
                    </span>
                    {selected ? (
                      <FiCheck className="ml-auto shrink-0 text-emerald-300" size={15} />
                    ) : (
                      <FiArrowRight className="ml-auto shrink-0 text-white/20 transition-colors group-hover:text-accent-light" size={15} />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>

          <div className="relative z-10 mx-auto grid h-[310px] w-full max-w-[360px] place-items-center lg:h-[410px]">
            <motion.div
              className="absolute h-64 w-64 rounded-full border border-accent-light/15 bg-accent-blue/[0.045] shadow-[0_0_90px_rgba(20,125,255,0.2)] lg:h-72 lg:w-72"
              animate={{ scale: isComplete ? 1.04 : 1, borderColor: isComplete ? 'rgba(110,231,183,0.3)' : 'rgba(85,214,255,0.15)' }}
              transition={{ duration: 0.5, ease }}
            />
            <div className="system-orbit absolute h-[296px] w-[296px] rounded-full border border-dashed border-white/10 lg:h-[340px] lg:w-[340px]" />
            <div className="absolute left-1/2 top-1/2 h-px w-[82%] -translate-x-1/2 bg-gradient-to-r from-transparent via-accent-light/22 to-transparent" />
            <div className="absolute left-1/2 top-1/2 h-[82%] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-accent-blue/20 to-transparent" />

            <motion.div
              className={`relative w-[220px] overflow-hidden rounded-lg border bg-[#0a1726]/95 p-5 shadow-[0_26px_70px_rgba(0,0,0,0.48)] ${isComplete ? 'border-emerald-300/35' : 'border-accent-light/30'}`}
              animate={isComplete ? { scale: [1, 1.035, 1] } : { scale: 1 }}
              transition={{ duration: 0.48, ease }}
            >
              <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${isComplete ? 'via-emerald-300' : 'via-accent-light'} to-transparent`} />
              <div className="flex items-center justify-between">
                <span className={`font-sans text-[10px] font-bold uppercase tracking-[0.24em] ${isComplete ? 'text-emerald-300' : 'text-accent-light'}`}>
                  Nab OS
                </span>
                <FiDatabase className={isComplete ? 'text-emerald-300' : 'text-accent-light'} size={18} />
              </div>
              <p className="mt-5 font-display text-2xl font-extrabold leading-tight text-white">
                {isComplete ? 'Sistema activo' : 'Construyendo flujo'}
              </p>
              <p className="mt-2 font-sans text-xs leading-relaxed text-white/42">
                {isComplete ? 'Todo conectado y bajo control.' : `${sequence.length} de 4 etapas conectadas.`}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${isComplete ? 'from-emerald-400 to-emerald-200' : 'from-accent-blue to-accent-light'}`}
                    initial={false}
                    animate={{ width: `${Math.max(8, completion * 100)}%` }}
                    transition={{ duration: 0.5, ease }}
                  />
                </div>
                <FiRefreshCw className={`${isComplete ? 'system-spin text-emerald-300' : 'text-white/28'}`} size={14} />
              </div>
            </motion.div>
          </div>

          <motion.div
            className={`relative z-10 overflow-hidden rounded-lg border transition-colors duration-500 ${isComplete ? 'border-emerald-300/25 bg-emerald-300/[0.05]' : 'border-white/10 bg-white/[0.02]'}`}
            animate={{ opacity: isComplete ? 1 : 0.58, y: isComplete ? 0 : 4 }}
            transition={{ duration: 0.45, ease }}
            aria-live="polite"
          >
            <div className="flex items-start justify-between border-b border-white/[0.08] px-5 py-5">
              <div>
                <p className={`font-sans text-[10px] font-bold uppercase tracking-[0.22em] ${isComplete ? 'text-emerald-300/80' : 'text-white/38'}`}>
                  Resultado
                </p>
                <p className="mt-2 font-display text-xl font-extrabold text-white">
                  {isComplete ? 'Operación en vivo' : 'Esperando flujo'}
                </p>
              </div>
              <span className={`grid h-8 w-8 place-items-center rounded-md ${isComplete ? 'bg-emerald-300/10 text-emerald-300' : 'bg-white/[0.05] text-white/30'}`}>
                {isComplete ? <FiCheck size={17} /> : <FiActivity size={17} />}
              </span>
            </div>

            <div className="px-5 py-2">
              {RESULTS.map((result) => (
                <div
                  key={result.label}
                  className="flex min-h-[58px] items-center justify-between border-b border-white/[0.07] last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <span className={`h-1.5 w-1.5 rounded-full ${isComplete ? 'bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.6)]' : 'bg-white/20'}`} />
                    <span className="font-sans text-xs text-white/52">{result.label}</span>
                  </div>
                  <span className="font-sans text-[11px] font-bold text-white/82">
                    {isComplete ? result.value : result.pending}
                  </span>
                </div>
              ))}
            </div>

            <div className="mx-5 mb-5 mt-3 flex h-16 items-end gap-1.5" aria-hidden="true">
              {CHART.map((height, index) => (
                <motion.span
                  key={`${height}-${index}`}
                  className={`flex-1 rounded-sm bg-gradient-to-t ${isComplete ? 'from-accent-blue/45 to-emerald-300/80' : 'from-white/[0.03] to-white/10'}`}
                  initial={false}
                  animate={{ height: isComplete ? `${height}%` : '8%', opacity: isComplete ? 1 : 0.4 }}
                  transition={{ duration: 0.42, delay: isComplete ? index * 0.035 : 0, ease }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative grid border-t border-white/10 bg-black/15 sm:grid-cols-3"
          animate={{ opacity: isComplete ? 1 : 0.42 }}
          transition={{ duration: 0.45 }}
        >
          {METRICS.map((metric) => (
            <div
              key={metric.label}
              className="flex items-center gap-4 border-b border-white/10 px-6 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 md:px-8"
            >
              <p className="font-display text-2xl font-extrabold text-white">{metric.value}</p>
              <p className="max-w-[110px] font-sans text-xs leading-snug text-white/40">{metric.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
