import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import MagneticButton from '../../components/MagneticButton'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const PHRASES = [
  'No necesitas saber qué sistema necesitas.',
  'Solo necesitas contarnos qué problema quieres resolver.',
]

export default function KeySection() {
  const sectionRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.75', 'end 0.4'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 32, mass: 0.3 })

  const opacityA = useTransform(progress, [0, 0.46, 0.5], [1, 1, 0])
  const scaleA = useTransform(progress, [0.38, 0.5], [1, 0.96])
  const blurA = useTransform(progress, [0.38, 0.5], [0, 4])
  const filterA = useTransform(blurA, (v) => `blur(${v}px)`)

  const opacityB = useTransform(progress, [0.5, 0.54, 1], [0, 1, 1])
  const scaleB = useTransform(progress, [0.5, 0.62], [1.04, 1])
  const blurB = useTransform(progress, [0.5, 0.62], [4, 0])
  const filterB = useTransform(blurB, (v) => `blur(${v}px)`)

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
          <>
            <motion.p
              style={{ opacity: opacityA, scale: scaleA, filter: filterA }}
              className="absolute inset-0 flex items-center justify-center text-balance font-display text-giant font-extrabold leading-tight text-white"
            >
              {PHRASES[0]}
            </motion.p>
            <motion.p
              style={{ opacity: opacityB, scale: scaleB, filter: filterB }}
              className="absolute inset-0 flex items-center justify-center text-balance font-display text-giant font-extrabold leading-tight text-white"
            >
              {PHRASES[1]}
            </motion.p>
          </>
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
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan px-8 py-4 font-sans text-sm font-semibold text-base-950 focus-ring"
        >
          Hablemos <span>→</span>
        </MagneticButton>
      </motion.div>
    </section>
  )
}
