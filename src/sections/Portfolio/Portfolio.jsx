import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import RevealText from '../../components/RevealText'
import SectionAnchor from '../../components/SectionAnchor'
import { PORTFOLIO } from '../../data/content'

const EASE = [0.16, 1, 0.3, 1]

const hostOf = (url) => new URL(url).hostname.replace(/^www\./, '')

function WorkCard({ work, index }) {
  return (
    <motion.a
      href={work.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: (index % 2) * 0.08, ease: EASE }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-accent-light/30 hover:bg-white/[0.045] focus-ring"
    >
      {/* Browser frame around the screenshot. */}
      <div className="relative border-b border-white/10 bg-base-900/80">
        <div className="flex items-center gap-2 px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="ml-2 truncate rounded-full bg-white/[0.05] px-3 py-0.5 font-sans text-[11px] text-white/40">
            {hostOf(work.url)}
          </span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={`/portfolio/${work.id}.webp`}
            alt={`Sitio web de ${work.name}`}
            width={1200}
            height={750}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base-950/50 via-transparent to-transparent" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-accent-light/75">
              {work.kind}
            </span>
            <h3 className="mt-2 font-display text-xl font-extrabold leading-tight text-white sm:text-2xl">
              {work.name}
            </h3>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-300 group-hover:border-accent-light group-hover:bg-accent-light group-hover:text-base-950">
            <FiArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>

        <p className="mt-3 font-sans text-[15px] leading-relaxed text-white/55">{work.text}</p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-5">
          {work.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white/10 px-3 py-1 font-sans text-[11px] text-white/55"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <span className="sr-only">(abre en una pestaña nueva)</span>
    </motion.a>
  )
}

export default function Portfolio() {
  return (
    <section className="relative py-20 sm:py-28 md:py-36">
      <div className="container-page">
        <SectionAnchor id="portafolio" />

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_0.82fr] lg:items-end">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-accent-light/70 sm:text-xs sm:tracking-[0.32em]">
              Portafolio
            </span>
            <RevealText
              as="h2"
              text="Proyectos que ya están funcionando."
              className="mt-4 max-w-3xl text-balance font-display text-giant font-extrabold leading-tight text-white sm:mt-5"
            />
          </div>
          <p className="max-w-xl font-sans text-[15px] leading-relaxed text-white/50 sm:text-base lg:justify-self-end">
            Sitios y sistemas en producción, usados todos los días por empresas, centros de salud,
            comunidades e instituciones.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2">
          {PORTFOLIO.map((work, i) => (
            <WorkCard key={work.id} work={work} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
