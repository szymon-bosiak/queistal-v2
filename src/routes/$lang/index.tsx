import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/')({
  beforeLoad: ({ params }) => {
    throw redirect({ to: '/$lang/cleaning', params: { lang: params.lang } })
  },
})
