import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MagneticButton from '../../components/MagneticButton'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const PHRASES = [
  'No necesitas saber qué sistema necesitas.',
  'Solo necesitas contarnos qué problema quieres resolver.',
]

export default function KeySection() {
  const sectionRef = useRef(null)
  const lastPhraseRef = useRef(0)
  const [phraseState, setPhraseState] = useState({ index: 0, direction: 1 })
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const el = sectionRef.current
    if (!el || reducedMotion) return undefined

    let frame = 0

    const updatePhrase = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const triggerLine = viewportHeight * 0.52
      const switchPoint = rect.top + rect.height * 0.46
      const nextIndex = switchPoint <= triggerLine ? 1 : 0
      const previousIndex = lastPhraseRef.current

      if (nextIndex === previousIndex) return

      lastPhraseRef.current = nextIndex
      setPhraseState({
        index: nextIndex,
        direction: nextIndex > previousIndex ? 1 : -1,
      })
    }

    const requestUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(updatePhrase)
    }

    updatePhrase()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[75svh] flex-col items-center justify-center px-6 py-24 text-center md:px-10"
    >
      <div className="relative mx-auto w-full max-w-4xl">
        <p
          aria-hidden="true"
          className="invisible text-balance font-display text-giant font-extrabold leading-tight"
        >
          {PHRASES[1]}
        </p>

        {reducedMotion ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <p className="text-balance font-display text-giant font-extrabold leading-tight text-white">
              {PHRASES[0]}
            </p>
            <p className="text-balance font-display text-giant font-extrabold leading-tight text-white">
              {PHRASES[1]}
            </p>
          </div>
        ) : (
          <AnimatePresence mode="wait" custom={phraseState.direction}>
            <motion.p
              key={phraseState.index}
              custom={phraseState.direction}
              initial={(direction) => ({
                opacity: 0,
                y: direction > 0 ? 24 : -24,
                scale: 0.985,
                filter: 'blur(8px)',
              })}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
              }}
              exit={(direction) => ({
                opacity: 0,
                y: direction > 0 ? -24 : 24,
                scale: 0.985,
                filter: 'blur(8px)',
              })}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center text-balance font-display text-giant font-extrabold leading-tight text-white"
            >
              {PHRASES[phraseState.index]}
            </motion.p>
          </AnimatePresence>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.35, delay: 0.08 }}
        className="relative mt-10"
      >
        <MagneticButton
          as="a"
          href="#contacto"
          className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-sans text-sm font-semibold text-base-950 focus-ring"
          style={{ background: 'linear-gradient(90deg, #D7FF2F 0%, #4DFF00 54%, #00B93E 100%)' }}
        >
          Hablemos <span>→</span>
        </MagneticButton>
      </motion.div>
    </section>
  )
}
