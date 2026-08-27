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
    <footer className="relative border-t border-white/10 px-6 py-14 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <BrandLogo size="footer" />
          <p className="mt-3 max-w-xs font-sans text-sm text-white/45">
            Transformamos problemas
            <br />
            en soluciones digitales.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-sm text-white/50 transition-colors hover:text-white focus-ring"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center gap-2 font-sans text-sm text-white/50 transition-colors hover:text-white focus-ring"
          >
            <FaLinkedin /> LinkedIn
          </a>
        </nav>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl items-center justify-between border-t border-white/5 pt-6">
        <span className="font-sans text-xs text-white/30">© {year} NavSolutions</span>
        <span className="font-sans text-xs text-white/20">Diseñado y construido a medida.</span>
      </div>
    </footer>
  )
}
