'use client'

import React, { useEffect, useRef } from 'react'

interface ParticleProps {
  rgb?: string
  backgroundColor?: string
  width?: number
  height?: number
}

interface Particle {
  x: number
  y: number
  z: number
  velX: number
  velY: number
  velZ: number
  age: number
  dead: boolean
  right: boolean
  attack: number
  hold: number
  decay: number
  initValue: number
  holdValue: number
  lastValue: number
  stuckTime: number
  accelX: number
  accelY: number
  accelZ: number
  alpha: number
  projX: number
  projY: number
  next: Particle | null
  prev: Particle | null
}

interface ParticleList {
  first: Particle | null
}

const ParticleSphere: React.FC<ParticleProps> = ({
  rgb = '255, 255, 255',
  backgroundColor = 'rgba(0, 0, 0, 1)',
  width = 400,
  height = 400
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    // Configuration variables
    const displayWidth = width
    const displayHeight = height
    const fLen = 256 // Distance from viewer to z=0
    const projCenterX = displayWidth / 2
    const projCenterY = displayHeight / 2
    const zMax = fLen - 2
    const particleRad = 2.5
    const sphereRad = 256
    const sphereCenterY = 0
    const sphereCenterZ = -3 - sphereRad
    const zeroAlphaDepth = -750
    const turnSpeed = (2 * Math.PI) / 1600

    let turnAngle = 0
    const wait = 1
    let count = wait - 1
    const numToAddEachFrame = 4
    const particleAlpha = 1
    const rgbString = `rgba(${rgb}, `

    // Random acceleration factors
    const randAccelX = 0.1
    const randAccelY = 0.1
    const randAccelZ = 0.1
    const gravity = 0

    const particleList: ParticleList = { first: null }
    const recycleBin: ParticleList = { first: null }

    const addParticle = (
      x0: number,
      y0: number,
      z0: number,
      vx0: number,
      vy0: number,
      vz0: number
    ): Particle => {
      let newParticle: Particle

      if (recycleBin.first !== null) {
        newParticle = recycleBin.first
        if (newParticle.next !== null) {
          recycleBin.first = newParticle.next
          newParticle.next.prev = null
        } else {
          recycleBin.first = null
        }
      } else {
        newParticle = {
          x: 0,
          y: 0,
          z: 0,
          velX: 0,
          velY: 0,
          velZ: 0,
          age: 0,
          dead: false,
          right: false,
          attack: 0,
          hold: 0,
          decay: 0,
          initValue: 0,
          holdValue: 0,
          lastValue: 0,
          stuckTime: 0,
          accelX: 0,
          accelY: 0,
          accelZ: 0,
          alpha: 0,
          projX: 0,
          projY: 0,
          next: null,
          prev: null
        }
      }

      if (particleList.first === null) {
        particleList.first = newParticle
        newParticle.prev = null
        newParticle.next = null
      } else {
        newParticle.next = particleList.first
        particleList.first.prev = newParticle
        particleList.first = newParticle
        newParticle.prev = null
      }

      newParticle.x = x0
      newParticle.y = y0
      newParticle.z = z0
      newParticle.velX = vx0
      newParticle.velY = vy0
      newParticle.velZ = vz0
      newParticle.age = 0
      newParticle.dead = false
      newParticle.right = Math.random() < 0.5

      return newParticle
    }

    const recycle = (p: Particle): void => {
      if (particleList.first === p) {
        if (p.next !== null) {
          p.next.prev = null
          particleList.first = p.next
        } else {
          particleList.first = null
        }
      } else {
        if (p.next === null) {
          if (p.prev) p.prev.next = null
        } else {
          if (p.prev) {
            p.prev.next = p.next
            p.next.prev = p.prev
          }
        }
      }

      if (recycleBin.first === null) {
        recycleBin.first = p
        p.prev = null
        p.next = null
      } else {
        p.next = recycleBin.first
        recycleBin.first.prev = p
        recycleBin.first = p
        p.prev = null
      }
    }

    const animate = () => {
      count++
      if (count >= wait) {
        count = 0
        for (let i = 0; i < numToAddEachFrame; i++) {
          const theta = Math.random() * 2 * Math.PI
          const phi = Math.acos(Math.random() * 2 - 1)
          const x0 = sphereRad * Math.sin(phi) * Math.cos(theta)
          const y0 = sphereRad * Math.sin(phi) * Math.sin(theta)
          const z0 = sphereRad * Math.cos(phi)

          const p = addParticle(
            x0,
            sphereCenterY + y0,
            sphereCenterZ + z0,
            0.002 * x0,
            0.002 * y0,
            0.002 * z0
          )

          p.attack = 50
          p.hold = 50
          p.decay = 160
          p.initValue = 0
          p.holdValue = particleAlpha
          p.lastValue = 0
          p.stuckTime = 80 + Math.random() * 20
          p.accelX = 0
          p.accelY = gravity
          p.accelZ = 0
        }
      }

      turnAngle = (turnAngle + turnSpeed) % (2 * Math.PI)
      const sinAngle = Math.sin(turnAngle)
      const cosAngle = Math.cos(turnAngle)

      context.fillStyle = backgroundColor
      context.fillRect(0, 0, displayWidth, displayHeight)

      let p = particleList.first
      while (p !== null) {
        const nextParticle = p.next
        p.age++

        if (p.age > p.stuckTime) {
          p.velX += p.accelX + randAccelX * (Math.random() * 2 - 1)
          p.velY += p.accelY + randAccelY * (Math.random() * 2 - 1)
          p.velZ += p.accelZ + randAccelZ * (Math.random() * 2 - 1)

          p.x += p.velX
          p.y += p.velY
          p.z += p.velZ
        }

        const rotX = cosAngle * p.x + sinAngle * (p.z - sphereCenterZ)
        const rotZ =
          -sinAngle * p.x + cosAngle * (p.z - sphereCenterZ) + sphereCenterZ
        const m = fLen / (fLen - rotZ)
        p.projX = rotX * m + projCenterX
        p.projY = p.y * m + projCenterY

        if (p.age < p.attack + p.hold + p.decay) {
          if (p.age < p.attack) {
            p.alpha =
              ((p.holdValue - p.initValue) / p.attack) * p.age + p.initValue
          } else if (p.age < p.attack + p.hold) {
            p.alpha = p.holdValue
          } else if (p.age < p.attack + p.hold + p.decay) {
            p.alpha =
              ((p.lastValue - p.holdValue) / p.decay) *
                (p.age - p.attack - p.hold) +
              p.holdValue
          }
        } else {
          p.dead = true
        }

        const outsideTest =
          p.projX > displayWidth ||
          p.projX < 0 ||
          p.projY < 0 ||
          p.projY > displayHeight ||
          rotZ > zMax

        if (outsideTest || p.dead) {
          recycle(p)
        } else {
          let depthAlphaFactor = 1 - rotZ / zeroAlphaDepth
          depthAlphaFactor = Math.max(0, Math.min(1, depthAlphaFactor))

          context.fillStyle = `${rgbString}${depthAlphaFactor * p.alpha})`
          context.beginPath()
          context.arc(p.projX, p.projY, m * particleRad, 0, 2 * Math.PI, false)
          context.closePath()
          context.fill()
        }

        p = nextParticle
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [rgb, backgroundColor, width, height])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ display: 'block' }}
    />
  )
}

export default ParticleSphere
