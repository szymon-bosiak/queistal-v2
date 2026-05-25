import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TestimonialCard } from './components/testimonial-card'
import iconArrow from '../../../assets/icons/arrow.svg'

interface TestimonialItem {
  name: string
  initials: string
  text: string
}

export const Testimonials = () => {
  const { t } = useTranslation('wood')
  const items = t('testimonials.items', { returnObjects: true }) as TestimonialItem[]

  const [idx, setIdx] = useState(0)
  const [fade, setFade] = useState(true)

  const go = (n: number) => {
    setFade(false)
    setTimeout(() => {
      setIdx((n + items.length) % items.length)
      setFade(true)
    }, 200)
  }

  const r = items[idx]

  return (
    <section
      id="opinie"
      style={{
        padding: 'clamp(5rem,9vw,8rem) clamp(1.5rem,5vw,5rem)',
        background: 'var(--ink)',
        color: 'var(--white)',
        position: 'relative',
      }}
    >
      {/* Dashed top border */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 'clamp(1.5rem,5vw,5rem)',
          right: 'clamp(1.5rem,5vw,5rem)',
          borderTop: '1px dashed rgba(255,255,255,.12)',
        }}
      />

      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="stag" style={{ marginBottom: '1rem', opacity: 0.35 }}>
              {t('testimonials.label')}
            </div>
            <h2 style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 500, textTransform: 'uppercase' }}>
              {t('testimonials.heading')}
            </h2>
          </div>

          {/* Arrow buttons */}
          <div style={{ display: 'flex', gap: '.6rem' }}>
            {([-1, 1] as const).map((d, i) => (
              <button
                key={i}
                onClick={() => go(idx + d)}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  cursor: 'pointer',
                  transition: 'background .2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,.08)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
              >
                <img
                  src={iconArrow}
                  alt=""
                  style={{
                    width: 18,
                    filter: 'brightness(0) invert(1)',
                    transform: d < 0 ? 'rotate(180deg)' : '',
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Card */}
        <TestimonialCard
          initials={r.initials}
          name={r.name}
          text={r.text}
          fade={fade}
        />

        {/* Dots */}
        <div style={{ display: 'flex', gap: 6, marginTop: '2rem' }}>
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              style={{
                width: i === idx ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background: i === idx ? 'var(--sage)' : 'rgba(227,235,212,.2)',
                transition: 'width .3s var(--ease)',
                border: 'none',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
