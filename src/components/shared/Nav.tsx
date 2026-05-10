import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useRouterState } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import logoLight from '../../assets/logos/queistal_logo_txt.svg'
import logoDark from '../../assets/logos/queistal_logo_txt_wht.svg'
import hamburgerIcon from '../../assets/icons/lines_grip.svg'
import ContactPopover from './ContactPopover'

const NAV_LINKS = [
  { key: 'nav.about', anchor: '#about' },
  { key: 'nav.projects', anchor: '#projects' },
  { key: 'nav.whyUs', anchor: '#why-us' },
  { key: 'nav.testimonials', anchor: '#testimonials' },
] as const

export default function Nav() {
  const { t } = useTranslation('common')
  const { lang } = useParams({ strict: false }) as { lang: 'pl' | 'de' }
  const navigate = useNavigate()
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  const isWood = currentPath.includes('/wood')
  const isCleaning = currentPath.includes('/cleaning')
  const isCleaningTheme = isCleaning

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function switchLang(newLang: 'pl' | 'de') {
    const service = isWood ? 'wood' : 'cleaning'
    navigate({ to: '/$lang/' + service, params: { lang: newLang } })
  }

  function switchService(service: 'wood' | 'cleaning') {
    navigate({ to: '/$lang/' + service, params: { lang } })
    setMenuOpen(false)
  }

  const navBg = isCleaningTheme
    ? scrolled
      ? 'bg-[#0d1117]/90 backdrop-blur-md'
      : 'bg-[#0d1117]/55 backdrop-blur-sm'
    : scrolled
      ? 'bg-sage/90 backdrop-blur-md'
      : 'bg-sage/55 backdrop-blur-sm'

  const textColor = isCleaningTheme ? 'text-white' : 'text-ink'
  const borderColor = isCleaningTheme ? 'border-white/20' : 'border-ink/20'
  const logo = isCleaningTheme ? logoDark : logoLight

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg} border-b ${borderColor}`}
        style={{ fontFamily: 'Oswald, sans-serif' }}
      >
        <div className="max-w-[1800px] mx-auto px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Queistal" className="h-7" />
          </Link>

          {/* Desktop nav */}
          <div className={`hidden lg:flex items-center gap-8 ${textColor}`}>
            {NAV_LINKS.map(({ key, anchor }) => (
              <a
                key={key}
                href={anchor}
                className="text-sm font-light tracking-wider hover:opacity-70 transition-opacity"
              >
                {t(key)}
              </a>
            ))}
          </div>

          {/* Desktop right: service switcher + lang + contact */}
          <div className="hidden lg:flex items-center gap-4">
            <ServiceSwitcher
              isWood={isWood}
              isCleaningTheme={isCleaningTheme}
              onSwitch={switchService}
              woodLabel={t('services.wood')}
              cleaningLabel={t('services.cleaning')}
            />

            <LangSwitcher lang={lang} isCleaningTheme={isCleaningTheme} onSwitch={switchLang} />

            <ContactPopover isCleaningTheme={isCleaningTheme} />
          </div>

          {/* Mobile: lang + hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <LangSwitcher lang={lang} isCleaningTheme={isCleaningTheme} onSwitch={switchLang} />
            <button
              onClick={() => setMenuOpen(true)}
              className={`p-1 ${textColor}`}
              aria-label="Open menu"
            >
              <img src={hamburgerIcon} alt="" className="w-6 h-6" style={{ filter: isCleaningTheme ? 'invert(1)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className={`fixed inset-0 z-[60] flex flex-col ${isCleaningTheme ? 'bg-[#0d1117]' : 'bg-ink'}`}>
          <div className="flex items-center justify-between px-8 h-16 border-b border-white/20">
            <img src={logoDark} alt="Queistal" className="h-7" />
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white text-2xl font-light leading-none"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <div className="flex flex-col flex-1 px-8 pt-12 gap-8">
            {NAV_LINKS.map(({ key, anchor }) => (
              <a
                key={key}
                href={anchor}
                onClick={() => setMenuOpen(false)}
                className="text-white text-3xl font-light tracking-widest border-b border-white/10 pb-6"
              >
                {t(key)}
              </a>
            ))}
          </div>

          <div className="px-8 pb-12 flex flex-col gap-6">
            <ServiceSwitcher
              isWood={isWood}
              isCleaningTheme={true}
              onSwitch={switchService}
              woodLabel={t('services.wood')}
              cleaningLabel={t('services.cleaning')}
            />
            <ContactPopover isCleaningTheme={true} fullWidth />
          </div>
        </div>
      )}
    </>
  )
}

function ServiceSwitcher({
  isWood,
  isCleaningTheme,
  onSwitch,
  woodLabel,
  cleaningLabel,
}: {
  isWood: boolean
  isCleaningTheme: boolean
  onSwitch: (s: 'wood' | 'cleaning') => void
  woodLabel: string
  cleaningLabel: string
}) {
  const base = 'px-4 py-1.5 text-xs tracking-widest transition-all duration-200 cursor-pointer'
  const active = isCleaningTheme
    ? 'bg-white text-[#0d1117]'
    : 'bg-ink text-sage'
  const inactive = isCleaningTheme
    ? 'text-white/60 hover:text-white'
    : 'text-ink/50 hover:text-ink'
  const border = isCleaningTheme ? 'border-white/30' : 'border-ink/30'

  return (
    <div className={`flex border ${border} text-xs`}>
      <button className={`${base} ${isWood ? active : inactive}`} onClick={() => onSwitch('wood')}>
        {woodLabel}
      </button>
      <button className={`${base} ${!isWood ? active : inactive} border-l ${border}`} onClick={() => onSwitch('cleaning')}>
        {cleaningLabel}
      </button>
    </div>
  )
}

function LangSwitcher({
  lang,
  isCleaningTheme,
  onSwitch,
}: {
  lang: 'pl' | 'de'
  isCleaningTheme: boolean
  onSwitch: (l: 'pl' | 'de') => void
}) {
  const textColor = isCleaningTheme ? 'text-white' : 'text-ink'
  const dimColor = isCleaningTheme ? 'text-white/40' : 'text-ink/40'
  const divider = isCleaningTheme ? 'text-white/20' : 'text-ink/20'

  return (
    <div className={`flex items-center gap-2 text-xs tracking-widest ${textColor}`}>
      <button
        onClick={() => onSwitch('pl')}
        className={`transition-opacity ${lang === 'pl' ? 'font-medium' : `${dimColor} hover:opacity-80`}`}
      >
        PL
      </button>
      <span className={divider}>|</span>
      <button
        onClick={() => onSwitch('de')}
        className={`transition-opacity ${lang === 'de' ? 'font-medium' : `${dimColor} hover:opacity-80`}`}
      >
        DE
      </button>
    </div>
  )
}
