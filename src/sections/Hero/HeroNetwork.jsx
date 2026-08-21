import { useEffect, useRef } from 'react'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export default function HeroNetwork({ interactive = true }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    const context = canvas?.getContext('2d')
    if (!canvas || !host || !context) return undefined

    let width = 0
    let height = 0
    let frame = 0
    let visible = true
    let nodes = []

    const pointer = {
      active: false,
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    }

    const createNodes = () => {
      const count = width < 640 ? 34 : clamp(Math.round(width / 22), 46, 82)
      nodes = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
        radius: index % 13 === 0 ? 2.3 : Math.random() * 1.15 + 0.55,
        star: index % 13 === 0,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const resize = () => {
      const rect = host.getBoundingClientRect()
      const nextWidth = Math.max(1, Math.round(rect.width))
      const nextHeight = Math.max(1, Math.round(rect.height))
      if (nextWidth === width && nextHeight === height) return

      width = nextWidth
      height = nextHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      pointer.x = width * 0.72
      pointer.y = height * 0.46
      pointer.targetX = pointer.x
      pointer.targetY = pointer.y
      createNodes()
    }

    const handlePointerMove = (event) => {
      const rect = host.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const isInside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height

      pointer.active = interactive && isInside
      if (pointer.active) {
        pointer.targetX = x
        pointer.targetY = y
      }
    }

    const handlePointerLeave = () => {
      pointer.active = false
      pointer.targetX = width * 0.72
      pointer.targetY = height * 0.46
    }

    const drawStar = (node, opacity) => {
      const size = node.radius * 2.7
      context.beginPath()
      context.moveTo(node.x, node.y - size)
      context.lineTo(node.x + size * 0.28, node.y - size * 0.28)
      context.lineTo(node.x + size, node.y)
      context.lineTo(node.x + size * 0.28, node.y + size * 0.28)
      context.lineTo(node.x, node.y + size)
      context.lineTo(node.x - size * 0.28, node.y + size * 0.28)
      context.lineTo(node.x - size, node.y)
      context.lineTo(node.x - size * 0.28, node.y - size * 0.28)
      context.closePath()
      context.fillStyle = `rgba(215, 244, 255, ${opacity})`
      context.fill()
    }

    const render = (time = 0) => {
      context.clearRect(0, 0, width, height)
      pointer.x += (pointer.targetX - pointer.x) * 0.075
      pointer.y += (pointer.targetY - pointer.y) * 0.075

      const connectionDistance = width < 640 ? 104 : 142
      const pointerDistance = width < 640 ? 150 : 220

      nodes.forEach((node) => {
        if (interactive) {
          node.x += node.vx
          node.y += node.vy

          if (pointer.active) {
            const dx = pointer.x - node.x
            const dy = pointer.y - node.y
            const distance = Math.hypot(dx, dy) || 1
            if (distance < pointerDistance) {
              const force = (1 - distance / pointerDistance) * 0.01
              node.vx = clamp(node.vx + (dx / distance) * force, -0.42, 0.42)
              node.vy = clamp(node.vy + (dy / distance) * force, -0.42, 0.42)
            }
          }

          node.vx *= 0.998
          node.vy *= 0.998
          if (node.x < -20) node.x = width + 20
          if (node.x > width + 20) node.x = -20
          if (node.y < -20) node.y = height + 20
          if (node.y > height + 20) node.y = -20
        }
      })

      for (let first = 0; first < nodes.length; first += 1) {
        for (let second = first + 1; second < nodes.length; second += 1) {
          const dx = nodes[first].x - nodes[second].x
          const dy = nodes[first].y - nodes[second].y
          const distance = Math.hypot(dx, dy)
          if (distance >= connectionDistance) continue

          const opacity = (1 - distance / connectionDistance) * 0.23
          context.beginPath()
          context.moveTo(nodes[first].x, nodes[first].y)
          context.lineTo(nodes[second].x, nodes[second].y)
          context.strokeStyle = `rgba(85, 214, 255, ${opacity})`
          context.lineWidth = 0.7
          context.stroke()
        }
      }

      if (pointer.active) {
        nodes.forEach((node) => {
          const distance = Math.hypot(pointer.x - node.x, pointer.y - node.y)
          if (distance >= pointerDistance) return

          const opacity = (1 - distance / pointerDistance) * 0.42
          context.beginPath()
          context.moveTo(pointer.x, pointer.y)
          context.lineTo(node.x, node.y)
          context.strokeStyle = `rgba(20, 125, 255, ${opacity})`
          context.lineWidth = 0.9
          context.stroke()
        })

        const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 130)
        glow.addColorStop(0, 'rgba(85, 214, 255, 0.09)')
        glow.addColorStop(1, 'rgba(20, 125, 255, 0)')
        context.fillStyle = glow
        context.fillRect(pointer.x - 130, pointer.y - 130, 260, 260)
      }

      nodes.forEach((node) => {
        const twinkle = 0.52 + Math.sin(time * 0.0012 + node.phase) * 0.18
        if (node.star) {
          drawStar(node, twinkle + 0.18)
          return
        }

        context.beginPath()
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        context.fillStyle = `rgba(185, 232, 255, ${twinkle})`
        context.fill()
      })

      if (pointer.active) {
        context.beginPath()
        context.arc(pointer.x, pointer.y, 3.2, 0, Math.PI * 2)
        context.fillStyle = 'rgba(85, 214, 255, 0.95)'
        context.fill()
      }

      if (visible && interactive) frame = requestAnimationFrame(render)
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (!interactive) render()
    })
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(frame)
      if (visible) frame = requestAnimationFrame(render)
    })

    resizeObserver.observe(host)
    visibilityObserver.observe(host)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerleave', handlePointerLeave)
    resize()
    render()

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [interactive])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
      style={{
        maskImage: 'linear-gradient(to bottom, black 0%, black 76%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 76%, transparent 100%)',
      }}
      aria-hidden="true"
    />
  )
}
