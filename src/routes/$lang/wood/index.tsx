import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/wood/')({
  component: WoodPage,
})

function WoodPage() {
  return <main>Wood</main>
}
