import { useTranslation } from 'react-i18next'
import { ServiceCard } from './components/service-card'
import iconAntique from '../../../assets/icons/antique.svg'
import iconHouse from '../../../assets/icons/house.svg'
import iconRoof from '../../../assets/icons/roof.svg'
import iconBench from '../../../assets/icons/bench.svg'
import iconEtc from '../../../assets/icons/etc.svg'
import decor from '../../../assets/icons/decor.svg'

const SERVICES = [
  { icon: iconAntique, key: 'antique' },
  { icon: iconHouse,   key: 'construction' },
  { icon: iconRoof,    key: 'roofing' },
  { icon: iconBench,   key: 'furniture' },
  { icon: iconEtc,     key: 'other' },
] as const

const GRID_POSITIONS = [
  { col: 1, row: '1/3' },
  { col: 2, row: '2/4' },
  { col: 3, row: '1/3' },
  { col: 4, row: '2/4' },
  { col: 5, row: '1/3' },
] as const

export const About = () => {
  const { t } = useTranslation('wood')

  return (
    <section
      id="o-nas"
      style={{
        padding: 'clamp(5rem,9vw,8rem) clamp(1.5rem,5vw,5rem)',
        overflow: 'visible',
        background: 'var(--sage)',
        borderBottom: '1px dashed rgba(10,13,18,.18)',
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '3rem',
        }}
      >
        {/* Text column */}
        <div style={{ minWidth: '9rem', width: '14rem' }}>
          <h3 style={{ fontSize: 30, fontWeight: 400, marginBottom: '1.2rem' }}>
            //{t('about.label')}
          </h3>
          <p style={{ fontSize: 18, fontWeight: 300, lineHeight: 1.7, opacity: 0.7 }}>
            {t('about.body')}
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 1, height: 40, borderLeft: '1px dashed rgba(10,13,18,.3)' }} />
            <span style={{ fontSize: 11, letterSpacing: 3, opacity: 0.35, fontWeight: 400 }}>
              {t('about.servicesLabel')}
            </span>
          </div>
        </div>

        {/* Cards container */}
        <div className="wood-cards-wrap" style={{ flex: 1, minWidth: 340, position: 'relative', padding: '2.5rem 2rem' }}>
          {/* Dashed border frame */}
          <div style={{ position: 'absolute', inset: 0, border: '1px dashed rgba(10,13,18,.18)', pointerEvents: 'none' }} />

          {/* Corner decors */}
          <img src={decor} alt="" className="wood-decor" style={{ position: 'absolute', left: '-1.5rem', top: '-1.5rem', width: '3.2rem', transform: 'none', opacity: 0.7, zIndex: 2 }} />
          <img src={decor} alt="" className="wood-decor" style={{ position: 'absolute', right: '-1.5rem', top: '-1.5rem', width: '3.2rem', transform: 'scaleX(-1)', opacity: 0.7, zIndex: 2 }} />
          <img src={decor} alt="" className="wood-decor" style={{ position: 'absolute', left: '-1.5rem', bottom: '-1.5rem', width: '3.2rem', transform: 'scaleY(-1)', opacity: 0.7, zIndex: 2 }} />
          <img src={decor} alt="" className="wood-decor" style={{ position: 'absolute', right: '-1.5rem', bottom: '-1.5rem', width: '3.2rem', transform: 'scale(-1,-1)', opacity: 0.7, zIndex: 2 }} />

          {/* 5-column stagger grid — odd columns top row, even columns bottom row */}
          <div
            className="wood-card-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
              gridTemplateRows: 'auto 3rem auto',
              justifyContent: 'center',
              justifyItems: 'center',
              gap: '0 clamp(.5rem, 1.5vw, 1.5rem)',
            }}
          >
            {SERVICES.map((svc, i) => (
              <div
                key={svc.key}
                style={{
                  gridColumn: GRID_POSITIONS[i].col,
                  gridRow: GRID_POSITIONS[i].row,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ServiceCard
                  idx={i}
                  icon={svc.icon}
                  label={t(`about.services.${svc.key}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          #o-nas > div { flex-direction: column !important; }
          .wood-card-grid { grid-template-columns: repeat(5, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 700px) {
          #o-nas { overflow: hidden !important; }
          .wood-cards-wrap { min-width: 0 !important; }
          .wood-card-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 1rem !important;
          }
          .wood-card-grid > div { align-self: flex-start !important; }
          .wood-card-grid > div:nth-child(even) { align-self: flex-end !important; }
        }
      `}</style>
    </section>
  )
}
