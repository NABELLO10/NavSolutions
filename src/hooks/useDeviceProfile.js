import { useEffect, useState } from 'react'

function detect() {
  if (typeof window === 'undefined') {
    return { isTouch: false, isLowPower: false }
  }
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches
  const cores = navigator.hardwareConcurrency || 4
  const memory = navigator.deviceMemory || 4
  const isLowPower = isTouch || cores <= 4 || memory <= 4
  return { isTouch, isLowPower }
}

// Detects touch input and rough device capability so heavy effects
// (WebGL orb, particle fields, mouse parallax) can be skipped on
// phones and low-end hardware instead of just hidden with CSS.
export function useDeviceProfile() {
  const [profile, setProfile] = useState(detect)

  useEffect(() => {
    setProfile(detect())
    const onResize = () => setProfile(detect())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return profile
}
