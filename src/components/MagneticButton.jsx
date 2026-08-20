import { useEffect, useRef } from 'react'
import { gsap } from '../config/gsap'

export default function MagneticButton({
  as: Tag = 'button',
  className = '',
  children,
  strength = 0.35,
  ...props
}) {
  const ref = useRef(null)
  const hoverCapable = useRef(true)

  useEffect(() => {
    const query = window.matchMedia('(hover: none)')
    hoverCapable.current = !query.matches
    const handler = (e) => (hoverCapable.current = !e.matches)
    query.addEventListener('change', handler)
    return () => query.removeEventListener('change', handler)
  }, [])

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el || !hoverCapable.current) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.28,
      ease: 'power3.out',
    })
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (!el) return
    gsap.to(el, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, 0.4)' })
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  )
}
