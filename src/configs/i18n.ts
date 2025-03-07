import { createInstance, i18n } from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import i18nConfig from 'src/app/i18nConfig'

export default async function initTranslations(
  locale: string,
  namespaces: string[],
  i18nInstance?: i18n,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resources?: any

  // resources?: Record<string, Record<string, string>>
) {
  i18nInstance = i18nInstance || createInstance()

  i18nInstance.use(initReactI18next)

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string, namespace: string) => import(`../../public/locales/${language}/${namespace}.json`)
      )
    )
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[1],
    fallbackNS: namespaces[1],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales
  })

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t
  }
}

export const LANGUAGE_OPTIONS = [
  {
    lang: 'English',
    value: 'en',
    icon: 'circle-flags:lang-en'
  },
  {
    lang: 'Tiếng Việt',
    value: 'vi',
    icon: 'circle-flags:lang-vi'
  }
]
