import React, {FC, useEffect, useState, Fragment,useMemo} from 'react'
import {Table, Icon, message} from 'antd'
import API from '@/api'
import Utils from '@/help'
import {Subscribe} from '@/Appcontainer'
import styles from '../index.scss'

import Song from '@/help/getSongInfo'



type Props = {
  trackIds?: any,
  tracks?: any,
  $app: any,
  location:any
}

const TableList: FC<Props> = ({trackIds = [], tracks = [], $app,location}) => {
  const [tableData, setTableData] = useState([])
  const [loading,setLoading] = useState(false)

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
            <Icon type="play-circle" className={styles.playIcon} onClick={() => Song.getSongUrl(record.id)}/>
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


  const trackIdsStr = useMemo(() =>{
    return trackIds.reduce((memo: any, item: any) => {
      return memo.concat(item.id)
    }, []).toString()
  },[trackIds])


  useEffect(() => {
    trackIdsStr.length !== 0 && API.song({
      ids: trackIdsStr,
      loading: true
    }).then((res: any) => {
      if (res.code === 200) {
        setTableData(res.songs)
      }
    })
  }, [trackIdsStr])

  return (
    <Table
      onRow={(record:any) => {
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

