/** @format */

import React, {FC, useState, useEffect} from "react"
import {DeleteOutlined, FileAddOutlined, HistoryOutlined} from "@ant-design/icons"
import {Tabs, Divider, Table} from "antd"
import {useSelector,useDispatch,UserModelState,SongInfoModelState} from "umi"
import styles from "./index.scss"
import {Subscribe} from "@/Appcontainer"
import Utils from "@/help/index"
import classnames from "classnames"
import Song from "@/help/getSongInfo"
const {TabPane} = Tabs

const columns: any[] = [
  {
    title: "音乐标题",
    dataIndex: "name",
    key: "name",
    align: "center",
    ellipsis: true
  },
  {
    title: "歌手",
    dataIndex: "singer",
    key: "singer",
    align: "center",
    ellipsis: true,
    render: (text: any, record: any) => Utils.formatName(record.ar)
  },
  {
    title: "时长",
    dataIndex: "dt",
    key: "dt",
    align: "center",
    render: (text: any) => Utils.formatSeconds(text),
    width: 150
  }
]

const allRecordsColumns: any[] = [
  ...columns,
  {
    title: "播放次数",
    dataIndex: "playCount",
    key: "playCount",
    align: "center",
    ellipsis: true
  }
]

const PlayRecord: FC<any> = (props) => {
  // const { playHistory} = props.$app.state
  const dispatch = useDispatch()
  const {allPlayRecord} = useSelector((state: any):UserModelState => state.userModel)
  const {playRecord,playHistory} = useSelector((state: any): SongInfoModelState => state.songInfoModel)
  console.log(playHistory, playRecord)

  const header = (total: number, isDelete: boolean = true, isCollect: boolean = true) => {
    return (
      <div className={styles.header}>
        <p className={styles.left}>总共{total}首</p>
        <div className={styles.right}>
          {isCollect && (
            <p className={styles.delete}>
              <FileAddOutlined />
              <span>收藏全部</span>
            </p>
          )}
          <Divider type="vertical" />
          {isDelete && (
            <p className={styles.delete}>
              <DeleteOutlined />
              <span>清空</span>
            </p>
          )}
        </div>
      </div>
    )
  }

  const onTab = (key: any) => {
    console.log(key)
  }
  return (
    <Tabs defaultActiveKey="1" className={styles._playRecord} onChange={onTab}>
      <TabPane tab={<i className={classnames("iconfont", "icon-bofangliebiao")}>播放列表</i>} key="1">
        {header(playRecord.length)}
        <Divider className={styles.divider} />
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={playRecord}
          pagination={false}
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
        />
      </TabPane>
      <TabPane tab={<i className={classnames("iconfont", "icon-lishijilu")}>历史记录</i>} key="2">
        {header(allPlayRecord.length)}
        <Divider className={styles.divider} />
        <Table
          columns={allRecordsColumns}
          rowKey={(record: any) => record.id}
          dataSource={Utils.formatAllRecord(allPlayRecord)}
          pagination={false}
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
        />
      </TabPane>
      <TabPane
        tab={<i className={classnames("iconfont", "icon-bofangjilu_line")}>播放记录</i>}
        key="3">
        {header(playHistory.length)}
        <Divider className={styles.divider} />
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={playHistory}
          pagination={false}
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
        />
      </TabPane>
    </Tabs>
  )
}
//@ts-ignore
export default Subscribe(PlayRecord)
