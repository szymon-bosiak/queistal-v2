import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/cleaning/')({
  component: CleaningPage,
})

function CleaningPage() {
  return <main>Cleaning</main>
}
