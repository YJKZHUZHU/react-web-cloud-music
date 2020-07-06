/** @format */

import React, {FC, useEffect, useState} from "react"
import {RightOutlined} from "@ant-design/icons"
import {Tabs, Divider, Row, Col} from "antd"
import CarouselImg from "@/components/Carousel"
import RecommendedSongList from "@/components/RecommendedSongList"
import NewMusic from "@/components/NewMusic"
import OfficialLeaderBoard from "@/components/OfficialLeaderBoard"
import ALlTopLIst from "@/components/AllTopList"
import {Link} from "umi"
import LatestMusic from "@/components/LatestMusic"
import API from "@/api"
import styles from "./index.scss"


const {TabPane} = Tabs

const FindMusic: FC = (props) => {
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
    <Tabs
      defaultActiveKey="1"
      tabBarStyle={{textAlign: "center", color: "var(--font-color)"}}
      animated={false}>
      <TabPane tab="个性推荐" key="1" className={styles.tabPane}>
        <CarouselImg />
        <div className={styles.recommend}>
          <div className={styles.top}>
            <h2>推荐歌单</h2>
            <Link to="/">
              <span>
                <i>更多</i>
                <RightOutlined />
              </span>
            </Link>
          </div>
          <Divider className={styles.divider} />
          <Row type="flex" justify="start" gutter={24}>
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
            <Link to="/">
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
      </TabPane>
      <TabPane tab="歌单" key="2" className={styles.tabPane}>
        歌单
      </TabPane>
      <TabPane tab="主播电台" key="3" className={styles.tabPane}>
        主播电台
      </TabPane>
      <TabPane tab="排行榜" key="4" className={styles.tabPane}>
        <div className={styles.leaderBoard}>
          <h2>官方榜单</h2>
          <Divider className={styles.divider} />
          <OfficialLeaderBoard />
          <h2>全球榜</h2>
          <Divider className={styles.divider} />
          <ALlTopLIst />
        </div>
      </TabPane>
      <TabPane tab="歌手" key="5" className={styles.tabPane}>
        歌手
      </TabPane>
      <TabPane tab="最新音乐" key="6" className={styles.tabPane}>
        <LatestMusic />
      </TabPane>
    </Tabs>
  )
}

export default FindMusic
