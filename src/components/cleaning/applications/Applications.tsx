import { useTranslation } from 'react-i18next'

interface AppItem { label: string; note: string }

const SVGS = [
  /* Kamień & Beton */
  <svg key={0} viewBox="0 0 80 80" fill="none">
    <rect x="10" y="30" width="60" height="35" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3"/>
    <polygon points="10,30 40,8 70,30" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" fill="none"/>
    <line x1="25" y1="30" x2="25" y2="65" stroke="currentColor" strokeWidth=".8" strokeDasharray="3 3"/>
    <line x1="55" y1="30" x2="55" y2="65" stroke="currentColor" strokeWidth=".8" strokeDasharray="3 3"/>
    <rect x="33" y="45" width="14" height="20" stroke="currentColor" strokeWidth="1" fill="none"/>
  </svg>,
  /* Metale */
  <svg key={1} viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="40" r="26" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 4"/>
    <circle cx="40" cy="40" r="14" stroke="currentColor" strokeWidth=".8"/>
    <line x1="40" y1="14" x2="40" y2="66" stroke="currentColor" strokeWidth=".8" strokeDasharray="3 3"/>
    <line x1="14" y1="40" x2="66" y2="40" stroke="currentColor" strokeWidth=".8" strokeDasharray="3 3"/>
    <circle cx="40" cy="40" r="3" fill="currentColor" opacity=".5"/>
  </svg>,
  /* Drewno */
  <svg key={2} viewBox="0 0 80 80" fill="none">
    <rect x="15" y="20" width="50" height="12" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="15" y="36" width="50" height="12" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="15" y="52" width="50" height="12" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="30" y1="20" x2="30" y2="64" stroke="currentColor" strokeWidth=".7" strokeDasharray="2 4"/>
    <line x1="50" y1="20" x2="50" y2="64" stroke="currentColor" strokeWidth=".7" strokeDasharray="2 4"/>
  </svg>,
  /* Cegła */
  <svg key={3} viewBox="0 0 80 80" fill="none">
    <rect x="10" y="15" width="28" height="14" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2"/>
    <rect x="42" y="15" width="28" height="14" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2"/>
    <rect x="26" y="33" width="28" height="14" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2"/>
    <rect x="10" y="51" width="28" height="14" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2"/>
    <rect x="42" y="51" width="28" height="14" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2"/>
  </svg>,
  /* Obiekty zabytkowe */
  <svg key={4} viewBox="0 0 80 80" fill="none">
    <ellipse cx="40" cy="30" rx="22" ry="20" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 3"/>
    <line x1="40" y1="50" x2="40" y2="68" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="28" y1="63" x2="52" y2="63" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="18" y1="30" x2="62" y2="30" stroke="currentColor" strokeWidth=".8" strokeDasharray="3 3"/>
    <circle cx="40" cy="30" r="5" stroke="currentColor" strokeWidth=".8"/>
  </svg>,
  /* Przemysł */
  <svg key={5} viewBox="0 0 80 80" fill="none">
    <rect x="20" y="25" width="40" height="30" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="32" cy="40" r="7" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3"/>
    <circle cx="52" cy="40" r="7" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3"/>
    <line x1="10" y1="55" x2="70" y2="55" stroke="currentColor" strokeWidth=".8" strokeDasharray="3 3"/>
    <line x1="20" y1="25" x2="20" y2="18" stroke="currentColor" strokeWidth=".8"/>
    <line x1="60" y1="25" x2="60" y2="18" stroke="currentColor" strokeWidth=".8"/>
    <line x1="16" y1="18" x2="64" y2="18" stroke="currentColor" strokeWidth=".8"/>
  </svg>,
]

export const Applications = () => {
  const { t } = useTranslation('cleaning')
  const items = t('applications.items', { returnObjects: true }) as AppItem[]

  return (
    <section
      id="zastosowania"
      style={{ padding: 'clamp(5rem,9vw,8rem) clamp(1.5rem,5vw,5rem)', background: '#0a0d12', color: 'var(--white)' }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="stag" style={{ marginBottom: '1rem', color: 'var(--sage)', opacity: 0.5 }}>
          {t('applications.label')}
        </div>
        <h2 style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 500, textTransform: 'uppercase', marginBottom: '3.5rem' }}>
          {t('applications.heading')}
        </h2>

        <div className="apps-g" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(227,235,212,.06)' }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                padding: '2.5rem 2rem',
                background: '#0a0d12',
                borderBottom: '1px dashed rgba(227,235,212,.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div style={{ color: 'rgba(227,235,212,.55)', width: 56, height: 56 }}>{SVGS[i]}</div>
              <div style={{ fontSize: 'clamp(17px,2vw,22px)', fontWeight: 400, textTransform: 'uppercase', letterSpacing: 1 }}>
                {item.label}
              </div>
              <div style={{ fontSize: 13, fontWeight: 300, opacity: 0.38 }}>{item.note}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .apps-g { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 480px) { .apps-g { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
