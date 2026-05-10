import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/czyszczenie')({
  component: CzyszczeniePage,
})

function CzyszczeniePage() {
  return (
    <main>
      <h1>CZYSZCZENIE</h1>
    </main>
  )
}
