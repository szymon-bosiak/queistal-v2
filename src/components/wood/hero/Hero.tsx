import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import heroDesktop from '../../../assets/hero.jpg'
import heroMobile from '../../../assets/hero-mobile.jpg'

export const Hero = () => {
  const { t } = useTranslation('wood')
  const [loaded, setLoaded] = useState(false)

  return (
    <section
      id="hero"
      className="hero-grid min-h-svh border-b border-dashed border-ink/18"
      style={{ background: 'var(--color-sage)', color: 'var(--color-ink)', maxHeight: '500px' }}
    >
      {/* Text column */}
      <div
        className="hero-text flex flex-col justify-end relative z-[2]"
        style={{ padding: 'clamp(6rem,10vw,9rem) clamp(1.5rem,5vw,5rem) clamp(3rem,6vw,5rem)' }}
      >
        <div className="stag mb-6" style={{ opacity: 0, animation: 'fadeIn .8s .15s var(--ease) forwards' }}>
          OD 2015
        </div>

        <h1
          style={{
            fontSize: 'clamp(44px,7vw,100px)',
            fontWeight: 500,
            lineHeight: 0.92,
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}
        >
          {[t('hero.line1'), t('hero.line2'), t('hero.line3')].map((line, i) => (
            <span key={i} style={{ display: 'block', overflow: 'hidden', fontWeight: i === 2 ? 200 : 500 }}>
              <span
                style={{
                  display: 'inline-block',
                  transform: 'translateY(110%)',
                  animation: `fadeUp .9s ${0.2 + i * 0.15}s var(--ease) forwards`,
                }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p
          style={{
            fontSize: 'clamp(15px,1.3vw,18px)',
            fontWeight: 300,
            lineHeight: 1.75,
            maxWidth: 340,
            opacity: 0,
            marginBottom: '2.5rem',
            animation: 'fadeUp .8s .7s var(--ease) forwards',
          }}
        >
          {t('about.body')}
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', opacity: 0, animation: 'fadeUp .8s .9s var(--ease) forwards' }}>
          <a
            href="#projects"
            className="hero-btn-primary"
            style={{
              background: 'var(--color-ink)',
              color: '#fff',
              padding: '13px 28px',
              fontSize: 14,
              fontWeight: 400,
              letterSpacing: '1.5px',
              borderRadius: 40,
              transition: 'transform .3s var(--ease), box-shadow .3s var(--ease)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.transform = 'translateY(-2px)'
              el.style.boxShadow = '0 8px 24px rgba(40,37,34,.25)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.transform = ''
              el.style.boxShadow = ''
            }}
          >
            NASZE PROJEKTY
          </a>
          <a
            href="#about"
            style={{
              border: '1.5px solid rgba(40,37,34,.38)',
              color: 'var(--color-ink)',
              padding: '13px 28px',
              fontSize: 14,
              fontWeight: 400,
              letterSpacing: '1.5px',
              borderRadius: 40,
              transition: 'background .25s var(--ease), color .25s var(--ease)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'var(--color-ink)'
              el.style.color = '#fff'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = ''
              el.style.color = ''
            }}
          >
            O NAS
          </a>
        </div>
      </div>

      {/* Photo column */}
      <div className="hero-photo" style={{ overflow: 'hidden', clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0% 100%)' }}>
        <picture>
          <source media="(max-width: 768px)" srcSet={heroMobile} />
          <img
            src={heroDesktop}
            alt="Queistal — architektura drewniana"
            onLoad={() => setLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '40% center',
              transform: loaded ? 'scale(1)' : 'scale(1.04)',
              transition: 'transform 1.2s var(--ease)',
            }}
          />
        </picture>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            position: relative;
          }
          .hero-photo {
            position: absolute !important;
            inset: 0 !important;
            clip-path: none !important;
          }
          .hero-photo::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(40,37,34,.88) 35%, rgba(40,37,34,.15) 100%);
          }
          .hero-text {
            position: relative;
            z-index: 3;
            color: #fff !important;
          }
          .hero-text h1,
          .hero-text p,
          .hero-text .stag {
            color: #fff !important;
          }
        }
      `}</style>
    </section>
  )
}
