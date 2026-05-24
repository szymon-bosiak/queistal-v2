import { useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Hero }         from '../../../components/cleaning/hero'
import { Services }     from '../../../components/cleaning/services'
import { BeforeAfter }  from '../../../components/cleaning/before-after'
import { Video }        from '../../../components/cleaning/video'
import { Applications } from '../../../components/cleaning/applications'
import { Process }      from '../../../components/cleaning/process'
import { Testimonials } from '../../../components/cleaning/testimonials'
import { WhyUs }        from '../../../components/cleaning/why-us'
import { Gallery }      from '../../../components/cleaning/gallery'
import { Faq }          from '../../../components/cleaning/faq'

const CleaningPage = () => {
  const { t } = useTranslation('common')
  useEffect(() => { document.title = t('pageTitle.cleaning') }, [t])

  return (
    <>
      <Hero />
      <Services />
      <BeforeAfter />
      <Video />
      <Applications />
      <Process />
      <Testimonials />
      <WhyUs />
      <Gallery />
      <Faq />
    </>
  )
}

export const Route = createFileRoute('/$lang/cleaning/')({
  component: CleaningPage,
})
