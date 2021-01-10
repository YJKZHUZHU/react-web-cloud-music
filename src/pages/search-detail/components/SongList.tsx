/** @format */

import React, {FC, useEffect} from "react"
import {Spin, Avatar, Space} from "antd"
import {UserOutlined} from "@ant-design/icons"
import {useHistory} from "umi"
import Utils from "@/help"
import {useSearchDetail} from "@/hooks"
import {IComProps} from "../_layout"
import styles from "../index.scss"

const SongList: FC<IComProps> = ({getCount}) => {
  const history = useHistory()

  const {request, containerRef} = useSearchDetail({
    countKey: "playlistCount",
    listKey: "playlists",
    type: 1000,
    limit: 30
  })

  useEffect(() => {
    getCount(1000, request?.data?.total)
  }, [request])

  return (
    <div className={styles.songList} ref={containerRef}>
      <Spin spinning={request?.loadingMore} tip="Loading..." className={styles.loading}>
        <ul>
          {request?.data?.list.map((item: any) => {
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
      </Spin>
    </div>
  )
}
SongList.title = "歌单"

export default SongList
