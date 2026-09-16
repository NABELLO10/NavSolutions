import { motion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'
import RevealText from '../../components/RevealText'
import SectionAnchor from '../../components/SectionAnchor'
import MagneticButton from '../../components/MagneticButton'
import { SERVICE_TRACKS } from '../../data/content'

const EASE = [0.16, 1, 0.3, 1]

function TrackCard({ track, index }) {
  const { featured } = track

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.42, delay: index * 0.07, ease: EASE }}
      whileTap={{ scale: 0.99 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border p-6 transition-colors duration-300 sm:p-7 ${
        featured
          ? 'border-accent-light/35 bg-accent-blue/[0.055] shadow-[0_0_60px_rgba(77,255,0,0.07)]'
          : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.045]'
      }`}
    >
      {/* Soft corner light, same language as the Results / Transformation
          cards so this section doesn't read as a bolted-on block. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full transition-opacity duration-300 ${
          featured ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
        style={{ background: 'radial-gradient(circle, rgba(77,255,0,0.13) 0%, rgba(77,255,0,0) 68%)' }}
      />

      <div className="relative flex items-center justify-between gap-3">
        <span
          className={`font-sans text-[10px] font-bold uppercase tracking-[0.22em] ${
            featured ? 'text-accent-light' : 'text-white/35'
          }`}
        >
          {track.kicker}
        </span>
        {featured && (
          <span className="shrink-0 rounded-full border border-accent-light/40 bg-accent-blue/10 px-2.5 py-1 font-sans text-[10px] font-semibold text-accent-light">
            Recomendado
          </span>
        )}
      </div>

      <h3 className="relative mt-4 font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">
        {track.title}
      </h3>

      <p className="relative mt-2 font-display text-base font-semibold text-accent-light/85 sm:text-lg">
        {track.lead}
      </p>

      <p className="relative mt-4 font-sans text-[15px] leading-relaxed text-white/55">
        {track.text}
      </p>

      <ul className="relative mt-6 mb-7 flex flex-col gap-2.5 sm:mb-8">
        {track.points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 font-sans text-sm text-white/70">
            <FiCheck
              className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? 'text-accent-light' : 'text-accent-light/60'}`}
              aria-hidden="true"
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      {/* mt-auto pins this to the bottom so the three cards line their
          closing line up even when the copy above runs different lengths.
          Never add a responsive margin-top here — it cancels the auto. */}
      <p className="relative mt-auto border-t border-white/10 pt-5 font-sans text-[13px] leading-relaxed text-white/40">
        {track.forWho}
      </p>
    </motion.article>
  )
}

export default function Services() {
  return (
    <section className="relative py-20 sm:py-28 md:py-36">
      <div className="container-page">
        <SectionAnchor id="servicios" />

        <div className="max-w-3xl">
          <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-accent-light/70 sm:text-xs sm:tracking-[0.32em]">
            Cómo trabajamos contigo
          </span>
          <RevealText
            as="h2"
            text="Una página, un sistema, o las dos cosas."
            className="mt-4 text-balance font-display text-giant font-extrabold leading-tight text-white sm:mt-5"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.38, delay: 0.06, ease: EASE }}
            className="mt-5 font-sans text-base leading-relaxed text-white/58 sm:text-lg"
          >
            No todos los proyectos empiezan en el mismo punto. Algunos necesitan mostrarse, otros
            necesitan ordenarse por dentro, y muchos necesitan las dos cosas a la vez.
          </motion.p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-3">
          {SERVICE_TRACKS.map((track, i) => (
            <TrackCard key={track.id} track={track} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.38, ease: EASE }}
          className="mt-10 flex flex-col items-center gap-4 text-center sm:mt-14"
        >
          <p className="max-w-xl font-sans text-[15px] leading-relaxed text-white/45">
            ¿No sabes cuál te corresponde? Cuéntanos qué quieres resolver y te decimos con qué
            conviene partir.
          </p>
          <MagneticButton
            as="a"
            href="#contacto"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 font-sans text-sm font-semibold text-base-950 transition-transform active:scale-[0.98] focus-ring xs:w-auto"
            style={{ background: 'linear-gradient(90deg, #D7FF2F 0%, #4DFF00 54%, #00B93E 100%)' }}
          >
            Conversemos tu caso
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
