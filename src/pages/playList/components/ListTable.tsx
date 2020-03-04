import React, {FC, useEffect, useState, Fragment} from 'react'
import {Table, Icon, message} from 'antd'
import API from '@/api'
import Utils from '@/help'
import {Subscribe} from '@/Appcontainer'
import {appState} from '@/models/gloable'
import styles from '../index.scss'

import Song from '@/help/getSongInfo'

import useLyric from '@/hooks/useLyric'


type Props = {
  trackIds?: any,
  tracks?: any,
  $app: any
}

const TableList: FC<Props> = ({trackIds = [], tracks = [], $app}) => {

  const [tableData, setTableData] = useState([])
  const columns: any = [
    {
      title: '操作',
      dataIndex: 'operator',
      key: 'operator',
      align: 'left',
      render: (text: any, record: any,index:number) => {
        return (
          <div>
            <span>{index < 10 ? `0${index}` : index}</span>
            <Icon type="heart" className={styles.heartIcon}/>
            <Icon type="play-circle" className={styles.playIcon} onClick={() => getSongUrl(record.id)}/>
          </div>
        )
      },
      width: 100
    },
    {
      title: '音乐标题',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      ellipsis: true,
      render: (text: any, record: any) => {
        return <span>{text}</span>
      }
    },
    {
      title: '歌手',
      dataIndex: 'singer',
      key: 'singer',
      align: 'left',
      ellipsis: true,
      render: (text: any, record: any) => {
        return (
          <Fragment>
            {
              record.ar.map((item: any, index: any) => {
                return <span key={item.id}>{item.name}{record.ar.length === (index + 1) ? null : '/'}</span>
              })
            }
          </Fragment>
        )
      }
    },
    {
      title: '专辑',
      dataIndex: 'album',
      key: 'album',
      align: 'left',
      ellipsis: true,
      render: (text: any, record: any) => {
        return (<span>{record.al.name}</span>)
      }
    },
    {
      title: '时长',
      dataIndex: 'dt',
      key: 'dt',
      align: 'left',
      render: (text: any) => {
        return (
          <span>{Utils.formatSeconds(text)}</span>
        )
      },
      width: 150
    }
  ]

  //获取音乐地址以及歌词
  const getSongUrl = (id: number | string) => {
    Song.getSongUrl(id)
  }


  useEffect(() => {
    const trackIdsStr = trackIds.reduce((memo: any, item: any) => {
      return memo.concat(item.id)
    }, [])
    trackIdsStr.length !== 0 && API.song({
      ids: trackIdsStr.toString(),
      loading: true
    }).then((res: any) => {
      if (res.code === 200) {
        setTableData(res.songs)
      }
    })
  }, [trackIds])

  return (
    <Table
      onRow={record => {
        return {
          onDoubleClick: () => Song.getSongUrl(record.id)
        }
      }}
      columns={columns}
      size='small'
      dataSource={tableData}
      pagination={false}
      rowKey={(record: any) => record.id}
    />
  )
}

// @ts-ignore
export default Subscribe(TableList)

