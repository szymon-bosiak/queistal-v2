# Queistal v2

> Bilingual (PL / DE) marketing website for two service businesses — professional cleaning and wood restoration. Built with React 19, Vite, and TanStack Router.

---

## Features

- **Bilingual** — Polish and German, auto-detected from domain extension or browser language
- **Two service verticals** — dedicated pages for Cleaning and Wood services
- **Animations** — Framer Motion page transitions and scroll-reveal effects
- **File-based routing** — TanStack React Router with `/:lang/cleaning` and `/:lang/wood` routes
- **Fully typed** — TypeScript strict mode throughout

---

## Tech Stack

| Category       | Tool                                      |
| -------------- | ----------------------------------------- |
| Framework      | React 19 + Vite 5                         |
| Language       | TypeScript 6                              |
| Routing        | TanStack React Router                     |
| Styling        | Tailwind CSS v4                           |
| Animations     | Framer Motion                             |
| i18n           | i18next + react-i18next                   |
| UI Primitives  | Radix UI (Accordion, Dialog, Popover)     |
| Scroll Reveal  | react-intersection-observer               |

---

## Getting Started

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # type-check + production build → dist/
npm run preview  # serve the production build locally
npm run lint     # ESLint
```

---

## Project Structure

```
src/
├── components/
│   ├── cleaning/     # Hero, Services, Before/After, Process, FAQ, …
│   ├── wood/         # Hero, About, Projects, Transformations, FAQ, …
│   └── shared/       # Nav, Footer, BpBox, Reveal
├── routes/
│   ├── __root.tsx    # Root layout
│   ├── index.tsx     # Language detector & redirect
│   └── $lang/
│       ├── cleaning/ # /pl/cleaning, /de/cleaning
│       └── wood/     # /pl/wood, /de/wood
├── i18n/
│   ├── pl/           # common.json, cleaning.json, wood.json
│   └── de/           # common.json, cleaning.json, wood.json
├── hooks/
│   └── useInView.ts  # IntersectionObserver hook for scroll reveals
└── assets/           # Images, icons, logos
```

---

## Language Detection

Language is resolved in this order:

1. Domain extension — `.pl` → Polish, `.de` → German
2. Browser language — `de*` → German
3. Default → Polish

The resolved language becomes the `/:lang` route prefix.

---

## Design Tokens

Defined in `src/index.css` via Tailwind's `@theme`:

| Token                  | Value     | Usage                  |
| ---------------------- | --------- | ---------------------- |
| `--color-sage`         | `#E3EBD4` | Light background       |
| `--color-ink`          | `#282522` | Primary text           |
| `--color-blueprint`    | `#0d1117` | Dark section bg        |
| `--color-white`        | `#ffffff` | White                  |

**Font:** Oswald (weights 200 – 500, Google Fonts)
