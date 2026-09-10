import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaWhatsapp, FaRegEnvelope } from 'react-icons/fa'
import RevealText from '../../components/RevealText'
import MagneticButton from '../../components/MagneticButton'
import { CONTACT } from '../../data/content'

export default function Contact() {
  const [form, setForm] = useState({ name: '', company: '', contact: '', message: '' })

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const text = [
      `Hola, soy ${form.name || 'un visitante'}${form.company ? ` de ${form.company}` : ''}.`,
      `Contacto: ${form.contact || 'no indicado'}`,
      '',
      form.message || 'Quiero contarte sobre un proyecto.',
    ].join('\n')
    const url = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section
      id="contacto"
      className="relative overflow-hidden px-5 py-20 sm:px-6 sm:py-28 md:px-10 md:py-44"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(24,224,96,0.1), transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <RevealText
          as="h2"
          text="¿Tienes una idea?"
          className="text-balance font-display text-giant font-extrabold leading-tight text-white"
        />
        <RevealText
          as="p"
          text="Construyámosla."
          className="mt-1 font-display text-giant font-extrabold leading-tight text-gradient sm:mt-2"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.06 }}
          className="mx-auto mt-5 max-w-md font-sans text-[15px] text-white/55 sm:mt-6 sm:text-base"
        >
          Cuéntanos qué quieres mejorar, automatizar o desarrollar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mt-7 flex flex-col items-stretch justify-center gap-3 xs:flex-row xs:flex-wrap xs:items-center xs:gap-4 sm:mt-8"
        >
          <a
            href={`https://wa.me/${CONTACT.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 font-sans text-sm text-white/70 transition-colors hover:border-white/25 hover:text-white focus-ring xs:py-2.5"
          >
            <FaWhatsapp /> WhatsApp
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex min-w-0 items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 font-sans text-sm text-white/70 transition-colors hover:border-white/25 hover:text-white focus-ring xs:py-2.5"
          >
            <FaRegEnvelope className="shrink-0" />
            <span className="truncate">{CONTACT.email}</span>
          </a>
        </motion.div>
      </div>

      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto mt-12 flex max-w-2xl flex-col gap-5 sm:mt-16 sm:gap-6 md:mt-20"
      >
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          <label className="flex flex-col gap-2">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-white/40">Nombre</span>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              required
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 font-sans text-white outline-none transition-colors focus:border-accent-light/60"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-white/40">Empresa</span>
            <input
              name="company"
              value={form.company}
              onChange={onChange}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 font-sans text-white outline-none transition-colors focus:border-accent-light/60"
            />
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-white/40">
            Email / WhatsApp
          </span>
          <input
            name="contact"
            value={form.contact}
            onChange={onChange}
            required
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 font-sans text-white outline-none transition-colors focus:border-accent-light/60"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-white/40">
            ¿Qué quieres resolver?
          </span>
          <textarea
            name="message"
            value={form.message}
            onChange={onChange}
            rows={5}
            placeholder="Ejemplo: actualmente manejamos nuestro inventario con Excel y queremos tener mayor control..."
            className="resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 font-sans text-white outline-none transition-colors placeholder:text-white/30 focus:border-accent-light/60"
          />
        </label>

        <MagneticButton
          as="button"
          type="submit"
          className="group mt-2 inline-flex w-full items-center justify-center gap-2 self-stretch rounded-full px-8 py-4 font-sans text-sm font-semibold text-base-950 shadow-[0_0_24px_rgba(77,255,0,0.16)] transition-transform active:scale-[0.99] focus-ring xs:w-fit xs:self-center"
          style={{ background: 'linear-gradient(90deg, #D7FF2F 0%, #4DFF00 50%, #00B93E 100%)' }}
        >
          Enviar proyecto
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </MagneticButton>
      </motion.form>
    </section>
  )
}
