import { useState } from 'react'
import { useInView } from '../../../../../hooks/useInView'

interface ProjectTileProps {
  src: string
  alt: string
  area: string
  idx?: number
  onClick: () => void
}

export const ProjectTile = ({ src, alt, area, idx = 0, onClick }: ProjectTileProps) => {
  const [hov, setHov] = useState(false)
  const [ref, seen] = useInView({ threshold: 0.1 })

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        gridArea: area,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#111',
        opacity: seen ? 1 : 0,
        transform: seen ? 'translateY(0) scale(1)' : 'translateY(30px) scale(.96)',
        transition: `opacity .7s ${idx * 60}ms var(--ease), transform .7s ${idx * 60}ms var(--ease)`,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: hov ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform .7s var(--ease)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(40,37,34,.75) 0%, transparent 55%)',
          opacity: hov ? 1 : 0,
          transition: 'opacity .3s',
        }}
      />
      <span
        style={{
          position: 'absolute',
          bottom: 14,
          left: 16,
          color: 'var(--white)',
          fontSize: 13,
          fontWeight: 400,
          letterSpacing: 1,
          textTransform: 'uppercase',
          opacity: hov ? 1 : 0,
          transform: hov ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity .3s, transform .3s var(--ease)',
        }}
      >
        {alt}
      </span>
    </div>
  )
}
