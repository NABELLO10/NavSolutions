import { motion, useScroll, useTransform } from 'framer-motion'

// A single fixed backdrop shared by the whole page instead of every
// section painting its own flat #05080D block. Gives the site a
// continuous sense of depth (soft light sources + a faint grid,
// vignetted at the edges) rather than a wall of black between sections.
//
// The glow blobs are radial-gradient circles, not solid divs behind a
// CSS `filter: blur()`. A large blurred div is one of the most
// expensive things a browser can composite (measured ~4x slower
// scroll framerate with it in the tree); a radial-gradient with a
// transparent edge reads as an equally soft glow for a fraction of
// the cost, since there's no blur pass at all.
//
// The three blobs parallax at different scroll speeds (cheap,
// transform-only) to sell depth. Each blob is two nested elements on
// purpose: the outer div owns the scroll parallax (framer motion
// writes its transform), the inner div owns the organic CSS drift
// animation (also a transform) — putting both on the same element
// would have one silently overwrite the other every frame. On
// low-power/touch devices both motions are switched off.
export default function AmbientBackground({ lowPower = false }) {
  const { scrollY } = useScroll()
  const yFar = useTransform(scrollY, (v) => (lowPower ? 0 : v * 0.12))
  const yMid = useTransform(scrollY, (v) => (lowPower ? 0 : v * -0.08))
  const yNear = useTransform(scrollY, (v) => (lowPower ? 0 : v * 0.05))

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {/* Base is a deep vertical gradient (never a flat single black),
          so even where no glow overlaps, the backdrop still reads as
          rich navy-black instead of a plain #000 wall. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #060911 0%, #0a1424 22%, #071019 48%, #0a1626 74%, #05080d 100%)',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.85]"
        style={{
          background:
            'radial-gradient(ellipse 85% 65% at 12% 0%, rgba(20,125,255,0.28), transparent 60%),' +
            'radial-gradient(ellipse 70% 60% at 100% 22%, rgba(0,191,255,0.22), transparent 55%),' +
            'radial-gradient(ellipse 75% 65% at 8% 100%, rgba(85,214,255,0.16), transparent 58%),' +
            'radial-gradient(ellipse 60% 55% at 90% 92%, rgba(20,125,255,0.2), transparent 58%),' +
            'radial-gradient(ellipse 55% 45% at 50% 45%, rgba(20,125,255,0.08), transparent 65%)',
        }}
      />

      <motion.div style={{ y: yFar }} className="absolute -left-1/4 top-[4%] h-[70vmax] w-[70vmax]">
        <div
          className={`h-full w-full rounded-full ${lowPower ? '' : 'ambient-drift'}`}
          style={{ background: 'radial-gradient(circle, rgba(20,125,255,0.22) 0%, rgba(20,125,255,0) 70%)' }}
        />
      </motion.div>

      <motion.div style={{ y: yMid }} className="absolute -right-1/4 top-[40%] h-[66vmax] w-[66vmax]">
        <div
          className={`h-full w-full rounded-full ${lowPower ? '' : 'ambient-drift-alt'}`}
          style={{ background: 'radial-gradient(circle, rgba(0,191,255,0.18) 0%, rgba(0,191,255,0) 70%)' }}
        />
      </motion.div>

      <motion.div style={{ y: yNear }} className="absolute bottom-[-15%] left-[15%] h-[58vmax] w-[58vmax]">
        <div
          className="h-full w-full rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(85,214,255,0.14) 0%, rgba(85,214,255,0) 70%)' }}
        />
      </motion.div>

      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(180,210,255,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(180,210,255,0.7) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 85% 85% at 50% 35%, black 0%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 35%, black 0%, transparent 78%)',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 90% at 50% 40%, transparent 65%, rgba(2,4,8,0.35) 100%)',
        }}
      />

      <div className="noise-layer absolute inset-0" />
    </div>
  )
}
