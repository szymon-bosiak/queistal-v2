import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Marquee } from '../../shared/marquee'
import hero from '../../../assets/hero.jpg'

const SERVICE_KEYS = ['antique', 'construction', 'roofing', 'furniture', 'other'] as const

export const Hero = () => {
  const { t } = useTranslation('wood')
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  /* onLoad won't re-fire after hydration if the image is already cached */
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  const tickerItems = SERVICE_KEYS.map(k => t(`about.services.${k}`))

  return (
    <>
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
          <source media="(max-width: 768px)" srcSet={hero} />
          <img
            src={hero}
            alt="Queistal — architektura drewniana"
            ref={imgRef}
            onLoad={() => setLoaded(true)}
            className="wh-img"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '40% center',
              opacity: loaded ? 1 : 0,
              transition: 'opacity .8s var(--ease)',
            }}
          />
        </picture>

        {/* Blueprint survey overlay — the photo is being "measured" */}
        <svg
          className="wh-annot"
          viewBox="0 0 400 600"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          {/* Rotating survey ring on the roof */}
          <g style={{ transformOrigin: '252px 150px', animation: 'rotateSlow 40s linear infinite' }}>
            <circle cx="252" cy="150" r="64" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1" strokeDasharray="5 7" />
            <circle cx="252" cy="150" r="44" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth=".8" strokeDasharray="2 6" />
          </g>
          <circle cx="252" cy="150" r="2.5" fill="rgba(255,255,255,.85)" style={{ animation: 'pulseDot 1.8s ease-in-out infinite' }} />
          <line x1="252" y1="150" x2="332" y2="100" stroke="rgba(255,255,255,.5)" strokeWidth=".8" strokeDasharray="3 4"
            style={{ opacity: 0, animation: 'fadeIn 1s 1.4s var(--ease) forwards' }} />
          <line x1="332" y1="100" x2="386" y2="100" stroke="rgba(255,255,255,.5)" strokeWidth=".8" strokeDasharray="3 4"
            style={{ opacity: 0, animation: 'fadeIn 1s 1.6s var(--ease) forwards' }} />

          {/* Vertical dimension line, right edge */}
          <g stroke="rgba(255,255,255,.55)" strokeWidth="1" style={{ opacity: 0, animation: 'fadeIn 1.2s 1.1s var(--ease) forwards' }}>
            <line x1="376" y1="240" x2="376" y2="560" strokeDasharray="6 5" />
            <line x1="368" y1="240" x2="384" y2="240" />
            <line x1="368" y1="560" x2="384" y2="560" />
          </g>

          {/* Horizontal dimension line, bottom */}
          <g stroke="rgba(255,255,255,.55)" strokeWidth="1" style={{ opacity: 0, animation: 'fadeIn 1.2s 1.5s var(--ease) forwards' }}>
            <line x1="80" y1="560" x2="340" y2="560" strokeDasharray="6 5" />
            <line x1="80" y1="552" x2="80" y2="568" />
            <line x1="340" y1="552" x2="340" y2="568" />
          </g>

          {/* Crosshair marks */}
          {[[120, 110], [60, 320], [330, 420]].map(([x, y], i) => (
            <g key={i} stroke="rgba(255,255,255,.7)" strokeWidth="1" style={{ animation: `crosshairBlink 4.5s ${i * 1.3}s ease-in-out infinite` }}>
              <line x1={x - 7} y1={y} x2={x + 7} y2={y} />
              <line x1={x} y1={y - 7} x2={x} y2={y + 7} />
            </g>
          ))}
        </svg>
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
                border: '1px solid rgba(40,37,34,.2)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform .3s var(--ease), border-color .3s var(--ease), background .3s var(--ease)',
              }}
            >
              <span>{t('hero.cta.projects')}</span>
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
        .wh-img { animation: kenBurns 28s ease-in-out infinite alternate; }
        @keyframes kenBurns {
          from { transform: scale(1)    translateX(0); }
          to   { transform: scale(1.08) translateX(-1.5%); }
        }
        @media (max-width: 768px) {
          .wh-annot { display: none !important; }
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
        .hero-btn-primary:hover {
          transform: translateY(-2px);
          border-color: rgba(40,37,34,.45) !important;
        }
        @media (max-width: 768px) {
          .hero-btn-primary:hover {
            border-color: rgba(40,37,34,.45) !important;
          }
        }
      `}</style>
    </section>

    <Marquee items={tickerItems} tone="ink" duration={55} />
    </>
  )
}
