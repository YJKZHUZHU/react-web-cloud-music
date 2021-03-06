/** @format */

import React, {useState, useEffect} from "react"
import {history, useLocation} from "umi"
import {Tabs, Radio, Button, Space, Spin, message} from "antd"
import {
  BorderInnerOutlined,
  UnorderedListOutlined,
  PicLeftOutlined,
  FolderAddOutlined,
  UserOutlined,
  CheckOutlined
} from "@ant-design/icons"
import {useRequest} from "ahooks"
import API from "@/api"
import Album, {IArtists, LayoutType} from "./album"
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

const ArtistsDetail = () => {
  const location: any = useLocation()
  const path = location.pathname.split("/").pop()
  const [tabKey, setTabKey] = useState(path || "album")
  const [collect, setCollect] = useState(false)
  const [extraType, setExtraType] = useState<LayoutType>("card")
  const {data, run, loading} = useRequest(
    () => API.getSingerAlbum({id: location.query.id, limit: 0}),
    {
      manual: true,
      formatResult: (response): IArtists => response.artist
    }
  )
  const {run: runColect} = useRequest(
    () => API.setArtistsSub({id: data?.id, t: collect ? -1 : 1}),
    {
      manual: true,
      onSuccess: async () => {
        await runSub()
        if (collect) {
          message.success("取消收藏成功")
        } else {
          message.success("收藏成功")
        }
      }
    }
  )
  const {run: runSub} = useRequest(API.artistSublist, {
    manual: true,
    onSuccess: (response) => {
      if (response.data.findIndex((item: any) => +item.id === +location.query.id) !== -1) {
        setCollect(true)
      } else {
        setCollect(false)
      }
    }
  })
  const onTab = (activeKey: any) => {
    setTabKey(activeKey)
    history.push({
      pathname: `/artists-detail/${activeKey}`,
      query: {...location.query}
    })
  }
  const extra = (
    <Radio.Group
      value={tabKey === "album" && extraType}
      buttonStyle="solid"
      onChange={(e) => setExtraType(e.target.value)}>
      <Radio.Button value="card">
        <BorderInnerOutlined />
      </Radio.Button>
      <Radio.Button value="table">
        <UnorderedListOutlined />
      </Radio.Button>
      <Radio.Button value="tableCard">
        <PicLeftOutlined />
      </Radio.Button>
    </Radio.Group>
  )
  useEffect(() => {
    setTabKey(path)
  }, [path])
  useEffect(() => {
    run()
    runSub()
  }, [location.query.name])
  return (
    <div className={styles.attistsDetail}>
      <Spin spinning={loading} tip="歌手信息加载中...">
        <div className={styles.singerDetail}>
          <div className={styles.img}>
            <img src={data?.picUrl} alt={data?.name} />
          </div>
          <div className={styles.content}>
            <p>{data?.name}</p>
            <p className={styles.nickName}>{data?.alias?.join("")}</p>
            <Space direction="vertical" size={20}>
              <div>
                <Space size={16}>
                  <Button shape="round" onClick={runColect}>
                    {collect ? <CheckOutlined /> : <FolderAddOutlined />}
                    {collect ? "已收藏" : "收藏"}
                  </Button>

                  <Button shape="round" onClick={() => history.push(`/homepage/uid=${data?.id}`)}>
                    <UserOutlined />
                    个人主页
                  </Button>
                </Space>
              </div>
              <div>
                <Space size={16}>
                  <span>
                    单曲数:<i className={styles.number}>{data?.musicSize}</i>
                  </span>
                  <span>
                    专辑数:<i className={styles.number}>{data?.albumSize}</i>
                  </span>
                  {/* <span>
                mv数:<i className={styles.number}>{419}</i>
              </span> */}
                </Space>
              </div>
            </Space>
          </div>
        </div>
      </Spin>

      <Tabs
        onChange={onTab}
        activeKey={tabKey}
        tabBarStyle={{color: "var(--font-color)"}}
        animated
        tabBarExtraContent={tabKey === "album" ? extra : null}>
        <TabPane tab="专辑" key="album" className={styles.tabPane}>
          <Album
            query={location.query}
            total={data?.albumSize as number}
            type={extraType}
            topImgUrl={data?.picUrl as string}
            albumNumber={data?.albumSize as number}
          />
        </TabPane>
        <TabPane tab="MV" key="mv" className={styles.tabPane}>
          <Mv query={location.query} total={data?.musicSize as number} />
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
