import { useState } from 'react'
import { useInView } from '../../../../../hooks/useInView'

interface AdvCardProps {
  n: string
  title: string
  body: string
  idx?: number
}

export const AdvCard = ({ n, title, body, idx = 0 }: AdvCardProps) => {
  const [hov, setHov] = useState(false)
  const [ref, seen] = useInView()

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '3rem 2.5rem',
        background: hov ? 'rgba(40,37,34,.95)' : 'rgba(227,235,212,.4)',
        color: hov ? 'var(--white)' : 'var(--ink)',
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
        transition: 'background .3s var(--ease), color .3s var(--ease), transform .8s var(--ease), opacity .8s var(--ease)',
        opacity: seen ? 1 : 0,
        transform: seen ? 'translateY(0)' : 'translateY(28px)',
        transitionDelay: `${idx * 120}ms`,
      }}
    >
      <div
        style={{
          fontSize: 'clamp(44px,5vw,72px)',
          fontWeight: 200,
          lineHeight: 1,
          opacity: hov ? 1 : 0.18,
          transition: 'opacity .3s',
          marginBottom: '1.5rem',
        }}
      >
        {n}
      </div>
      <h3 style={{ fontSize: 'clamp(18px,2vw,24px)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '1rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: 'clamp(14px,1.3vw,17px)', fontWeight: 300, lineHeight: 1.8, opacity: hov ? 0.85 : 0.7 }}>
        {body}
      </p>
    </div>
  )
}
