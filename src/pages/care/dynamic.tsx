import React, {FC, useEffect, useState} from 'react'
import {Subscribe} from '@/Appcontainer'
import {List, Avatar, Button, Skeleton, Divider, message, Icon} from 'antd'
import Link from 'umi/link'
import classnames from 'classnames'
import Utils from '@/help/index'

import API from '@/api'
import styles from '@/pages/care/index.scss'

type Props = {
  $app: any,
  location: any,
  type: number
}
const Dynamic: FC<Props> = (props) => {
  const {userInfo} = props.$app.state
  const [dynamicArr, setDynamicArr] = useState([])
  const [like, setLike] = useState(false)

  const commentLike = async (info: any, t: number) => {
    const Ret: any = await API.commentLike({
      t,
      type: 6,
      threadId: info.threadId,
      cid: info.resourceId,
      timestamp: Date.now()
    })
    console.log(Ret)
    if (Ret.code !== 200) {
      return message.info('稍后再试哦。。')
    }
    message.success('好吧，现在点赞还有点问题，')
  }
  const onDel = async (evId: string) => {
    const Ret: any = await API.del({evId})
    if (Ret.code !== 200) {
      return message.info('删除失败，请稍后再试')
    }
    await message.success('删除成功')
    return getData()
  }

  const getData = () => {
    if (userInfo.userPoint) {
      const {userId} = userInfo.userPoint
      API.event({loading: true, uid: userId}).then((res: any) => {
        if (res.code !== 200) {
          return message.info('暂无动态哦，，，')
        }
        setDynamicArr(res.events)
      })
    }
  }

  const description = (item: any) => {
    const info = JSON.parse(item.json)
    console.log(info)
    const artistsName = info.song.artists.map((item: any) => item.name).join('/')

    return (
      <div className={styles.infoDescription}>
        <p className={styles.content}>{info.msg}</p>
        <List
          itemLayout="horizontal"
          dataSource={[info]}
          renderItem={(items: any) => (
            <List.Item className={styles.item}>
              <List.Item.Meta
                avatar={<Avatar shape="square" size={64} icon="user" src={items.song.album.picUrl}/>}
                title={items.song.album.name}
                description={<span>{artistsName}</span>}
              />
            </List.Item>
          )}
        />
        <div className={styles.operator}>
          {
            item.info.liked ? (
              <div className={styles.linkNumber} onClick={() => commentLike(item.info, 0)}>
                <Icon className={styles.active} type="like"/>
                <span>{`(${item.info.likedCount})`}</span>
              </div>
            ) : (
              <Icon className={styles.active} type="like"
                    onClick={() => commentLike(item.info, 1)}/>
            )
          }

          <Divider type='vertical' className={classnames(styles.divider, styles.diff)}/>
          <Icon type="delete" onClick={() => onDel(item.info.resourceId)}/>
        </div>
      </div>
    )
  }
  const title = (item: any) => {
    return (
      <div className={styles.infoTitle}>
        <p className={styles.name}>
          <Link to="/" className={styles.link}>{item.user.nickname}</Link>
          <span>{item.info.commentThread.resourceTitle || '分享单曲'}</span>
        </p>
        <p className={styles.time}>{Utils.commentFormatTime(item.eventTime)}</p>
      </div>
    )
  }


  useEffect(() => {
    getData()
  }, [userInfo.userPoint])

  return (
    <div className={styles._dynamic}>
      <h2 className={styles.title}>{userInfo.profile && userInfo.profile.nickname + '的动态'}</h2>
      <Divider className={styles.divider}/>
      <List
        locale={{emptyText: '暂无动态'}}
        itemLayout="horizontal"
        dataSource={dynamicArr}
        renderItem={(item: any) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.user.avatarUrl}/>}
              title={title(item)}
              description={description(item)}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

// @ts-ignore
export default Subscribe(Dynamic)
