/** @format */

import React, {FC, useEffect} from "react"
import {Spin, Avatar} from "antd"
import {UserOutlined} from "@ant-design/icons"
import InfiniteScroll from "react-infinite-scroller"
import useSearchDetail from "../hooks/useSearchDetail"
import Utils from "@/help"
import styles from "../index.scss"

interface ISongList {
  getCount: (count: number) => void
}

const SongList: FC<ISongList> = ({getCount}) => {
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
              <li className={styles.item} key={Utils.createRandomId()}>
                <div className={styles.img}>
                  <Avatar
                    shape="square"
                    size={64}
                    icon={<UserOutlined />}
                    src={item.coverImgUrl}
                    className={styles.icon}
                  />
                </div>
                {item.name && (
                  <p
                    className={styles.title}
                    dangerouslySetInnerHTML={{__html: Utils.highLight(item.name)}}
                  />
                )}

                <p className={styles.name}>{item.trackCount}首</p>
                <p className={styles.nickname}>{item.creator && item.creator.nickname}</p>
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
