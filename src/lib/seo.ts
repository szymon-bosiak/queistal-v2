import type { Language } from '../routes/$lang/route'

const SITE_URL = 'https://queistal.pl'

type Service = 'renovation' | 'structures'

type SeoEntry = {
  title: string
  description: string
  serviceName: string
  imageAlt: string
}

const SEO_COPY: Record<Language, Record<Service, SeoEntry>> = {
  pl: {
    renovation: {
      title: 'Queistal - Czyszczenie laserowe i piaskowanie',
      description:
        'Profesjonalna renowacja powierzchni: czyszczenie laserowe, piaskowanie i usuwanie rdzy, farb oraz nalotow z kamienia, metalu, drewna i betonu.',
      serviceName: 'Czyszczenie laserowe i piaskowanie',
      imageAlt: 'Renowacja powierzchni Queistal',
    },
    structures: {
      title: 'Queistal - Konstrukcje drewniane i renowacja drewna',
      description:
        'Projektujemy i wykonujemy konstrukcje drewniane, wiezby dachowe, meble ogrodowe oraz renowacje antykow i elementow architektury drewnianej.',
      serviceName: 'Konstrukcje drewniane i renowacja drewna',
      imageAlt: 'Konstrukcje drewniane Queistal',
    },
  },
  de: {
    renovation: {
      title: 'Queistal - Laserreinigung und Sandstrahlen',
      description:
        'Professionelle Oberflaechenrestaurierung: Laserreinigung, Sandstrahlen und Entfernung von Rost, Farbe und Belag auf Stein, Metall, Holz und Beton.',
      serviceName: 'Laserreinigung und Sandstrahlen',
      imageAlt: 'Oberflaechenrestaurierung von Queistal',
    },
    structures: {
      title: 'Queistal - Holzkonstruktionen und Holzrestaurierung',
      description:
        'Wir planen und bauen Holzkonstruktionen, Dachstuehle, Gartenmoebel und restaurieren Antiquitaeten sowie Elemente der Holzarchitektur.',
      serviceName: 'Holzkonstruktionen und Holzrestaurierung',
      imageAlt: 'Holzkonstruktionen von Queistal',
    },
  },
}

const LANGUAGES = ['pl', 'de'] as const

const SERVICE_SCHEMA_TYPE: Record<Service, string> = {
  renovation: 'HomeAndConstructionBusiness',
  structures: 'GeneralContractor',
}

export const getCanonicalUrl = (lang: Language, service: Service) =>
  lang === 'pl' ? `${SITE_URL}/${service}` : `${SITE_URL}/${lang}/${service}`

export const getSeo = (lang: Language, service: Service) => {
  const seo = SEO_COPY[lang][service]
  const canonical = getCanonicalUrl(lang, service)

  return {
    meta: [
      { title: seo.title },
      { name: 'description', content: seo.description },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Queistal' },
      { property: 'og:locale', content: lang === 'pl' ? 'pl_PL' : 'de_DE' },
      { property: 'og:title', content: seo.title },
      { property: 'og:description', content: seo.description },
      { property: 'og:url', content: canonical },
      { property: 'og:image:alt', content: seo.imageAlt },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: seo.title },
      { name: 'twitter:description', content: seo.description },
      {
        'script:ld+json': {
          '@context': 'https://schema.org',
          '@type': SERVICE_SCHEMA_TYPE[service],
          name: `Queistal - ${seo.serviceName}`,
          url: canonical,
          description: seo.description,
          areaServed: ['PL', 'DE'],
          email: 'queistal@gmail.com',
          telephone: '+48782243640',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'ul. Kosciuszki 19c',
            postalCode: '67-320',
            addressLocality: 'Malomice',
            addressCountry: 'PL',
          },
        },
      },
    ],
    links: [
      { rel: 'canonical', href: canonical },
      ...LANGUAGES.map((alternateLang) => ({
        rel: 'alternate',
        hrefLang: alternateLang,
        href: getCanonicalUrl(alternateLang, service),
      })),
      {
        rel: 'alternate',
        hrefLang: 'x-default',
        href: getCanonicalUrl('pl', service),
      },
    ],
  }
}
