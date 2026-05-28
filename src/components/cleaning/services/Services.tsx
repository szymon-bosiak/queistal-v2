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

type Method = 'laser' | 'sand' | 'soda' | 'glass'

interface ServiceItem {
  code:    string
  method:  Method
  title:   string
  sub:     string
  media:   string
  price:   string
  desc:    string
  bestFor: string
  specs:   string[]
}

const LaserVisual = ({ hov }: { hov: boolean }) => (
  <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
    <g style={{ transformOrigin: '200px 100px', animation: 'rotateSlow 30s linear infinite' }}>
      {[30, 60, 90, 120, 150].map((r, i) => (
        <circle key={i} cx="200" cy="100" r={r} fill="none" stroke="rgba(227,235,212,.18)" strokeWidth=".8" strokeDasharray={`${4 + i} ${3 + i}`} />
      ))}
    </g>
    <line x1="0"   y1="100" x2="400" y2="100" stroke="rgba(227,235,212,.18)" strokeWidth=".6" strokeDasharray="2 6" />
    <line x1="200" y1="0"   x2="200" y2="200" stroke="rgba(227,235,212,.18)" strokeWidth=".6" strokeDasharray="2 6" />
    <circle cx="200" cy="100" r="4" fill="var(--sage)" opacity={hov ? 0.9 : 0.55} style={{ transition: 'opacity .3s', animation: 'pulseDot 1.6s ease-in-out infinite' }} />
  </svg>
)

const Nozzle = () => (
  <g style={{ transformOrigin: '-10px 100px', animation: 'nozzlePulse 1.2s ease-in-out infinite' }}>
    <path d="M -10 80 L 60 96 L 60 104 L -10 120 Z" fill="rgba(227,235,212,.08)" />
    <path d="M -10 70 L 80 96 L 80 104 L -10 130 Z" fill="rgba(227,235,212,.05)" />
  </g>
)

const SandVisual = () => (
  <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
    <Nozzle />
    {Array.from({ length: 70 }).map((_, i) => {
      const x = (i * 37) % 400
      const y = (i * 71) % 200
      const s = (i % 4) + 1.2
      const dur = (1.2 + (i % 7) * 0.25).toFixed(2)
      const delay = (-((i * 0.17) % 4)).toFixed(2)
      const rot = (i * 23) % 360
      return (
        <rect
          key={i}
          x={x} y={y} width={s} height={s}
          fill="rgba(227,235,212,.34)"
          transform={`rotate(${rot} ${x + s / 2} ${y + s / 2})`}
          style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: `gritFly ${dur}s linear ${delay}s infinite` }}
        />
      )
    })}
    <path d="M -10 60 Q 100 30 200 80 T 410 110"  stroke="rgba(227,235,212,.32)" strokeWidth="1"  strokeDasharray="6 4" fill="none" style={{ animation: 'streamFlow 1.4s linear infinite' }} />
    <path d="M -10 130 Q 120 100 220 140 T 410 160" stroke="rgba(227,235,212,.22)" strokeWidth=".8" strokeDasharray="4 5" fill="none" style={{ animation: 'streamFlow 2s linear infinite reverse' }} />
  </svg>
)

const SodaVisual = () => (
  <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
    <Nozzle />
    {Array.from({ length: 40 }).map((_, i) => {
      const x = (i * 41 + 5) % 400
      const y = (i * 83 + 11) % 200
      const r = (i % 5) * 0.8 + 1.6
      const dur = (2.4 + (i % 7) * 0.4).toFixed(2)
      const delay = (-((i * 0.19) % 5)).toFixed(2)
      return (
        <circle
          key={i}
          cx={x} cy={y} r={r}
          fill="rgba(240,245,228,.32)"
          style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: `gritFly ${dur}s ease-out ${delay}s infinite` }}
        />
      )
    })}
    {[20, 36, 54].map((r, i) => (
      <circle key={i} cx="320" cy="100" r={r} fill="none" stroke="rgba(240,245,228,.18)" strokeWidth=".6" strokeDasharray="3 5"
        style={{ animation: `pulseRing ${2 + i * 0.4}s ease-out ${i * 0.3}s infinite`, transformOrigin: '320px 100px' }} />
    ))}
  </svg>
)

