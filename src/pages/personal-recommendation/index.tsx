/** @format */

import React, { useEffect } from "react"
import { Row, Col, Space } from "antd"
import { RightOutlined } from "@ant-design/icons"
import { Link } from "@umijs/max"
import { useRequest } from "ahooks"
import { CarouselImg, RecommendMv, ExclusiveBroadcast } from "./components"
import { RecommendedSongList, NewMusic } from "@/components"
import { IPersonalizedItem } from "@/components/RecommendedSongList"
import { INewSongItem } from "@/components/NewMusic"
import type { IRecommendItem } from "./components/RecommendMv"
import type { IExclusiveBroadcastItem } from "./components/ExclusiveBroadcast"
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
    <div className="flex justify-between items-center mb-[16px]">
      <span className="text-[#7D829E]">{title}</span>
      <Link to={link} className=" text-[#7D829E] text-[14px]">
        <div className="flex items-center gap-[4px]">
          <span>更多</span>
          <RightOutlined />
        </div>
      </Link>
    </div>
  )
}

const PersonalRecommendation = () => {
  const { run: runPersonalized, data: personalizedData } = useRequest<IPersonalizedData>(
    () => API.personalized({ limit: 12, loading: true }),
    {
      manual: true
    }
  )
  const { run: runNewSong, data: newSongData } = useRequest<INewSong>(API.newSong, {
    manual: true
  })

  const { run: runMv, data: mvData } = useRequest<IRecommendMv>(API.getRecommentMv, {
    manual: true
  })

  const { run: runExclusiveBroadcast, data: exclusiveBroadcastData } =
    useRequest<IExclusiveBroadcastData>(API.getExclusiveBroadcast, {
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
      <div className="flex flex-col gap-[24px] mt-[24px]">
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
        <div className="flex justify-between gap-[30px]">
          <div className="w-[400px] rounded-[20px] bg-[#ffffff] p-[16px]">
            {renderLink("最新音乐", "/find-music/latest-music")}

            <div className={styles.newMusic}>
              {newSongData?.result.slice(0, 5).map((item, index) => {
                return (
                  <NewMusic data={item} key={item.id} index={index + 1} />
                )
              })}
            </div>
          </div>
          <div className="flex-1 rounded-[20px] bg-[#ffffff] p-[16px] flex flex-col">
            {renderLink("独家放送", "/exclusive-broadcast")}
            <div className="flex flex-col gap-[26px] flex-1 justify-between">
              {exclusiveBroadcastData?.result.map((item) => {
                return (
                  <ExclusiveBroadcast key={item.id} data={item} />
                )
              })}
            </div>

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

    </div>
  )
}

export default PersonalRecommendation
