/** @format */

import React, {useState, useEffect, FC, createContext, memo} from "react"
import {Tabs, Space} from "antd"
import {useLocation, history} from "umi"
import {MAP_TAB} from "@/help/map"
import store from "@/help/localStorage"
import styles from "./index.scss"

const {TabPane} = Tabs

interface ICountContext {
  getCount: (type: number | string, count: number) => void
  countInfo?: Record<any, any>
}

export const CountContext = createContext<ICountContext>({
  getCount: () => {},
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

const SearchDetail: FC = ({children}) => {
  const location: any = useLocation()
  const {keywords, type} = location.query
  const [activeKey, setActiveKey] = useState(SOURCE[type])
  const [countInfo, setCountInfo] = useState<{[propsName: string]: number}>({})

  const onTab = (value: string) => {
    setActiveKey(value)
    history.push(`/search-detail/${value}?keywords=${keywords}&type=${MAP_TYPE[value]}`)
  }

  const getCount = (type: number | string, count: number) => {
    if (!countInfo[type]) {
      // 缓存
      setCountInfo({...countInfo, [type]: count})
    }
  }
  useEffect(() => {
    setActiveKey(SOURCE[type])
  }, [type])

  useEffect(() => {
    let storeHistory = store.getValue("searchHistory")
    let id = storeHistory.length === 0 ? 0 : storeHistory.sort((a, b) => b.id - a.id)[0]?.id + 1
    storeHistory = storeHistory.filter((item) => item.keywords !== keywords)
    store.setValue("searchHistory", [...storeHistory, {id, keywords}])
  }, [keywords])

  return (
    <div className={styles._searchDetail}>
      <CountContext.Provider value={{getCount}}>
        <Space>
          <span>搜索</span>
          <span className={styles.keywords}>"{keywords}"</span>
          <span>
            找到{countInfo[type] || 0}相关{MAP_TAB[type]}
          </span>
        </Space>
        <div className={styles.tab}>
          <Tabs activeKey={activeKey} onChange={onTab}>
            <TabPane tab="单曲" key="single">
              {children}
            </TabPane>
            <TabPane tab="歌手" key="singer">
              {children}
            </TabPane>
            <TabPane tab="专辑" key="album">
              {children}
            </TabPane>
            <TabPane tab="视频" key="video">
              {children}
            </TabPane>
            <TabPane tab="歌单" key="song-list">
              {children}
            </TabPane>
            <TabPane tab="用户" key="user">
              {children}
            </TabPane>
          </Tabs>
        </div>
      </CountContext.Provider>
    </div>
  )
}

export default memo(SearchDetail)
