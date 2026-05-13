import { useTranslation } from 'react-i18next'
import { BpBox } from '../../shared/bp-box'

const BP_GRID = {
  backgroundImage:
    'linear-gradient(rgba(227,235,212,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(227,235,212,.04) 1px,transparent 1px)',
  backgroundSize: '48px 48px',
}

interface ServiceItem {
  code: string
  title: string
  sub: string
  desc: string
  specs: string[]
}

export const Services = () => {
  const { t } = useTranslation('cleaning')
  const items = t('services.items', { returnObjects: true }) as ServiceItem[]

  return (
    <section
      id="uslugi"
      style={{
        padding: 'clamp(5rem,9vw,8rem) clamp(1.5rem,5vw,5rem)',
        background: 'var(--bp)',
        color: 'var(--white)',
        ...BP_GRID,
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="stag" style={{ marginBottom: '1rem', color: 'var(--sage)', opacity: 0.5 }}>
          {t('services.label')}
        </div>
        <h2 style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 500, textTransform: 'uppercase', marginBottom: '3.5rem' }}>
          {t('services.heading')}
        </h2>

        <div className="csvc" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {items.map((s, i) => (
            <BpBox key={i} style={{ padding: 'clamp(2rem,4vw,3rem)', color: 'var(--white)' }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: 'var(--sage)', opacity: 0.5, marginBottom: '1.5rem', fontWeight: 400 }}>
                {s.code}
              </div>
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
            </BpBox>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .csvc { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
