import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BpBox } from '../../shared/bp-box'
import { Reveal } from '../../shared/reveal/Reveal'
import { WordReveal } from '../../shared/reveal/WordReveal'
import { useInView } from '../../../hooks/useInView'

const BP_GRID = {
  backgroundImage:
    'linear-gradient(rgba(227,235,212,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(227,235,212,.04) 1px,transparent 1px)',
  backgroundSize: '48px 48px',
}

interface ServiceItem {
  code:  string
  title: string
  sub:   string
  desc:  string
  specs: string[]
}

const CleanServiceCard = ({ s, idx }: { s: ServiceItem; idx: number }) => {
  const [ref, seen] = useInView()
  const [hov, setHov] = useState(false)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity .9s ${idx * 160}ms var(--ease), transform .9s ${idx * 160}ms var(--ease)`,
      }}
    >
      <BpBox style={{ padding: 0, color: 'var(--white)', overflow: 'hidden' }}>

        {/* ── Visual header ── */}
        <div
          style={{
            position: 'relative',
            height: 'clamp(140px,18vw,200px)',
            background: `repeating-linear-gradient(${idx === 0 ? '45deg' : '-45deg'},rgba(227,235,212,.05) 0 1px,transparent 1px 14px),linear-gradient(135deg,rgba(227,235,212,.08),rgba(227,235,212,.02))`,
            borderBottom: '1px dashed rgba(227,235,212,.18)',
            overflow: 'hidden',
          }}
        >
          {idx === 0 ? (
            /* Laser — concentric rings + crosshair + pulsing dot */
            <svg
              viewBox="0 0 400 200"
              preserveAspectRatio="xMidYMid slice"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            >
              <g style={{ transformOrigin: '200px 100px', animation: 'rotateSlow 30s linear infinite' }}>
                {[30, 60, 90, 120, 150].map((r, i) => (
                  <circle
                    key={i}
                    cx="200" cy="100" r={r}
                    fill="none"
                    stroke="rgba(227,235,212,.18)"
                    strokeWidth=".8"
                    strokeDasharray={`${4 + i} ${3 + i}`}
                  />
                ))}
              </g>
              <line x1="0"   y1="100" x2="400" y2="100" stroke="rgba(227,235,212,.18)" strokeWidth=".6" strokeDasharray="2 6" />
              <line x1="200" y1="0"   x2="200" y2="200" stroke="rgba(227,235,212,.18)" strokeWidth=".6" strokeDasharray="2 6" />
              <circle
                cx="200" cy="100" r="4"
                fill="var(--sage)"
                opacity={hov ? 0.9 : 0.55}
                style={{ transition: 'opacity .3s', animation: 'pulseDot 1.6s ease-in-out infinite' }}
              />
            </svg>
          ) : (
            /* Sandblast — scatter dots + curved dashed paths */
            <svg
              viewBox="0 0 400 200"
              preserveAspectRatio="xMidYMid slice"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            >
              {Array.from({ length: 60 }).map((_, i) => {
                const x = (i * 37) % 400
                const y = (i * 71) % 200
                const r = (i % 4) + 0.6
                return (
                  <circle
                    key={i}
                    cx={x} cy={y} r={r}
                    fill="rgba(227,235,212,.22)"
                    opacity={(i % 5) * 0.15 + 0.25}
                  />
                )
              })}
              <path d="M -10 60 Q 100 30 200 80 T 410 110"  stroke="rgba(227,235,212,.25)" strokeWidth="1"  strokeDasharray="6 4" fill="none" />
              <path d="M -10 130 Q 120 100 220 140 T 410 160" stroke="rgba(227,235,212,.18)" strokeWidth=".8" strokeDasharray="4 5" fill="none" />
            </svg>
          )}

          {/* Overlay labels */}
          <div style={{ position: 'absolute', top: 14, left: 14, fontSize: 10, fontWeight: 400, letterSpacing: 3, color: 'var(--sage)', opacity: 0.6 }}>
            {s.code} / {idx === 0 ? 'LASER' : 'ABRASIVE'}
          </div>
          <div style={{ position: 'absolute', bottom: 14, right: 14, fontSize: 10, fontWeight: 300, letterSpacing: 2, opacity: 0.3, textTransform: 'uppercase' }}>
            {idx === 0 ? 'Nd:YAG · CO₂' : 'Korund · Szkło · Soda'}
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ padding: 'clamp(2rem,4vw,3rem)' }}>
          <h3 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '.5rem' }}>
            {s.title}
          </h3>
          <div style={{ fontSize: 13, fontWeight: 300, opacity: 0.4, letterSpacing: 2, textTransform: 'uppercase', marginBottom: '2rem' }}>
            {s.sub}
          </div>
          <p style={{ fontSize: 'clamp(14px,1.3vw,17px)', fontWeight: 300, lineHeight: 1.8, opacity: 0.6, marginBottom: '2rem' }}>
            {s.desc}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            {s.specs.map((sp, j) => (
              <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '.75rem', fontSize: 13, fontWeight: 300, opacity: 0.6 }}>
                <div style={{ width: 16, height: 0, borderTop: '1px dashed rgba(227,235,212,.5)', flexShrink: 0 }} />
                {sp}
              </div>
            ))}
          </div>
        </div>

      </BpBox>
    </div>
  )
}

export const Services = () => {
  const { t } = useTranslation('cleaning')
  const items = t('services.items', { returnObjects: true }) as ServiceItem[]

  return (
    <section
      id="uslugi"
      style={{ padding: 'clamp(5rem,9vw,8rem) clamp(1.5rem,5vw,5rem)', background: 'var(--bp)', color: 'var(--white)', ...BP_GRID }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        <Reveal kind="up">
          <div className="stag" style={{ marginBottom: '1rem', color: 'var(--sage)', opacity: 0.5 }}>
            {t('services.label')}
          </div>
        </Reveal>

        <h2 style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 500, textTransform: 'uppercase', marginBottom: '3.5rem' }}>
          <WordReveal text={t('services.heading')} />
        </h2>

        <div className="csvc" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {items.map((s, i) => (
            <CleanServiceCard key={i} s={s} idx={i} />
          ))}
        </div>

      </div>

      <style>{`@media (max-width: 768px) { .csvc { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
