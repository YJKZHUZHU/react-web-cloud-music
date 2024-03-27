import { useState, useEffect, useRef } from 'react'
import { useBoolean, useRequest } from "ahooks"
import API from "@/api"

interface IResult {
  list?: any[]
  offset: number
  hasMore?: boolean
  id?: number
}


const useVedio = () => {
  const [visible, { toggle }] = useBoolean(false)
  const [selectTag, setSelectTag] = useState("全部视频")
  const offsetRef = useRef(0)
  const currentIdRef = useRef<number | null>(null)
  const vedioGroupListRequest = useRequest(API.getVedioGroupList, {
    formatResult: (response) => {
      if (response.code !== 200) {
        return []
      }
      return response.data
    }
  })
  const vedioCategoryListRequest = useRequest(API.getVedioCategoryList, {
    formatResult: (response) => {
      if (response.code !== 200) {
        return []
      }
      return response.data
    }
  })
  const allVedioListRequest = useRequest((d: IResult | undefined) => API.getAllVedioList({ offset: d?.offset }), {
    manual: true,
    loadMore: true,
    cacheKey: 'loadMoreCache',
    formatResult: (response) => {
      if (response.hasmore) {
        offsetRef.current += 8
      }
      return {
        list: response.datas,
        offset: offsetRef.current,
        hasMore: response.hasmore
      }
    }
  })

  const vedioGroupRequset = useRequest((d: IResult | undefined) => API.getVedioGroup({ id: d?.id, offset: d?.offset }), {
    manual: true,
    loadMore: true,
    cacheKey: 'jijununu',
    formatResult: (response) => {
      // if (response.code !== 200) {
      //   return {
          
      //   }
      // }
      if (response.hasmore) {
        offsetRef.current += 8
      }
      return {
        list: response.datas,
        offset: offsetRef.current,
        hasMore: response.hasmore,
        id: currentIdRef.current
      }
    }
  })

  const onChecked = (id: number, name: string, checked: any) => {
    offsetRef.current = 0
    toggle(false)
    setSelectTag(name)
    currentIdRef.current = id
    return vedioGroupRequset.run({ id, offset: 0 } as any)
  }
  const onAllVedio = () => {
    offsetRef.current = 0
    setSelectTag("全部视频")
    toggle(false)
    return allVedioListRequest.run({ offset: 0 } as any)
  }

  const loadMore = () => {
    if (selectTag === '全部视频') {
      return allVedioListRequest.loadMore()
    }
    return vedioGroupRequset.loadMore()
  }

  useEffect(() => {
    allVedioListRequest.run({ offset: 0 } as any)
  }, [])

  return {
    visible,
    toggle,
    selectTag,
    setSelectTag,
    vedioGroupListRequest,
    vedioCategoryListRequest,
    allVedioListRequest,
    onChecked,
    onAllVedio,
    vedioGroupRequset,
    loadMore,
    vedioListRequest: selectTag === '全部视频' ? allVedioListRequest : vedioGroupRequset
  }
}

export default useVedio