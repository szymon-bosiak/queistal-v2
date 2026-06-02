import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { I18nextProvider } from 'react-i18next'
import { deI18n } from '../../i18n/config'
import { Nav } from '../../components/shared/nav'
import { Footer } from '../../components/shared/footer'

const SUPPORTED_LANGUAGES = ['de'] as const
export type { Language } from '../../lib/seo'

function LangLayout() {
  return (
    <I18nextProvider i18n={deI18n}>
      <div className="flex flex-col min-h-svh">
        <Nav />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </I18nextProvider>
  )
}

export const Route = createFileRoute('/$lang')({
  beforeLoad: ({ params, location }) => {
    if (params.lang === 'pl') {
      const isStructures = location.pathname.includes('/konstrukcje')
      throw redirect({ to: isStructures ? '/konstrukcje' : '/renowacja' })
    }
    if (!SUPPORTED_LANGUAGES.includes(params.lang as (typeof SUPPORTED_LANGUAGES)[number])) {
      throw redirect({ to: '/' })
    }
  },
  component: LangLayout,
})
