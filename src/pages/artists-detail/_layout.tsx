/** @format */

import React, {useState, useEffect} from "react"
import {history, useLocation} from "umi"
import {Tabs, Radio} from "antd"
import {BorderInnerOutlined, UnorderedListOutlined, PicLeftOutlined} from "@ant-design/icons"
import Album from "./album"
import Mv from "./mv"
import SingerDetail from "./singer-detail"
import SimilarSinger from "./similar-singer"
import styles from "./index.scss"

interface IQuery {
  id: number
  name: string
}

export interface IProps {
  query: IQuery
}

const {TabPane} = Tabs

const Extra = () => {
  return (
    <Radio.Group defaultValue="0" buttonStyle="solid">
      <Radio.Button value="0">
        <BorderInnerOutlined />
      </Radio.Button>
      <Radio.Button value="1">
        <UnorderedListOutlined />
      </Radio.Button>
      <Radio.Button value="2">
        <PicLeftOutlined />
      </Radio.Button>
    </Radio.Group>
  )
}

const ArtistsDetail = () => {
  const location: any = useLocation()
  const path = location.pathname.split("/").pop()
  const [tabKey, setTabKey] = useState(path || "album")
  const onTab = (activeKey: any) => {
    setTabKey(activeKey)
    history.push({
      pathname: `/artists-detail/${activeKey}`,
      query: {...location.query}
    })
  }
  useEffect(() => {
    setTabKey(path)
  }, [path])
  return (
    <div className={styles.artistsDetail}>
      <Tabs
        onChange={onTab}
        activeKey={tabKey}
        tabBarStyle={{color: "var(--font-color)"}}
        animated
        tabBarExtraContent={tabKey === "album" ? <Extra /> : null}>
        <TabPane tab="专辑" key="album" className={styles.tabPane}>
          <Album />
        </TabPane>
        <TabPane tab="MV" key="mv" className={styles.tabPane}>
          <Mv query={location.query} />
        </TabPane>
        <TabPane tab="歌手详情" key="singer-detail" className={styles.tabPane}>
          <SingerDetail query={location.query} />
        </TabPane>
        <TabPane tab="相似歌手" key="similar-detail" className={styles.tabPane}>
          <SimilarSinger query={location.query} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ArtistsDetail
