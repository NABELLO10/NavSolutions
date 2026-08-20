import { useState } from 'react'
import { motion } from 'framer-motion'
import { PROJECTS } from '../../data/content'
import RevealText from '../../components/RevealText'
import MockScreen from '../Systems/MockScreen'
import ProjectModal from './ProjectModal'

const SCREEN_MAP = {
  ops: 'kanban',
  works: 'progress',
  inventory: 'inventario',
  bookings: 'calendar',
  enterprise: 'enterprise',
}

export default function Projects() {
  const [active, setActive] = useState(null)

  return (
    <section id="proyectos" className="relative px-6 py-28 md:px-10 md:py-36">
      <RevealText
        as="h2"
        text="Algunas cosas que podemos construir."
        className="max-w-3xl font-display text-big font-bold text-white"
      />

      <div className="mt-14 flex flex-col gap-16 md:gap-20">
        {PROJECTS.map((project, i) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: i * 0.035, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setActive(project)}
            className="group w-full cursor-pointer"
          >
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="order-2 md:order-1">
                <span className="font-sans text-sm text-accent-light/70">
                  Proyecto {project.id}
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold text-white md:text-3xl">
                  {project.title}
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1 font-sans text-xs text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-medium text-white/70 transition-colors group-hover:text-accent-light">
                  Ver proyecto
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </div>
              <div className="order-1 transition-transform duration-300 ease-premium group-hover:scale-[1.02] md:order-2">
                <MockScreen id={SCREEN_MAP[project.screen]} title={project.title} />
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  )
}
