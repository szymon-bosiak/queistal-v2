import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

const SUPPORTED_LANGUAGES = ['pl', 'de'] as const
export type Language = (typeof SUPPORTED_LANGUAGES)[number]

export const Route = createFileRoute('/$lang')({
  beforeLoad: ({ params }) => {
    if (!SUPPORTED_LANGUAGES.includes(params.lang as Language)) {
      throw redirect({ to: '/' })
    }
  },
  component: () => <Outlet />,
})