const GlassVisual = () => (
  <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
    <defs>
      <radialGradient id="bead" cx="35%" cy="35%" r="65%">
        <stop offset="0%"  stopColor="rgba(255,255,255,.85)" />
        <stop offset="40%" stopColor="rgba(227,235,212,.55)" />
        <stop offset="100%" stopColor="rgba(227,235,212,.05)" />
      </radialGradient>
    </defs>
    <Nozzle />
    {Array.from({ length: 50 }).map((_, i) => {
      const x = (i * 37 + 7) % 400
      const y = (i * 71 + 13) % 200
      const r = (i % 4) * 0.8 + 1.4
      const dur = (1.6 + (i % 7) * 0.3).toFixed(2)
      const delay = (-((i * 0.17) % 4)).toFixed(2)
      return (
        <circle
          key={i}
          cx={x} cy={y} r={r}
          fill="url(#bead)"
          style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: `gritFly ${dur}s linear ${delay}s infinite` }}
        />
      )
    })}
    <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(227,235,212,.22)" strokeWidth=".5" strokeDasharray="14 8"
      style={{ animation: 'streamFlow 3s linear infinite' }} />
  </svg>
)

const MethodVisual = ({ method, hov }: { method: Method; hov: boolean }) => {
  if (method === 'laser') return <LaserVisual hov={hov} />
  if (method === 'sand')  return <SandVisual />
  if (method === 'soda')  return <SodaVisual />
  return <GlassVisual />
}

const METHOD_LABEL: Record<Method, string> = {
  laser: 'LASER',
  sand:  'ABRASIVE · KORUND',
  soda:  'ABRASIVE · SODA',
  glass: 'ABRASIVE · SZKŁO',
}

const HEADER_BG: Record<Method, string> = {
  laser: 'repeating-linear-gradient(45deg,rgba(227,235,212,.05) 0 1px,transparent 1px 14px),linear-gradient(135deg,rgba(227,235,212,.08),rgba(227,235,212,.02))',
  sand:  'repeating-linear-gradient(-45deg,rgba(227,235,212,.06) 0 1px,transparent 1px 14px),linear-gradient(135deg,rgba(227,235,212,.09),rgba(227,235,212,.02))',
  soda:  'repeating-linear-gradient(0deg,rgba(240,245,228,.04) 0 1px,transparent 1px 18px),linear-gradient(135deg,rgba(240,245,228,.06),rgba(227,235,212,.02))',
  glass: 'repeating-linear-gradient(90deg,rgba(227,235,212,.05) 0 1px,transparent 1px 16px),linear-gradient(135deg,rgba(227,235,212,.1),rgba(227,235,212,.02))',
}

interface CardProps {
  s:               ServiceItem
  idx:             number
  priceLabel:      string
  priceUnit:       string
  priceDisclaimer: string
  bestForLabel:    string
}

