import { useState } from 'react'
import { useInView } from '../../../hooks/useInView'

interface GalleryTileProps {
  src: string
  alt: string
  idx?: number
  onClick: () => void
  variant?: 'construction' | 'restoration'
}

const VARIANTS = {
  construction: {
    bg: '#111',
    labelColor: 'var(--white)',
    borderColor: 'rgba(255,255,255,.10)',
    bracketColor: 'var(--white)',
    gradientColor: 'rgba(10,13,18,.75)',
    brightnessFilter: false,
  },
  restoration: {
    bg: 'rgba(0,0,0,.4)',
    labelColor: 'var(--sage)',
    borderColor: 'rgba(227,235,212,.14)',
    bracketColor: 'var(--sage)',
    gradientColor: 'rgba(22,26,20,.82)',
    brightnessFilter: true,
  },
}

export const GalleryTile = ({
  src,
  alt,
  idx = 0,
  onClick,
  variant = 'construction',
}: GalleryTileProps) => {
  const [hov, setHov] = useState(false)
  const [ref, seen] = useInView({ threshold: 0.1 })
  const v = VARIANTS[variant]
  const delay = Math.min(idx * 25, 80)

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
        background: v.bg,
        opacity: seen ? 1 : 0,
        transform: seen ? 'translateY(0) scale(1)' : 'translateY(28px) scale(.96)',
        transition: `opacity .5s ${delay}ms var(--ease), transform .5s ${delay}ms var(--ease)`,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          filter: v.brightnessFilter
            ? hov ? 'brightness(1)' : 'brightness(.72) saturate(.85)'
            : undefined,
          transform: hov ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform .6s var(--ease), filter .4s var(--ease)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to top, ${v.gradientColor} 0%, transparent 55%)`,
          opacity: hov ? 1 : 0,
          transition: 'opacity .3s',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 6,
          border: `1px dashed ${v.borderColor}`,
          pointerEvents: 'none',
          opacity: hov ? 1 : 0,
          transition: 'opacity .3s',
        }}
      />
      <span
        style={{
          position: 'absolute',
          bottom: 14,
          left: 16,
          color: v.labelColor,
          fontSize: 11,
          fontWeight: 400,
          letterSpacing: 2,
          textTransform: 'uppercase',
          fontFamily: 'monospace',
          opacity: hov ? 1 : 0,
          transform: hov ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity .25s, transform .25s var(--ease)',
        }}
      >
        {alt}
      </span>
      <svg
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          width: 14,
          height: 14,
          opacity: hov ? 0.4 : 0,
          transition: 'opacity .3s',
          pointerEvents: 'none',
        }}
        viewBox="0 0 14 14"
      >
        <path
          d="M14 0 L14 14 L0 14"
          fill="none"
          stroke={v.bracketColor}
          strokeWidth=".8"
        />
      </svg>
    </div>
  )
}
