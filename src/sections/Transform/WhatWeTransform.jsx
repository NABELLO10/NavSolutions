import { motion } from 'framer-motion'
import RevealText from '../../components/RevealText'
import { TRANSFORM_PHRASES, SOLUTION_TYPES } from '../../data/content'

// The from → to pair is the payload of this section, not decoration.
// It used to be `hidden md:flex`, so phone visitors read the phrases
// with the actual transformation missing. On narrow screens it moves
// below the phrase as a full-width row instead of disappearing.
function TransitionPair({ phrase, className = '' }) {
  return (
    <div className={`flex items-center gap-2 font-sans ${className}`}>
      <span className="min-w-0 truncate rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-white/40 transition-colors duration-300 group-hover:border-white/20 group-hover:text-white/60 md:px-4 md:py-2 md:text-sm">
        {phrase.from}
      </span>
      <span className="shrink-0 text-accent-light/60">→</span>
      <span className="min-w-0 truncate rounded-full border border-accent-light/30 bg-accent-blue/10 px-3 py-1.5 text-[11px] text-accent-light transition-colors duration-300 md:px-4 md:py-2 md:text-sm">
        {phrase.to}
      </span>
    </div>
  )
}

function PhraseRow({ phrase, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col gap-4 border-b border-white/10 py-6 sm:py-8 md:flex-row md:items-center md:justify-between md:gap-6 md:py-10"
    >
      <p className="max-w-2xl font-display text-xl font-semibold leading-snug text-white/85 sm:text-2xl md:text-3xl">
        {phrase.text}
      </p>
      <TransitionPair phrase={phrase} className="shrink-0" />
    </motion.div>
  )
}

export default function WhatWeTransform() {
  return (
    <section id="soluciones" className="relative px-5 py-20 sm:px-6 sm:py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-5xl">
        <RevealText
          as="h2"
          text="¿Qué podemos transformar?"
          className="text-balance font-display text-giant font-extrabold leading-tight text-white"
        />

        <div className="mt-8 sm:mt-12 md:mt-16">
          {TRANSFORM_PHRASES.map((phrase, i) => (
            <PhraseRow key={phrase.text} phrase={phrase} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.35 }}
          className="mt-12 flex flex-wrap gap-2 sm:mt-16 sm:gap-3 md:mt-20"
        >
          {SOLUTION_TYPES.map((type, i) => (
            <motion.span
              key={type}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.3, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-full border border-white/10 px-3.5 py-2 font-sans text-xs text-white/45 sm:px-4 sm:text-sm"
            >
              {type}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
