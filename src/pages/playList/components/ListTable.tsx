import React, {FC, useEffect, useState, Fragment, useMemo} from "react"
import { HeartOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Table, message } from "antd";
import API, {ResInterface} from "@/api"
import Utils from "@/help"
import {ColumnProps} from "antd/es/table"
import {Subscribe} from "@/Appcontainer"
import styles from "../index.scss"
import Song from "@/help/getSongInfo"
import {RouteData} from "umi"



type Props = {
  trackIds?: any
  tracks?: any
  $app: any
  location: RouteData
  searchValue: string
}

const TableList: FC<Props> = ({trackIds = [], searchValue = "", tracks = [], $app, location}) => {
  const [tableData, setTableData] = useState([])

  const getData = () => {
    if (trackIds.length !== 0) {
      API.song({ids: trackIdsStr, loading: true}).then((res: ResInterface) => {
        if (res.code === 200) {
          console.log(res.songs)
          setTableData(res.songs)
        }
      })
    }
  }

  const columns: any = [
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
            {record.mv ? <PlayCircleOutlined className={styles.playIcon} /> : null}
            {/*<Icon type="play-circle" className={styles.playIcon} onClick={() => Song.getSongUrl(record.id)}/>*/}
          </div>
        );
      },
      width: 100,
    },
    {
      title: "音乐标题",
      dataIndex: "name",
      key: "name",
      align: "left",
      ellipsis: true,
    },
    {
      title: "歌手",
      dataIndex: "singer",
      key: "singer",
      align: "left",
      ellipsis: true,
      render: (text: any, record: any) => Utils.formatName(record.ar),
    },
    {
      title: "专辑",
      dataIndex: "album",
      key: "album",
      align: "left",
      ellipsis: true,
      render: (text: any, record: any) => record.al.name,
    },
    {
      title: "时长",
      dataIndex: "dt",
      key: "dt",
      align: "left",
      render: (text: any) => Utils.formatSeconds(text),
      width: 150,
    },
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
          onDoubleClick: () => Song.getSongUrl(record.id),
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

// @ts-ignore
export default Subscribe(TableList)
