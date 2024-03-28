/** @format */

import React, {FC, useMemo} from "react"
import {history, useDispatch, useSelector} from "@umijs/max"
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
import classNames from "classnames"
import {useBoolean, useRequest} from "ahooks"
import API from "@/api"
import styles from "./index.scss"
import { MenuDataItem } from "@ant-design/pro-layout"

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

  const {run} = useRequest(() => API.playlistDelete({id: menuItem?.key}), {
    manual: true,
    onSuccess: (response) => {
      if (response.code !== 200) return message.info("歌单删除失败")
      message.success("歌单删除成功")
      reload && reload()
    }
  })

  const onDelete = (e?: React.MouseEvent<HTMLElement>) => {
    e && stopPropagation(e)
    run()
  }

  const onEdit = (e: React.MouseEvent<HTMLElement>) => {
    stopPropagation(e)
    return history.push(`/edit-song-list?id=${menuItem?.key}`)
  }

  const active = useMemo(() => {
    if (
      menuItem.path?.includes("/playList") &&
      history?.location?.pathname.includes("/playList") &&
      String(menuItem?.key) === String((history?.location as any)?.query?.listId)
    ) {
      return true
    }
    return false
  }, [history?.location?.pathname])

  if (menuItem.path?.indexOf("/playList") === -1) {
    return <a onClick={() => history.push(menuItem.path || "")}>{children}</a>
  }

  console.log("active", active, menuItem)

  return (
    <div onClick={() => history.push(menuItem.path || "")}>
      <Space className={styles.songListItem}>
        <img className={styles.img} src={`${menuItem?.menuItem?.coverImgUrl}?param=40y40`} />
        <Space direction="vertical" size={6} className={styles.right}>
          <Space size={2}>
            <span className={classNames(active && styles.active)}>
              {menuItem?.menuItem?.subscribed ? <FileSyncOutlined /> : renderIcon(menuItem)}
            </span>
            <span
              className={classNames(active && styles.active, styles.content)}
              title={menuItem.name}>
              {menuItem.name}
            </span>
          </Space>
          <div className={styles.operator}>
            <span className={classNames(active && styles.active, styles.left)}>
              {menuItem?.menuItem?.trackCount}首
            </span>
            {menuItem?.isDelete ? (
              <Space size={4} className={styles.editAndDelete}>
                {menuItem?.type === "creator" && <EditOutlined onClick={onEdit} />}
                <Popconfirm
                  title="确定删除该歌单吗?"
                  onConfirm={onDelete}
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
