/** @format */

import React, {FC, useEffect} from "react"
import {Spin, Avatar, Space} from "antd"
import {UserOutlined} from "@ant-design/icons"
import InfiniteScroll from "react-infinite-scroller"
import {useHistory} from "umi"
import useSearchDetail from "../hooks/useSearchDetail"
import Utils from "@/help"
import styles from "../index.scss"

interface ISongList {
  getCount: (count: number) => void
}

const SongList: FC<ISongList> = ({getCount}) => {
  const history = useHistory()
  const {loadMore, loading, more, list, count} = useSearchDetail({
    type: 1000,
    initFetch: true,
    countName: "playlistCount",
    listName: "playlists"
  })

  useEffect(() => {
    getCount(count)
  }, [count])

  return (
    <div className={styles.songList}>
      <InfiniteScroll
        initialLoad={false}
        pageStart={1}
        loadMore={loadMore}
        hasMore={!loading && more}
        useWindow={false}>
        <ul>
          {list.map((item: any) => {
            return (
              <li
                className={styles.item}
                key={Utils.createRandomId()}
                onClick={() => history.push(`/playList?listId=${item.id}`)}>
                <Space>
                  <div className={styles.img}>
                    <Avatar
                      shape="square"
                      size={64}
                      icon={<UserOutlined />}
                      src={item.coverImgUrl}
                      className={styles.icon}
                    />
                  </div>
                  <span
                    className={styles.title}
                    dangerouslySetInnerHTML={{__html: Utils.highLight(item?.name)}}
                  />
                </Space>

                <span className={styles.listNmuber}>{item.trackCount}首</span>
                <Space className={styles.nickname}>
                  <span>by</span>
                  <span>{item?.creator?.nickname}</span>
                </Space>
              </li>
            )
          })}
        </ul>
      </InfiniteScroll>
      {loading && more && (
        <div className={styles.loading}>
          <Spin spinning={loading} tip="Loading..." />
        </div>
      )}
    </div>
  )
}
SongList.title = "歌单"

export default SongList
