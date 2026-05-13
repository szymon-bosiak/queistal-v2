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
      style={{
        padding: 'clamp(5rem,9vw,8rem) clamp(1.5rem,5vw,5rem)',
        background: 'var(--sage)',
        color: 'var(--ink)',
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
          <FaqItem key={i} question={item.q} answer={item.a} />
        ))}

        {/* Closing border */}
        <div style={{ borderTop: '1px dashed rgba(40,37,34,.18)' }} />
      </div>
    </section>
  )
}
