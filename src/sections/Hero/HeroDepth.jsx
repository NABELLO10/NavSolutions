import { useEffect, useRef } from 'react'

// A perspective "flight" through a field of light: particles stream out
// of a vanishing point on the horizon toward the viewer, over a grid
// floor that scrolls in the same perspective. Everything is O(n) per
// frame (no pairwise link pass like the old network canvas), so it runs
// on every device class — only the density changes with `tier`.
//
// `interactive` = the vanishing point follows the pointer (desktop).
// Without it the camera sways on its own, so phones still get parallax.
// `animated`    = false only for prefers-reduced-motion: one still frame.

const TIERS = {
  high: { particles: 160, dpr: 1.5 },
  medium: { particles: 120, dpr: 1.5 },
  low: { particles: 70, dpr: 1.25 },
}

const COLORS = [
  [77, 255, 0],
  [77, 255, 0],
  [24, 224, 96],
  [215, 255, 47],
  [200, 255, 220],
]

const NEAR = 0.035
const SPEED = 0.07 // depth units per second: ~14s from horizon to viewer

export default function HeroDepth({ interactive = false, animated = true, tier = 'medium' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    const ctx = canvas?.getContext('2d')
    if (!canvas || !host || !ctx) return undefined

    const settings = TIERS[tier] || TIERS.medium
    let width = 0
    let height = 0
    let focal = 0
    let horizon = 0
    let baseX = 0
    let frame = 0
    let visible = true
    let last = 0
    let floorOffset = 0
    let particles = []
    let floorFade = null
    let horizonGlow = null
    let glowRadius = 0

    const cam = { x: 0, y: 0, tx: 0, ty: 0 }

    const spawn = (p, fresh) => {
      // Spread wide in x, keep a band around the horizon in y so the
      // stream reads as a tunnel of light, not uniform snow.
      p.x = (Math.random() - 0.5) * 3.2
      p.y = (Math.random() - 0.62) * 1.7
      p.z = fresh ? NEAR + Math.random() * (1 - NEAR) : 1
      p.pz = p.z
      p.c = COLORS[(Math.random() * COLORS.length) | 0]
      p.s = Math.random() < 0.1 ? 1.9 : 0.7 + Math.random() * 0.7
      p.v = 0.75 + Math.random() * 0.6
      return p
    }

    const resize = () => {
      const rect = host.getBoundingClientRect()
      const w = Math.max(1, Math.round(rect.width))
      const h = Math.max(1, Math.round(rect.height))
      if (w === width && h === height) return
      width = w
      height = h

      const dpr = Math.min(window.devicePixelRatio || 1, settings.dpr)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const mobile = w < 768
      focal = Math.min(w, h) * (mobile ? 0.55 : 0.42)
      horizon = h * (mobile ? 0.6 : 0.56)
      // Desktop copy sits on the left, so the vanishing point goes right.
      baseX = w * (mobile ? 0.5 : 0.66)

      const count = mobile ? Math.round(settings.particles * 0.7) : settings.particles
      particles = Array.from({ length: count }, () => spawn({}, true))

      floorFade = ctx.createLinearGradient(0, horizon, 0, h)
      floorFade.addColorStop(0, 'rgba(24,224,96,0)')
      floorFade.addColorStop(0.35, 'rgba(24,224,96,0.12)')
      floorFade.addColorStop(1, 'rgba(77,255,0,0.26)')

      glowRadius = Math.max(w, h) * 0.55
      horizonGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, glowRadius)
      horizonGlow.addColorStop(0, 'rgba(141,255,69,0.2)')
      horizonGlow.addColorStop(0.25, 'rgba(24,224,96,0.08)')
      horizonGlow.addColorStop(1, 'rgba(24,224,96,0)')
    }

    const onPointer = (event) => {
      const rect = host.getBoundingClientRect()
      if (event.clientY > rect.bottom) return
      cam.tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      cam.ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    }

    const drawFloor = (vx, vy) => {
      const depth = height - vy
      if (depth <= 0) return
      ctx.lineWidth = 1
      ctx.strokeStyle = floorFade

      // Rails converging on the vanishing point.
      ctx.beginPath()
      const rails = 13
      for (let i = -rails; i <= rails; i += 1) {
        ctx.moveTo(vx, vy)
        ctx.lineTo(vx + i * width * 0.16, height + 40)
      }
      ctx.stroke()

      // Cross lines at evenly spaced world depths, scrolling toward us.
      const rows = 14
      for (let i = 0; i < rows; i += 1) {
        const t = (i + floorOffset) / rows // 0 = horizon, 1 = at the camera
        const y = vy + depth * t * t * t
        const alpha = t * t * 0.34
        ctx.strokeStyle = `rgba(77,255,0,${alpha})`
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
    }

    const render = (time = 0) => {
      const dt = animated ? Math.min((time - last) / 1000 || 0, 0.05) : 0
      last = time

      if (!interactive && animated) {
        // Slow Lissajous sway stands in for the pointer on touch devices.
        cam.tx = Math.sin(time * 0.00021) * 0.55
        cam.ty = Math.sin(time * 0.00013 + 1.3) * 0.3
      }
      cam.x += (cam.tx - cam.x) * (animated ? 0.04 : 1)
      cam.y += (cam.ty - cam.y) * (animated ? 0.04 : 1)

      const vx = baseX - cam.x * width * 0.06
      const vy = horizon - cam.y * height * 0.04

      ctx.clearRect(0, 0, width, height)

      // Horizon glow, breathing slowly.
      ctx.save()
      ctx.translate(vx, vy)
      ctx.scale(1.6, 0.55)
      ctx.globalAlpha = 0.8 + Math.sin(time * 0.0009) * 0.2
      ctx.fillStyle = horizonGlow
      ctx.fillRect(-glowRadius, -glowRadius, glowRadius * 2, glowRadius * 2)
      ctx.restore()

      floorOffset = (floorOffset + dt * 0.35) % 1
      drawFloor(vx, vy)

      // Horizon line.
      const line = ctx.createLinearGradient(0, 0, width, 0)
      line.addColorStop(0, 'rgba(215,255,47,0)')
      line.addColorStop(vx / width, 'rgba(215,255,47,0.55)')
      line.addColorStop(1, 'rgba(215,255,47,0)')
      ctx.fillStyle = line
      ctx.fillRect(0, vy - 0.5, width, 1)

      ctx.lineCap = 'round'
      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i]
        p.pz = p.z
        p.z -= dt * SPEED * p.v
        if (p.z <= NEAR) {
          spawn(p, false)
          continue
        }

        // Parallax: near particles shift further than far ones.
        const px = p.x - cam.x * 0.25
        const py = p.y - cam.y * 0.15
        const sx = vx + (px / p.z) * focal
        const sy = vy + (py / p.z) * focal
        if (sx < -60 || sx > width + 60 || sy < -60 || sy > height + 60) {
          spawn(p, false)
          continue
        }

        const near = 1 - p.z
        const fadeIn = Math.min(1, (1 - p.z) * 6)
        // Capped so the closest streaks don't fight the headline.
        const alpha = Math.min(0.7, near * near * 1.1 + 0.08) * fadeIn
        const size = p.s * (0.35 + near * near * 2.4)
        const [r, g, b] = p.c

        // Streak from where the particle was a moment ago: gives the
        // sense of speed that sells the depth. With round caps the head of
        // the stroke doubles as the particle itself — one path per particle.
        const tz = Math.min(1, p.z + 0.035 * p.v)
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`
        ctx.lineWidth = size * 1.4
        ctx.beginPath()
        ctx.moveTo(vx + (px / tz) * focal, vy + (py / tz) * focal)
        ctx.lineTo(sx, sy)
        ctx.stroke()
      }

      if (visible && animated) frame = requestAnimationFrame(render)
    }

    const start = () => {
      cancelAnimationFrame(frame)
      if (visible && animated && !document.hidden) {
        last = performance.now()
        frame = requestAnimationFrame(render)
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (!animated) render(0)
    })
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      start()
    })
    const onVisibility = () => (document.hidden ? cancelAnimationFrame(frame) : start())

    resizeObserver.observe(host)
    visibilityObserver.observe(host)
    document.addEventListener('visibilitychange', onVisibility)
    if (interactive) window.addEventListener('pointermove', onPointer, { passive: true })

    resize()
    render(0)
    start()

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [interactive, animated, tier])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 80%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 80%, transparent 100%)',
      }}
      aria-hidden="true"
    />
  )
}
