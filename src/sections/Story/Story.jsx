import RevealText from '../../components/RevealText'
import Quiz from './Quiz'

const PHRASES = [
  [
    { text: 'No desarrollamos', className: '' },
    { text: 'software', className: 'text-accent-light' },
    { text: 'por desarrollar', className: '' },
    { text: 'software.', className: 'text-accent-light' },
  ],
  [
    { text: 'Primero entendemos', className: '' },
    { text: 'el problema.', className: 'text-gradient' },
  ],
  [
    { text: 'Luego construimos', className: '' },
    { text: 'la solución.', className: 'text-gradient' },
  ],
]

export default function Story() {
  return (
    <section className="relative overflow-hidden px-5 py-20 sm:px-6 sm:py-28 md:px-10 md:py-36">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="ambient-drift absolute left-[6%] top-[8%] h-72 w-72 rounded-full opacity-70"
          style={{ background: 'radial-gradient(circle, rgba(24,224,96,0.12) 0%, rgba(24,224,96,0) 70%)' }}
        />
        <div
          className="ambient-drift-alt absolute right-[8%] top-[45%] h-80 w-80 rounded-full opacity-70"
          style={{ background: 'radial-gradient(circle, rgba(15,184,79,0.1) 0%, rgba(15,184,79,0) 70%)' }}
        />
        <div
          className="ambient-drift absolute bottom-[4%] left-[30%] h-64 w-64 rounded-full opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(141,255,69,0.08) 0%, rgba(141,255,69,0) 70%)' }}
        />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col gap-10 text-center sm:gap-14 md:gap-20">
        {PHRASES.map((parts, i) => (
          <RevealText
            key={i}
            as="p"
            parts={parts}
            className="text-balance font-display text-giant font-bold leading-[1.15] text-white"
          />
        ))}
      </div>

      <div className="relative">
        <Quiz />
      </div>
    </section>
  )
}
