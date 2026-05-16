import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import heroDesktop from '../../../assets/hero.jpg'
import heroMobile from '../../../assets/hero-mobile.jpg'

export const Hero = () => {
  const { t } = useTranslation('wood')
  const [loaded, setLoaded] = useState(false)

  return (
    <section
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        background: 'var(--sage)',
        color: 'var(--ink)',
        padding: 'clamp(6rem,10vw,9rem) clamp(1.5rem,5vw,5rem) clamp(3rem,6vw,5rem)',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px dashed rgba(40,37,34,.18)',
      }}
    >
      {/* Photo — right half, full-bleed, absolute */}
      <div
        className="whp"
        style={{
          position: 'absolute',
          top: 0, right: 0, bottom: 0,
          width: '50%',
          clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0% 100%)',
          zIndex: 1,
        }}
      >
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

      {/* Content — same 1400px inner container as cleaning */}
      <div
        className="whg"
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'end',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Left: text */}
        <div>
          <div
            className="stag"
            style={{ marginBottom: '1.5rem', opacity: 0, animation: 'fadeIn .8s .15s var(--ease) forwards' }}
          >
            {t('hero.since')}
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
            {t('hero.tagline')}
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', opacity: 0, animation: 'fadeUp .8s .9s var(--ease) forwards' }}>
            <a
              href="#realizacje"
              className="hero-btn-primary"
              style={{
                background: 'var(--ink)',
                color: 'var(--white)',
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
              {t('hero.cta.projects')}
            </a>
            <a
              href="#o-nas"
              className="hero-btn-secondary"
              style={{
                border: '1.5px solid rgba(40,37,34,.38)',
                color: 'var(--ink)',
                padding: '13px 28px',
                fontSize: 14,
                fontWeight: 400,
                letterSpacing: '1.5px',
                borderRadius: 40,
                transition: 'background .25s var(--ease), color .25s var(--ease)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'var(--ink)'
                el.style.color = 'var(--white)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = ''
                el.style.color = ''
              }}
            >
              {t('hero.cta.about')}
            </a>
          </div>
        </div>

        {/* Right: empty — photo fills this area absolutely */}
        <div />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .whp { width: 100% !important; clip-path: none !important; }
          .whp::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(40,37,34,.88) 35%, rgba(40,37,34,.15) 100%);
          }
          .whg { grid-template-columns: 1fr !important; gap: 0 !important; }
          .whg > div:last-child { display: none !important; }
          .whg > div:first-child { color: var(--white) !important; }
          .whg > div:first-child h1,
          .whg > div:first-child p,
          .whg > div:first-child .stag { color: var(--white) !important; }
          .hero-btn-primary { background: var(--sage) !important; color: var(--ink) !important; }
          .hero-btn-secondary { border-color: rgba(255,255,255,.55) !important; color: var(--white) !important; }
        }
      `}</style>
    </section>
  )
}
