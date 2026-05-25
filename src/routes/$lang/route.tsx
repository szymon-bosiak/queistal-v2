import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Nav } from '../../components/shared/nav'
import { Footer } from '../../components/shared/footer'

const SUPPORTED_LANGUAGES = ['de'] as const
export type Language = 'pl' | 'de'

function LangLayout() {
  const { lang } = Route.useParams()
  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(lang)
    document.documentElement.lang = lang
  }, [lang, i18n])

  return (
    <div className="flex flex-col min-h-svh">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export const Route = createFileRoute('/$lang')({
  beforeLoad: ({ params, location }) => {
    if (params.lang === 'pl') {
      const isStructures = location.pathname.includes('/structures')
      throw redirect({ to: isStructures ? '/structures' : '/renovation' })
    }
    if (!SUPPORTED_LANGUAGES.includes(params.lang as (typeof SUPPORTED_LANGUAGES)[number])) {
      throw redirect({ to: '/' })
    }
  },
  component: LangLayout,
})
