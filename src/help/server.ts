import { request } from '@umijs/max'


export interface IResp<T = Record<string, string>> {
  code: string
  message: string
  msg?: string
  success: boolean
  data: T
}
export const service = <T = any>(url: string, data?: Record<string, any>) => {
  return request<IResp<T>>(url, { data, method: 'post', headers: { format: true } })
}