import { motion } from 'framer-motion'
import RevealText from '../../components/RevealText'
import { TRANSFORM_PHRASES, SOLUTION_TYPES } from '../../data/content'

function PhraseRow({ phrase, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group flex items-center justify-between gap-6 border-b border-white/10 py-8 md:py-10"
    >
      <p className="max-w-2xl font-display text-2xl font-semibold leading-snug text-white/85 md:text-3xl">
        {phrase.text}
      </p>
      <div className="hidden shrink-0 items-center gap-3 font-sans text-sm md:flex">
        <span className="rounded-full border border-white/10 px-4 py-2 text-white/40 transition-colors duration-300 group-hover:border-white/20 group-hover:text-white/60">
          {phrase.from}
        </span>
        <span className="text-accent-light/60">→</span>
        <span className="rounded-full border border-accent-light/30 bg-accent-blue/10 px-4 py-2 text-accent-light transition-colors duration-300">
          {phrase.to}
        </span>
      </div>
    </motion.div>
  )
}

export default function WhatWeTransform() {
  return (
    <section id="soluciones" className="relative px-6 py-32 md:px-10 md:py-40">
      <div className="mx-auto max-w-5xl">
        <RevealText
          as="h2"
          text="¿Qué podemos transformar?"
          className="font-display text-giant font-extrabold text-white"
        />

        <div className="mt-16">
          {TRANSFORM_PHRASES.map((phrase, i) => (
            <PhraseRow key={phrase.text} phrase={phrase} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.35 }}
          className="mt-20 flex flex-wrap gap-3"
        >
          {SOLUTION_TYPES.map((type) => (
            <span
              key={type}
              className="rounded-full border border-white/10 px-4 py-2 font-sans text-sm text-white/45"
            >
              {type}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
