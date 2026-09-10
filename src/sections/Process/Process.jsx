import { motion } from 'framer-motion'
import { PROCESS_STEPS } from '../../data/content'
import RevealText from '../../components/RevealText'
import SectionAnchor from '../../components/SectionAnchor'

export default function Process() {
  return (
    <section className="relative py-20 sm:py-28 md:py-36">
      <div className="container-page">
        <SectionAnchor id="proceso" />

        {/* The container is page-wide so the heading lines up with every
            other section; the timeline keeps its own reading measure. */}
        <div className="max-w-4xl">
          <RevealText
            as="h2"
            text="Del problema a una solución real."
            className="mb-10 text-balance font-display text-giant font-extrabold leading-tight text-white sm:mb-14 md:mb-16"
          />

          <div className="relative pl-8 sm:pl-10 md:pl-14">
            <div className="absolute left-0 top-1 h-full w-px bg-gradient-to-b from-green-500 via-green-700 to-lime-400 md:left-[7px]" />

            <div className="flex flex-col gap-9 sm:gap-12">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.35, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <span className="absolute -left-8 top-1 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-base-950 bg-accent-light sm:-left-10 sm:h-3.5 sm:w-3.5 md:-left-14" />
                  <div className="flex flex-col gap-1 lg:flex-row lg:items-baseline lg:gap-6">
                    <span className="font-sans text-sm text-accent-light/60">{step.n}</span>
                    <h3 className="font-display text-xl font-bold text-white sm:text-2xl md:text-3xl">
                      {step.title}
                    </h3>
                    <p className="font-sans text-[15px] text-white/50 sm:text-base">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
