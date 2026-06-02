import { writeFileSync, readFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import type { Plugin } from 'vite'
import { getSeo, getCanonicalUrl, getCanonicalPath, SERVICES, LANGUAGES } from './src/lib/seo'

const SITE_URL = 'https://queistal.pl'

const esc = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

type MetaItem = Record<string, unknown>
type LinkItem = Record<string, string>

/** Serialize the meta array from getSeo() into <head> HTML (excluding <title>). */
function metaToHtml(meta: MetaItem[]): { title: string; tags: string } {
  let title = ''
  const tags: string[] = []
  for (const item of meta) {
    if ('title' in item) {
      title = String(item.title)
    } else if ('script:ld+json' in item) {
      const json = JSON.stringify(item['script:ld+json'])
      tags.push(`<script type="application/ld+json">${json}</script>`)
    } else if ('name' in item) {
      tags.push(`<meta name="${esc(String(item.name))}" content="${esc(String(item.content))}" />`)
    } else if ('property' in item) {
      tags.push(`<meta property="${esc(String(item.property))}" content="${esc(String(item.content))}" />`)
    }
  }
  return { title, tags: tags.join('\n    ') }
}

function linksToHtml(links: LinkItem[]): string {
  return links
    .map((l) =>
      l.hrefLang
        ? `<link rel="${esc(l.rel)}" hreflang="${esc(l.hrefLang)}" href="${esc(l.href)}" />`
        : `<link rel="${esc(l.rel)}" href="${esc(l.href)}" />`,
    )
    .join('\n    ')
}

/** Inject route-specific head into the SPA template (swaps <title>, appends the rest). */
function buildHtml(template: string, head: ReturnType<typeof getSeo>): string {
  const { title, tags } = metaToHtml(head.meta as MetaItem[])
  const links = linksToHtml(head.links as LinkItem[])
  const headBlock = `${tags}\n    ${links}\n  </head>`
  // Use function replacers so `$` in content (e.g. priceRange "$$") isn't
  // interpreted as a String.replace special pattern.
  return template
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(title)}</title>`)
    .replace('</head>', () => headBlock)
}

function buildSitemap(): string {
  const lastmod = new Date().toISOString().slice(0, 10)
  const urls: string[] = []

  // Homepage
  urls.push(
    `  <url>\n    <loc>${SITE_URL}/</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`,
  )

  // Service pages with hreflang alternates
  for (const service of SERVICES) {
    for (const lang of LANGUAGES) {
      const alternates = LANGUAGES.map(
        (l) =>
          `    <xhtml:link rel="alternate" hreflang="${l}" href="${getCanonicalUrl(l, service)}" />`,
      )
      alternates.push(
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${getCanonicalUrl('pl', service)}" />`,
      )
      urls.push(
        `  <url>\n    <loc>${getCanonicalUrl(lang, service)}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alternates.join('\n')}\n  </url>`,
      )
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`
}

export function seoPrerender(): Plugin {
  return {
    name: 'seo-prerender',
    apply: 'build',
    closeBundle() {
      const outDir = 'dist'
      const templatePath = join(outDir, 'index.html')
      const template = readFileSync(templatePath, 'utf-8')

      // Per-route static HTML with correct <head>
      for (const service of SERVICES) {
        for (const lang of LANGUAGES) {
          const head = getSeo(lang, service)
          const html = buildHtml(template, head)
          const path = getCanonicalPath(lang, service) // e.g. /renowacja, /de/konstrukcje
          const filePath = join(outDir, path, 'index.html')
          mkdirSync(dirname(filePath), { recursive: true })
          writeFileSync(filePath, html)
        }
      }

      // Homepage ('/' redirects to /renowacja) — bake PL renovation meta as default
      writeFileSync(templatePath, buildHtml(template, getSeo('pl', 'renovation')))

      // Sitemap (single source of truth = seo.ts)
      writeFileSync(join(outDir, 'sitemap.xml'), buildSitemap())

      const total = SERVICES.length * LANGUAGES.length
      console.log(`seo-prerender: wrote ${total} route HTML files + sitemap.xml`)
    },
  }
}
