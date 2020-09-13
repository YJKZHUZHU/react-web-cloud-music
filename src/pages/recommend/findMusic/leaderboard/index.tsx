/** @format */

import React, {useState, useEffect} from "react"
import {Spin, Row} from "antd"
import {useRequest} from "ahooks"
import OfficialLeaderBoard, {ISingetTopList} from "../components/OfficialLeaderBoard"
import AllTopList from "../components/AllTopList"
import API from "@/api"
import styles from "./index.scss"

interface IGlobalData {
  code: number
  list: any[]
  artistToplist: any
  rewardToplist: any[]
}

interface IOfficiaData {
  code: 200
  relatedVideos: null
  playlist: {[key: string]: any}
  urls: null | string
  privileges: any[]
}

const mapTopId = (list: any[]) => {
  return list
    .map((item) => {
      if (item.ToplistType) {
        return item.id
      }
    })
    .filter((d) => d)
}

const getOfficeData = (idList: number[]) => {
  return Promise.all([
    API.playList({id: idList[0]}),
    API.playList({id: idList[1]}),
    API.playList({id: idList[2]}),
    API.playList({id: idList[3]})
  ])
}

const Leaderboard = () => {
  const [topIdArr, setTopIdArr] = useState([])

  const {data: gloabalData, run: runGlobal} = useRequest<IGlobalData>(API.getAllTopList, {
    manual: true,
    onSuccess: (response) => setTopIdArr(mapTopId(response.list) as any)
  })

  const {run: runOffice, data: officiaData, loading} = useRequest(() => getOfficeData(topIdArr), {
    manual: true,
    formatResult: (response) => response.map((item) => item.playlist)
  })

  const {data: singetTopList, run: runSingerTopList} = useRequest<ISingetTopList>(
    API.getSingerTopList,
    {
      manual: true,
      formatResult: (response) => {
        return [
          {
            coverImgUrl: gloabalData?.artistToplist.coverUrl,
            upateFrequency: gloabalData?.artistToplist.upateFrequency,
            subscribers: [],
            subscribed: false,
            creator: {},
            tracks: response?.list?.artists,
            updateTime: response?.list.updateTime,
            trackIds: [],
            backgroundCoverId: 0,
            backgroundCoverUrl: null,
            titleImage: 0,
            titleImageUrl: null,
            englishTitle: null,
            opRecommend: false,
            adType: 0,
            subscribedCount: 0,
            cloudTrackCount: 0,
            userId: 0,
            highQuality: false,
            specialType: 0,
            coverImgId: 0,
            newImported: false,
            commentThreadId: "",
            privacy: 0,
            name: gloabalData?.artistToplist.name,
            id: 0,
            ToplistType: "",
            commentCount: 0
          }
        ]
      }
    }
  )

  useEffect(() => {
    runGlobal()
    runSingerTopList()
  }, [])

  useEffect(() => {
    if (topIdArr.length !== 0) {
      runOffice()
    }
  }, [topIdArr.length])

  return (
    <Spin spinning={loading} tip="Loading...">
      <div className={styles.leaderBoard}>
        <h2>官方榜单</h2>
        <Row gutter={48}>
          <OfficialLeaderBoard data={officiaData as any[]} type="officia" />
          <OfficialLeaderBoard data={singetTopList as any[]} type="singer" />
        </Row>

        <h2>全球榜</h2>
        <AllTopList data={gloabalData?.list} />
      </div>
    </Spin>
  )
}

export default Leaderboard
