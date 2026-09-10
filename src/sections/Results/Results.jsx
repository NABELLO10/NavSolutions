import { motion } from 'framer-motion'
import { RESULTS } from '../../data/content'
import RevealText from '../../components/RevealText'

export default function Results() {
  return (
    <section className="relative py-20 sm:py-28 md:py-36">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <RevealText
            as="h2"
            text="Esto es lo que cambia cuando ordenamos tu operación."
            className="text-balance font-display text-big font-bold leading-tight text-white"
          />
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {RESULTS.map((result, i) => (
            <motion.div
              key={result}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: i * 0.045, ease: [0.16, 1, 0.3, 1] }}
              whileTap={{ scale: 0.985 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-accent-light/40 hover:bg-white/[0.05] sm:p-6"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'radial-gradient(circle, rgba(77,255,0,0.14) 0%, rgba(77,255,0,0) 68%)' }}
              />
              <span className="relative font-display text-xs font-semibold tracking-[0.15em] text-accent-light/70">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="relative mt-3 font-display text-lg font-bold leading-snug text-white sm:mt-4 sm:text-xl md:text-2xl">
                {result}
              </p>
            </motion.div>
            ))}
        </div>
      </div>
    </section>
  )
}
