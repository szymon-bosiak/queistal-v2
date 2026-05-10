import * as Popover from '@radix-ui/react-popover'
import { useTranslation } from 'react-i18next'

interface Props {
  isCleaningTheme: boolean
  fullWidth?: boolean
}

export default function ContactPopover({ isCleaningTheme, fullWidth }: Props) {
  const { t } = useTranslation('common')

  const buttonBorder = isCleaningTheme ? 'border-white text-white' : 'border-ink text-ink'
  const buttonHover = isCleaningTheme ? 'hover:bg-white hover:text-[#0d1117]' : 'hover:bg-ink hover:text-sage'

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className={`
            border px-6 py-2 text-xs tracking-widest transition-all duration-200 cursor-pointer
            ${buttonBorder} ${buttonHover}
            ${fullWidth ? 'w-full' : ''}
            rounded-full
          `}
          style={{ borderWidth: '1.9px' }}
        >
          {t('nav.contact')}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="end"
          sideOffset={12}
          className="z-[100] w-72 outline-none"
          style={{ fontFamily: 'Oswald, sans-serif' }}
        >
          <div
            className="border border-dashed border-ink/40 bg-black/80 text-white"
            style={{
              borderRadius: '20px',
              backdropFilter: 'blur(12.9px)',
              boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
            }}
          >
            {/* Label bar */}
            <div className="border-b border-dashed border-white/20 px-6 py-3">
              <span className="text-xs tracking-widest text-white/60">//KONTAKT</span>
            </div>

            {/* Contact details */}
            <div className="px-6 py-5 flex flex-col gap-5">
              <ContactRow label={t('footer.phone')} value={t('footer.phone')} sublabel="TELEFON GŁÓWNY" />
              <ContactRow label={t('footer.phoneSecondary')} value={t('footer.phoneSecondary')} sublabel="TELEFON" />
              <ContactRow label={t('footer.email')} value={t('footer.email')} sublabel="E-MAIL" isEmail />
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

function ContactRow({ sublabel, value, isEmail }: { label: string; sublabel: string; value: string; isEmail?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] tracking-widest text-white/40 font-light">{sublabel}</span>
      {isEmail ? (
        <a href={`mailto:${value}`} className="text-sm tracking-wider text-white hover:text-white/70 transition-opacity">
          {value}
        </a>
      ) : (
        <a href={`tel:${value.replace(/\s/g, '')}`} className="text-sm tracking-wider text-white hover:text-white/70 transition-opacity">
          {value}
        </a>
      )}
    </div>
  )
}
