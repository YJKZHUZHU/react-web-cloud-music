/** @format */

import React, { useState, useEffect, FC, createContext, memo } from "react"
import { Tabs, Space } from "antd"
import { useLocation, history, useParams, Outlet } from "@umijs/max"
import { MAP_TAB } from "@/help/map"
import qs from 'qs'
import store from "@/help/localStorage"
import { useQuery } from '@/hooks'
import styles from "./index.scss"

const { TabPane } = Tabs

interface ICountContext {
  getCount: (type: number | string, count: number) => void
  countInfo?: Record<any, any>
}

export const CountContext = createContext<ICountContext>({
  getCount: () => { },
  countInfo: {}
})

const MAP_TYPE: Record<string, number> = {
  single: 1,
  singer: 100,
  album: 10,
  video: 1014,
  "song-list": 1000,
  user: 1002
}

const SOURCE: Record<string, string> = {
  1: "single",
  100: "singer",
  10: "album",
  1014: "video",
  1000: "song-list",
  1002: "user"
}

const SearchDetail: FC = () => {
  const query = useQuery()
  const { keywords, type } = query
  const [activeKey, setActiveKey] = useState(SOURCE[type])
  const [countInfo, setCountInfo] = useState<{ [propsName: string]: number }>({})

  const onTab = (value: string) => {
    setActiveKey(value)
    history.push(`/search-detail/${value}?keywords=${keywords}&type=${MAP_TYPE[value]}`)
  }

  const getCount = (type: number | string, count: number) => {
    if (!countInfo[type]) {
      // 缓存
      setCountInfo({ ...countInfo, [type]: count })
    }
  }
  useEffect(() => {
    setActiveKey(SOURCE[type])
  }, [type])


  useEffect(() => {
    let storeHistory = store.getValue("searchHistory")
    let id = storeHistory.length === 0 ? 0 : storeHistory.sort((a, b) => b.id - a.id)[0]?.id + 1
    storeHistory = storeHistory.filter((item) => item.keywords !== keywords)
    store.setValue("searchHistory", [...storeHistory, { id, keywords }])
  }, [keywords])

  return (
    <div className={styles._searchDetail}>
      <CountContext.Provider value={{ getCount }}>
        <Space>
          <span>搜索</span>
          <span className={styles.keywords}>"{keywords}"</span>
          <span>
            找到{countInfo[type] || 0}相关{MAP_TAB[type]}
          </span>
        </Space>
        <div className={styles.tab}>
          <Tabs activeKey={activeKey} onChange={onTab} items={[
            {
              key: 'single',
              tabKey: 'single',
              label: '单曲',
              children: <Outlet />
            },
            {
              key: 'singer',
              tabKey: 'singer',
              label: '歌手',
              children: <Outlet />
            },
            {
              key: 'album',
              tabKey: 'album',
              label: '专辑',
              children: <Outlet />
            },
            {
              key: 'video',
              tabKey: 'video',
              label: '视频',
              children: <Outlet />
            },
            {
              key: 'song-list',
              tabKey: 'song-list',
              label: '歌单',
              children: <Outlet />
            },
            {
              key: 'user',
              tabKey: 'user',
              label: '用户',
              children: <Outlet />
            }
          ]}>

          </Tabs>
        </div>
      </CountContext.Provider>
    </div>
  )
}

export default memo(SearchDetail)
