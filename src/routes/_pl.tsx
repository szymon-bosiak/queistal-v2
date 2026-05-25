import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Nav } from '../components/shared/nav'
import { Footer } from '../components/shared/footer'

function PlLayout() {
  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage('pl')
    document.documentElement.lang = 'pl'
  }, [i18n])

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

export const Route = createFileRoute('/_pl')({
  component: PlLayout,
})
