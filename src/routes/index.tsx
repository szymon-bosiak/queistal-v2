import { createFileRoute, redirect } from '@tanstack/react-router'

function detectLanguage(): 'pl' | 'de' {
  const hostname = window.location.hostname
  if (hostname.endsWith('.pl')) return 'pl'
  if (hostname.endsWith('.de')) return 'de'
  return navigator.language.startsWith('de') ? 'de' : 'pl'
}

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const lang = detectLanguage()
    throw redirect({ to: '/$lang/renovation', params: { lang } })
  },
})
