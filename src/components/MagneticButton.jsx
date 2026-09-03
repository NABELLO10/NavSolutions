import { useEffect, useRef } from 'react'

export default function MagneticButton({
  as: Tag = 'button',
  className = '',
  children,
  strength = 0.35,
  ...props
}) {
  const ref = useRef(null)
  const hoverCapable = useRef(true)
  const frame = useRef(0)

  useEffect(() => {
    const query = window.matchMedia('(hover: none)')
    hoverCapable.current = !query.matches
    const handler = (e) => (hoverCapable.current = !e.matches)
    query.addEventListener('change', handler)
    return () => {
      cancelAnimationFrame(frame.current)
      query.removeEventListener('change', handler)
    }
  }, [])

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el || !hoverCapable.current) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      el.style.transition = 'transform 280ms cubic-bezier(0.16, 1, 0.3, 1)'
      el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`
    })
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(frame.current)
    el.style.transition = 'transform 360ms cubic-bezier(0.16, 1, 0.3, 1)'
    el.style.transform = 'translate3d(0, 0, 0)'
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
