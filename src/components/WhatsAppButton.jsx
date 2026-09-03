import { FaWhatsapp } from 'react-icons/fa'
import { CONTACT } from '../data/content'

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${CONTACT.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablemos por WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-0 overflow-hidden rounded-full border border-white/10 bg-base-900/95 py-3.5 pl-3.5 pr-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 ease-premium hover:pr-5 focus-ring md:bottom-8 md:right-8"
    >
      <FaWhatsapp className="h-5 w-5 shrink-0 text-accent-light" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-sans text-sm text-white opacity-0 transition-all duration-300 ease-premium group-hover:ml-2 group-hover:max-w-[160px] group-hover:opacity-100">
        Hablemos por WhatsApp
      </span>
    </a>
  )
}
