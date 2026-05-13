import { useRef } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'

const DURATION = 0.42
const EASE     = [0.4, 0, 0.2, 1] as const

interface SliderProps {
  before:      string
  after:       string
  labelBefore: string
  labelAfter:  string
  label?:      string
}

export const Slider = ({ before, after, labelBefore, labelAfter, label }: SliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const animRef      = useRef<ReturnType<typeof animate> | null>(null)

  const pos      = useMotionValue(50)
  const clipPath = useTransform(pos, p => `inset(0 ${100 - p}% 0 0)`)
  const left     = useTransform(pos, p => `${p}%`)

  const getPos = (clientX: number) => {
    const r = containerRef.current!.getBoundingClientRect()
    return Math.min(98, Math.max(2, ((clientX - r.left) / r.width) * 100))
  }

  const onMouseEnter = (e: React.MouseEvent) => {
    animRef.current?.stop()
    pos.set(getPos(e.clientX))
  }

  const onMouseMove = (e: React.MouseEvent) => {
    pos.set(getPos(e.clientX))
  }

  const onMouseLeave = () => {
    animRef.current?.stop()
    animRef.current = animate(pos, 50, { duration: DURATION, ease: EASE })
  }

  const onTouchMove = (e: React.TouchEvent) => {
    animRef.current?.stop()
    pos.set(getPos(e.touches[0].clientX))
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onTouchMove={onTouchMove}
      style={{ position: 'relative', overflow: 'hidden', cursor: 'col-resize', userSelect: 'none', height: 320, background: '#111' }}
    >
      {/* After — full background */}
      <img
        src={after}
        alt="Po"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {/* Before — clipped via Framer Motion */}
      <motion.img
        src={before}
        alt="Przed"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover',
          clipPath,
        }}
      />

      {/* Divider line */}
      <motion.div
        style={{
          position: 'absolute', top: 0, bottom: 0,
          left, width: 2,
          background: 'var(--sage)',
          x: '-50%',
        }}
      >
        <div
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--sage)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'pulseRing 2s ease-out infinite',
          }}
        >
          <span style={{ color: 'var(--ink)', fontSize: 14, fontWeight: 400, letterSpacing: -1 }}>◀▶</span>
        </div>
      </motion.div>

      {/* Labels */}
      <div style={{ position: 'absolute', bottom: 12, left: 12, fontSize: 11, fontWeight: 400, letterSpacing: 2, color: 'var(--white)', background: 'rgba(0,0,0,.5)', padding: '4px 10px' }}>
        {labelBefore}
      </div>
      <div style={{ position: 'absolute', bottom: 12, right: 12, fontSize: 11, fontWeight: 400, letterSpacing: 2, color: 'var(--ink)', background: 'rgba(227,235,212,.85)', padding: '4px 10px' }}>
        {labelAfter}
      </div>
      {label && (
        <div style={{ position: 'absolute', top: 12, left: 12, fontSize: 12, fontWeight: 400, letterSpacing: 2, color: 'var(--white)', opacity: 0.7 }}>
          {label}
        </div>
      )}
    </div>
  )
}
