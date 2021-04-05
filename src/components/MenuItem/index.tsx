/** @format */

import React, {FC} from "react"
import {useHistory, useDispatch} from "umi"
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
  reload?: () => void
}

const renderIcon = (menuItem: MenuDataItem) => {
  if (menuItem?.index === 0) {
    return <HeartOutlined />
  }
  if (menuItem?.menuItem?.privacy === 10) {
    return <LockOutlined />
  }
  return <FileSyncOutlined />
}

const MenuItem: FC<IMenuItem> = (props) => {
  const {menuItem, children, reload} = props
  const history = useHistory()
  const {run} = useRequest(() => API.playlistDelete({id: menuItem?.key}), {
    manual: true,
    onSuccess: (response) => {
      if (response.code !== 200) return message.info("歌单删除失败")
      message.success("歌单删除成功")
      reload && reload()
    }
  })
  const onDlete = (e: React.MouseEvent<HTMLElement>) => {
    stopPropagation(e)
    run()
  }
  const onEdit = (e: React.MouseEvent<HTMLElement>) => {
    stopPropagation(e)
    return history.push(`/edit-song-list?id=${menuItem?.key}`)
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
            <span>
              {menuItem?.menuItem?.subscribed ? <FileSyncOutlined /> : renderIcon(menuItem)}
            </span>
            <span className={styles.content} title={menuItem.name}>
              {menuItem.name}
            </span>
          </Space>
          <div className={styles.operator}>
            <span className={styles.left}>{menuItem?.menuItem?.trackCount}首</span>
            {menuItem?.isDelete ? (
              <Space size={4} className={styles.editAndDelete}>
                <EditOutlined onClick={onEdit} />
                <Popconfirm
                  title="确定删除该歌单吗?"
                  onConfirm={(e: any) => onDlete(e)}
                  onCancel={(e: any) => stopPropagation(e)}
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

export default MenuItem
