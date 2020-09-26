/** @format */

import React, {FC, useEffect} from "react"
import {Spin, Avatar} from "antd"
import {UserOutlined, ManOutlined, WomanOutlined} from "@ant-design/icons"
import InfiniteScroll from "react-infinite-scroller"
import useSearchDetail from "../hooks/useSearchDetail"
import Utils from "@/help"
import styles from "../index.scss"

interface IUser {
  getCount: (count: number) => void
}

const User: FC<IUser> = ({getCount}) => {
  const {loadMore, loading, more, list, count} = useSearchDetail({
    type: 1002,
    initFetch: true,
    countName: "userprofileCount",
    listName: "userprofiles"
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
                    size={64}
                    icon={<UserOutlined />}
                    src={item.avatarUrl}
                    className={styles.icon}
                  />
                </div>
                <div className={styles.title}>
                  {item.nickname && (
                    <p dangerouslySetInnerHTML={{__html: Utils.highLight(item.nickname)}} />
                  )}

                  {item.gender === 1 ? (
                    <ManOutlined className={styles.man} />
                  ) : (
                    <WomanOutlined className={styles.woman} />
                  )}
                </div>
                {item.signature && (
                  <p
                    className={styles.name}
                    dangerouslySetInnerHTML={{__html: Utils.highLight(item.signature)}}
                  />
                )}
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
User.title = "用户"

export default User
