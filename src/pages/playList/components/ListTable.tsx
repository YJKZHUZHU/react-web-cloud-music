/** @format */

import React, {FC} from "react"
import {HeartOutlined, PlayCircleOutlined} from "@ant-design/icons"
import {Table} from "antd"
import {useDispatch, useHistory} from "umi"
import {Artists} from "@/components"
import Utils from "@/help"
import styles from "../index.scss"

interface TableListProps {
  data: any[]
  loading: boolean
  searchValue: string
}

const TableList: FC<TableListProps> = (props) => {
  const {data, loading, searchValue} = props
  const dispatch = useDispatch()
  const history = useHistory()

  const columns: any[] = [
    {
      title: "操作",
      dataIndex: "operator",
      key: "operator",
      align: "left",
      render: (text: any, record: any, index: number) => {
        return (
          <div className={styles.operator}>
            <span>{index < 10 ? `0${index}` : index}</span>
            <HeartOutlined className={styles.heartIcon} />
            {!!record.mv ? (
              <PlayCircleOutlined
                className={styles.playIcon}
                onClick={() => history.push(`/recommend/video/mvDetail?mvid=${record.mv}`)}
              />
            ) : null}
          </div>
        )
      },
      width: 100
    },
    {
      title: "音乐标题",
      dataIndex: "name",
      key: "name",
      align: "left",
      ellipsis: true
    },
    {
      title: "歌手",
      dataIndex: "singer",
      key: "singer",
      align: "left",
      ellipsis: true,
      render: (text: any, record: any) => <Artists data={record.ar} />
    },
    {
      title: "专辑",
      dataIndex: "album",
      key: "album",
      align: "left",
      ellipsis: true,
      render: (text: any, record: any) => record.al.name
    },
    {
      title: "时长",
      dataIndex: "dt",
      key: "dt",
      align: "left",
      render: (text: any) => Utils.formatSeconds(text),
      width: 150
    }
  ]

  return (
    <Table
      loading={loading}
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
      columns={columns}
      size="small"
      dataSource={
        searchValue ? data?.filter((item: {name: string}) => item.name.includes(searchValue)) : data
      }
      pagination={false}
      rowKey={(record: any) => record.id}
    />
  )
}

export default TableList
