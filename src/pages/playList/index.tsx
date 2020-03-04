import React, {FC, useEffect, useState} from 'react'
import API from '@/api'
import styles from './index.scss'
import {Divider, Button, Icon, Tabs, Input} from 'antd'
import Link from 'umi/link'
import TableList from './components/ListTable'
import CommentList from './components/CommentList'
import Collection from './components/Collection'
import moment from 'moment'
import Utils from '@/help'

const {TabPane} = Tabs
const {Search} = Input

type Props = {
  location: any
}

const PlayList: FC<Props> = props => {
  const {listId} = props.location.query
  const [playlist, setPlaylist] = useState({})
  const [creator, setCreator] = useState({})
  const [label, setLabel] = useState([])
  const [isSearch, setSearch] = useState(true)

  const onTabs = (activeKey: string) => (+activeKey) === 1 ? setSearch(true) : setSearch(false)

  useEffect(() => {
    API.playList({id: listId}).then((res: any) => {
      if (res.code === 200) {
        setPlaylist(res.playlist)
        setCreator({
          ...res.playlist.creator
        })
        setLabel(res.playlist.creator.expertTags || [])
      }
    })
  }, [])

  return (
    <div className={styles._playList}>
      <div className={styles.top}>
        <div className={styles.left}>
          <img src={creator.backgroundUrl}/>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            <div className={styles.markTitle}>
              <span className={styles.colorLabel}>歌单</span>
              <h2 className={styles.markTitle}>{playlist.name}</h2>
            </div>

            <div className={styles.songIntroduction}>
              <p>
                <span>歌曲数</span>
                <span className={styles.number}>{playlist.trackCount}</span>
              </p>
              <Divider type='vertical' className={styles.divider}/>
              <p>
                <span>播放数</span>
                <span className={styles.number}>{Utils.tranNumber(+playlist.playCount, 0)}</span>
              </p>
            </div>
          </div>
          <div className={styles.creator}>
            <a className={styles.link}>
              <img src={creator.avatarUrl}/>
            </a>
            <span className={styles.name}>{creator.nickname}</span>
            <span className={styles.time}>
              {moment(playlist.createTime).format('YYYY-MM-DD')}
              <i style={{paddingLeft: 5}}>创建</i>
            </span>
          </div>
          <div className={styles.btnGroup}>
            <Button.Group className={styles.playAll}>
              <Button>
                <Icon type="play-circle"/>
                播放全部
              </Button>
              <Button>
                <Icon type="plus"/>
              </Button>
            </Button.Group>
            <Button>
              <Icon type="folder-add"/>
              收藏({playlist.subscribedCount})
            </Button>
          </div>
          {
            label.length !== 0 ?
              <div className={styles.label}>
                <p>标签：</p>
                <div>
                  {
                    label.map((item: any) => {
                      return (
                        <span key={item}>
                      <Link to='/' className={styles.link}>{item}</Link>
                      /
                    </span>
                      )
                    })
                  }
                </div>
              </div> : null
          }

          <p className={styles.introduction}>
            <b>简介：</b>
            {playlist.description}
          </p>
        </div>
      </div>
      <Tabs
        animated={false}
        defaultActiveKey="1"
        tabBarExtraContent={isSearch ? <Search placeholder='搜索歌单音乐'/> : null}
        className={styles.tabs}
        tabBarStyle={{margin: 0}}
        onChange={onTabs}
      >
        <TabPane tab="歌曲列表" key="1">
          <TableList
            {...props}
            trackIds={playlist.trackIds}
            tracks={playlist.tracks}
          />
        </TabPane>
        <TabPane tab={playlist.commentCount ? `评论(${playlist.commentCount})` : '评论'} key="2">
          <CommentList {...props}/>
        </TabPane>
        <TabPane tab="收藏者" key="3">
          <Collection
            {...props}
            subscribedCount={playlist.subscribedCount}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default PlayList
