export type Language = 'pl' | 'de'

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
      title: 'Queistal — Czyszczenie laserowe, piaskowanie i renowacja powierzchni',
      description:
        'Profesjonalna renowacja: czyszczenie laserowe i piaskowanie korundem, sodą lub mikrokulkami szklanymi. Usuwanie rdzy, farb i nalotów z kamienia, metalu, drewna i betonu.',
      serviceName: 'Czyszczenie laserowe i piaskowanie powierzchni',
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
      title: 'Queistal — Laserreinigung, Sandstrahlen und Oberflächenrestaurierung',
      description:
        'Professionelle Restaurierung: Laserreinigung und Strahlen mit Korund, Soda oder Glasperlen. Entfernung von Rost, Farbe und Ablagerungen auf Stein, Metall, Holz und Beton.',
      serviceName: 'Laserreinigung und Oberflächenstrahlen',
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

export const SERVICES: Service[] = ['renovation', 'structures']
export { LANGUAGES }

/** Path part of the canonical URL (no domain), used for prerender output + sitemap. */
export const getCanonicalPath = (lang: Language, service: Service) =>
  getCanonicalUrl(lang, service).replace(SITE_URL, '') || '/'

const SERVICE_SCHEMA_TYPE: Record<Service, string> = {
  renovation: 'HomeAndConstructionBusiness',
  structures: 'GeneralContractor',
}

// Route slug for each service. Both languages share the Polish slug
// (PL: /renowacja, DE: /de/renowacja) — must match src/routes.
const SERVICE_SLUG: Record<Service, string> = {
  renovation: 'renowacja',
  structures: 'konstrukcje',
}

export const getCanonicalUrl = (lang: Language, service: Service) => {
  const slug = SERVICE_SLUG[service]
  return lang === 'pl' ? `${SITE_URL}/${slug}` : `${SITE_URL}/${lang}/${slug}`
}

const OG_IMAGE = `${SITE_URL}/og-image.jpg`

// Realny obszar działania — sygnał dla local SEO (zamiast ogólnego PL/DE).
// Niemcy: Brandenburgia i Saksonia graniczą z woj. lubuskim i dolnośląskim.
const AREA_SERVED: Record<Language, string[]> = {
  pl: ['województwo lubuskie', 'województwo dolnośląskie', 'Brandenburgia', 'Saksonia'],
  de: ['Woiwodschaft Lebus', 'Woiwodschaft Niederschlesien', 'Brandenburg', 'Sachsen'],
}

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
      { property: 'og:image', content: OG_IMAGE },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:image:alt', content: seo.imageAlt },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seo.title },
      { name: 'twitter:description', content: seo.description },
      { name: 'twitter:image', content: OG_IMAGE },
      { name: 'twitter:image:alt', content: seo.imageAlt },
      {
        'script:ld+json': {
          '@context': 'https://schema.org',
          '@type': SERVICE_SCHEMA_TYPE[service],
          name: `Queistal - ${seo.serviceName}`,
          url: canonical,
          description: seo.description,
          image: OG_IMAGE,
          logo: `${SITE_URL}/favicon.svg`,
          priceRange: '$$',
          areaServed: AREA_SERVED[lang],
          email: 'queistal@gmail.com',
          telephone: '+48782243640',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'ul. Kosciuszki 19c',
            postalCode: '67-320',
            addressLocality: 'Malomice',
            addressCountry: 'PL',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 51.5588039,
            longitude: 15.4484813,
          },
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '16:00',
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
