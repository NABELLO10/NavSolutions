import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { CONTACT } from '../data/content'

export default function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${CONTACT.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablemos por WhatsApp"
      initial={{ opacity: 0, scale: 0.7, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.42, delay: 1, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.92 }}
      className="group fixed z-40 flex items-center gap-0 overflow-hidden rounded-full border border-white/10 bg-base-900/95 p-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur transition-[padding] duration-300 ease-premium hover:pr-5 focus-ring"
      style={{
        right: 'calc(1rem + var(--safe-r))',
        bottom: 'calc(1rem + var(--safe-b))',
      }}
    >
      <FaWhatsapp className="h-5 w-5 shrink-0 text-accent-light" />
      <span className="hover-reveal max-w-0 overflow-hidden whitespace-nowrap font-sans text-sm text-white opacity-0 transition-all duration-300 ease-premium group-hover:ml-2 group-hover:max-w-[160px] group-hover:opacity-100">
        Hablemos por WhatsApp
      </span>
    </motion.a>
  )
}
