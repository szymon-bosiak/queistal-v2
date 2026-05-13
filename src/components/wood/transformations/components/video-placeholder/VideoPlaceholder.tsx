import { useState } from 'react'
import { useInView } from '../../../../../hooks/useInView'

interface VideoPlaceholderProps {
  label: string
  idx?: number
}

export const VideoPlaceholder = ({ label, idx = 0 }: VideoPlaceholderProps) => {
  const [hov, setHov] = useState(false)
  const [ref, seen] = useInView()

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border: '1px dashed rgba(255,255,255,.14)',
        position: 'relative',
        opacity: seen ? 1 : 0,
        transform: seen ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity .8s ${idx * 150}ms var(--ease), transform .8s ${idx * 150}ms var(--ease)`,
      }}
    >
      <div style={{ paddingTop: '56.25%', background: 'rgba(227,235,212,.03)', position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          {/* Play button */}
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              border: '1px dashed rgba(227,235,212,.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: hov ? 'scale(1.15)' : 'scale(1)',
              transition: 'transform .3s var(--ease)',
              animation: 'pulseRing 2.4s ease-out infinite',
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderTop: '9px solid transparent',
                borderBottom: '9px solid transparent',
                borderLeft: '15px solid rgba(227,235,212,.5)',
                marginLeft: 4,
              }}
            />
          </div>

          <span
            style={{
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: 2,
              opacity: 0.35,
              textTransform: 'uppercase',
              textAlign: 'center',
              padding: '0 1rem',
            }}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  )
}
