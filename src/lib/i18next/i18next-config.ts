import dayjs from 'dayjs'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import {get} from 'lodash-es'
import {initReactI18next} from 'react-i18next'
import type {LiteralUnion} from 'type-fest'

import SpainFlag from '@/assets/icons/flags/spain.svg'
import UKFlag from '@/assets/icons/flags/uk.svg'
import {dayjsLocaleMap} from '@/lib/dayjs/dayjs-locales'

import * as en from './resources/en'
import * as es from './resources/es'

export const defaultNS = 'common'

export const supportedLanguages = [
  {
    label: 'English',
    value: 'en',
    flag: UKFlag,
  },
  {
    label: 'Spanish',
    value: 'es',
    flag: SpainFlag,
  },
] as const

export const resources = {en, es} as const
// Extract the 'value' properties from the supportedLanguages array
export type SupportedLanguages = (typeof supportedLanguages)[number]['value']

// Now 'SupportedLanguages' is equivalent to 'en' | 'es'
export type Language = LiteralUnion<SupportedLanguages, string>

void i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    ns: ['common'],
    supportedLngs: supportedLanguages.map((langauge) => langauge.value),
    defaultNS,
    resources,
    fallbackLng: 'en',
    detection: {
      order: [
        'localStorage',
        'querystring',
        'cookie',
        'sessionStorage',
        'navigator',
        'htmlTag',
        'path',
        'subdomain',
      ],
    },
  })

i18n.on('languageChanged', (lang) => {
  dayjs.locale(undefined, get(dayjsLocaleMap, lang))
})
export default i18n
