import { motion } from 'framer-motion'
import RevealText from '../../components/RevealText'
import { EXPERIENCE_TAGS } from '../../data/content'

export default function About() {
  return (
    <section className="relative px-5 py-20 sm:px-6 sm:py-28 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div>
          <RevealText
            as="h2"
            text="Tecnología con sentido."
            className="text-balance font-display text-giant font-extrabold leading-tight text-white"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 font-sans text-base leading-relaxed text-white/60 sm:gap-5 sm:text-lg"
        >
          <p>NavSolutions nace de una idea simple:</p>
          <p className="text-balance font-display text-xl font-semibold leading-snug text-white sm:text-2xl">
            La tecnología debería resolver problemas, no crear nuevos.
          </p>
          <p>Cada proyecto comienza entendiendo cómo funciona realmente una organización.</p>
          <p>Después diseñamos una solución que se adapte al proceso, y no al revés.</p>
          <p>
            El objetivo no es entregar software.
            <br />
            El objetivo es entregar una herramienta que realmente sea utilizada.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 sm:mt-6">
            {EXPERIENCE_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 px-3.5 py-1.5 font-sans text-xs text-white/40"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
