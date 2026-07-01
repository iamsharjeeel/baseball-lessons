'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 260

function ParticleField() {
  const groupRef = useRef<THREE.Group>(null)

  const geometry = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [])

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: '#faf8f4',
        size: 0.05,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
      }),
    [],
  )

  useEffect(() => () => {
    geometry.dispose()
    material.dispose()
  }, [geometry, material])

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return
    group.rotation.y += delta * 0.015
    group.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.15
  })

  return (
    <group ref={groupRef}>
      <points geometry={geometry} material={material} />
    </group>
  )
}

type HeroSceneProps = {
  /** Fires once the WebGL context has actually been created, used to gate the canvas fade-in. */
  onReady?: () => void
}

/**
 * Decorative ambient particle field, hero only. Dynamically imported with
 * `ssr: false` from Hero.tsx, which already feature-detects WebGL +
 * `prefers-reduced-motion` before this module is even requested. This
 * component additionally pauses its own render loop when the hero scrolls
 * out of the viewport, since every frame here is a cost on an ads landing
 * page, not a showcase piece.
 */
export function HeroScene({ onReady }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={inView ? 'always' : 'never'}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
        camera={{ position: [0, 0, 6], fov: 45 }}
        onCreated={() => onReady?.()}
      >
        <ParticleField />
      </Canvas>
    </div>
  )
}
