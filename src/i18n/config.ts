import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import plCommon from './pl/common.json'
import plWood from './pl/wood.json'
import plCleaning from './pl/cleaning.json'
import deCommon from './de/common.json'
import deWood from './de/wood.json'
import deCleaning from './de/cleaning.json'

i18n.use(initReactI18next).init({
  resources: {
    pl: { common: plCommon, wood: plWood, cleaning: plCleaning },
    de: { common: deCommon, wood: deWood, cleaning: deCleaning },
  },
  lng: 'pl',
  fallbackLng: 'pl',
  defaultNS: 'common',
  interpolation: { escapeValue: false },
})

export default i18n
