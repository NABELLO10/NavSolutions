import { useEffect, useRef, useState } from 'react'

// Splits text into words, each masked inside overflow-hidden spans,
// and reveals them with a staggered translate on scroll.
export default function RevealText({
  text,
  parts,
  as: Tag = 'div',
  className = '',
  wordClassName = '',
  start = 'top 90%',
  stagger = 0.025,
  once = true,
}) {
  const containerRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const segments = parts
    ? parts.flatMap((part) =>
        part.text.split(' ').map((word) => ({ word, className: part.className || '' }))
      )
    : text.split(' ').map((word) => ({ word, className: '' }))

  useEffect(() => {
    const el = containerRef.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
          return
        }

        if (!once) setVisible(false)
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once, start])

  return (
    <Tag ref={containerRef} className={className}>
      {segments.map((seg, i) => (
        <span
          key={i}
          className={`inline-block overflow-hidden pb-[0.1em] align-bottom ${
            i < segments.length - 1 ? 'mr-[0.28em]' : ''
          } ${wordClassName}`}
        >
          <span
            className={`inline-block will-change-transform ${seg.className}`}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 110%, 0)',
              transition: 'opacity 420ms cubic-bezier(0.16, 1, 0.3, 1), transform 420ms cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: `${i * stagger}s`,
            }}
          >
            {seg.word}
            {i < segments.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </Tag>
  )
}
