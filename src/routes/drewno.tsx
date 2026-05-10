import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/drewno')({
  component: DrewnoPage,
})

function DrewnoPage() {
  return (
    <main>
      <h1>DREWNO</h1>
    </main>
  )
}
