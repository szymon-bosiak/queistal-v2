import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useRouterState } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import logoLight from '../../../assets/logos/queistal_logo_txt.svg'
import logoDark from '../../../assets/logos/queistal_logo_txt_wht.svg'

/* ─── Nav link definitions ───────────────────────────────────── */
const WOOD_LINKS = [
  { key: 'nav.about',           anchor: '#o-nas' },
  { key: 'nav.projects',        anchor: '#realizacje' },
  { key: 'nav.whyUs',           anchor: '#dlaczego-my' },
  { key: 'nav.transformations', anchor: '#transformacje' },
  { key: 'nav.testimonials',    anchor: '#opinie' },
  { key: 'nav.faq',             anchor: '#faq' },
] as const

const CLEAN_LINKS = [
  { key: 'nav.cleaning.services',       anchor: '#uslugi' },
  { key: 'nav.cleaning.beforeAfter',    anchor: '#przed-i-po' },
  { key: 'nav.cleaning.transformation', anchor: '#jak-dzialamy' },
  { key: 'nav.cleaning.applications',   anchor: '#zastosowania' },
  { key: 'nav.cleaning.process',        anchor: '#proces' },
  { key: 'nav.cleaning.testimonials',   anchor: '#opinie' },
  { key: 'nav.cleaning.whyUs',          anchor: '#dlaczego-my' },
  { key: 'nav.cleaning.gallery',        anchor: '#galeria' },
  { key: 'nav.cleaning.faq',            anchor: '#faq' },
] as const

const TEL1 = { num: '782 243 640', href: 'tel:+48782243640' }
const TEL2 = { num: '782 243 640', href: 'tel:+48602345678' }

