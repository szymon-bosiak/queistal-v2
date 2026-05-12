import { useTranslation } from 'react-i18next'
import { useRouterState, useParams } from '@tanstack/react-router'
import logoWhite from '../../../assets/logos/queistal_logo_txt_wht.svg'

const TEL1 = { num: '782 243 640', href: 'tel:+48782243640' }
const TEL2 = { num: '602 345 678', href: 'tel:+48602345678' }

const WOOD_NAV = [
  ['DREWNO — O NAS',        '#about'],
  ['DREWNO — REALIZACJE',   '#projects'],
  ['DREWNO — DLACZEGO MY',  '#why-us'],
  ['DREWNO — TRANSFORMACJE','#transformations'],
  ['DREWNO — OPINIE',       '#testimonials'],
  ['CZYSZCZENIE — USŁUGI',  '#services'],
  ['CZYSZCZENIE — ZANIM I PO','#before-after'],
] as const

const CLEAN_NAV = [
  ['CZYSZCZENIE — USŁUGI',    '#services'],
  ['CZYSZCZENIE — ZANIM I PO','#before-after'],
  ['CZYSZCZENIE — ZASTOSOWANIA','#applications'],
  ['CZYSZCZENIE — PROCES',    '#process'],
  ['CZYSZCZENIE — OPINIE',    '#testimonials'],
  ['DREWNO — O NAS',          '#about'],
  ['DREWNO — REALIZACJE',     '#projects'],
] as const

export const Footer = () => {
  const { t } = useTranslation('common')
  const { lang } = useParams({ strict: false }) as { lang: 'pl' | 'de' }
  const routerState = useRouterState()
  const isWood = !routerState.location.pathname.includes('/cleaning')

  const bg      = isWood ? 'var(--color-ink)' : '#0d1117'
  const borderC = isWood ? 'rgba(255,255,255,.1)' : 'rgba(227,235,212,.1)'
  const dash    = (c: string) => `1px dashed ${c}`
  const navRows = isWood ? WOOD_NAV : CLEAN_NAV

  const services: string[] = t('footer.services', { returnObjects: true }) as string[]

  return (
    <footer style={{ background: bg, color: '#fff', fontFamily: 'Oswald, sans-serif' }}>

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
                fontSize: 'clamp(32px,5vw,60px)', fontWeight: 500, color: '#fff',
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
                transition: 'opacity .2s', color: '#fff', textDecoration: 'none',
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
                transition: 'opacity .2s', color: '#fff', textDecoration: 'none',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '.7' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '.38' }}
            >
              queistal@gmail.com
            </a>
          </div>
          <img src={logoWhite} alt="Queistal" style={{ height: 42, opacity: .85, flexShrink: 0 }} />
        </div>
      </div>

      {/* ── Info grid ── */}
      <div style={{ borderBottom: dash(borderC), padding: 'clamp(2rem,4vw,3rem) clamp(1.5rem,5vw,5rem)' }}>
        <div
          className="fmid"
          style={{
            maxWidth: 1400, margin: '0 auto',
            display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2rem',
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

          {/* Services */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: 3, opacity: .28, marginBottom: '.75rem', fontWeight: 400 }}>
              {t('footer.servicesLabel')}
            </div>
            {services.map((s, i) => (
              <div key={i} style={{ fontSize: 13, fontWeight: 300, opacity: .38, marginBottom: '.35rem' }}>
                {s}
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: 3, opacity: .28, marginBottom: '.75rem', fontWeight: 400 }}>
              {t('footer.navLabel')}
            </div>
            {navRows.map(([label, href]) => (
              <a
                key={href}
                href={href}
                style={{
                  display: 'block', fontSize: 13, fontWeight: 300, opacity: .38,
                  marginBottom: '.35rem', color: '#fff', textDecoration: 'none',
                  transition: 'opacity .2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '.38' }}
              >
                //{label}
              </a>
            ))}
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
