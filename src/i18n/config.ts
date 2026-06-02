import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import plCommon from './pl/common.json'
import plWood from './pl/wood.json'
import plCleaning from './pl/cleaning.json'
import deCommon from './de/common.json'
import deWood from './de/wood.json'
import deCleaning from './de/cleaning.json'

const resources = {
  pl: { common: plCommon, wood: plWood, cleaning: plCleaning },
  de: { common: deCommon, wood: deWood, cleaning: deCleaning },
}

// One fixed instance per language. Resources are inline, so init() is synchronous
// and SSR-safe — each instance always renders its own language, with no shared
// mutable state (no changeLanguage on the server, no cross-request races).
export function createI18n(lng: 'pl' | 'de') {
  const instance = i18next.createInstance()
  instance.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: 'pl',
    defaultNS: 'common',
    interpolation: { escapeValue: false },
  })
  return instance
}

export const plI18n = createI18n('pl')
export const deI18n = createI18n('de')
