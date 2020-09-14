/** @format */

import React, {useEffect} from "react"
import {Divider, Row, Col, Space} from "antd"
import {RightOutlined} from "@ant-design/icons"
import {Link} from "umi"
import {useRequest} from "ahooks"
import CarouselImg from "../components/Carousel"
import RecommendedSongList, {IPersonalizedItem} from "@/components/RecommendedSongList"
import NewMusic, {INewSongItem} from "@/components/NewMusic"
import RecommendMv, {IRecommendItem} from "../components/RecommendMv"
import ExclusiveBroadcast, {IExclusiveBroadcastItem} from "../components/ExclusiveBroadcast"
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

  const {run: runExclusiveBroadcast, data: exclusiveBroadcastData} = useRequest<
    IExclusiveBroadcastData
  >(API.getExclusiveBroadcast, {
    manual: true
  })

  useEffect(() => {
    runNewSong()
    runPersonalized()
    runMv()
    runExclusiveBroadcast()
  }, [])

  return (
    <>
      <CarouselImg />
      <div className={styles.recommend}>
        {renderLink("推荐歌单", "/recommend/findmusic/song-list")}
        <Row justify="start" gutter={24}>
          {personalizedData?.result.map((item) => {
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
        {renderLink("最新音乐", "/recommend/findmusic/latest-music")}

        <Divider />
        <div className={styles.newMusic}>
          <Row>
            {newSongData?.result.map((item, index) => {
              return (
                <Col span={12} key={item.id} className={styles.item}>
                  <NewMusic data={item} index={index + 1} />
                </Col>
              )
            })}
          </Row>
        </div>
      </div>
      <div className={styles.recommend}>
        {renderLink("推荐MV", "/recommend/findmusic/song-list")}

        <Row gutter={32}>
          {mvData?.result.map((item) => {
            return (
              <Col span={6} key={item.id} className={styles.item}>
                <RecommendMv data={item} />
              </Col>
            )
          })}
        </Row>
      </div>
    </>
  )
}

PersonalRecommendation.title = "个性推荐"

export default PersonalRecommendation
