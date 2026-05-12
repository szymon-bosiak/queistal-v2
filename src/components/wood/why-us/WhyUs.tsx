import { useTranslation } from 'react-i18next'
import { Reveal } from '../../shared/reveal'
import boxLeft  from '../../../assets/icons/box_left.svg'
import boxRight from '../../../assets/icons/box_right.svg'

const pad = (n: number) => String(n).padStart(2, '0')

export const WhyUs = () => {
  const { t } = useTranslation('wood')
  const items: { title: string; body: string }[] = t('whyUs.items', { returnObjects: true }) as []

  return (
    <section
      id="why-us"
      style={{
        background: 'var(--color-sage)',
        color: 'var(--color-ink)',
        padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,5rem)',
        borderBottom: '1px dashed rgba(40,37,34,.18)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative boxes */}
      <img
        src={boxLeft}
        alt=""
        style={{
          position: 'absolute', left: '-4rem', top: '50%',
          transform: 'translateY(-50%)',
          height: 'clamp(200px,30vw,360px)',
          opacity: .07, pointerEvents: 'none',
          animation: 'fadeInScale .6s .2s var(--ease) both',
        }}
      />
      <img
        src={boxRight}
        alt=""
        style={{
          position: 'absolute', right: '-4rem', top: '50%',
          transform: 'translateY(-50%)',
          height: 'clamp(200px,30vw,360px)',
          opacity: .07, pointerEvents: 'none',
          animation: 'fadeInScale .6s .4s var(--ease) both',
        }}
      />

      <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>

        {/* Label */}
        <Reveal>
          <div className="stag" style={{ marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
            {t('whyUs.label')}
          </div>
        </Reveal>

        {/* Items */}
        <div>
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 120}>
              <div
                className="why-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '72px 1fr 1.6fr',
                  gap: '2.5rem',
                  alignItems: 'start',
                  padding: '2.5rem 0',
                  borderTop: '1px dashed rgba(40,37,34,.22)',
                  borderBottom: i === items.length - 1 ? '1px dashed rgba(40,37,34,.22)' : 'none',
                }}
              >
                <div style={{
                  fontSize: 'clamp(30px,3.5vw,48px)',
                  fontWeight: 200, lineHeight: 1,
                  opacity: .2,
                }}>
                  {pad(i + 1)}
                </div>
                <h3 style={{
                  fontSize: 'clamp(17px,1.8vw,22px)',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  paddingTop: '.2rem',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: 'clamp(14px,1.2vw,17px)',
                  fontWeight: 300,
                  lineHeight: 1.8,
                  opacity: .65,
                }}>
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .why-row {
            grid-template-columns: 48px 1fr !important;
          }
          .why-row > p {
            grid-column: 2 !important;
          }
        }
      `}</style>
    </section>
  )
}
