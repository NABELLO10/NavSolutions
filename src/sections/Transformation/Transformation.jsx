import { motion } from 'framer-motion'
import RevealText from '../../components/RevealText'
import { TRANSFORM_BLOCKS } from '../../data/content'

export default function Transformation() {
  return (
    <section className="relative px-6 py-32 md:px-10 md:py-44">
      <div className="mx-auto max-w-6xl">
        <RevealText
          as="h2"
          text="Centraliza. Automatiza. Decide."
          className="text-center font-display text-giant font-extrabold text-white"
        />

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {TRANSFORM_BLOCKS.map((block, i) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8"
            >
              <div
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'radial-gradient(circle, rgba(77,255,0,0.12) 0%, rgba(77,255,0,0) 68%)' }}
              />
              <span className="relative font-sans text-xs uppercase tracking-[0.3em] text-accent-light/70">
                0{i + 1}
              </span>
              <h3 className="relative mt-5 font-display text-3xl font-bold text-white">
                {block.title}
              </h3>
              <p className="relative mt-4 max-w-[26ch] font-sans text-white/55">{block.text}</p>
              <div className="relative mt-8 h-px w-full bg-white/10">
                <div className="h-px w-0 bg-gradient-to-r from-accent-blue to-accent-light transition-all duration-300 ease-premium group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
