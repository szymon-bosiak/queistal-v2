import { useTranslation } from 'react-i18next'
import { Reveal } from '../../shared/reveal'
import { FaqItem } from './components/faq-item'

export const Faq = () => {
  const { t } = useTranslation('wood')
  const items: { q: string; a: string }[] = t('faq.items', { returnObjects: true }) as []

  return (
    <section
      id="faq"
      style={{
        background: 'var(--color-sage)',
        color: 'var(--color-ink)',
        padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,5rem)',
      }}
    >
      <div
        className="faq-inner"
        style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'clamp(3rem,6vw,7rem)', alignItems: 'start' }}
      >
        {/* Left — label */}
        <Reveal kind="left">
          <div className="stag" style={{ position: 'sticky', top: '6rem' }}>
            {t('faq.label')}
          </div>
        </Reveal>

        {/* Right — accordion */}
        <Reveal kind="right" delay={100}>
          <div style={{ borderTop: '1px dashed rgba(40,37,34,.22)' }}>
            {items.map((item, i) => (
              <FaqItem
                key={i}
                question={item.q}
                answer={item.a}
                isLast={i === items.length - 1}
              />
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .faq-inner { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  )
}
