/** @format */

import React, {FC} from "react"
import {List, Space, Avatar} from "antd"
import {ShareAltOutlined, LikeOutlined, MessageOutlined} from "@ant-design/icons"
import moment from "moment"
import {useHistory, useDispatch} from "umi"
import {Artists, PlayIcon} from "@/components"
import styles from "../index.scss"

const IconText = ({icon, text}: any) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

interface IDynamicProps {
  data: any[]
  loading: boolean
}

const Dynamic: FC<IDynamicProps> = ({data, loading}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const content = (info: any, {pics, rcmdInfo}: {pics: any[]; rcmdInfo: any}) => {
    return (
      <div className={styles.dinamicContent}>
        <span>{info?.msg}</span>
        {info?.song && (
          <div
            className={styles.song}
            onDoubleClick={() =>
              dispatch({
                type: "songInfoModel/getSongInfo",
                payload: {
                  id: info?.song?.id
                }
              })
            }>
            <div className={styles.img}>
              <img src={info?.song?.album?.picUrl} alt={info.song.name} />
              <PlayIcon iconClassName={styles.playIcon} />
            </div>
            <div className={styles.content}>
              <span>{info.song.name}</span>
              <Artists data={info?.song?.artists} />
            </div>
          </div>
        )}
        {pics && (
          <Space wrap className={styles.imgGroup}>
            {pics.map((item) => {
              return <img src={item?.originUrl} />
            })}
          </Space>
        )}

        {rcmdInfo && <span className={styles.from}>-----{rcmdInfo?.reason}</span>}
      </div>
    )
  }

  return (
    <List
      locale={{emptyText: "暂无动态"}}
      itemLayout="vertical"
      size="large"
      loading={loading}
      dataSource={data}
      renderItem={(item) => {
        const json = JSON.parse(item?.json)
        if (item?.user?.userId === 0) return null
        return (
          <List.Item
            className="_dynamicItem"
            key={item.title}
            actions={[
              <IconText
                icon={LikeOutlined}
                text={item?.info?.likedCount}
                key="list-vertical-like-o"
              />,
              <IconText
                icon={ShareAltOutlined}
                text={item?.info?.shareCount}
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text={item?.info?.comments}
                key="list-vertical-message"
              />
            ]}>
            <List.Item.Meta
              avatar={<Avatar size="large" src={item?.user?.avatarUrl} />}
              title={
                <Space className={styles.name}>
                  <span onClick={() => history.push(`/homepage?id=${item?.user?.userId}`)}>
                    {item?.user?.nickname}
                  </span>
                  <span>{json?.song ? "分享单曲" : "发表动态"}</span>
                </Space>
              }
              description={moment(item?.eventTime).format("YYYY-MM-DD HH:mm")}
            />
            {content(json, {pics: item?.pics, rcmdInfo: item?.rcmdInfo})}
          </List.Item>
        )
      }}
    />
  )
}

export default Dynamic
