import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { CHAOS_ITEMS } from '../../data/content'
import RevealText from '../../components/RevealText'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const HOLD = 0.5
const ARRIVE = HOLD + 0.28

export default function Problems() {
  const gridRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  // 0→1 maps to "grid just entered the bottom of the screen" → "grid
  // scrolled up past the middle" — independent of section height, so
  // the hold/collapse timing is anchored to the cards' real position
  // on screen instead of an abstract whole-section progress.
  const { scrollYProgress: gridProgress } = useScroll({
    target: gridRef,
    offset: ['start 0.9', 'start 0.3'],
  })
  const progress = useSpring(gridProgress, { stiffness: 150, damping: 30, mass: 0.35 })

  // The whole card cluster collapses as ONE unit toward the circle
  // below it (transform-origin sits past the grid's own bottom edge,
  // roughly where the circle is), instead of six cards independently
  // measuring and chasing the circle's center. That per-card approach
  // kept breaking in a new way at every viewport/timing tweak — cards
  // stuck mid-travel, some arriving early — because it depended on six
  // separate motion values staying perfectly in sync. A single
  // transform can't fall out of sync with itself, it's cheaper to
  // animate (1 element instead of 6, no blur-per-card), and it still
  // reads clearly as "sucked into the circle" thanks to the offset
  // transform-origin plus a matching downward drift.
  const gridScale = useTransform(progress, [0, HOLD, ARRIVE, 1], [1, 1, 0.06, 0.06])
  const gridY = useTransform(progress, [0, HOLD, ARRIVE, 1], [0, 0, 90, 90])
  const gridOpacity = useTransform(progress, [0, HOLD, (HOLD + ARRIVE) / 2, ARRIVE, 1], [1, 1, 1, 0, 0])
  const gridBlurPx = useTransform(progress, [HOLD, ARRIVE], [0, 3])
  const gridFilter = useTransform(gridBlurPx, (v) => `blur(${v}px)`)

  // The circle swells in sync with the collapse to visually swallow
  // the cards, then eases back down to a calmer resting size. Capped
  // at 1.9x — any bigger and it (and its now-giant "1 SISTEMA" label)
  // overflows the viewport on shorter screens instead of reading as a
  // circle.
  const circleScale = useTransform(progress, [0, HOLD, ARRIVE, 1], [1, 1, 1.9, 1.15])
  const circleGlow = useTransform(progress, [0, HOLD, ARRIVE, 1], [0.35, 0.35, 0.85, 0.45])
  const circleShadow = useTransform(circleGlow, (v) => `0 0 ${60 + v * 40}px rgba(20,125,255,${v})`)

  const active = !reducedMotion

  return (
    <section className="relative px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-3xl text-center">
        <RevealText
          as="h2"
          text="La tecnología debería simplificar tu negocio. No complicarlo."
          className="text-balance font-display text-big font-bold leading-tight text-white"
        />
      </div>

      <motion.div
        ref={gridRef}
        style={
          active
            ? {
                scale: gridScale,
                y: gridY,
                opacity: gridOpacity,
                filter: gridFilter,
                transformOrigin: '50% 200%',
              }
            : undefined
        }
        className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-3"
      >
        {CHAOS_ITEMS.map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.35, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="block rounded-2xl border border-white/10 bg-base-900/80 px-6 py-4 font-sans text-base text-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur-sm"
          >
            {item}
          </motion.span>
        ))}
      </motion.div>

      <motion.div
        style={active ? { scale: circleScale, boxShadow: circleShadow } : undefined}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative z-10 mx-auto mt-14 flex h-36 w-36 flex-col items-center justify-center rounded-full border border-accent-light/40 bg-gradient-to-br from-accent-blue/20 to-accent-cyan/10 text-center shadow-[0_0_60px_rgba(20,125,255,0.35)]"
      >
        <span className="font-display text-3xl font-extrabold text-white">1</span>
        <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-accent-light">
          Sistema
        </span>
      </motion.div>
    </section>
  )
}
