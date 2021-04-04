/** @format */

import React, {FC} from "react"
import {NavLink, useHistory, useDispatch} from "umi"
import {Space, Popconfirm, message} from "antd"
import {
  DownOutlined,
  UpOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  HeartOutlined
} from "@ant-design/icons"
import {useBoolean, useRequest} from "ahooks"
import API from "@/api"
import styles from "./index.scss"

interface Item {
  url: string
  text: string
  login: boolean
  icon: React.ReactNode
}

export interface MenuItemProps {
  list: Item[]
}

export interface SongListmenuProps {
  list: any[]
  text: string
  type: number
}

export const stopPropagation = (e: React.MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
}

interface ICreator {
  accountStatus: number
  anchor: boolean
  authStatus: number
  authenticationTypes: number
  authority: number
  avatarDetail: any
  avatarImgId: number
  avatarImgIdStr: string
  avatarImgId_str: string
  avatarUrl: string
  backgroundImgId: number
  backgroundImgIdStr: string
  backgroundUrl: string
  birthday: number
  city: number
  defaultAvatar: boolean
  description: string
  detailDescription: string
  djStatus: number
  expertTags: any
  experts: any
  followed: boolean
  gender: number
  mutual: boolean
  nickname: string
  province: number
  remarkName: any
  signature: string
  userId: number
  userType: number
  vipType: number
  [props: string]: any
}

interface IMenuData {
  adType: number
  anonimous: boolean
  artists: any
  backgroundCoverId: number
  backgroundCoverUrl: any
  cloudTrackCount: number
  commentThreadId: string
  coverImgId: number
  coverImgId_str: string
  coverImgUrl: string
  createTime: number
  creator: ICreator
  description: string
  englishTitle: any
  highQuality: boolean
  id: number
  name: string
  newImported: boolean
  opRecommend: boolean
  ordered: boolean
  playCount: number
  privacy: number
  recommendInfo: any
  specialType: number
  status: number
  subscribed: boolean
  subscribedCount: number
  subscribers: any[]
  tags: any[]
  titleImage: number
  titleImageUrl: any
  totalDuration: number
  trackCount: number
  trackNumberUpdateTime: number
  trackUpdateTime: number
  tracks: any
  updateFrequency: any
  updateTime: number
  userId: number
  [props: string]: any
}
interface IMenuItem {
  menuData: IMenuData
}

const MenuItem: FC<IMenuItem> = ({menuData}) => {
  console.log(menuData)
  const history = useHistory()
  const dispatch = useDispatch()
  const {run: onConfirm} = useRequest(() => API.playlistDelete({id: menuData?.id}), {
    manual: true,
    onSuccess: (response) => {
      if (response.code !== 200) return message.info("歌单删除失败")
      message.success("歌单删除成功")
      return dispatch({
        type: "userModel/getPlayList"
      })
    }
  })
  return (
    <div className={styles.songListItem}>
      <HeartOutlined />
      <span>{menuData.name}</span>
      <Popconfirm title="确定删除该歌单吗?" onConfirm={onConfirm} okText="确定" cancelText="取消">
        <DeleteOutlined
          className={styles.icon}
          onClick={(e) => {
            stopPropagation(e)
            e.preventDefault()
            console.log("kkkk")
          }}
        />
      </Popconfirm>
    </div>
  )
}

export const SongListmenu: FC<SongListmenuProps> = (props) => {
  const {list, children, text, type} = props
  const history = useHistory()
  const dispatch = useDispatch()
  const [visible, {toggle}] = useBoolean(false)

  const {run: onConfirm} = useRequest((id) => API.playlistDelete({id}), {
    manual: true,
    onSuccess: (response) => {
      if (response.code !== 200) return message.info("歌单删除失败")
      message.success("歌单删除成功")
      return dispatch({
        type: "userModel/getPlayList"
      })
    }
  })

  const onLink = (e: React.MouseEvent, id: number) => {
    stopPropagation(e)
    return history.push(`/playList?listId=${id}`)
  }
  return (
    <div className={styles.songList} onClick={() => toggle()}>
      <div className={styles.createList}>
        <span>
          {text}({list.length})
        </span>
        {children}
        {visible ? (
          <DownOutlined className={styles.icon} />
        ) : (
          <UpOutlined className={styles.icon} />
        )}
      </div>
      {visible ? (
        <ul className={styles.list} id={`_song_list_${type}`}>
          {list.map((item, index) => {
            return (
              <li key={item.id} className={styles.item} onClick={(e) => onLink(e, item.id)}>
                <img
                  className={styles.img}
                  src={`${item.coverImgUrl}?param=40y40`}
                  alt={item.coverImgUrl}
                />
                <Space direction="vertical" size={6} className={styles.right}>
                  <span className={styles.content}>{item.name}</span>
                  <div className={styles.operator}>
                    <span>{item.trackCount}首</span>
                    {type === 0 && item.privacy === 10 && <EyeInvisibleOutlined title="隐私歌单" />}

                    {index === 0 && type === 0 ? null : (
                      <Popconfirm
                        title="确定删除该歌单吗?"
                        onConfirm={() => onConfirm(item.id)}
                        okText="确定"
                        cancelText="取消">
                        <DeleteOutlined className={styles.icon} onClick={stopPropagation} />
                      </Popconfirm>
                    )}
                  </div>
                </Space>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

export default MenuItem
