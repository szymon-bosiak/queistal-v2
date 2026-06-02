import { createFileRoute, redirect } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'

type Lang = 'pl' | 'de'

// SSR-safe language detection: read Host / Accept-Language from the request on the
// server, fall back to hostname / navigator on the client. The `.server` body is
// stripped from the client bundle by Start's compiler.
const detectLanguage = createIsomorphicFn()
  .server((): Lang => {
    const headers = getRequestHeaders()
    const host = headers.get('host') ?? ''
    if (host.endsWith('.de')) return 'de'
    if (host.endsWith('.pl')) return 'pl'
    const accept = headers.get('accept-language') ?? ''
    return accept.toLowerCase().startsWith('de') ? 'de' : 'pl'
  })
  .client((): Lang => {
    const hostname = window.location.hostname
    if (hostname.endsWith('.de')) return 'de'
    if (hostname.endsWith('.pl')) return 'pl'
    return navigator.language.startsWith('de') ? 'de' : 'pl'
  })

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    if (detectLanguage() === 'de') {
      throw redirect({ to: '/$lang/renowacja', params: { lang: 'de' } })
    }
    throw redirect({ to: '/renowacja' })
  },
})
