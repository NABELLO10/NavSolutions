import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'

function Orb() {
  const meshRef = useRef(null)
  const groupRef = useRef(null)
  const materialRef = useRef(null)
  const lightRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const scale = useRef(1)
  const distort = useRef(0.32)
  const emissive = useRef(0.18)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = t * (hovered ? 0.25 : 0.08)
      meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.15
    }
    if (groupRef.current) {
      const targetRotY = state.pointer.x * 0.35
      const targetRotX = -state.pointer.y * 0.22
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.04
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.04
    }

    const targetScale = hovered ? 1.14 : 1
    scale.current += (targetScale - scale.current) * 0.08
    if (meshRef.current) meshRef.current.scale.setScalar(scale.current)

    const targetDistort = hovered ? 0.6 : 0.32
    distort.current += (targetDistort - distort.current) * 0.08
    if (materialRef.current) materialRef.current.distort = distort.current

    const targetEmissive = hovered ? 0.45 : 0.18
    emissive.current += (targetEmissive - emissive.current) * 0.08
    if (materialRef.current) materialRef.current.emissiveIntensity = emissive.current

    if (lightRef.current) {
      lightRef.current.position.x = state.pointer.x * 3
      lightRef.current.position.y = -state.pointer.y * 3
    }
  })

  return (
    <group ref={groupRef}>
      <pointLight ref={lightRef} position={[2, 2, 3]} intensity={hovered ? 55 : 25} color="#55d6ff" />
      <Sphere
        ref={meshRef}
        args={[1, 64, 64]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          ref={materialRef}
          color="#0a2a52"
          emissive="#147dff"
          emissiveIntensity={0.18}
          roughness={0.35}
          metalness={0.5}
          transparent
          opacity={0.85}
          distort={0.32}
          speed={hovered ? 2.4 : 1.2}
        />
      </Sphere>
    </group>
  )
}

export default function HeroOrb() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6.5], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={40} color="#55d6ff" />
      <pointLight position={[-4, -2, -2]} intensity={20} color="#147dff" />
      <Suspense fallback={null}>
        <Orb />
      </Suspense>
    </Canvas>
  )
}
