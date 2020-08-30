/** @format */

import React, {useEffect, FC, useState} from "react"
import {useRequest, useBoolean} from "ahooks"
import {Spin, Row, Col, Card, Pagination, Space, Divider} from "antd"
import {
  PlayCircleOutlined,
  FolderAddOutlined,
  HeartOutlined,
  PlaySquareOutlined,
  RightOutlined
} from "@ant-design/icons"
import {useHistory} from "umi"
import useAlbumContent from "@/hooks/useAlbumContent"
import API from "@/api"
import moment from "moment"
import classnames from "classnames"
import PlayIcon from "@/components/PlayIcon"
import {IProps} from "../_layout"
import Utils from "@/help"
import styles from "./index.scss"

export interface IArtists {
  img1v1Id: number
  topicPerson: number
  followed: boolean
  musicSize: number
  albumSize: number
  briefDesc: string
  alias: string[]
  picId: number
  img1v1Url: string
  trans: string
  picUrl: string
  name: string
  id: number
  picId_str: string
  img1v1Id_str: string
}

interface IHotAlbum {
  songs: any[]
  paid: boolean
  onSale: boolean
  mark: number
  description: string
  status: number
  commentThreadId: string
  publishTime: number
  company: string
  briefDesc: string
  alias: string[]
  artists: IArtists[]
  copyrightId: number
  picId: number
  artist: IArtists
  companyId: number
  blurPicUrl: string
  subType: string
  tags: string
  picUrl: string
  pic: number
  name: string
  id: number
  type: string
  size: number
  picId_str: string
  isSub: boolean
}
interface IData {
  hotAlbums: IHotAlbum[]
}
export interface Iparams {
  id: number
  pageSize: number
  current: number
}
export interface IResponse {
  total: number
  list: IHotAlbum[]
}
export type LayoutType = "card" | "table" | "tableCard"

interface IAlbum extends IProps {
  total: number
  type: LayoutType
  topImgUrl: string
  albumNumber: number
}
enum MapLayout {
  CARD = "card",
  TABLE = "table",
  TABLE_CARD = "tableCard"
}

const getData = ({id, pageSize, current}: Iparams): Promise<IResponse> =>
  API.getSingerAlbum({id, limit: pageSize, offset: (current - 1) * pageSize})

const classNames = classnames(styles.item, styles.showAll)

const mapData = (idList: number[]) => {
  return idList.map((id) => {
    return API.getAlbumContent({id})
  })
}

interface IAlbumContentList {
  songs: any[]
  album: IHotAlbum
}

