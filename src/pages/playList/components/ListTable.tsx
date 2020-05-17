import React, {FC, useEffect, useState, Fragment,useMemo} from 'react'
import {Table, Icon, message} from 'antd'
import API from '@/api'
import Utils from '@/help'
import { ColumnProps } from 'antd/es/table'
import {Subscribe} from '@/Appcontainer'
import styles from '../index.scss'

import Song from '@/help/getSongInfo'
import {appState} from '@/models/gloable'

interface PlayRecordInterface {
  name:string
  ar: any[],
  dt: string,
  id:number
  [propName: string]: any
}



type Props = {
  trackIds?: any,
  tracks?: any,
  $app: any,
  location:any,
  searchValue:string
}

let clickTime = 0

const TableList: FC<Props> = ({trackIds = [],searchValue='', tracks = [], $app,location}) => {
  const [tableData, setTableData] = useState([])

  const columns:any = [
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
            {
              record.mv ? <Icon type="play-circle" className={styles.playIcon} /> : null
            }
            {/*<Icon type="play-circle" className={styles.playIcon} onClick={() => Song.getSongUrl(record.id)}/>*/}
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
      ellipsis: true
    },
    {
      title: '歌手',
      dataIndex: 'singer',
      key: 'singer',
      align: 'left',
      ellipsis: true,
      render: (text: any, record: any) => Utils.formatName(record.ar)
    },
    {
      title: '专辑',
      dataIndex: 'album',
      key: 'album',
      align: 'left',
      ellipsis: true,
      render: (text: any, record: any) => record.al.name
    },
    {
      title: '时长',
      dataIndex: 'dt',
      key: 'dt',
      align: 'left',
      render: (text: any) => Utils.formatSeconds(text),
      width: 150
    }
  ]


  const trackIdsStr = useMemo(() =>{
    return trackIds.reduce((memo: any, item: any) => {
      return memo.concat(item.id)
    }, []).toString()
  },[trackIds])

  const onSong = (id:number) => {
    Song.getSongUrl(id)
    clickTime +=1
    if(clickTime === 1){
      const mapData = tableData.map((item:PlayRecordInterface) => {
        return {
          title: item.name,
          singer:Utils.formatName(item.ar),
          time:Utils.formatSeconds(item.dt),
          id: item.id
        }
      })
      return appState.setPlayRecord(mapData)
    }
  }



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
          onDoubleClick: () => onSong(record.id)
        }
      }}
      columns={columns}
      size='small'
      dataSource={searchValue? tableData.filter((item:{name:string}) =>item.name.includes(searchValue)) : tableData}
      pagination={false}
      rowKey={(record: any) => record.id}
    />
  )
}

// @ts-ignore
export default Subscribe(TableList)

