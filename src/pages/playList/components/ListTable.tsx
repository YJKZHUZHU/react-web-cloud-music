/** @format */

import React, {FC, useEffect, useState, useMemo} from "react"
import {HeartOutlined, PlayCircleOutlined} from "@ant-design/icons"
import {Table} from "antd"
import API from "@/api"
import Utils from "@/help"
import styles from "../index.scss"
import {history, useDispatch} from "umi"

interface ITableList {
  trackIds?: any
  tracks?: any
  searchValue: string
  getRecord: (record: any) => void
}

const TableList: FC<ITableList> = ({trackIds = [], searchValue = "", getRecord}) => {
  const [tableData, setTableData] = useState([])
  const dispatch = useDispatch()
  const getData = () => {
    if (trackIds.length !== 0) {
      API.song({ids: trackIdsStr, loading: true}).then((res) => {
        if (res.code === 200) {
          setTableData(res.songs)
          getRecord(res.songs)
        }
      })
    }
  }

  const onMv = (mvid: string) => {
    history.push({
      pathname: "/recommend/video/mvDetail",
      query: {mvid}
    })
  }
  const columns: any[] = [
    {
      title: "操作",
      dataIndex: "operator",
      key: "operator",
      align: "left",
      render: (text: any, record: any, index: number) => {
        return (
          <div>
            <span>{index < 10 ? `0${index}` : index}</span>
            <HeartOutlined className={styles.heartIcon} />
            {!!record.mv ? (
              <PlayCircleOutlined className={styles.playIcon} onClick={() => onMv(record.mv)} />
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
      render: (text: any, record: any) => Utils.formatName(record.ar)
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

  const trackIdsStr = useMemo(() => {
    return trackIds.reduce((memo: any, item: any) => memo.concat(item.id), []).toString()
  }, [trackIds])

  useEffect(() => {
    getData()
  }, [trackIdsStr])

  return (
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
      columns={columns}
      size="small"
      dataSource={
        searchValue
          ? tableData.filter((item: {name: string}) => item.name.includes(searchValue))
          : tableData
      }
      pagination={false}
      rowKey={(record: any) => record.id}
    />
  )
}

export default TableList
