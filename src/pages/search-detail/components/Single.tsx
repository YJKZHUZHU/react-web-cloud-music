/** @format */

import React, {FC} from "react"
import {Table, Space} from "antd"
import {useDispatch, useHistory, useLocation} from "umi"
import {HeartOutlined} from "@ant-design/icons"
import {useRequest} from "ahooks"
import API from "@/api"
import Utils from "@/help"
import {Artists, VideoIcon} from "@/components"
import {IComProps} from "../_layout"
import styles from "../index.scss"

const Single: FC<IComProps> = ({getCount}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const location: any = useLocation()
  const {keywords} = location.query

  const {data, pagination, loading} = useRequest(
    ({current, pageSize}) =>
      API.getSearchByType({keywords, type: 1, limit: pageSize, offset: (current - 1) * pageSize}),
    {
      refreshDeps: [keywords],
      paginated: true,
      defaultPageSize: 30,
      formatResult: (response) => {
        return {
          list: response.code === 200 ? response.result.songs : [],
          total: response.code === 200 ? response.result.songCount : 0
        }
      },
      onSuccess: (data) => {
        getCount(1,data.total)
      }
    }
  )

  const columns: any = [
    {
      title: "操作",
      dataIndex: "operator",
      key: "operator",
      align: "left",
      render: (text: any, record: any, index: number) => {
        return (
          <Space>
            <span>{index < 9 ? `0${index + 1}` : index + 1}</span>
            <HeartOutlined />
          </Space>
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
          <Space direction="vertical" className={styles.musicTitle}>
            <Space>
              <span dangerouslySetInnerHTML={{__html: text && Utils.highLight(text)}} />
              <VideoIcon id={record.mvid} type={0} />
            </Space>
            {record.alias.length ? (
              <p
                dangerouslySetInnerHTML={{
                  __html: record.alias && Utils.highLight(record.alias.join("/"))
                }}
              />
            ) : null}
          </Space>
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

  return (
    <Table
      loading={loading}
      locale={{emptyText: "暂无歌曲"}}
      scroll={{scrollToFirstRowOnChange: true}}
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
      dataSource={data?.list}
      pagination={{
        ...(pagination as any),
        size: "small",
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total) => `共 ${total} 条`
      }}
      rowKey={(record: any) => record.id}
    />
  )
}
Single.title = "单曲"

export default Single
