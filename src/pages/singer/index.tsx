/** @format */

import React, {useRef} from "react"
import {Card, Row, Col} from "antd"
import {UserOutlined, LoadingOutlined} from "@ant-design/icons"
import {useRequest} from "ahooks"
import {history} from "@umijs/max"
import SelectTag from "./components/SelectTag"
import {Artists} from "@/components"
import {CLASSIFICATION, LANGUAGE, SELECT} from "@/help/map"
import API from "@/api"
import styles from "./index.scss"

interface IParams {
  initial: number
  type: number
  area: number
}
interface ArtistItemInterface {
  accountId?: number
  albumSize: number
  alias: any[]
  briefDesc: string
  followed: boolean
  id: number
  img1v1Id: number
  img1v1Id_str: string
  img1v1Url: string
  musicSize: number
  name: string
  picId: number
  picId_str: string
  picUrl: string
  topicPerson: number
  trans: string
}

const Singer = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const paramsRef = useRef<IParams>({type: -1, area: -1, initial: -1})
  const {data, loading, reload, noMore} = useRequest(
    (result: {list: ArtistItemInterface[]; more: any; total: number}) =>
      API.getArtistList({...paramsRef.current, limit: 30, offset: result?.list.length || 0}),
    {
      loadMore: true,
      ref: containerRef,
      isNoMore: (d) => {
        return !d?.more
      },
      formatResult: (response) => {
        return {
          list: response.artists || [],
          more: response.more || false,
          total: 100
        }
      }
    }
  )

  const setParamsRef = (
    props: "area" | "type" | "initial",
    value: number,
    callback: () => void
  ) => {
    paramsRef.current[props] = value
    callback()
  }

  return (
    <div className={styles.singer}>
      <SelectTag
        data={LANGUAGE}
        getSelectTag={(val) => setParamsRef("area", val, reload)}
        label="语种"
      />
      <SelectTag
        data={CLASSIFICATION}
        getSelectTag={(val) => setParamsRef("type", val, reload)}
        label="分类"
      />
      <SelectTag
        data={SELECT}
        getSelectTag={(val) => setParamsRef("initial", val, reload)}
        label="分类"
      />
      <div ref={containerRef} className={styles.singerContainer}>
        <Row>
          {data?.list.map((item) => (
            <Col span={4} className={styles.card} key={item.id}>
              <Card
                bordered={false}
                bodyStyle={{padding: 0}}
                loading={loading}
                cover={
                  <div
                    className={styles.singerCover}
                    onClick={() =>
                      history.push(`/artists-detail/album?id=${item.id}&name=${item.name}`)
                    }>
                    <img alt={item.name} src={item.picUrl} />
                  </div>
                }>
                <p className={styles.name}>
                  <Artists data={[{id: item.id, name: item.name}]} />
                  {item?.accountId ? <UserOutlined className={styles.icon} /> : null}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
        <div className={styles.loadMore}>
          {noMore ? (
            "加载完了哦..."
          ) : (
            <span>
              Loading
              <LoadingOutlined />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Singer
