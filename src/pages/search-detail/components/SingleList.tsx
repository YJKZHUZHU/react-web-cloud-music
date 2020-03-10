import React, {FC, useState, useEffect, Fragment} from 'react'
import {Table, Icon, Spin} from 'antd'
import styles from '../index.scss'
import Utils from '@/help'
import Song from '@/help/getSongInfo'

type Props = {
  data: Array<any>,
  loading: boolean,
  hasMore: boolean
}

const SingleList: FC<Props> = (props) => {
  const {data = [], loading, hasMore} = props
  const columns: any = [
    {
      title: '操作',
      dataIndex: 'operator',
      key: 'operator',
      align: 'left',
      render: (text: any, record: any, index: number) => {
        return (
          <div>
            <span>{index < 10 ? `0${index}` : index}</span>
            <Icon type="heart" className={styles.heartIcon}/>
            <a href='/'>
              <Icon type="download"/>
            </a>
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
        return (
          <div className={styles.musicTitle}>
            <p>
              <span dangerouslySetInnerHTML={{__html: text && Utils.highLight(text)}}/>
              {record.mvid !== 0 && <Icon type="play-square" className={styles.icon}/>}
            </p>
            {
              record.alias.length !== 0 ? (
                <p
                  className={styles.bottom}
                  dangerouslySetInnerHTML={{__html: record.alias && Utils.highLight(record.alias.join('/'))}}/>
              ) : null
            }
          </div>
        )
      }
    },
    {
      title: '歌手',
      dataIndex: 'artists',
      key: 'artists',
      align: 'left',
      ellipsis: true,
      render: (text: any, record: any) => {
        return (
          <div className={styles.singer}>
            {
              text && text.map((item: any, index: any) => {
                return (
                  <p key={item.id}>
                    <span dangerouslySetInnerHTML={{__html: Utils.highLight(item.name)}}/>
                    <i className={styles.split}>{text.length === (index + 1) ? null : '/'}</i>
                  </p>
                )
              })
            }
          </div>
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
        return <span dangerouslySetInnerHTML={{__html: text && Utils.highLight(text.name)}}/>
      }
    },
    {
      title: '时长',
      dataIndex: 'duration',
      key: 'duration',
      align: 'left',
      render: (text: any) => {
        return (
          <span>{Utils.formatSeconds(text)}</span>
        )
      },
      width: 150
    }
  ]
  return (
    <div>
      <Table
        onRow={(record: any) => {
          return {
            onDoubleClick: () => Song.getSongUrl(record.id)
          }
        }}
        bordered={false}
        columns={columns}
        size='small'
        dataSource={data}
        pagination={false}
        rowKey={(record: any) => Utils.createRandomId()}
      />

      {loading && hasMore && (
        <div className="demo-loading-container">
          <Spin/>
        </div>
      )}
    </div>

  )
}

export default SingleList
