import { useTranslation } from 'react-i18next'
import { useRouterState, useParams, Link } from '@tanstack/react-router'
import logoWhite from '../../assets/logos/queistal_logo_txt_wht.svg'

const WOOD_NAV_LINKS = [
  { key: 'nav.about', anchor: '#about' },
  { key: 'nav.projects', anchor: '#projects' },
  { key: 'nav.whyUs', anchor: '#why-us' },
  { key: 'nav.testimonials', anchor: '#testimonials' },
  { key: 'nav.faq', anchor: '#faq' },
]

const CLEANING_NAV_LINKS = [
  { key: 'nav.about', anchor: '#services' },
  { key: 'nav.projects', anchor: '#before-after' },
  { key: 'nav.whyUs', anchor: '#applications' },
  { key: 'nav.testimonials', anchor: '#testimonials' },
  { key: 'nav.faq', anchor: '#faq' },
]

export default function Footer() {
  const { t } = useTranslation('common')
  const { lang } = useParams({ strict: false }) as { lang: 'pl' | 'de' }
  const routerState = useRouterState()
  const isCleaningTheme = routerState.location.pathname.includes('/cleaning')

  const bg = isCleaningTheme ? 'bg-[#0d1117]' : 'bg-ink'
  const borderStyle = isCleaningTheme ? 'border-dashed' : 'border-solid'
  const navLinks = isCleaningTheme ? CLEANING_NAV_LINKS : WOOD_NAV_LINKS

  return (
    <footer
      className={`${bg} text-white`}
      style={{ fontFamily: 'Oswald, sans-serif' }}
    >
      {/* Top contact strip */}
      <div className={`border-b ${borderStyle} border-white/20`}>
        <div className="max-w-[1800px] mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="text-[clamp(28px,5vw,48px)] font-light tracking-wider leading-tight">
              <a href={`tel:${t('footer.phone').replace(/\s/g, '')}`} className="hover:text-white/70 transition-opacity block">
                {t('footer.phone')}
              </a>
              <a href={`tel:${t('footer.phoneSecondary').replace(/\s/g, '')}`} className="hover:text-white/70 transition-opacity block text-white/60">
                {t('footer.phoneSecondary')}
              </a>
            </div>
            <a
              href={`mailto:${t('footer.email')}`}
              className="block mt-3 text-[clamp(18px,3vw,33px)] font-light tracking-wider text-white/70 hover:text-white transition-opacity"
            >
              {t('footer.email')}
            </a>
          </div>
          <img src={logoWhite} alt="Queistal" className="h-8 opacity-80" />
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-[1800px] mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Company info */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] tracking-widest text-white/40 font-light">//QUEIS TAL</span>
          <p className="text-sm font-light text-white/70 leading-relaxed">
            QUEIS TAL Sp. z o.o.
          </p>
          <p className="text-sm font-light text-white/50 leading-relaxed">
            {t('footer.address')}
          </p>
        </div>

        {/* Services */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] tracking-widest text-white/40 font-light">//USŁUGI</span>
          <Link
            to="/$lang/wood"
            params={{ lang }}
            className="text-sm font-light text-white/70 hover:text-white transition-opacity"
          >
            {t('services.wood')}
          </Link>
          <Link
            to="/$lang/cleaning"
            params={{ lang }}
            className="text-sm font-light text-white/70 hover:text-white transition-opacity"
          >
            {t('services.cleaning')}
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] tracking-widest text-white/40 font-light">//NAWIGACJA</span>
          {navLinks.map(({ key, anchor }) => (
            <a
              key={key}
              href={anchor}
              className="text-sm font-light text-white/70 hover:text-white transition-opacity"
            >
              {t(key)}
            </a>
          ))}
        </div>
      </div>

      {/* Legal bar */}
      <div className={`border-t ${borderStyle} border-white/10`}>
        <div className="max-w-[1800px] mx-auto px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-[11px] font-light tracking-wider text-white/30">
            {t('footer.rights')}
          </p>
          <p className="text-[11px] font-light tracking-wider text-white/20">
            {t('footer.tagline')}
          </p>
        </div>
      </div>
    </footer>
  )
}
