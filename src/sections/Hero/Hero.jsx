import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import HeroGrid from './HeroGrid'
import AnimatedTitle from '../../components/AnimatedTitle'
import MagneticButton from '../../components/MagneticButton'

const HeroOrb = lazy(() => import('./HeroOrb'))

export default function Hero({ ready, enableHeavyFx }) {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-base-950 pt-20 pb-6"
    >
      <HeroGrid />

      {enableHeavyFx && (
        <div
          className="absolute -right-[10%] top-1/2 hidden h-[52vh] w-[52vh] -translate-y-1/2 opacity-60 md:block lg:-right-[4%] lg:h-[60vh] lg:w-[60vh]"
          style={{
            maskImage: 'radial-gradient(circle, black 55%, transparent 78%)',
            WebkitMaskImage: 'radial-gradient(circle, black 55%, transparent 78%)',
          }}
        >
          <Suspense fallback={null}>
            <HeroOrb />
          </Suspense>
        </div>
      )}

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 md:px-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mb-4 inline-flex w-fit items-center gap-3 rounded-full border border-white/10 px-4 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.25em] text-accent-light/90"
        >
          Digital Solutions / Software / Automation
        </motion.span>

        <AnimatedTitle
          text="Las buenas ideas merecen mejores sistemas."
          start={ready}
          delay={0.1}
          className="max-w-6xl font-display text-hero font-extrabold leading-[1.05] tracking-tight text-white"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-xl font-sans text-base leading-relaxed text-white/60 md:text-lg"
        >
          Diseñamos sistemas, plataformas y experiencias digitales que transforman la forma en que
          las empresas trabajan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto mt-7 w-fit"
        >
          <MagneticButton
            as="a"
            href="#contacto"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-sans text-sm font-semibold text-base-950 transition-transform focus-ring"
          >
            Cuéntanos tu idea
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="relative z-10 mx-auto mt-6 flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.3em] text-white/35"
      >
        <span className="h-6 w-px animate-pulse bg-gradient-to-b from-white/40 to-transparent" />
        Scroll
      </motion.div>
    </section>
  )
}
