/** @format */

import React, {useState, useEffect} from "react"
import {Divider, Spin} from "antd"
import OfficialLeaderBoard from "../components/OfficialLeaderBoard"
import AllTopList from "../components/AllTopList"
import API from "@/api"
import styles from "./index.scss"

const Leaderboard = () => {
  const [officiaData, setOfficiaData] = useState<any[]>([])
  const [globalData, setGlobalData] = useState<any[]>([])
  const [loadng, setLoading] = useState(false)

  const getData = async () => {
    setLoading(true)
    try {
      const res1 = await API.getTopList({idx: 3})
      const res2 = await API.getTopList({idx: 0})
      const res3 = await API.getTopList({idx: 2})
      const res4 = await API.getTopList({idx: 1})
      const res5 = await API.getTopList({idx: 17})
      const res6 = await API.getTopList({idx: 26})
      const GlobalRet = await API.getAllTopList()
      setLoading(false)
      if (GlobalRet.code === 200) {
        setGlobalData(GlobalRet.list)
      }
      return setOfficiaData([
        res1.playlist,
        res2.playlist,
        res3.playlist,
        res4.playlist,
        res5.playlist,
        res6.playlist
      ])
    } catch (error) {
      return setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Spin spinning={loadng} tip="Loading...">
      <div className={styles.leaderBoard}>
        <h2>官方榜单</h2>
        <Divider className={styles.divider} />
        <OfficialLeaderBoard data={officiaData} />
        <h2>全球榜</h2>
        <Divider className={styles.divider} />
        <AllTopList data={globalData} />
      </div>
    </Spin>
  )
}

export default Leaderboard
