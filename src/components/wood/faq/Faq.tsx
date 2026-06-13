import { useTranslation } from 'react-i18next'
import { FaqItem } from './components/faq-item'

interface FaqEntry {
  q: string
  a: string
}

export const Faq = () => {
  const { t } = useTranslation('wood')
  const items = t('faq.items', { returnObjects: true }) as FaqEntry[]

  return (
    <section
      id="faq"
      className="grain"
      style={{
        padding: 'clamp(5rem,9vw,8rem) clamp(1.5rem,5vw,5rem)',
        background: 'var(--bp)',
        backgroundImage: 'linear-gradient(rgba(227,235,212,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(227,235,212,.04) 1px,transparent 1px)',
        backgroundSize: '48px 48px',
        color: 'var(--white)',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="stag" style={{ marginBottom: '1rem', opacity: 0.45 }}>
          {t('faq.label')}
        </div>
        <h2
          style={{
            fontSize: 'clamp(30px,4vw,52px)',
            fontWeight: 500,
            textTransform: 'uppercase',
            marginBottom: '3rem',
          }}
        >
          {t('faq.heading')}
        </h2>

        {items.map((item, i) => (
          <FaqItem key={i} question={item.q} answer={item.a} borderColor="rgba(227,235,212,.18)" color="var(--white)" />
        ))}

        {/* Closing border */}
        <div style={{ borderTop: '1px dashed rgba(227,235,212,.18)' }} />
      </div>
    </section>
  )
}
