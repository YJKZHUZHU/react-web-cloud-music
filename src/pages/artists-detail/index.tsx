/** @format */

import React, { useState, useEffect, FC, createContext } from "react"
import { history } from "@umijs/max"
import { Tabs, Radio, Button, Space, Spin, message } from "antd"
import {
  BorderInnerOutlined,
  UnorderedListOutlined,
  PicLeftOutlined,
  FolderAddOutlined,
  UserOutlined,
  CheckOutlined
} from "@ant-design/icons"
import { useRequest } from "ahooks"
import API from "@/api"
import { useQuery } from '@/hooks'
import Album, { IArtists, LayoutType } from "./album"
import styles from "./index.scss"
import qs from "qs"

interface IArtistsDetailContext {
  total: number
}
export const ArtistsDetailContext = createContext<IArtistsDetailContext>({
  total: 0
})

interface IQuery {
  id: number
  name: string
}

export interface IProps {
  query: IQuery
}

const { TabPane } = Tabs

const ArtistsDetail: FC = ({ children }) => {
  const query = useQuery<{ id: number, name: string, source: string }>()
  const [tabKey, setTabKey] = useState(query?.source || "album")
  const [collect, setCollect] = useState(false)
  const [extraType, setExtraType] = useState<LayoutType>("card")
  const { data, run, loading } = useRequest(
    () => API.getSingerAlbum({ id: query.id, limit: 0 }),
    {
      manual: true,
      formatResult: (response): IArtists => response.artist
    }
  )
  const { run: runColect } = useRequest(
    () => API.setArtistsSub({ id: data?.id, t: collect ? -1 : 1 }),
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
  const { run: runSub } = useRequest(API.artistSublist, {
    manual: true,
    onSuccess: (response) => {
      if (response.data.findIndex((item: any) => +item.id === +query.id) !== -1) {
        setCollect(true)
      } else {
        setCollect(false)
      }
    }
  })
  const onTab = (activeKey: any) => {
    setTabKey(activeKey)
    history.push({
      pathname: `/artists-detail/${activeKey}?${qs.stringify({ ...query, source: activeKey })}`,

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
    setTabKey(query?.source)
  }, [query?.source])
  useEffect(() => {
    run()
    runSub()
  }, [query?.name])
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
                </Space>
              </div>
            </Space>
          </div>
        </div>
      </Spin>

      <Tabs
        onChange={onTab}
        activeKey={tabKey}
        tabBarStyle={{ color: "var(--font-color)" }}
        animated
        tabBarExtraContent={tabKey === "album" ? extra : null}>
        <TabPane tab="专辑" key="album">
          <Album
            query={query}
            total={data?.albumSize as number}
            type={extraType}
            topImgUrl={data?.picUrl as string}
            albumNumber={data?.albumSize as number}
          />
        </TabPane>
        <TabPane tab="MV" key="mv">
          <ArtistsDetailContext.Provider value={{ total: data?.musicSize as number }}>
            {children}
          </ArtistsDetailContext.Provider>
        </TabPane>
        <TabPane tab="歌手详情" key="singer-detail">
          {children}
        </TabPane>
        <TabPane tab="相似歌手" key="similar-singer">
          {children}
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ArtistsDetail
