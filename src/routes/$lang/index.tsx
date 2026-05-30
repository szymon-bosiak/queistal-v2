import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/')({
  beforeLoad: ({ params }) => {
    throw redirect({ to: '/$lang/renowacja', params: { lang: params.lang } })
  },
})
