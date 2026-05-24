import { useTranslation } from 'react-i18next'
import { BpBox } from '../../shared/bp-box'

const BP_GRID = {
  backgroundImage:
    'linear-gradient(rgba(227,235,212,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(227,235,212,.04) 1px,transparent 1px)',
  backgroundSize: '48px 48px',
}

interface SpecRow { l: string; v: string }

export const Hero = () => {
  const { t } = useTranslation('cleaning')
  const rows = t('hero.spec.rows', { returnObjects: true }) as SpecRow[]

  return (
    <section
      style={{
        minHeight: '100svh',
        background: 'var(--bp)',
        color: 'var(--white)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'clamp(7rem,12vw,10rem) clamp(1.5rem,5vw,5rem) clamp(3rem,6vw,5rem)',
        position: 'relative',
        overflow: 'hidden',
        ...BP_GRID,
      }}
    >
      {/* Ghost watermark */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '-2rem',
          transform: 'translateY(-50%) rotate(-90deg)',
          fontSize: 'clamp(80px,12vw,160px)',
          fontWeight: 500,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(227,235,212,.04)',
          letterSpacing: -2,
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none',
          opacity: 0,
          animation: 'fadeIn 1.4s .6s var(--ease) forwards',
        }}
      >
        RENOWACJA
      </div>

      <div className="chi" style={{ maxWidth: 1400, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'end' }}>

        {/* Left column */}
        <div>
          <div
            className="stag"
            style={{ marginBottom: '1.5rem', color: 'var(--sage)', opacity: 0, animation: 'fadeIn .8s .15s var(--ease) forwards' }}
          >
            {t('hero.label')}
          </div>
          <h1 style={{ fontSize: 'clamp(44px,7vw,100px)', fontWeight: 500, lineHeight: 0.92, textTransform: 'uppercase', marginBottom: '2rem' }}>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span style={{ display: 'inline-block', transform: 'translateY(110%)', animation: 'fadeUp .9s .2s var(--ease) forwards' }}>
                {t('hero.line1')}
              </span>
            </span>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <span style={{ display: 'inline-block', transform: 'translateY(110%)', animation: 'fadeUp .9s .35s var(--ease) forwards' }}>
                {t('hero.line2')}
              </span>
            </span>
          </h1>
          <p style={{ fontSize: 'clamp(15px,1.3vw,18px)', fontWeight: 300, lineHeight: 1.75, opacity: 0, maxWidth: 340, marginBottom: '2.5rem', animation: 'fadeUp .8s .55s var(--ease) forwards' }}>
            {t('hero.tagline')}
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', opacity: 0, animation: 'fadeUp .8s .75s var(--ease) forwards' }}>
            <a
              href="#uslugi"
              style={{ background: 'var(--sage)', color: 'var(--ink)', padding: '13px 28px', fontSize: 14, fontWeight: 500, letterSpacing: 1.5, borderRadius: 40, transition: 'transform .3s var(--ease), box-shadow .3s var(--ease)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(227,235,212,.18)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
            >
              {t('hero.cta1')}
            </a>
            <a
              href="#proces"
              style={{ border: '1px dashed rgba(227,235,212,.35)', color: 'var(--white)', padding: '13px 28px', fontSize: 14, fontWeight: 300, letterSpacing: 1.5, borderRadius: 40, transition: 'background .25s var(--ease), color .25s var(--ease)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--sage)'; e.currentTarget.style.color = 'var(--ink)' }}
              onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = '' }}
            >
              {t('hero.cta2')}
            </a>
          </div>
        </div>

        {/* Right column — tech spec box */}
        <div style={{ opacity: 0, animation: 'fadeUp .9s .5s var(--ease) forwards' }}>
          <BpBox style={{ padding: '2.5rem', color: 'var(--white)', animation: 'floatY 6s ease-in-out infinite' }}>
            <div style={{ fontSize: 11, fontWeight: 400, letterSpacing: 3, opacity: 0.35, marginBottom: '2rem', color: 'var(--sage)' }}>
              //{t('hero.spec.label')}
            </div>
            {rows.map((row, i) => (
              <div
                key={i}
                style={{ display: 'flex', justifyContent: 'space-between', padding: '.8rem 0', borderBottom: '1px dashed rgba(227,235,212,.1)', fontSize: 14 }}
              >
                <span style={{ fontWeight: 400, letterSpacing: 1, opacity: 0.5 }}>{row.l}</span>
                <span style={{ fontWeight: 300, opacity: 0.85 }}>{row.v}</span>
              </div>
            ))}
          </BpBox>
        </div>
      </div>

      <style>{`
        .chi { grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) {
          .chi { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  )
}
