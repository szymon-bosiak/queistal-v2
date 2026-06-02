import { defineConfig } from 'vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const SITE_URL = 'https://queistal.pl'

// hreflang alternates for the sitemap (Start generates sitemap.xml natively)
const alt = (plPath: string, dePath: string) => [
  { hreflang: 'pl', href: `${SITE_URL}${plPath}` },
  { hreflang: 'de', href: `${SITE_URL}${dePath}` },
  { hreflang: 'x-default', href: `${SITE_URL}${plPath}` },
]

export default defineConfig({
  plugins: [
    tailwindcss(),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tanstackStart({
      // '/' and '/$lang/' are redirect-only routes — prerender only the explicit
      // content pages below (no auto-discovery, no trailing-slash redirect variants)
      prerender: {
        enabled: true,
        crawlLinks: false,
        autoStaticPathsDiscovery: false,
        // emit `renowacja.html` (not `renowacja/index.html`) so `/renowacja` is served
        // 200 directly — matching the no-trailing-slash canonical (no 307 hop)
        autoSubfolderIndex: false,
      },
      sitemap: { enabled: true, host: SITE_URL },
      pages: [
        { path: '/renowacja', sitemap: { alternateRefs: alt('/renowacja', '/de/renowacja') } },
        { path: '/konstrukcje', sitemap: { alternateRefs: alt('/konstrukcje', '/de/konstrukcje') } },
        { path: '/de/renowacja', sitemap: { alternateRefs: alt('/renowacja', '/de/renowacja') } },
        { path: '/de/konstrukcje', sitemap: { alternateRefs: alt('/konstrukcje', '/de/konstrukcje') } },
      ],
    }),
    viteReact(),
  ],
})
