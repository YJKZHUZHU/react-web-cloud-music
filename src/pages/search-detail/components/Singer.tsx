/** @format */

import React, {FC, useEffect} from "react"
import {Spin, Avatar, Space} from "antd"
import {useHistory} from "umi"
import {UserOutlined} from "@ant-design/icons"
import Utils from "@/help"
import {useSearchDetail} from "@/hooks"
import {IComProps} from '../_layout'
import styles from "../index.scss"

const Singer: FC<IComProps> = ({getCount}) => {
  const history = useHistory()

  const {request, containerRef} = useSearchDetail({
    countKey: "artistCount",
    listKey: "artists",
    type: 100,
    limit: 10
  })


   useEffect(() => {
     getCount(1014, request?.data?.total)
   }, [request])

  return (
    <div className={styles.singer} ref={containerRef}>
      <Spin spinning={request?.loadingMore} tip="Loading..." className={styles.loading}>
        <ul>
          {request?.data?.list.map((item: any) => {
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
      </Spin>
    </div>
  )
}
Singer.title = "歌手"

export default Singer
