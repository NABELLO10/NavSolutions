import { useEffect, useState } from 'react'

// Three tiers instead of a single on/off switch. The old binary
// `isLowPower` marked every touch device as "low" and killed *all*
// motion on phones — the hero canvas rendered a single static frame and
// the ambient glows stopped drifting, so mobile visitors saw a flat
// page. Most phones can comfortably run compositor-friendly work
// (transform-only CSS drift, a throttled 2D canvas); what they can't
// afford is pointer-tracked physics and WebGL.
//
//  high   → desktop-class: everything, including pointer interaction
//  medium → phones/tablets: looping ambient motion, no pointer physics
//  low    → genuinely weak hardware: static, decorative motion off
function detect() {
  if (typeof window === 'undefined') {
    return { isTouch: false, isLowPower: false, tier: 'high' }
  }

  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches
  const cores = navigator.hardwareConcurrency || 4
  const memory = navigator.deviceMemory || 4
  const saveData = navigator.connection?.saveData === true

  const weak = saveData || cores <= 4 || memory <= 2

  let tier = 'high'
  if (weak) tier = 'low'
  else if (isTouch) tier = 'medium'

  return { isTouch, isLowPower: tier !== 'high', tier }
}

// Detects touch input and rough device capability so heavy effects
// (WebGL orb, pointer-tracked particle physics) can be skipped on
// phones and low-end hardware while lightweight motion still runs.
export function useDeviceProfile() {
  const [profile, setProfile] = useState(detect)

  useEffect(() => {
    setProfile(detect())

    let frame = 0
    const onResize = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        setProfile((prev) => {
          const next = detect()
          return next.tier === prev.tier && next.isTouch === prev.isTouch ? prev : next
        })
      })
    }

    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return profile
}