/* ─── Component ─────────────────────────────────────────────── */
export const Nav = () => {
  const { t } = useTranslation('common')
  const navigate = useNavigate()
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  const lang: 'pl' | 'de' = currentPath.startsWith('/de') ? 'de' : 'pl'
  const isWood = !currentPath.includes('/renowacja')
  const links = isWood ? WOOD_LINKS : CLEAN_LINKS

  const [scrolled, setScrolled]       = useState(false)
  const [menuOpen, setMenuOpen]       = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [navOverflow, setNavOverflow] = useState(false)
  const contactRef                    = useRef<HTMLDivElement>(null)
  const linksRef                      = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = linksRef.current
    if (!el) return
    const check = () => setNavOverflow(el.scrollWidth > el.clientWidth)
    check()
    const ro = new ResizeObserver(check)
    ro.observe(el)
    return () => ro.disconnect()
  }, [links])

  /* Scroll listener */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* Close mobile menu on route change */
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setMenuOpen(false)
      setContactOpen(false)
    }, 0)
    return () => window.clearTimeout(timeoutId)
  }, [currentPath])

  /* Lock body scroll when mobile menu open (iOS-safe) */
  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
    } else {
      const scrollY = Math.abs(parseInt(document.body.style.top || '0'))
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollY)
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }, [menuOpen])

  /* Close contact dropdown when clicking outside */
  useEffect(() => {
    if (!contactOpen) return
    const handler = (e: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setContactOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [contactOpen])

  const switchLang = (newLang: 'pl' | 'de') => {
    const service = isWood ? 'konstrukcje' : 'renowacja'
    if (newLang === 'de') {
      navigate({ to: '/$lang/' + service, params: { lang: 'de' } })
    } else {
      navigate({ to: '/' + service })
    }
  }

  const switchService = (service: 'wood' | 'cleaning') => {
    const routeSegment = service === 'wood' ? 'konstrukcje' : 'renowacja'
    if (lang === 'de') {
      navigate({ to: '/$lang/' + routeSegment, params: { lang: 'de' } })
    } else {
      navigate({ to: '/' + routeSegment })
    }
    window.scrollTo(0, 0)
    setMenuOpen(false)
  }

  /* Colors */
  const navBg   = scrolled
    ? (isWood ? 'rgba(227,235,212,.95)' : 'rgba(13,17,23,.95)')
    : (isWood ? 'rgba(227,235,212,.6)'  : 'rgba(13,17,23,.65)')
  const navColor = isWood ? 'var(--color-ink)' : '#fff'
  const bd       = isWood ? 'rgba(40,37,34,.38)' : 'rgba(255,255,255,.28)'
  const logo     = isWood ? logoLight : logoDark

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 200,
          background: navBg,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: scrolled
            ? `0 1px 0 ${isWood ? 'rgba(40,37,34,.15)' : 'rgba(255,255,255,.08)'}`
            : 'none',
          transition: 'background .35s var(--ease)',
          color: navColor,
          fontFamily: 'Oswald, sans-serif',
        }}
      >
        <div style={{
          maxWidth: 1400, margin: '0 auto',
          padding: '0 1.5rem', height: navOverflow ? 76 : 64,
          transition: 'height .2s var(--ease)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '1rem',
        }}>

          {/* Logo + Service switcher — pinned left on all viewports */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
            <a
              href="."
              onClick={e => { e.preventDefault(); window.history.replaceState(null, '', window.location.pathname); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            >
              <img src={logo} alt="Queistal" style={{ height: 32, display: 'block' }} />
            </a>

            <div style={{
              display: 'flex', borderRadius: 40, overflow: 'hidden',
              border: `1.5px solid ${isWood ? 'rgba(40,37,34,.22)' : 'rgba(255,255,255,.18)'}`,
            }}>
              {(['wood', 'cleaning'] as const).map(s => {
                const active = isWood ? s === 'wood' : s === 'cleaning'
                return (
                  <button
                    key={s}
                    onClick={() => switchService(s)}
                    style={{
                      padding: '6px 14px',
                      fontSize: 11, fontWeight: 400, letterSpacing: 2,
                      background: active
                        ? (isWood ? 'var(--color-ink)' : 'var(--color-sage)')
                        : 'transparent',
                      color: active
                        ? (isWood ? '#fff' : 'var(--color-ink)')
                        : navColor,
                      transition: 'background .2s, color .2s',
                      fontFamily: 'Oswald, sans-serif',
                      cursor: 'pointer', border: 'none',
                    }}
                  >
                    {t(`services.${s}`)}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Desktop nav links */}
          <div
            ref={linksRef}
            className="desk-links"
            style={{
              display: 'flex', gap: '1.5rem',
              flex: 1, justifyContent: 'flex-start',
              overflowX: 'auto', scrollbarWidth: 'thin',
              scrollbarColor: `${isWood ? 'rgba(40,37,34,.25)' : 'rgba(255,255,255,.2)'} transparent`,
              paddingBottom: navOverflow ? 1 : 0,
            }}
          >
            {links.map(({ key, anchor }) => (
              <a
                key={key}
                href={anchor}
                style={{
                  fontSize: 11, fontWeight: 400, letterSpacing: 1.5,
                  opacity: 0.6, whiteSpace: 'nowrap',
                  transition: 'opacity .2s', color: 'inherit',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.6' }}
              >
                {t(key)}
              </a>
            ))}
          </div>

          {/* Right cluster: lang + KONTAKT + hamburger */}
          <div style={{ display: 'flex', gap: '.75rem', alignItems: 'center', flexShrink: 0 }}>

            {/* Language switcher */}
            <div className="nav-lang" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 400, letterSpacing: 2 }}>
              {(['pl', 'de'] as const).map((l, i) => (
                <React.Fragment key={l}>
                  {i > 0 && (
                    <span style={{ opacity: 0.2, fontSize: 10 }}>|</span>
                  )}
                  <button
                    onClick={() => switchLang(l)}
                    style={{
                      fontSize: 10, fontWeight: 400, letterSpacing: 2,
                      opacity: lang === l ? 1 : 0.35,
                      color: navColor, fontFamily: 'Oswald, sans-serif',
                      cursor: 'pointer', border: 'none', background: 'none', padding: 0,
                      transition: 'opacity .2s',
                    }}
                  >
                    {l.toUpperCase()}
                  </button>
                </React.Fragment>
              ))}
            </div>

            {/* KONTAKT button + dropdown */}
            <div ref={contactRef} className="nav-kontakt" style={{ position: 'relative' }}>
              <button
                onClick={() => setContactOpen(!contactOpen)}
                style={{
                  border: `1.5px solid ${bd}`, borderRadius: 40,
                  padding: '6px 14px', fontSize: 11, fontWeight: 400, letterSpacing: 2,
                  background: contactOpen
                    ? (isWood ? 'var(--color-ink)' : 'var(--color-sage)')
                    : 'transparent',
                  color: contactOpen
                    ? (isWood ? '#fff' : 'var(--color-ink)')
                    : navColor,
                  transition: 'all .2s',
                  fontFamily: 'Oswald, sans-serif',
                  cursor: 'pointer',
                }}
              >
                KONTAKT
              </button>

              {contactOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                  background: 'var(--color-ink)', color: '#fff',
                  minWidth: 300,
                  boxShadow: '0 24px 60px rgba(0,0,0,.4)',
                  border: '1px dashed rgba(255,255,255,.14)',
                  zIndex: 400,
                  animation: 'fadeIn .15s ease',
                }}>
                  {/* Header row */}
                  <div style={{
                    padding: '10px 18px',
                    borderBottom: '1px dashed rgba(255,255,255,.1)',
                    display: 'flex', justifyContent: 'space-between',
                  }}>
                    <span style={{ fontSize: 10, fontWeight: 400, letterSpacing: 3, opacity: .35 }}>
                      //KONTAKT
                    </span>
                    <span style={{ fontSize: 10, fontWeight: 300, opacity: .22, letterSpacing: 1 }}>
                      QUEIS TAL
                    </span>
                  </div>
                  {/* Primary phone */}
                  <a
                    href={TEL1.href}
                    style={{
                      display: 'flex', flexDirection: 'column', gap: 3,
                      padding: '16px 18px 12px',
                      borderBottom: '1px dashed rgba(255,255,255,.08)',
                      color: '#fff', textDecoration: 'none',
                    }}
                  >
                    <span style={{ fontSize: 10, letterSpacing: 3, opacity: .35, fontWeight: 400 }}>
                      TELEFON GŁÓWNY
                    </span>
                    <span style={{ fontSize: 26, fontWeight: 400 }}>{TEL1.num}</span>
                  </a>
                  {/* Secondary phone */}
                  <a
                    href={TEL2.href}
                    style={{
                      display: 'flex', flexDirection: 'column', gap: 3,
                      padding: '12px 18px',
                      borderBottom: '1px dashed rgba(255,255,255,.08)',
                      color: '#fff', textDecoration: 'none',
                    }}
                  >
                    <span style={{ fontSize: 10, letterSpacing: 3, opacity: .35, fontWeight: 400 }}>
                      TELEFON
                    </span>
                    <span style={{ fontSize: 19, fontWeight: 300, opacity: .7 }}>{TEL2.num}</span>
                  </a>
                  {/* Email */}
                  <a
                    href="mailto:queistal@gmail.com"
                    style={{
                      display: 'flex', flexDirection: 'column', gap: 3,
                      padding: '12px 18px 16px',
                      color: '#fff', textDecoration: 'none',
                    }}
                  >
                    <span style={{ fontSize: 10, letterSpacing: 3, opacity: .35, fontWeight: 400 }}>
                      E-MAIL
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 300, opacity: .65 }}>
                      queistal@gmail.com
                    </span>
                  </a>
                </div>
              )}
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="ham"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{
                display: 'flex', flexDirection: 'column', gap: 5, padding: 4,
                cursor: 'pointer', border: 'none', background: 'none',
              }}
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  style={{
                    display: 'block', width: 22, height: 2,
                    background: navColor,
                    transition: 'transform .25s var(--ease), opacity .2s',
                    transform: menuOpen
                      ? (i === 0 ? 'translateY(7px) rotate(45deg)'
                        : i === 2 ? 'translateY(-7px) rotate(-45deg)'
                          : '')
                      : '',
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile full-screen menu ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 190,
        background: isWood ? 'var(--color-ink)' : '#0d1117',
        color: '#fff',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '0 2rem',
        transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform .32s var(--ease)',
        fontFamily: 'Oswald, sans-serif',
      }}>
        {/* Links */}
        {links.map(({ key, anchor }, i) => (
          <a
            key={key}
            href={anchor}
            onClick={() => setMenuOpen(false)}
            style={{
              fontSize: 'clamp(18px, 5vw, 28px)', fontWeight: 300, lineHeight: 1.3,
              color: '#fff', marginBottom: '.2rem', letterSpacing: 1,
              opacity: 0,
              animation: menuOpen ? `fadeUp .32s ${i * 0.06 + 0.1}s var(--ease) forwards` : 'none',
              borderBottom: '1px dashed rgba(255,255,255,.07)',
              paddingBottom: '.25rem',
              textDecoration: 'none', display: 'block',
            }}
          >
            {t(key)}
          </a>
        ))}

        {/* Contact info */}
        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px dashed rgba(255,255,255,.12)' }}>
          <a href={TEL1.href} style={{ fontSize: 20, color: 'var(--color-sage)', display: 'block', marginBottom: '.2rem', fontWeight: 400 }}>
            {TEL1.num}
          </a>
          <a href={TEL2.href} style={{ fontSize: 16, color: 'rgba(227,235,212,.5)', display: 'block', marginBottom: '.5rem', fontWeight: 300 }}>
            {TEL2.num}
          </a>
          <a href="mailto:queistal@gmail.com" style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', fontWeight: 300 }}>
            queistal@gmail.com
          </a>
        </div>

        {/* Lang switcher */}
        <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          {(['pl', 'de'] as const).map((l, i) => (
            <React.Fragment key={l}>
              {i > 0 && <span style={{ color: 'rgba(255,255,255,.2)', fontSize: 12 }}>|</span>}
              <button
                onClick={() => { switchLang(l); setMenuOpen(false) }}
                style={{
                  fontSize: 11, fontWeight: 400, letterSpacing: 2,
                  color: lang === l ? '#fff' : 'rgba(255,255,255,.35)',
                  fontFamily: 'Oswald, sans-serif',
                  cursor: 'pointer', border: 'none', background: 'none', padding: 0,
                  transition: 'color .2s',
                }}
              >
                {l.toUpperCase()}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Breakpoint rules */}
      <style>{`
        .desk-links::-webkit-scrollbar { height: 3px; }
        .desk-links::-webkit-scrollbar-track { background: transparent; }
        .desk-links::-webkit-scrollbar-thumb { background: rgba(150,150,150,.3); border-radius: 2px; }
        .desk-links::-webkit-scrollbar-thumb:hover { background: rgba(150,150,150,.55); }
        @media (min-width: 900px) { .ham { display: none !important; } }
        @media (max-width: 899px) { .desk-links { display: none !important; } }
        @media (max-width: 600px) {
          .nav-lang    { display: none !important; }
          .nav-kontakt { display: none !important; }
        }
      `}</style>
    </>
  )
}
