/** @format */

import {request} from "@umijs/max"

export interface IResp<T = Record<string, string>> {
  code: string
  message: string
  msg?: string
  success: boolean
  data: T
}

export const service = <T = any>(
  url: string,
  data?: Record<string, any>,
  cache: boolean = false,
  headers?: {format?: boolean; [props: string]: any}
) => {
  return request<IResp<T>>(url, {
    data: {
      ...data,
      cache
    },
    method: "post",
    headers: {format: true, ...headers}
  })
}
