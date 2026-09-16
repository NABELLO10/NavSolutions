import { motion } from 'framer-motion'
import RevealText from '../../components/RevealText'
import { EXPERIENCE_TAGS } from '../../data/content'

const EASE = [0.16, 1, 0.3, 1]

export default function About() {
  return (
    <section className="relative py-20 sm:py-28 md:py-36">
      <div className="container-page grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div>
          <RevealText
            as="h2"
            text="Tecnología con sentido."
            className="text-balance font-display text-giant font-extrabold leading-tight text-white"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.38, delay: 0.08, ease: EASE }}
            className="mt-8 flex flex-col gap-6 sm:mt-10"
          >
            <div>
              <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-accent-light/70 sm:text-xs sm:tracking-[0.3em]">
                Experiencia
              </span>
              <p className="mt-3 font-display text-5xl font-extrabold leading-none text-white sm:text-6xl">
                +10 <span className="text-gradient">años</span>
              </p>
              <p className="mt-3 max-w-[30ch] font-sans text-[15px] leading-relaxed text-white/55 sm:text-base">
                diseñando y construyendo sistemas a medida para operaciones reales.
              </p>
            </div>

            <div className="h-px w-full max-w-[18rem] bg-gradient-to-r from-accent-light/30 to-transparent" />

            <div>
              <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-accent-light/70 sm:text-xs sm:tracking-[0.3em]">
                Equipo
              </span>
              <p className="mt-3 max-w-[32ch] font-display text-xl font-semibold leading-snug text-white sm:text-2xl">
                Somos un equipo de profesionales.
              </p>
              <p className="mt-3 max-w-[34ch] font-sans text-[15px] leading-relaxed text-white/55 sm:text-base">
                Diseño, desarrollo e implementación en una misma mesa: hablas siempre con quien
                construye tu proyecto.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.38, ease: EASE }}
          className="flex flex-col gap-4 font-sans text-base leading-relaxed text-white/60 sm:gap-5 sm:text-lg"
        >
          <p>NavSolutions nace de una idea simple:</p>
          <p className="text-balance font-display text-xl font-semibold leading-snug text-white sm:text-2xl">
            La tecnología debería resolver problemas, no crear nuevos.
          </p>
          <p>
            Más de una década de proyectos nos enseñó que ningún sistema funciona si no entiendes
            primero cómo trabaja la gente que lo va a usar.
          </p>
          <p>Por eso cada proyecto comienza entendiendo cómo funciona realmente una organización.</p>
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
