import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, setupGsap } from '../config/gsap'

// Splits text into words, each masked inside overflow-hidden spans,
// and reveals them with a staggered blur + translate on scroll.
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
  const segments = parts
    ? parts.flatMap((part) =>
        part.text.split(' ').map((word) => ({ word, className: part.className || '' }))
      )
    : text.split(' ').map((word) => ({ word, className: '' }))

  useLayoutEffect(() => {
    setupGsap()
    const el = containerRef.current
    if (!el) return undefined

    const targets = el.querySelectorAll('.reveal-word-inner')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { yPercent: 110, opacity: 0, filter: 'blur(8px)' },
        {
          yPercent: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.4,
          ease: 'power3.out',
          stagger,
          scrollTrigger: {
            trigger: el,
            start,
            once,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [stagger, start, once])

  return (
    <Tag ref={containerRef} className={className}>
      {segments.map((seg, i) => (
        <span
          key={i}
          className={`inline-block overflow-hidden pb-[0.1em] align-bottom ${
            i < segments.length - 1 ? 'mr-[0.28em]' : ''
          } ${wordClassName}`}
        >
          <span className={`reveal-word-inner inline-block will-change-transform ${seg.className}`}>
            {seg.word}
            {i < segments.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </Tag>
  )
}
