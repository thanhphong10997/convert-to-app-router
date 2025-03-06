import type { Metadata } from 'next'
import './globals.css'
import i18nConfig from './i18nConfig'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'
import { store } from 'src/stores'
import { StoreWrapper } from 'src/hoc/StoreWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }))
}

export default function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  return (
    <html lang={locale}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
