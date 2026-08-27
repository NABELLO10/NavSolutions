import { motion } from 'framer-motion'
import RevealText from '../../components/RevealText'
import { CHAOS_ITEMS } from '../../data/content'

export default function Problems() {
  return (
    <section className="relative overflow-hidden px-6 py-28 md:px-10 md:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-accent-light/25 to-transparent" />

      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <span className="font-sans text-xs uppercase tracking-[0.32em] text-accent-light/70">
            Donde aparece el caos
          </span>
          <RevealText
            as="h2"
            text="Cuando todo depende de planillas, mensajes y memoria."
            className="mt-5 max-w-[11ch] font-display text-giant font-extrabold leading-tight text-white"
          />
          <p className="mt-7 max-w-md font-sans text-lg leading-8 text-white/58">
            Si la informacion esta repartida, cada decision cuesta mas tiempo,
            mas coordinacion y mas margen de error.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {CHAOS_ITEMS.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.35, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="group relative min-h-32 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-blue/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="font-sans text-xs uppercase tracking-[0.24em] text-white/35">
                Problema {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold leading-tight text-white">
                {item}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
