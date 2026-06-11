import { useTranslation } from 'react-i18next'
import { Reveal } from '../../shared/reveal/Reveal'
import { WordReveal } from '../../shared/reveal/WordReveal'
import { useInView } from '../../../hooks/useInView'

interface AdvItem { n: string; title: string; text: string; tag: string }

/* SVG image column — different artwork per row */
const RowSvg = ({ idx }: { idx: number }) => (
  <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.5 }}>
    <defs>
      <pattern id={`grit-${idx}`} width="12" height="12" patternUnits="userSpaceOnUse" patternTransform={`rotate(${idx * 22})`}>
        <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(227,235,212,.18)" strokeWidth=".6" />
      </pattern>
    </defs>
    <rect width="200" height="120" fill={`url(#grit-${idx})`} />
    {idx === 0 && (
      <g>
        <circle cx="100" cy="60" r="34" fill="none" stroke="rgba(227,235,212,.3)"  strokeWidth=".7" strokeDasharray="3 4" />
        <circle cx="100" cy="60" r="18" fill="none" stroke="rgba(227,235,212,.45)" strokeWidth=".7" />
        <circle cx="100" cy="60" r="3"  fill="var(--sage)" opacity=".7" />
      </g>
    )}
    {idx === 1 && (
      <g>
        {Array.from({ length: 14 }).map((_, k) => (
          <path
            key={k}
            d={`M ${10 + k * 14} 30 Q ${15 + k * 14} ${50 + (k % 3) * 10} ${10 + k * 14} 90`}
            stroke="rgba(227,235,212,.28)"
            strokeWidth=".8"
            fill="none"
          />
        ))}
      </g>
    )}
    {idx === 2 && (
      <g>
        <path d="M 10 60 L 60 30 L 110 70 L 160 35 L 195 60" stroke="rgba(227,235,212,.35)" strokeWidth=".8" fill="none" strokeDasharray="4 3" />
        <circle cx="60"  cy="30" r="3" fill="var(--sage)" opacity=".6" />
        <circle cx="160" cy="35" r="3" fill="var(--sage)" opacity=".6" />
      </g>
    )}
  </svg>
)

const WhyUsRow = ({ item, idx, last }: { item: AdvItem; idx: number; last: boolean }) => {
  const [ref, seen] = useInView()

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="cadv"
      style={{
        display: 'grid',
        gridTemplateColumns: '72px 1fr 1.6fr 1fr',
        gap: '2.5rem',
        alignItems: 'start',
        padding: '2.5rem 0',
        borderTop: '1px dashed rgba(227,235,212,.1)',
        borderBottom: last ? '1px dashed rgba(227,235,212,.1)' : 'none',
        opacity: seen ? 1 : 0,
        transform: seen ? 'translateX(0)' : 'translateX(-30px)',
        transition: 'opacity .8s var(--ease), transform .8s var(--ease)',
        transitionDelay: `${idx * 150}ms`,
      }}
    >
      <div style={{ fontSize: 'clamp(30px,3.5vw,48px)', fontWeight: 200, lineHeight: 1, color: 'var(--sage)', opacity: 0.25 }}>
        {item.n}
      </div>
      <h3 style={{ fontSize: 'clamp(17px,1.8vw,22px)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1, paddingTop: '.2rem' }}>
        {item.title}
      </h3>
      <p style={{ fontSize: 'clamp(14px,1.2vw,16px)', fontWeight: 300, lineHeight: 1.8, opacity: 0.5 }}>
        {item.text}
      </p>

      {/* SVG image column */}
      <div
        className="cadv-img"
        style={{
          position: 'relative',
          height: 120,
          overflow: 'hidden',
          background: 'linear-gradient(135deg,rgba(227,235,212,.06),rgba(227,235,212,.02))',
          border: '1px dashed rgba(227,235,212,.18)',
        }}
      >
        <RowSvg idx={idx} />
        <div style={{ position: 'absolute', top: 10, left: 10, fontSize: 9, letterSpacing: 2, opacity: 0.32, fontWeight: 400, color: 'var(--sage)' }}>
          // {item.tag}
        </div>
      </div>
    </div>
  )
}

export const WhyUs = () => {
  const { t } = useTranslation('cleaning')
  const items = t('whyUs.items', { returnObjects: true }) as AdvItem[]

  return (
    <section
      id="dlaczego-my"
      className="grain"
      style={{ padding: 'clamp(5rem,9vw,8rem) clamp(1.5rem,5vw,5rem)', background: '#0a0d12', color: 'var(--white)' }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        <Reveal kind="up">
          <div className="stag" style={{ marginBottom: '1rem', color: 'var(--sage)', opacity: 0.5 }}>
            {t('whyUs.label')}
          </div>
        </Reveal>

        <h2 style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 500, textTransform: 'uppercase', marginBottom: '1rem' }}>
          <WordReveal text={t('whyUs.heading')} />
        </h2>

        {items.map((item, i) => (
          <WhyUsRow key={i} item={item} idx={i} last={i === items.length - 1} />
        ))}

      </div>

      <style>{`
        @media (max-width: 900px) {
          .cadv { grid-template-columns: 48px 1fr !important; }
          .cadv > p { grid-column: 2 !important; }
          .cadv-img { display: none !important; }
        }
        @media (max-width: 480px) {
          .cadv { grid-template-columns: 1fr !important; gap: .75rem !important; }
          .cadv > p { grid-column: 1 !important; }
        }
      `}</style>
    </section>
  )
}
