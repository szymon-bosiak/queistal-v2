import { createFileRoute } from '@tanstack/react-router'
import { Hero }            from '../../../components/wood/hero'
import { About }           from '../../../components/wood/about'
import { Projects }        from '../../../components/wood/projects'
import { WhyUs }           from '../../../components/wood/why-us'
import { Transformations } from '../../../components/wood/transformations'
import { Testimonials }    from '../../../components/wood/testimonials'
import { Faq }             from '../../../components/wood/faq'
import { getSeo }          from '../../../lib/seo'
import type { Language }   from '../route'

const StructuresPage = () => {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <WhyUs />
      <Transformations />
      <Testimonials />
      <Faq />
    </>
  )
}

export const Route = createFileRoute('/$lang/structures/')({
  head: ({ params }) => getSeo(params.lang as Language, 'structures'),
  component: StructuresPage,
})
