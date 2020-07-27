/** @format */

import React, {useState, useEffect} from "react"
import {Divider, Row, Col} from "antd"
import {RightOutlined} from "@ant-design/icons"
import {Link, history} from "umi"
import CarouselImg from "./components/Carousel"
import RecommendedSongList from "@/components/RecommendedSongList"
import NewMusic from "@/components/NewMusic"
import API from "@/api"
import styles from "./index.scss"

const PersonalRecommendation = () => {
  const [personalized, setPersonalized] = useState<any[]>([])
  const [newSong, setNewSong] = useState<any[]>([])

  useEffect(() => {
    API.personalized({
      limit: 12,
      loading: true
    }).then((res) => {
      if (res.code === 200) {
        setPersonalized(res.result)
      }
    })
    API.newSong({
      loading: true
    }).then((res) => {
      if (res.code === 200) {
        setNewSong(res.result)
      }
    })
  }, [])

  return (
    <>
      <CarouselImg />
      <div className={styles.recommend}>
        <div className={styles.top}>
          <h2>推荐歌单</h2>
          <Link to="/recommend/findmusic/song-list">
            <span>
              <i>更多</i>
              <RightOutlined />
            </span>
          </Link>
        </div>
        <Divider className={styles.divider} />
        <Row justify="start" gutter={24}>
          {personalized.map((item) => {
            return (
              <Col span={4} key={item.id}>
                <RecommendedSongList data={item} />
              </Col>
            )
          })}
        </Row>
      </div>
      <div className={styles.recommend}>
        <div className={styles.top}>
          <h2>最新音乐</h2>
          <Link to="/recommend/findmusic/latest-music">
            <span>
              <i>更多</i>
              <RightOutlined />
            </span>
          </Link>
        </div>
        <Divider className={styles.divider} />
        <div className={styles.newMusic}>
          <Row>
            {newSong.map((item, index) => {
              return (
                <Col span={12} key={item.id} className={styles.item}>
                  <NewMusic data={item} index={index + 1} />
                </Col>
              )
            })}
          </Row>
        </div>
      </div>
    </>
  )
}

PersonalRecommendation.title = "个性推荐"

export default PersonalRecommendation
