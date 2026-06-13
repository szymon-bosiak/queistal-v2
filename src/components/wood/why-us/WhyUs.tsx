import { useTranslation } from 'react-i18next'
import { TechSvg } from './components/tech-svg'
import { AdvCard } from './components/adv-card'

interface WhyUsItem {
  n: string
  title: string
  body: string
}

export const WhyUs = () => {
  const { t } = useTranslation('wood')
  const items = t('whyUs.items', { returnObjects: true }) as WhyUsItem[]

  return (
    <section
      id="dlaczego-my"
      style={{
        padding: 'clamp(7rem,11vw,11rem) clamp(1.5rem,5vw,5rem)',
        background: 'var(--sage)',
        borderTop: '1px dashed rgba(10,13,18,.18)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <TechSvg />

      <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
        <div style={{ marginBottom: '3rem' }}>
          <div className="stag" style={{ marginBottom: '1rem', opacity: 0.45 }}>
            {t('whyUs.label')}
          </div>
          <h2 style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 500, textTransform: 'uppercase' }}>
            {t('whyUs.heading')}
          </h2>
        </div>

        <div
          className="why-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            background: 'rgba(10,13,18,.18)',
          }}
        >
          {items.map((item, i) => (
            <AdvCard key={i} n={item.n} title={item.title} body={item.body} idx={i} />
          ))}
        </div>
      </div>

      <style>{`@media (max-width: 768px) { .why-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
