import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '../../shared/reveal'
import { TestimonialCard } from './components/testimonial-card'

const INTERVAL = 5000

export const Testimonials = () => {
  const { t } = useTranslation('wood')
  const items: { name: string; location: string; text: string }[] =
    t('testimonials.items', { returnObjects: true }) as []

  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % items.length)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [items.length, paused])

  return (
    <section
      id="testimonials"
      style={{
        background: 'var(--color-ink)',
        color: '#fff',
        padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,5rem)',
        fontFamily: 'Oswald, sans-serif',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        {/* Label */}
        <Reveal>
          <div
            className="stag"
            style={{ marginBottom: 'clamp(3rem,6vw,5rem)', color: 'var(--color-sage)', opacity: .5 }}
          >
            {t('testimonials.label')}
          </div>
        </Reveal>

        {/* Testimonial */}
        <div key={current} style={{ animation: 'fadeIn .4s ease' }}>
          <TestimonialCard
            name={items[current].name}
            location={items[current].location}
            text={items[current].text}
          />
        </div>

        {/* Dots */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '.75rem',
          marginTop: '3rem',
        }}>
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Opinia ${i + 1}`}
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === current ? 'var(--color-sage)' : 'rgba(227,235,212,.2)',
                border: 'none', cursor: 'pointer',
                transition: 'width .3s var(--ease), background .2s',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
