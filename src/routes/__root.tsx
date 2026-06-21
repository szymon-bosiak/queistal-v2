import {
  HeadContent,
  Scripts,
  createRootRoute,
  useRouterState,
} from '@tanstack/react-router'
import { useEffect } from 'react'
import type { ReactNode } from 'react'
import indexCss from '../index.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'UTF-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'theme-color', content: '#0d1117' },
      { title: 'Queistal - Renowacja i konstrukcje drewniane' },
    ],
    links: [
      { rel: 'stylesheet', href: indexCss },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

/**
 * Scrolls to the URL hash target on a hard page load.
 *
 * TanStack Router's `scrollRestoration` forces the scroll position back to the
 * top on the initial navigation, ignoring the `#section` in the URL. We re-apply
 * the scroll for a short window after mount (the router resets it post-hydration,
 * and layout can shift as fonts/images settle), bailing out as soon as the user
 * scrolls themselves so we never fight their input.
 */
function HashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return

    let cancelled = false
    const stop = () => { cancelled = true }
    // Any user-initiated scroll cancels our correction loop.
    window.addEventListener('wheel', stop, { passive: true, once: true })
    window.addEventListener('touchmove', stop, { passive: true, once: true })
    window.addEventListener('keydown', stop, { once: true })

    const start = performance.now()
    let settledFrames = 0
    let lastY = -1
    const tick = () => {
      if (cancelled) return
      const el = document.getElementById(id)
      if (el) el.scrollIntoView()
      // We're settled once the position holds steady (and isn't 0, which is the
      // router/browser yanking us back to the top) across a few frames.
      if (window.scrollY > 0 && window.scrollY === lastY) settledFrames++
      else settledFrames = 0
      lastY = window.scrollY
      // Stop once settled, but keep correcting up to ~700ms to outlast the
      // router reset + layout shifts from fonts/images loading.
      if (settledFrames < 3 && performance.now() - start < 700) {
        requestAnimationFrame(tick)
      }
    }
    requestAnimationFrame(tick)

    return () => {
      cancelled = true
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchmove', stop)
      window.removeEventListener('keydown', stop)
    }
  }, [])

  return null
}

function RootDocument({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const lang = pathname.startsWith('/de') ? 'de' : 'pl'

  return (
    <html lang={lang}>
      <head>
        <HeadContent />
      </head>
      <body>
        <HashScroll />
        {children}
        <Scripts />
      </body>
    </html>
  )
}
