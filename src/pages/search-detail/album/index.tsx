/** @format */

import React, {FC, useEffect} from "react"
import {Spin, Avatar, Space} from "antd"
import {useHistory} from "umi"
import {UserOutlined} from "@ant-design/icons"
import InfiniteScroll from "react-infinite-scroller"
import {Artists} from "@/components"
import useSearchDetail from "../hooks/useSearchDetail"
import Utils from "@/help"
import styles from "../index.scss"

interface IAlbum {
  getCount: (count: number) => void
}

const Album: FC<IAlbum> = ({getCount, ...rest}) => {
  console.log(rest)
  const history = useHistory()
  const {loadMore, loading, more, list, count} = useSearchDetail({
    type: 10,
    initFetch: true,
    countName: "albumCount",
    listName: "albums"
  })

  useEffect(() => {
    getCount(count)
  }, [count])

  const onAlbum = (e: React.MouseEvent<HTMLElement, MouseEvent>, id: number) => {
    history.push(`/album?id=${id}`)
  }

  return (
    <div className={styles.album}>
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
                onClick={(e) => onAlbum(e, item.id)}
                className={styles.item}
                key={Utils.createRandomId()}>
                <Space>
                  <div className={styles.img}>
                    <Avatar
                      shape="square"
                      size={64}
                      icon={<UserOutlined />}
                      src={item.picUrl}
                      className={styles.icon}
                    />
                  </div>
                  <span
                    className={styles.title}
                    dangerouslySetInnerHTML={{__html: Utils.highLight(item.name)}}
                  />
                  {item.alias.length !== 0 && <span>({item.alias.join()})</span>}
                </Space>
                {item.artists.length !== 0 ? (
                  <Space className={styles.albumName}>
                    <Artists data={item.artists} />
                    <span className={styles.tips}>({item.artist.alias.join()})</span>
                  </Space>
                ) : null}
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
Album.title = "单曲"

export default Album
