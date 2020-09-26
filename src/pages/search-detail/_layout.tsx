/** @format */

import React, {FC, useState, useEffect} from "react"
import {Tabs} from "antd"
import {useUpdate} from 'ahooks'
import Singer from "./singer"
import Single from "./single"
import SongList from "./song-list"
import Video from "./video"
import User from "./user"
import Album from "./album"
import Map from "@/help/map"
import {useLocation, useHistory} from "umi"
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

const SearchDetail = () => {
  const history = useHistory()
  const location: any = useLocation()

  const update = useUpdate()
  const path =
    location.pathname.split("/").pop() === "search-detail"
      ? "single"
      : location.pathname.split("/").pop()
  const {keywords, type} = location.query
  const [activeKey, setActiveKey] = useState(path)
  const [count, setCount] = useState(0)

  console.log(activeKey)

  const onTab = (value: string) => {
    setActiveKey(value)
    history.push(`/search-detail/${value}?keywords=${keywords}&type=${MAP_TYPE[value]}`)
  }
  useEffect(() => {
    let storeHistory = store.getValue("searchHistory")
    let id = history.length === 0 ? 0 : storeHistory.sort((a, b) => b.id - a.id)[0].id + 1
    storeHistory = storeHistory.filter((item) => item.keywords !== keywords)
    store.setValue("searchHistory", [...storeHistory, {id, keywords}])
  }, [keywords])

   

  return (
    <div className={styles._searchDetail}>
      <p className={styles.searchTip}>
        <span>搜索</span>
        <span className={styles.keywords}>"{keywords}"</span>
        <span>
          找到{count}相关{Map.MAP_TAB[type]}
        </span>
      </p>
      <div className={styles.tab}>
        <Tabs activeKey={activeKey} onChange={onTab} animated={false}>
          <TabPane tab="单曲" key="single">
            <Single
              getCount={(c) => {
                setCount(c)
              }}
            />
          </TabPane>
          <TabPane tab="歌手" key="singer">
            <Singer
              getCount={(c) => {
                setCount(c)
              }}
            />
          </TabPane>
          <TabPane tab="专辑" key="album">
            <Album
              getCount={(c) => {
                setCount(c)
              }}
            />
          </TabPane>
          <TabPane tab="视频" key="video">
            <Video
              getCount={(c) => {
                setCount(c)
              }}
            />
          </TabPane>
          <TabPane tab="歌单" key="song-list">
            <SongList
              getCount={(c) => {
                setCount(c)
              }}
            />
          </TabPane>
          <TabPane tab="用户" key="user">
            <User
              getCount={(c) => {
                setCount(c)
              }}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default SearchDetail
