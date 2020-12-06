/** @format */

import React, {FC, useEffect, useState} from "react"
import {Spin, Table, Space} from "antd"
import {useDispatch, useHistory, useLocation} from "umi"
import {HeartOutlined, PlaySquareOutlined} from "@ant-design/icons"
import InfiniteScroll from "react-infinite-scroller"
import Utils from "@/help"
import {Artists} from "@/components"
import useSearchDetail from "../hooks/useSearchDetail"
import styles from "../index.scss"

interface ISingle {
  getCount: (count: number) => void
}
const Single: FC<ISingle> = ({getCount}) => {
  const history = useHistory()
  const location: any = useLocation()

  const {loadMore, loading, more, list, count} = useSearchDetail({
    type: 1,
    initFetch: true,
    countName: "songCount",
    listName: "songs"
  })

  const dispatch = useDispatch()
  const columns: any = [
    {
      title: "操作",
      dataIndex: "operator",
      key: "operator",
      align: "left",
      render: (text: any, record: any, index: number) => {
        return (
          <>
            <span>{index < 10 ? `0${index + 1}` : index + 1}</span>
            <HeartOutlined className={styles.heartIcon} />
          </>
        )
      },
      width: 100
    },
    {
      title: "音乐标题",
      dataIndex: "name",
      key: "name",
      align: "left",
      ellipsis: true,
      render: (text: any, record: any) => {
        return (
          <div className={styles.musicTitle}>
            <p>
              <span dangerouslySetInnerHTML={{__html: text && Utils.highLight(text)}} />
              {!!record.mvid ? (
                <PlaySquareOutlined className={styles.icon} onClick={() => onMv(record.mvid)} />
              ) : null}
            </p>
            {record.alias.length !== 0 ? (
              <p
                className={styles.bottom}
                dangerouslySetInnerHTML={{
                  __html: record.alias && Utils.highLight(record.alias.join("/"))
                }}
              />
            ) : null}
          </div>
        )
      }
    },
    {
      title: "歌手",
      dataIndex: "artists",
      key: "artists",
      align: "left",
      ellipsis: true,
      render: (text: any, record: any) => {
        return <Artists data={text} />
      }
    },
    {
      title: "专辑",
      dataIndex: "album",
      key: "album",
      align: "left",
      ellipsis: true,
      render: (text: any, record: any) => {
        return (
          <span
            onClick={() => history.push(`/album?id=${record.album.id}`)}
            className={styles.albumText}
            dangerouslySetInnerHTML={{__html: text && Utils.highLight(text.name)}}
          />
        )
      }
    },
    {
      title: "时长",
      dataIndex: "duration",
      key: "duration",
      align: "left",
      render: (text: any) => {
        return <span>{Utils.formatSeconds(text)}</span>
      },
      width: 150
    }
  ]
  const onMv = (mvid: string) => {
    history.push(`/recommend/video/mvDetail?mvid=${mvid}`)
  }

  useEffect(() => {
    getCount(count)
  }, [count])

  return (
    <div className={styles.single}>
      <InfiniteScroll
        initialLoad={false}
        pageStart={1}
        loadMore={loadMore}
        threshold={50}
        hasMore={!loading && more}
        useWindow={false}>
        <Table
          onRow={(record: any) => {
            return {
              onDoubleClick: () =>
                dispatch({
                  type: "songInfoModel/getSongInfo",
                  payload: {
                    id: record.id
                  }
                })
            }
          }}
          bordered={false}
          columns={columns}
          size="small"
          dataSource={list}
          pagination={false}
          rowKey={(record: any) => record.id}
        />
      </InfiniteScroll>
      {loading && more && (
        <div className={styles.loading}>
          <Spin spinning={loading} tip="Loading..." />
        </div>
      )}
    </div>
  )
}
Single.title = "单曲"

export default Single
