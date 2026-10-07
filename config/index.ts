import type { AppInfo } from '@/types/app'
export const APP_ID = `${process.env.NEXT_PUBLIC_APP_ID}`
export const API_KEY = `${process.env.NEXT_PUBLIC_APP_KEY}`
export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`
export const IS_WORKFLOW = `${process.env.NEXT_PUBLIC_APP_TYPE_WORKFLOW}` === 'true'
export const APP_INFO: AppInfo = {
  title: '智能餐饮选址 Agent',
  description: '输入投资、租金、人力、客流、毛利率与商圈信息，快速获得餐饮点位可行性评估。',
  copyright: '智能餐饮选址 Agent',
  privacy_policy: '',
  default_language: 'zh-Hans',
}

export const API_PREFIX = `${process.env.NEXT_PUBLIC_API_PREFIX || '/api'}`

export const LOCALE_COOKIE_NAME = 'locale'

export const DEFAULT_VALUE_MAX_LEN = 48
