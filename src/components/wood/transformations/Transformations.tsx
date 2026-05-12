import { useTranslation } from 'react-i18next'
import { Reveal } from '../../shared/reveal'
import p5  from '../../../assets/showcase/5.jpg'
import p9  from '../../../assets/showcase/13.jpg'
import p14 from '../../../assets/showcase/14.jpg'

const CARDS = [
  { photo: p5,  num: '01' },
  { photo: p9,  num: '02' },
  { photo: p14, num: '03' },
]

export const Transformations = () => {
  const { t } = useTranslation('wood')

  return (
    <section
      id="transformations"
      style={{
        background: 'var(--color-ink)',
        color: '#fff',
        padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,5rem)',
        fontFamily: 'Oswald, sans-serif',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        {/* Header */}
        <Reveal>
          <div
            className="stag"
            style={{ marginBottom: '0.75rem', color: 'var(--color-sage)', opacity: .5 }}
          >
            {t('transformations.label')}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <p style={{
            fontSize: 'clamp(14px,1.3vw,17px)',
            fontWeight: 300, opacity: .45,
            marginBottom: 'clamp(2.5rem,5vw,4rem)',
            maxWidth: 520,
          }}>
            {t('transformations.intro')}
          </p>
        </Reveal>

        {/* Cards grid */}
        <div
          className="trans-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}
        >
          {CARDS.map(({ photo, num }, i) => (
            <Reveal key={i} kind="scale" delay={i * 100}>
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  aspectRatio: '4/5',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  const overlay = (e.currentTarget as HTMLDivElement).querySelector('.card-overlay') as HTMLDivElement
                  if (overlay) overlay.style.opacity = '1'
                }}
                onMouseLeave={e => {
                  const overlay = (e.currentTarget as HTMLDivElement).querySelector('.card-overlay') as HTMLDivElement
                  if (overlay) overlay.style.opacity = '0'
                }}
              >
                <img
                  src={photo}
                  alt={`Transformacja ${num}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .6s var(--ease)' }}
                />
                {/* Number badge */}
                <span style={{
                  position: 'absolute', top: '1rem', left: '1rem',
                  fontSize: 'clamp(28px,3vw,42px)', fontWeight: 200,
                  color: '#fff', opacity: .25, lineHeight: 1,
                  pointerEvents: 'none',
                }}>
                  {num}
                </span>
                {/* Hover overlay */}
                <div
                  className="card-overlay"
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(40,37,34,.55)',
                    display: 'flex', alignItems: 'flex-end',
                    padding: '1.5rem',
                    opacity: 0, transition: 'opacity .3s ease',
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 400, letterSpacing: 3, color: 'var(--color-sage)' }}>
                    QUEIS TAL — REALIZACJA
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .trans-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .trans-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
