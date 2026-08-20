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
    <section className="relative overflow-hidden px-6 py-28 md:px-10 md:py-36">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="ambient-drift absolute left-[6%] top-[8%] h-72 w-72 rounded-full bg-accent-blue/15 blur-[100px]" />
        <div className="ambient-drift-alt absolute right-[8%] top-[45%] h-80 w-80 rounded-full bg-accent-cyan/10 blur-[110px]" />
        <div className="ambient-drift absolute bottom-[4%] left-[30%] h-64 w-64 rounded-full bg-accent-light/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col gap-14 text-center md:gap-20">
        {PHRASES.map((parts, i) => (
          <RevealText
            key={i}
            as="p"
            parts={parts}
            className="text-balance font-display text-giant font-bold leading-tight text-white"
          />
        ))}
      </div>

      <div className="relative">
        <Quiz />
      </div>
    </section>
  )
}
