import { FaLinkedin } from 'react-icons/fa'
import BrandLogo from './BrandLogo'

const FOOTER_LINKS = [
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative border-t border-white/10 pt-12 sm:pt-14"
      // The floating WhatsApp / scroll pills sit in this corner, so the
      // footer reserves room for them (plus the home-indicator inset)
      // instead of letting them land on top of the copyright line.
      style={{ paddingBottom: 'calc(6.5rem + var(--safe-b))' }}
    >
      <div className="container-page flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-10">
        <div>
          <BrandLogo size="footer" />
          <p className="mt-3 max-w-xs font-sans text-sm text-white/45">
            Transformamos problemas
            <br />
            en soluciones digitales.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-1 sm:gap-x-8">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2.5 font-sans text-sm text-white/50 transition-colors hover:text-white focus-ring"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center gap-2 py-2.5 font-sans text-sm text-white/50 transition-colors hover:text-white focus-ring"
          >
            <FaLinkedin /> LinkedIn
          </a>
        </nav>
      </div>

      <div className="container-page mt-10 sm:mt-14">
        <div className="flex flex-col gap-2 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <span className="font-sans text-xs text-white/30">© {year} NavSolutions</span>
            <span className="font-sans text-xs text-white/20">Diseñado y construido a medida.</span>
        </div>
      </div>
    </footer>
  )
}
