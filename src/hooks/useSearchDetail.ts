/** @format */

import { useRef } from "react"
import { useLocation } from "umi"
import { useRequest } from "ahooks"
import API from "@/api"

interface IConfig {
  countKey: string
  listKey: string
  type: number
  limit?: number
  containerRef?: any
}

//type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合

const useSearchDetail = (config: IConfig) => {
  const location: any = useLocation()
  const { countKey, listKey, type, limit } = config
  const containerRef = useRef<HTMLDivElement>(null)
  const { keywords } = location.query

  const request = useRequest(
    (d) => {
      return API.getSearchByType({
        keywords,
        type,
        limit: limit ? limit : 30,
        offset: d?.list.length || 0
      })
    },
    {
      loadMore: true,
      ref: containerRef,
      isNoMore: (d: any) => (d ? d.list.length >= d.total : false),
      formatResult: (response) => {
        return {
          list: response.code === 200 ? response.result[listKey] : [],
          total: response.code === 200 ? response.result[countKey] : 0,
          hasMore: response.code === 200 ? response.result.hasMore : false
        }
      }
    }
  )
  return {
    request,
    containerRef
  }
}
export default useSearchDetail
