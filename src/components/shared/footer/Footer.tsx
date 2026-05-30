import { useTranslation } from 'react-i18next'
import { useRouterState } from '@tanstack/react-router'
import logoDefault from '../../../assets/logos/queistal_logo_txt.svg'
import logoWhite from '../../../assets/logos/queistal_logo_txt_wht.svg'

const TEL1 = { num: '782 243 640', href: 'tel:+48782243640' }
const TEL2 = { num: '602 345 678', href: 'tel:+48602345678' }

export const Footer = () => {
  const { t } = useTranslation('common')
  const routerState = useRouterState()
  const isWood = routerState.location.pathname.includes('/konstrukcje')

  const bg      = isWood ? 'var(--sage)' : '#0d1117'
  const textC   = isWood ? 'rgb(10,13,18)' : '#fff'
  const borderC = isWood ? 'rgba(10,13,18,.1)' : 'rgba(227,235,212,.1)'
  const logo    = isWood ? logoDefault : logoWhite
  const dash    = (c: string) => `1px dashed ${c}`

  const services: string[] = t('footer.services', { returnObjects: true }) as string[]

  return (
    <footer style={{ background: bg, color: textC, fontFamily: 'Oswald, sans-serif' }}>

      {/* ── Contact hero band ── */}
      <div style={{ borderBottom: dash(borderC), padding: 'clamp(2.5rem,5vw,4rem) clamp(1.5rem,5vw,5rem)' }}>
        <div
          className="ftop"
          style={{
            maxWidth: 1400, margin: '0 auto',
            display: 'grid', gridTemplateColumns: '1fr auto',
            gap: '3rem', alignItems: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: 11, letterSpacing: 3, opacity: .28, marginBottom: '1rem', fontWeight: 400 }}>
              {t('footer.contactLabel')}
            </div>
            <a
              href={TEL1.href}
              style={{
                fontSize: 'clamp(32px,5vw,60px)', fontWeight: 500, color: textC,
                letterSpacing: -1, display: 'inline-block', lineHeight: 1,
                transition: 'opacity .2s, transform .3s var(--ease)',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.opacity = '.65'; el.style.transform = 'translateX(6px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.opacity = '1'; el.style.transform = ''
              }}
            >
              {TEL1.num}
            </a>
            <a
              href={TEL2.href}
              style={{
                fontSize: 'clamp(18px,2.5vw,28px)', fontWeight: 300, opacity: .45,
                display: 'block', marginTop: '.4rem',
                transition: 'opacity .2s', color: textC, textDecoration: 'none',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '.8' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '.45' }}
            >
              {TEL2.num}
            </a>
            <a
              href="mailto:queistal@gmail.com"
              style={{
                fontSize: 'clamp(13px,1.4vw,18px)', fontWeight: 300, opacity: .38,
                marginTop: '.5rem', display: 'block',
                transition: 'opacity .2s', color: textC, textDecoration: 'none',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '.7' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '.38' }}
            >
              queistal@gmail.com
            </a>
          </div>
          <img src={logo} alt="Queistal" style={{ height: 42, opacity: isWood ? 1 : .85, flexShrink: 0 }} />
        </div>
      </div>

      {/* ── Info grid ── */}
      <div style={{ borderBottom: dash(borderC), padding: 'clamp(2rem,4vw,3rem) clamp(1.5rem,5vw,5rem)' }}>
        <div
          className="fmid"
          style={{
            maxWidth: 1400, margin: '0 auto',
            display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '2rem',
            alignItems: 'start',
          }}
        >
          {/* Company */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: 3, opacity: .28, marginBottom: '.75rem', fontWeight: 400 }}>
              {t('footer.companyLabel')}
            </div>
            <p style={{ fontSize: 14, fontWeight: 300, opacity: .42, lineHeight: 1.85 }}>
              {t('footer.companyName')}<br />
              67-320 Małomice<br />
              ul. Kościuszki 19c
            </p>
          </div>

          {/* Services – two tight sub-columns */}
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, opacity: .28, marginBottom: '.75rem', fontWeight: 400 }}>
                {t('footer.servicesLabel')}
              </div>
              {services.slice(0, 4).map((s, i) => (
                <div key={i} style={{ fontSize: 13, fontWeight: 300, opacity: .38, marginBottom: '.35rem' }}>
                  {s}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, opacity: .28, marginBottom: '.75rem', fontWeight: 400, visibility: 'hidden' }}>
                &nbsp;
              </div>
              {services.slice(4).map((s, i) => (
                <div key={i} style={{ fontSize: 13, fontWeight: 300, opacity: .38, marginBottom: '.35rem' }}>
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Scroll to top */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end',  }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Przewiń na górę"
              style={{
                background: 'transparent',
                border: `1px solid ${borderC}`,
                color: textC,
                width: 48, height: 48,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                transition: 'opacity .2s, border-color .2s',
                opacity: .5,
                flexShrink: 0,
                borderRadius: '100%'
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '.5' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 13 10 7 16 13" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Legal bar ── */}
      <div style={{ padding: '1.5rem clamp(1.5rem,5vw,5rem)' }}>
        <div style={{
          maxWidth: 1400, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap',
          gap: '1rem', opacity: .22, fontSize: 12, fontWeight: 300,
        }}>
          <span>{t('footer.rights')}</span>
          <a
            href={t('footer.creditHref')}
            target="_blank"
            rel="noreferrer"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {t('footer.credit')}
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ftop { grid-template-columns: 1fr !important; }
          .fmid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .fmid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
