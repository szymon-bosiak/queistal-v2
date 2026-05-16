import { useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Hero }            from '../../../components/wood/hero'
import { About }           from '../../../components/wood/about'
import { Projects }        from '../../../components/wood/projects'
import { WhyUs }           from '../../../components/wood/why-us'
import { Transformations } from '../../../components/wood/transformations'
import { Testimonials }    from '../../../components/wood/testimonials'
import { Faq }             from '../../../components/wood/faq'

const WoodPage = () => {
  const { t } = useTranslation('common')
  useEffect(() => { document.title = t('pageTitle.wood') }, [t])

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

export const Route = createFileRoute('/$lang/wood/')({
  component: WoodPage,
})
