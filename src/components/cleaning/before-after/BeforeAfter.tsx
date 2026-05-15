import { useTranslation } from 'react-i18next'
import { BpBox } from '../../shared/bp-box'
import { Reveal } from '../../shared/reveal/Reveal'
import { WordReveal } from '../../shared/reveal/WordReveal'
import { Slider } from './components/slider'
import img1 from '../../../assets/showcase/1.jpg'
import img3 from '../../../assets/showcase/3.jpg'
import img5 from '../../../assets/showcase/5.jpg'
import img15 from '../../../assets/showcase/15.jpg'
import img8 from '../../../assets/showcase/8.jpg'
import img14 from '../../../assets/showcase/14.jpg'

const PAIRS = [
  { before: img1,  after: img3  },
  { before: img5,  after: img15 },
  { before: img8,  after: img14 },
]

interface PairLabel { label: string }

export const BeforeAfter = () => {
  const { t } = useTranslation('cleaning')
  const pairs = t('beforeAfter.pairs', { returnObjects: true }) as PairLabel[]
  const labelBefore = t('beforeAfter.before')
  const labelAfter  = t('beforeAfter.after')

  return (
    <section
      id="before-after"
      style={{
        padding: 'clamp(5rem,9vw,8rem) clamp(1.5rem,5vw,5rem)',
        background: '#0a0d12',
        color: 'var(--white)',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <Reveal kind="up">
          <div className="stag" style={{ marginBottom: '1rem', color: 'var(--sage)', opacity: 0.5 }}>
            {t('beforeAfter.label')}
          </div>
        </Reveal>

        <h2 style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 500, textTransform: 'uppercase', marginBottom: '.75rem' }}>
          <WordReveal text={t('beforeAfter.heading')} />
        </h2>

        <Reveal kind="up" delay={200}>
          <p style={{ fontSize: 15, fontWeight: 300, opacity: 0.4, marginBottom: '3rem', letterSpacing: 0.5 }}>
            {t('beforeAfter.hint')}
          </p>
        </Reveal>

        <div className="ba-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
          {PAIRS.map((p, i) => (
            <Reveal key={i} kind="scale" delay={i * 150}>
              <BpBox>
                <Slider
                  before={p.before}
                  after={p.after}
                  labelBefore={labelBefore}
                  labelAfter={labelAfter}
                  label={pairs[i]?.label}
                />
              </BpBox>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .ba-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
