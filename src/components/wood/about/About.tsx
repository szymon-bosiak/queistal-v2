import { useTranslation } from 'react-i18next'
import { Reveal } from '../../shared/reveal'
import { ServiceCard } from './components/service-card'
import iconAntique from '../../../assets/icons/antique.svg'
import iconBench from '../../../assets/icons/bench.svg'
import iconHouse from '../../../assets/icons/house.svg'
import iconRoof from '../../../assets/icons/roof.svg'
import iconEtc from '../../../assets/icons/etc.svg'

const ICONS: Record<string, string> = {
  antique:      iconAntique,
  furniture:    iconBench,
  construction: iconHouse,
  roofing:      iconRoof,
  other:        iconEtc,
}

const SERVICE_KEYS = ['antique', 'furniture', 'construction', 'roofing', 'other'] as const

export const About = () => {
  const { t } = useTranslation('wood')

  return (
    <section
      id="about"
      style={{
        background: 'var(--color-sage)',
        color: 'var(--color-ink)',
        padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,5rem)',
        borderBottom: '1px dashed rgba(40,37,34,.18)',
      }}
    >
      <div
        className="about-grid"
        style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(3rem,6vw,7rem)', alignItems: 'start' }}
      >
        {/* Left — text */}
        <Reveal kind="left">
          <div className="stag" style={{ marginBottom: '2rem' }}>
            {t('about.label')}
          </div>
          <p style={{
            fontSize: 'clamp(18px,2vw,26px)',
            fontWeight: 300,
            lineHeight: 1.7,
            maxWidth: 480,
          }}>
            {t('about.body')}
          </p>
        </Reveal>

        {/* Right — service cards */}
        <Reveal kind="right" delay={150}>
          <div
            className="cards-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
            }}
          >
            {SERVICE_KEYS.map((key, i) => (
              <Reveal key={key} kind="scale" delay={i * 60}>
                <ServiceCard
                  icon={ICONS[key]}
                  label={t(`about.services.${key}`)}
                />
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