const CleanServiceCard = ({ s, idx, priceLabel, priceUnit, priceDisclaimer, bestForLabel }: CardProps) => {
  const [ref, seen] = useInView()
  const [hov, setHov] = useState(false)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        height: '100%',
        opacity: seen ? 1 : 0,
        transform: seen ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity .9s ${idx * 120}ms var(--ease), transform .9s ${idx * 120}ms var(--ease)`,
      }}
    >
      <BpBox style={{ padding: 0, color: 'var(--white)', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>

        {/* ── Visual header ── */}
        <div
          style={{
            position: 'relative',
            height: 'clamp(140px,18vw,200px)',
            background: HEADER_BG[s.method],
            borderBottom: '1px dashed rgba(227,235,212,.18)',
            overflow: 'hidden',
          }}
        >
          <MethodVisual method={s.method} hov={hov} />

          <div style={{ position: 'absolute', top: 14, left: 14, fontSize: 10, fontWeight: 400, letterSpacing: 3, color: 'var(--sage)', opacity: 0.6 }}>
            {s.code} / {METHOD_LABEL[s.method]}
          </div>
          <div style={{ position: 'absolute', bottom: 14, right: 14, fontSize: 10, fontWeight: 300, letterSpacing: 2, opacity: 0.35, textTransform: 'uppercase' }}>
            {s.media}
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ padding: 'clamp(2rem,4vw,3rem)' }}>
          <h3 style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '.5rem' }}>
            {s.title}
          </h3>
          <div style={{ fontSize: 13, fontWeight: 300, opacity: 0.4, letterSpacing: 2, textTransform: 'uppercase', marginBottom: '1.75rem' }}>
            {s.sub}
          </div>
          <p style={{ fontSize: 'clamp(14px,1.3vw,17px)', fontWeight: 300, lineHeight: 1.8, opacity: 0.6, marginBottom: '2rem' }}>
            {s.desc}
          </p>

          {/* ── Best-for chip ── */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: 10, fontWeight: 400, letterSpacing: 3, opacity: 0.4, color: 'var(--sage)', marginBottom: '.5rem' }}>
              {bestForLabel}
            </div>
            <div style={{ fontSize: 13, fontWeight: 400, opacity: 0.85, letterSpacing: 0.5 }}>
              {s.bestFor}
            </div>
          </div>

          {/* ── Price estimation ── */}
          <div style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            gap: '1rem', padding: '1.25rem 0 1.5rem', marginBottom: '1.5rem',
            borderTop: '1px dashed rgba(227,235,212,.18)', borderBottom: '1px dashed rgba(227,235,212,.18)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.35rem' }}>
              <span style={{ fontSize: 10, fontWeight: 400, letterSpacing: 3, opacity: 0.4, color: 'var(--sage)' }}>
                {priceLabel}
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '.5rem' }}>
                <span style={{ fontSize: 11, fontWeight: 300, opacity: 0.45, letterSpacing: 1, textTransform: 'uppercase' }}>
                  {s.price.split(' ')[0]}
                </span>
                <span style={{ fontSize: 'clamp(34px,4.5vw,52px)', fontWeight: 400, lineHeight: 1, color: 'var(--sage)', letterSpacing: -1 }}>
                  {s.price.split(' ')[1]}
                </span>
                <span style={{ fontSize: 'clamp(15px,1.5vw,18px)', fontWeight: 300, opacity: 0.7, letterSpacing: 0.5 }}>
                  {priceUnit}
                </span>
              </div>
            </div>
            <div style={{ fontSize: 10, fontWeight: 300, letterSpacing: 2, opacity: 0.32, textTransform: 'uppercase', textAlign: 'right', maxWidth: 140, lineHeight: 1.5 }}>
              {priceDisclaimer}
            </div>
          </div>

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

        <h2 style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 500, textTransform: 'uppercase', marginBottom: '1.25rem' }}>
          <WordReveal text={t('services.heading')} />
        </h2>

        <Reveal kind="up" delay={150}>
          <p style={{ fontSize: 'clamp(15px,1.4vw,18px)', fontWeight: 300, lineHeight: 1.75, opacity: 0.5, maxWidth: 720, marginBottom: '3.5rem' }}>
            {t('services.intro')}
          </p>
        </Reveal>

        <div className="csvc" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {items.map((s, i) => (
            <CleanServiceCard
              key={i} s={s} idx={i}
              priceLabel={t('services.priceLabel')}
              priceUnit={t('services.priceUnit')}
              priceDisclaimer={t('services.priceDisclaimer')}
              bestForLabel={t('services.bestForLabel')}
            />
          ))}
        </div>

      </div>

      <style>{`@media (max-width: 768px) { .csvc { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
