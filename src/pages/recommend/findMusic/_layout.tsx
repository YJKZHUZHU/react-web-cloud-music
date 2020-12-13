/** @format */

import React, {useState, useEffect} from "react"
import {Tabs} from "antd"
import {history, useLocation} from "umi"
import PersonalRecommendation from "./personal-recommendation"
import SongList from "./song-list"
import LatestMusic from "./latest-music"
import Singer from "./singer"
import Leaderboard from "./leaderboard"
import AnchorStation from "./anchor-station"
import styles from "./index.scss"

const {TabPane} = Tabs

const FindMusic = () => {
  const location = useLocation()

  const path = location.pathname.split("/").pop()

  const [tabKey, setTabKey] = useState(path || "personal-recommendation")

  const onTab = (activeKey: any) => {
    setTabKey(activeKey)
    history.push(`/recommend/findmusic/${activeKey}`)
  }

  useEffect(() => {
    onTab(path)
  }, [location.pathname])

  return (
    <Tabs
      onChange={onTab}
      activeKey={tabKey}
      tabBarStyle={{textAlign: "center", color: "var(--font-color)"}}
      animated>
      <TabPane tab="个性推荐" key="personal-recommendation" className={styles.tabPane}>
        <PersonalRecommendation />
      </TabPane>
      <TabPane tab="歌单" key="song-list" className={styles.tabPane}>
        <SongList />
      </TabPane>
      {/* <TabPane tab="主播电台" key="anchor-station" className={styles.tabPane}>
        <AnchorStation />
      </TabPane> */}
      <TabPane tab="排行榜" key="leaderboard" className={styles.tabPane}>
        <Leaderboard />
      </TabPane>
      <TabPane tab="歌手" key="singer" className={styles.tabPane}>
        <Singer />
      </TabPane>
      <TabPane tab="最新音乐" key="latest-music" className={styles.tabPane}>
        <LatestMusic />
      </TabPane>
    </Tabs>
  )
}

export default FindMusic
