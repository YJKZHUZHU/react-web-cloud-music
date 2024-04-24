/** @format */

import {FC, useEffect, useState} from "react"
import {WechatOutlined, CheckOutlined, PlusOutlined} from "@ant-design/icons"
import {List, Avatar, Divider, Button, message} from "antd"
import {Link} from "@umijs/max"
import API from "@/api"
import {EnumLocalStorage, getItem} from "@/help/cache"
import {useNickName} from "@/store/login"
import styles from "../index.scss"

interface ICare {
  type: number
}
const Care: FC<ICare> = (props) => {
  const [followsArr, setFollowsArr] = useState([])
  const [isFollowed, setIsFollowed] = useState(false)

  const nickName = useNickName()

  const follow = (id: any) => {
    API.follow({id, t: 1}).then((res: any) => {
      if (res.code !== 200) {
        return message.error("关注失败，请售稍后再试")
      }

      setIsFollowed(true)

      return message.success("关注成功")
    })
  }

  const description = (item: {
    playlistCount: number
    followeds: number
    followed: boolean
    userId: any
  }) => {
    return (
      <div className={styles.description}>
        <div className={styles.left}>
          <p>
            <span>歌单：</span>
            <span>{item.playlistCount}</span>
          </p>
          <Divider type="vertical" className={styles.divider} />
          <p>
            <span>粉丝：</span>
            <span>{item.followeds}</span>
          </p>
        </div>
        <div>
          {props.type ? (
            <Button disabled size="small" icon={<WechatOutlined />}>
              私信
            </Button>
          ) : (
            <Button
              icon={item.followed || isFollowed ? <CheckOutlined /> : <PlusOutlined />}
              size="small"
              disabled={item.followed || isFollowed}
              onClick={() => follow(item.userId)}>
              {item.followed || isFollowed ? "已关注" : "关注"}
            </Button>
          )}
        </div>
      </div>
    )
  }

  useEffect(() => {
    const apiTYpe = props.type === 1 ? "follows" : "followeds"
    API[apiTYpe]({uid: getItem(EnumLocalStorage.userId), loading: true}).then((res: any) => {
      if (res.code !== 200) {
        return false
      }
      const data: any = props.type ? res.follow : res.followeds
      setFollowsArr(data)
    })
  }, [])

  return (
    <div className={styles._follows}>
      <h2 className={styles.title}>
        {nickName}
        {props.type ? "的关注" : "的粉丝"}
      </h2>
      <Divider className={styles.divider} />
      <List
        itemLayout="horizontal"
        dataSource={followsArr}
        grid={{column: 3, gutter: 32}}
        renderItem={(item: any) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatarUrl} />}
              title={<Link to="/">{item.nickname}</Link>}
              description={description(item)}
            />
          </List.Item>
        )}
      />
    </div>
  )
}
export default Care
