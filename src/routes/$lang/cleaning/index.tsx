import { createFileRoute } from '@tanstack/react-router'
import { Hero }         from '../../../components/cleaning/hero'
import { Services }     from '../../../components/cleaning/services'
import { BeforeAfter }  from '../../../components/cleaning/before-after'
import { Video }        from '../../../components/cleaning/video'
import { Applications } from '../../../components/cleaning/applications'
import { Process }      from '../../../components/cleaning/process'
import { WhyUs }        from '../../../components/cleaning/why-us'
import { Faq }          from '../../../components/cleaning/faq'

const CleaningPage = () => (
  <>
    <Hero />
    <Services />
    <BeforeAfter />
    <Video />
    <Applications />
    <Process />
    <WhyUs />
    <Faq />
  </>
)

export const Route = createFileRoute('/$lang/cleaning/')({
  component: CleaningPage,
})
