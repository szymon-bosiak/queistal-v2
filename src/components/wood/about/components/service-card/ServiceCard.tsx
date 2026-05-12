import { useState } from 'react'
import { useInView } from '../../../../../hooks/useInView'

interface ServiceCardProps {
  icon: string
  label: string
  idx?: number
}

export const ServiceCard = ({ icon, label, idx = 0 }: ServiceCardProps) => {
  const [hov, setHov] = useState(false)
  const [ref, seen] = useInView()

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'clamp(8rem, 11vw, 11rem)',
        width: 'clamp(8rem, 11vw, 11rem)',
        border: '1px solid var(--ink)',
        background: hov ? 'var(--ink)' : 'var(--sage)',
        color: hov ? 'var(--white)' : 'var(--ink)',
        transition: `background .25s var(--ease), color .25s var(--ease), transform .8s ${idx * 100}ms var(--ease), opacity .8s ${idx * 100}ms var(--ease)`,
        transform: hov ? 'scale(1.08) rotate(4deg)' : (seen ? 'scale(1) rotate(0)' : 'scale(.85) rotate(-6deg)'),
        opacity: seen ? 1 : 0,
        cursor: 'default',
        flexShrink: 0,
      }}
    >
      <img
        src={icon}
        alt=""
        style={{
          height: 'clamp(4rem, 5.5vw, 5.5rem)',
          filter: hov ? 'brightness(0) invert(1)' : 'none',
          transition: 'filter .25s',
        }}
      />
      <p style={{ fontWeight: 400, textAlign: 'center', margin: '0 .8rem .2rem', fontSize: 'clamp(11px, 1vw, 13px)' }}>
        {label}
      </p>
    </div>
  )
}
