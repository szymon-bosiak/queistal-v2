import { useState } from 'react'
import { useInView } from '../../../../../hooks/useInView'

interface GalleryTileProps {
  src: string
  alt: string
  idx?: number
  onClick: () => void
}

export const GalleryTile = ({ src, alt, idx = 0, onClick }: GalleryTileProps) => {
  const [hov, setHov] = useState(false)
  const [ref, seen] = useInView({ threshold: 0.1 })

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        background: 'rgba(0,0,0,.4)',
        marginBottom: 5,
        opacity: seen ? 1 : 0,
        transform: seen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(.98)',
        transition: `opacity .6s ${idx * 60}ms var(--ease), transform .6s ${idx * 60}ms var(--ease)`,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          filter: hov ? 'brightness(1)' : 'brightness(.72) saturate(.85)',
          transform: hov ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform .7s var(--ease), filter .5s var(--ease)',
        }}
      />
      {/* gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(22,26,20,.82) 0%, transparent 55%)',
          opacity: hov ? 1 : 0,
          transition: 'opacity .3s',
          pointerEvents: 'none',
        }}
      />
      {/* dashed border */}
      <div
        style={{
          position: 'absolute',
          inset: 6,
          border: '1px dashed rgba(227,235,212,.14)',
          pointerEvents: 'none',
          opacity: hov ? 1 : 0,
          transition: 'opacity .3s',
        }}
      />
      {/* label */}
      <span
        style={{
          position: 'absolute',
          bottom: 14,
          left: 16,
          color: 'var(--sage)',
          fontSize: 11,
          fontWeight: 400,
          letterSpacing: 2,
          textTransform: 'uppercase',
          fontFamily: 'monospace',
          opacity: hov ? 1 : 0,
          transform: hov ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity .25s, transform .25s var(--ease)',
        }}
      >
        {alt}
      </span>
      {/* corner bracket */}
      <svg
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          width: 14,
          height: 14,
          opacity: hov ? .45 : 0,
          transition: 'opacity .3s',
          pointerEvents: 'none',
        }}
        viewBox="0 0 14 14"
      >
        <path d="M14 0 L14 14 L0 14" fill="none" stroke="var(--sage)" strokeWidth=".8" />
      </svg>
    </div>
  )
}