const Album: FC<IAlbum> = (props) => {
  const {query, total, type, topImgUrl, albumNumber} = props
  const {id} = query
  const history = useHistory()
  const [showAll, {toggle}] = useBoolean(false)

  const [albumLoading, setAlbumLoading] = useState(false)
  const [albumContentList, setAlbumContentList] = useState<IAlbumContentList[]>([])

  const {data, run, loading, pagination} = useRequest(
    ({current, pageSize}) => getData({id, current, pageSize}),
    {
      paginated: true,
      manual: true,
      defaultPageSize: 12,
      onSuccess: (response) => {
        setAlbumLoading(true)
        setAlbumContentList([])
        Promise.all(mapData(response.list.map((item) => item.id)))
          .then((values) => {
            console.log(values)
            setAlbumLoading(false)
            setAlbumContentList(values)
          })
          .catch((e) => {
            console.log(e)
            setAlbumLoading(false)
          })
      },
      formatResult: ({hotAlbums: list}: IData): IResponse => ({list, total})
    }
  )
  const {data: topData, run: runTop} = useRequest(() => API.getSingerTop({id}), {
    manual: true,
    formatResult: (response): any[] => response.songs
  })

  const mapTopData = showAll ? topData : topData?.slice(0, 10)

  const renderLeft = (imgUrl: string, time?: number) => {
    return (
      <div className={styles.left}>
        <Space direction="vertical" size={15}>
          <div className={styles.img}>
            <img src={imgUrl} alt="" />
          </div>
          {time ? <span>{moment(time).format("YYYY-MM-DD")}</span> : null}
        </Space>
      </div>
    )
  }

  const renderRightTop = (title?: string) => {
    return (
      <Space size={20}>
        <span className={styles.title}>{title ? title : "热门50首"}</span>
        <Space>
          <PlayCircleOutlined />
          <Divider type="vertical" className={styles.divider} />
          <FolderAddOutlined />
        </Space>
      </Space>
    )
  }

  const renderRightListItem = (data: any[] | undefined, show: boolean = false) => {
    return (
      <ul className={styles.list}>
        {data?.map((item, index) => {
          return (
            <li key={item.id} className={styles.item}>
              <Space>
                <span>{index < 9 ? `0${index + 1}` : index + 1}</span>
                <HeartOutlined />
                <Space size={2}>
                  {item.name}
                  {item.alia.length !== 0 ? (
                    <i className={styles.alias}>({item.alia.join("")})</i>
                  ) : null}
                </Space>
                {item.mv && item.mv !== 0 ? (
                  <PlaySquareOutlined className={styles.playIcon} />
                ) : null}
              </Space>
              <span className={styles.playTime}>{Utils.formatPlayerTime(item.dt / 1000)}</span>
            </li>
          )
        })}
        {show ? (
          <li className={classNames} onClick={() => toggle()}>
            <Space>
              <span>{showAll ? "收起" : "查看全部50首"}</span>
              <RightOutlined />
            </Space>
          </li>
        ) : null}
      </ul>
    )
  }

  const albumLayoutType = (type: LayoutType) => {
    if (type === MapLayout.CARD) {
      return (
        <Row gutter={24} className={styles.descContent}>
          {data?.list?.map((item) => (
            <Col
              span={4}
              className={styles.card}
              key={item.id}
              onClick={() => history.push(`/artists-detail/album?id=${id}&name=${item.name}`)}>
              <Card
                bordered={false}
                style={{width: "100%"}}
                bodyStyle={{padding: 0}}
                loading={loading}
                cover={
                  <div className={styles.singerCover}>
                    <div className={styles.img}>
                      <img alt={item.name} src={item.picUrl} />
                      <PlayIcon iconClassName={styles.playIcon} />
                    </div>
                  </div>
                }>
                <p className={styles.name}>
                  <span className={styles.singerName}>
                    {item.name}
                    {item.alias.length !== 0 ? (
                      <i className={styles.alias}>({item.alias.join("")})</i>
                    ) : null}
                  </span>
                </p>
                <span className={styles.publishTime}>
                  {moment(item.publishTime).format("YYYY-MM-DD")}
                </span>
              </Card>
            </Col>
          ))}
        </Row>
      )
    }
    if (type === MapLayout.TABLE) {
      return (
        <ul className={styles.tableLaout}>
          {data?.list.map((item) => {
            return (
              <li className={styles.tableItem} key={item.id}>
                <div className={styles.img}>
                  <img src={item.picUrl} alt={item.name} />
                </div>
                <span className={styles.singerName}>
                  {item.name}
                  {item.alias.length !== 0 ? (
                    <i className={styles.alias}>({item.alias.join("")})</i>
                  ) : null}
                </span>
                <span className={styles.number}>{1}首</span>
                <span className={styles.publishTime}>发行时间：{"2020-08-07"}</span>
              </li>
            )
          })}
        </ul>
      )
    }
    if (type === MapLayout.TABLE_CARD) {
      return (
        <Space direction="vertical" size={20} style={{width: "100%"}}>
          <div className={styles.tableCardLayout}>
            {renderLeft(topImgUrl)}
            <div className={styles.right}>
              {renderRightTop()}
              {renderRightListItem(mapTopData, true)}
            </div>
          </div>
          {albumContentList.map((item) => {
            return (
              <div className={styles.tableCardLayout} key={item.album.id}>
                {renderLeft(item.album.picUrl, item.album.publishTime)}
                <div className={styles.right}>
                  {renderRightTop(item.album.name)}
                  {renderRightListItem(item.songs, false)}
                </div>
              </div>
            )
          })}
        </Space>
      )
    }
  }

  useEffect(() => {
    run({current: 1, pageSize: 12})
    runTop()
  }, [])

  return (
    <Spin spinning={type === "tableCard" ? albumLoading : loading} tip="Loading...">
      <Space direction="vertical" size={20} className={styles.space}>
        {albumLayoutType(type)}
        <Pagination
          {...(pagination as any)}
          size="small"
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `共 ${total} 张专辑`}
        />
      </Space>
    </Spin>
  )
}

export default Album
