import React from 'react'
import initTranslations from '~/configs/i18n'
import TranslationProvider from '~/app/[locale]/TranslationProvider'

const i18nNamespaces = ['translation']

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Layout({ children, params: { locale } }: any) {
  const { resources } = await initTranslations(locale, i18nNamespaces)

  return (
    <TranslationProvider locale={locale} resources={resources} namespaces={i18nNamespaces}>
      {children}
    </TranslationProvider>
  )
}
