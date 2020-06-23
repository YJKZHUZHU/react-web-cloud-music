/** @format */

import React, {FC, useState, useEffect} from "react"
import {Tabs} from "antd"
import Map from "@/help/map"
import ScrollMore from "./components/ScrollMore"
import {history} from 'umi'
import styles from "./index.scss"
import store from "@/help/localStorage"

type Props = {
  location: any
}
interface HistoryInterface {
  id: number
  keywords: string
}
const {TabPane} = Tabs

const SearchDetail: FC<Props> = (props) => {
  const {keywords, type} = history.location.query
  const [activeKey, setActiveKey] = useState(String(type))
  const [count, setCount] = useState(0)

  const onTab = (value: string) => {
    setActiveKey(value)
  }
  useEffect(() => {
    let history: HistoryInterface[] = store.getValue("searchHistory")
    console.log(history)
    let id = history.length === 0 ? 0 : history.sort((a, b) => b.id - a.id)[0].id + 1
    history = history.filter((item) => item.keywords !== keywords)
    store.setValue("searchHistory", [...history, {id, keywords}])
  }, [keywords])

  //type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合

  return (
    <div className={styles._searchDetail}>
      <p className={styles.searchTip}>
        <span>搜索</span>
        <span className={styles.keywords}>"{keywords}"</span>
        <span>
          找到{count}相关{Map.MAP_TAB[activeKey]}
        </span>
      </p>
      <div className={styles.tab}>
        <Tabs activeKey={activeKey} onChange={onTab} animated={false}>
          <TabPane tab="单曲" key="1">
            <ScrollMore {...props} type={activeKey} getCount={(count: number) => setCount(count)} />
          </TabPane>
          <TabPane tab="歌手" key="100">
            <ScrollMore {...props} type={activeKey} getCount={(count: number) => setCount(count)} />
          </TabPane>
          <TabPane tab="专辑" key="10">
            <ScrollMore {...props} type={activeKey} getCount={(count: number) => setCount(count)} />
          </TabPane>
          <TabPane tab="视频" key="1014">
            <ScrollMore {...props} type={activeKey} getCount={(count: number) => setCount(count)} />
          </TabPane>
          <TabPane tab="歌单" key="1000">
            <ScrollMore {...props} type={activeKey} getCount={(count: number) => setCount(count)} />
          </TabPane>
          {/*<TabPane tab="歌词" key="3">*/}
          {/*  Content of Tab Pane 3*/}
          {/*</TabPane>*/}
          {/*<TabPane tab="主播电台" key="3">*/}
          {/*  Content of Tab Pane 3*/}
          {/*</TabPane>*/}
          <TabPane tab="用户" key="1002">
            <ScrollMore {...props} type={activeKey} getCount={(count: number) => setCount(count)} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default SearchDetail
