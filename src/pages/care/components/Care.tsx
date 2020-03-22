import React, {FC, useEffect, useState} from 'react'
import styles from '../index.scss'
import {Subscribe} from '@/Appcontainer'
import {List, Avatar, Divider, Button, Icon, message} from 'antd'
import Link from 'umi/link'
import API from '@/api'

type Props = {
  $app: any,
  location: any,
  type: number
}
const Care: FC<Props> = (props) => {

  const {userInfo} = props.$app.state
  const [followsArr, setFollowsArr] = useState([])
  const [isFollowed, setIsFollowed] = useState(false)

  const follow = (id: any) => {
    API.follow({id, t: 1}).then((res: any) => {
      console.log(res)
      if (res.code !== 200) {
        return message.error('关注失败，请售稍后再试')
      }

      setIsFollowed(true)

      return message.success('关注成功')
    })
  }

  const description = (item: {playlistCount: number, followeds: number, followed: boolean, userId: any}) => {
    return (
      <div className={styles.description}>
        <div className={styles.left}>
          <p>
            <span>歌单：</span>
            <span>{item.playlistCount}</span>
          </p>
          <Divider type='vertical' className={styles.divider}/>
          <p>
            <span>粉丝：</span>
            <span>{item.followeds}</span>
          </p>
        </div>
        <div className={styles.right}>
          {
            props.type ? (
                <Button disabled size='small'>
                  <Icon type="wechat"/>
                  <i>私信</i>
                </Button>
              ) :
              (
                <Button size='small' disabled={item.followed || isFollowed} onClick={() => follow(item.userId)}>
                  <Icon type={item.followed || isFollowed ? 'check' : 'plus'}/>
                  <i>{item.followed || isFollowed ? '已关注' : '关注'}</i>
                </Button>
              )
          }

        </div>
      </div>
    )
  }

  useEffect(() => {
    if (userInfo.userPoint) {
      const {userId} = userInfo.userPoint
      const apiTYpe = props.type === 1 ? 'follows' : 'followeds'
      API[apiTYpe]({uid: userId, loading: true}).then((res: any) => {
        if (res.code !== 200) {
          return false
        }
        const data: any = props.type ? res.follow : res.followeds
        setFollowsArr(data)
      })
    }
  }, [userInfo.userPoint])

  return (
    <div className={styles._follows}>
      <h2 className={styles.title}>{userInfo.profile && userInfo.profile.nickname}{props.type ? '的关注' : '的粉丝'}</h2>
      <Divider className={styles.divider}/>
      <List
        itemLayout="horizontal"
        dataSource={followsArr}
        grid={{column: 3, gutter: 32}}
        renderItem={(item: any) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatarUrl}/>}
              title={<Link to="/">{item.nickname}</Link>}
              description={description(item)}
            />
          </List.Item>
        )}
      />
    </div>
  )
}
// @ts-ignore
export default Subscribe(Care)
