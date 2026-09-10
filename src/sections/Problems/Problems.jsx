import { motion } from 'framer-motion'
import RevealText from '../../components/RevealText'
import { CHAOS_ITEMS } from '../../data/content'

export default function Problems() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-accent-light/25 to-transparent" />

      <div className="container-page grid gap-10 sm:gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-accent-light/70 sm:text-xs sm:tracking-[0.32em]">
            Donde aparece el caos
          </span>
          <RevealText
            as="h2"
            text="Cuando todo depende de planillas, mensajes y memoria."
            className="mt-4 max-w-[18ch] text-balance font-display text-giant font-extrabold leading-tight text-white sm:mt-5 sm:max-w-[14ch] lg:max-w-[11ch]"
          />
          <p className="mt-5 max-w-md font-sans text-base leading-7 text-white/58 sm:mt-7 sm:text-lg sm:leading-8">
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
              whileTap={{ scale: 0.985 }}
              className="group relative min-h-[104px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition-colors duration-300 hover:border-white/20 active:border-accent-light/40 sm:min-h-32 sm:p-6"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-blue/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/35 sm:text-xs sm:tracking-[0.24em]">
                Problema {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold leading-tight text-white sm:mt-5 sm:text-2xl">
                {item}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
