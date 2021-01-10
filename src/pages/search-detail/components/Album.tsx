/** @format */

import React, {FC, useEffect} from "react"
import {Spin, Avatar, Space} from "antd"
import {useHistory} from "umi"
import {UserOutlined} from "@ant-design/icons"
import {Artists} from "@/components"
import {useSearchDetail} from "@/hooks"
import {IComProps} from "../_layout"
import Utils from "@/help"
import styles from "../index.scss"

const Album: FC<IComProps> = ({getCount}) => {
  const history = useHistory()

  const {request, containerRef} = useSearchDetail({
    countKey: "albumCount",
    listKey: "albums",
    type: 10,
    limit: 10
  })

  useEffect(() => {
    getCount(10, request?.data?.total)
  }, [request])

  return (
    <div className={styles.album} ref={containerRef}>
      <Spin spinning={request?.loadingMore} tip="Loading..." className={styles.loading}>
        <ul>
          {request?.data?.list.map((item: any) => {
            return (
              <li
                onClick={() => history.push(`/album?id=${item.id}`)}
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
      </Spin>
    </div>
  )
}
Album.title = "单曲"

export default Album
