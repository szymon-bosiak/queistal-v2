import { createFileRoute, Outlet } from '@tanstack/react-router'
import { I18nextProvider } from 'react-i18next'
import { plI18n } from '../i18n/config'
import { Nav } from '../components/shared/nav'
import { Footer } from '../components/shared/footer'

function PlLayout() {
  return (
    <I18nextProvider i18n={plI18n}>
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

export const Route = createFileRoute('/_pl')({
  component: PlLayout,
})
