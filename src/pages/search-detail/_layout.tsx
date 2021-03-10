/** @format */

import React, {useState, useEffect} from "react"
import {Tabs} from "antd"
import {useLocation, useHistory} from "umi"
import {useUpdate} from 'ahooks'
import  {MAP_TAB} from "@/help/map"
import {Album, Video, User, SongList, Singer, Single} from "./components"
import store from "@/help/localStorage"
import styles from "./index.scss"

const {TabPane} = Tabs

const MAP_TYPE: {[propsName: string]: number} = {
  single: 1,
  singer: 100,
  album: 10,
  video: 1014,
  "song-list": 1000,
  user: 1002
}

export interface IComProps {
  getCount: (type: number | string, count: number) => void
}

const INIT_COUNT: {[propsName: string]: number} = {
  1: 0,
  100: 0,
  10: 0,
  1014: 0,
  1000: 0,
  1002: 0
}

const SearchDetail = () => {
  const history = useHistory()
  const location: any = useLocation()
  const update =useUpdate()
  const path =
    location.pathname.split("/").pop() === "search-detail"
      ? "single"
      : location.pathname.split("/").pop()
  const {keywords, type} = location.query
  const [activeKey, setActiveKey] = useState(path)
  const [countInfo, setCountInfo] = useState<{[propsName: string]: number}>({})

  const onTab = (value: string) => {
    setActiveKey(value)
    history.push(`/search-detail/${value}?keywords=${keywords}&type=${MAP_TYPE[value]}`)
  }

  const getCount = (type: number | string, count: number) => {
    if (!countInfo[type]) {
      setCountInfo({...countInfo, [type]: count})
    }
  }

  useEffect(() => {
    let storeHistory = store.getValue("searchHistory")
    let id = storeHistory.length === 0 ? 0 : storeHistory.sort((a, b) => b.id - a.id)[0]?.id + 1
    storeHistory = storeHistory.filter((item) => item.keywords !== keywords)
    store.setValue("searchHistory", [...storeHistory, {id, keywords}])
    update()
  }, [keywords])

  return (
    <div className={styles._searchDetail}>
      <p className={styles.searchTip}>
        <span>搜索</span>
        <span className={styles.keywords}>"{keywords}"</span>
        <span>
          找到{countInfo[type] || INIT_COUNT[type]}相关{MAP_TAB[type]}
        </span>
      </p>
      <div className={styles.tab}>
        <Tabs activeKey={activeKey} onChange={onTab} animated={false}>
          <TabPane tab="单曲" key="single">
            <Single getCount={getCount} />
          </TabPane>
          <TabPane tab="歌手" key="singer">
            <Singer getCount={getCount} />
          </TabPane>
          <TabPane tab="专辑" key="album">
            <Album getCount={getCount} />
          </TabPane>
          <TabPane tab="视频" key="video">
            <Video getCount={getCount} />
          </TabPane>
          <TabPane tab="歌单" key="song-list">
            <SongList getCount={getCount} />
          </TabPane>
          <TabPane tab="用户" key="user">
            <User getCount={getCount} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default SearchDetail
