/** @format */

import React, {useState, useEffect, useCallback} from "react"
import {useLocation} from "umi"
import {useUpdate, useUpdateEffect} from "ahooks"
import {message} from "antd"
import API from "@/api"

interface IConfig {
  initFetch?: boolean
  countName: string
  listName: string
  type: number
}

const defaultConfig = {
  initFetch: false,
  countName: "",
  listName: "",
  type: 0
}

//type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
const initPage = {
  offset: 0,
  limit: 60
}
const useSearchDetail = (config: IConfig = defaultConfig) => {
  const {initFetch, countName, listName, type} = config
  const location: any = useLocation()
  const update = useUpdate()
  const {keywords} = location.query
  console.log(keywords)

  const [list, setList] = useState<any[]>([])
  const [page, setPage] = useState(() => initPage)
  const [loading, setLoading] = useState(false)
  const [more, setMore] = useState(false)
  const [count, setCount] = useState(0)

  const getList = async (isConcat: boolean) => {
    console.log(page)
    console.log(list)

    const params = isConcat
      ? {...page, keywords, type, offset: isConcat ? page.offset + 60 : 60}
      : {...initPage, keywords, type}

    try {
      const Ret: any = await API.getSearchByType(params)
      setLoading(false)
      let RetList = isConcat ? [...list, ...Ret.result[listName]] : Ret.result[listName]
      if (Ret.result[listName].length !== 0) {
        setList(RetList)
      }
      isConcat &&
        setPage({
          ...page,
          offset: page.offset + page.limit
        })

      setCount(Ret.result[countName])
      setMore(Ret.result.hasMore || Ret.result[countName] >= RetList.length)
    } catch (error) {
      setLoading(false)
    }
  }

  const loadMore = () => {
    setLoading(true)

    if (!more) {
      return message.warning("加载完了哦。。。")
    }
    getList(true)
  }

  useEffect(() => {
    getList(false)
  }, [keywords])

  useUpdateEffect(() => {
    console.log("进来")
    setPage(initPage)
  }, [keywords])

  return {
    loadMore,
    loading,
    more,
    list,
    count
  }
}
export default useSearchDetail
