import { motion } from 'framer-motion'
import HeroGrid from './HeroGrid'
import HeroNetwork from './HeroNetwork'
import HeroTransition from './HeroTransition'
import AnimatedTitle from '../../components/AnimatedTitle'
import MagneticButton from '../../components/MagneticButton'

export default function Hero({ ready, enableHeavyFx, enableAmbientFx = true }) {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pb-6"
      style={{ paddingTop: 'calc(var(--nav-h) + 2rem)' }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(1,2,1,0.99) 0%, rgba(1,2,1,0.97) 58%, rgba(3,12,6,0.78) 78%, rgba(3,12,6,0.26) 94%, rgba(1,2,1,0) 100%)',
        }}
      />
      <HeroGrid />
      <HeroNetwork interactive={enableHeavyFx} animated={enableAmbientFx} />
      <HeroTransition />

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 sm:px-6 md:px-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mb-4 inline-flex w-fit max-w-full items-center gap-3 rounded-2xl border border-white/10 px-3.5 py-2 font-sans text-[11px] font-medium uppercase leading-relaxed tracking-[0.14em] text-accent-light/90 xs:tracking-[0.2em] sm:rounded-full sm:px-4 sm:py-1.5 sm:tracking-[0.25em]"
        >
          Digital Solutions / Software / Automatizaciones de procesos
        </motion.span>

        <AnimatedTitle
          text="Las buenas ideas merecen mejores sistemas."
          start={ready}
          delay={0.1}
          className="max-w-6xl text-balance font-display text-hero font-extrabold leading-[1.06] tracking-tight text-white"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-xl font-sans text-[15px] leading-relaxed text-white/60 sm:text-base md:text-lg"
        >
          Diseñamos sistemas, plataformas y experiencias digitales que transforman la forma en que
          las empresas trabajan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto mt-7 w-full xs:w-fit"
        >
          <MagneticButton
            as="a"
            href="#contacto"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 font-sans text-sm font-semibold text-base-950 shadow-[0_0_24px_rgba(24,224,96,0.16)] transition-transform active:scale-[0.98] focus-ring xs:w-auto"
            style={{ background: 'linear-gradient(90deg, #D7FF2F 0%, #4DFF00 50%, #00B93E 100%)' }}
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
        className="scroll-cue relative z-10 mx-auto mt-6 items-center gap-3 font-sans text-[10px] uppercase tracking-[0.3em] text-white/35 sm:text-[11px]"
      >
        <span className="h-6 w-px animate-pulse bg-gradient-to-b from-white/40 to-transparent" />
        Scroll
      </motion.div>
    </section>
  )
}
