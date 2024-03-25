/** @format */

import React, {useEffect, useContext} from "react"
import {Spin, Avatar} from "antd"
import {UserOutlined, ManOutlined, WomanOutlined} from "@ant-design/icons"
import {history} from "umi"
import {useSearchDetail} from "@/hooks"
import Utils from "@/help"
import {CountContext} from "./index"
import styles from "./index.scss"

const User = () => {
  const {getCount} = useContext(CountContext)
  const {request, containerRef} = useSearchDetail({
    countKey: "userprofileCount",
    listKey: "userprofiles",
    type: 1002,
    limit: 30
  })

  useEffect(() => {
    getCount(1002, request?.data?.total)
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
                onClick={() => history.push(`/homePage?uid=${item.userId}`)}>
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
      </Spin>
    </div>
  )
}

export default User
