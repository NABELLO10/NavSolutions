import { motion } from 'framer-motion'
import RevealText from '../../components/RevealText'
import { TRANSFORM_BLOCKS } from '../../data/content'

export default function Transformation() {
  return (
    <section className="relative py-20 sm:py-28 md:py-44">
      <div className="container-page">
        <RevealText
          as="h2"
          text="Centraliza. Automatiza. Decide."
          className="text-balance text-center font-display text-giant font-extrabold leading-tight text-white"
        />

        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 md:mt-20 md:grid-cols-3">
          {TRANSFORM_BLOCKS.map((block, i) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileTap={{ scale: 0.985 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 sm:p-8"
            >
              <div
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'radial-gradient(circle, rgba(77,255,0,0.12) 0%, rgba(77,255,0,0) 68%)' }}
              />
              <span className="relative font-sans text-xs uppercase tracking-[0.3em] text-accent-light/70">
                0{i + 1}
              </span>
              <h3 className="relative mt-4 font-display text-2xl font-bold text-white sm:mt-5 sm:text-3xl">
                {block.title}
              </h3>
              <p className="relative mt-3 max-w-[34ch] font-sans text-[15px] text-white/55 sm:mt-4 sm:max-w-[26ch] sm:text-base">{block.text}</p>
              <div className="relative mt-6 h-px w-full bg-white/10 sm:mt-8">
                <div className="h-px w-0 bg-gradient-to-r from-accent-blue to-accent-light transition-all duration-300 ease-premium group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
