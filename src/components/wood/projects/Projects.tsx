import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '../../shared/reveal'
import iconDecor from '../../../assets/icons/decor.svg'
import iconArrow from '../../../assets/icons/arrow.svg'
import p1  from '../../../assets/showcase/1.jpg'
import p2  from '../../../assets/showcase/2.jpg'
import p3  from '../../../assets/showcase/3.jpg'
import p4  from '../../../assets/showcase/4.jpg'
import p5  from '../../../assets/showcase/5.jpg'
import p6  from '../../../assets/showcase/6.jpg'
import p7  from '../../../assets/showcase/7.jpg'
import p8  from '../../../assets/showcase/8.jpg'
import p10 from '../../../assets/showcase/10.jpg'
import p13 from '../../../assets/showcase/13.jpg'
import p14 from '../../../assets/showcase/14.jpg'
import p15 from '../../../assets/showcase/15.jpg'
import p16 from '../../../assets/showcase/16.jpg'
import p17 from '../../../assets/showcase/17.jpg'

const PHOTOS = [p1, p2, p3, p4, p5, p6, p7, p8, p10, p13, p14, p15, p16, p17]

const pad = (n: number) => String(n).padStart(2, '0')

export const Projects = () => {
  const { t } = useTranslation('wood')
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent(c => (c - 1 + PHOTOS.length) % PHOTOS.length)
  const next = () => setCurrent(c => (c + 1) % PHOTOS.length)

  return (
    <section
      id="projects"
      style={{
        background: 'var(--color-sage)',
        color: 'var(--color-ink)',
        padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,5rem)',
        borderBottom: '1px dashed rgba(40,37,34,.18)',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        {/* Label */}
        <Reveal>
          <div className="stag" style={{ marginBottom: '2.5rem' }}>
            {t('projects.label')}
          </div>
        </Reveal>

        {/* Gallery frame */}
        <Reveal kind="scale" delay={100}>
          <div style={{ position: 'relative' }}>

            {/* Corner decors */}
            {[
              { top: '-1rem',  left: '-1rem',  transform: 'rotate(0deg)' },
              { top: '-1rem',  right: '-1rem', transform: 'rotate(90deg)' },
              { bottom: '-1rem', right: '-1rem', transform: 'rotate(180deg)' },
              { bottom: '-1rem', left: '-1rem',  transform: 'rotate(270deg)' },
            ].map((pos, i) => (
              <img
                key={i}
                src={iconDecor}
                alt=""
                style={{
                  position: 'absolute', zIndex: 2,
                  width: '3.5rem', height: '3.5rem',
                  ...pos,
                }}
              />
            ))}

            {/* Photo */}
            <div style={{ overflow: 'hidden', aspectRatio: '16/9', background: '#0a0a0a' }}>
              <img
                key={current}
                src={PHOTOS[current]}
                alt={`Realizacja ${current + 1}`}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  animation: 'fadeIn .4s ease',
                }}
              />
            </div>

            {/* Navigation bar */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderTop: '1px solid rgba(40,37,34,.18)',
              paddingTop: '1.25rem', marginTop: '1.5rem',
            }}>
              {/* Counter */}
              <span style={{ fontSize: 13, fontWeight: 300, letterSpacing: 2, opacity: .5 }}>
                {pad(current + 1)} / {pad(PHOTOS.length)}
              </span>

              {/* Arrows */}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={prev}
                  aria-label={t('projects.prev')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '.5rem',
                    fontSize: 11, fontWeight: 400, letterSpacing: 2,
                    color: 'var(--color-ink)', background: 'none', border: 'none',
                    cursor: 'pointer', opacity: .6, transition: 'opacity .2s, transform .3s ease',
                    fontFamily: 'Oswald, sans-serif',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLButtonElement
                    el.style.opacity = '1'
                    el.style.transform = 'translateX(-4px)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLButtonElement
                    el.style.opacity = '.6'
                    el.style.transform = ''
                  }}
                >
                  <img src={iconArrow} alt="" style={{ width: '1.25rem', transform: 'rotate(180deg)' }} />
                  {t('projects.prev')}
                </button>

                <button
                  onClick={next}
                  aria-label={t('projects.next')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '.5rem',
                    fontSize: 11, fontWeight: 400, letterSpacing: 2,
                    color: 'var(--color-ink)', background: 'none', border: 'none',
                    cursor: 'pointer', opacity: .6, transition: 'opacity .2s, transform .3s ease',
                    fontFamily: 'Oswald, sans-serif',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLButtonElement
                    el.style.opacity = '1'
                    el.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLButtonElement
                    el.style.opacity = '.6'
                    el.style.transform = ''
                  }}
                >
                  {t('projects.next')}
                  <img src={iconArrow} alt="" style={{ width: '1.25rem' }} />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
