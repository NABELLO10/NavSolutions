import { motion } from 'framer-motion'
import { SYSTEM_SCREENS } from '../../data/content'
import RevealText from '../../components/RevealText'
import MockScreen from './MockScreen'

export default function Systems() {
  return (
    <section className="relative px-6 py-28 md:px-10 md:py-36">
      <RevealText
        as="h2"
        text="Construimos herramientas que trabajan contigo."
        className="mx-auto max-w-3xl text-balance text-center font-display text-big font-bold text-white"
      />

      <div className="mx-auto mt-14 grid max-w-5xl gap-x-10 gap-y-14 sm:grid-cols-2">
        {SYSTEM_SCREENS.map((screen, i) => (
          <motion.div
            key={screen.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: (i % 2) * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <MockScreen id={screen.id} title={screen.label} />
            <p className="mt-4 text-center font-sans text-sm uppercase tracking-[0.25em] text-accent-light/70">
              {screen.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
