import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/')({
  beforeLoad: ({ params }) => {
    throw redirect({ to: '/$lang/wood', params: { lang: params.lang } })
  },
})
