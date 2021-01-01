/** @format */

import React, {FC} from "react"
import {NavLink, useHistory, useDispatch} from "umi"
import {Space, Popconfirm, message} from "antd"
import {DownOutlined, UpOutlined, DeleteOutlined, EyeInvisibleOutlined} from "@ant-design/icons"
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

export const TopMenu: FC<MenuItemProps> = (props) => {
  const {list, children} = props
  return (
    <div className={styles.menu}>
      <h2>{children}</h2>
      <ul>
        {list.map((item) => {
          return (
            <li key={item.url}>
              <NavLink to={item.url} className={styles.item} activeClassName={styles.activeRouter}>
                <Space>
                  {item.icon}
                  <span>{item.text}</span>
                </Space>
              </NavLink>
            </li>
          )
        })}
      </ul>
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
                    {type === 0 && item.privacy === 10 && (
                      <EyeInvisibleOutlined title="隐私歌单" />
                    )}

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

TopMenu.defaultProps = {
  list: []
}
SongListmenu.defaultProps = {
  list: [],
  text: "创建的歌单"
}

const MenuItem = {
  TopMenu,
  SongListmenu
}
export default MenuItem
