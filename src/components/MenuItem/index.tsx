/** @format */

import React, {FC} from "react"
import {NavLink, useHistory, useDispatch} from "umi"
import {Space, Popconfirm, message} from "antd"
import {
  DownOutlined,
  UpOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  HeartOutlined,
  LockOutlined,
  FileSyncOutlined,
  EditOutlined
} from "@ant-design/icons"
import {useBoolean, useRequest} from "ahooks"
import API from "@/api"
import {MenuDataItem} from "@ant-design/pro-layout/lib/typings"
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

export const stopPropagation = (e: React.MouseEvent<HTMLElement>): void => {
  e.preventDefault()
  e.stopPropagation()
}

interface IMenuItem {
  menuItem: MenuDataItem
}

// index,
// type,
// menuItem: item,

const renderIcon = (menuItem: MenuDataItem) => {
  if (menuItem?.type === "creator") {
    // 创建歌单
    if (menuItem?.index === 0) {
      return <HeartOutlined />
    }
    if (menuItem?.menuItem?.privacy === 10) {
      return <LockOutlined />
    }
    return <FileSyncOutlined />
  }
  return <FileSyncOutlined />
}

const MenuItem: FC<IMenuItem> = ({menuItem, children}) => {
  console.log(menuItem)
  const history = useHistory()
  const dispatch = useDispatch()
  const {run} = useRequest(() => API.playlistDelete({id: menuItem?.key}), {
    manual: true,
    onSuccess: (response) => {
      if (response.code !== 200) return message.info("歌单删除失败")
      message.success("歌单删除成功")
      return dispatch({
        type: "userModel/getPlayList"
      })
    }
  })
  const onDlete = (e: React.MouseEvent<HTMLElement>) => {
    stopPropagation(e)
    run()
  }
  if (menuItem.path?.indexOf("/playList") === -1) {
    return <a onClick={() => history.push(menuItem.path || "")}>{children}</a>
  }

  return (
    <div onClick={() => history.push(menuItem.path || "")}>
      <Space className={styles.songListItem}>
        <img className={styles.img} src={`${menuItem?.menuItem?.coverImgUrl}?param=40y40`} />
        <Space direction="vertical" size={6} className={styles.right}>
          <Space size={0}>
            <span> {renderIcon(menuItem)}</span>
            <span className={styles.content} title={menuItem.name}>
              {menuItem.name}
            </span>
          </Space>
          <div className={styles.operator}>
            <span className={styles.left}>{menuItem?.menuItem?.trackCount}首</span>
            {menuItem?.isDelete ? (
              <Space size={4} className={styles.editAndDelete}>
                <EditOutlined />
                <Popconfirm
                  title="确定删除该歌单吗?"
                  onConfirm={onDlete}
                  onCancel={stopPropagation}
                  okText="确定"
                  cancelText="取消">
                  <DeleteOutlined
                    onClick={(e) => {
                      stopPropagation(e)
                    }}
                  />
                </Popconfirm>
              </Space>
            ) : null}
          </div>
        </Space>
      </Space>
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
