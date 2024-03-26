/** @format */

import React, {useEffect} from "react"
import {Row, Col, Space} from "antd"
import {RightOutlined} from "@ant-design/icons"
import {Link} from "@umijs/max"
import {useRequest} from "ahooks"
import {CarouselImg, RecommendMv, ExclusiveBroadcast} from "./components"
import {RecommendedSongList, NewMusic} from "@/components"
import {IPersonalizedItem} from "@/components/RecommendedSongList"
import {INewSongItem} from "@/components/NewMusic"
import type {IRecommendItem} from "./components/RecommendMv"
import type {IExclusiveBroadcastItem} from "./components/ExclusiveBroadcast"
import API from "@/api"
import styles from "./index.scss"

interface IPersonalizedData {
  category: number
  code: number
  hasTaste: boolean
  result: IPersonalizedItem[]
}

interface INewSong {
  result: INewSongItem[]
  category: number
  code: number
}

interface IRecommendMv {
  code: number
  category: number
  result: IRecommendItem[]
}

interface IExclusiveBroadcastData {
  code: number
  name: string
  result: IExclusiveBroadcastItem[]
}

const renderLink = (title: string, link: string) => {
  return (
    <Link to={link} className={styles.link}>
      <Space>
        <span>{title}</span>
        <RightOutlined />
      </Space>
    </Link>
  )
}

const PersonalRecommendation = () => {
  const {run: runPersonalized, data: personalizedData} = useRequest<IPersonalizedData>(
    () => API.personalized({limit: 12, loading: true}),
    {
      manual: true
    }
  )
  const {run: runNewSong, data: newSongData} = useRequest<INewSong>(API.newSong, {
    manual: true
  })

  const {run: runMv, data: mvData} = useRequest<IRecommendMv>(API.getRecommentMv, {
    manual: true
  })

  const {
    run: runExclusiveBroadcast,
    data: exclusiveBroadcastData
  } = useRequest<IExclusiveBroadcastData>(API.getExclusiveBroadcast, {
    manual: true
  })

  useEffect(() => {
    runNewSong()
    runPersonalized()
    runMv()
    runExclusiveBroadcast()
  }, [])

  return (
    <div className={styles._personalRecommendation}>
      <CarouselImg />
      <div className={styles.recommend}>
        {renderLink("推荐歌单", "/find-music/song-list")}
        <Row justify="start" gutter={24}>
          {personalizedData?.result?.map((item) => {
            return (
              <Col span={4} key={item.id}>
                <RecommendedSongList data={item} />
              </Col>
            )
          })}
        </Row>
      </div>
      <div className={styles.recommend}>
        {renderLink("独家放送", "/exclusive-broadcast")}
        <Row justify="start" gutter={24}>
          {exclusiveBroadcastData?.result.map((item) => {
            return (
              <Col span={24 / exclusiveBroadcastData?.result.length} key={item.id}>
                <ExclusiveBroadcast data={item} />
              </Col>
            )
          })}
        </Row>
      </div>
      <div className={styles.recommend}>
        {renderLink("最新音乐", "/find-music/latest-music")}

        <div className={styles.newMusic}>
          <Row>
            {newSongData?.result.map((item, index) => {
              return (
                <Col span={12} key={item.id}>
                  <NewMusic data={item} index={index + 1} />
                </Col>
              )
            })}
          </Row>
        </div>
      </div>
      <div className={styles.recommend}>
        {renderLink("推荐MV", "/find-music/song-list")}

        <Row gutter={32}>
          {mvData?.result.map((item) => {
            return (
              <Col span={6} key={item.id}>
                <RecommendMv data={item} />
              </Col>
            )
          })}
        </Row>
      </div>
    </div>
  )
}

export default PersonalRecommendation
