import { motion } from 'framer-motion'
import { PROCESS_STEPS } from '../../data/content'
import RevealText from '../../components/RevealText'

export default function Process() {
  return (
    <section id="proceso" className="relative px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-4xl">
        <RevealText
          as="h2"
          text="Del problema a una solución real."
          className="mb-16 font-display text-giant font-extrabold text-white"
        />

        <div className="relative pl-10 md:pl-14">
          <div className="absolute left-0 top-1 h-full w-px bg-gradient-to-b from-accent-blue via-accent-cyan to-accent-light md:left-[7px]" />

          <div className="flex flex-col gap-12">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.35, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <span className="absolute -left-10 top-1 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-base-950 bg-accent-light md:-left-14" />
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
                  <span className="font-sans text-sm text-accent-light/60">{step.n}</span>
                  <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="font-sans text-white/50">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
