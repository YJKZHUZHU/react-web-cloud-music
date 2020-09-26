/** @format */

import React, {FC, useEffect} from "react"
import {Spin, Avatar, Space} from "antd"
import {useHistory} from "umi"
import {UserOutlined} from "@ant-design/icons"
import InfiniteScroll from "react-infinite-scroller"
import useSearchDetail from "../hooks/useSearchDetail"
import Utils from "@/help"
import styles from "../index.scss"

interface ISinger {
  getCount: (count: number) => void
}

const Singer: FC<ISinger> = ({getCount}) => {
  const history = useHistory()
  const {loadMore, loading, more, list, count} = useSearchDetail({
    type: 100,
    initFetch: true,
    countName: "artistCount",
    listName: "artists"
  })

  useEffect(() => {
    getCount(count)
  }, [count])

  return (
    <div className={styles.singer}>
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
                onClick={() =>
                  history.push(`/artists-detail/album?id=${item.id}&name=${item.name}`)
                }
                className={styles.item}
                key={Utils.createRandomId()}>
                <div className={styles.img}>
                  <Avatar
                    shape="square"
                    size={64}
                    icon={<UserOutlined />}
                    src={item.img1v1Url}
                    className={styles.icon}
                  />
                </div>
                <Space>
                  <span
                    className={styles.title}
                    dangerouslySetInnerHTML={{__html: Utils.highLight(item.name)}}
                  />
                  {item.alias.length !== 0 && (
                    <span className={styles.alias}>({item.alias.join()})</span>
                  )}
                </Space>
                {item.accountId && <UserOutlined className={styles.user} />}
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
Singer.title = "歌手"

export default Singer
