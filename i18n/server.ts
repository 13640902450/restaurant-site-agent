import 'server-only'

import { cookies, headers } from 'next/headers'
import Negotiator from 'negotiator'
import { match } from '@formatjs/intl-localematcher'
import type { Locale } from '.'
import { i18n } from '.'

export const getLocaleOnServer = (): Locale => {
  // @ts-expect-error locales are readonly
  const locales: string[] = i18n.locales

  let languages: string[] | undefined
  // get locale from cookie
  const localeCookie = cookies().get('locale')
  languages = localeCookie?.value ? [localeCookie.value] : []

  if (!languages.length) {
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {}
    headers().forEach((value, key) => (negotiatorHeaders[key] = value))
    // Use negotiator and intl-localematcher to get best locale
    languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  }

  // 无 Accept-Language 头的请求（部分客户端/爬虫）会让 Negotiator 返回 ['*']，
  // 而 match() 内部调用 Intl.getCanonicalLocales('*') 会抛 RangeError，导致整页 500
  const acceptedLanguages = languages.filter(language => language && language !== '*')
  if (!acceptedLanguages.length)
    return i18n.defaultLocale

  try {
    // match locale
    const matchedLocale = match(acceptedLanguages, locales, i18n.defaultLocale) as Locale
    return matchedLocale
  }
  catch {
    return i18n.defaultLocale
  }
}
