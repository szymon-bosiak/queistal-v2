import { useTranslation } from 'react-i18next'

interface AdvItem { n: string; title: string; text: string }

export const WhyUs = () => {
  const { t } = useTranslation('cleaning')
  const items = t('whyUs.items', { returnObjects: true }) as AdvItem[]

  return (
    <section
      id="dlaczego-my-clean"
      style={{ padding: 'clamp(5rem,9vw,8rem) clamp(1.5rem,5vw,5rem)', background: '#0a0d12', color: 'var(--white)' }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="stag" style={{ marginBottom: '1rem', color: 'var(--sage)', opacity: 0.5 }}>
          {t('whyUs.label')}
        </div>
        <h2 style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 500, textTransform: 'uppercase', marginBottom: '1rem' }}>
          {t('whyUs.heading')}
        </h2>

        {items.map((item, i) => (
          <div
            key={i}
            className="cadv"
            style={{
              display: 'grid',
              gridTemplateColumns: '72px 1fr 1.6fr',
              gap: '2.5rem',
              alignItems: 'start',
              padding: '2.5rem 0',
              borderTop: '1px dashed rgba(227,235,212,.1)',
              borderBottom: i === items.length - 1 ? '1px dashed rgba(227,235,212,.1)' : 'none',
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
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cadv { grid-template-columns: 48px 1fr !important; }
          .cadv > p { grid-column: 2 !important; }
        }
        @media (max-width: 480px) {
          .cadv { grid-template-columns: 1fr !important; gap: .75rem !important; }
          .cadv > p { grid-column: 1 !important; }
        }
      `}</style>
    </section>
  )
}
